export class Weapon {
    _range: string|number = "Melee";
    _type: "Melee"|"Missile" = "Melee";
    _str: number|"x2"|"user" = 4;
    _ap: number = 0;

    _abilities: Map<string, string> = new Map();

    _points: number = 0;
}