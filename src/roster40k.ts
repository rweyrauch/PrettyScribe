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
    _selectionName: string = "";

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
    NF,
    SCD,

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
    'No Force Org Slot',
    'Supreme Command Detachment',

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
            const weaponNamesWithoutCount: string[] = [];
            const weaponNames: string[] = [];
            for (const weapon of this._weapons) {
                let wName = weapon._selectionName || weapon.name();
                weaponNamesWithoutCount.push(wName);
                if (weapon._count > 1) {
                    wName = `${weapon._count}x ${wName}`;
                }
                if (weaponNames.includes(wName)) continue;
                weaponNames.push(wName);
            }
            weaponNames.push(...this._upgrades.filter(e => !weaponNamesWithoutCount.includes(e)));
            name += ` (${weaponNames.join(', ')})`;
        }
        return name;
    }

    normalize(): void {
        this._weapons.sort(CompareWeapon);
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
    _modelStats: Model[] = [];
    _modelList: string[] = [];
    _weapons: Weapon[] = [];
    _spells: PsychicPower[] = [];
    _psykers: Psyker[] = [];
    _explosions: Explosion[] = [];

    _points: number = 0;
    _powerLevel: number = 0;
    _commandPoints: number = 0;

    _woundTracker: WoundTracker[] = [];

    _profileTables: Map<string, ProfileTable> = new Map();

    _id: number = 0;

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
        this._models.sort(CompareModel);
        this._modelStats.sort(CompareObj);

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

        for (let i = 0; i < (this._modelStats.length - 1); i++) {
            const model = this._modelStats[i];

            if (model.equal(this._modelStats[i+1])) {
                this._modelStats.splice(i+1, 1);
                i--;
            }
        }

        this._modelList = this._models.map(model => (model._count > 1 ? `${model._count}x ` : '') + model.nameAndGear());
        this._weapons = this._models.map(m => m._weapons)
            .reduce((acc, val) => acc.concat(val), [])
            .sort(CompareWeapon)
            .filter((weap, i, array) => weap.name() !== array[i - 1]?.name());

        this._spells = this._models.map(m => m._psychicPowers).reduce((acc, val) => acc.concat(val), []);
        this._psykers = this._models.map(m => m._psyker).filter(p => p) as Psyker[];
        this._explosions = this._models.map(m => m._explosions).reduce((acc, val) => acc.concat(val), []);

    }
}

export class Force extends BaseNotes {
    _catalog: string = "";
    _faction: string = "Unknown";
    _factionRules: Map<string, string | null> = new Map();
    _configurations: string[] = [];
    _rules: Map<string, string | null> = new Map();
    _units: Unit[] = [];
}

export class Roster40k extends BaseNotes {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;
    _forces: Force[] = [];
}

export class Costs {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;

    hasValues() {
        return this._powerLevel !== 0 || this._commandPoints !== 0 || this._points !== 0;
    }

