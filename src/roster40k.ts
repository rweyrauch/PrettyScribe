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
import * as _ from "lodash";

type WeaponStrength = number | string;

export class BaseNotes {
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

    equal(other: BaseNotes | null): boolean {
        if (other == null) return false;
        // Weapons in 40k have unique names
        return (this._name === other._name);
    }
}

export class Weapon extends BaseNotes {
    _count: number = 0;
    _range: string = "Melee";
    _type: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _damage: string = "";

    _abilities: string = "";
}

export class WoundTracker extends BaseNotes {
    _name: string = "";
    _table: Map<string, string> = new Map();
}

export class Explosion extends BaseNotes {
    _name: string = "";
    _diceRoll: string = "";
    _distance: string = "";
    _mortalWounds: string = "";
}

export class Psyker extends BaseNotes {
    _cast: string = "";
    _deny: string = "";
    _powers: string = "";
    _other: string = "";
}

export class PsychicPower extends BaseNotes {
    _name: string = "";
    _manifest: number = 0;
    _range: string = "";
    _details: string = "";
}

export enum UnitRole {
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
    AGENTS,

    // Kill Team
    COMMANDER,
    LEADER,
    SPECIALIST,
    NON_SPECIALIST,
}

export const UnitRoleToString: string[] = [
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
    'Agent of the Imperium',

    // Kill Team
    'Commander',
    'Leader',
    'Specialist',
    'Non-specialist'
];

export class Model extends BaseNotes {

    _count: number = 0;

    // Characteristics
    _move: string = "0\"";
    _ws: string = "";
    _bs: string = "";
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _attacks: string = "";
    _leadership: number = 7;
    _save: string = "";

