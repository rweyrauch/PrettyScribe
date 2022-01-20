"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAoSRoster = exports.RosterAoS = exports.AoSForce = exports.AoSUnit = exports.AoSUnitRoleToString = exports.AoSUnitRole = exports.AoSRealmOfBattle = exports.AoSSpecialRules = exports.AoSCoreBattalion = exports.AoSTriumph = exports.AoSGrandStrategy = exports.AoSAllegiance = exports.AoSPrayer = exports.AoSSpell = exports.AoSWoundTracker = exports.AoSWeapon = exports.AoSProfile = exports.AoSProfileType = void 0;
const _ = __importStar(require("lodash"));
class AoSProfileType {
    constructor() {
        this._typeName = "anonymous";
        this._fields = new Map();
    }
}
exports.AoSProfileType = AoSProfileType;
class AoSProfile {
    constructor() {
        this._name = "none";
        this._value = new AoSProfileType();
    }
}
exports.AoSProfile = AoSProfile;
class AoSWeapon {
    constructor() {
        this._name = "";
        this._type = "Melee";
        this._range = "";
        this._attacks = "";
        this._toHit = "";
        this._toWound = "";
        this._rend = "";
        this._damage = "";
    }
}
exports.AoSWeapon = AoSWeapon;
class AoSWoundTracker {
    constructor() {
        this._title = "";
        this._labels = [];
        this._table = [[]];
    }
}
exports.AoSWoundTracker = AoSWoundTracker;
;
class AoSSpell {
    constructor() {
        this._name = "";
        this._castingValue = 0;
        this._range = "";
        this._description = "";
    }
}
exports.AoSSpell = AoSSpell;
class AoSPrayer {
    constructor() {
        this._name = "";
        this._answerValue = 0;
        this._range = "";
        this._description = "";
    }
}
exports.AoSPrayer = AoSPrayer;
class AoSAllegiance {
    constructor() {
        this._name = "";
        this._battleTraits = new Map();
        this._commandAbilities = new Map();
        this._spells = [];
        this._extraProfiles = [];
    }
}
exports.AoSAllegiance = AoSAllegiance;
class AoSGrandStrategy {
    constructor() {
        this._name = "";
        this._description = "";
    }
}
exports.AoSGrandStrategy = AoSGrandStrategy;
class AoSTriumph {
    constructor() {
        this._name = "";
        this._description = "";
    }
}
exports.AoSTriumph = AoSTriumph;
class AoSCoreBattalion {
    constructor() {
        this._name = "";
        this._abilities = new Map();
    }
}
exports.AoSCoreBattalion = AoSCoreBattalion;
class AoSSpecialRules {
    constructor() {
        this._name = "";
        this._description = "";
    }
}
exports.AoSSpecialRules = AoSSpecialRules;
class AoSRealmOfBattle {
    constructor() {
        this._name = "";
        this._spells = [];
        this._commandAbilities = new Map();
        this._rules = [];
    }
}
exports.AoSRealmOfBattle = AoSRealmOfBattle;
var AoSUnitRole;
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
})(AoSUnitRole = exports.AoSUnitRole || (exports.AoSUnitRole = {}));
;
exports.AoSUnitRoleToString = [
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
class AoSUnit {
    constructor() {
        this._name = "";
        this._id = 0;
        this._role = AoSUnitRole.NONE;
        this._keywords = new Set();
        this._abilities = new Map();
        this._commandAbilities = new Map();
        this._commandTraits = new Map();
        this._magic = new Map();
        this._artefacts = new Map();
        this._count = 0;
        this._move = "0\"";
        this._wounds = 1;
        this._bravery = 7;
        this._save = "";
        this._weapons = [];
        this._spells = [];
        this._prayers = [];
        this._points = 0;
        this._woundTracker = null;
        this._extraProfiles = [];
        this._selections = new Set();
    }
    equal(unit) {
        if (unit == null)
            return false;
        if ((unit._name === this._name) && (unit._role === this._role)) {
            if (!_.isEqual(this._commandTraits, unit._commandTraits)) {
                return false;
            }
            if (!_.isEqual(this._artefacts, unit._artefacts)) {
                return false;
            }
            if (!_.isEqual(this._weapons, unit._weapons)) {
                return false;
            }
            return true;
        }
        return false;
    }
    isNormalUnit() {
        return (this._role == AoSUnitRole.ARTILLERY ||
            this._role == AoSUnitRole.BATTLELINE ||
            this._role == AoSUnitRole.BEHEMOTH ||
            this._role == AoSUnitRole.LEADER ||
            this._role == AoSUnitRole.OTHER);
    }
}
exports.AoSUnit = AoSUnit;
class AoSForce {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._units = [];
        this._battalions = [];
        this._rules = new Map();
        this._battleTactics = new Map();
        this._allegiance = new AoSAllegiance();
        this._grandStrategy = new AoSGrandStrategy();
        this._triumph = new AoSTriumph();
        this._realmOfBattle = new AoSRealmOfBattle();
    }
}
exports.AoSForce = AoSForce;
;
class RosterAoS {
    constructor() {
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
exports.RosterAoS = RosterAoS;
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
function CreateAoSRoster(doc) {
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
exports.CreateAoSRoster = CreateAoSRoster;
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
            ParseRules(root, f);
            roster._forces.push(f);
        }
    }
}
function ParseSelections(root, force) {
    var _a, _b, _c, _d, _e, _f, _g;
    let selections = root.querySelectorAll("force>selections>selection");
    let unit_id = 0;
    for (let selection of selections) {
        let selectionName = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionName)
            continue;
        if (selectionName.includes("Allegiance")) {
            let allegiance = ParseAllegiance(selection);
            if (allegiance) {
                force._allegiance = allegiance;
            }
        }
        else if (selectionName.includes('Grand Strategy')) {
            let strategy = ParseGrandStrategy(selection);
            if (strategy) {
                force._grandStrategy = strategy;
            }
        }
        else if (selectionName.includes('Game Type')) {
        }
        else if (selectionName.includes('Core Battalion')) {
            let battalion = new AoSCoreBattalion();
            battalion._name = selectionName;
            let profiles = selection.querySelectorAll("profiles>profile");
            for (let prof of profiles) {
                for (let prof of profiles) {
                    let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
                    let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    if (profName && profType) {
                        let chars = prof.querySelectorAll("characteristics>characteristic");
                        for (let char of chars) {
                            let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                            if (charName && char.textContent) {
                                battalion._abilities.set(charName, char.textContent);
                            }
                        }
                    }
                }
            }
            force._battalions.push(battalion);
        }
        else if (selectionName.includes('Realm of Battle')) {
            let realm = ParseRealmOfBattle(selection);
            if (realm) {
                force._realmOfBattle = realm;
            }
        }
        else if (selectionName.includes('Triumphs')) {
            let triumph = ParseTriumph(selection);
            if (triumph) {
                force._triumph = triumph;
            }
        }
        else if (selectionName.includes("Battle Tactic")) {
            let profiles = selection.querySelectorAll("profiles>profile");
            for (let prof of profiles) {
                for (let prof of profiles) {
                    let profName = (_e = prof.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    let profType = (_f = prof.getAttributeNode("typeName")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                    if (profName && profType) {
                        let chars = prof.querySelectorAll("characteristics>characteristic");
                        for (let char of chars) {
                            let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                            if (charName && char.textContent) {
                                force._battleTactics.set(profName, char.textContent);
                            }
                        }
                    }
                }
            }
        }
        else {
            let unit = ParseUnit(selection);
            if (unit && (unit._role != AoSUnitRole.NONE)) {
                unit._id = unit_id++;
                force._units.push(unit);
            }
        }
    }
    force._units.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role)
            return 0;
        return -1;
    });
}
function ParseRules(root, force) {
    var _a;
    let rules = root.querySelectorAll("force>rules>rule");
    for (let rule of rules) {
        let ruleName = (_a = rule.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        let descriptions = rule.querySelectorAll("description");
        if (!ruleName || !descriptions) {
            continue;
        }
        for (let desc of descriptions) {
            if (desc.textContent)
                force._rules.set(ruleName, desc.textContent);
        }
    }
}
function ParseUnit(root) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    let unit = new AoSUnit();
    let defaultName = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    if (defaultName) {
        unit._name = defaultName;
    }
    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
        if (profName && profType) {
            if (profType == "Unit") {
                if (!unit._name)
                    unit._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
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
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
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
                    let charName = (_f = char.getAttributeNode("name")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Casting Value':
                                spell._castingValue = +char.textContent;
                                break;
                            case 'Range':
                                spell._range = char.textContent;
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
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
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
                    let charName = (_h = char.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Answer Value':
                                prayer._answerValue = +char.textContent;
                                break;
                            case 'Range':
                                prayer._range = char.textContent;
                                break;
                            case 'Description':
                                prayer._description = char.textContent;
                                break;
                        }
                    }
                }
                unit._prayers.push(prayer);
            }
            else if (profType.includes("Damage Table") || profType.includes("Wounds") || profType.includes("Wound Track") || profType.includes("Wound Table")) {
                let values = [];
                if (!unit._woundTracker) {
                    unit._woundTracker = new AoSWoundTracker();
                    unit._woundTracker._title = profType;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    if (chars.length == 3) {
                        unit._woundTracker._labels.push("Wounds Suffered");
                        values.push(profName);
                        for (let char of chars) {
                            let label = (_j = char.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                            if (label)
                                unit._woundTracker._labels.push(label);
                            else
                                unit._woundTracker._labels.push("Unknown");
                            if (char.textContent)
                                values.push(char.textContent);
                            else
                                values.push("Unknown");
                        }
                    }
                    else {
                        for (let char of chars) {
                            if (char.textContent)
                                unit._woundTracker._labels.push(char.textContent);
                            else
                                unit._woundTracker._labels.push("Unknown");
                        }
                    }
                    unit._woundTracker._table.push(values);
                    values = [];
                }
                else {
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    if (chars.length == 3) {
                        let label = profName;
                        if (label)
                            values.push(label);
                        else
                            values.push("Unknown");
                        for (let char of chars) {
                            if (char.textContent)
                                values.push(char.textContent);
                            else
                                values.push("Unknown");
                        }
                    }
                    else {
                        for (let char of chars) {
                            if (char.textContent)
                                values.push(char.textContent);
                            else
                                values.push("Unknown");
                        }
                    }
                    unit._woundTracker._table.push(values);
                    values = [];
                }
            }
            else {
                let profile = ParseGeneralProfile(prof);
                if (profile) {
                    unit._extraProfiles.push(profile);
                }
                else {
                    console.log("Unknown unit profile type: " + profType);
                }
            }
        }
    }
    let selections = root.querySelectorAll("selections>selection");
    for (let selection of selections) {
        let selectionName = (_k = selection.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
        if (selectionName) {
            unit._selections.add(selectionName);
            if (selectionName.includes("Wound Track")) {
                unit._woundTracker = new AoSWoundTracker();
                unit._woundTracker._title = selectionName;
                unit._woundTracker._labels = ["Wounds Suffered"];
                let profiles = selection.querySelectorAll("profiles>profile");
                let firstProfile = true;
                for (let prof of profiles) {
                    let wounds = (_l = prof.getAttributeNode("name")) === null || _l === void 0 ? void 0 : _l.nodeValue;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    let values = [];
                    if (wounds)
                        values.push(wounds);
                    else
                        values.push("--");
                    for (let char of chars) {
                        let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                        let textValue = char.textContent;
                        if (firstProfile) {
                            if (charName)
                                unit._woundTracker._labels.push(charName);
                            else
                                unit._woundTracker._labels.push("Unknown");
                        }
                        if (textValue)
                            values.push(textValue);
                        else
                            values.push("Unknown");
                    }
                    firstProfile = false;
                    unit._woundTracker._table.push(values);
                }
            }
        }
    }
    let costs = root.querySelectorAll("costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_o = cost.getAttributeNode("name")) === null || _o === void 0 ? void 0 : _o.nodeValue;
            let value = (_p = cost.getAttributeNode("value")) === null || _p === void 0 ? void 0 : _p.nodeValue;
            if (value) {
                if (which === "pts") {
                    unit._points += +value;
                }
            }
        }
    }
    let categories = root.querySelectorAll(":scope categories>category");
    for (let category of categories) {
        let catName = (_q = category.getAttributeNode("name")) === null || _q === void 0 ? void 0 : _q.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != AoSUnitRole.NONE) {
                unit._role = unitRole;
            }
            else {
                unit._keywords.add(catName);
            }
        }
    }
    return unit;
}
function ParseAllegiance(root) {
    var _a, _b, _c, _d;
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
                            allegiance === null || allegiance === void 0 ? void 0 : allegiance._battleTraits.set(profName, description);
                        }
                    }
                }
                else if (profType == "Command Abilities") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            allegiance === null || allegiance === void 0 ? void 0 : allegiance._commandAbilities.set(profName, description);
                        }
                    }
                }
                else if (profType == "Spell") {
                    let spell = new AoSSpell();
                    spell._name = profName;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                        if (charName && char.textContent) {
                            switch (charName) {
                                case 'Casting Value':
                                    spell._castingValue = +char.textContent;
                                    break;
                                case 'Range':
                                    spell._range = char.textContent;
                                    break;
                                case 'Description':
                                    spell._description = char.textContent;
                                    break;
                            }
                        }
                    }
                    allegiance === null || allegiance === void 0 ? void 0 : allegiance._spells.push(spell);
                }
                else {
                    let profile = ParseGeneralProfile(prof);
                    if (profile) {
                        allegiance === null || allegiance === void 0 ? void 0 : allegiance._extraProfiles.push(profile);
                    }
                    else {
                        console.log("Unexpected allegiance profile type: " + profType);
                    }
                }
            }
        }
    }
    return allegiance;
}
function ParseGrandStrategy(root) {
    var _a, _b, _c;
    let strategy = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (name) {
            strategy = new AoSGrandStrategy();
            strategy._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            if (profName && profType) {
                if (profType == "Grand Strategy") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            if (strategy)
                                strategy._description = description;
                        }
                    }
                }
                else {
                    console.log("Unexpected Grand Strategy profile type: " + profType);
                }
            }
        }
    }
    return strategy;
}
function ParseTriumph(root) {
    var _a, _b, _c;
    let triumph = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (name) {
            triumph = new AoSTriumph();
            triumph._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            if (profName && profType) {
                if (profType == "Triumph") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            if (triumph)
                                triumph._description = description;
                        }
                    }
                }
                else {
                    console.log("Unexpected Triumph profile type: " + profType);
                }
            }
        }
    }
    return triumph;
}
function ParseRealmOfBattle(root) {
    var _a, _b, _c, _d;
    let realm = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (name) {
            realm = new AoSRealmOfBattle();
            realm._name = name;
            let profiles = selection.querySelectorAll("profiles>profile");
            for (let prof of profiles) {
                let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
                let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                if (profName && profType) {
                    if (profType == "Spell") {
                        let spell = new AoSSpell();
                        spell._name = profName;
                        let chars = prof.querySelectorAll("characteristics>characteristic");
                        for (let char of chars) {
                            let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                            if (charName && char.textContent) {
                                switch (charName) {
                                    case 'Casting Value':
                                        spell._castingValue = +char.textContent;
                                        break;
                                    case 'Range':
                                        spell._range = char.textContent;
                                        break;
                                    case 'Description':
                                        spell._description = char.textContent;
                                        break;
                                }
                            }
                        }
                        realm._spells.push(spell);
                    }
                    else if (profType == "Command Abilities") {
                        let char = prof.querySelector("characteristics>characteristic");
                        if (char && char.textContent) {
                            realm._commandAbilities.set(profName, char.textContent);
                        }
                    }
                    else if (profType == "Special Rules") {
                        let char = prof.querySelector("characteristics>characteristic");
                        if (char && char.textContent) {
                            let rule = new AoSSpecialRules();
                            rule._name = profName;
                            rule._description = char.textContent;
                            realm._rules.push(rule);
                        }
                    }
                    else {
                        console.log("Unexpected Realm of Battle profile type: " + profType);
                    }
                }
            }
        }
    }
    return realm;
}
function ParseGeneralProfile(prof) {
    var _a, _b, _c;
    if (!prof)
        return null;
    let profName = (_a = prof.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    let profType = (_b = prof.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
    if (!profName || !profType)
        return null;
    let profile = new AoSProfile();
    profile._name = profName;
    profile._value._typeName = profType;
    let chars = prof.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = (_c = char.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
        if (charName && char.textContent) {
            profile._value._fields.set(charName, char.textContent);
        }
    }
    return profile;
}
//# sourceMappingURL=rosterAoS.js.map