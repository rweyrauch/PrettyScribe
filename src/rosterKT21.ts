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

export class BaseNotes {
    _name: string = "";
    _customName: string = "";
    _customNotes: string = "";
    _costs: string = "0";

    name(): string {
        if (this._customName) return this._customName;
        return this._name;
    }

    nameAndCosts(): string {
        let name = this._name;
        if (this._customName) name = this._customName;
        if (this.costs() > 0) name += ' (' + this.costs() + ' EP)';
        return name;
    }

    notes(): string | null {
        return this._customNotes;
    }

    costs(): number {
        return Math.floor(+this._costs);
    }

    equal(other: BaseNotes | null): boolean {
        if (other == null) return false;
        // Weapons in KT21 have unique names
        return (this._name === other._name);
    }
}

export class Weapons extends BaseNotes {
    _count: number = 0;
    _attacks: string = "0";
    _skill: string = "0+";
    _damage: string = "0/0";
    _rules: string = "";
    _criticalEffects: string = "";
}

export class UniqueActions extends BaseNotes {
    _description: string = "";
}

export class PsychicPower extends BaseNotes {
    _effect: string = "";
    _weapons: Weapons[] = [];
}

export class PsychicPowerWeapon extends Weapons {
}

export enum Specialism {
    NONE,

    // Kill Team 21
    COMBAT,
    STAUNCH,
    MARKSMAN,
    SCOUT,
}

export const OperativeRoleToString: string[] = [
    'None',

    // Kill Team
    'Combat',
    'Staunch',
    'Marksman',
    'Scout'
];

export class Operative extends BaseNotes {

    // TODO could be a set of possible specialisms
    _role: Specialism = Specialism.NONE;
    _model: string = "";
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();

    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    // Characteristics
    _move: string = "0\"";
    _apl: string = "0";
    _groupActivations: string = "0";
    _defence: number = 0;
    _saves: string = "0+";
    _wounds: number = 0;

    _weapons: Weapons[] = [];
    _upgrades: string[] = [];
    _psychicPowers: PsychicPower[] = [];
    _psychicPowersWeapon: PsychicPowerWeapon[] = [];

    equal(operative: Operative | null): boolean {
        if (operative == null) return false;

        if ((operative._name === this._name) && (operative._role === this._role) &&
            (operative._weapons.length === this._weapons.length)) {

            for (let mi = 0; mi < this._weapons.length; mi++) {
                if (!this._weapons[mi].equal(operative._weapons[mi])) {
                    return false;
                }
            }

            if (!_.isEqual(this._abilities, operative._abilities)) {
                return false;
            } else if (!_.isEqual(this._rules, operative._rules)) {
                return false;
            }

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
            if (weapon._name === this._weapons[i + 1]._name) {
                weapon._count++;
                this._weapons.splice(i + 1, 1);
                i--;
            }
        }
    }
}

export class Force extends BaseNotes {
    _catalog: string = "";
    _faction: string = "Unknown";
    _factionRules: Map<string, string | null> = new Map();
    _rules: Map<string, string | null> = new Map();
    _leader: Operative | null = null;
    _operatives: Operative[] = [];
}

export class RosterKT21 extends BaseNotes {
    _equipmentPoints: number = 0;
    _forces: Force[] = [];
}

export function CreateKT21Roster(doc: Document): RosterKT21 | null {
    if (doc) {
        // Determine roster type (game system).
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterKT21();

            const name = info.getAttributeNode("name")?.nodeValue;
            if (name) {
                roster._name = name;
            } else {
                roster._name = "Kill Team (2021) Army Roster";
            }

            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);

            return roster;
        }
    }
    return null;
}

function ParseRosterPoints(doc: XMLDocument, roster: RosterKT21): void {
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (value) {
                if (which == " EP") {
                    roster._equipmentPoints = +value;
                }
            }
        }
    }
}

function ParseForces(doc: XMLDocument, roster: RosterKT21): void {
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
                f._faction = value;
            }

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

            ParseSelections(root, f);

            roster._forces.push(f);
        }
    }
}

