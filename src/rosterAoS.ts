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
    _range: string = "";
    _description: string = "";
}

export class AoSPrayer {
    _name: string = "";
    _answerValue: number = 0;
    _range: string = "";
    _description: string = "";
}

export class AoSAllegiance {
    _name: string = "";
    _battleTraits: Map<string, string> = new Map();
    _commandAbilities: Map<string, string> = new Map();
}

export class AoSGrandStrategy {
    _name: string = "";
    _description: string = "";
}

export class AoSTriumph {
    _name: string = "";
    _description: string = "";
}

export class AoSCoreBattalion {
    _name: string = "";
    _abilities: Map<string, string> = new Map();
}

export class AoSSpecialRules {
    _name: string = "";
    _description: string = "";
}

export class AoSRealmOfBattle {
    _name: string = "";
    _spells: AoSSpell[] = [];
    _commandAbilities: Map<string, string> = new Map();    
    _rules: AoSSpecialRules[] = [];
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

    _selections: Set<string> = new Set();

    equal(unit: AoSUnit | null): boolean {
        if (unit == null) return false;

        if ((unit._name === this._name) && (unit._role === this._role)) {
            if (!_.isEqual(this._commandTraits, unit._commandTraits)) {
                return false;
            }
            if (!_.isEqual(this._artefacts, unit._artefacts)) {
                return false;
            }
            if (!_.isEqual(this._weapons, unit._weapons)) {
                return false;
            }
            return true;
        }
        return false;
    }
}

export class AoSForce {
    _catalog: string = "";
    _name: string = "Unknown";
    _allegiance: AoSAllegiance;
    _units: AoSUnit[] = [];
    _grandStrategy: AoSGrandStrategy;
    _triumph: AoSTriumph;
    _battalions: AoSCoreBattalion[] = [];
    _realmOfBattle: AoSRealmOfBattle;
    _rules: Map<string, string> = new Map();

    constructor() {
        this._allegiance = new AoSAllegiance();
        this._grandStrategy = new AoSGrandStrategy();
        this._triumph = new AoSTriumph();
        this._realmOfBattle = new AoSRealmOfBattle();
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

            ParseRules(root, f);

            roster._forces.push(f);
        }
    }
}

function ParseSelections(root: Element, force: AoSForce): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        // What kind of selection is this
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) continue;

        if (selectionName.includes("Allegiance")) {
            let allegiance = ParseAllegiance(selection);
            if (allegiance) {
                force._allegiance = allegiance;
            }     
        }
        else if (selectionName.includes('Grand Strategy')) {
            let strategy = ParseGrandStrategy(selection);
            if (strategy) {
                force._grandStrategy = strategy;
            }
        }
        else if (selectionName.includes('Game Type')) {
            // TODO: implement Game Type
        }
        else if (selectionName.includes('Core Battalion')) {
            let battalion = new AoSCoreBattalion();

            battalion._name = selectionName

            let profiles = selection.querySelectorAll("profiles>profile");
            for (let prof of profiles) {
                for (let prof of profiles) {
                    let profName = prof.getAttributeNode("name")?.nodeValue;
                    let profType = prof.getAttributeNode("typeName")?.nodeValue;
                    if (profName && profType) {
                        let chars = prof.querySelectorAll("characteristics>characteristic");
                        for (let char of chars) {
                            let charName = char.getAttributeNode("name")?.nodeValue;
                            if (charName && char.textContent) {
                                battalion._abilities.set(charName, char.textContent);
                            }        
                        }
                    }
                }        
            }
            force._battalions.push(battalion);
        }
        else if (selectionName.includes('Realm of Battle')) {
           // TODO: implement Realm of Battle
           let realm = ParseRealmOfBattle(selection);
           if (realm) {
               force._realmOfBattle = realm;
           }
        }
        else if (selectionName.includes('Triumphs')) {
            let triumph = ParseTriumph(selection);
            if (triumph) {
                force._triumph = triumph;
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

function ParseRules(root: Element, force: AoSForce): void {
    let rules = root.querySelectorAll("force>rules>rule");

    for (let rule of rules) {
        let ruleName = rule.getAttributeNode("name")?.nodeValue;
        let descriptions = rule.querySelectorAll("description");
        if (!ruleName || !descriptions) {
            continue;
        }

        for (let desc of descriptions) {
            if (desc.textContent)
                force._rules.set(ruleName, desc.textContent);
        }
    }   
}

function ParseUnit(root: Element): AoSUnit {
    let unit: AoSUnit = new AoSUnit();

    let defaultName = root.getAttributeNode("name")?.nodeValue;
    if (defaultName) {
        unit._name = defaultName;
    }

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
                            case 'Range': spell._range = char.textContent; break;
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
                            case 'Answer Value': prayer._answerValue = +char.textContent; break;
                            case 'Range': prayer._range = char.textContent; break;
                            case 'Description': prayer._description = char.textContent; break;
                        }
                    }
                }
                unit._prayers.push(prayer);
            }
            else if (profType.includes("Wound Track") || profType.includes("Damage Table") || profType.includes("Wounds")) {
                let tracker = new AoSWoundTracker();
                tracker._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && profName) {
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
            else {
                console.log("Unknown unit profile type: " + profType);
            }
        }


        let selections = root.querySelectorAll("selections>selection");
        for (let selection of selections) {
            let selectionName = selection.getAttributeNode("name")?.nodeValue;
            if (selectionName) {
                unit._selections.add(selectionName);
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

function ParseGrandStrategy(root: Element): AoSGrandStrategy | null {
    let strategy: AoSGrandStrategy | null = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = selection.getAttributeNode("name")?.nodeValue;
        if (name) {
            strategy = new AoSGrandStrategy();
            strategy._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                if (profType == "Grand Strategy") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            if (strategy) strategy._description = description;
                        }
                    }
                }
                else {
                    console.log("Unexpected Grand Strategy profile type: " + profType);
                }
            }
        }
    }
    return strategy;
}

