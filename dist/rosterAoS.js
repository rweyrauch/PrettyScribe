export class AoSWeapon {
    constructor() {
        this._name = "";
        this._type = "Melee"; // or "Missile"
        this._range = "";
        this._attacks = "";
        this._toHit = "";
        this._toWound = "";
        this._rend = "";
        this._damage = "";
    }
}
export class AoSWoundTracker {
    constructor() {
        this._name = "";
        this._woundTrackerLabels = [];
        this._table = new Map();
    }
}
;
export class AoSSpell {
    constructor() {
        this._name = "";
        this._castingValue = 0;
        this._description = "";
    }
}
export class AoSPrayer {
    constructor() {
        this._name = "";
        this._description = "";
    }
}
export class AoSAllegiance {
    constructor() {
        this._name = "";
        this._battleTraits = new Map();
        this._commandAbilities = new Map();
    }
}
export var AoSUnitRole;
(function (AoSUnitRole) {
    AoSUnitRole[AoSUnitRole["NONE"] = 0] = "NONE";
    AoSUnitRole[AoSUnitRole["LEADER"] = 1] = "LEADER";
    AoSUnitRole[AoSUnitRole["BATTLELINE"] = 2] = "BATTLELINE";
    AoSUnitRole[AoSUnitRole["BEHEMOTH"] = 3] = "BEHEMOTH";
    AoSUnitRole[AoSUnitRole["ARTILLERY"] = 4] = "ARTILLERY";
    AoSUnitRole[AoSUnitRole["OTHER"] = 5] = "OTHER";
    AoSUnitRole[AoSUnitRole["SCENERY"] = 6] = "SCENERY";
    AoSUnitRole[AoSUnitRole["BATTALION"] = 7] = "BATTALION";
    AoSUnitRole[AoSUnitRole["MALIGN_SORCERY"] = 8] = "MALIGN_SORCERY";
    AoSUnitRole[AoSUnitRole["REALM"] = 9] = "REALM";
})(AoSUnitRole || (AoSUnitRole = {}));
;
export const AoSUnitRoleToString = [
    'None',
    'Leader',
    'Battleline',
    'Behemoth',
    'Artillery',
    'Other',
    'Scenery',
    'Battalion',
    'Malign Sorcery',
    'Realm'
];
export class AoSUnit {
    constructor() {
        this._name = "";
        this._role = AoSUnitRole.NONE;
        this._keywords = new Set();
        this._abilities = new Map();
        this._commandAbilities = new Map();
        this._commandTraits = new Map();
        this._magic = new Map();
        this._artefacts = new Map();
        this._count = 0;
        // Characteristics
        this._move = "0\"";
        this._wounds = 1;
        this._bravery = 7;
        this._save = "";
        this._weapons = [];
        this._spells = [];
        this._prayers = [];
        this._points = 0;
        this._woundTracker = null;
    }
}
export class AoSForce {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._units = [];
        this._allegiance = new AoSAllegiance();
    }
}
;
export class RosterAoS {
    constructor() {
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
;
function LookupRole(roleText) {
    switch (roleText) {
        case 'Leader': return AoSUnitRole.LEADER;
        case 'Battleline': return AoSUnitRole.BATTLELINE;
        case 'Other': return AoSUnitRole.OTHER;
        case 'Behemoth': return AoSUnitRole.BEHEMOTH;
        case 'Artillery': return AoSUnitRole.ARTILLERY;
        case 'Scenery': return AoSUnitRole.SCENERY;
        case 'Battalion': return AoSUnitRole.BATTALION;
        case 'Malign Sorcery': return AoSUnitRole.MALIGN_SORCERY;
        case 'Realm': return AoSUnitRole.REALM;
    }
    return AoSUnitRole.NONE;
}
export function CreateAoSRoster(doc) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterAoS();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Age of Sigmar Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);
            return roster;
        }
    }
    return null;
}
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which === "pts") {
                    roster._points = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster) {
    var _a, _b;
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
            let f = new AoSForce();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            ParseSelections(root, f);
            roster._forces.push(f);
        }
    }
    console.log(roster);
}
function ParseSelections(root, force) {
    var _a, _b;
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        // What kind of selection is this
        let selectionType = (_a = selection.getAttributeNode("type")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionType)
            continue;
        let selectionName = (_b = selection.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (selectionName && (selectionName.includes("Allegiance"))) {
            let allegiance = ParseAllegiance(selection);
            if (allegiance) {
                force._allegiance = allegiance;
            }
        }
        else {
            let unit = ParseUnit(selection);
            if (unit && (unit._role != AoSUnitRole.NONE)) {
                force._units.push(unit);
            }
        }
    }
    // Sort force units by role.
    force._units.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role)
            return 0;
        return -1;
    });
}
function ParseUnit(root) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let unit = new AoSUnit();
    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = (_a = prof.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        let profType = (_b = prof.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (profName && profType) {
            if (profType == "Unit") {
                unit._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_c = char.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Move':
                                unit._move = char.textContent;
                                break;
                            case 'Wounds':
                                unit._wounds = +char.textContent;
                                break;
                            case 'Bravery':
                                unit._bravery = +char.textContent;
                                break;
                            case 'Save':
                                unit._save = char.textContent;
                                break;
                        }
                    }
                }
            }
            else if (profType == "Unit Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Command Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandAbilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Magic") {
                let characteristics = prof.querySelectorAll("characteristics>characteristic");
                for (let char of characteristics) {
                    let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                    if (charName && char.textContent) {
                        unit._magic.set(charName, char.textContent);
                    }
                }
            }
            else if (profType == "Unit Leader") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profType, char.textContent);
                }
            }
            else if (profType == "Spell") {
                let spell = new AoSSpell();
                spell._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Casting Value':
                                spell._castingValue = +char.textContent;
                                break;
                            case 'Description':
                                spell._description = char.textContent;
                                break;
                        }
                    }
                }
                unit._spells.push(spell);
            }
            else if (profType == "Weapon") {
                let weapon = new AoSWeapon();
                weapon._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_f = char.getAttributeNode("name")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Range':
                                weapon._range = char.textContent;
                                break;
                            case 'Type':
                                weapon._type = char.textContent;
                                break;
                            case 'Attacks':
                                weapon._attacks = char.textContent;
                                break;
                            case 'Rend':
                                weapon._rend = char.textContent;
                                break;
                            case 'To Hit':
                                weapon._toHit = char.textContent;
                                break;
                            case 'To Wound':
                                weapon._toWound = char.textContent;
                                break;
                            case 'Damage':
                                weapon._damage = char.textContent;
                                break;
                        }
                    }
                }
                unit._weapons.push(weapon);
            }
            else if (profType == "Command Trait") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandTraits.set(profName, char.textContent);
                }
            }
            else if (profType == "Artefact") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._artefacts.set(profName, char.textContent);
                }
            }
            else if (profType == "Prayer") {
                let prayer = new AoSPrayer();
                prayer._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Description':
                                prayer._description = char.textContent;
                                break;
                        }
                    }
                }
                unit._prayers.push(prayer);
            }
            else if (profType.includes("Wound Track") || profType.includes("Damage Table")) {
            }
            else {
                console.log("Unknown unit profile type: " + profType);
            }
        }
    }
    let costs = root.querySelectorAll("costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_h = cost.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
            let value = (_j = cost.getAttributeNode("value")) === null || _j === void 0 ? void 0 : _j.nodeValue;
            if (value) {
                if (which === "pts") {
                    unit._points += +value;
                }
            }
        }
    }
    let categories = root.querySelectorAll(":scope categories>category");
    for (let category of categories) {
        let catName = (_k = category.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
        let catPrimary = (_l = category.getAttributeNode("primary")) === null || _l === void 0 ? void 0 : _l.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != AoSUnitRole.NONE) {
                unit._role = unitRole;
            }
            else {
                // Keyword
                unit._keywords.add(catName);
            }
        }
    }
    return unit;
}
function ParseAllegiance(root) {
    var _a, _b, _c, _d, _e;
    let allegiance = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (name) {
            allegiance = new AoSAllegiance();
            allegiance._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            if (profName && profType) {
                if (profType == "Battle Trait") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            (_d = allegiance) === null || _d === void 0 ? void 0 : _d._battleTraits.set(profName, description);
                        }
                    }
                }
                else if (profType == "Command Abilities") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            (_e = allegiance) === null || _e === void 0 ? void 0 : _e._commandAbilities.set(profName, description);
                        }
                    }
                }
                else {
                    console.log("Unexpected allegiance profile type: " + profType);
                }
            }
        }
    }
    return allegiance;
}