function ParseSelections(root: Element, force: Force): void {
    let selections = root.querySelectorAll("force>selections>selection");

    for (let selection of selections) {
        // What kind of selection is this
        let selectionName = selection.getAttributeNode("name")?.nodeValue;
        if (!selectionName) continue;
        if (selectionName === "Game Type") continue;

        if (selectionName.includes("Detachment Command Cost")) {
            console.log("Found Detachment Command Cost");
        } else {
            let operative = ParseOperative(selection);
            if (operative) {
                if (operative._keywords.has("Leader")) {
                    force._leader = operative;
                } else {
                    force._operatives.push(operative);
                }
                for (const entry of operative._rules.entries()) {
                    force._rules.set(entry[0], entry[1]);
                }
            } else if (selection.getAttribute("type") === "upgrade") {
                ExtractRuleFromSelection(selection, force._rules);
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

    // Sort force operatives by role and name
    force._operatives.sort((a: Operative, b: Operative): number => {
        if (a._role > b._role) return 1;
        else if (a._role == b._role) {
            if (a._name > b._name) return 1;
            else if (a._name == b._name) return 0;
            return -1;
        }
        return -1;
    });
}

function DuplicateForce(force: Force, roster: RosterKT21): boolean {
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
            if (propType === "Abilities" || propType === "Dynastic Code") {
                const chars = prop.querySelectorAll("characteristics>characteristic");
                for (const char of chars) {
                    const charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability") || (charName == "Effect")) {
                            map.set(propName, char.textContent);
                        }
                    }
                }
            } else if (propType === "Weapons") {
                const rules = root.querySelectorAll("rules>rule");
                for (const rule of rules) {
                    if (rule.getAttributeNode("name")) {
                        map.set(<string>rule.getAttributeNode("name")?.nodeValue, <string>rule.firstChild?.textContent);
                    }
                }
            }
        }
    }
}

function LookupRoleKillTeam(roleText: string): Specialism {
    switch (roleText) {
        case 'Combat':
            return Specialism.COMBAT;
        case 'Staunch':
            return Specialism.STAUNCH;
        case 'Marksman':
            return Specialism.MARKSMAN;
        case 'Scout':
            return Specialism.SCOUT;
    }
    return Specialism.NONE;
}

function parseUnknownProfile(prop: Element, operative: Operative): void {

    let propName = prop.getAttributeNode("name")?.nodeValue;
    let propType = prop.getAttributeNode("typeName")?.nodeValue;

    console.log("Unknown profile type: " + propType + " with name: " + propName + ".  Found in operative: " + operative._name);

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

    if (element.tagName === "selection") {
        let costNode = element.querySelector("costs>cost");
        if (costNode && costNode.getAttributeNode("value")) obj._costs = <string>costNode.getAttributeNode("value")?.nodeValue;
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

function ParseOperative(root: Element): Operative | null {
    let operative: Operative = new Operative();
    const operativeName = ExpandBaseNotes(root, operative);

    let categories = root.querySelectorAll(":scope categories>category");
    for (let cat of categories) {
        const catName = cat.getAttributeNode("name")?.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                operative._factions.add(factKeyword);
            } else {
                const roleText = catName.trim();
                let operativeRole = LookupRoleKillTeam(roleText);
                if (operativeRole != Specialism.NONE) {
                    operative._role = operativeRole;
                } else {
                    // Keyword
                    operative._keywords.add(catName);
                }
            }
        }
    }

    // First, look for individual models within the selection. The selection's
    // type attribute can vary, but it should have a profile with typeName=Operative.
    let seenProfiles: Element[] = [];
    let seenSelections: Element[] = [];
    for (let profile of root.querySelectorAll('profile[typeName="Operative"]')) {
        let selection = profile.parentElement?.parentElement;
        if (!selection || seenSelections.includes(selection)) {
            // Some operatives (eg TSK) have separate Operative entries for Wounds brackets,
            // so make sure we don't count each of those Operatives as a separate model.
            continue;
        }
        seenSelections.push(selection);
        let props = Array.from(selection.querySelectorAll(":scope profiles>profile") || []);
        ParseModelProfiles(props, operative, operativeName);
        seenProfiles = seenProfiles.concat(props);
    }

    // Now, go thru any other profiles we missed. This may include weapons or
    // other upgrades, which will be applied to all models in the operative.
    let props = Array.from(root.querySelectorAll(":scope profiles>profile"));
    let unseenProps = props.filter((e: Element) => !seenProfiles.includes(e));
    ParseModelProfiles(unseenProps, operative, operativeName, /* appliesToAllModels= */ true);

    // Only match costs->costs associated with the operative and not its children (model and weapon) costs.
    let costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = cost.getAttributeNode("name")?.nodeValue;
            let value = cost.getAttributeNode("value")?.nodeValue;
            if (which == " EP" && value && +value > 0) {
                operative._costs = (operative.costs() + parseInt(value)).toString();
            }
        }
    }

    let rules = root.querySelectorAll("rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = rule.getAttributeNode("name")?.nodeValue;
            let desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                operative._rules.set(ruleName, desc.textContent);
            }
        }
    }

    operative.normalize();
    return operative;
}

