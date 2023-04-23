/*
    Copyright 2022-23 Rick Weyrauch,

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

export class Upgrade extends BaseNote {
    _cost: Costs = new Costs();
    _count: number = 1;

    selectionName() {
        return this.name();
    }

    toString() {
        let string = this.selectionName();
        if (this._count > 1) string = `${this._count}x ${string}`;
        if (this._cost.hasValues()) string += ` ${this._cost.toString()}`
        return string;
    }
}

export class Weapon extends Upgrade {
    _selectionName: string = "";
    _range: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _type: string = "Melee";
}

export class BaseModel extends BaseNote {
    _count: number = 0;

    _weapons: Weapon[] = [];
    _upgrades: Upgrade[] = [];

    _psyker: Psyker | null = null;
    _psychicPowers: PsychicPower[] = [];

    equal(model: Model | null): boolean {
        if (model == null) return false;

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
                if (!this._upgrades[wi].equal(model._upgrades[wi])) {
                    return false;
                }
            }

            // TODO: check for the same psychic powers
            if ((this._psyker != null) || (model._psyker != null)) return false;

            return true;
        }
        return false;
    }

    nameAndGear(): string {
        let name = super.name();

        if (this._weapons.length > 0 || this._upgrades.length > 0) {
            const gear = this.getDedupedWeaponsAndUpgrades();
            name += ` (${gear.map(u => u.toString()).join(', ')})`;
        }
        return name;
    }

    getDedupedWeaponsAndUpgrades(): Upgrade[] {
        const deduped: Upgrade[] = [];
        for (const upgrade of [...this._weapons, ...this._upgrades]) {
            if (!deduped.some(e => upgrade.selectionName() === e.selectionName())) {
                deduped.push(upgrade);
            }
        }
        return deduped;
    }

    normalize(): void {
        this._weapons.sort(CompareWeapon);
        this._upgrades.sort(CompareObj);

        this.normalizeUpgrades(this._weapons);
        this.normalizeUpgrades(this._upgrades);
    }

    normalizeUpgrades(upgrades: Upgrade[]) {
        for (let i = 0; i < (upgrades.length - 1); i++) {
            const upgrade = upgrades[i];
            if (upgrade._name === upgrades[i+1]._name) {
                upgrade._count += upgrades[i+1]._count;
                upgrade._cost.add(upgrades[i+1]._cost);
                upgrades.splice(i+1, 1);
                i--;
            }
        }
        for (let upgrade of upgrades) {
            if (upgrade._count % this._count == 0) {
                upgrade._count /= this._count;
                upgrade._cost._points /= this._count;
            }
        }
    }

};

export class Vehicle extends BaseModel {

    // Characteristics
    _type: string = "Vehicle";
    _move: string | number = 8;
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
    _move: string | number = 6;
    _ws: number = 5;
    _bs: number = 4;
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _initiative: number = 1;
    _attacks: number = 1;
    _leadership: number = 7;
    _save: string = "3+";
};

export class Knight extends BaseModel {

    // Characteristics
    _type: string = "Knight/Titan";
    _move: string | number = 8;
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
    _cost = new Costs();
    _name: string = "";
    _forces: Force[] = [];

    constructor() {
        super();
    }
};

export class Costs {
     _points: number = 0;
    _freeformValues: {[key: string]: number}|undefined;

    hasValues() {
        return this._points !== 0;
    }

    toString() {
        const values = [];
        if (this._points !== 0) values.push(`${this._points} pts`);
        return `[${values.join(' / ')}]`;
    }

    add(other: Costs) {
        this._points += other._points;
        for (const name in other._freeformValues) {
            this.addFreeformValue(name, other._freeformValues[name]);
        }
    }

    addFreeformValue(name: string, value: number) {
        if (!this._freeformValues) this._freeformValues = {};
        const oldValue = this._freeformValues[name] || 0;
        this._freeformValues[name] = oldValue + value;
    }
}

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
        roster._cost.add(ParseCost(cost));
    }
}

function ParseCost(cost: Element): Costs {
    const costs = new Costs();
    const which = cost.getAttribute("name");
    const value = cost.getAttribute("value");
    if (which && value) {
        if (which === "pts") {
            costs._points += +value;
        } else {
            costs.addFreeformValue(which, +value);
        }
    }
    return costs;
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

function ExpandBaseNotes(root: Element, obj: BaseNote): string {
    obj._name = <string>root.getAttributeNode("name")?.nodeValue;

    let element: Element = root;
    if (root.tagName === "profile" && root.parentElement && root.parentElement.parentElement) {
        element = root.parentElement.parentElement;
    }

    obj._customName = <string>element.getAttributeNode("customName")?.nodeValue;
    let child = element.firstElementChild;
    if (child && child.tagName === "customNotes") {
        obj._customNotes = <string>child.textContent;
    }
    return obj._name;
}

function ExtractNumberFromParent(root: Element): number {
    // Get parent node (a selection) to determine model count.
    if (root.parentElement && root.parentElement.parentElement) {
        const parentSelection = root.parentElement.parentElement;
        const countValue = parentSelection.getAttributeNode("number")?.nodeValue;
        if (countValue) {
            return +countValue;
        }
    }

    return 0;
}

function ParseWeaponProfile(profile: Element): Weapon {
    const weapon = new Weapon();
    ExpandBaseNotes(profile,  weapon);
    weapon._count = ExtractNumberFromParent(profile);

    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttribute("name");
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
    // Keep track of the weapon's parent selection for its name, unless the
    // weapon is directly under the unit's profile.
    const selection = profile.parentElement?.parentElement;
    const selectionName = selection?.getAttribute('name');
    if (selection?.getAttribute('type') === 'upgrade' && selectionName) {
        weapon._selectionName = selectionName;
        weapon._cost = GetSelectionCosts(selection);
    }
    return weapon;
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
    let categories = root.querySelectorAll("categories>category");
    for (let cat of categories) {
        const catName = cat.getAttributeNode("name")?.nodeValue;
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
                    // Keyword
                    unit._keywords.add(catName);
                }
            }
        }
    }
    

    // First pass - find all units, vehicles, etc.
    let activeModel: BaseModel | null = null;
 
    let selections = root.querySelectorAll(":scope>selections>selection");
    for (let selection of selections) {
        let selectionType = selection.getAttributeNode("type")?.nodeValue;
        if (!selectionType) {
            continue;
        }
        let selectionName = selection.getAttributeNode("name")?.nodeValue;

        let profs = selection.querySelectorAll(":scope>profiles>profile");
        console.log("Selection Type: " + selectionType + " Name: " + selectionName + "  Profiles: " + profs.length);
        for (let prof of profs) {
            // What kind of profile is this
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                profType = profType.trim();
                console.log("\tProfile Type (1st pass): " + profType);
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
                                    case 'Move': model._move = ConvertToInches(char.textContent); break;
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
                    console.log("Created a knight!");
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
                                    case 'Move': knight._move = ConvertToInches(char.textContent); break;
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
                                    case 'Move': vehicle._move = ConvertToInches(char.textContent); break;
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
                console.log("\tProfile Type (2nd pass): " + profType);                
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
                else if (profType === "Warlord Trait") {
                    let chars = prof.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                         if (char.textContent && profName) {
                            unit._abilities.set(profName, char.textContent);        
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

function ConvertToInches(value: string | number) : string
{
    if (IsNumber(value))
    {
        return value.toString() + "\"";
    }
    return value.toString();
}

function IsNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

function CompareObj(a: { _name: string; }, b: { _name: string; }): number {
    return Compare(a._name, b._name);
}

function CompareModel(a: Model, b: Model): number {
    if (a._name === b._name) {
        return Compare(a.nameAndGear(), b.nameAndGear());
    } else if (a._name === 'Unit Upgrades') {
        // "Unit Upgrades", a special model name, is always sorted last.
        return 1;
    } else if (b._name === 'Unit Upgrades') {
        // "Unit Upgrades", a special model name, is always sorted last.
        return -1;
    } else {
        return Compare(a._name, b._name);
    }
}

export function CompareWeapon(a: Weapon, b: Weapon): number {
    const aType = a._type.startsWith('Grenade') ? 2 : a._type.startsWith('Melee') ? 1 : 0;
    const bType = b._type.startsWith('Grenade') ? 2 : b._type.startsWith('Melee') ? 1 : 0;
    return (aType - bType) || a.name().localeCompare(b.name());
}

function GetSelectionCosts(selection: Element): Costs {
    // querySelectorAll(':scope > tagname') doesn't work with jsdom, so we hack
    // around it: https://github.com/jsdom/jsdom/issues/2998

    const costs = new Costs()
    for (const child of selection.children) {
        if (child.tagName === 'costs') {
            for (const subChild of child.children) {
                costs.add(ParseCost(subChild));
            }
        }
    }
    return costs;
}

} // namespace HorusHeresy
