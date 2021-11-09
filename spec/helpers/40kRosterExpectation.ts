import { readRosterFile } from './readRosterFile';
import { BaseNotes, Create40kRoster, Force, Unit } from "../../src/roster40k";

export function getRosterExpectation(filename: string): string {
  const doc = readRosterFile(filename);
  const roster = Create40kRoster(doc);

  if (!roster) {
    throw new Error(`ERROR: Roster '${filename}' did not parse.`);
  }

  return `import { readRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads ${filename}", function() {
    const doc = readRosterFile('${filename}');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': ${roster._powerLevel},
        '_points': ${roster._points},
        '_commandPoints': ${roster._commandPoints},
        '_forces': [${processForces(roster._forces)}
        ]}));
  });
});`;
}

function processForces(forces: Force[]): string {
  return forces.map(force => `
          jasmine.objectContaining({'_units': [${processUnits(force._units)}
          ]}),`).join('');
}

function processUnits(units: Unit[]): string {
  return units.map(unit => `
            jasmine.objectContaining({
              '_name': ${JSON.stringify(unit._name)},
              '_modelStats': [
                ${processBaseNotes(unit._modelStats)}
              ],
              '_modelList': [
                ${unit._modelList.map(e => JSON.stringify(e)).join(',\n                ')}
              ],
              '_weapons': [
                ${processBaseNotes(unit._weapons)}
              ]${processOptionalUnitStats(unit)}}),`).join('');
}

function processBaseNotes(notes: BaseNotes[]) {
  return notes.map(note =>
    `jasmine.objectContaining({'_name': ${JSON.stringify(note._name)}}),`)
    .join('\n                ');
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
