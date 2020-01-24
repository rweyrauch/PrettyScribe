import { Force } from "./force.js";
import { Unit } from "./unit.js";
import { Weapon } from "./weapon.js";

export class Roster {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;

    _forces: Force[] = [];

    constructor() {

    }

    private static UnitRole: string[] = [
        'HQ',
        'Troops',
        'Elites',
        'Fast Attack',
        'Heavy Support',
        'Flyer',
        'Dedicated Transport',
        'Fortification',
        'Lord of War'
    ]

    static CreateRoster(xml: string): Roster | null {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, "text/xml");

        var roster: Roster | null = null;

        if (doc) {

            roster = new Roster();

            Roster.ParseRosterPoints(doc, roster);
            Roster.ParseForces(doc, roster);

            console.log(roster);
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
            if (unit) {
                console.log(unit);
                force._units.push(unit);
            }
        }
    }

    private static CreateUnit(root: Element): Unit | null {
        var unit: Unit = new Unit();
        var unitName = root.getAttributeNode("name")?.nodeValue;
        if (unitName) {
            unit._name = unitName;
        }
        var categories = root.querySelectorAll("selection>categories>category");
        for (let cat of categories) {
            //console.log(cat);
            let catName = cat.getAttributeNode("name")?.nodeValue;
            if (catName) {
                //console.log("Category Name: " + catName);
                if (catName.lastIndexOf("Faction: ") >= 0) {
                    unit._faction = catName;
                }
                else {
                    var unitRole = this.UnitRole.find(element => element === catName?.trim());
                    if (unitRole) {
                        //console.log("Found unit role: " + unitRole);
                        unit._role = unitRole;
                    }
                    else {
                        // Keyword
                        unit._keywords.push(catName);
                    }
                }
            }
        }
        var props = root.querySelectorAll("selection>profiles>profile");
        for (let prop of props) {
            // What kind of prop is this
            let propName = prop.getAttributeNode("name")?.nodeValue;
            let propType = prop.getAttributeNode("typeName")?.nodeValue;
            if (propType && (propType === "Unit")) {
                //console.log("Found unit.");
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        //console.log("Char: " + charName);
                        if (char.textContent) {
                            switch (charName) {
                                case 'M': unit._move = char.textContent; break;
                                case 'WS': unit._ws = char.textContent; break;
                                case 'BS': unit._bs = char.textContent; break;
                                case 'S': unit._str = +char.textContent; break;
                                case 'T': unit._toughness = +char.textContent; break;
                                case 'W': unit._wounds = +char.textContent; break;
                                case 'A': unit._attacks = +char.textContent; break;
                                case 'Ld': unit._leadership = +char.textContent; break;
                                case 'Save': unit._save = char.textContent; break;
                            }

                        }
                    }
                }
            }
            else if (propType && propType == "Abilities") {
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
            else if (propType && propType == "Weapon") {
                console.log("Weapon: " + prop);
                let weapon: Weapon = new Weapon();
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = char.getAttributeNode("name")?.nodeValue;
                    if (charName) {
                        //console.log("Char: " + charName);
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range': weapon._range = char.textContent; break;
                                case 'Type': weapon._type = char.textContent; break;
                                case 'S': weapon._str = char.textContent; break;
                                case 'AP': weapon._ap = +char.textContent; break;
                                case 'D': weapon._damage = char.textContent; break;
                                case 'Abilities': break;
                            }
                        }
                    }
                }
                unit._weapons.push(weapon);
            }
            else if (propType && propType == "Wound Track") {
                console.log("Wound Tracker: " + prop);
            }
            else if (propType && propType == "Transport") {
                console.log("Transport: " + prop);
            }
            else {
                console.log(prop);
            }
        }
        return unit;
    }
};
