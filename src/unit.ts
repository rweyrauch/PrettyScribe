import { Weapon } from "./weapon.js";

export class Unit {

    _name: string = "";

    // Characteristics
    _move: string = "0\"";
    _ws: number = 3;
    _bs: number = 3;
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _attacks: number = 1;
    _leadership: number = 7;
    _save: number = 4;

    _abilities: Map<string, string> = new Map();
    _weapons: Map<string, Weapon> = new Map();

    _points: number = 0;
    _powerLevel: number = 0;
    
}