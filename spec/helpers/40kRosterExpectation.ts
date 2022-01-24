import { readZippedRosterFile } from './readRosterFile';
import { BaseNotes, Create40kRoster, Force, Unit } from "../../src/roster40k";

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

describe("Create40kRoster", function() {
  it("loads ${filename}", async function() {
    const doc = await readZippedRosterFile('${filename}');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: ${roster._cost._powerLevel}, _points: ${roster._cost._points}, _commandPoints: ${roster._cost._commandPoints}}),
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
            ]
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
                '_cost': jasmine.objectContaining({_powerLevel: ${unit._cost._powerLevel}, _points: ${unit._cost._points}, _commandPoints: ${unit._cost._commandPoints}}),
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

function processBaseNotes(notes: BaseNotes[]) {
  return notes.map(note =>
    `jasmine.objectContaining({'_name': ${JSON.stringify(note._name)}}),`)
    .join('\n                  ');
}

function processOptionalUnitStats(unit: Unit) {
  let output = '';
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
