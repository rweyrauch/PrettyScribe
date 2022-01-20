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
exports.Compare = exports.CreateKT21Roster = exports.RosterKT21 = exports.Force = exports.Operative = exports.OperativeRoleToString = exports.Specialism = exports.PsychicPowerWeapon = exports.PsychicPower = exports.UniqueActions = exports.Weapons = exports.BaseNotes = void 0;
const _ = __importStar(require("lodash"));
class BaseNotes {
    constructor() {
        this._name = "";
        this._customName = "";
        this._customNotes = "";
        this._costs = "0";
    }
    name() {
        if (this._customName)
            return this._customName;
        return this._name;
    }
    nameAndCosts() {
        let name = this._name;
        if (this._customName)
            name = this._customName;
        if (this.costs() > 0)
            name += ' (' + this.costs() + ' EP)';
        return name;
    }
    notes() {
        return this._customNotes;
    }
    costs() {
        return Math.floor(+this._costs);
    }
    equal(other) {
        if (other == null)
            return false;
        return (this._name === other._name);
    }
}
exports.BaseNotes = BaseNotes;
class Weapons extends BaseNotes {
    constructor() {
        super(...arguments);
        this._count = 0;
        this._attacks = "0";
        this._skill = "0+";
        this._damage = "0/0";
        this._rules = "";
        this._criticalEffects = "";
    }
}
exports.Weapons = Weapons;
class UniqueActions extends BaseNotes {
    constructor() {
        super(...arguments);
        this._description = "";
    }
}
exports.UniqueActions = UniqueActions;
class PsychicPower extends BaseNotes {
    constructor() {
        super(...arguments);
        this._effect = "";
        this._weapons = [];
    }
}
exports.PsychicPower = PsychicPower;
class PsychicPowerWeapon extends Weapons {
}
exports.PsychicPowerWeapon = PsychicPowerWeapon;
var Specialism;
(function (Specialism) {
    Specialism[Specialism["NONE"] = 0] = "NONE";
    Specialism[Specialism["COMBAT"] = 1] = "COMBAT";
    Specialism[Specialism["STAUNCH"] = 2] = "STAUNCH";
    Specialism[Specialism["MARKSMAN"] = 3] = "MARKSMAN";
    Specialism[Specialism["SCOUT"] = 4] = "SCOUT";
})(Specialism = exports.Specialism || (exports.Specialism = {}));
exports.OperativeRoleToString = [
    'None',
    'Combat',
    'Staunch',
    'Marksman',
    'Scout'
];
class Operative extends BaseNotes {
    constructor() {
        super(...arguments);
        this._role = Specialism.NONE;
        this._model = "";
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._move = "0\"";
        this._apl = "0";
        this._groupActivations = "0";
        this._defence = 0;
        this._saves = "0+";
        this._wounds = 0;
        this._weapons = [];
        this._upgrades = [];
        this._psychicPowers = [];
        this._psychicPowersWeapon = [];
    }
    equal(operative) {
        if (operative == null)
            return false;
        if ((operative._name === this._name) && (operative._role === this._role) &&
            (operative._weapons.length === this._weapons.length)) {
            for (let mi = 0; mi < this._weapons.length; mi++) {
                if (!this._weapons[mi].equal(operative._weapons[mi])) {
                    return false;
                }
            }
            if (!_.isEqual(this._abilities, operative._abilities)) {
                return false;
            }
            else if (!_.isEqual(this._rules, operative._rules)) {
                return false;
            }
            return true;
        }
        return false;
    }
    nameAndGear() {
        let name = super.name();
        if (this._weapons.length > 0 || this._upgrades.length > 0) {
            let mi = 0;
            name += " (";
            for (const weapon of this._weapons) {
                name += weapon.name();
                mi++;
                if (mi != this._weapons.length) {
                    name += ",  ";
                }
            }
            if (this._upgrades.length > 0 && !name.endsWith("(")) {
                name += ",  ";
            }
            name += this._upgrades.join(", ");
            name += ")";
        }
        return name;
    }
    normalize() {
        this._weapons.sort(CompareObj);
        this._upgrades.sort(Compare);
        for (let i = 0; i < (this._weapons.length - 1); i++) {
            const weapon = this._weapons[i];
            if (weapon._name === this._weapons[i + 1]._name) {
                weapon._count++;
                this._weapons.splice(i + 1, 1);
                i--;
            }
        }
    }
}
exports.Operative = Operative;
class Force extends BaseNotes {
    constructor() {
        super(...arguments);
        this._catalog = "";
        this._faction = "Unknown";
        this._factionRules = new Map();
        this._rules = new Map();
        this._leader = null;
        this._operatives = [];
    }
}
exports.Force = Force;
class RosterKT21 extends BaseNotes {
    constructor() {
        super(...arguments);
        this._equipmentPoints = 0;
        this._forces = [];
    }
}
exports.RosterKT21 = RosterKT21;
function CreateKT21Roster(doc) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterKT21();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Kill Team (2021) Army Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);
            return roster;
        }
    }
    return null;
}
exports.CreateKT21Roster = CreateKT21Roster;
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which == " EP") {
                    roster._equipmentPoints = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster) {
    var _a, _b, _c;
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
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
                f._faction = value;
            }
            if (!DuplicateForce(f, roster)) {
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
            }
            ParseSelections(root, f);
            roster._forces.push(f);
        }
    }
}
function ParseSelections(root, force) {
    var _a;
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let selectionName = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionName)
            continue;
        if (selectionName === "Game Type")
            continue;
        if (selectionName.includes("Detachment Command Cost")) {
            console.log("Found Detachment Command Cost");
        }
        else {
            let operative = ParseOperative(selection);
            if (operative) {
                if (operative._keywords.has("Leader")) {
                    force._leader = operative;
                }
                else {
                    force._operatives.push(operative);
                }
                for (const entry of operative._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            }
            else if (selection.getAttribute("type") === "upgrade") {
                ExtractRuleFromSelection(selection, force._rules);
                const props = selection.querySelectorAll("selections>selection");
                for (let prop of props) {
                    const name = prop.getAttribute("name");
                    if (name && prop.getAttribute("type") === "upgrade") {
                        if (force._faction === "Unknown") {
                            force._faction = name;
                        }
                        ExtractRuleFromSelection(prop, force._factionRules);
                    }
                }
            }
        }
    }
    for (const key of force._factionRules.keys()) {
        force._rules.delete(key);
    }
    force._operatives.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role) {
            if (a._name > b._name)
                return 1;
            else if (a._name == b._name)
                return 0;
            return -1;
        }
        return -1;
    });
}
function DuplicateForce(force, roster) {
    if (!roster || !force)
        return false;
    for (let f of roster._forces) {
        if (f._catalog === force._catalog)
            return true;
    }
    return false;
}
function ExtractRuleFromSelection(root, map) {
    var _a, _b, _c, _d, _e;
    const props = root.querySelectorAll(":scope profiles>profile");
    for (const prop of props) {
        const propName = (_a = prop.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        const propType = (_b = prop.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        console.log("Prop name:" + propName + "  Type: " + propType);
        if (propName && propType) {
            if (propType === "Abilities" || propType === "Dynastic Code") {
                const chars = prop.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = (_c = char.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            map.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapons") {
                const rules = root.querySelectorAll("rules>rule");
                for (const rule of rules) {
                    if (rule.getAttributeNode("name")) {
                        map.set((_d = rule.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue, (_e = rule.firstChild) === null || _e === void 0 ? void 0 : _e.textContent);
                    }
                }
            }
        }
    }
}
function LookupRoleKillTeam(roleText) {
    switch (roleText) {
        case 'Combat':
            return Specialism.COMBAT;
        case 'Staunch':
            return Specialism.STAUNCH;
        case 'Marksman':
            return Specialism.MARKSMAN;
        case 'Scout':
            return Specialism.SCOUT;
    }
    return Specialism.NONE;
}
function parseUnknownProfile(prop, operative) {
    var _a, _b;
    let propName = (_a = prop.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    let propType = (_b = prop.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
    console.log("Unknown profile type: " + propType + " with name: " + propName + ".  Found in operative: " + operative._name);
}
function ExpandBaseNotes(root, obj) {
    var _a, _b, _c;
    obj._name = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    let element = root;
    if (root.tagName === "profile" && root.parentElement && root.parentElement.parentElement) {
        element = root.parentElement.parentElement;
    }
    obj._customName = (_b = element.getAttributeNode("customName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
    let child = element.firstElementChild;
    if (child && child.tagName === "customNotes") {
        obj._customNotes = child.textContent;
    }
    if (element.tagName === "selection") {
        let costNode = element.querySelector("costs>cost");
        if (costNode && costNode.getAttributeNode("value"))
            obj._costs = (_c = costNode.getAttributeNode("value")) === null || _c === void 0 ? void 0 : _c.nodeValue;
    }
    return obj._name;
}
function ExtractNumberFromParent(root) {
    var _a;
    if (root.parentElement && root.parentElement.parentElement) {
        const parentSelection = root.parentElement.parentElement;
        const countValue = (_a = parentSelection.getAttributeNode("number")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (countValue) {
            return +countValue;
        }
    }
    return 0;
}
function ParseOperative(root) {
    var _a, _b, _c, _d, _e;
    let operative = new Operative();
    const operativeName = ExpandBaseNotes(root, operative);
    let categories = root.querySelectorAll(":scope categories>category");
    for (let cat of categories) {
        const catName = (_a = cat.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                operative._factions.add(factKeyword);
            }
            else {
                const roleText = catName.trim();
                let operativeRole = LookupRoleKillTeam(roleText);
                if (operativeRole != Specialism.NONE) {
                    operative._role = operativeRole;
                }
                else {
                    operative._keywords.add(catName);
                }
            }
        }
    }
    let seenProfiles = [];
    let seenSelections = [];
    for (let profile of root.querySelectorAll('profile[typeName="Operative"]')) {
        let selection = (_b = profile.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        if (!selection || seenSelections.includes(selection)) {
            continue;
        }
        seenSelections.push(selection);
        let props = Array.from(selection.querySelectorAll(":scope profiles>profile") || []);
        ParseModelProfiles(props, operative, operativeName);
        seenProfiles = seenProfiles.concat(props);
    }
    let props = Array.from(root.querySelectorAll(":scope profiles>profile"));
    let unseenProps = props.filter((e) => !seenProfiles.includes(e));
    ParseModelProfiles(unseenProps, operative, operativeName, true);
    let costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_c = cost.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            let value = (_d = cost.getAttributeNode("value")) === null || _d === void 0 ? void 0 : _d.nodeValue;
            if (which == " EP" && value && +value > 0) {
                operative._costs = (operative.costs() + parseInt(value)).toString();
            }
        }
    }
    let rules = root.querySelectorAll("rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = (_e = rule.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
            let desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                operative._rules.set(ruleName, desc.textContent);
            }
        }
    }
    operative.normalize();
    return operative;
}
function ParseModelProfiles(props, operative, operativeName, appliesToAllModels = false) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    for (let prop of props) {
        const propName = (_a = prop.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        const propType = (_b = prop.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (propName && propType) {
            if (propType === "Operative") {
                let name = operative._name;
                ExpandBaseNotes(prop, operative);
                operative._model = operative._name;
                operative._name = name;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_c = char.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'M':
                                    operative._move = char.textContent;
                                    break;
                                case 'APL':
                                    operative._apl = char.textContent;
                                    break;
                                case 'GA':
                                    operative._groupActivations = char.textContent;
                                    break;
                                case 'DF':
                                    operative._defence = +char.textContent;
                                    break;
                                case 'SV':
                                    operative._saves = char.textContent;
                                    break;
                                case 'W':
                                    operative._wounds = +char.textContent;
                                    break;
                            }
                        }
                    }
                }
            }
            else if ((propType === "Abilities") || (propType === "Equipment") || (propType === "Ability") || (propType === "Unique Actions")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                    if (charName && char.textContent && propName) {
                        let costNode = (_f = (_e = prop.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.querySelector("costs>cost");
                        let name = propName;
                        if (costNode && ((_g = costNode.getAttributeNode("value")) === null || _g === void 0 ? void 0 : _g.nodeValue)) {
                            let cost = (_h = costNode.getAttributeNode("value")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                            if (cost && +cost > 0)
                                name += ' (' + Math.floor(+cost) + ' EP)';
                        }
                        operative._abilities.set(name, char.textContent);
                    }
                }
                if (prop.parentElement && prop.parentElement.parentElement) {
                    const parentSelection = prop.parentElement.parentElement;
                    let typeValue = (_j = parentSelection.getAttributeNode("type")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                    if (typeValue === "upgrade") {
                        if (parentSelection.parentElement && parentSelection.parentElement.parentElement) {
                            const superParentSelection = parentSelection.parentElement.parentElement;
                            let typeValue = (_k = superParentSelection.getAttributeNode("type")) === null || _k === void 0 ? void 0 : _k.nodeValue;
                            if (typeValue === "model") {
                                operative._upgrades.push(propName);
                            }
                        }
                    }
                }
            }
            else if (propType === "Weapons") {
                let weapon = new Weapons();
                ExpandBaseNotes(prop, weapon);
                if (prop.parentElement && prop.parentElement.parentElement) {
                    const parentSelection = prop.parentElement.parentElement;
                    ExtractRuleFromSelection(parentSelection, operative._rules);
                }
                weapon._count = ExtractNumberFromParent(prop);
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_l = char.getAttributeNode("name")) === null || _l === void 0 ? void 0 : _l.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'A':
                                    weapon._attacks = char.textContent;
                                    break;
                                case 'WS/BS':
                                    weapon._skill = char.textContent;
                                    break;
                                case 'D':
                                    weapon._damage = char.textContent;
                                    break;
                                case 'SR':
                                    weapon._rules = char.textContent;
                                    break;
                                case '!':
                                    weapon._criticalEffects = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                operative._weapons.push(weapon);
            }
            else if (propType == "Psychic Power") {
                let power = new PsychicPower();
                ExpandBaseNotes(prop, power);
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                    if (charName === 'Effect') {
                        if (char.textContent) {
                            power._effect = char.textContent;
                        }
                    }
                }
                operative._psychicPowers.push(power);
            }
            else {
                parseUnknownProfile(prop, operative);
            }
        }
    }
}
function CompareObj(a, b) {
    return Compare(a._name, b._name);
}
function Compare(a, b) {
    if (a > b)
        return 1;
    else if (a == b)
        return 0;
    return -1;
}
exports.Compare = Compare;
//# sourceMappingURL=rosterKT21.js.map