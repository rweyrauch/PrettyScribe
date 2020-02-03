import { Force } from "./force.js";
import { Unit, WoundTracker, UnitRole, Model, PsychicPower, Explosion } from "./unit.js";
import { Weapon } from "./weapon.js";
export class Roster {
    constructor() {
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._points = 0;
        this._forces = [];
    }
    static CreateRoster(xml) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, "text/xml");
        var roster = null;
        if (doc) {
            roster = new Roster();
            Roster.ParseRosterPoints(doc, roster);
            Roster.ParseForces(doc, roster);
        }
        return roster;
    }
    static ParseRosterPoints(doc, roster) {
        var _a, _b;
        var costs = doc.querySelectorAll("roster>costs>cost");
        for (let cost of costs) {
            if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
                let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
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
    static ParseForces(doc, roster) {
        var _a, _b, _c;
        var forcesRoot = doc.querySelectorAll("roster>forces>force");
        for (let root of forcesRoot) {
            if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
                let f = new Force();
                let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
                let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
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
                        let ruleName = (_c = rule.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
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
    static ParseUnits(root, force) {
        var selections = root.querySelectorAll("force>selections>selection");
        for (let selection of selections) {
            //console.log(selection);
            var unit = Roster.CreateUnit(selection);
            if (unit && unit._role != UnitRole['None']) {
                force._units.push(unit);
            }
        }
    }
    static LookupRole(roleText) {
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
    static CreateUnit(root) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        var unit = new Unit();
        var unitName = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (unitName) {
            unit._name = unitName;
        }
        var categories = root.querySelectorAll("selection>categories>category");
        for (let cat of categories) {
            let catName = (_b = cat.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (catName) {
                const factPattern = "Faction: ";
                const factIndex = catName.lastIndexOf(factPattern);
                if (factIndex >= 0) {
                    const factKeyword = catName.slice(factIndex + factPattern.length);
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
            let propName = (_c = prop.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            let propType = (_d = prop.getAttributeNode("typeName")) === null || _d === void 0 ? void 0 : _d.nodeValue;
            if (propName && propType) {
                if (propType === "Unit") {
                    var model = new Model();
                    model._name = propName;
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'M':
                                        model._move = char.textContent;
                                        break;
                                    case 'WS':
                                        model._ws = char.textContent;
                                        break;
                                    case 'BS':
                                        model._bs = char.textContent;
                                        break;
                                    case 'S':
                                        model._str = +char.textContent;
                                        break;
                                    case 'T':
                                        model._toughness = +char.textContent;
                                        break;
                                    case 'W':
                                        model._wounds = +char.textContent;
                                        break;
                                    case 'A':
                                        model._attacks = char.textContent;
                                        break;
                                    case 'Ld':
                                        model._leadership = +char.textContent;
                                        break;
                                    case 'Save':
                                        model._save = char.textContent;
                                        break;
                                }
                            }
                        }
                    }
                    // parse model cost
                    var costs = root.querySelectorAll("selection>costs>cost");
                    for (let cost of costs) {
                        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                            let which = (_f = cost.getAttributeNode("name")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                            let value = (_g = cost.getAttributeNode("value")) === null || _g === void 0 ? void 0 : _g.nodeValue;
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
                        let charName = (_h = char.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                        if (charName && char.textContent && propName) {
                            if (charName === "Description") {
                                unit._abilities.set(propName, char.textContent);
                            }
                        }
                    }
                }
                else if (propType == "Weapon") {
                    let weapon = new Weapon();
                    weapon._name = propName;
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_j = char.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Range':
                                        weapon._range = char.textContent;
                                        break;
                                    case 'Type':
                                        weapon._type = char.textContent;
                                        break;
                                    case 'S':
                                        weapon._str = char.textContent;
                                        break;
                                    case 'AP':
                                        weapon._ap = char.textContent;
                                        break;
                                    case 'D':
                                        weapon._damage = char.textContent;
                                        break;
                                    case 'Abilities':
                                        weapon._abilities = char.textContent;
                                        break;
                                }
                            }
                        }
                    }
                    // parse weapon cost
                    var costs = root.querySelectorAll(":scope selections>selection>costs>cost");
                    //if (costs) console.log("Found weapons costs. " + costs.length);
                    for (let cost of costs) {
                        //console.log(cost);
                        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                            let which = (_k = cost.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
                            let value = (_l = cost.getAttributeNode("value")) === null || _l === void 0 ? void 0 : _l.nodeValue;
                            if (value) {
                                if (which === "pts") {
                                    if (weapon) {
                                        // console.log("Weapon: " + weapon._name + "  Points: " + value);
                                        weapon._points = +value;
                                    }
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
                        let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                        if (charName && char.textContent && propName) {
                            tracker._table.set(charName, char.textContent);
                        }
                    }
                    unit._woundTracker.push(tracker);
                }
                else if (propType == "Transport") {
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_o = char.getAttributeNode("name")) === null || _o === void 0 ? void 0 : _o.nodeValue;
                        if (charName && char.textContent && propName) {
                            if (charName === "Capacity") {
                                unit._abilities.set(propName, char.textContent);
                            }
                        }
                    }
                }
                else if (propType == "Psychic Power") {
                    let power = new PsychicPower();
                    power._name = propName;
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_p = char.getAttributeNode("name")) === null || _p === void 0 ? void 0 : _p.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Range':
                                        power._range = char.textContent;
                                        break;
                                    case 'Warp Charge':
                                        power._manifest = +char.textContent;
                                        break;
                                    case 'Details':
                                        power._details = char.textContent;
                                        break;
                                }
                            }
                        }
                    }
                    unit._models[unit._models.length - 1]._psychicPowers.push(power);
                }
                else if (propType == "Explosion") {
                    let explosion = new Explosion();
                    explosion._name = propName;
                    let chars = prop.querySelectorAll("characteristics>characteristic");
                    for (let char of chars) {
                        let charName = (_q = char.getAttributeNode("name")) === null || _q === void 0 ? void 0 : _q.nodeValue;
                        if (charName) {
                            if (char.textContent) {
                                switch (charName) {
                                    case 'Dice Roll':
                                        explosion._diceRoll = char.textContent;
                                        break;
                                    case 'Distance':
                                        explosion._distance = char.textContent;
                                        break;
                                    case 'Mortal Wounds':
                                        explosion._mortalWounds = char.textContent;
                                        break;
                                }
                            }
                        }
                    }
                    unit._models[unit._models.length - 1]._explosions.push(explosion);
                }
                else {
                    console.log(propType);
                }
            }
        }
        // Only match costs->costs associated with the unit and not its children (model and weapon) costs.
        var costs = root.querySelectorAll("costs > cost");
        for (let cost of costs) {
            if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
                console.log(cost);
                let which = (_r = cost.getAttributeNode("name")) === null || _r === void 0 ? void 0 : _r.nodeValue;
                let value = (_s = cost.getAttributeNode("value")) === null || _s === void 0 ? void 0 : _s.nodeValue;
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
        var rules = root.querySelectorAll("rules > rule");
        for (let rule of rules) {
            if (rule.hasAttribute("name")) {
                let ruleName = (_t = rule.getAttributeNode("name")) === null || _t === void 0 ? void 0 : _t.nodeValue;
                var desc = rule.querySelector("description");
                if (ruleName && desc && desc.textContent) {
                    unit._rules.set(ruleName, desc.textContent);
                }
            }
        }
        // Compute unit points
        unit.computePoints();
        return unit;
    }
}
;
