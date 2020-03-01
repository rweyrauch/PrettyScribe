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

type WeaponStrength = number | string;

export class Weapon30k {
    _name: string = "";
    _range: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _type: string = "Melee";
}

export class Psyker30k {
    _name: string = "";
    _masteryLevel: string = "";
    _disciplines: string = "";
}

export class PsychicPower30k {
    _name: string = "";
    _warpCharge: number = 0;
    _category: string = "";
    _range: string = "";
    _details: string = "";
}

export enum UnitRole30k {
    NONE,

    // 40k
    HQ,
    TR,
    EL,
    FA,
    HS,
    FL,
    DT,
    FT,
    LW,
}

export const UnitRoleToString30k: string[] = [
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
];

export class Vehicle30k {
    _name: string = "";

    // Characteristics
    _bs: string = "";
    _front: number = 4;
    _side: number = 4;
    _rear: number = 4;
    _hp: number = 1;
    _type: string = "";

    _weapons: Weapon30k[] = [];
}

export class Walker30k {
    _name: string = "";

    // Characteristics
    _ws: string = "";
    _bs: string = "";
    _str: number = 4;
    _front: number = 4;
    _side: number = 4;
    _rear: number = 4;
    _initiative: number = 1;
    _attacks: string = "";
    _hp: number = 1;
    _type: string = "";

    _weapons: Weapon30k[] = [];
}

export class Flyer30k {
    _name: string = "";

    // Characteristics
    _bs: string = "";
    _front: number = 4;
    _side: number = 4;
    _rear: number = 4;
    _hp: number = 1;
    _type: string = "";
    _role: string = "";
    _pursuit: string = "";
    _agility: string = "";

    _weapons: Weapon30k[] = [];
}

export class Model30k {

    _name: string = "";
    _count: number = 0;

    // Characteristics
    _ws: string = "";
    _bs: string = "";
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _initiative: number = 1;
    _attacks: string = "";
    _leadership: number = 7;
    _save: string = "";

    _weapons: Weapon30k[] = [];
    _psyker: Psyker30k | null = null;
    _psychicPowers: PsychicPower30k[] = [];
};

export class Unit30k {

    _name: string = "";
    _role: UnitRole30k = UnitRole30k.NONE;
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    _models: Model30k[] = [];
    _walkers: Walker30k[] = [];
    _vehicles: Vehicle30k[] = [];
    _flyers: Flyer30k[] = [];

    _points: number = 0;
}

export class Force30k {
    _catalog: string = "";
    _name: string = "Unknown";
    _faction: string = "Unknown";
    _rules: Map<string, string | null> = new Map();
    _units: Unit30k[] = [];

    constructor() {

    }
};

export class Roster30k {
    _commandPoints: number = 0;
    _points: number = 0;
    _name: string = "";
    _forces: Force30k[] = [];

    constructor() {

    }
};

export function Create30kRoster(doc: Document): Roster30k | null {
    if (doc) {
        // Determine roster type (game system).
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster30k();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "30k Army Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: Roster30k): void {
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which === "pts") {
                    roster._points = +value;
                }
                else if (which === "CP") {
                    roster._commandPoints = +value;
                }
            }
        }
    }
}

function ParseForces(doc: XMLDocument, roster: Roster30k): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let f = new Force30k();

            let which = root.getAttributeNode("name")?.nodeValue;
            let value = root.getAttributeNode("catalogueName")?.nodeValue;

            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }

            // TODO: Determine force faction and faction specific rules.

            // Only include the allegiance rules once.
            if (!DuplicateForce(f, roster)) {
                const rules = root.querySelectorAll("force>rules>rule");
                for (let rule of rules) {
                    if (rule.hasAttribute("name")) {
                        let ruleName = rule.getAttributeNode("name")?.nodeValue;
                        const desc = rule.querySelector("rule>description");
                        if (ruleName && desc) {
                            f._rules.set(ruleName, desc.textContent);
                        }
                    }
                }
            }


            ParseUnits(root, f);

            roster._forces.push(f);
        }
    }
}

