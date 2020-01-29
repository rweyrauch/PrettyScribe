import { Force } from "./force.js";
import { Unit, WoundTracker, UnitRole, Model, PsychicPower, Explosion } from "./unit.js";
import { Weapon } from "./weapon.js";

export class Roster {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;

    _forces: Force[] = [];

    constructor() {

    }

    static CreateRoster(xml: string): Roster | null {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, "text/xml");

        var roster: Roster | null = null;

        if (doc) {
            roster = new Roster();

            Roster.ParseRosterPoints(doc, roster);
            Roster.ParseForces(doc, roster);
        }
        return roster;
    }

    private static ParseRosterPoints(doc: XMLDocument, roster: Roster): void {
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

    private static ParseForces(doc: XMLDocument, roster: Roster): void {
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
                //console.log("Name: " + which + "  Rules: " + rules);
                for (let rule of rules) {
                    if (rule.hasAttribute("name")) {
                        let ruleName = rule.getAttributeNode("name")?.nodeValue;
                        var desc = rule.querySelector("rule>description");
                        if (ruleName && desc) {
                            f._rules.set(ruleName, desc.textContent);
                            //console.log(rule);
                        }
                    }
                }

                Roster.ParseUnits(root, f);

                roster._forces.push(f);
            }
        }
    }

    private static ParseUnits(root: Element, force: Force): void {
        var selections = root.querySelectorAll("force>selections>selection");
        for (let selection of selections) {
            //console.log(selection);
            var unit = Roster.CreateUnit(selection);
            if (unit && unit._role != UnitRole['None']) {
                force._units.push(unit);
            }
        }
    }

    private static LookupRole(roleText: string): UnitRole {
        switch (roleText) {
            case 'HQ': return UnitRole['HQ'];
            case 'Troops': return UnitRole['Troops'];
            case 'Elites': return UnitRole['Elites'];
            case 'Fast Attack': return UnitRole['Fast Attack'];
            case 'Heavy Support': return UnitRole['Heavy Support'];
            case 'Flyer': return UnitRole['Flyer'];
            case 'Dedicated Transport': return UnitRole['Dedicated Transport'];
            case 'Fortification': return UnitRole['Fortification'];
            case 'Lord of War': return UnitRole['Lord of War'];
        }
        return UnitRole['None'];
    }

    private static CreateUnit(root: Element): Unit | null {
        var unit: Unit = new Unit();
        var unitName = root.getAttributeNode("name")?.nodeValue;
        if (unitName) {
            unit._name = unitName;
        }
        var categories = root.querySelectorAll("selection>categories>category");
        for (let cat of categories) {
            let catName = cat.getAttributeNode("name")?.nodeValue;
            if (catName) {
                const factPattern = "Faction: ";
                const factIndex = catName.lastIndexOf(factPattern);
                if (factIndex >= 0) {
                    const factKeyword = catName.slice(factIndex+factPattern.length);
                    unit._factions.add(factKeyword);
                }
                else {
                    const roleText = catName.trim();
                    var unitRole = Roster.LookupRole(roleText);
                    if (unitRole != UnitRole['None']) {
                        unit._role = unitRole;
                    }
                    else {
                        // Keyword
                        unit._keywords.add(catName);
                    }
                }
            }
        }

        var props = root.querySelectorAll("selection>profiles>profile");
        for (let prop of props) {
            // What kind of prop is this
            let propName = prop.getAttributeNode("name")?.nodeValue;
            let propType = prop.getAttributeNode("typeName")?.nodeValue;
            if (propName && propType) {
                if (propType === "Unit") {
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
                    }
                    // parse model cost
                    var costs = root.querySelectorAll("selection>costs>cost");
                    for (let cost of costs) {
                        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                            let which = cost.getAttributeNode("name")?.nodeValue;
                            let value = cost.getAttributeNode("value")?.nodeValue;
                            if (value) {
                                if (which == " PL") {
                                    model._powerLevel = +value;
                                }
                                else if (which === "pts") {
                                    model._points = +value;
                                }
                             }
                        }
                    }
                 
                    unit._models.push(model);
                }
                else if (propType == "Abilities") {
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = char.getAttributeNode("name")?.nodeValue;
                        if (charName && char.textContent && propName) {
                            if (charName === "Description") {
                                unit._abilities.set(propName, char.textContent);
                            }
                        }
                    }
                }
                else if (propType == "Weapon") {
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
/*                    
                    // parse weapon cost
                    var costs = root.querySelectorAll("costs>cost");
                    for (let cost of costs) {
                        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                            let which = cost.getAttributeNode("name")?.nodeValue;
                            let value = cost.getAttributeNode("value")?.nodeValue;
                            if (value) {
                                 if (which === "pts") {
                                    weapon._points = +value;
                                }
                            }
                        }
                    }
*/                   
                    unit._models[unit._models.length-1]._weapons.push(weapon);
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
                    unit._models[unit._models.length-1]._psychicPowers.push(power);
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
                    unit._models[unit._models.length-1]._explosions.push(explosion);
                }
                else {
                    console.log(propType);
                }
            }
        }

        // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
        var costs = root.querySelectorAll(":scope > costs > cost");
        for (let cost of costs) {
            if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                let which = cost.getAttributeNode("name")?.nodeValue;
                let value = cost.getAttributeNode("value")?.nodeValue;
                if (value) {
                    if (which == " PL") {
                        unit._powerLevel = +value;
                    }
                    else if (which === "pts") {
                        unit._points = +value;
                    }
                 }
            }
        }

        var rules = root.querySelectorAll(":scope rules > rule");
        for (let rule of rules) {
            if (rule.hasAttribute("name")) {
                let ruleName = rule.getAttributeNode("name")?.nodeValue;
                var desc = rule.querySelector(":scope description");
                if (ruleName && desc && desc.textContent) {
                    unit._rules.set(ruleName, desc.textContent);
                }
            }
        }

        // Compute unit points
        unit.computePoints();
     
        return unit;
    }
};
