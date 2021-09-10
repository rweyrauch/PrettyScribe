/*
    Copyright 2020 Rick Weyrauch,

    Permission to use, copy, modify, and/or distribute this software for any purpose 
    with or without fee is hereby granted, provided that the above copyright notice
    and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
    FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS 
    OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER 
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE 
    OF THIS SOFTWARE.
*/

export class WarcryAllegiance {
    _name: string = "";
    _rules: Map<string, string> = new Map();
}

export class WarcryWeapon {
    _name: string = "";
    _range: string = "";
    _attacks: string = "";
    _strength: string = "";
    _damage: string = ""; // <normal>/<crit>
}

export enum WarcryUnitRole {
    NONE,

    LEADER,
    FIGHTER,
    ALLY,
    MONSTER,
    HERO,
    THRALL,
};

export const WarcryUnitRoleToString: string[] = [
    'None',

    'Leader',
    'Fighter',
    'Ally',
    'Monster',
    'Hero',
    'Thrall'
];

export class WarcryDamageTable {
    _name: string = "";
    _table: Map<string, string> = new Map();
};

export class WarcryUnit {
    _name: string = "";
    _role: WarcryUnitRole = WarcryUnitRole.NONE;
    _faction: string = "chaos-iron-golems";
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();

    // Characteristics
    _move: number = 1;
    _wounds: number = 1;
    _toughness: number = 1;

    _weapons: WarcryWeapon[] = [];
 
    _damageTable: WarcryDamageTable[] = [];

    _points: number = 0;
}

export class WarcryForce {
    _catalog: string = "";
    _name: string = "Unknown";
    _allegiance: WarcryAllegiance;
    _units: WarcryUnit[] = [];

    constructor() {
        this._allegiance = new WarcryAllegiance();
    }
};

export class RosterWarcry {
    _points: number = 0;
    _name: string = "";
    _forces: WarcryForce[] = [];

    constructor() {

    }
};

function GetFactionRunemarkFromKeyword(name: string) : string {
    const name_ref = name.toLowerCase();

    if (name_ref.includes("chaotic beasts")) {
        return "monster-chaotic-beasts";
    }
    else if (name_ref.includes("monster")) {
        if (name_ref.includes("order")) return "monster-of-order";
        else if (name_ref.includes("destruction")) return "monster-of-destruction";
        else if (name_ref.includes("death")) return "monster-of-death";
        else return "monster-chaotic-beasts";
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

function LookupRole(roleText: string): WarcryUnitRole {
    if (roleText.includes('Leader')) return WarcryUnitRole.LEADER;
    else if (roleText.includes('Fighter')) return WarcryUnitRole.FIGHTER;
    else if (roleText.includes('Allies') || roleText.includes('Ally')) return WarcryUnitRole.ALLY;
    else if (roleText.includes('Monster')) return WarcryUnitRole.MONSTER;
    else if (roleText.includes('Hero')) return WarcryUnitRole.HERO;
    else if (roleText.includes('Thrall')) return WarcryUnitRole.THRALL;
    return WarcryUnitRole.NONE;
}

export function CreateWarcryRoster(doc: Document): RosterWarcry | null {
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterWarcry();

            const name = info.getAttributeNode("name")?.nodeValue;
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

function ParseRosterPoints(doc: XMLDocument, roster: RosterWarcry): void {
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which === "pts") {
                    roster._points = +value;
                }
            }
        }
    }
}

function ParseForces(doc: XMLDocument, roster: RosterWarcry): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let f = new WarcryForce();

            let which = root.getAttributeNode("name")?.nodeValue;
            let value = root.getAttributeNode("catalogueName")?.nodeValue;

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

function ParseAllegiance(root: Element, force: WarcryForce): void {
    let allegiance: WarcryAllegiance = new WarcryAllegiance();

    let rules = root.querySelectorAll("rules>rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = rule.getAttributeNode("name")?.nodeValue;
            var desc = rule.querySelector("rule>description");
            if (ruleName && desc && desc.textContent) {
                allegiance._rules.set(ruleName, desc.textContent);
            }
        }
    }   
    force._allegiance = allegiance;
}

function ParseSelections(root: Element, force: WarcryForce): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        // What kind of selection is this
        let selectionType = selection.getAttributeNode("type")?.nodeValue;
        if (!selectionType) continue;
        
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) continue;
    
        let unit = ParseUnit(selection);
        if (unit && (unit._role != WarcryUnitRole.NONE)) {
            force._units.push(unit);
        }
    }

    // Sort force units by role.
    force._units.sort((a: WarcryUnit, b: WarcryUnit): number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) return 0;
        return -1;
    });
}

function ParseUnit(root: Element): WarcryUnit {
    let unit: WarcryUnit = new WarcryUnit();

    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = prof.getAttributeNode("name")?.nodeValue;
        let profType = prof.getAttributeNode("typeName")?.nodeValue;
        if (profName && profType) {
            if (profType == "Model") {
                unit._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Move': unit._move = +char.textContent; break;
                            case 'Wounds': unit._wounds = +char.textContent; break;
                            case 'Toughness': unit._toughness = +char.textContent; break;
                        }
                    }
                }
            }
            else if (profType == "Weapon") {
                let weapon = new WarcryWeapon();
                weapon._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Range': weapon._range = char.textContent; break;
                            case 'Attacks': weapon._attacks = char.textContent; break;
                            case 'Strength': weapon._strength = char.textContent; break;
                            case 'Damage': weapon._damage = char.textContent; break;
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
                    let charName = char.getAttributeNode("name")?.nodeValue;
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
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which === "pts") {
                    unit._points += +value;
                }
            }
        }
    }

    let categories = root.querySelectorAll(":scope categories>category");
    for (let category of categories) {
        let catName = category.getAttributeNode("name")?.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != WarcryUnitRole.NONE) {
                unit._role = unitRole;
            }
            else {
                // Keyword (old Warcry rosters)
                unit._keywords.add(catName);
            }
        }
    }

    let upgrades = root.querySelectorAll(":scope selections>selection");
    for (let upgrade of upgrades) {
        let name = upgrade.getAttributeNode("name")?.nodeValue;
        if (name) {
            // Factions (by convention?) start with a leading space.
            let factionName = GetFactionRunemarkFromKeyword(name);
            if (factionName.length > 0) {
                unit._faction = factionName;
            }
            else {
                // Keyword
                unit._keywords.add(name);
            }
        }
    }
    return unit;
}