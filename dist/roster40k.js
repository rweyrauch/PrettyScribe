export class Weapon {
    constructor() {
        this._name = "";
        this._range = "Melee";
        this._type = "Melee";
        this._str = "user";
        this._ap = "";
        this._damage = "";
        this._abilities = "";
    }
}
export class WoundTracker {
    constructor() {
        this._name = "";
        this._table = new Map();
    }
}
;
export class Explosion {
    constructor() {
        this._name = "";
        this._diceRoll = "";
        this._distance = "";
        this._mortalWounds = "";
    }
}
export class PsychicPower {
    constructor() {
        this._name = "";
        this._manifest = 0;
        this._range = "";
        this._details = "";
    }
}
export var UnitRole;
(function (UnitRole) {
    UnitRole[UnitRole["NONE"] = 0] = "NONE";
    // 40k
    UnitRole[UnitRole["HQ"] = 1] = "HQ";
    UnitRole[UnitRole["TR"] = 2] = "TR";
    UnitRole[UnitRole["EL"] = 3] = "EL";
    UnitRole[UnitRole["FA"] = 4] = "FA";
    UnitRole[UnitRole["HS"] = 5] = "HS";
    UnitRole[UnitRole["FL"] = 6] = "FL";
    UnitRole[UnitRole["DT"] = 7] = "DT";
    UnitRole[UnitRole["FT"] = 8] = "FT";
    UnitRole[UnitRole["LW"] = 9] = "LW";
    // Kill Team
    UnitRole[UnitRole["COMMANDER"] = 10] = "COMMANDER";
    UnitRole[UnitRole["LEADER"] = 11] = "LEADER";
    UnitRole[UnitRole["SPECIALIST"] = 12] = "SPECIALIST";
    UnitRole[UnitRole["NON_SPECIALIST"] = 13] = "NON_SPECIALIST";
})(UnitRole || (UnitRole = {}));
;
export const UnitRoleToString = [
    'None',
    // 40k
    'HQ',
    'Troops',
    'Elites',
    'Fast Attack',
    'Heavy Support',
    'Flyer',
    'Dedicated Transport',
    'Fortification',
    'Lord of War',
    // Kill Team
    'Commander',
    'Leader',
    'Specialist',
    'Non-specialist'
];
export class Model {
    constructor() {
        this._name = "";
        this._count = 0;
        // Characteristics
        this._move = "0\"";
        this._ws = "";
        this._bs = "";
        this._str = 4;
        this._toughness = 4;
        this._wounds = 1;
        this._attacks = "";
        this._leadership = 7;
        this._save = "";
        this._weapons = [];
        this._psychicPowers = [];
        this._explosions = [];
    }
}
;
export class Unit {
    constructor() {
        this._name = "";
        this._role = UnitRole.NONE;
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._models = [];
        this._points = 0;
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._woundTracker = [];
    }
}
export class Force {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._faction = "Unknown";
        this._rules = new Map();
        this._units = [];
    }
}
;
export class Roster40k {
    constructor() {
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
;
export function Create40kRoster(doc, is40k = true) {
    var _a;
    if (doc) {
        // Determine roster type (game system).
        var info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster40k();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "40k Army Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster, is40k);
            return roster;
        }
    }
    return null;
}
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    var costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which == " PL") {
                    roster._powerLevel = +value;
                }
                else if (which === "pts") {
                    roster._points = +value;
                }
                else if (which === "CP") {
                    roster._commandPoints = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster, is40k) {
    var _a, _b, _c;
    var forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
            let f = new Force();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            var rules = root.querySelectorAll("force>rules>rule");
            for (let rule of rules) {
                if (rule.hasAttribute("name")) {
                    let ruleName = (_c = rule.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    var desc = rule.querySelector("rule>description");
                    if (ruleName && desc) {
                        f._rules.set(ruleName, desc.textContent);
                    }
                }
            }
            ParseUnits(root, f, is40k);
            roster._forces.push(f);
        }
    }
}
function ParseUnits(root, force, is40k) {
    var selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        var unit = CreateUnit(selection, is40k);
        if (unit && unit._role != UnitRole.NONE) {
            force._units.push(unit);
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
function LookupRole(roleText) {
    switch (roleText) {
        case 'HQ': return UnitRole.HQ;
        case 'Troops': return UnitRole.TR;
        case 'Elites': return UnitRole.EL;
        case 'Fast Attack': return UnitRole.FA;
        case 'Heavy Support': return UnitRole.HS;
        case 'Flyer': return UnitRole.FL;
        case 'Dedicated Transport': return UnitRole.DT;
        case 'Fortification': return UnitRole.FT;
        case 'Lord of War': return UnitRole.LW;
    }
    return UnitRole.NONE;
}
function LookupRoleKillTeam(roleText) {
    switch (roleText) {
        case 'Commander': return UnitRole.COMMANDER;
        case 'Leader': return UnitRole.LEADER;
        case 'Specialist': return UnitRole.SPECIALIST;
        case 'Non-specialist': return UnitRole.NON_SPECIALIST;
    }
    return UnitRole.NONE;
}
function CreateUnit(root, is40k) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var unit = new Unit();
    var unitName = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }
    var categories = root.querySelectorAll(":scope categories>category");
    for (let cat of categories) {
        let catName = (_b = cat.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                unit._factions.add(factKeyword);
            }
            else {
                const roleText = catName.trim();
                var unitRole = LookupRole(roleText);
                if (unitRole != UnitRole.NONE) {
                    unit._role = unitRole;
                }
                else {
                    if (!is40k) {
                        unitRole = LookupRoleKillTeam(roleText);
                        if (unitRole != UnitRole.NONE) {
                            unit._role = unitRole;
                        }
                        else {
                            // Keyword
                            unit._keywords.add(catName);
                        }
                    }
                    else {
                        // Keyword
                        unit._keywords.add(catName);
                    }
                }
            }
        }
    }
    var props = root.querySelectorAll(":scope profiles>profile");
    for (let prop of props) {
        // What kind of prop is this
        let propName = (_c = prop.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
        let propType = (_d = prop.getAttributeNode("typeName")) === null || _d === void 0 ? void 0 : _d.nodeValue;
        if (propName && propType) {
            if ((propType === "Unit") || (propType === "Model")) {
                var model = new Model();
                model._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'M':
                                    model._move = char.textContent;
                                    break;
                                case 'WS':
                                    model._ws = char.textContent;
                                    break;
                                case 'BS':
                                    model._bs = char.textContent;
                                    break;
                                case 'S':
                                    model._str = +char.textContent;
                                    break;
                                case 'T':
                                    model._toughness = +char.textContent;
                                    break;
                                case 'W':
                                    model._wounds = +char.textContent;
                                    break;
                                case 'A':
                                    model._attacks = char.textContent;
                                    break;
                                case 'Ld':
                                    model._leadership = +char.textContent;
                                    break;
                                case 'Save':
                                    model._save = char.textContent;
                                    break;
                            }
                        }
                    }
                    // Get parent node (a selection) to determine model count.
                    if (prop.parentElement && prop.parentElement.parentElement) {
                        const parentSelection = prop.parentElement.parentElement;
                        let countValue = (_f = parentSelection.getAttributeNode("number")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                        if (countValue) {
                            model._count = +countValue;
                        }
                    }
                }
                unit._models.push(model);
            }
            else if ((propType === "Abilities") || (propType === "Wargear") || (propType === "Ability")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability")) {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                let weapon = new Weapon();
                weapon._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_h = char.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range':
                                    weapon._range = char.textContent;
                                    break;
                                case 'Type':
                                    weapon._type = char.textContent;
                                    break;
                                case 'S':
                                    weapon._str = char.textContent;
                                    break;
                                case 'AP':
                                    weapon._ap = char.textContent;
                                    break;
                                case 'D':
                                    weapon._damage = char.textContent;
                                    break;
                                case 'Abilities':
                                    weapon._abilities = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                if (unit._models.length) {
                    unit._models[unit._models.length - 1]._weapons.push(weapon);
                }
            }
            else if (propType.includes("Wound Track")) {
                let tracker = new WoundTracker();
                tracker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_j = char.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                    if (charName && propName) {
                        if (char.textContent) {
                            tracker._table.set(charName, char.textContent);
                        }
                        else {
                            tracker._table.set(charName, "-");
                        }
                    }
                }
                unit._woundTracker.push(tracker);
            }
            else if (propType == "Transport") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_k = char.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Capacity") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType == "Psychic Power") {
                let power = new PsychicPower();
                power._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_l = char.getAttributeNode("name")) === null || _l === void 0 ? void 0 : _l.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range':
                                    power._range = char.textContent;
                                    break;
                                case 'Warp Charge':
                                    power._manifest = +char.textContent;
                                    break;
                                case 'Details':
                                    power._details = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._models[unit._models.length - 1]._psychicPowers.push(power);
            }
            else if (propType == "Explosion") {
                let explosion = new Explosion();
                explosion._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Dice Roll':
                                    explosion._diceRoll = char.textContent;
                                    break;
                                case 'Distance':
                                    explosion._distance = char.textContent;
                                    break;
                                case 'Mortal Wounds':
                                    explosion._mortalWounds = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._models[unit._models.length - 1]._explosions.push(explosion);
            }
            else {
                console.log("Unknown profile type: " + propType);
            }
        }
    }
    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    var costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_o = cost.getAttributeNode("name")) === null || _o === void 0 ? void 0 : _o.nodeValue;
            let value = (_p = cost.getAttributeNode("value")) === null || _p === void 0 ? void 0 : _p.nodeValue;
            if (value) {
                if (which == " PL") {
                    unit._powerLevel += +value;
                }
                else if (which == "pts") {
                    unit._points += +value;
                }
                else if (which == "CP") {
                    unit._commandPoints += +value;
                }
            }
        }
    }
    var rules = root.querySelectorAll(":scope rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = (_q = rule.getAttributeNode("name")) === null || _q === void 0 ? void 0 : _q.nodeValue;
            var desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
            }
        }
    }
    return unit;
}
