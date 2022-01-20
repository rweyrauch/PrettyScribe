"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWarcryRoster = exports.RosterWarcry = exports.WarcryForce = exports.WarcryUnit = exports.WarcryDamageTable = exports.WarcryUnitRoleToString = exports.WarcryUnitRole = exports.WarcryWeapon = exports.WarcryAllegiance = void 0;
class WarcryAllegiance {
    constructor() {
        this._name = "";
        this._rules = new Map();
    }
}
exports.WarcryAllegiance = WarcryAllegiance;
class WarcryWeapon {
    constructor() {
        this._name = "";
        this._range = "";
        this._attacks = "";
        this._strength = "";
        this._damage = "";
    }
}
exports.WarcryWeapon = WarcryWeapon;
var WarcryUnitRole;
(function (WarcryUnitRole) {
    WarcryUnitRole[WarcryUnitRole["NONE"] = 0] = "NONE";
    WarcryUnitRole[WarcryUnitRole["LEADER"] = 1] = "LEADER";
    WarcryUnitRole[WarcryUnitRole["FIGHTER"] = 2] = "FIGHTER";
    WarcryUnitRole[WarcryUnitRole["ALLY"] = 3] = "ALLY";
    WarcryUnitRole[WarcryUnitRole["MONSTER"] = 4] = "MONSTER";
    WarcryUnitRole[WarcryUnitRole["HERO"] = 5] = "HERO";
    WarcryUnitRole[WarcryUnitRole["THRALL"] = 6] = "THRALL";
})(WarcryUnitRole = exports.WarcryUnitRole || (exports.WarcryUnitRole = {}));
;
exports.WarcryUnitRoleToString = [
    'None',
    'Leader',
    'Fighter',
    'Ally',
    'Monster',
    'Hero',
    'Thrall'
];
class WarcryDamageTable {
    constructor() {
        this._name = "";
        this._table = new Map();
    }
}
exports.WarcryDamageTable = WarcryDamageTable;
;
class WarcryUnit {
    constructor() {
        this._name = "";
        this._role = WarcryUnitRole.NONE;
        this._faction = "chaos-iron-golems";
        this._keywords = new Set();
        this._abilities = new Map();
        this._move = "1";
        this._wounds = "1";
        this._toughness = "1";
        this._weapons = [];
        this._damageTable = [];
        this._points = 0;
    }
}
exports.WarcryUnit = WarcryUnit;
class WarcryForce {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._units = [];
        this._allegiance = new WarcryAllegiance();
    }
}
exports.WarcryForce = WarcryForce;
;
class RosterWarcry {
    constructor() {
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
exports.RosterWarcry = RosterWarcry;
;
function GetFactionRunemarkFromKeyword(name) {
    const name_ref = name.toLowerCase();
    if (name_ref.includes("chaotic beasts")) {
        return "monster-chaotic-beasts";
    }
    else if (name_ref.includes("monster")) {
        if (name_ref.includes("order"))
            return "monster-of-order";
        else if (name_ref.includes("destruction"))
            return "monster-of-destruction";
        else if (name_ref.includes("death"))
            return "monster-of-death";
        else
            return "monster-chaotic-beasts";
    }
    else if (name_ref.includes("beasts of chaos")) {
        return "factions-chaos-beasts-of-chaos";
    }
    else if (name_ref.includes("corvus")) {
        return "factions-chaos-corvus-cabal";
    }
    else if (name_ref.includes("cypher")) {
        return "factions-chaos-cypher-lords";
    }
    else if (name_ref.includes("everchosen")) {
        return "factions-chaos-everchosen";
    }
    else if (name_ref.includes("golems")) {
        return "factions-chaos-iron-golems";
    }
    else if (name_ref.includes("khorne") && name_ref.includes("bloodbound")) {
        return "factions-chaos-khorne-bloodbound";
    }
    else if (name_ref.includes("khorne") && name_ref.includes("daemon")) {
        return "factions-chaos-khorne-daemons";
    }
    else if (name_ref.includes("nurgle") && name_ref.includes("rotbringer")) {
        return "factions-chaos-nurgle-rotbringers";
    }
    else if (name_ref.includes("nurgle") && name_ref.includes("daemon")) {
        return "factions-chaos-nurgle-daemons";
    }
    else if (name_ref.includes("scions")) {
        return "factions-chaos-scions-of-the-flame";
    }
    else if (name_ref.includes("skaven")) {
        return "factions-chaos-skaven";
    }
    else if (name_ref.includes("slaanesh") && name_ref.includes("sybariteI g")) {
        return "factions-chaos-slaanesh-syberites";
    }
    else if (name_ref.includes("slaanesh") && name_ref.includes("daemon")) {
        return "factions-chaos-slaanesh-daemons";
    }
    else if (name_ref.includes("slaves")) {
        return "factions-chaos-slaves-to-darkness";
    }
    else if (name_ref.includes("spire")) {
        return "factions-chaos-spire-tyrants";
    }
    else if (name_ref.includes("splintered")) {
        return "factions-chaos-splintered-fang";
    }
    else if (name_ref.includes("unmade")) {
        return "factions-chaos-the-unmade";
    }
    else if (name_ref.includes("tzeentch") && name_ref.includes("arcanite")) {
        return "factions-chaos-tzeentch-arcanites";
    }
    else if (name_ref.includes("tzeentch") && name_ref.includes("daemon")) {
        return "factions-chaos-tzeentch-daemons";
    }
    else if (name_ref.includes("untamed")) {
        return "factions-chaos-untamed-beasts";
    }
    else if (name_ref.includes("flesh")) {
        return "factions-death-flesh-eater-courts";
    }
    else if (name_ref.includes("nagash")) {
        return "factions-death-legions-of-nagash";
    }
    else if (name_ref.includes("nighthaunt")) {
        return "factions-death-nighthaunt";
    }
    else if (name_ref.includes("ossiarch")) {
        return "factions-death-ossiarch-bonereapers";
    }
    else if (name_ref.includes("soulblight")) {
        return "factions-death-soulblight-gravelords";
    }
    else if (name_ref.includes("bonesplitterz")) {
        return "factions-destruction-bonesplitterz";
    }
    else if (name_ref.includes("fimirach")) {
        return "factions-destruction-fimirach";
    }
    else if (name_ref.includes("gloomspite")) {
        return "factions-destruction-gloomspite-gitz";
    }
    else if (name_ref.includes("ironjawz")) {
        return "factions-destruction-ironjawz";
    }
    else if (name_ref.includes("kruleboyz")) {
        return "factions-destruction-kruleboyz";
    }
    else if (name_ref.includes("ogor")) {
        return "factions-destruction-ogor-mawtribes";
    }
    else if (name_ref.includes("cities of sigmar")) {
        return "factions-order-cities-of-sigmar";
    }
    else if (name_ref.includes("khaine")) {
        return "factions-order-daughters-of-khaine";
    }
    else if (name_ref.includes("fyreslayers")) {
        return "factions-order-fyreslayers";
    }
    else if (name_ref.includes("idoneth")) {
        return "factions-order-idoneth-deepkin";
    }
    else if (name_ref.includes("shadowstalkers")) {
        return "factions-order-khainite-shadowstalkers";
    }
    else if (name_ref.includes("kharadron")) {
        return "factions-order-kharadron-overlords";
    }
    else if (name_ref.includes("lumineth")) {
        return "factions-order-lumineth-realmlords";
    }
    else if (name_ref.includes("seraphon")) {
        return "factions-order-seraphon";
    }
    else if (name_ref.includes("stormcast")) {
        if (name_ref.includes("sacrosanct"))
            return "factions-order-stormcast-eternals-sacrosanct";
        else if (name_ref.includes("thunderstrike"))
            return "factions-order-stormcast-eternals-thunderstrike";
        else if (name_ref.includes("vanguard"))
            return "factions-order-stormcast-eternals-vanguard";
        else
            return "factions-order-stormcast-eternals-warrior";
    }
    else if (name_ref.includes("sylvaneth")) {
        return "factions-order-sylvaneth";
    }
    return "";
}
function LookupRole(roleText) {
    if (roleText.includes('Leader'))
        return WarcryUnitRole.LEADER;
    else if (roleText.includes('Fighter'))
        return WarcryUnitRole.FIGHTER;
    else if (roleText.includes('Allies') || roleText.includes('Ally'))
        return WarcryUnitRole.ALLY;
    else if (roleText.includes('Monster'))
        return WarcryUnitRole.MONSTER;
    else if (roleText.includes('Hero'))
        return WarcryUnitRole.HERO;
    else if (roleText.includes('Thrall'))
        return WarcryUnitRole.THRALL;
    return WarcryUnitRole.NONE;
}
function CreateWarcryRoster(doc) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterWarcry();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Age of Sigmar Warcry Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);
            return roster;
        }
    }
    return null;
}
exports.CreateWarcryRoster = CreateWarcryRoster;
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
            let f = new WarcryForce();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            ParseAllegiance(root, f);
            ParseSelections(root, f);
            roster._forces.push(f);
        }
    }
    console.log(roster);
}
function ParseAllegiance(root, force) {
    var _a;
    let allegiance = new WarcryAllegiance();
    let rules = root.querySelectorAll("rules>rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = (_a = rule.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            var desc = rule.querySelector("rule>description");
            if (ruleName && desc && desc.textContent) {
                allegiance._rules.set(ruleName, desc.textContent);
            }
        }
    }
    force._allegiance = allegiance;
}
function ParseSelections(root, force) {
    var _a, _b;
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let selectionType = (_a = selection.getAttributeNode("type")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionType)
            continue;
        let selectionName = (_b = selection.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (!selectionName)
            continue;
        let unit = ParseUnit(selection);
        if (unit && (unit._role != WarcryUnitRole.NONE)) {
            force._units.push(unit);
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
function ParseUnit(root) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let unit = new WarcryUnit();
    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = (_a = prof.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        let profType = (_b = prof.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (profName && profType) {
            if (profType == "Model") {
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
                                unit._wounds = char.textContent;
                                break;
                            case 'Toughness':
                                unit._toughness = char.textContent;
                                break;
                        }
                    }
                }
            }
            else if (profType == "Weapon") {
                let weapon = new WarcryWeapon();
                weapon._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Range':
                                weapon._range = char.textContent;
                                break;
                            case 'Attacks':
                                weapon._attacks = char.textContent;
                                break;
                            case 'Strength':
                                weapon._strength = char.textContent;
                                break;
                            case 'Damage':
                                weapon._damage = char.textContent;
                                break;
                        }
                    }
                }
                unit._weapons.push(weapon);
            }
            else if (profType == "Damage Points Allocated") {
                let table = new WarcryDamageTable();
                table._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName && profName) {
                        if (char.textContent) {
                            table._table.set(charName, char.textContent);
                        }
                        else {
                            table._table.set(charName, "-");
                        }
                    }
                }
                unit._damageTable.push(table);
            }
            else {
                console.log("Unknown unit profile type: " + profType);
            }
        }
    }
    let costs = root.querySelectorAll("costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_f = cost.getAttributeNode("name")) === null || _f === void 0 ? void 0 : _f.nodeValue;
            let value = (_g = cost.getAttributeNode("value")) === null || _g === void 0 ? void 0 : _g.nodeValue;
            if (value) {
                if (which === "pts") {
                    unit._points += +value;
                }
            }
        }
    }
    let categories = root.querySelectorAll(":scope categories>category");
    for (let category of categories) {
        let catName = (_h = category.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != WarcryUnitRole.NONE) {
                unit._role = unitRole;
            }
            else {
                unit._keywords.add(catName);
            }
        }
    }
    let upgrades = root.querySelectorAll(":scope selections>selection");
    for (let upgrade of upgrades) {
        let name = (_j = upgrade.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
        if (name) {
            let factionName = GetFactionRunemarkFromKeyword(name);
            if (factionName.length > 0) {
                unit._faction = factionName;
            }
            else {
                unit._keywords.add(name);
            }
        }
    }
    return unit;
}
//# sourceMappingURL=rosterWarcry.js.map