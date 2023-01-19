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

export namespace HorusHeresy {

type WeaponStrength = number | string;

export class Weapon {
    _name: string = "";
    _range: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _type: string = "Melee";
}

export class Psyker {
    _name: string = "";
    _masteryLevel: string = "";
    _disciplines: string = "";
}

export class PsychicPower {
    _name: string = "";
    _warpCharge: number = 0;
    _category: string = "";
    _range: string = "";
    _details: string = "";
}

export enum UnitRole {
    NONE,

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

export const UnitRoleToString: string[] = [
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
];

export class BaseNote {
    _name: string = "";
    _customName: string = "";
    _customNotes: string = "";

    name(): string {
        if (this._customName) return this._customName;
        return this._name;
    }

    notes(): string | null {
        return this._customNotes;
    }

    equal(other: BaseNote | null): boolean {
        if (other == null) return false;
        return (this._name === other._name);
    }
}

export class BaseModel extends BaseNote {
    _count: number = 0;

    _weapons: Weapon[] = [];

    _psyker: Psyker | null = null;
    _psychicPowers: PsychicPower[] = [];
};

export class Vehicle extends BaseModel {

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
}

export class Model extends BaseModel {

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
};

export class Knight extends BaseModel {

    // Characteristics
    _type: string = "Knight/Titan";
    _move: number = 8;
    _ws: number = 4;
    _bs: number = 4;
    _str: number = 4;
    _front: number = 4;
    _side: number = 4;
    _rear: number = 4;
    _initiative: number = 1;
    _attacks: number = 1;
    _hp: number = 1;
}

export class Fortification extends BaseNote {

     _composition: string = "";
    _type: string = "";
};

export class Unit extends BaseNote {

    _role: UnitRole = UnitRole.NONE;
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    _models: BaseModel[] = [];
 
    _points: number = 0;
}

export class Force extends BaseNote {
    _catalog: string = "";
    _name: string = "Unknown";
    _faction: string = "Unknown";
    _rules: Map<string, string | null> = new Map();
    _units: Unit[] = [];

    constructor() {
        super();
    }
};

export class Roster extends BaseNote {
    _points: number = 0;
    _name: string = "";
    _forces: Force[] = [];

