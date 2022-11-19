import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Chaos Knight Favour Test.rosz", async function() {
    const doc = await readZippedRosterFile('test/Chaos Knight Favour Test.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 28, _points: 530, _commandPoints: 6}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Game Type: 4. Chapter Approved: War Zone Nephilim",
              "Battle Size: 3. Strike Force (101-200 Total PL / 1001-2000 Points)  [6 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "War Dog Brigand Squadron",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 190, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "War Dog Brigand 1 (7+ wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Brigand 2 (4-6 wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Brigand 3 (1-3 wounds remaining)"}),
                ],
                '_modelList': [
                  "War Dog Brigand (Avenger chaincannon, Daemonbreath spear, Havoc multi-launcher [5 pts], Character (Traitoris Lance), Khorne - Blood Shield [30 pts / 2 PL], Warlord)",
                  "Unit Upgrades (House Herpetrax)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Avenger chaincannon"}),
                  jasmine.objectContaining({'_name': "Daemonbreath spear"}),
                  jasmine.objectContaining({'_name': "Havoc multi-launcher"}),
                ],
                '_rules': mapWithKeys(["Conquerors Without Mercy", "Harbingers of Dread", "Ion Shields", "Objective Secured", "Towering Foe", "War Dog Squadron"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes (War Dog)"]),
                  "Favour of the Dark Gods": mapWithKeys(["Blood Shield - Favoured", "Blood Shield - Standard"]),
                  "Fell Bond": mapWithKeys(["Dauntless"]),
                }}),
              jasmine.objectContaining({
                '_name': "War Dog Executioner Squadron",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 175, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "War Dog Executioner 1 (7+ wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Executioner 2 (4-6 wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Executioner 3 (1-3 wounds remaining)"}),
                ],
                '_modelList': [
                  "War Dog Executioner (Daemonbreath meltagun [5 pts], 2x War Dog autocannon, Undivided - Warp-borne Stalker [15 pts / 1 PL])",
                  "Unit Upgrades (House Herpetrax)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Daemonbreath meltagun"}),
                  jasmine.objectContaining({'_name': "War Dog autocannon"}),
                ],
                '_rules': mapWithKeys(["Conquerors Without Mercy", "Harbingers of Dread", "Ion Shields", "Objective Secured", "Towering Foe", "War Dog Squadron"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes (War Dog)"]),
                  "Favour of the Dark Gods": mapWithKeys(["Warp-borne Stalker - Favoured", "Warp-borne Stalker - Standard"]),
                  "Fell Bond": mapWithKeys(["Dauntless"]),
                }}),
              jasmine.objectContaining({
                '_name': "War Dog Huntsman Squadron",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 165, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "War Dog Huntsman 1 (7+ wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Huntsman 2 (4-6 wounds remaining)"}),
                  jasmine.objectContaining({'_name': "War Dog Huntsman 3 (1-3 wounds remaining)"}),
                ],
                '_modelList': [
                  "War Dog Huntsman (Daemonbreath meltagun [5 pts], Daemonbreath spear, Reaper chaintalon, Tzeentch - Mirror of Fates [15 pts / 1 PL])",
                  "Unit Upgrades (House Herpetrax)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Daemonbreath meltagun"}),
                  jasmine.objectContaining({'_name': "Daemonbreath spear"}),
                  jasmine.objectContaining({'_name': "Reaper chaintalon"}),
                  jasmine.objectContaining({'_name': "Reaper chaintalon - Strike"}),
                  jasmine.objectContaining({'_name': "Reaper chaintalon - Sweep"}),
                ],
                '_rules': mapWithKeys(["Conquerors Without Mercy", "Daemonic Surge (Faction: Iconoclast Household)", "Harbingers of Dread", "Ion Shields", "Objective Secured", "Towering Foe", "War Dog Squadron"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes (War Dog)"]),
                  "D3 Roll": new Map(),
                  "Favour of the Dark Gods": mapWithKeys(["Mirror of Fates - Favoured", "Mirror of Fates - Standard"]),
                  "Fell Bond": mapWithKeys(["Dauntless"]),
                }}),
            ],
            '_rules': new Map([
              ["War Dog Squadron", jasmine.any(String)],
              ["Ion Shields", jasmine.any(String)],
              ["Conquerors Without Mercy", jasmine.any(String)],
              ["Towering Foe", jasmine.any(String)],
              ["Objective Secured", jasmine.any(String)],
              ["Harbingers of Dread", jasmine.any(String)],
              ["Daemonic Surge (Faction: Iconoclast Household)", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});