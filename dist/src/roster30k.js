"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create30kRoster = exports.Roster30k = exports.Force30k = exports.Unit30k = exports.Fortification30k = exports.Model30k = exports.Flyer30k = exports.Walker30k = exports.Vehicle30k = exports.UnitRoleToString30k = exports.UnitRole30k = exports.PsychicPower30k = exports.Psyker30k = exports.Weapon30k = void 0;
class Weapon30k {
    constructor() {
        this._name = "";
        this._range = "Melee";
        this._str = "user";
        this._ap = "";
        this._type = "Melee";
    }
}
exports.Weapon30k = Weapon30k;
class Psyker30k {
    constructor() {
        this._name = "";
        this._masteryLevel = "";
        this._disciplines = "";
    }
}
exports.Psyker30k = Psyker30k;
class PsychicPower30k {
    constructor() {
        this._name = "";
        this._warpCharge = 0;
        this._category = "";
        this._range = "";
        this._details = "";
    }
}
exports.PsychicPower30k = PsychicPower30k;
var UnitRole30k;
(function (UnitRole30k) {
    UnitRole30k[UnitRole30k["NONE"] = 0] = "NONE";
    UnitRole30k[UnitRole30k["HQ"] = 1] = "HQ";
    UnitRole30k[UnitRole30k["TR"] = 2] = "TR";
    UnitRole30k[UnitRole30k["EL"] = 3] = "EL";
    UnitRole30k[UnitRole30k["FA"] = 4] = "FA";
    UnitRole30k[UnitRole30k["HS"] = 5] = "HS";
    UnitRole30k[UnitRole30k["FL"] = 6] = "FL";
    UnitRole30k[UnitRole30k["DT"] = 7] = "DT";
    UnitRole30k[UnitRole30k["FT"] = 8] = "FT";
    UnitRole30k[UnitRole30k["LW"] = 9] = "LW";
})(UnitRole30k = exports.UnitRole30k || (exports.UnitRole30k = {}));
exports.UnitRoleToString30k = [
    'None',
    'HQ',
    'Troops',
    'Elites',
    'Fast Attack',
    'Heavy Support',
    'Flyer',
    'Dedicated Transport',
    'Fortification',
    'Lord of War',
];
class Vehicle30k {
    constructor() {
        this._name = "";
        this._bs = "";
        this._front = 4;
        this._side = 4;
        this._rear = 4;
        this._hp = 1;
        this._type = "";
        this._weapons = [];
    }
}
exports.Vehicle30k = Vehicle30k;
class Walker30k {
    constructor() {
        this._name = "";
        this._ws = "";
        this._bs = "";
        this._str = 4;
        this._front = 4;
        this._side = 4;
        this._rear = 4;
        this._initiative = 1;
        this._attacks = "";
        this._hp = 1;
        this._type = "";
        this._weapons = [];
    }
}
exports.Walker30k = Walker30k;
class Flyer30k {
    constructor() {
        this._name = "";
        this._bs = "";
        this._front = 4;
        this._side = 4;
        this._rear = 4;
        this._hp = 1;
        this._type = "";
        this._role = "";
        this._pursuit = "";
        this._agility = "";
        this._weapons = [];
    }
}
exports.Flyer30k = Flyer30k;
class Model30k {
    constructor() {
        this._name = "";
        this._count = 0;
        this._ws = "";
        this._bs = "";
        this._str = 4;
        this._toughness = 4;
        this._wounds = 1;
        this._initiative = 1;
        this._attacks = "";
        this._leadership = 7;
        this._save = "";
        this._weapons = [];
        this._psyker = null;
        this._psychicPowers = [];
    }
}
exports.Model30k = Model30k;
;
class Fortification30k {
    constructor() {
        this._name = "";
        this._composition = "";
        this._type = "";
    }
}
exports.Fortification30k = Fortification30k;
;
class Unit30k {
    constructor() {
        this._name = "";
        this._role = UnitRole30k.NONE;
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._models = [];
        this._walkers = [];
        this._vehicles = [];
        this._flyers = [];
        this._points = 0;
    }
}
exports.Unit30k = Unit30k;
class Force30k {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._faction = "Unknown";
        this._rules = new Map();
        this._units = [];
    }
}
exports.Force30k = Force30k;
;
class Roster30k {
    constructor() {
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
exports.Roster30k = Roster30k;
;
function Create30kRoster(doc) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster30k();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "30k Army Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);
            return roster;
        }
    }
    return null;
}
exports.Create30kRoster = Create30kRoster;
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which === "pts") {
                    roster._points = +value;
                }
                else if (which === "CP") {
                    roster._commandPoints = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster) {
    var _a, _b, _c;
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
            let f = new Force30k();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            if (!DuplicateForce(f, roster)) {
                const rules = root.querySelectorAll("force>rules>rule");
                for (let rule of rules) {
                    if (rule.hasAttribute("name")) {
                        let ruleName = (_c = rule.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                        const desc = rule.querySelector("rule>description");
                        if (ruleName && desc) {
                            f._rules.set(ruleName, desc.textContent);
                        }
                    }
                }
            }
            ParseUnits(root, f);
            roster._forces.push(f);
        }
    }
}
function DuplicateForce(force, roster) {
    if (!roster || !force)
        return false;
    for (let f of roster._forces) {
        if (f._catalog === force._catalog)
            return true;
    }
    return false;
}
function ParseUnits(root, force) {
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let unit = CreateUnit(selection);
        if (unit && unit._role != UnitRole30k.NONE) {
            force._units.push(unit);
        }
    }
    force._units.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role)
            return 0;
        return -1;
    });
}
function LookupRole(roleText) {
    switch (roleText) {
        case 'HQ': return UnitRole30k.HQ;
        case 'Troops': return UnitRole30k.TR;
        case 'Elites': return UnitRole30k.EL;
        case 'Fast Attack': return UnitRole30k.FA;
        case 'Heavy Support': return UnitRole30k.HS;
        case 'Flyer': return UnitRole30k.FL;
        case 'Dedicated Transport': return UnitRole30k.DT;
        case 'Fortification': return UnitRole30k.FT;
        case 'Lord of War': return UnitRole30k.LW;
    }
    return UnitRole30k.NONE;
}
function CreateUnit(root) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    let unit = new Unit30k();
    let unitName = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }
    let categories = root.querySelectorAll(":scope categories>category");
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
                const unitRole = LookupRole(roleText);
                if (unitRole != UnitRole30k.NONE) {
                    unit._role = unitRole;
                }
                else {
                    unit._keywords.add(catName);
                }
            }
        }
    }
    let activeModel = null;
    let activeWalker = null;
    let activeVehicle = null;
    let activeFlyer = null;
    let props = root.querySelectorAll(":scope profiles>profile");
    for (let prop of props) {
        let propName = (_c = prop.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
        let propType = (_d = prop.getAttributeNode("typeName")) === null || _d === void 0 ? void 0 : _d.nodeValue;
        if (propName && propType) {
            if (propType === "Unit") {
                activeModel = new Model30k();
                activeModel._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'WS':
                                    activeModel._ws = char.textContent;
                                    break;
                                case 'BS':
                                    activeModel._bs = char.textContent;
                                    break;
                                case 'S':
                                    activeModel._str = +char.textContent;
                                    break;
                                case 'T':
                                    activeModel._toughness = +char.textContent;
                                    break;
                                case 'W':
                                    activeModel._wounds = +char.textContent;
                                    break;
                                case 'I':
                                    activeModel._initiative = +char.textContent;
                                    break;
                                case 'A':
                                    activeModel._attacks = char.textContent;
                                    break;
                                case 'LD':
                                    activeModel._leadership = +char.textContent;
                                    break;
                                case 'Save':
                                    activeModel._save = char.textContent;
                                    break;
                            }
                        }
                    }
                    if (prop.parentElement && prop.parentElement.parentElement) {
                        const parentSelection = prop.parentElement.parentElement;
                        let countValue = (_f = parentSelection.getAttributeNode("number")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                        if (countValue) {
                            activeModel._count = +countValue;
                        }
                    }
                }
                unit._models.push(activeModel);
            }
            else if (propType === "Walker") {
                activeWalker = new Walker30k();
                activeWalker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'WS':
                                    activeWalker._ws = char.textContent;
                                    break;
                                case 'BS':
                                    activeWalker._bs = char.textContent;
                                    break;
                                case 'S':
                                    activeWalker._str = +char.textContent;
                                    break;
                                case 'Front':
                                    activeWalker._front = +char.textContent;
                                    break;
                                case 'Side':
                                    activeWalker._side = +char.textContent;
                                    break;
                                case 'Rear':
                                    activeWalker._rear = +char.textContent;
                                    break;
                                case 'I':
                                    activeWalker._initiative = +char.textContent;
                                    break;
                                case 'A':
                                    activeWalker._attacks = char.textContent;
                                    break;
                                case 'HP':
                                    activeWalker._hp = +char.textContent;
                                    break;
                                case 'Type':
                                    activeWalker._type = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._walkers.push(activeWalker);
            }
            else if (propType === "Vehicle") {
                activeVehicle = new Vehicle30k();
                activeVehicle._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_h = char.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'BS':
                                    activeVehicle._bs = char.textContent;
                                    break;
                                case 'Front':
                                    activeVehicle._front = +char.textContent;
                                    break;
                                case 'Side':
                                    activeVehicle._side = +char.textContent;
                                    break;
                                case 'Rear':
                                    activeVehicle._rear = +char.textContent;
                                    break;
                                case 'HP':
                                    activeVehicle._hp = +char.textContent;
                                    break;
                                case 'Type':
                                    activeVehicle._type = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._vehicles.push(activeVehicle);
            }
            else if (propType === "Flyer") {
                activeFlyer = new Flyer30k();
                activeFlyer._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_j = char.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'BS':
                                    activeFlyer._bs = char.textContent;
                                    break;
                                case 'Front':
                                    activeFlyer._front = +char.textContent;
                                    break;
                                case 'Side':
                                    activeFlyer._side = +char.textContent;
                                    break;
                                case 'Rear':
                                    activeFlyer._rear = +char.textContent;
                                    break;
                                case 'HP':
                                    activeFlyer._hp = +char.textContent;
                                    break;
                                case 'Combat Role':
                                    activeFlyer._role = char.textContent;
                                    break;
                                case 'Pursuit':
                                    activeFlyer._pursuit = char.textContent;
                                    break;
                                case 'Agility':
                                    activeFlyer._agility = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._flyers.push(activeFlyer);
            }
        }
    }
    for (let prop of props) {
        let propName = (_k = prop.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
        let propType = (_l = prop.getAttributeNode("typeName")) === null || _l === void 0 ? void 0 : _l.nodeValue;
        if (propName && propType) {
            if (propType === "Wargear Item") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Description") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                let weapon = new Weapon30k();
                weapon._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_o = char.getAttributeNode("name")) === null || _o === void 0 ? void 0 : _o.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range':
                                    weapon._range = char.textContent;
                                    break;
                                case 'Type':
                                    weapon._type = char.textContent;
                                    break;
                                case 'Strength':
                                    weapon._str = char.textContent;
                                    break;
                                case 'AP':
                                    weapon._ap = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                if (activeModel)
                    activeModel._weapons.push(weapon);
                else if (activeWalker)
                    activeWalker._weapons.push(weapon);
                else if (activeVehicle)
                    activeVehicle._weapons.push(weapon);
                else if (activeFlyer)
                    activeFlyer._weapons.push(weapon);
                else {
                    console.log("Unexpected: Created a weapon without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Transport") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_p = char.getAttributeNode("name")) === null || _p === void 0 ? void 0 : _p.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Capacity") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType == "Psychic Power") {
                let power = new PsychicPower30k();
                power._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_q = char.getAttributeNode("name")) === null || _q === void 0 ? void 0 : _q.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Warp Charge':
                                    power._warpCharge = +char.textContent;
                                    break;
                                case 'Power Category':
                                    power._category = char.textContent;
                                    break;
                                case 'Range':
                                    power._range = char.textContent;
                                    break;
                                case 'Details':
                                    power._details = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                if (activeModel)
                    activeModel._psychicPowers.push(power);
                else {
                    console.log("Unexpected: Created a psychic power without an active model.  Unit: " + unitName);
                }
            }
            else if (propType == "Psyker") {
                let psyker = new Psyker30k();
                psyker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_r = char.getAttributeNode("name")) === null || _r === void 0 ? void 0 : _r.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Mastery Level':
                                psyker._masteryLevel = char.textContent;
                                break;
                            case 'Disciplines':
                                psyker._disciplines = char.textContent;
                                break;
                        }
                    }
                }
                if (activeModel)
                    activeModel._psyker = psyker;
                else {
                    console.log("Unexpected: Created a psyker without an active model.  Unit: " + unitName);
                }
            }
        }
        else if ((propType === "Unit") || (propType === "Walker") || (propType === "Vehicle")) {
        }
        else {
            console.log("Unknown property type: " + propType);
        }
    }
    let costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_s = cost.getAttributeNode("name")) === null || _s === void 0 ? void 0 : _s.nodeValue;
            let value = (_t = cost.getAttributeNode("value")) === null || _t === void 0 ? void 0 : _t.nodeValue;
            if (value) {
                if (which == "pts") {
                    unit._points += +value;
                }
            }
        }
    }
    let rules = root.querySelectorAll(":scope rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = (_u = rule.getAttributeNode("name")) === null || _u === void 0 ? void 0 : _u.nodeValue;
            let desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
            }
        }
    }
    return unit;
}
//# sourceMappingURL=roster30k.js.map