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

export class AoS4RangedWeapon {
    _name: string = "";
    _range: string = "";
    _attacks: string = "";
    _toHit: string = "";
    _toWound: string = "";
    _rend: string = "";
    _damage: string = "";
    _ability: string = "";
}

export class AoS4MeleeWeapon {
    _name: string = "";
    _attacks: string = "";
    _toHit: string = "";
    _toWound: string = "";
    _rend: string = "";
    _damage: string = "";
    _ability: string = "";
}

export class AoS4Ability {
    _name: string = "";
    _type: string = "Passive"; // "Passive", "Activated", "Spell", "Prayer", "Blood Tithe"
    _timing: string = "";
    _declare: string = "";
    _effect: string = "";
    _keywords: string = "";
    _usedBy: string = "";
    _castingValue: string = "";
    _chantingValue: string = "";
    _bloodTithePoints: string = "";
    _unlockCondition: string = "";
}

export class AoS4Manifestation {
    _name: string = "";
    _move: string = "";
    _health: string = "";
    _save: string = "";
    _banishment: string = "";
    _meleeWeapons: AoS4MeleeWeapon[] = [];
    _abilities: AoS4Ability[] = [];
    _keywords: Set<string> = new Set();
}

export class AoS4BattleTacticCard {
    _name: string = "";
    _card: string = "";
    _affray: string = "";
    _strike: string = "";
    _domination: string = "";
}

export class AoS4Unit {
    _name: string = "";
    _id: number = 0;
    _move: string = "";
    _health: string = "";
    _save: string = "";
    _control: string = "";
    _keywords: Set<string> = new Set();
    _rangedWeapons: AoS4RangedWeapon[] = [];
    _meleeWeapons: AoS4MeleeWeapon[] = [];
    _abilities: AoS4Ability[] = [];
    _points: number = 0;
    _selections: Set<string> = new Set();
}

export class AoS4Force {
    _catalog: string = "";
    _name: string = "";
    _units: AoS4Unit[] = [];
    _battleTraits: AoS4Ability[] = [];
    _battleFormation: AoS4Ability[] = [];
    _battleFormationName: string = "";
    _battleTacticCards: AoS4BattleTacticCard[] = [];
    _manifestations: AoS4Manifestation[] = [];
    _manifestationAbilities: AoS4Ability[] = [];
    _spellLore: AoS4Ability[] = [];
    _prayerLore: AoS4Ability[] = [];
    _factionTerrain: AoS4Unit[] = [];
}

export class RosterAoS4 {
    _name: string = "";
    _points: number = 0;
    _pointLimit: number = 0;
    _forces: AoS4Force[] = [];
}

const INTERNAL_CATEGORIES = new Set([
    "Army Composition", "Configuration", "Reference", "Illegal Units",
    "Regimental Leader", "Regimental Hero", "Regimental Option"
]);

export function FormatAbilityText(text: string): string {
    if (!text) return "";
    // Convert **text** to <b>text</b>
    let result = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    // Convert ^^text^^ to <sup>text</sup>
    result = result.replace(/\^\^([^^]+)\^\^/g, '<sup>$1</sup>');
    // Convert newlines to <br>
    result = result.replace(/\n/g, '<br>');
    return result;
}

export function CreateAoS4Roster(doc: Document): RosterAoS4 | null {
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterAoS4();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            } else {
                roster._name = "Age of Sigmar 4.0 Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: RosterAoS4): void {
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value && which === "pts") {
                roster._points = +value;
            }
        }
    }
    let costLimits = doc.querySelectorAll("roster>costLimits>costLimit");
    for (let cl of costLimits) {
        if (cl.hasAttribute("name") && cl.hasAttribute("value")) {
            let which = cl.getAttributeNode("name")?.nodeValue;
            let value = cl.getAttributeNode("value")?.nodeValue;
            if (value && which === "pts") {
                roster._pointLimit = +value;
            }
        }
    }
}

