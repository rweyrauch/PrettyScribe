/*
 * Utility script to render Jasmine-stype expect() statements for a roster.
 *
 * Run with:
 *   $ ts-node spec/helpers/print40kRosterExpectation.ts 'path/to/file'
 */

import { readRosterFile } from './readRosterFile';
import { BaseNotes, Create40kRoster, Force, Unit } from "../../src/roster40k";

function main(args: string[]) {
  if (args.length !== 3) {
    console.error(`ERROR: Expected one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }
  const filename = args[2];
  const doc = readRosterFile(filename);
  const roster = Create40kRoster(doc);

  if (!roster) {
    console.error('ERROR: Roster did not parse.');
    return;
  }

  let output = `
    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': ${roster._powerLevel},
        '_points': ${roster._points},
        '_commandPoints': ${roster._commandPoints},
        '_forces': [${processForces(roster._forces)}
        ]}));\n`;

  console.log(output);
}

main(process.argv);

function processForces(forces: Force[]): string {
  return forces.map(force => `
          jasmine.objectContaining({'_units': [${processUnits(force._units)}
          ]}),`).join('');
}

function processUnits(units: Unit[]): string {
  return units.map(unit => `
            jasmine.objectContaining({
              '_name': '${unit._name}',
              '_modelStats': [
                ${processBaseNotes(unit._modelStats)}
              ],
              '_modelList': [
                ${unit._modelList.map(e => "'" + e + "'").join(',\n                ')}
              ],
              '_weapons': [
                ${processBaseNotes(unit._weapons)}
              ]}),`).join('');
}

function processBaseNotes(notes: BaseNotes[]) {
  return notes.map(note =>
    `jasmine.objectContaining({'_name': '${note._name}'}),`)
    .join('\n                ');
}

