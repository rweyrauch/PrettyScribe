
type WeaponStrength = number| string | null;

export class Weapon {
    _name: string = "";
    _range: string | number = "Melee";
    _type: string | null = "Melee";
    _str: WeaponStrength = "user";
    _ap: number = 0;
    _damage: string|null = "";
    
    _abilities: Map<string, string> = new Map();

    _points: number = 0;
}