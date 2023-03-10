import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/psychomancer.rosz", async function() {
    const doc = await readZippedRosterFile('test/psychomancer.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 27, _points: 480, _commandPoints: 3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Dynasty Choice: Dynasty: Szarekhan",
              "Game Type: Open",
              "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Psychomancer",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 65, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Psychomancer"}),
                ],
                '_modelList': [
                  "Psychomancer (Abyssal Lance)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Abyssal Lance (Shooting)"}),
                  jasmine.objectContaining({'_name': "Abyssal Lance (Melee)"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Dynastic Advisors", "Harbinger of Despair", "Nightmare Shroud (Aura)"]),
                  "Harbinger of Despair": mapWithKeys(["Despair 1", "Despair 2", "Despair 3", "Despair 4"]),
                }}),
            ],
            '_rules': new Map([
              ["Dynastic Agents and Star Gods", jasmine.any(String)],
              ["The Royal Court", jasmine.any(String)],
              ["Living Metal", jasmine.any(String)],
              ["Command Protocols", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});