    constructor() {
        super();
    }
};

export function Compare(a: string, b: string): number {
    if (a > b) return 1;
    else if (a == b) return 0;
    return -1;
}

export function CreateRoster(doc: Document): Roster | null {
    if (doc) {
        // Determine roster type (game system).
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Horus Heresy Army Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: Roster): void {
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

function ParseForces(doc: XMLDocument, roster: Roster): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let force = new Force();

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
            force._units.sort((a: Unit, b: Unit): number => {
                if (a._role > b._role) return 1;
                else if (a._role == b._role) return 0;
                return -1;
            });

            roster._forces.push(force);
        }
    }
}

function ParseSelection(root: Element, force: Force): void {
    let elementType = root.getAttributeNode("type")?.nodeValue;
    if (elementType) {
        let elementName = root.getAttributeNode("name")?.nodeValue;
        console.log("Selection: " + elementName + " of type: " + elementType);
        if (elementType == "unit") {
            let unit = CreateUnit(root);
            if (unit) {
                force._units.push(unit);
            }
        }
        else if (elementType == "upgrade") {
            // TODO: implement the various upgrades
        }
        else {
            console.log("Unexpected selection type: " + elementType);
        }
    }
}

function DuplicateForce(force: Force, roster: Roster): boolean {
    if (!roster || !force) return false;

    for (let f of roster._forces) {
        if (f._catalog === force._catalog) return true;
    }
    return false;
}

function LookupRole(roleText: string): UnitRole {
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

function CreateUnit(root: Element): Unit | null {
    let unit: Unit = new Unit();
    let unitName = root.getAttributeNode("name")?.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }

    // Selections

    // Categories
    

    // First pass - find all units, vehicles, etc.
    let activeModel: BaseModel | null = null;
 
    let selections = root.querySelectorAll(":scope>selections>selection");
    for (let selection of selections) {
        let selectionType = selection.getAttributeNode("type")?.nodeValue;
        if (!selectionType || selectionType != "model") {
            continue;
        }
        let selectionName = selection.getAttributeNode("name")?.nodeValue;

        //console.log("Profile Type (model): " + selectionType + " Name: " + selectionName);
        let profs = selection.querySelectorAll(":scope>profiles>profile");
        for (let prof of profs) {
            // What kind of profile is this
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                profType = profType.trim();
                //console.log("Profile Type (1st pass): " + profType);
                if (profType === "Unit") {
                    let model = new Model();
                    model._name = profName;
                    activeModel = model;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = char.getAttributeNode("name")?.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Unit Type': model._type = char.textContent; break;
                                    case 'Move': model._move = +char.textContent; break;
                                    case 'WS': model._ws = +char.textContent; break;
                                    case 'BS': model._bs = +char.textContent; break;
                                    case 'S': model._str = +char.textContent; break;
                                    case 'T': model._toughness = +char.textContent; break;
                                    case 'W': model._wounds = +char.textContent; break;
                                    case 'I': model._initiative = +char.textContent; break;
                                    case 'A': model._attacks = +char.textContent; break;
                                    case 'Ld': model._leadership = +char.textContent; break;
                                    case 'Save': model._save = char.textContent; break;
                                }
                            }
                        }

                        // TODO: determine model count.
                    }
                    unit._models.push(activeModel);
                }
                else if (profType === "Knights and Titans") {
                    let knight = new Knight();
                    knight._name = profName;
                    activeModel = knight;

                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = char.getAttributeNode("name")?.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Unit Type': knight._type = char.textContent; break;
                                    case 'Move': knight._move = +char.textContent; break;
                                    case 'WS': knight._ws = +char.textContent; break;
                                    case 'BS': knight._bs = +char.textContent; break;
                                    case 'S': knight._str = +char.textContent; break;
                                    case 'Front': knight._front = +char.textContent; break;
                                    case 'Side': knight._side = +char.textContent; break;
                                    case 'Rear': knight._rear = +char.textContent; break;
                                    case 'I': knight._initiative = +char.textContent; break;
                                    case 'A': knight._attacks = +char.textContent; break;
                                    case 'HP': knight._hp = +char.textContent; break;
                                }
                            }
                        }
                    }
                    unit._models.push(activeModel);
                }
                else if (profType === "Vehicle") {
                    let vehicle = new Vehicle();
                    vehicle._name = profName;
                    activeModel = vehicle;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = char.getAttributeNode("name")?.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Unit Type': vehicle._type = char.textContent; break;
                                    case 'Move': vehicle._move = +char.textContent; break;
                                    case 'BS': vehicle._bs = +char.textContent; break;
                                    case 'Front': vehicle._front = +char.textContent; break;
                                    case 'Side': vehicle._side = +char.textContent; break;
                                    case 'Rear': vehicle._rear = +char.textContent; break;
                                    case 'HP': vehicle._hp = +char.textContent; break;
                                    case 'Transport Capacity': vehicle._capacity = char.textContent; break;
                                    case 'Access Points': vehicle._accessPoints = char.textContent; break;
                                }
                            }
                        }
                    }
                    unit._models.push(activeModel);
                }
            }
        }

        // Second pass - attach attributes to models.
        for (let prof of profs) {
            // What kind of profile is this
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                profType = profType.trim();
                if (profType == "Psychic Power") {
                    let power: PsychicPower = new PsychicPower();
                    power._name = profName;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
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
                else if (profType == "Psyker") {
                    let psyker: Psyker = new Psyker();
                    psyker._name = profName;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
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
                else if (profType === "Wargear Item") {
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = char.getAttributeNode("name")?.nodeValue;
                        if (charName && char.textContent && profName) {
                            if (charName === "Description") {
                                unit._abilities.set(profName, char.textContent);
                            }
                        }
                    }
                }
                else if (profType === "Weapon") {
                    let weapon: Weapon = new Weapon();
                    weapon._name = profName;
                    let chars = prof.querySelectorAll("characteristics>characteristic");
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
                    else {
                        console.log("Unexpected: Created a weapon without an active model.  Unit: " + unitName);
                    }                
                }
                else if (profType === "Unit" || profType === "Knights and Titans" || profType === "Vehicle") {
                    // Do nothing about previously handled types.
                }
                else {
                    console.log("Unknown unit profile type: " + profType + " with name: " + profName);
                }
            }
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    let costs = root.querySelectorAll(":scope>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which == "Pts") {
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
                //console.log("Rule: " + ruleName);
            }
        }
    }

    return unit;
}

} // namespace HorusHeresy
