import { Unit } from "./unit.js";

export class Roster {
    _powerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;

    _units: Unit[] = [];
    
    constructor() {

    }


};
 
export function createRoster(xml: string): Roster|null {
    if (!xml) return null;

    return new Roster();
}