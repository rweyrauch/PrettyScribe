/*
    Copyright 2022 Rick Weyrauch,

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

export class WeaponHH2 {
    _name: string = "";
    _range: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _type: string = "Melee";
}

export class PsykerHH2 {
    _name: string = "";
    _masteryLevel: string = "";
    _disciplines: string = "";
}

export class PsychicPowerHH2 {
    _name: string = "";
    _warpCharge: number = 0;
    _category: string = "";
    _range: string = "";
    _details: string = "";
}

export enum UnitRoleHH2 {
    NONE,

    // HH2
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

export const UnitRoleToStringHH2: string[] = [
    'None',

    // HH2
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

export class VehicleHH2 {
    _name: string = "";
    _count: number = 0;

    // Characteristics
    _type: string = "Vehicle";
    _move: number = 8;
    _bs: number = 4;
    _front: number = 4;
    _side: number = 4;
    _rear: number = 4;
    _hp: number = 1;
    _capacity: number | string = "-";
    _accessPoints: number | string = "-";
    
    _weapons: WeaponHH2[] = [];
}

export class ModelHH2 {

    _name: string = "";
    _count: number = 0;

    // Characteristics
    _type: string = "Infantry";
    _move: number = 6;
    _ws: number = 5;
    _bs: number = 4;
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _initiative: number = 1;
    _attacks: number = 1;
    _leadership: number = 7;
    _save: string = "";

    _weapons: WeaponHH2[] = [];
    _psyker: PsykerHH2 | null = null;
    _psychicPowers: PsychicPowerHH2[] = [];
};

export class FortificationHH2 {

    _name: string = "";
    _composition: string = "";
    _type: string = "";
};

export class UnitHH2 {

    _name: string = "";
    _role: UnitRoleHH2 = UnitRoleHH2.NONE;
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    _models: ModelHH2[] = [];
    _vehicles: VehicleHH2[] = [];

    _points: number = 0;
}

export class ForceHH2 {
    _catalog: string = "";
    _name: string = "Unknown";
    _faction: string = "Unknown";
    _rules: Map<string, string | null> = new Map();
    _units: UnitHH2[] = [];

    constructor() {

    }
};

export class RosterHH2 {
    _points: number = 0;
    _name: string = "";
    _forces: ForceHH2[] = [];

    constructor() {

    }
};

export function CreateHH2Roster(doc: Document): RosterHH2 | null {
    if (doc) {
        // Determine roster type (game system).
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterHH2();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "HH2 Army Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: RosterHH2): void {
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

function ParseForces(doc: XMLDocument, roster: RosterHH2): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let force = new ForceHH2();

            let which = root.getAttributeNode("name")?.nodeValue;
            let value = root.getAttributeNode("catalogueName")?.nodeValue;

            if (which) {
                force._name = which;
            }
            if (value) {
                force._catalog = value;
            }

            let selections = root.querySelectorAll(":scope>selections>selection");
            for (let selection of selections) {
                ParseSelection(selection, force);
            }

            // Sort force units by role.
            force._units.sort((a: UnitHH2, b: UnitHH2): number => {
                if (a._role > b._role) return 1;
                else if (a._role == b._role) return 0;
                return -1;
            });

            roster._forces.push(force);
        }
    }
}

function ParseSelection(root: Element, force: ForceHH2): void {
    let elementType = root.getAttributeNode("type")?.nodeValue;
    if (elementType) {
        let elementName = root.getAttributeNode("name")?.nodeValue;
        console.log("Selection: " + elementName);
        if (elementType == "upgrade") {
        }
        else if (elementType == "unit") {
            let unit = CreateUnit(root);
            if (unit) {
                force._units.push(unit);
            }
        }
        else if (elementType == "model") {

        }
    }
}

function DuplicateForce(force: ForceHH2, roster: RosterHH2): boolean {
    if (!roster || !force) return false;

    for (let f of roster._forces) {
        if (f._catalog === force._catalog) return true;
    }
    return false;
}

function LookupRole(roleText: string): UnitRoleHH2 {
    switch (roleText) {
        case 'HQ': return UnitRoleHH2.HQ;
        case 'Troops': return UnitRoleHH2.TR;
        case 'Elites': return UnitRoleHH2.EL;
        case 'Fast Attack': return UnitRoleHH2.FA;
        case 'Heavy Support': return UnitRoleHH2.HS;
        case 'Flyer': return UnitRoleHH2.FL;
        case 'Dedicated Transport': return UnitRoleHH2.DT;
        case 'Fortification': return UnitRoleHH2.FT;
        case 'Lord of War': return UnitRoleHH2.LW;
    }
    return UnitRoleHH2.NONE;
}

function CreateUnit(root: Element): UnitHH2 | null {
    let unit: UnitHH2 = new UnitHH2();
    let unitName = root.getAttributeNode("name")?.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }

    // Selections

    // Categories
    

    // First pass - find all units, vehicles, etc.
    let activeModel: ModelHH2 | null = null;
    let activeVehicle: VehicleHH2 | null = null;

    let props = root.querySelectorAll(":scope>selections>selection>profiles>profile");
    for (let prop of props) {
        // What kind of prop is this
        let propName = prop.getAttributeNode("name")?.nodeValue;
        let propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            console.log("Unit Type: " + propType.trim());
            if (propType.trim() === "Unit") {
                activeModel = new ModelHH2();
                activeModel._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Unit Type': activeModel._type = char.textContent; break;
                                case 'Move': activeModel._move = +char.textContent; break;
                                case 'WS': activeModel._ws = +char.textContent; break;
                                case 'BS': activeModel._bs = +char.textContent; break;
                                case 'S': activeModel._str = +char.textContent; break;
                                case 'T': activeModel._toughness = +char.textContent; break;
                                case 'W': activeModel._wounds = +char.textContent; break;
                                case 'I': activeModel._initiative = +char.textContent; break;
                                case 'A': activeModel._attacks = +char.textContent; break;
                                case 'Ld': activeModel._leadership = +char.textContent; break;
                                case 'Save': activeModel._save = char.textContent; break;
                            }
                        }
                    }

                    // TODO: determine model count.
                }
                unit._models.push(activeModel);
            }
            else if (propType.trim() === "Vehicle") {
                activeVehicle = new VehicleHH2();
                activeVehicle._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Unit Type': activeVehicle._type = char.textContent; break;
                                case 'Move': activeVehicle._move = +char.textContent; break;
                                case 'BS': activeVehicle._bs = +char.textContent; break;
                                case 'Front': activeVehicle._front = +char.textContent; break;
                                case 'Side': activeVehicle._side = +char.textContent; break;
                                case 'Rear': activeVehicle._rear = +char.textContent; break;
                                case 'HP': activeVehicle._hp = +char.textContent; break;
                                case 'Transport Capacity': activeVehicle._capacity = char.textContent; break;
                                case 'Access Points': activeVehicle._accessPoints = char.textContent; break;
                            }
                        }
                    }
                }
                unit._vehicles.push(activeVehicle);
            }
            else if (propType.trim() === "Wargear Item") {
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
            else if (propType.trim() === "Weapon") {
                let weapon: WeaponHH2 = new WeaponHH2();
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

                if (activeModel) {
                    activeModel._weapons.push(weapon);
                }
                else if (activeVehicle) {
                    activeVehicle._weapons.push(weapon);
                }
                else {
                    console.log("Unexpected: Created a weapon without an active model.  Unit: " + unitName);
                }                
            }
            else {
                console.log("Unknown property type: " + propType);
            }    
         }
    }

    // Second pass - attach attributes to models.
    for (let prop of props) {
        // What kind of prop is this
        let propName = prop.getAttributeNode("name")?.nodeValue;
        let propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if (propType == "Psychic Power") {
                let power: PsychicPowerHH2 = new PsychicPowerHH2();
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
                if (activeModel) {
                    activeModel._psychicPowers.push(power);
                }
                else {
                    console.log("Unexpected: Created a psychic power without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Psyker") {
                let psyker: PsykerHH2 = new PsykerHH2();
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
                if (activeModel) {
                    activeModel._psyker = psyker;  
                }         
                else {
                    console.log("Unexpected: Created a psyker without an active model.  Unit: " + unitName);
                }
            }
        }
        else {
            console.log("Unknown property type: " + propType);
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    let costs = root.querySelectorAll(":scope>costs>cost");
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
    console.log("Points: " + unit._points);

    let rules = root.querySelectorAll(":scope>rules>rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = rule.getAttributeNode("name")?.nodeValue;
            let desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
                console.log("Rule: " + ruleName);
            }
        }
    }

    return unit;
}