function DuplicateForce(force: Force30k, roster: Roster30k): boolean {
    if (!roster || !force) return false;

    for (let f of roster._forces) {
        if (f._catalog === force._catalog) return true;
    }
    return false;
}

function ParseUnits(root: Element, force: Force30k): void {
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let unit = CreateUnit(selection);
        if (unit && unit._role != UnitRole30k.NONE) {
            force._units.push(unit);
        }
    }

    // Sort force units by role.
    force._units.sort((a: Unit30k, b: Unit30k): number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) return 0;
        return -1;
    });
}

function LookupRole(roleText: string): UnitRole30k {
    switch (roleText) {
        case 'HQ': return UnitRole30k.HQ;
        case 'Troops': return UnitRole30k.TR;
        case 'Elites': return UnitRole30k.EL;
        case 'Fast Attack': return UnitRole30k.FA;
        case 'Heavy Support': return UnitRole30k.HS;
        case 'Flyer': return UnitRole30k.FL;
        case 'Dedicated Transport': return UnitRole30k.DT;
        case 'Fortification': return UnitRole30k.FT;
        case 'Lord of War': return UnitRole30k.LW;
    }
    return UnitRole30k.NONE;
}

function CreateUnit(root: Element): Unit30k | null {
    let unit: Unit30k = new Unit30k();
    let unitName = root.getAttributeNode("name")?.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }

    let categories = root.querySelectorAll(":scope categories>category");
    for (let cat of categories) {
        let catName = cat.getAttributeNode("name")?.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                unit._factions.add(factKeyword);
            }
            else {
                const roleText = catName.trim();
                const unitRole = LookupRole(roleText);
                if (unitRole != UnitRole30k.NONE) {
                    unit._role = unitRole;
                }
                else {
                    // Keyword
                    unit._keywords.add(catName);
                }
            }
        }
    }

    // First pass - find all units, vehicles, flyers, etc.
    let activeModel: Model30k | null = null;
    let activeWalker: Walker30k | null = null;
    let activeVehicle: Vehicle30k | null = null;
    let activeFlyer: Flyer30k | null = null;

    let props = root.querySelectorAll(":scope profiles>profile");
    for (let prop of props) {
        // What kind of prop is this
        let propName = prop.getAttributeNode("name")?.nodeValue;
        let propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if (propType === "Unit") {
                activeModel = new Model30k();
                activeModel._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'WS': activeModel._ws = char.textContent; break;
                                case 'BS': activeModel._bs = char.textContent; break;
                                case 'S': activeModel._str = +char.textContent; break;
                                case 'T': activeModel._toughness = +char.textContent; break;
                                case 'W': activeModel._wounds = +char.textContent; break;
                                case 'I': activeModel._initiative = +char.textContent; break;
                                case 'A': activeModel._attacks = char.textContent; break;
                                case 'Ld': activeModel._leadership = +char.textContent; break;
                                case 'Save': activeModel._save = char.textContent; break;
                            }
                        }
                    }

                    // Get parent node (a selection) to determine model count.
                    if (prop.parentElement && prop.parentElement.parentElement) {
                        const parentSelection = prop.parentElement.parentElement;
                        let countValue = parentSelection.getAttributeNode("number")?.nodeValue;
                        if (countValue) {
                            activeModel._count = +countValue;
                        }
                    }
                }
                unit._models.push(activeModel);
            }
            else if (propType === "Walker") {
                activeWalker = new Walker30k();
                activeWalker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'WS': activeWalker._ws = char.textContent; break;
                                case 'BS': activeWalker._bs = char.textContent; break;
                                case 'S': activeWalker._str = +char.textContent; break;
                                case 'Front': activeWalker._front = +char.textContent; break;
                                case 'Side': activeWalker._side = +char.textContent; break;
                                case 'Rear': activeWalker._rear = +char.textContent; break;
                                case 'I': activeWalker._initiative = +char.textContent; break;
                                case 'A': activeWalker._attacks = char.textContent; break;
                                case 'HP': activeWalker._hp = +char.textContent; break;
                                case 'Type': activeWalker._type = char.textContent; break;
                            }
                        }
                    }
                }
                unit._walkers.push(activeWalker);
            }
            else if (propType === "Vehicle") {
                activeVehicle = new Vehicle30k();
                activeVehicle._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'BS': activeVehicle._bs = char.textContent; break;
                                case 'Front': activeVehicle._front = +char.textContent; break;
                                case 'Side': activeVehicle._side = +char.textContent; break;
                                case 'Rear': activeVehicle._rear = +char.textContent; break;
                                case 'HP': activeVehicle._hp = +char.textContent; break;
                                case 'Type': activeVehicle._type = char.textContent; break;
                            }
                        }
                    }
                }
                unit._vehicles.push(activeVehicle);
            }
            else if (propType === "Flyer") {
                activeFlyer = new Flyer30k();
                activeFlyer._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'BS': activeFlyer._bs = char.textContent; break;
                                case 'Front': activeFlyer._front = +char.textContent; break;
                                case 'Side': activeFlyer._side = +char.textContent; break;
                                case 'Rear': activeFlyer._rear = +char.textContent; break;
                                case 'HP': activeFlyer._hp = +char.textContent; break;
                                case 'Combat Role': activeFlyer._role = char.textContent; break;
                                case 'Pursuit': activeFlyer._pursuit = char.textContent; break;
                                case 'Agility': activeFlyer._agility = char.textContent; break;
                            }
                        }
                    }
                }
                unit._flyers.push(activeFlyer);
            }
        }
    }

    // Second pass - attach attributes to models.
    for (let prop of props) {
        // What kind of prop is this
        let propName = prop.getAttributeNode("name")?.nodeValue;
        let propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if (propType === "Wargear Item") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Description") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                let weapon: Weapon30k = new Weapon30k();
                weapon._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range': weapon._range = char.textContent; break;
                                case 'Type': weapon._type = char.textContent; break;
                                case 'Strength': weapon._str = char.textContent; break;
                                case 'AP': weapon._ap = char.textContent; break;
                            }
                        }
                    }
                }

                if (activeModel) activeModel._weapons.push(weapon);
                else if (activeWalker) activeWalker._weapons.push(weapon);
                else if (activeVehicle) activeVehicle._weapons.push(weapon);
                else if (activeFlyer) activeFlyer._weapons.push(weapon);
                else {
                    console.log("Unexpected: Created a weapon without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Transport") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Capacity") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType == "Psychic Power") {
                let power: PsychicPower30k = new PsychicPower30k();
                power._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Warp Charge': power._warpCharge = +char.textContent; break;
                                case 'Power Category': power._category = char.textContent; break;
                                case 'Range': power._range = char.textContent; break;
                                case 'Details': power._details = char.textContent; break;
                            }
                        }
                    }
                }
                if (activeModel) activeModel._psychicPowers.push(power);
                else {
                    console.log("Unexpected: Created a psychic power without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Psyker") {
                let psyker: Psyker30k = new Psyker30k();
                psyker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Mastery Level': psyker._masteryLevel = char.textContent; break;
                            case 'Disciplines': psyker._disciplines = char.textContent; break;
                        }
                    }
                }
                if (activeModel) activeModel._psyker = psyker;           
                else {
                    console.log("Unexpected: Created a psyker without an active model.  Unit: " + unitName);
                }
            }
        }
        else if ((propType === "Unit") || (propType === "Walker") || (propType === "Vehicle")) {
            // Already handled.
        }
        else {
            console.log("Unknown property type: " + propType);
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    let costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which == "pts") {
                    unit._points += +value;
                }
            }
        }
    }

    let rules = root.querySelectorAll(":scope rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = rule.getAttributeNode("name")?.nodeValue;
            let desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
            }
        }
    }

    return unit;
}
