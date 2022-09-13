import { readZippedRosterFile } from './readRosterFile';
import { BaseNotes, Costs, Create40kRoster, Force, Unit } from "../../src/roster40k";

export async function getRosterExpectation(filename: string): Promise<string> {
  const doc = await readZippedRosterFile(filename);


  const gameType = doc.querySelector("roster")?.getAttribute("gameSystemName");
  if (gameType !== "Warhammer 40,000 9th Edition" &&
      gameType !== "Warhammer 40,000 8th Edition") {
    throw new Error(`ERROR: '${filename}' has unsupported game type '${gameType}'.`);
  }

  const roster = Create40kRoster(doc);

  if (!roster) {
    throw new Error(`ERROR: Roster '${filename}' did not parse.`);
  }

  return `import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads ${filename}", async function() {
    const doc = await readZippedRosterFile('${filename}');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': ${processCost(roster._cost)},
        '_forces': [${processForces(roster._forces)}
        ]}));
  });
});`;
}

function processForces(forces: Force[]): string {
  return forces.map(force => `
          jasmine.objectContaining({
            '_configurations': [${processConfigurations(force._configurations)}],
            '_units': [${processUnits(force._units)}
            ],
            '_rules': ${processRulesMap(force._rules)},
            '_factionRules': ${processRulesMap(force._factionRules)},
          }),`).join('');
}

function processConfigurations(configurations: string[]): string {
  if (configurations.length === 0) {
    return '';
  }
  return configurations.map(config => `
              ${JSON.stringify(config)},`).join('') + `
            `;
}

function processUnits(units: Unit[]): string {
  return units.map(unit => `
              jasmine.objectContaining({
                '_name': ${JSON.stringify(unit._name)},
                '_cost': ${processCost(unit._cost)},
                '_modelStats': [
                  ${processBaseNotes(unit._modelStats)}
                ],
                '_modelList': [
                  ${unit._modelList.map(e => JSON.stringify(e)).join(',\n                  ')}
                ],
                '_weapons': [
                  ${processBaseNotes(unit._weapons)}
                ]${processOptionalUnitStats(unit)}}),`).join('');
}

function processCost(cost: Costs) {
  const freeformValues = cost._freeformValues ? `, _freeformValues: ${JSON.stringify(cost._freeformValues)}` : '';
  return `jasmine.objectContaining({_powerLevel: ${cost._powerLevel}, _points: ${cost._points}, _commandPoints: ${cost._commandPoints}${freeformValues}})`;
}

function processBaseNotes(notes: BaseNotes[]) {
  return notes.map(note =>
    `jasmine.objectContaining({'_name': ${JSON.stringify(note._name)}}),`)
    .join('\n                  ');
}

function processOptionalUnitStats(unit: Unit) {
  let output = '';
  if (unit._rules.size > 0) {
    output += `,
                '_rules': ${processMap(unit._rules)}`
  }
  if (Object.keys(unit._abilities).length > 0) {
    output += `,
                '_abilities': {${processAbilities2(unit._abilities)}
                }`
  }
  if (unit._spells.length > 0) {
    output += `,
                '_spells': [
                  ${processBaseNotes(unit._spells)}
                ]`
  }
  if (unit._psykers.length > 0) {
    output += `,
                '_psykers': [
                  ${processBaseNotes(unit._psykers)}
                ]`
  }
  if (unit._explosions.length > 0) {
    output += `,
                '_explosions': [
                  ${processBaseNotes(unit._explosions)}
                ]`
  }
  if (unit._woundTracker.length > 0) {
    output += `,
                '_woundTracker': [
                  ${processBaseNotes(unit._woundTracker)}
                ]`
  }
  return output;
}

function processMap(map: Map<string, string | null>): string {
  if (map.size === 0) return 'new Map()';

  return 'mapWithKeys([' + Array.from(map.keys()).sort().map(key => JSON.stringify(key)).join(', ') + '])';
}

function processAbilities2(_abilities2: {[key: string]: Map<string, string | null>}): string {
  return Object.keys(_abilities2).sort().map(key => `\n                  ${JSON.stringify(key)}: ${processMap(_abilities2[key])},`).join('');
}

function processRulesMap(_rules: Map<string, string | null>): string {
  if (_rules.size === 0) return 'new Map()';

  return 'new Map([\n' +
    Array.from(_rules.keys()).map(key => `              [${JSON.stringify(key)}, jasmine.any(String)],\n`).join('') +
  '            ])';

}

