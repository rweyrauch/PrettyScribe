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
exports.Compare = exports.CompareWeapon = exports.Create40kRoster = exports.Costs = exports.Roster40k = exports.Force = exports.Unit = exports.ProfileTable = exports.Model = exports.UnitRoleToString = exports.UnitRole = exports.PsychicPower = exports.Psyker = exports.Explosion = exports.WoundTracker = exports.Weapon = exports.BaseNotes = void 0;
const _ = __importStar(require("lodash"));
class BaseNotes {
    constructor() {
        this._name = "";
        this._customName = "";
        this._customNotes = "";
    }
    name() {
        if (this._customName)
            return this._customName;
        return this._name;
    }
    notes() {
        return this._customNotes;
    }
    equal(other) {
        if (other == null)
            return false;
        return (this._name === other._name);
    }
}
exports.BaseNotes = BaseNotes;
class Weapon extends BaseNotes {
    constructor() {
        super(...arguments);
        this._selectionName = "";
        this._count = 0;
        this._range = "Melee";
        this._type = "Melee";
        this._str = "user";
        this._ap = "";
        this._damage = "";
        this._abilities = "";
    }
}
exports.Weapon = Weapon;
class WoundTracker extends BaseNotes {
    constructor() {
        super(...arguments);
        this._name = "";
        this._table = new Map();
    }
}
exports.WoundTracker = WoundTracker;
class Explosion extends BaseNotes {
    constructor() {
        super(...arguments);
        this._name = "";
        this._diceRoll = "";
        this._distance = "";
        this._mortalWounds = "";
    }
}
exports.Explosion = Explosion;
class Psyker extends BaseNotes {
    constructor() {
        super(...arguments);
        this._cast = "";
        this._deny = "";
        this._powers = "";
        this._other = "";
    }
}
exports.Psyker = Psyker;
class PsychicPower extends BaseNotes {
    constructor() {
        super(...arguments);
        this._name = "";
        this._manifest = 0;
        this._range = "";
        this._details = "";
    }
}
exports.PsychicPower = PsychicPower;
var UnitRole;
(function (UnitRole) {
    UnitRole[UnitRole["NONE"] = 0] = "NONE";
    UnitRole[UnitRole["HQ"] = 1] = "HQ";
    UnitRole[UnitRole["TR"] = 2] = "TR";
    UnitRole[UnitRole["EL"] = 3] = "EL";
    UnitRole[UnitRole["FA"] = 4] = "FA";
    UnitRole[UnitRole["HS"] = 5] = "HS";
    UnitRole[UnitRole["FL"] = 6] = "FL";
    UnitRole[UnitRole["DT"] = 7] = "DT";
    UnitRole[UnitRole["FT"] = 8] = "FT";
    UnitRole[UnitRole["LW"] = 9] = "LW";
    UnitRole[UnitRole["AGENTS"] = 10] = "AGENTS";
    UnitRole[UnitRole["NF"] = 11] = "NF";
    UnitRole[UnitRole["SCD"] = 12] = "SCD";
    UnitRole[UnitRole["COMMANDER"] = 13] = "COMMANDER";
    UnitRole[UnitRole["LEADER"] = 14] = "LEADER";
    UnitRole[UnitRole["SPECIALIST"] = 15] = "SPECIALIST";
    UnitRole[UnitRole["NON_SPECIALIST"] = 16] = "NON_SPECIALIST";
})(UnitRole = exports.UnitRole || (exports.UnitRole = {}));
exports.UnitRoleToString = [
    'None',
    'HQ',
    'Troops',
    'Elites',
    'Fast Attack',
    'Heavy Support',
    'Flyer',
    'Dedicated Transport',
    'Fortification',
    'Lord of War',
    'Agent of the Imperium',
    'No Force Org Slot',
    'Supreme Command Detachment',
    'Commander',
    'Leader',
    'Specialist',
    'Non-specialist'
];
class Model extends BaseNotes {
    constructor() {
        super(...arguments);
        this._count = 0;
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
        this._upgrades = [];
        this._psyker = null;
        this._psychicPowers = [];
        this._explosions = [];
    }
    equal(model) {
        if (model == null)
            return false;
        if ((this._name === model._name) &&
            (this._count === model._count) &&
            (this._weapons.length === model._weapons.length) &&
            (this._upgrades.length === model._upgrades.length)) {
            for (let wi = 0; wi < this._weapons.length; wi++) {
                if (!this._weapons[wi].equal(model._weapons[wi])) {
                    return false;
                }
            }
            for (let wi = 0; wi < this._upgrades.length; wi++) {
                if (this._upgrades[wi] != model._upgrades[wi]) {
                    return false;
                }
            }
            if ((this._psyker != null) || (model._psyker != null))
                return false;
            return true;
        }
        return false;
    }
    nameAndGear() {
        let name = super.name();
        if (this._weapons.length > 0 || this._upgrades.length > 0) {
            const weaponNamesWithoutCount = [];
            const weaponNames = [];
            for (const weapon of this._weapons) {
                let wName = weapon._selectionName || weapon.name();
                weaponNamesWithoutCount.push(wName);
                if (weapon._count > 1) {
                    wName = `${weapon._count}x ${wName}`;
                }
                if (weaponNames.includes(wName))
                    continue;
                weaponNames.push(wName);
            }
            weaponNames.push(...this._upgrades.filter(e => !weaponNamesWithoutCount.includes(e)));
            name += ` (${weaponNames.join(', ')})`;
        }
        return name;
    }
    normalize() {
        this._weapons.sort(CompareWeapon);
        this._upgrades.sort(Compare);
        for (let i = 0; i < (this._weapons.length - 1); i++) {
            const weapon = this._weapons[i];
            if (weapon._name === this._weapons[i + 1]._name) {
                weapon._count++;
                this._weapons.splice(i + 1, 1);
                i--;
            }
        }
        for (let weapon of this._weapons) {
            if (weapon._count % this._count == 0) {
                weapon._count /= this._count;
            }
        }
    }
}
exports.Model = Model;
class ProfileTable {
    constructor() {
        this._name = "";
        this._table = [];
    }
}
exports.ProfileTable = ProfileTable;
class Unit extends BaseNotes {
    constructor() {
        super(...arguments);
        this._role = UnitRole.NONE;
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._models = [];
        this._modelStats = [];
        this._modelList = [];
        this._weapons = [];
        this._spells = [];
        this._psykers = [];
        this._explosions = [];
        this._points = 0;
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._woundTracker = [];
        this._profileTables = new Map();
        this._id = 0;
    }
    equal(unit) {
        if (unit == null)
            return false;
        if ((unit._name === this._name) && (unit._role === this._role) &&
            (unit._models.length === this._models.length) &&
            (unit._modelStats.length === this._modelStats.length)) {
            for (let mi = 0; mi < this._models.length; mi++) {
                if (!this._models[mi].equal(unit._models[mi])) {
                    return false;
                }
            }
            for (let mi = 0; mi < this._modelStats.length; mi++) {
                if (!this._modelStats[mi].equal(unit._modelStats[mi])) {
                    return false;
                }
            }
            if (!_.isEqual(this._abilities, unit._abilities)) {
                return false;
            }
            else if (!_.isEqual(this._rules, unit._rules)) {
                return false;
            }
            return true;
        }
        return false;
    }
    normalize() {
        this._models.sort(CompareModel);
        this._modelStats.sort(CompareObj);
        for (let model of this._models) {
            model.normalize();
        }
        for (let i = 0; i < (this._models.length - 1); i++) {
            const model = this._models[i];
            if (model.nameAndGear() === this._models[i + 1].nameAndGear()) {
                model._count++;
                this._models.splice(i + 1, 1);
                i--;
            }
        }
        for (let model of this._models) {
            model.normalize();
        }
        for (let i = 0; i < (this._modelStats.length - 1); i++) {
            const model = this._modelStats[i];
            if (model.equal(this._modelStats[i + 1])) {
                this._modelStats.splice(i + 1, 1);
                i--;
            }
        }
        this._modelList = this._models.map(model => (model._count > 1 ? `${model._count}x ` : '') + model.nameAndGear());
        this._weapons = this._models.map(m => m._weapons)
            .reduce((acc, val) => acc.concat(val), [])
            .sort(CompareWeapon)
            .filter((weap, i, array) => { var _a; return weap.name() !== ((_a = array[i - 1]) === null || _a === void 0 ? void 0 : _a.name()); });
        this._spells = this._models.map(m => m._psychicPowers).reduce((acc, val) => acc.concat(val), []);
        this._psykers = this._models.map(m => m._psyker).filter(p => p);
        this._explosions = this._models.map(m => m._explosions).reduce((acc, val) => acc.concat(val), []);
    }
}
exports.Unit = Unit;
class Force extends BaseNotes {
    constructor() {
        super(...arguments);
        this._catalog = "";
        this._faction = "Unknown";
        this._factionRules = new Map();
        this._configurations = [];
        this._rules = new Map();
        this._units = [];
    }
}
exports.Force = Force;
class Roster40k extends BaseNotes {
    constructor() {
        super(...arguments);
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._points = 0;
        this._forces = [];
    }
}
exports.Roster40k = Roster40k;
class Costs {
    constructor() {
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._points = 0;
    }
    hasValues() {
        return this._powerLevel !== 0 || this._commandPoints !== 0 || this._points !== 0;
    }
    add(other) {
        this._powerLevel += other._powerLevel;
        this._commandPoints += other._commandPoints;
        this._points += other._points;
    }
}
exports.Costs = Costs;
function Create40kRoster(doc, is40k = true) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
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
exports.Create40kRoster = Create40kRoster;
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    let costs = doc.querySelectorAll("roster>costs>cost");
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
    var _a, _b;
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
            }
            if (!DuplicateForce(f, roster)) {
                var rules = root.querySelectorAll("force>rules>rule");
                for (let rule of rules) {
                    ExtractRuleDescription(rule, f._rules);
                }
            }
            ParseSelections(root, f, is40k);
            roster._forces.push(f);
        }
    }
}
function ParseSelections(root, force, is40k) {
    var _a;
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let selectionName = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionName)
            continue;
        if (selectionName.includes("Detachment Command Cost")) {
        }
        else if (selectionName === 'Battle Size') {
            ParseConfiguration(selection, force);
        }
        else {
            let unit = ParseUnit(selection, is40k);
            if (unit && unit._role != UnitRole.NONE) {
                force._units.push(unit);
                for (const entry of unit._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            }
            else if (selection.getAttribute("type") === "upgrade") {
                ExtractRuleFromSelection(selection, force._rules);
                ParseConfiguration(selection, force);
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
    force._units.sort((a, b) => {
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
function ParseConfiguration(selection, force) {
    var _a;
    const name = selection.getAttribute("name");
    if (!name) {
        return;
    }
    const category = (_a = selection.querySelector("category")) === null || _a === void 0 ? void 0 : _a.getAttribute('name');
    const subSelections = selection.querySelectorAll('selections>selection');
    const details = [];
    let costs = new Costs();
    for (const sel of subSelections) {
        details.push(sel.getAttribute("name"));
        costs.add(GetSelectionCosts(sel));
    }
    let configuration = (!category || category === 'Configuration')
        ? name : `${category} - ${name}`;
    if (details.length > 0)
        configuration += `: ${details.join(", ")}`;
    if (costs._commandPoints !== 0)
        configuration += ` [${costs._commandPoints} CP]`;
    force._configurations.push(configuration);
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
    const profiles = root.querySelectorAll("profiles>profile");
    for (const profile of profiles) {
        const profileName = profile.getAttribute("name");
        const profileType = profile.getAttribute("typeName");
        console.log("Profile name:" + profileName + "  Type: " + profileType);
        if (profileName && profileType) {
            if (profileType === "Abilities" || profileType === "Dynastic Code") {
                const chars = profile.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttribute("name");
                    if (charName && char.textContent && profileName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            map.set(profileName, char.textContent);
                        }
                    }
                }
            }
        }
    }
    const rules = root.querySelectorAll("rules>rule");
    for (const rule of rules) {
        ExtractRuleDescription(rule, map);
    }
}
function ExtractRuleDescription(rule, map) {
    const ruleName = rule.getAttribute("name");
    const desc = rule.querySelector("description");
    if (ruleName && (desc === null || desc === void 0 ? void 0 : desc.textContent)) {
        map.set(ruleName, desc.textContent);
    }
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
        case 'Agent of the Imperium': return UnitRole.AGENTS;
        case 'No Force Org Slot': return UnitRole.NF;
        case 'Primarch | Daemon Primarch | Supreme Commander': return UnitRole.SCD;
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
function parseUnknownProfile(prop, unit) {
    var _a, _b, _c;
    let propName = (_a = prop.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    let propType = (_b = prop.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
    let grandfather = (_c = prop.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
    console.log("Unknown profile type: " + propType + " with name: " + propName + ".  Found in unit: " + unit._name);
    console.log("Unknown profile is grandchild of typeName: " + (grandfather === null || grandfather === void 0 ? void 0 : grandfather.getAttributeNode("typeName")) +
        " with the type: " + (grandfather === null || grandfather === void 0 ? void 0 : grandfather.getAttributeNode("type")) +
        " with the name: " + (grandfather === null || grandfather === void 0 ? void 0 : grandfather.getAttributeNode("name")));
}
function ExpandBaseNotes(root, obj) {
    var _a, _b;
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
function GetImmediateSelections(root) {
    const selections = [];
    for (const child of root.children) {
        if (child.tagName === 'selections') {
            for (const subChild of child.children) {
                if (subChild.tagName === 'selection') {
                    selections.push(subChild);
                }
            }
        }
    }
    return selections;
}
function HasImmediateProfileWithTypeName(root, typeName) {
    for (const child of root.children) {
        if (child.tagName === 'profiles') {
            for (const subChild of child.children) {
                if (subChild.tagName === 'profile' && subChild.getAttribute('typeName') === typeName) {
                    return true;
                }
            }
        }
    }
    return false;
}
function GetSelectionCosts(selection) {
    const costs = new Costs();
    for (const child of selection.children) {
        if (child.tagName === 'costs') {
            for (const subChild of child.children) {
                const name = subChild.getAttribute('name');
                const value = Number(subChild.getAttribute('value'));
                if (value && value !== 0) {
                    switch (name) {
                        case 'CP':
                            costs._commandPoints += +value;
                            break;
                        case ' PL':
                            costs._powerLevel += +value;
                            break;
                        case 'pts':
                            costs._points += +value;
                            break;
                    }
                }
            }
        }
    }
    return costs;
}
function ParseUnit(root, is40k) {
    var _a, _b, _c;
    let unit = new Unit();
    const unitName = ExpandBaseNotes(root, unit);
    let categories = root.querySelectorAll("categories>category");
    for (let cat of categories) {
        const catName = (_a = cat.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                unit._factions.add(factKeyword);
            }
            else {
                const roleText = catName.trim();
                let unitRole = LookupRole(roleText);
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
                            unit._keywords.add(catName);
                        }
                    }
                    else {
                        unit._keywords.add(catName);
                    }
                }
            }
        }
    }
    const seenProfiles = [];
    const modelStatsProfiles = Array.from(root.querySelectorAll('profile[typeName="Unit"],profile[typeName="Model"]'));
    ParseModelStatsProfiles(modelStatsProfiles, unit, unitName);
    seenProfiles.push(...modelStatsProfiles);
    const modelSelections = [];
    if (root.getAttribute('type') === 'model') {
        modelSelections.push(root);
    }
    else {
        const immediateSelections = GetImmediateSelections(root);
        for (const selection of immediateSelections) {
            if (selection.getAttribute('type') === 'model' || HasImmediateProfileWithTypeName(selection, 'Unit')) {
                modelSelections.push(selection);
            }
        }
        if (modelSelections.length === 0) {
            modelSelections.push(...Array.from(root.querySelectorAll('selection[type="model"]')));
        }
        if (modelSelections.length === 0 && HasImmediateProfileWithTypeName(root, 'Unit')) {
            modelSelections.push(root);
        }
    }
    for (const modelSelection of modelSelections) {
        const profiles = Array.from(modelSelection.querySelectorAll("profiles>profile"));
        const unseenProfiles = profiles.filter((e) => !seenProfiles.includes(e));
        seenProfiles.push(...unseenProfiles);
        const model = new Model();
        model._name = modelSelection.getAttribute('name') || 'Unknown Model';
        model._count = Number(modelSelection.getAttribute("number") || 1);
        unit._models.push(model);
        ParseModelProfiles(profiles, model, unit);
        for (const upgradeSelection of modelSelection.querySelectorAll('selections>selection[type="upgrade"]')) {
            if (upgradeSelection.querySelector('selections>selection[type="upgrade"]'))
                continue;
            let upgradeName = upgradeSelection.getAttribute('name');
            if (upgradeName) {
                const costs = GetSelectionCosts(upgradeSelection);
                if (costs._commandPoints !== 0) {
                    upgradeName += ` [${costs._commandPoints} CP]`;
                }
                model._upgrades.push(upgradeName);
            }
        }
    }
    const immediateSelections = GetImmediateSelections(root);
    for (const selection of immediateSelections) {
        if (selection.getAttribute('type') === 'upgrade' || HasImmediateProfileWithTypeName(selection, 'Abilities')) {
            let upgradeCosts = GetSelectionCosts(selection);
            if (upgradeCosts.hasValues()) {
                unit._points += upgradeCosts._points;
                unit._commandPoints += upgradeCosts._commandPoints;
                unit._powerLevel += upgradeCosts._powerLevel;
            }
        }
    }
    let profiles = Array.from(root.querySelectorAll("profiles>profile"));
    let unseenProfiles = profiles.filter((e) => !seenProfiles.includes(e));
    seenProfiles.push(...unseenProfiles);
    if (unseenProfiles.length > 0) {
        const unitUpgradesModel = new Model();
        unitUpgradesModel._name = 'Unit Upgrades';
        ParseModelProfiles(unseenProfiles, unitUpgradesModel, unit);
        if (unitUpgradesModel._weapons.length > 0 && unit._models.length > 0) {
            for (const model of unit._models) {
                model._weapons.push(...unitUpgradesModel._weapons);
            }
            unitUpgradesModel._weapons.length = 0;
        }
        if (unitUpgradesModel._weapons.length > 0 || unitUpgradesModel._upgrades.length > 0 || unitUpgradesModel._psychicPowers.length > 0 || unitUpgradesModel._psyker || unitUpgradesModel._explosions.length > 0) {
            unit._models.push(unitUpgradesModel);
        }
    }
    let costs = root.querySelectorAll("costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_b = cost.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            let value = (_c = cost.getAttributeNode("value")) === null || _c === void 0 ? void 0 : _c.nodeValue;
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
    let rules = root.querySelectorAll("rules > rule");
    for (let rule of rules) {
        ExtractRuleDescription(rule, unit._rules);
    }
    unit.normalize();
    return unit;
}
function ParseModelStatsProfiles(profiles, unit, unitName) {
    for (const profile of profiles) {
        const profileName = profile.getAttribute("name");
        const profileType = profile.getAttribute("typeName");
        if (!profileName || !profileType)
            return;
        const model = new Model();
        model._name = profileName;
        unit._modelStats.push(model);
        ExpandBaseNotes(profile, model);
        const chars = profile.querySelectorAll("characteristics>characteristic");
        for (const char of chars) {
            const charName = char.getAttribute("name");
            if (!charName)
                continue;
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
    }
}
function ParseModelProfiles(profiles, model, unit) {
    var _a, _b;
    for (const profile of profiles) {
        const profileName = profile.getAttribute("name");
        const typeName = profile.getAttribute("typeName");
        if (!profileName || !typeName)
            continue;
        if ((typeName === "Unit") || (typeName === "Model") || (profile.getAttribute("type") === "model")) {
        }
        else if ((typeName === "upgrade")) {
            model._upgrades.push(profileName);
        }
        else if ((typeName === "Abilities") || (typeName === "Wargear") || (typeName === "Ability") ||
            (typeName === "Household Tradition") || (typeName === "Warlord Trait") || (typeName === "Astra Militarum Orders") ||
            (typeName === "Tank Orders") || (typeName == "Lethal Ambush")) {
            ParseAbilityProfile(profile, profileName, unit);
        }
        else if (typeName === "Weapon") {
            const weapon = ParseWeaponProfile(profile);
            model._weapons.push(weapon);
        }
        else if (typeName.includes("Wound Track") || typeName.includes("Stat Damage") || typeName.includes(" Wounds")) {
            const tracker = ParseWoundTrackerProfile(profile);
            unit._woundTracker.push(tracker);
        }
        else if (typeName == "Transport") {
            ParseTransportProfile(profile, unit);
        }
        else if (typeName == "Psychic Power") {
            const power = ParsePsychicPowerProfile(profile);
            model._psychicPowers.push(power);
        }
        else if (typeName.includes("Explosion")) {
            const explosion = ParseExplosionProfile(profile);
            model._explosions.push(explosion);
        }
        else if (typeName == "Psyker") {
            const psyker = ParsePsykerProfile(profile);
            model._psyker = psyker;
        }
        else if (((_a = profile.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) && ((_b = profile.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement.getAttribute("type")) === 'upgrade') {
            ParseAbilityProfile(profile, profileName, unit);
        }
        else {
            parseUnknownProfile(profile, unit);
        }
    }
}
function ParseAbilityProfile(profile, profileName, unit) {
    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            if ((charName === "Description") || (charName === "Ability") || (charName === "Effect") || (charName === "Bonus")) {
                unit._abilities.set(profileName, char.textContent);
            }
        }
    }
}
function ParseWeaponProfile(profile) {
    var _a;
    const weapon = new Weapon();
    ExpandBaseNotes(profile, weapon);
    weapon._count = ExtractNumberFromParent(profile);
    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttribute("name");
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
    const selection = (_a = profile.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const selectionName = selection === null || selection === void 0 ? void 0 : selection.getAttribute('name');
    if ((selection === null || selection === void 0 ? void 0 : selection.getAttribute('type')) === 'upgrade' && selectionName) {
        weapon._selectionName = selectionName;
    }
    return weapon;
}
function ParseWoundTrackerProfile(profile) {
    let tracker = new WoundTracker();
    ExpandBaseNotes(profile, tracker);
    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        const charName = char.getAttribute("name");
        if (charName) {
            if (char.textContent) {
                tracker._table.set(charName, char.textContent);
            }
            else {
                tracker._table.set(charName, "-");
            }
        }
    }
    return tracker;
}
function ParseTransportProfile(profile, unit) {
    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttribute("name");
        if (charName && char.textContent) {
            if (charName === "Capacity") {
                unit._abilities.set('Transport', char.textContent);
            }
        }
    }
}
function ParsePsychicPowerProfile(profile) {
    const power = new PsychicPower();
    ExpandBaseNotes(profile, power);
    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
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
    return power;
}
function ParseExplosionProfile(profile) {
    const explosion = new Explosion();
    ExpandBaseNotes(profile, explosion);
    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
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
    return explosion;
}
function ParsePsykerProfile(profile) {
    const psyker = new Psyker();
    ExpandBaseNotes(profile, psyker);
    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            switch (charName) {
                case 'Cast':
                    psyker._cast = char.textContent;
                    break;
                case 'Deny':
                    psyker._deny = char.textContent;
                    break;
                case 'Powers Known':
                    psyker._powers = char.textContent;
                    break;
                case 'Other':
                    psyker._other = char.textContent;
                    break;
            }
        }
    }
    return psyker;
}
function CompareObj(a, b) {
    return Compare(a._name, b._name);
}
function CompareModel(a, b) {
    return Compare(a._name, b._name) || Compare(a.nameAndGear(), b.nameAndGear());
}
function CompareWeapon(a, b) {
    const aType = a._type.startsWith('Grenade') ? 2 : a._type.startsWith('Melee') ? 1 : 0;
    const bType = b._type.startsWith('Grenade') ? 2 : b._type.startsWith('Melee') ? 1 : 0;
    return (aType - bType) || a.name().localeCompare(b.name());
}
exports.CompareWeapon = CompareWeapon;
function Compare(a, b) {
    if (a > b)
        return 1;
    else if (a == b)
        return 0;
    return -1;
}
exports.Compare = Compare;
//# sourceMappingURL=roster40k.js.map