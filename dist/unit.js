export class WoundTracker {
    constructor() {
        this._name = "";
        this._table = new Map();
    }
}
;
export class Explosion {
    constructor() {
        this._name = "";
        this._diceRoll = "";
        this._distance = "";
        this._mortalWounds = "";
    }
}
export class PsychicPower {
    constructor() {
        this._name = "";
        this._manifest = 0;
        this._range = "";
        this._details = "";
    }
}
export var UnitRole;
(function (UnitRole) {
    UnitRole[UnitRole["None"] = 0] = "None";
    UnitRole[UnitRole["HQ"] = 1] = "HQ";
    UnitRole[UnitRole["Troops"] = 2] = "Troops";
    UnitRole[UnitRole["Elites"] = 3] = "Elites";
    UnitRole[UnitRole["Fast Attack"] = 4] = "Fast Attack";
    UnitRole[UnitRole["Heavy Support"] = 5] = "Heavy Support";
    UnitRole[UnitRole["Flyer"] = 6] = "Flyer";
    UnitRole[UnitRole["Dedicated Transport"] = 7] = "Dedicated Transport";
    UnitRole[UnitRole["Fortification"] = 8] = "Fortification";
    UnitRole[UnitRole["Lord of War"] = 9] = "Lord of War";
})(UnitRole || (UnitRole = {}));
;
export class Model {
    constructor() {
        this._name = "";
        // Characteristics
        this._move = "0\"";
        this._ws = "";
        this._bs = "";
        this._str = 4;
        this._toughness = 4;
        this._wounds = 1;
        this._attacks = "";
        this._leadership = 7;
        this._save = "";
        this._weapons = [];
        this._psychicPowers = [];
        this._explosions = [];
        this._points = 0;
        this._powerLevel = 0;
    }
}
;
export class Unit {
    constructor() {
        this._name = "";
        this._role = UnitRole['None'];
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._models = [];
        this._points = 0;
        this._powerLevel = 0;
        this._woundTracker = [];
    }
    parseModel(root) {
        return null;
    }
    computePoints() {
        this._points = 0;
        for (let model of this._models) {
            this._points += model._points;
            for (let weapon of model._weapons) {
                this._points += weapon._points;
            }
        }
    }
}