function ParseForces(doc: XMLDocument, roster: RosterAoS4): void {
    // AoS4 structure: roster>forces contains a single army config force,
    // with regiment forces nested inside it at force>forces>force.
    let topForces = doc.querySelectorAll("roster>forces>force");

    for (let topForce of topForces) {
        if (!topForce.hasAttribute("name") || !topForce.hasAttribute("catalogueName")) continue;

        let forceName = topForce.getAttributeNode("name")?.nodeValue || "";
        let catalogName = topForce.getAttributeNode("catalogueName")?.nodeValue || "";

        // The top-level force is the army-wide config
        let armyForce = new AoS4Force();
        armyForce._name = forceName;
        armyForce._catalog = catalogName;
        ParseArmyConfig(topForce, armyForce);
        roster._forces.push(armyForce);

        // Regiment forces are nested inside: force>forces>force
        let nestedForces = topForce.querySelectorAll("forces>force");
        for (let nestedForce of nestedForces) {
            if (!nestedForce.hasAttribute("name") || !nestedForce.hasAttribute("catalogueName")) continue;

            let nestedName = nestedForce.getAttributeNode("name")?.nodeValue || "";
            let nestedCatalog = nestedForce.getAttributeNode("catalogueName")?.nodeValue || "";

            let f = new AoS4Force();
            f._name = nestedName;
            f._catalog = nestedCatalog;
            ParseRegimentSelections(nestedForce, f);
            roster._forces.push(f);
        }
    }
}

function ParseArmyConfig(root: Element, force: AoS4Force): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) continue;

        if (selectionName.startsWith("Battle Traits")) {
            // Battle traits: profiles directly on this selection
            let profiles = selection.querySelectorAll(":scope>profiles>profile");
            for (let prof of profiles) {
                let ability = ParseAbilityProfile(prof);
                if (ability) {
                    force._battleTraits.push(ability);
                }
            }
        } else if (selectionName === "Battle Formation") {
            // Battle formation: sub-selections with abilities
            let subSelections = selection.querySelectorAll(":scope>selections>selection");
            for (let subSel of subSelections) {
                let formName = subSel.getAttributeNode("name")?.nodeValue;
                if (formName) {
                    force._battleFormationName = formName;
                }
                let profiles = subSel.querySelectorAll(":scope profiles>profile");
                for (let prof of profiles) {
                    let ability = ParseAbilityProfile(prof);
                    if (ability) {
                        force._battleFormation.push(ability);
                    }
                }
            }
        } else if (selectionName === "Battle Tactic Cards") {
            // Sub-selections each containing a Battle Tactic Card profile
            let subSelections = selection.querySelectorAll(":scope>selections>selection");
            for (let subSel of subSelections) {
                let profiles = subSel.querySelectorAll("profiles>profile");
                for (let prof of profiles) {
                    let profType = prof.getAttributeNode("typeName")?.nodeValue;
                    if (profType === "Battle Tactic Card") {
                        let card = ParseBattleTacticCardProfile(prof);
                        if (card) {
                            force._battleTacticCards.push(card);
                        }
                    }
                }
            }
        } else if (selectionName === "Manifestation Lore") {
            ParseManifestationLore(selection, force);
        } else if (selectionName === "Spell Lore") {
            ParseSpellOrPrayerLore(selection, force._spellLore);
        } else if (selectionName === "Prayer Lore") {
            ParseSpellOrPrayerLore(selection, force._prayerLore);
        } else {
            // Check if it's a faction terrain unit or other unit
            let selType = selection.getAttributeNode("type")?.nodeValue;
            if (selType === "unit") {
                let unit = ParseUnit(selection);
                if (unit) {
                    force._factionTerrain.push(unit);
                }
            }
        }
    }
}

