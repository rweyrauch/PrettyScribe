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
    ALLY
};

export const WarcryUnitRoleToString: string[] = [
    'None',

    'Leader',
    'Fighter',
    'Ally'
];

export class WarcryUnit {
    _name: string = "";
    _role: WarcryUnitRole = WarcryUnitRole.NONE;
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();

    // Characteristics
    _move: number = 1;
    _wounds: number = 1;
    _toughness: number = 1;

    _weapons: WarcryWeapon[] = [];
 
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

function LookupRole(roleText: string): WarcryUnitRole {
    switch (roleText) {
        case 'Leader': return WarcryUnitRole.LEADER;
        case 'Fighter': return WarcryUnitRole.FIGHTER;
        case 'Ally': return WarcryUnitRole.ALLY;
    }
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
        let catPrimary = category.getAttributeNode("primary")?.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != WarcryUnitRole.NONE) {
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