function ParseModelProfiles(props: Element[], operative: Operative, operativeName: string, appliesToAllModels = false) {
    for (let prop of props) {
        // What kind of prop is this
        const propName = prop.getAttributeNode("name")?.nodeValue;
        const propType = prop.getAttributeNode("typeName")?.nodeValue;
        if (propName && propType) {
            if (propType === "Operative") {

                let name = operative._name;
                ExpandBaseNotes(prop, operative);
                operative._model = operative._name;
                operative._name = name;

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'M':
                                    operative._move = char.textContent;
                                    break;
                                case 'APL':
                                    operative._apl = char.textContent;
                                    break;
                                case 'GA':
                                    operative._groupActivations = char.textContent;
                                    break;
                                case 'DF':
                                    operative._defence = +char.textContent;
                                    break;
                                case 'SV':
                                    operative._saves = char.textContent;
                                    break;
                                case 'W':
                                    operative._wounds = +char.textContent;
                                    break;
                            }
                        }
                    }
                }
            } else if ((propType === "Abilities") || (propType === "Equipment") || (propType === "Ability") || (propType === "Unique Actions")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName && char.textContent && propName) {
                        let costNode = prop.parentElement?.parentElement?.querySelector("costs>cost");
                        let name = propName;
                        if (costNode && costNode.getAttributeNode("value")?.nodeValue) {
                            let cost = costNode.getAttributeNode("value")?.nodeValue;
                            if (cost && +cost > 0) name += ' (' + Math.floor(+cost) + ' EP)';
                        }
                        operative._abilities.set(name, char.textContent);
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
                                operative._upgrades.push(propName);
                            }
                        }
                    }
                }
            } else if (propType === "Weapons") {
                let weapon = new Weapons();
                ExpandBaseNotes(prop, weapon);
                if (prop.parentElement && prop.parentElement.parentElement) {
                    const parentSelection = prop.parentElement.parentElement;
                    ExtractRuleFromSelection(parentSelection, operative._rules)
                }
                weapon._count = ExtractNumberFromParent(prop);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'A':
                                    weapon._attacks = char.textContent;
                                    break;
                                case 'WS/BS':
                                    weapon._skill = char.textContent;
                                    break;
                                case 'D':
                                    weapon._damage = char.textContent;
                                    break;
                                case 'SR':
                                    weapon._rules = char.textContent;
                                    break;
                                case '!':
                                    weapon._criticalEffects = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                operative._weapons.push(weapon);
            } else if (propType == "Psychic Power") {
                let power: PsychicPower = new PsychicPower();
                ExpandBaseNotes(prop, power);

                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName === 'Effect') {
                        if (char.textContent) {
                            power._effect = char.textContent;
                        }
                    }
                }
                operative._psychicPowers.push(power);
            } else {
                parseUnknownProfile(prop, operative);
            }
        }
    }
}

function CompareObj(a: { _name: string; }, b: { _name: string; }): number {
    return Compare(a._name, b._name);
}

export function Compare(a: string, b: string): number {
    if (a > b) return 1;
    else if (a == b) return 0;
    return -1;
}
