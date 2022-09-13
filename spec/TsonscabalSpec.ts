import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Tsons cabal.rosz", async function() {
    const doc = await readZippedRosterFile('test/Tsons cabal.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 14, _points: 265, _commandPoints: 12, _freeformValues: {" Cabal Points":4}}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Cults of the Legion: Cult of Duplicity",
              "Game Type: 1. Eternal War",
              "Battle Size: 3. Strike Force (101-200 Total PL / 1001-2000 Points)  [12 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Ahriman",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 160, _commandPoints: 0, _freeformValues: {" Cabal Points":3}}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ahriman"}),
                ],
                '_modelList': [
                  "Ahriman (Inferno Bolt Pistol, Black Staff of Ahriman, Frag & Krak grenades, 5. Otherworldly Prescience, Smite, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Inferno Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Black Staff of Ahriman"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Cabbalistic Rituals"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Arch-Sorcerer of Tzeentch", "Lord of the Thousand Sons (Aura) - Ahriman", "Otherworldly Prescience", "Sigil of Corruption"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Ahriman"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Rubric Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0, _freeformValues: {" Cabal Points":1}}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Sorcerer"}),
                  jasmine.objectContaining({'_name': "Rubric Marine"}),
                ],
                '_modelList': [
                  "Aspiring Sorcerer (Inferno Bolt Pistol, Force stave, Smite)",
                  "4x Rubric Marine w/ inferno boltgun (Inferno boltgun)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Inferno Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Inferno boltgun"}),
                  jasmine.objectContaining({'_name': "Force stave"}),
                ],
                '_rules': mapWithKeys(["Cabbalistic Rituals", "Malicious Volleys", "Sorcerous Master"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["All is Dust", "Arcane Automata"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Sorcerous Facade"}),
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Aspiring Sorcerer"}),
                ]}),
            ],
            '_rules': new Map([
              ["Brotherhood of Sorcerers", jasmine.any(String)],
              ["Armour of Contempt", jasmine.any(String)],
              ["Cabbalistic Rituals", jasmine.any(String)],
              ["Sorcerous Master", jasmine.any(String)],
              ["Malicious Volleys", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});