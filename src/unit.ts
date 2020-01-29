import { Weapon } from "./weapon.js";

export class WoundTracker {
    _name: string = "";
    _table: Map<string, string> = new Map();
};

export class Explosion {
    _name: string = "";
    _diceRoll: string = "";
    _distance: string = "";
    _mortalWounds: string = "";
}

export class PsychicPower {
    _name: string = "";
    _manifest: number = 0;
    _range: string = "";
    _details: string = "";
}

export enum UnitRole {
    'None',
    'HQ',
    'Troops',
    'Elites',
    'Fast Attack',
    'Heavy Support',
    'Flyer',
    'Dedicated Transport',
    'Fortification',
    'Lord of War'
};

export class Model {

    _name: string = "";

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
    _psychicPowers: PsychicPower[] = [];
    _explosions: Explosion[] = [];

    _points: number = 0;
    _powerLevel: number = 0;
};

export class Unit {

    _name: string = "";
    _role: UnitRole = UnitRole['None'];
    _factions: Set<string> = new Set();
    _keywords: Set<string> = new Set();
    
    _abilities: Map<string, string> = new Map();
    _rules: Map<string, string> = new Map();

    _models: Model[] = [];

    _points: number = 0;
    _powerLevel: number = 0;
    
    _woundTracker: WoundTracker[] = [];

    parseModel(root: Element): Model|null {

        return null;
    }

    computePoints(): void {
        this._points = 0;

        for (let model of this._models) {
            this._points += model._points;
            for (let weapon of model._weapons) {
                this._points += weapon._points;
            }
        }
    }
}