function ParseManifestationLore(selection: Element, force: AoS4Force): void {
    // Direct children selections that are type="unit" are manifestations
    // Direct children selections that are type="upgrade" can be summon abilities or lore groups
    let subSelections = selection.querySelectorAll(":scope>selections>selection");

    for (let subSel of subSelections) {
        let subName = subSel.getAttributeNode("name")?.nodeValue || "";
        let subType = subSel.getAttributeNode("type")?.nodeValue || "";

        if (subType === "unit") {
            // This is a manifestation unit
            let manifestation = ParseManifestationUnit(subSel);
            if (manifestation) {
                force._manifestations.push(manifestation);
            }
        } else if (subType === "upgrade") {
            // Could be a lore group container or a summon ability
            let profiles = subSel.querySelectorAll(":scope>profiles>profile");
            for (let prof of profiles) {
                let ability = ParseAbilityProfile(prof);
                if (ability) {
                    force._manifestationAbilities.push(ability);
                }
            }
            // Check deeper nesting (lore group with sub-sub-selections)
            let deeperSels = subSel.querySelectorAll(":scope>selections>selection");
            for (let deeper of deeperSels) {
                let deeperType = deeper.getAttributeNode("type")?.nodeValue || "";
                if (deeperType === "unit") {
                    let manifestation = ParseManifestationUnit(deeper);
                    if (manifestation) {
                        force._manifestations.push(manifestation);
                    }
                } else if (deeperType === "upgrade") {
                    let deeperProfiles = deeper.querySelectorAll(":scope>profiles>profile");
                    for (let prof of deeperProfiles) {
                        let ability = ParseAbilityProfile(prof);
                        if (ability) {
                            force._manifestationAbilities.push(ability);
                        }
                    }
                }
            }
        }
    }
}

function ParseManifestationUnit(selection: Element): AoS4Manifestation | null {
    let manifestation = new AoS4Manifestation();
    let selName = selection.getAttributeNode("name")?.nodeValue || "";
    manifestation._name = selName;

    // Parse profiles on this selection
    let profiles = selection.querySelectorAll(":scope>profiles>profile");
    for (let prof of profiles) {
        let profType = prof.getAttributeNode("typeName")?.nodeValue || "";
        if (profType === "Manifestation") {
            let chars = prof.querySelectorAll("characteristics>characteristic");
            for (let char of chars) {
                let charName = char.getAttributeNode("name")?.nodeValue;
                if (charName && char.textContent) {
                    switch (charName) {
                        case 'Move': manifestation._move = char.textContent; break;
                        case 'Health': manifestation._health = char.textContent; break;
                        case 'Save': manifestation._save = char.textContent; break;
                        case 'Banishment': manifestation._banishment = char.textContent; break;
                    }
                }
            }
        } else if (profType === "Melee Weapon") {
            let weapon = ParseMeleeWeaponProfile(prof);
            if (weapon) manifestation._meleeWeapons.push(weapon);
        } else if (profType.startsWith("Ability")) {
            let ability = ParseAbilityProfile(prof);
            if (ability) manifestation._abilities.push(ability);
        }
    }

    // Parse sub-selections for weapons
    let subSels = selection.querySelectorAll(":scope>selections>selection");
    for (let subSel of subSels) {
        let subProfiles = subSel.querySelectorAll(":scope>profiles>profile");
        for (let prof of subProfiles) {
            let profType = prof.getAttributeNode("typeName")?.nodeValue || "";
            if (profType === "Melee Weapon") {
                let weapon = ParseMeleeWeaponProfile(prof);
                if (weapon) manifestation._meleeWeapons.push(weapon);
            }
        }
    }

    // Parse categories as keywords
    let categories = selection.querySelectorAll(":scope>categories>category");
    for (let cat of categories) {
        let catName = cat.getAttributeNode("name")?.nodeValue;
        if (catName && !INTERNAL_CATEGORIES.has(catName)) {
            manifestation._keywords.add(catName);
        }
    }

    return manifestation;
}

