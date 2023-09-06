import { readZippedRosterFile } from '../spec/helpers/readRosterFile';
import { Wh40k } from "../src/roster40k10th";

export async function getRosterExpectation(filename: string): Promise<string> {
  const doc = await readZippedRosterFile(filename);


  const gameType = doc.querySelector("roster")?.getAttribute("gameSystemName");
  if (gameType !== "Warhammer 40,000 10th Edition") {
    throw new Error(`ERROR: '${filename}' has unsupported game type '${gameType}'.`);
  }

  const roster = Wh40k.CreateRoster(doc);

  if (!roster) {
    throw new Error(`ERROR: Roster '${filename}' did not parse.`);
  }

  return `import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads ${filename}", async function() {
    const doc = await readZippedRosterFile('${filename}');
    const roster = Wh40k.CreateRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': ${processCost(roster._cost)},
        '_forces': [${processForces(roster._forces)}
        ]}));
  });
});`;
}

function processForces(forces: Wh40k.Force[]): string {
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

function processUnits(units: Wh40k.Unit[]): string {
  return units.map(unit => `
              jasmine.objectContaining({
                '_name': ${JSON.stringify(unit._name)},
                '_cost': ${processCost(unit._cost)},
                '_profileTables': {
                  ${processProfileTables(unit._profileTables)}
                },
                '_modelList': [
                  ${unit._modelList.map(e => JSON.stringify(e)).join(',\n                  ')}
                ]${processOptionalUnitStats(unit)}}),`).join('');
}

function processCost(cost: Wh40k.Costs) {
  const freeformValues = cost._freeformValues ? `, _freeformValues: ${JSON.stringify(cost._freeformValues)}` : '';
  return `jasmine.objectContaining({_points: ${cost._points}${freeformValues}})`;
}

function processBaseNotes(notes: Wh40k.BaseNotes[]) {
  return notes.map(note =>
    `jasmine.objectContaining({'_name': ${JSON.stringify(note._name)}}),`)
    .join('\n                  ');
}

function processOptionalUnitStats(unit: Wh40k.Unit) {
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
  return output;
}

function processTabularRowsOld(rows: string[][]) {
  if (rows.length === 1) {
    return JSON.stringify(rows);
  } else {
    return `[
                    ${rows.map(row => '  ' + JSON.stringify(row) + ',\n                    ').join('')}]`
  }
}

function processTabularRows(rows: string[][]) {
  return `[
                    ${rows.map(row => `  jasmine.arrayContaining([${JSON.stringify(row[0])}]),\n                    `).join('')}]`
}

function processTabularProfile(table: Wh40k.TabularProfile) {
  return `jasmine.objectContaining({
                    '_headers': ${JSON.stringify(table._headers)},
                    '_contents': ${processTabularRows(table._contents)},
                  })`
}

function processProfileTables(_profileTables: { [key: string]: Wh40k.TabularProfile; }) {
  return Object.keys(_profileTables).sort().map(key =>
    `${JSON.stringify(key)}: ${processTabularProfile(_profileTables[key])}`)
    .join(',\n                  ');
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