    add(other: Costs) {
        this._powerLevel += other._powerLevel;
        this._commandPoints += other._commandPoints;
        this._points += other._points;
    }
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
                    ExtractRuleDescription(rule, f._rules);
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
            // Ignore Detachment Command cost
        } else if (selectionName === 'Battle Size') {
            ParseConfiguration(selection, force);
        } else {
            let unit = ParseUnit(selection, is40k);
            if (unit && unit._role != UnitRole.NONE) {
                force._units.push(unit);
                for (const entry of unit._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            }
            else if (selection.getAttribute("type") === "upgrade") {
              ExtractRuleFromSelection(selection, force._rules);
              ParseConfiguration(selection, force);
              const props = selection.querySelectorAll("selections>selection");
              for (let prop of props) {
                  // sub-faction
                  const name = prop.getAttribute("name");
                  if (name && prop.getAttribute("type") === "upgrade") {
                      if (force._faction === "Unknown") {
                          // pick the first upgrade we see
                          force._faction = name;
                      }
                      ExtractRuleFromSelection(prop, force._factionRules);
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

function ParseConfiguration(selection: Element, force: Force) {
    const name = selection.getAttribute("name");
    if (!name) {
        return;
    }
    const category = selection.querySelector("category")?.getAttribute('name');
    const subSelections = selection.querySelectorAll('selections>selection');
    const details = [];
    let costs = new Costs();
    for (const sel of subSelections) {
        details.push(sel.getAttribute("name"));
        costs.add(GetSelectionCosts(sel));
    }

    let configuration = (!category || category === 'Configuration')
        ? name : `${category} - ${name}`;
    if (details.length > 0) configuration += `: ${details.join(", ")}`;
    if (costs._commandPoints !== 0) configuration += ` [${costs._commandPoints} CP]`;

    force._configurations.push(configuration);
}

function DuplicateForce(force: Force, roster: Roster40k): boolean {
    if (!roster || !force) return false;

     for (let f of roster._forces) {
        if (f._catalog === force._catalog) return true;
    }
    return false;
}

function ExtractRuleFromSelection(root: Element, map: Map<string, string | null>): void {

    const profiles = root.querySelectorAll("profiles>profile");
    for (const profile of profiles) {
        // detachment rules
        const profileName = profile.getAttribute("name");
        const profileType = profile.getAttribute("typeName");
        console.log("Profile name:" + profileName + "  Type: " + profileType);

        if (profileName && profileType) {
            if (profileType === "Abilities" || profileType === "Dynastic Code") {
                const chars = profile.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttribute("name");
                    if (charName && char.textContent && profileName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            map.set(profileName, char.textContent);
                        }
                    }
                }
            }
        }
    }

    const rules = root.querySelectorAll("rules>rule");
    for (const rule of rules) {
        ExtractRuleDescription(rule, map);
    }
}

function ExtractRuleDescription(rule: Element, map: Map<string, string | null>): void {
    const ruleName = rule.getAttribute("name");
    const desc = rule.querySelector("description");
    if (ruleName && desc?.textContent) {
        map.set(ruleName, desc.textContent);
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
        case 'No Force Org Slot': return UnitRole.NF;
        case 'Primarch | Daemon Primarch | Supreme Commander': return UnitRole.SCD;
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

function GetImmediateSelections(root: Element): Element[] {
    // querySelectorAll(':scope > tagname') doesn't work with jsdom, so we hack
    // around it: https://github.com/jsdom/jsdom/issues/2998
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

function HasImmediateProfileWithTypeName(root: Element, typeName: string): boolean {
    // querySelectorAll(':scope > tagname') doesn't work with jsdom, so we hack
    // around it: https://github.com/jsdom/jsdom/issues/2998
    for (const child of root.children) {
        if (child.tagName === 'profiles') {
            for (const subChild of child.children) {
                if (subChild.tagName === 'profile' && subChild.getAttribute('typeName') === typeName) {
                    return true;
                }
            }
        }
    }
    return false;
}

function GetSelectionCosts(selection: Element): Costs {
    // querySelectorAll(':scope > tagname') doesn't work with jsdom, so we hack
    // around it: https://github.com/jsdom/jsdom/issues/2998

    const costs = new Costs()
    for (const child of selection.children) {
        if (child.tagName === 'costs') {
            for (const subChild of child.children) {
                const name = subChild.getAttribute('name');
                const value = Number(subChild.getAttribute('value'));
                if (value && value !== 0) {
                    switch (name) {
                        case 'CP':
                            costs._commandPoints += +value;
                            break;
                        case ' PL':
                            costs._powerLevel += +value;
                            break;
                        case 'pts':
                            costs._points += +value;
                            break;
                    }
                }
            }
        }
    }
    return costs;
}

function ParseUnit(root: Element, is40k: boolean): Unit | null {
    let unit: Unit = new Unit();
    const unitName = ExpandBaseNotes(root, unit);

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

    const seenProfiles: Element[] = [];

    // First, find model stats. These have typeName=Unit.
    const modelStatsProfiles = Array.from(root.querySelectorAll('profile[typeName="Unit"],profile[typeName="Model"]'));
    ParseModelStatsProfiles(modelStatsProfiles, unit, unitName);
    seenProfiles.push(...modelStatsProfiles);

    // Next, look for selections with models. These usually have type="model",
    // but may have type="upgrade" containing a profile of type="Unit".
    const modelSelections = [];
    if (root.getAttribute('type') === 'model') {
        modelSelections.push(root);  // Single-model unit.
    } else {
        const immediateSelections = GetImmediateSelections(root);
        for (const selection of immediateSelections) {
            if (selection.getAttribute('type') === 'model' || HasImmediateProfileWithTypeName(selection, 'Unit')) {
                modelSelections.push(selection);
            }
        }
        // Some units are under a root selection with type="upgrade".
        if (modelSelections.length === 0) {
            modelSelections.push(...Array.from(root.querySelectorAll('selection[type="model"]')));
        }
        // Some single-model units have type="unit" or type="upgrade".
        if (modelSelections.length === 0 && HasImmediateProfileWithTypeName(root, 'Unit')) {
            modelSelections.push(root);
        }
    }
    for (const modelSelection of modelSelections) {
        const profiles = Array.from(modelSelection.querySelectorAll("profiles>profile"));
        const unseenProfiles = profiles.filter((e: Element) => !seenProfiles.includes(e));
        seenProfiles.push(...unseenProfiles);

        const model = new Model();
        model._name = modelSelection.getAttribute('name') || 'Unknown Model';
        model._count = Number(modelSelection.getAttribute("number") || 1);
        unit._models.push(model);
        ParseModelProfiles(profiles, model, unit);

        // Find all upgrades on the model. This may include weapons that were
        // parsed from profiles (above), so dedupe those in nameAndGear().
        for (const upgradeSelection of modelSelection.querySelectorAll('selections>selection[type="upgrade"]')) {
            // Ignore this selection if it has sub-selection upgrades within it,
            // since those will be picked up individually.
            if (upgradeSelection.querySelector('selections>selection[type="upgrade"]')) continue;

            let upgradeName = upgradeSelection.getAttribute('name');
            if (upgradeName) {
                const costs = GetSelectionCosts(upgradeSelection);
                if (costs._commandPoints !== 0) {
                    upgradeName += ` [${costs._commandPoints} CP]`;
                }
                model._upgrades.push(upgradeName);
            }
        }
    }

    // Next, look for upgrades on the unit itself which don't have a profile with costs
    const immediateSelections = GetImmediateSelections(root);
    for (const selection of immediateSelections) {
        if (selection.getAttribute('type') === 'upgrade' || HasImmediateProfileWithTypeName(selection, 'Abilities')) {
            let upgradeCosts = GetSelectionCosts(selection)
            if (upgradeCosts.hasValues())
            {
                unit._points += upgradeCosts._points;
                unit._commandPoints += upgradeCosts._commandPoints;
                unit._powerLevel += upgradeCosts._powerLevel;
            }
        }
    }

    // Finally, look for profiles that are not under models. They may apply to
    //    a) model loadouts, if it's selection with a Weapon (eg Immortals)
    //    b) unit loadout, if it's a selection with an Ability (eg Bomb Squigs)
    //    c) abilities for the unit, if it's not under a child selection
    let profiles = Array.from(root.querySelectorAll("profiles>profile"));
    let unseenProfiles = profiles.filter((e: Element) => !seenProfiles.includes(e));
    seenProfiles.push(...unseenProfiles);
    if (unseenProfiles.length > 0) {
        const unitUpgradesModel = new Model();
        unitUpgradesModel._name = 'Unit Upgrades';
        ParseModelProfiles(unseenProfiles, unitUpgradesModel, unit);
        if (unitUpgradesModel._weapons.length > 0 && unit._models.length > 0) {
            for (const model of unit._models) {
                model._weapons.push(...unitUpgradesModel._weapons);
            }
            unitUpgradesModel._weapons.length = 0;  // Clear the array.
        }
        if (unitUpgradesModel._weapons.length > 0 || unitUpgradesModel._upgrades.length > 0 || unitUpgradesModel._psychicPowers.length > 0 || unitUpgradesModel._psyker || unitUpgradesModel._explosions.length > 0) {
            unit._models.push(unitUpgradesModel);
        }
    }

    // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
    let costs = root.querySelectorAll("costs>cost");
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

    let rules = root.querySelectorAll("rules > rule");
    for (let rule of rules) {
        ExtractRuleDescription(rule, unit._rules);
    }

    unit.normalize();
    return unit;
}

function ParseModelStatsProfiles(profiles: Element[], unit: Unit, unitName: string) {
    for (const profile of profiles) {
        const profileName = profile.getAttribute("name");
        const profileType = profile.getAttribute("typeName");
        if (!profileName || !profileType) return;

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
    }
}

function ParseModelProfiles(profiles: Element[], model: Model, unit: Unit) {
    for (const profile of profiles) {
        const profileName = profile.getAttribute("name");
        const typeName = profile.getAttribute("typeName");
        if (!profileName || !typeName) continue;

        if ((typeName === "Unit") || (typeName === "Model") || (profile.getAttribute("type") === "model")) {
            // Do nothing; these were already handled.
        } else if ((typeName === "upgrade")) {
            model._upgrades.push(profileName);
        } else if ((typeName === "Abilities") || (typeName === "Wargear") || (typeName === "Ability") ||
            (typeName === "Household Tradition") || (typeName === "Warlord Trait") || (typeName === "Astra Militarum Orders") ||
            (typeName === "Tank Orders") || (typeName == "Lethal Ambush")) {
                ParseAbilityProfile(profile, profileName, unit);
        } else if (typeName === "Weapon") {
            const weapon = ParseWeaponProfile(profile);
            model._weapons.push(weapon);
        } else if (typeName.includes("Wound Track") || typeName.includes("Stat Damage") || typeName.includes(" Wounds")) {
            const tracker = ParseWoundTrackerProfile(profile);
            unit._woundTracker.push(tracker);
        } else if (typeName == "Transport") {
            ParseTransportProfile(profile, unit);
        } else if (typeName == "Psychic Power") {
            const power = ParsePsychicPowerProfile(profile);
            model._psychicPowers.push(power);
        } else if (typeName.includes("Explosion")) {
            const explosion = ParseExplosionProfile(profile);
            model._explosions.push(explosion);
        } else if (typeName == "Psyker") {
            const psyker = ParsePsykerProfile(profile);
            model._psyker = psyker;
        } else if (profile.parentElement?.parentElement
            && profile.parentElement?.parentElement.getAttribute("type") === 'upgrade') {
            ParseAbilityProfile(profile, profileName, unit);
        } else {
            parseUnknownProfile(profile, unit);
        }
    }
}

function ParseAbilityProfile(profile: Element, profileName: string, unit: Unit) {
    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            if ((charName === "Description") || (charName === "Ability") || (charName === "Effect") || (charName === "Bonus")) {
                unit._abilities.set(profileName, char.textContent);
            }
        }
    }
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
                    case 'S': weapon._str = char.textContent; break;
                    case 'AP': weapon._ap = char.textContent; break;
                    case 'D': weapon._damage = char.textContent; break;
                    case 'Abilities': weapon._abilities = char.textContent; break;
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
    }
    return weapon;
}

function ParseWoundTrackerProfile(profile: Element): WoundTracker {
    let tracker = new WoundTracker();
    ExpandBaseNotes(profile, tracker);
    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        const charName = char.getAttribute("name");
        if (charName) {
            if (char.textContent) {
                tracker._table.set(charName, char.textContent);
            } else {
                tracker._table.set(charName, "-");
            }
        }
    }
    return tracker;
}

function ParseTransportProfile(profile: Element, unit: Unit) {
    let chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        let charName = char.getAttribute("name");
        if (charName && char.textContent) {
            if (charName === "Capacity") {
                unit._abilities.set('Transport', char.textContent);
            }
        }
    }
}

function ParsePsychicPowerProfile(profile: Element): PsychicPower {
    const power: PsychicPower = new PsychicPower();
    ExpandBaseNotes(profile, power);

    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (let char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            switch (charName) {
                case 'Range': power._range = char.textContent; break;
                case 'Warp Charge': power._manifest = +char.textContent; break;
                case 'Details': power._details = char.textContent; break;
            }
        }
    }
    return power;
}

