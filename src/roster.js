
export class Roster {
    _polwerLevel: number = 0;
    _commandPoints: number = 0;
    _points: number = 0;
};
 
export function createRoster(xml: string): Roster| null {
    if (!xml) return null;

    return new Roster();
}