    _weapons: Weapon[] = [];
    _upgrades: string[] = [];
    // TODO model upgrades (i.e. tau support systems)
    _psyker: Psyker | null = null;
    _psychicPowers: PsychicPower[] = [];
    _explosions: Explosion[] = [];

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
                if (this._upgrades[wi] != model._upgrades[wi]) {
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
            let mi = 0;

            name += " (";
            for (const weapon of this._weapons) {
                if (weapon._count > 1) {
                    name += weapon._count + "x ";
                }
                name += weapon.name();
                mi++;
                if (mi != this._weapons.length) {
                    name += ",  "
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

    normalize(): void {
        this._weapons.sort(CompareObj);
        this._upgrades.sort(Compare);
        for (let i = 0; i < (this._weapons.length - 1); i++) {
            const weapon = this._weapons[i];
            if (weapon._name === this._weapons[i+1]._name) {
                weapon._count++;
                this._weapons.splice(i+1, 1);
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

export class ProfileTable {
    _name: string = "";
    _table: Map<string, string>[] = [];
}

export class Unit extends BaseNotes {

    _role: UnitRole = UnitRole.NONE;
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    _models: Model[] = [];

    _points: number = 0;
    _powerLevel: number = 0;
    _commandPoints: number = 0;

    _woundTracker: WoundTracker[] = [];

    _profileTables: Map<string, ProfileTable> = new Map();

    equal(unit: Unit | null): boolean {
        if (unit == null) return false;

        if ((unit._name === this._name) && (unit._role === this._role) &&
            (unit._models.length === this._models.length)) {

            for (let mi = 0; mi < this._models.length; mi++) {
                if (!this._models[mi].equal(unit._models[mi])) {
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

    normalize(): void {
        // Sort force units by role and name
        this._models.sort(CompareObj);

        for (let model of this._models) {
            model.normalize();
        }

        for (let i = 0; i < (this._models.length - 1); i++) {
            const model = this._models[i];

            if (model.nameAndGear() === this._models[i+1].nameAndGear()) {
                model._count++;
                this._models.splice(i+1, 1);
                i--;
            }
        }

        for (let model of this._models) {
            model.normalize();
        }
    }
}

export class Force extends BaseNotes {
    _catalog: string = "";
    _faction: string = "Unknown";
    _factionRules: Map<string, string | null> = new Map();
    _rules: Map<string, string | null> = new Map();
    _units: Unit[] = [];
}

export class Roster40k extends BaseNotes {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;
    _forces: Force[] = [];
}

export function Create40kRoster(doc: Document, is40k: boolean = true): Roster40k | null {
    if (doc) {
        // Determine roster type (game system).
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster40k();

            const name = info.getAttributeNode("name")?.nodeValue;
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

function ParseRosterPoints(doc: XMLDocument, roster: Roster40k): void {
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
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

function ParseForces(doc: XMLDocument, roster: Roster40k, is40k: boolean): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let f = new Force();

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
                var rules = root.querySelectorAll("force>rules>rule");
                for (let rule of rules) {
                    if (rule.hasAttribute("name")) {
                        let ruleName = rule.getAttributeNode("name")?.nodeValue;
                        var desc = rule.querySelector("rule>description");
                        if (ruleName && desc) {
                            f._rules.set(ruleName, desc.textContent);
                        }
                    }
                }
            }
        
            ParseSelections(root, f, is40k);

            roster._forces.push(f);
        }
    }
}

function ParseSelections(root: Element, force: Force, is40k: boolean): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        // What kind of selection is this
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) continue;

        if (selectionName.includes("Detachment Command Cost")) {
            console.log("Found Detachment Command Cost");
        }
        else if (selectionName.includes('Dynasty Choice')) {
            ExtractRuleFromSelection(root, force._rules);
        }
        else {
            let unit = ParseUnit(selection, is40k);
            if (unit && unit._role != UnitRole.NONE) {
                force._units.push(unit);
                for (const entry of unit._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            }
            else if (root.getAttributeNode("type")?.nodeValue === "upgrade") {
                ExtractRuleFromSelection(root, force._rules);
        
                const props = root.querySelectorAll("selections>selection");
                for (let prop of props) {
                    // sub-faction
                    let propName = prop.getAttributeNode("name")?.nodeValue;
                    let propType = prop.getAttributeNode("type")?.nodeValue;
                    if (propName && propType) {
                        if ((propType === "upgrade")) {
                            force._faction = propName;
                            ExtractRuleFromSelection(prop, force._factionRules);
                        }
                    }
                }
            }
        }
    }


    for (const key of force._factionRules.keys()) {
        force._rules.delete(key);
    }

    // Sort force units by role and name
    force._units.sort((a: Unit, b: Unit): number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) {
            if (a._name > b._name) return 1;
            else if (a._name == b._name) return 0;
            return -1;
        }
        return -1;
    });
}

function DuplicateForce(force: Force, roster: Roster40k): boolean {
    if (!roster || !force) return false;

     for (let f of roster._forces) {
        if (f._catalog === force._catalog) return true;
    }
    return false;
}

function ExtractRuleFromSelection(root: Element, map: Map<string, string | null>): void {

    const props = root.querySelectorAll(":scope profiles>profile");
    for (const prop of props) {
        // detachment rules
        const propName = prop.getAttributeNode("name")?.nodeValue;
        const propType = prop.getAttributeNode("typeName")?.nodeValue;
        console.log("Prop name:" + propName + "  Type: " + propType);

        if (propName && propType) {
            if ((propType === "Abilities") || (propType === "Dynastic Code")) {
                const chars = prop.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            map.set(propName, char.textContent);
                        }
                    }
                }
            }
        }
    }
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
        case 'Agent of the Imperium': return UnitRole.AGENTS;
    }
    return UnitRole.NONE;
}

function LookupRoleKillTeam(roleText: string): UnitRole {
    switch (roleText) {
        case 'Commander': return UnitRole.COMMANDER;
        case 'Leader': return UnitRole.LEADER;
        case 'Specialist': return UnitRole.SPECIALIST;
        case 'Non-specialist': return UnitRole.NON_SPECIALIST;
    }
    return UnitRole.NONE;
}

function parseUnknownProfile(prop: Element, unit: Unit): void {

    let propName = prop.getAttributeNode("name")?.nodeValue;
    let propType = prop.getAttributeNode("typeName")?.nodeValue;

    console.log("Unknown profile type: " + propType + " with name: " + propName + ".  Found in unit: " + unit._name);

    // TODO: make a table out of the unknown profile.
    //
    // <typeName>      Name           <characteristic1.name>    <characteristic2.name> ...
    //               <profileName>    <characteristic1.text>    <characteristic2.text> ...
    //

}

function ExpandBaseNotes(root: Element, obj: BaseNotes): string {
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

function ParseUnit(root: Element, is40k: boolean): Unit | null {
    let unit: Unit = new Unit();
    const unitName = ExpandBaseNotes(root, unit);

    let categories = root.querySelectorAll(":scope categories>category");
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
                    if (!is40k) {
                        unitRole = LookupRoleKillTeam(roleText);
                        if (unitRole != UnitRole.NONE) {
                            unit._role = unitRole;
                        }
                        else {
                            // Keyword
                            unit._keywords.add(catName);
                        }
                    } else {
                        // Keyword
                        unit._keywords.add(catName);
                    }
                }
            }
        }
    }

    let props = root.querySelectorAll(":scope profiles>profile");
    let model: Model = new Model();
    let weapon: Weapon|null = null;

    for (let prop of props) {
        // What kind of prop is this
        const propName = prop.getAttributeNode("name")?.nodeValue;
        const propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if ((propType === "Unit") || (propType === "Model")) {
                model = new Model();
                unit._models.push(model);
                if (weapon) model._weapons.push(weapon);

                ExpandBaseNotes(prop, model);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'M': model._move = char.textContent; break;
                                case 'WS': model._ws = char.textContent; break;
                                case 'BS': model._bs = char.textContent; break;
                                case 'S': model._str = +char.textContent; break;
                                case 'T': model._toughness = +char.textContent; break;
                                case 'W': model._wounds = +char.textContent; break;
                                case 'A': model._attacks = char.textContent; break;
                                case 'Ld': model._leadership = +char.textContent; break;
                                case 'Save': model._save = char.textContent; break;
                            }
                        }
                    }

                    model._count = ExtractNumberFromParent(prop);
                }
            }
            else if ((propType === "upgrade")) {
                model._upgrades.push(propName);
            }
            else if ((propType === "Abilities") || (propType === "Wargear") || (propType === "Ability") ||
                (propType === "Household Tradition") || (propType === "Warlord Trait") || (propType === "Astra Militarum Orders") ||
                (propType === "Tank Orders") || (propType == "Lethal Ambush")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
                if (prop.parentElement && prop.parentElement.parentElement) {
                    const parentSelection = prop.parentElement.parentElement;
                    let typeValue = parentSelection.getAttributeNode("type")?.nodeValue;
                    if (typeValue === "upgrade") {
                        // are we at the correct level?
                        if (parentSelection.parentElement && parentSelection.parentElement.parentElement) {
                            const superParentSelection = parentSelection.parentElement.parentElement;
                            let typeValue = superParentSelection.getAttributeNode("type")?.nodeValue;
                            if (typeValue === "model") {
                                model._upgrades.push(propName);
                            }
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                weapon = new Weapon();
                ExpandBaseNotes(prop,  weapon);
                weapon._count = ExtractNumberFromParent(prop);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range': weapon._range = char.textContent; break;
                                case 'Type': weapon._type = char.textContent; break;
                                case 'S': weapon._str = char.textContent; break;
                                case 'AP': weapon._ap = char.textContent; break;
                                case 'D': weapon._damage = char.textContent; break;
                                case 'Abilities': weapon._abilities = char.textContent; break;
                            }
                        }
                    }
                }
            }
            else if (propType.includes("Wound Track") || propType.includes("Stat Damage")) {
                let tracker = new WoundTracker();
                ExpandBaseNotes(prop, tracker);
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && propName) {
                        if (char.textContent) {
                            tracker._table.set(charName, char.textContent);
                        }
                        else {
                            tracker._table.set(charName, "-");
                        }
                    }
                }
                unit._woundTracker.push(tracker);
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
                let power: PsychicPower = new PsychicPower();
                ExpandBaseNotes(prop, power);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range': power._range = char.textContent; break;
                                case 'Warp Charge': power._manifest = +char.textContent; break;
                                case 'Details': power._details = char.textContent; break;
                            }
                        }
                    }
                }
                model._psychicPowers.push(power);
                if (!model._name) {
                    console.log("Unexpected: Created a psychic without an active model.  Unit: " + unitName);
                }
            }
            else if (propType.includes("Explosion")) {
                let explosion: Explosion = new Explosion();
                ExpandBaseNotes(prop, explosion);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Dice Roll': explosion._diceRoll = char.textContent; break;
                                case 'Distance': explosion._distance = char.textContent; break;
                                case 'Mortal Wounds': explosion._mortalWounds = char.textContent; break;
                            }
                        }
                    }
                }
                model._explosions.push(explosion);
                if (!model._name) {
                    console.log("Unexpected: Created a explosion without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Psyker") {
                let psyker: Psyker = new Psyker();
                ExpandBaseNotes(prop, psyker);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Cast': psyker._cast = char.textContent; break;
                            case 'Deny': psyker._deny = char.textContent; break;
                            case 'Powers Known': psyker._powers = char.textContent; break;
                            case 'Other': psyker._other = char.textContent; break;
                        }
                    }
                }
                model._psyker = psyker;
                if (!model._name) {
                    console.log("Unexpected: Created a psyker without an active model.  Unit: " + unitName);
                }
            }
            else {
                 parseUnknownProfile(prop, unit);
            }
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    let costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
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

    unit.normalize();
    return unit;
}

function CompareObj(a: { _name: string; }, b: { _name: string; }): number {
    return Compare(a._name, b._name);
}


export function Compare(a: string, b: string): number {
    if (a > b) return 1;
    else if (a == b) return 0;
    return -1;
}