function ParseExplosionProfile(profile: Element) {
    const explosion: Explosion = new Explosion();
    ExpandBaseNotes(profile, explosion);

    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            switch (charName) {
                case 'Dice Roll': explosion._diceRoll = char.textContent; break;
                case 'Distance': explosion._distance = char.textContent; break;
                case 'Mortal Wounds': explosion._mortalWounds = char.textContent; break;
            }
        }
    }
    return explosion;
}

function ParsePsykerProfile(profile: Element): Psyker {
    const psyker: Psyker = new Psyker();
    ExpandBaseNotes(profile, psyker);

    const chars = profile.querySelectorAll("characteristics>characteristic");
    for (const char of chars) {
        const charName = char.getAttribute("name");
        if (charName && char.textContent) {
            switch (charName) {
                case 'Cast': psyker._cast = char.textContent; break;
                case 'Deny': psyker._deny = char.textContent; break;
                case 'Powers Known': psyker._powers = char.textContent; break;
                case 'Other': psyker._other = char.textContent; break;
            }
        }
    }
    return psyker;
}

function CompareObj(a: { _name: string; }, b: { _name: string; }): number {
    return Compare(a._name, b._name);
}

function CompareModel(a: Model, b: Model): number {
    return Compare(a._name, b._name) || Compare(a.nameAndGear(), b.nameAndGear());
}

export function CompareWeapon(a: Weapon, b: Weapon): number {
    const aType = a._type.startsWith('Grenade') ? 2 : a._type.startsWith('Melee') ? 1 : 0;
    const bType = b._type.startsWith('Grenade') ? 2 : b._type.startsWith('Melee') ? 1 : 0;
    return (aType - bType) || a.name().localeCompare(b.name());
}


export function Compare(a: string, b: string): number {
    if (a > b) return 1;
    else if (a == b) return 0;
    return -1;
}
