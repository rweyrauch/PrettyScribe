"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRosterExpectation = void 0;
const readRosterFile_1 = require("./readRosterFile");
const roster40k_1 = require("../../src/roster40k");
function getRosterExpectation(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield readRosterFile_1.readZippedRosterFile(filename);
        const roster = roster40k_1.Create40kRoster(doc);
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
        '_powerLevel': ${roster._powerLevel},
        '_points': ${roster._points},
        '_commandPoints': ${roster._commandPoints},
        '_forces': [${processForces(roster._forces)}
        ]}));
  });
});`;
    });
}
exports.getRosterExpectation = getRosterExpectation;
function processForces(forces) {
    return forces.map(force => `
          jasmine.objectContaining({
            '_configurations': [${processConfigurations(force._configurations)}],
            '_units': [${processUnits(force._units)}
            ]
          }),`).join('');
}
function processConfigurations(configurations) {
    if (configurations.length === 0) {
        return '';
    }
    return configurations.map(config => `
              ${JSON.stringify(config)},`).join('') + `
            `;
}
function processUnits(units) {
    return units.map(unit => `
              jasmine.objectContaining({
                '_name': ${JSON.stringify(unit._name)},
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
function processBaseNotes(notes) {
    return notes.map(note => `jasmine.objectContaining({'_name': ${JSON.stringify(note._name)}}),`)
        .join('\n                  ');
}
function processOptionalUnitStats(unit) {
    let output = '';
    if (unit._spells.length > 0) {
        output += `,
                '_spells': [
                  ${processBaseNotes(unit._spells)}
                ]`;
    }
    if (unit._psykers.length > 0) {
        output += `,
                '_psykers': [
                  ${processBaseNotes(unit._psykers)}
                ]`;
    }
    if (unit._explosions.length > 0) {
        output += `,
                '_explosions': [
                  ${processBaseNotes(unit._explosions)}
                ]`;
    }
    if (unit._woundTracker.length > 0) {
        output += `,
                '_woundTracker': [
                  ${processBaseNotes(unit._woundTracker)}
                ]`;
    }
    return output;
}
//# sourceMappingURL=40kRosterExpectation.js.map