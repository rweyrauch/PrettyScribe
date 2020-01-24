import { Unit } from "./unit.js";

export class Force {
    _catalog: string = "";
    _name: string = "Unknown";
    _faction: string = "Unknown";
    _rules: Map<string, string|null> = new Map();
    _units: Unit[] = [];

    constructor() {

    }

};
