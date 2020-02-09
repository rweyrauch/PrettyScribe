
export class AoSWeapon {
    _name: string = "";
    _type: string = "Melee"; // or "Missile"
    _range: string = "";
    _attacks: string = "";
    _toHit: string = "";
    _toWound: string = "";
    _rend: string = "";
    _damage: string = "";
}

export class AoSWoundTracker {
    _name: string = "";
    _table: Map<string, string> = new Map();
};

export class AoSSpell {
    _name: string = "";
    _castingValue: number = 0;
    _description: string = "";
}

export class AoSPrayer {
    _name: string = "";
    _description: string = "";
}

export class AoSAllegiance {
    _name: string = "";
    _battleTraits: Map<string, string> = new Map();
    _commandAbilities: Map<string, string> = new Map();
}

export enum AoSUnitRole {
    NONE,

    LEADER,
    BATTLELINE,
    BEHEMOTH,
    ARTILLERY,
    OTHER,
    SCENERY,

    BATTALION,
    MALIGN_SORCERY,
    REALM,
};

export const AoSUnitRoleToString: string[] = [
    'None',

    'Leader',
    'Battleline',
    'Behemoth',
    'Artillery',
    'Other',
    'Scenery',

    'Battalion',
    'Malign Sorcery',
    'Realm'
];

export class AoSUnit {

    _name: string = "";
    _role: AoSUnitRole = AoSUnitRole.NONE;
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _commandAbilities: Map<string, string> = new Map();
    _commandTraits: Map<string, string> = new Map();
    _magic: Map<string, string> = new Map();
    _artefacts: Map<string, string> = new Map();

    _count: number = 0;

    // Characteristics
    _move: string = "0\"";
    _wounds: number = 1;
    _bravery: number = 7;
    _save: string = "";

    _weapons: AoSWeapon[] = [];
    _spells: AoSSpell[] = [];
    _prayers: AoSPrayer[] = [];

    _points: number = 0;

    _woundTracker: AoSWoundTracker[] = [];
}

export class AoSForce {
    _catalog: string = "";
    _name: string = "Unknown";
    _allegiance: AoSAllegiance;
    _units: AoSUnit[] = [];

    constructor() {
        this._allegiance = new AoSAllegiance();
    }
};

export class RosterAoS {
    _commandPoints: number = 0;
    _points: number = 0;
    _name: string = "";
    _forces: AoSForce[] = [];

    constructor() {

    }
};

function LookupRole(roleText: string): AoSUnitRole {
    switch (roleText) {
        case 'Leader': return AoSUnitRole.LEADER;
        case 'Battleline': return AoSUnitRole.BATTLELINE;
        case 'Other': return AoSUnitRole.OTHER;
        case 'Behemoth': return AoSUnitRole.BEHEMOTH;
        case 'Artillery': return AoSUnitRole.ARTILLERY;
        case 'Scenery': return AoSUnitRole.SCENERY;

        case 'Battalion': return AoSUnitRole.BATTALION;
        case 'Malign Sorcery': return AoSUnitRole.MALIGN_SORCERY;
        case 'Realm': return AoSUnitRole.REALM;
    }
    return AoSUnitRole.NONE;
}

export function CreateAoSRoster(doc: Document): RosterAoS | null {
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterAoS();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Age of Sigmar Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: RosterAoS): void {
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

function ParseForces(doc: XMLDocument, roster: RosterAoS): void {
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {

            let f = new AoSForce();

            let which = root.getAttributeNode("name")?.nodeValue;
            let value = root.getAttributeNode("catalogueName")?.nodeValue;

            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }

            ParseSelections(root, f);

            roster._forces.push(f);
        }
    }
    console.log(roster);
}

function ParseSelections(root: Element, force: AoSForce): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        // What kind of selection is this
        let selectionType = selection.getAttributeNode("type")?.nodeValue;
        if (!selectionType) continue;
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (selectionName && (selectionName.includes("Allegiance"))) {
            let allegiance = ParseAllegiance(selection);
            if (allegiance) {
                force._allegiance = allegiance;
            }     
        }
        else {
            let unit = ParseUnit(selection);
            if (unit && (unit._role != AoSUnitRole.NONE)) {
                force._units.push(unit);
            }
        }
    }

    // Sort force units by role.
    force._units.sort((a: AoSUnit, b: AoSUnit): number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) return 0;
        return -1;
    });
}

function ParseUnit(root: Element): AoSUnit {
    let unit: AoSUnit = new AoSUnit();

    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = prof.getAttributeNode("name")?.nodeValue;
        let profType = prof.getAttributeNode("typeName")?.nodeValue;
        if (profName && profType) {
            if (profType == "Unit") {
                unit._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Move': unit._move = char.textContent; break;
                            case 'Wounds': unit._wounds = +char.textContent; break;
                            case 'Bravery': unit._bravery = +char.textContent; break;
                            case 'Save': unit._save = char.textContent; break;
                        }
                    }
                }
            }
            else if (profType == "Unit Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Command Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandAbilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Magic") {
                let characteristics = prof.querySelectorAll("characteristics>characteristic");
                for (let char of characteristics) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        unit._magic.set(charName, char.textContent);
                    }
                }
            }
            else if (profType == "Unit Leader") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profType, char.textContent);
                }
            }
            else if (profType == "Spell") {
                let spell = new AoSSpell();
                spell._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Casting Value': spell._castingValue = +char.textContent; break;
                            case 'Description': spell._description = char.textContent; break;
                        }
                    }
                }
                unit._spells.push(spell);
            }
            else if (profType == "Weapon") {
                let weapon = new AoSWeapon();
                weapon._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Range': weapon._range = char.textContent; break;
                            case 'Type': weapon._type = char.textContent; break;
                            case 'Attacks': weapon._attacks = char.textContent; break;
                            case 'Rend': weapon._rend = char.textContent; break;
                            case 'To Hit': weapon._toHit = char.textContent; break;
                            case 'To Wound': weapon._toWound = char.textContent; break;
                            case 'Damage': weapon._damage = char.textContent; break;
                        }
                    }
                }
                unit._weapons.push(weapon);
            }
            else if (profType == "Command Trait") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandTraits.set(profName, char.textContent);
                }
            }
            else if (profType == "Artefact") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._artefacts.set(profName, char.textContent);
                }
            }
            else if (profType == "Prayer") {
                let prayer = new AoSPrayer();
                prayer._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Description': prayer._description = char.textContent; break;
                        }
                    }
                }
                unit._prayers.push(prayer);
            }
            else if (profType.includes("Wound Track") || profType.includes("Damage Table")) {

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
            if (unitRole != AoSUnitRole.NONE) {
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

function ParseAllegiance(root: Element): AoSAllegiance | null {
    let allegiance: AoSAllegiance | null = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = selection.getAttributeNode("name")?.nodeValue;
        if (name) {
            allegiance = new AoSAllegiance();
            allegiance._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                if (profType == "Battle Trait") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            allegiance?._battleTraits.set(profName, description);
                        }
                    }
                }
                else if (profType == "Command Abilities") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            allegiance?._commandAbilities.set(profName, description);
                        }
                    }
                }
                else {
                    console.log("Unexpected allegiance profile type: " + profType);
                }
            }
        }
    }
    return allegiance;
}