function ParseSpellOrPrayerLore(selection: Element, abilityList: AoS4Ability[]): void {
    // Direct sub-selection abilities
    let subSelections = selection.querySelectorAll(":scope>selections>selection");
    for (let subSel of subSelections) {
        let subType = subSel.getAttributeNode("type")?.nodeValue || "";
        if (subType === "upgrade") {
            // Could have profiles directly or nested
            let profiles = subSel.querySelectorAll(":scope>profiles>profile");
            for (let prof of profiles) {
                let ability = ParseAbilityProfile(prof);
                if (ability) {
                    abilityList.push(ability);
                }
            }
            // Check nested
            let deeperSels = subSel.querySelectorAll(":scope>selections>selection");
            for (let deeper of deeperSels) {
                let deeperProfiles = deeper.querySelectorAll(":scope>profiles>profile");
                for (let prof of deeperProfiles) {
                    let ability = ParseAbilityProfile(prof);
                    if (ability) {
                        abilityList.push(ability);
                    }
                }
            }
        }
    }
}

function ParseRegimentSelections(root: Element, force: AoS4Force): void {
    let selections = root.querySelectorAll("force>selections>selection");
    let unit_id = 0;
    for (let selection of selections) {
        let unit = ParseUnit(selection);
        if (unit) {
            unit._id = unit_id++;
            force._units.push(unit);
        }
    }
}

function ParseUnit(root: Element): AoS4Unit | null {
    let unit = new AoS4Unit();

    let defaultName = root.getAttributeNode("name")?.nodeValue;
    if (defaultName) {
        unit._name = defaultName;
    }

    // Parse direct profiles
    let profiles = root.querySelectorAll(":scope>profiles>profile");
    for (let prof of profiles) {
        let profName = prof.getAttributeNode("name")?.nodeValue;
        let profType = prof.getAttributeNode("typeName")?.nodeValue;
        if (!profName || !profType) continue;

        if (profType === "Unit") {
            let chars = prof.querySelectorAll("characteristics>characteristic");
            for (let char of chars) {
                let charName = char.getAttributeNode("name")?.nodeValue;
                if (charName && char.textContent) {
                    switch (charName) {
                        case 'Move': unit._move = char.textContent; break;
                        case 'Health': unit._health = char.textContent; break;
                        case 'Save': unit._save = char.textContent; break;
                        case 'Control': unit._control = char.textContent; break;
                    }
                }
            }
        } else if (profType === "Ranged Weapon") {
            let weapon = ParseRangedWeaponProfile(prof);
            if (weapon) unit._rangedWeapons.push(weapon);
        } else if (profType === "Melee Weapon") {
            let weapon = ParseMeleeWeaponProfile(prof);
            if (weapon) unit._meleeWeapons.push(weapon);
        } else if (profType.startsWith("Ability")) {
            let ability = ParseAbilityProfile(prof);
            if (ability) unit._abilities.push(ability);
        }
    }

    // Parse sub-selections for weapons and nested profiles
    let selections = root.querySelectorAll(":scope>selections>selection");
    for (let selection of selections) {
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (selectionName) {
            unit._selections.add(selectionName);
        }

        let subProfiles = selection.querySelectorAll(":scope>profiles>profile");
        for (let prof of subProfiles) {
            let profType = prof.getAttributeNode("typeName")?.nodeValue;
            if (!profType) continue;

            if (profType === "Ranged Weapon") {
                let weapon = ParseRangedWeaponProfile(prof);
                if (weapon) unit._rangedWeapons.push(weapon);
            } else if (profType === "Melee Weapon") {
                let weapon = ParseMeleeWeaponProfile(prof);
                if (weapon) unit._meleeWeapons.push(weapon);
            } else if (profType.startsWith("Ability")) {
                let ability = ParseAbilityProfile(prof);
                if (ability) unit._abilities.push(ability);
            }
        }
    }

    // Parse costs
    let costs = root.querySelectorAll(":scope>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value && which === "pts") {
                unit._points += +value;
            }
        }
    }

    // Parse categories as keywords
    let categories = root.querySelectorAll(":scope>categories>category");
    for (let category of categories) {
        let catName = category.getAttributeNode("name")?.nodeValue;
        if (catName && !INTERNAL_CATEGORIES.has(catName)) {
            unit._keywords.add(catName);
        }
    }

    return unit;
}

