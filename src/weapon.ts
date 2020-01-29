
type WeaponStrength = number| string;

export class Weapon {
    _name: string = "";
    _range: string | number = "Melee";
    _type: string = "Melee";
    _str: WeaponStrength = "user";
    _ap: string = "-";
    _damage: string = "";
    
    _abilities: string = "";

    _points: number = 0;
}