/*
    Copyright 2022-26 Rick Weyrauch,

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

export namespace HorusHeresy3 {

    export enum UnitRole {
        NONE,

        HIGH_COMMAND,
        COMMAND,
        TROOPS,
        ELITES,
        FAST_ATTACK,
        HEAVY_ASSAULT,
        SUPPORT,
        RECON,
        RETINUE,
        TRANSPORT,
        HEAVY_TRANSPORT,
        WAR_ENGINE,
        ARMOUR,
        REWARDS_OF_TREACHERY,
    }

    export const UnitRoleToString: string[] = [
        'None',

        'High Command',
        'Command',
        'Troops',
        'Elites',
        'Fast Attack',
        'Heavy Assault',
        'Support',
        'Recon',
        'Retinue',
        'Transport',
        'Heavy Transport',
        'War-engine',
        'Armour',
        'Rewards of Treachery',
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
        _description: string = "";
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

    export class RangedWeapon extends Upgrade {
        _selectionName: string = "";
        _range: string = "";
        _fp: string = "";
        _rs: string = "";
        _ap: string = "";
        _damage: string = "";
        _specialRules: string = "";
        _traits: string = "";

        getSpecialRules(): string[] {
            if (!this._specialRules || this._specialRules === '-') return [];
            return this._specialRules.split(',').map(rule => rule.trim());
        }
    }

    export class MeleeWeapon extends Upgrade {
        _selectionName: string = "";
        _im: string = "";
        _am: string = "";
        _sm: string = "";
        _ap: string = "";
        _damage: string = "";
        _specialRules: string = "";
        _traits: string = "";

        getSpecialRules(): string[] {
            if (!this._specialRules || this._specialRules === '-') return [];
            return this._specialRules.split(',').map(rule => rule.trim());
        }
    }

    export class WargearItem extends Upgrade {
        _summary: string = "";
    }

    export class Reaction extends Upgrade {
        _summary: string = "";
        _trigger: string = "";
        _reactionCost: string = "";
        _target: string = "";
        _process: string = "";
    }

    export class Gambit extends Upgrade {
        _summary: string = "";
    }

    export class TraitItem extends Upgrade {
    }

    export class BaseModel extends BaseNote {
        _count: number = 0;
        _type: string = "";

        _rangedWeapons: RangedWeapon[] = [];
        _meleeWeapons: MeleeWeapon[] = [];
        _upgrades: Upgrade[] = [];
        _wargear: WargearItem[] = [];

        _reactions: Reaction[] = [];
        _gambits: Gambit[] = [];

        equal(model: BaseModel | null): boolean {
            if (model == null) return false;

            if ((this._name === model._name) &&
                (this._count === model._count) &&
                (this._rangedWeapons.length === model._rangedWeapons.length) &&
                (this._meleeWeapons.length === model._meleeWeapons.length) &&
                (this._upgrades.length === model._upgrades.length) &&
                (this._wargear.length === model._wargear.length)) {

                for (let wi = 0; wi < this._rangedWeapons.length; wi++) {
                    if (!this._rangedWeapons[wi].equal(model._rangedWeapons[wi])) {
                        return false;
                    }
                }
                for (let wi = 0; wi < this._meleeWeapons.length; wi++) {
                    if (!this._meleeWeapons[wi].equal(model._meleeWeapons[wi])) {
                        return false;
                    }
                }
                for (let wi = 0; wi < this._upgrades.length; wi++) {
                    if (!this._upgrades[wi].equal(model._upgrades[wi])) {
                        return false;
                    }
                }
                for (let wi = 0; wi < this._wargear.length; wi++) {
                    if (!this._wargear[wi].equal(model._wargear[wi])) {
                        return false;
                    }
                }

                return true;
            }
            return false;
        }

        nameAndGear(): string {
            let name = super.name();

            const gear = this.getDedupedWeaponsAndUpgrades();
            if (gear.length > 0) {
                name += ` (${gear.map(u => u.toString()).join(', ')})`;
            }
            return name;
        }

        getDedupedWeaponsAndUpgrades(): Upgrade[] {
            const deduped: Upgrade[] = [];
            for (const upgrade of [...this._rangedWeapons, ...this._meleeWeapons, ...this._upgrades]) {
                if (!deduped.some(e => upgrade.selectionName() === e.selectionName())) {
                    deduped.push(upgrade);
                }
            }
            return deduped;
        }

        normalize(): void {
            this._rangedWeapons.sort(CompareObj);
            this._meleeWeapons.sort(CompareObj);
            this._upgrades.sort(CompareObj);
            this._wargear.sort(CompareObj);

            this.normalizeUpgrades(this._rangedWeapons);
            this.normalizeUpgrades(this._meleeWeapons);
            this.normalizeUpgrades(this._upgrades);
            this.normalizeUpgrades(this._wargear);
        }

        normalizeUpgrades(upgrades: Upgrade[]) {
            for (let i = 0; i < (upgrades.length - 1); i++) {
                const upgrade = upgrades[i];
                if (upgrade._name === upgrades[i + 1]._name) {
                    upgrade._count += upgrades[i + 1]._count;
                    upgrade._cost.add(upgrades[i + 1]._cost);
                    upgrades.splice(i + 1, 1);
                    i--;
                }
            }
            for (let upgrade of upgrades) {
                if (this._count > 0 && upgrade._count % this._count == 0) {
                    upgrade._count /= this._count;
                    upgrade._cost._points /= this._count;
                }
            }
        }
    };

    export class Vehicle extends BaseModel {

        // Characteristics
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
        _move: string | number = 6;
        _ws: number = 5;
        _bs: number = 4;
        _str: number = 4;
        _toughness: number = 4;
        _wounds: number = 1;
        _initiative: number = 1;
        _attacks: number = 1;
        _leadership: number = 7;
        _cool: number = 7;
        _willpower: number = 7;
        _intelligence: number = 7;
        _save: string = "3+";
        _invuln: string = "-";
    };

    export class Unit extends BaseNote {

        _role: UnitRole = UnitRole.NONE;
        _keywords: Set<string> = new Set();

        _rules: Map<string, string> = new Map();

        _models: BaseModel[] = [];
        readonly _modelStats: BaseModel[] = [];
        _modelList: string[] = [];

        _rangedWeapons: RangedWeapon[] = [];
        _meleeWeapons: MeleeWeapon[] = [];
        _upgrades: Upgrade[] = [];
        _wargear: WargearItem[] = [];

        _reactions: Reaction[] = [];
        _gambits: Gambit[] = [];

        _points: number = 0;

        equal(unit: Unit | null): boolean {
            if (unit == null) return false;

            if ((unit._name === this._name) && (unit._role === this._role) &&
                (unit._models.length === this._models.length) &&
                (unit._modelStats.length === this._modelStats.length)) {

                for (let mi = 0; mi < this._models.length; mi++) {
                    if (!this._models[mi].equal(unit._models[mi])) {
                        return false;
                    }
                }

                for (let mi = 0; mi < this._modelStats.length; mi++) {
                    if (!this._modelStats[mi].equal(unit._modelStats[mi])) {
                        return false;
                    }
                }

                if (!_.isEqual(this._rules, unit._rules)) {
                    return false;
                }

                return true;
            }
            return false;
        }

        normalize(): void {
            // Sort force units by role, name and type
            this._models.sort(CompareModel);
            this._modelStats.sort(CompareObj);
            this._modelStats.sort(CompareModelTypes);

            for (let model of this._models) {
                model.normalize();
            }

            for (let i = 0; i < (this._models.length - 1); i++) {
                const model = this._models[i];

                if (model.nameAndGear() === this._models[i + 1].nameAndGear()) {
                    model._count++;
                    this._models.splice(i + 1, 1);
                    i--;
                }
            }

            for (let i = 0; i < (this._modelStats.length - 1); i++) {
                const model = this._modelStats[i];

                if (model.equal(this._modelStats[i + 1])) {
                    this._modelStats.splice(i + 1, 1);
                    i--;
                }
            }

            this._modelList = this._models.map(model => (model._count > 1 ? `${model._count}x ` : '') + model.nameAndGear());
        }

        rangedWeapons(): RangedWeapon[] {
            let allWeapons = this._models.map(m => m._rangedWeapons).reduce((acc, val) => acc.concat(val), []);
            allWeapons.push(...this._rangedWeapons);
            return allWeapons.sort(CompareObj).filter((weap, i, array) => weap.name() !== array[i - 1]?.name());
        }

        meleeWeapons(): MeleeWeapon[] {
            let allWeapons = this._models.map(m => m._meleeWeapons).reduce((acc, val) => acc.concat(val), []);
            allWeapons.push(...this._meleeWeapons);
            return allWeapons.sort(CompareObj).filter((weap, i, array) => weap.name() !== array[i - 1]?.name());
        }

        wargear(): WargearItem[] {
            let allGear = this._models.map(m => m._wargear).reduce((acc, val) => acc.concat(val), []);
            allGear.push(...this._wargear);
            return allGear.sort(CompareObj).filter((gear, i, array) => gear.name() !== array[i - 1]?.name());
        }

        reactions(): Reaction[] {
            let allReactions = this._models.map(m => m._reactions).reduce((acc, val) => acc.concat(val), []);
            allReactions.push(...this._reactions);
            return allReactions.sort(CompareObj).filter((reaction, i, array) => reaction.name() !== array[i - 1]?.name());
        }

        gambits(): Gambit[] {
            let allGambits = this._models.map(m => m._gambits).reduce((acc, val) => acc.concat(val), []);
            allGambits.push(...this._gambits);
            return allGambits.sort(CompareObj).filter((gambit, i, array) => gambit.name() !== array[i - 1]?.name());
        }

        upgrades(): Upgrade[] {
            let allUpgrades = this._models.map(m => m._upgrades).reduce((acc, val) => acc.concat(val), []);
            allUpgrades.push(...this._upgrades);
            return allUpgrades.sort(CompareObj).filter((upgrade, i, array) => upgrade.name() !== array[i - 1]?.name());
        }

        weaponRules(): string[] {
            const rangedRules = this.rangedWeapons().map(w => w.getSpecialRules()).reduce((acc, val) => acc.concat(val), []);
            const meleeRules = this.meleeWeapons().map(w => w.getSpecialRules()).reduce((acc, val) => acc.concat(val), []);
            return [...rangedRules, ...meleeRules].sort().filter((rule, i, rules) => rule !== rules[i - 1]);
        }
    }

    export class Force extends BaseNote {
        _catalog: string = "";
        _name: string = "Unknown";
        _faction: string = "Unknown";
        _factionRules: Map<string, string | null> = new Map();
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
        _freeformValues: { [key: string]: number } | undefined;

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

    export function CompareModelTypes(a: BaseModel, b: BaseModel): number {
        if (typeof (a) > typeof (b)) return 1;
        else if (typeof (a) == typeof (b)) return 0;
        return -1;
    }

    export function CreateRoster(doc: Document): Roster | null {
        if (doc) {
            let info = doc.querySelector("roster");
            if (info) {
                const roster = new Roster();

                const name = info.getAttributeNode("name")?.nodeValue;
                if (name) {
                    roster._name = name;
                }
                else {
                    roster._name = "Horus Heresy 3rd Edition Army Roster";
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
            if (which === "Point(s)") {
                costs._points += +value;
            } else {
                costs.addFreeformValue(which, +value);
            }
        }
        return costs;
    }

    function ParseForces(doc: XMLDocument, roster: Roster): void {
        // HH3 has a nested force structure:
        // roster > forces > force ("Crusade Force Organization Chart")
        //   > selections (Allegiance, Rite of War)
        //   > forces > force ("Crusade Primary Detachment", "Auxiliary - ...")
        //     > selections (units)

        let topLevelForces = doc.querySelectorAll("roster>forces>force");
        for (let topForce of topLevelForces) {
            if (!topForce.hasAttribute("name") || !topForce.hasAttribute("catalogueName")) continue;

            const catalogueName = topForce.getAttributeNode("catalogueName")?.nodeValue || "";

            // Extract rules from the top-level force
            const topLevelRules: Map<string, string | null> = new Map();
            const topRules = topForce.querySelectorAll(":scope>rules>rule");
            for (let rule of topRules) {
                ExtractRuleDescription(rule, topLevelRules);
            }

            // Extract Rite of War rules, gambits, reactions from top-level selections
            const topLevelReactions: Reaction[] = [];
            const topLevelGambits: Gambit[] = [];
            let topSelections = GetImmediateSelections(topForce);
            for (let selection of topSelections) {
                let selectionName = selection.getAttribute("name");
                let selectionType = selection.getAttribute("type");
                if (selectionType === 'upgrade') {
                    // Extract rules from upgrade selections (Allegiance, Rite of War)
                    ExtractRuleFromSelection(selection, topLevelRules);
                    // Also extract profiles (reactions, gambits) from nested selections
                    const allProfiles = Array.from(selection.querySelectorAll("profile"));
                    for (const profile of allProfiles) {
                        const typeName = profile.getAttribute("typeName")?.trim();
                        if (typeName === "Reaction") {
                            topLevelReactions.push(ParseReactionProfile(profile));
                        } else if (typeName === "Gambit:" || typeName === "Gambit") {
                            topLevelGambits.push(ParseGambitProfile(profile));
                        }
                    }
                }
            }

            // Get nested detachment forces
            const nestedForces = GetImmediateForces(topForce);

            if (nestedForces.length > 0) {
                // Process each nested detachment
                let isFirst = true;
                for (let nestedForce of nestedForces) {
                    let force = new Force();

                    let which = nestedForce.getAttributeNode("name")?.nodeValue;
                    let value = nestedForce.getAttributeNode("catalogueName")?.nodeValue;

                    if (which) {
                        force._name = which;
                    }
                    if (value) {
                        force._catalog = value;
                    }

                    // Add top-level rules to the first detachment only
                    if (isFirst && !DuplicateForce(force, roster)) {
                        for (const [k, v] of topLevelRules.entries()) {
                            force._rules.set(k, v);
                        }
                        isFirst = false;
                    }

                    // Get rules from the nested force itself
                    if (!DuplicateForce(force, roster)) {
                        const rules = GetImmediateRules(nestedForce);
                        for (let rule of rules) {
                            ExtractRuleDescription(rule, force._rules);
                        }
                    }

                    let selections = GetImmediateSelections(nestedForce);
                    for (let selection of selections) {
                        ParseSelection(selection, force);
                    }

                    // Attach top-level reactions and gambits to each unit in the first detachment
                    if (roster._forces.length === 0 && (topLevelReactions.length > 0 || topLevelGambits.length > 0)) {
                        for (let unit of force._units) {
                            unit._reactions.push(...topLevelReactions);
                            unit._gambits.push(...topLevelGambits);
                        }
                    }

                    // Sort force units by role.
                    force._units.sort((a: Unit, b: Unit): number => {
                        if (a._role > b._role) return 1;
                        else if (a._role == b._role) return 0;
                        return -1;
                    });

                    roster._forces.push(force);
                }
            } else {
                // No nested forces - treat as a flat force (like HH2)
                let force = new Force();

                let which = topForce.getAttributeNode("name")?.nodeValue;
                let value = topForce.getAttributeNode("catalogueName")?.nodeValue;

                if (which) {
                    force._name = which;
                }
                if (value) {
                    force._catalog = value;
                }

                if (!DuplicateForce(force, roster)) {
                    for (const [k, v] of topLevelRules.entries()) {
                        force._rules.set(k, v);
                    }
                }

                let selections = GetImmediateSelections(topForce);
                for (let selection of selections) {
                    ParseSelection(selection, force);
                }

                force._units.sort((a: Unit, b: Unit): number => {
                    if (a._role > b._role) return 1;
                    else if (a._role == b._role) return 0;
                    return -1;
                });

                roster._forces.push(force);
            }
        }
    }

    function ParseSelection(selection: Element, force: Force): void {
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) return;
        let selectionType = selection.getAttributeNode("type")?.nodeValue;
        if (!selectionType) return;

        if (selection.querySelector('profile[typeId="a76f-8e23-8c3e-166d"]') || // Profile (Infantry)
            selection.querySelector('profile[typeId="2a80-eec8-a736-2fe3"]')) {  // Vehicle
            const unit = CreateUnit(selection);
            if (unit) {
                force._units.push(unit);
                for (const entry of unit._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            }
        } else if (selectionType === 'upgrade') {
            ExtractRuleFromSelection(selection, force._rules);
        } else {
            console.log('** UNEXPECTED SELECTION **', selectionName, selectionType, selection);
        }
    }

    function ExtractRuleFromSelection(root: Element, map: Map<string, string | null>): void {
        const rules = root.querySelectorAll("rules>rule");
        for (const rule of rules) {
            ExtractRuleDescription(rule, map);
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
        if (root.parentElement && root.parentElement.parentElement) {
            const parentSelection = root.parentElement.parentElement;
            const countValue = parentSelection.getAttributeNode("number")?.nodeValue;
            if (countValue) {
                return +countValue;
            }
        }
        return 0;
    }

    function ParseRangedWeaponProfile(profile: Element): RangedWeapon {
        const weapon = new RangedWeapon();
        ExpandBaseNotes(profile, weapon);
        weapon._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            let charName = char.getAttribute("name");
            if (charName && char.textContent) {
                switch (charName) {
                    case 'R': weapon._range = char.textContent; break;
                    case 'FP': weapon._fp = char.textContent; break;
                    case 'RS': weapon._rs = char.textContent; break;
                    case 'AP': weapon._ap = char.textContent; break;
                    case 'D': weapon._damage = char.textContent; break;
                    case 'Special Rules': weapon._specialRules = char.textContent; break;
                    case 'Traits': weapon._traits = char.textContent; break;
                }
            }
        }
        const selection = profile.parentElement?.parentElement;
        const selectionName = selection?.getAttribute('name');
        if (selection?.getAttribute('type') === 'upgrade' && selectionName) {
            weapon._selectionName = selectionName;
            weapon._cost = GetSelectionCosts(selection);
        }
        return weapon;
    }

    function ParseMeleeWeaponProfile(profile: Element): MeleeWeapon {
        const weapon = new MeleeWeapon();
        ExpandBaseNotes(profile, weapon);
        weapon._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            let charName = char.getAttribute("name");
            if (charName && char.textContent) {
                switch (charName) {
                    case 'IM': weapon._im = char.textContent; break;
                    case 'AM': weapon._am = char.textContent; break;
                    case 'SM': weapon._sm = char.textContent; break;
                    case 'AP': weapon._ap = char.textContent; break;
                    case 'D': weapon._damage = char.textContent; break;
                    case 'Special Rules': weapon._specialRules = char.textContent; break;
                    case 'Traits': weapon._traits = char.textContent; break;
                }
            }
        }
        const selection = profile.parentElement?.parentElement;
        const selectionName = selection?.getAttribute('name');
        if (selection?.getAttribute('type') === 'upgrade' && selectionName) {
            weapon._selectionName = selectionName;
            weapon._cost = GetSelectionCosts(selection);
        }
        return weapon;
    }

    function ParseWargearProfile(profile: Element): WargearItem {
        const gear = new WargearItem();
        ExpandBaseNotes(profile, gear);
        gear._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            if (char.textContent) {
                let charName = char.getAttribute("name");
                if (charName) {
                    switch (charName) {
                        case 'Summary': gear._summary = char.textContent; break;
                        case 'Description': gear._description = char.textContent; break;
                    }
                }
            }
        }
        return gear;
    }

    function ParseReactionProfile(profile: Element): Reaction {
        const reaction = new Reaction();
        ExpandBaseNotes(profile, reaction);
        reaction._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            if (char.textContent) {
                let charName = char.getAttribute("name");
                if (charName) {
                    switch (charName) {
                        case 'Summary': reaction._summary = char.textContent; break;
                        case 'Trigger': reaction._trigger = char.textContent; break;
                        case 'Cost': reaction._reactionCost = char.textContent; break;
                        case 'Target': reaction._target = char.textContent; break;
                        case 'Process': reaction._process = char.textContent; break;
                    }
                }
            }
        }
        return reaction;
    }

    function ParseGambitProfile(profile: Element): Gambit {
        const gambit = new Gambit();
        ExpandBaseNotes(profile, gambit);
        gambit._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            if (char.textContent) {
                let charName = char.getAttribute("name");
                if (charName) {
                    switch (charName) {
                        case 'Summary': gambit._summary = char.textContent; break;
                        case 'Description': gambit._description = char.textContent; break;
                    }
                }
            }
        }
        return gambit;
    }

    function ParseTraitProfile(profile: Element): TraitItem {
        const trait = new TraitItem();
        ExpandBaseNotes(profile, trait);
        trait._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            if (char.textContent) {
                let charName = char.getAttribute("name");
                if (charName) {
                    switch (charName) {
                        case 'Description': trait._description = char.textContent; break;
                    }
                }
            }
        }
        return trait;
    }

    function ParseUpgradeProfile(profile: Element): Upgrade {
        const upgrade = new Upgrade();
        ExpandBaseNotes(profile, upgrade);
        upgrade._count = ExtractNumberFromParent(profile);

        let chars = profile.querySelectorAll("characteristics>characteristic");
        for (let char of chars) {
            if (char.textContent) {
                let charName = char.getAttribute("name");
                if (charName) {
                    switch (charName) {
                        case 'Description': upgrade._description = char.textContent; break;
                        case 'Text': upgrade._description = char.textContent; break;
                    }
                }
            }
        }
        return upgrade;
    }

    function DuplicateForce(force: Force, roster: Roster): boolean {
        if (!roster || !force) return false;

        for (let f of roster._forces) {
            if (f._catalog === force._catalog) return true;
        }
        return false;
    }

    // Known non-keyword category names
    const NON_KEYWORD_CATEGORIES = new Set([
        'Allegiance',
        'Army Configuration',
        'High Command',
        'Command',
        'Troops',
        'Elites',
        'Fast Attack',
        'Heavy Assault',
        'Recon',
        'Retinue',
        'Transport',
        'Heavy Transport',
        'War-engine',
        'Armour',
        'Rewards of Treachery',
        'Support',
        'Open Beta Release',
        'Illegal Units',
        // Model type categories
        'Infantry Model Type',
        'Vehicle Model Type',
        'Walker Model Type',
        'Cavalry Model Type',
        'Command Model Sub-type',
        'Sergeant Model Sub-Type',
        'Champion Model Sub-Type',
        'Heavy Model Sub-Type',
        'Transport Model Sub-Type',
        'Antigrav Model Sub-Type',
        'Malefic Sub-type',
    ]);

    function LookupRole(roleText: string): UnitRole {
        if (roleText.startsWith('Support')) return UnitRole.SUPPORT;
        if (roleText.startsWith('Recon')) return UnitRole.RECON;
        if (roleText.startsWith('Heavy Transport')) return UnitRole.HEAVY_TRANSPORT;
        if (roleText.startsWith('War-engine')) return UnitRole.WAR_ENGINE;

        switch (roleText) {
            case 'High Command': return UnitRole.HIGH_COMMAND;
            case 'Command': return UnitRole.COMMAND;
            case 'Troops': return UnitRole.TROOPS;
            case 'Elites': return UnitRole.ELITES;
            case 'Fast Attack': return UnitRole.FAST_ATTACK;
            case 'Heavy Assault': return UnitRole.HEAVY_ASSAULT;
            case 'Retinue': return UnitRole.RETINUE;
            case 'Transport': return UnitRole.TRANSPORT;
            case 'Armour': return UnitRole.ARMOUR;
            case 'Rewards of Treachery': return UnitRole.REWARDS_OF_TREACHERY;
        }
        return UnitRole.NONE;
    }

    function InternalKeyword(kw: string): boolean {
        if (NON_KEYWORD_CATEGORIES.has(kw)) return true;
        // Also filter out categories that start with known role prefixes with variants
        if (kw.startsWith('Support -')) return true;
        if (kw.startsWith('Recon -')) return true;
        if (kw.startsWith('Heavy Transport -')) return true;
        if (kw.startsWith('War-engine -')) return true;
        // Filter out Prime-prefixed categories
        if (kw.startsWith('Prime ')) return true;
        // Filter out EotL categories
        if (kw.startsWith('EotL -')) return true;
        // Filter out categories ending with common suffixes
        if (kw.endsWith('Only')) return true;
        if (kw.startsWith('+')) return true;
        if (kw.startsWith('Free ')) return true;
        if (kw.startsWith('No default')) return true;
        if (kw.startsWith('Officer of')) return true;
        if (kw.startsWith('has ')) return true;
        return false;
    }

    function CreateUnit(root: Element): Unit | null {
        let unit: Unit = new Unit();
        const unitName = ExpandBaseNotes(root, unit);

        // Categories
        let categories = root.querySelectorAll("categories>category");
        for (let cat of categories) {
            const catName = cat.getAttributeNode("name")?.nodeValue;
            if (catName) {
                const roleText = catName.trim();
                let unitRole = LookupRole(roleText);
                if (unitRole != UnitRole.NONE) {
                    unit._role = unitRole;
                }
                else {
                    if (!InternalKeyword(catName)) {
                        unit._keywords.add(catName);
                    }
                }
            }
        }

        const seenProfiles: Element[] = [];

        // First, find model stats. These have typeName="Profile" or "Vehicle".
        const modelStatsProfiles = Array.from(root.querySelectorAll('profile[typeId="a76f-8e23-8c3e-166d"],profile[typeId="2a80-eec8-a736-2fe3"]'));
        ParseModelStatsProfiles(modelStatsProfiles, unit, unitName);
        seenProfiles.push(...modelStatsProfiles);

        // Next, look for selections with models.
        const modelSelections = [];
        if (root.getAttribute('type') === 'model') {
            modelSelections.push(root);  // Single-model unit.
        } else {
            const immediateSelections = GetImmediateSelections(root);
            for (const selection of immediateSelections) {
                if (selection.getAttribute('type') === 'model' || HasImmediateProfileWithTypeName(selection, 'Profile') ||
                    HasImmediateProfileWithTypeName(selection, 'Vehicle')) {
                    modelSelections.push(selection);
                }
            }
            if (modelSelections.length === 0) {
                modelSelections.push(...Array.from(root.querySelectorAll('selection[type="model"]')));
            }
            if (modelSelections.length === 0 && (HasImmediateProfileWithTypeName(root, 'Profile') ||
                HasImmediateProfileWithTypeName(root, 'Vehicle'))) {
                modelSelections.push(root);
            }
        }

        // Now, parse each model selection
        for (const modelSelection of modelSelections) {
            const profiles = Array.from(modelSelection.querySelectorAll("profiles>profile"));
            const unseenProfiles = profiles.filter((e: Element) => !seenProfiles.includes(e));
            seenProfiles.push(...unseenProfiles);

            const model = new Model();
            model._name = modelSelection.getAttribute('name') || 'Unknown Model';
            model._count = Number(modelSelection.getAttribute("number") || 1);
            unit._models.push(model);

            ParseProfiles(profiles, model);

            for (const upgradeSelection of modelSelection.querySelectorAll('selections>selection[type="upgrade"]')) {
                let upgradeName = upgradeSelection.getAttribute('name');
                if (upgradeName) {
                    const upgrade = new Upgrade();
                    upgrade._name = upgradeName;
                    upgrade._cost = GetSelectionCosts(upgradeSelection);
                    upgrade._count = Number(upgradeSelection.getAttribute('number'));
                    model._upgrades.push(upgrade);
                }
            }
        }

        // Find unit upgrades
        let upgrades = root.querySelectorAll('selections>selection[type="upgrade"]');
        for (const upgradeSelection of upgrades) {
            const profiles = Array.from(upgradeSelection.querySelectorAll("profiles>profile"));
            ParseProfiles(profiles, unit);

            const upgradeName = upgradeSelection.getAttribute('name');
            if (upgradeName) {
                const upgrade = new Upgrade();
                upgrade._name = upgradeName;
                upgrade._cost = GetSelectionCosts(upgradeSelection);
                upgrade._count = Number(upgradeSelection.getAttribute('number'));
                unit._upgrades.push(upgrade);
            }
        }

        // Only match costs associated with the unit itself
        let costs = root.querySelectorAll("costs>cost");
        for (let cost of costs) {
            if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                let which = cost.getAttributeNode("name")?.nodeValue;
                let value = cost.getAttributeNode("value")?.nodeValue;
                if (value) {
                    if (which == "Point(s)") {
                        unit._points += +value;
                    }
                }
            }
        }

        let rules = root.querySelectorAll("rules>rule");
        for (let rule of rules) {
            ExtractRuleDescription(rule, unit._rules);
        }

        unit.normalize();

        return unit;
    }

    function ConvertToInches(value: string | number): string {
        if (IsNumber(value)) {
            return value.toString() + "\"";
        }
        return value.toString();
    }

    function IsNumber(value: string | number): boolean {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    function CompareObj(a: { _name: string; }, b: { _name: string; }): number {
        return Compare(a._name, b._name);
    }

    function CompareModel(a: BaseModel, b: BaseModel): number {
        if (a._name === b._name) {
            return Compare(a.nameAndGear(), b.nameAndGear());
        } else {
            return Compare(a._name, b._name);
        }
    }

    function GetSelectionCosts(selection: Element): Costs {
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

    function ParseModelStatsProfiles(profiles: Element[], unit: Unit, unitName: string) {
        for (const profile of profiles) {
            const profileName = profile.getAttribute("name");
            const profileType = profile.getAttribute("typeName");
            if (!profileName || !profileType) return;

            if (profileType.trim() === "Profile") {
                const model = new Model();
                model._name = profileName;
                unit._modelStats.push(model);

                ExpandBaseNotes(profile, model);

                const chars = profile.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttribute("name");
                    if (!charName) continue;

                    if (char.textContent) {
                        switch (charName) {
                            case 'Type': model._type = char.textContent; break;
                            case 'M': model._move = ConvertToInches(char.textContent); break;
                            case 'WS': model._ws = +char.textContent; break;
                            case 'BS': model._bs = +char.textContent; break;
                            case 'S': model._str = +char.textContent; break;
                            case 'T': model._toughness = +char.textContent; break;
                            case 'W': model._wounds = +char.textContent; break;
                            case 'I': model._initiative = +char.textContent; break;
                            case 'A': model._attacks = +char.textContent; break;
                            case 'LD': model._leadership = +char.textContent; break;
                            case 'CL': model._cool = +char.textContent; break;
                            case 'WP': model._willpower = +char.textContent; break;
                            case 'IN': model._intelligence = +char.textContent; break;
                            case 'SAV': model._save = char.textContent; break;
                            case 'INV': model._invuln = char.textContent; break;
                        }
                    }
                }
            }
            else if (profileType.trim() === "Vehicle") {
                let vehicle = new Vehicle();
                vehicle._name = profileName;

                unit._modelStats.push(vehicle);

                ExpandBaseNotes(profile, vehicle);

                const chars = profile.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttributeNode("name")?.nodeValue;
                    if (!charName) continue;

                    if (char.textContent) {
                        switch (charName) {
                            case 'Type': vehicle._type = char.textContent; break;
                            case 'M': vehicle._move = ConvertToInches(char.textContent); break;
                            case 'BS': vehicle._bs = +char.textContent; break;
                            case 'Front Armour': vehicle._front = +char.textContent; break;
                            case 'Side Armour': vehicle._side = +char.textContent; break;
                            case 'Rear Armour': vehicle._rear = +char.textContent; break;
                            case 'HP': vehicle._hp = +char.textContent; break;
                            case 'Transport Capacity': vehicle._capacity = char.textContent; break;
                            case 'Access Points': vehicle._accessPoints = char.textContent; break;
                        }
                    }
                }
            }
        }
    }

    function ParseProfiles(profiles: Element[], owner: Model | Unit) {
        for (const profile of profiles) {
            const profileName = profile.getAttribute("name");
            let typeName = profile.getAttribute("typeName");
            if (!profileName || !typeName) continue;

            typeName = typeName.trim();
            if ((typeName === "Profile") || (typeName === "Vehicle") ||
                (profile.getAttribute("type") === "model")) {
                // Do nothing; these were already handled.
            } else if (typeName === "Ranged Weapon") {
                const weapon = ParseRangedWeaponProfile(profile);
                owner._rangedWeapons.push(weapon);
            } else if (typeName === "Melee Weapon") {
                const weapon = ParseMeleeWeaponProfile(profile);
                owner._meleeWeapons.push(weapon);
            } else if (typeName === "Wargear") {
                const gear = ParseWargearProfile(profile);
                owner._wargear.push(gear);
            } else if (typeName === "Reaction") {
                const reaction = ParseReactionProfile(profile);
                owner._reactions.push(reaction);
            } else if (typeName === "Gambit:" || typeName === "Gambit") {
                const gambit = ParseGambitProfile(profile);
                owner._gambits.push(gambit);
            } else if (typeName === "Traits") {
                // Traits profiles - often empty description, skip for now
            } else {
                console.log("Unhandled model/unit profile " + profileName + " of type " + typeName + ".");
            }
        }
    }

    function ExtractRuleDescription(rule: Element, map: Map<string, string | null>): void {
        const ruleName = rule.getAttribute("name");
        const desc = rule.querySelector("description");
        if (ruleName && desc?.textContent) {
            map.set(ruleName, desc.textContent);
        }
    }

    function GetImmediateSelections(root: Element): Element[] {
        const selections = [];
        for (const child of root.children) {
            if (child.tagName === 'selections') {
                for (const subChild of child.children) {
                    if (subChild.tagName === 'selection') {
                        selections.push(subChild);
                    }
                }
            }
        }
        return selections;
    }

    function GetImmediateForces(root: Element): Element[] {
        const forces = [];
        for (const child of root.children) {
            if (child.tagName === 'forces') {
                for (const subChild of child.children) {
                    if (subChild.tagName === 'force') {
                        forces.push(subChild);
                    }
                }
            }
        }
        return forces;
    }

    function GetImmediateRules(root: Element): Element[] {
        const rules = [];
        for (const child of root.children) {
            if (child.tagName === 'rules') {
                for (const subChild of child.children) {
                    if (subChild.tagName === 'rule') {
                        rules.push(subChild);
                    }
                }
            }
        }
        return rules;
    }

    function HasImmediateProfileWithTypeName(root: Element, typeName: string): boolean {
        for (const child of root.children) {
            if (child.tagName === 'profiles') {
                for (const subChild of child.children) {
                    if (subChild.tagName === 'profile' && subChild.getAttribute('typeName')?.trim() === typeName) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

} // namespace HorusHeresy3
