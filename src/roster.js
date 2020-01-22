
export class Roster {
    _powerLevel = 0;
    _commandPoints= 0;
    _points = 0;
};
 
export function createRoster(xml) {
    if (!xml) return null;

    return new Roster();
}