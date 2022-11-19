import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/DarkAngelsTest.rosz", async function() {
    const doc = await readZippedRosterFile('test/DarkAngelsTest.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 28, _points: 540, _commandPoints: 3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "PC: DA - **Chapter Selector**: Dark Angels",
              "Gametype: Open",
              "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Azrael",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 160, _commandPoints: 2}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Azrael"}),
                ],
                '_modelList': [
                  "Azrael (Bolt pistol, Lion's Wrath - Master-crafted boltgun, Lion's Wrath - Master-crafted Plasma gun, Sword of Secrets, Frag & Krak grenades, 1. Brilliant Strategist, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Lion's Wrath - Master-crafted boltgun"}),
                  jasmine.objectContaining({'_name': "Lion's Wrath - Master-crafted Plasma gun"}),
                  jasmine.objectContaining({'_name': "Sword of Secrets"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Armour of Contempt", "Inner Circle"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["1. Brilliant Strategist", "Chapter Master", "Iron Halo", "Lion Helm (Aura)", "Rites of Battle (Aura)", "Supreme Tactician", "Watcher in the Dark"]),
                }}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 200, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
                ],
                '_modelList': [
                  "9x Intercessor (Bolt pistol, Bolt rifle, Frag & Krak grenades)",
                  "Intercessor Sergeant (Bolt pistol, Bolt rifle, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bolt rifle"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combat Squads"])}),
            ],
            '_rules': new Map([
              ["Devastator Doctrine", jasmine.any(String)],
              ["Tactical Doctrine", jasmine.any(String)],
              ["Assault Doctrine", jasmine.any(String)],
              ["Combat Doctrines", jasmine.any(String)],
              ["And They Shall Know No Fear", jasmine.any(String)],
              ["Grim Resolve", jasmine.any(String)],
              ["Shock Assault", jasmine.any(String)],
              ["Bolter Discipline", jasmine.any(String)],
              ["Speed of the Raven", jasmine.any(String)],
              ["Fire Discipline", jasmine.any(String)],
              ["Implacable", jasmine.any(String)],
              ["1st Company", jasmine.any(String)],
              ["2nd Company", jasmine.any(String)],
              ["Armour of Contempt", jasmine.any(String)],
              ["Angels of Death", jasmine.any(String)],
              ["Inner Circle", jasmine.any(String)],
              ["Combat Squads", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "PC: DA - **Chapter Selector**: Dark Angels",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Primaris Lieutenant",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Lieutenant"}),
                ],
                '_modelList': [
                  "Primaris Lieutenant (Plasma pistol [5 pts], Master-crafted power sword, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Master-crafted power sword"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Company Heroes", "Tactical Precision"]),
                }}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 100, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
                ],
                '_modelList': [
                  "4x Intercessor (Bolt pistol, Bolt rifle, Frag & Krak grenades)",
                  "Intercessor Sergeant (Bolt pistol, Bolt rifle, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bolt rifle"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combat Squads"])}),
            ],
            '_rules': new Map([
              ["Angels of Death", jasmine.any(String)],
              ["Combat Squads", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});