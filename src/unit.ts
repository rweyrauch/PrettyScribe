import { Weapon } from "./weapon.js";

export class Unit {

    _name: string = "";
    _role: string = "";
    _faction: string = "";
    _keywords: string[] = [];
    
    // Characteristics
    _move: string|null = "0\"";
    _ws: string|null = "";
    _bs: string|null = "";
    _str: number = 4;
    _toughness: number = 4;
    _wounds: number = 1;
    _attacks: string|number|null = 1;
    _leadership: number = 7;
    _save: string|null = "";

    _abilities: Map<string, string> = new Map();
    _weapons: Weapon[] = [];

    _points: number = 0;
    _powerLevel: number = 0;
    
}