function ParseTriumph(root: Element): AoSTriumph | null {
    let triumph: AoSTriumph | null = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = selection.getAttributeNode("name")?.nodeValue;
        if (name) {
            triumph = new AoSTriumph();
            triumph._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = prof.getAttributeNode("name")?.nodeValue;
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (profName && profType) {
                if (profType == "Triumph") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            if (triumph) triumph._description = description;
                        }
                    }
                }
                else {
                    console.log("Unexpected Triumph profile type: " + profType);
                }
            }
        }
    }
    return triumph;
}

function ParseRealmOfBattle(root: Element): AoSRealmOfBattle | null {
    let realm: AoSRealmOfBattle | null = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = selection.getAttributeNode("name")?.nodeValue;
        if (name) {
            realm = new AoSRealmOfBattle();
            realm._name = name;
        
            let profiles = selection.querySelectorAll("profiles>profile");
            for (let prof of profiles) {
                let profName = prof.getAttributeNode("name")?.nodeValue;
                let profType = prof.getAttributeNode("typeName")?.nodeValue;
                if (profName && profType) {
                    if (profType == "Spell") {
                        let spell = new AoSSpell();
                        spell._name = profName;
                        let chars = prof.querySelectorAll("characteristics>characteristic");
                        for (let char of chars) {
                            let charName = char.getAttributeNode("name")?.nodeValue;
                            if (charName && char.textContent) {
                                switch (charName) {
                                    case 'Casting Value': spell._castingValue = +char.textContent; break;
                                    case 'Range': spell._range = char.textContent; break;
                                    case 'Description': spell._description = char.textContent; break;
                                }
                            }
                        }
                        realm._spells.push(spell);
                    }
                    else if (profType == "Command Abilities") {
                        let char = prof.querySelector("characteristics>characteristic");
                        if (char && char.textContent) {
                            realm._commandAbilities.set(profName, char.textContent);
                        }    
                    }
                    else if (profType == "Special Rules") {
                        let char = prof.querySelector("characteristics>characteristic");
                        if (char && char.textContent) {
                            let rule = new AoSSpecialRules();
                            rule._name = profName;
                            rule._description = char.textContent;
                            realm._rules.push(rule);
                        }    
                    }
                    else {
                        console.log("Unexpected Realm of Battle profile type: " + profType);
                    }
                }
            }    
        }
    }
    return realm;
}
