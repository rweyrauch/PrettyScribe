type WeaponStrength = number | string;

export class Weapon {
    _name: string = "";
    _range: string = "Melee";
    _type: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "";
    _damage: string = "";

    _abilities: string = "";

}

export class WoundTracker {
    _name: string = "";
    _table: Map<string, string> = new Map();
};

export class Explosion {
    _name: string = "";
    _diceRoll: string = "";
    _distance: string = "";
    _mortalWounds: string = "";
}

export class PsychicPower {
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

    // Kill Team
    COMMANDER,
    LEADER,
    SPECIALIST,
    NON_SPECIALIST,
};

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

    // Kill Team
    'Commander',
    'Leader',
    'Specialist',
    'Non-specialist'
];

export class Model {

    _name: string = "";
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
    _psychicPowers: PsychicPower[] = [];
    _explosions: Explosion[] = [];
};

export class Unit {

    _name: string = "";
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
}

export class Force {
    _catalog: string = "";
    _name: string = "Unknown";
    _faction: string = "Unknown";
    _rules: Map<string, string | null> = new Map();
    _units: Unit[] = [];

    constructor() {

    }
};

export class Roster40k {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;
    _name: string = "";
    _forces: Force[] = [];

    constructor() {

    }
};

export function Create40kRoster(doc: Document, is40k: boolean = true): Roster40k | null {
    if (doc) {
        // Determine roster type (game system).
        var info = doc.querySelector("roster");
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
    var costs = doc.querySelectorAll("roster>costs>cost");
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
    var forcesRoot = doc.querySelectorAll("roster>forces>force");
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

            ParseUnits(root, f, is40k);

            roster._forces.push(f);
        }
    }
}

function ParseUnits(root: Element, force: Force, is40k: boolean): void {
    var selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        var unit = CreateUnit(selection, is40k);
        if (unit && unit._role != UnitRole.NONE)
        {
            force._units.push(unit);
        }
    }

    // Sort force units by role.
    force._units.sort( (a: Unit, b: Unit):number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) return 0;
        return -1;
    });
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

function LookupRoleKillTeam(roleText: string): UnitRole {
    switch (roleText) {
        case 'Commander': return UnitRole.COMMANDER;
        case 'Leader': return UnitRole.LEADER;
        case 'Specialist': return UnitRole.SPECIALIST;
        case 'Non-specialist': return UnitRole.NON_SPECIALIST;
    }
    return UnitRole.NONE;
}


function CreateUnit(root: Element, is40k: boolean): Unit | null {
    var unit: Unit = new Unit();
    var unitName = root.getAttributeNode("name")?.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }

    var categories = root.querySelectorAll(":scope categories>category");
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
                var unitRole = LookupRole(roleText);
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

    var props = root.querySelectorAll(":scope profiles>profile");
    for (let prop of props) {
        // What kind of prop is this
        let propName = prop.getAttributeNode("name")?.nodeValue;
        let propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if ((propType === "Unit") || (propType === "Model")) {
                var model: Model = new Model();
                model._name = propName;
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

                    // Get parent node (a selection) to determine model count.
                    if (prop.parentElement && prop.parentElement.parentElement) {
                        const parentSelection = prop.parentElement.parentElement;
                        let countValue = parentSelection.getAttributeNode("number")?.nodeValue;
                        if (countValue) {
                            model._count = +countValue;
                        }
                    }
                }
                unit._models.push(model);
            }
            else if ((propType === "Abilities") || (propType === "Wargear") || (propType === "Ability")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability")) {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                let weapon: Weapon = new Weapon();
                weapon._name = propName;
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

                if (unit._models.length) {
                    unit._models[unit._models.length - 1]._weapons.push(weapon);
                }
            }
            else if (propType.includes("Wound Track")) {
                let tracker = new WoundTracker();
                tracker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        tracker._table.set(charName, char.textContent);
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
                power._name = propName;
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
                unit._models[unit._models.length - 1]._psychicPowers.push(power);
            }
            else if (propType == "Explosion") {
                let explosion: Explosion = new Explosion();
                explosion._name = propName;
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
                unit._models[unit._models.length - 1]._explosions.push(explosion);
            }
            else {
                console.log("Unknown profile type: " + propType);
            }
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    var costs = root.querySelectorAll(":scope costs>cost");
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

    var rules = root.querySelectorAll(":scope rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = rule.getAttributeNode("name")?.nodeValue;
            var desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
            }
        }
    }

    return unit;
}