function ParseAbilityProfile(prof: Element): AoS4Ability | null {
    let profName = prof.getAttributeNode("name")?.nodeValue;
    let profType = prof.getAttributeNode("typeName")?.nodeValue;
    if (!profName || !profType) return null;

    let ability = new AoS4Ability();
    ability._name = profName;

    // Determine ability type from profile typeName
    if (profType === "Ability (Passive)") {
        ability._type = "Passive";
    } else if (profType === "Ability (Activated)") {
        ability._type = "Activated";
    } else if (profType === "Ability (Spell)") {
        ability._type = "Spell";
    } else if (profType === "Ability (Prayer)") {
        ability._type = "Prayer";
    } else if (profType === "Ability (Blood Tithe)") {
        ability._type = "Blood Tithe";
    } else {
        // Not an ability profile
        return null;
    }

    let chars = prof.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttributeNode("name")?.nodeValue;
        let charValue = char.textContent || "";
        if (!charName) continue;

        switch (charName) {
            case 'Timing': ability._timing = charValue; break;
            case 'Declare': ability._declare = charValue; break;
            case 'Effect': ability._effect = charValue; break;
            case 'Keywords': ability._keywords = charValue; break;
            case 'Used By': ability._usedBy = charValue; break;
            case 'Casting Value': ability._castingValue = charValue; break;
            case 'Chanting Value': ability._chantingValue = charValue; break;
            case 'Blood Tithe Points': ability._bloodTithePoints = charValue; break;
            case 'Unlock Condition': ability._unlockCondition = charValue; break;
        }
    }

    return ability;
}

function ParseMeleeWeaponProfile(prof: Element): AoS4MeleeWeapon | null {
    let profName = prof.getAttributeNode("name")?.nodeValue;
    if (!profName) return null;

    let weapon = new AoS4MeleeWeapon();
    weapon._name = profName;

    let chars = prof.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttributeNode("name")?.nodeValue;
        if (charName && char.textContent) {
            switch (charName) {
                case 'Atk': weapon._attacks = char.textContent; break;
                case 'Hit': weapon._toHit = char.textContent; break;
                case 'Wnd': weapon._toWound = char.textContent; break;
                case 'Rnd': weapon._rend = char.textContent; break;
                case 'Dmg': weapon._damage = char.textContent; break;
                case 'Ability': weapon._ability = char.textContent; break;
            }
        }
    }

    return weapon;
}

function ParseRangedWeaponProfile(prof: Element): AoS4RangedWeapon | null {
    let profName = prof.getAttributeNode("name")?.nodeValue;
    if (!profName) return null;

    let weapon = new AoS4RangedWeapon();
    weapon._name = profName;

    let chars = prof.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttributeNode("name")?.nodeValue;
        if (charName && char.textContent) {
            switch (charName) {
                case 'Rng': weapon._range = char.textContent; break;
                case 'Atk': weapon._attacks = char.textContent; break;
                case 'Hit': weapon._toHit = char.textContent; break;
                case 'Wnd': weapon._toWound = char.textContent; break;
                case 'Rnd': weapon._rend = char.textContent; break;
                case 'Dmg': weapon._damage = char.textContent; break;
                case 'Ability': weapon._ability = char.textContent; break;
            }
        }
    }

    return weapon;
}

function ParseBattleTacticCardProfile(prof: Element): AoS4BattleTacticCard | null {
    let profName = prof.getAttributeNode("name")?.nodeValue;
    if (!profName) return null;

    let card = new AoS4BattleTacticCard();
    card._name = profName;

    let chars = prof.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttributeNode("name")?.nodeValue;
        if (charName && char.textContent) {
            switch (charName) {
                case 'Card': card._card = char.textContent; break;
                case 'Affray': card._affray = char.textContent; break;
                case 'Strike': card._strike = char.textContent; break;
                case 'Domination': card._domination = char.textContent; break;
            }
        }
    }

    return card;
}
