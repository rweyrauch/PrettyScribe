import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k9th/Salamanders test.ros", async function() {
    const doc = await readZippedRosterFile('test/40k9th/Salamanders test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 32, _points: 625, _commandPoints: 6}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "PC: SA - **Chapter Selector**: Salamanders",
              "Battle Size: 2. Incursion (51-100 Total PL / 501-1000 Points)  [6 CP]",
              "Gametype: Matched",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Captain",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 100, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Captain"}),
                ],
                '_modelList': [
                  "Captain (Bolt pistol, Combi-melta [5 pts], Relic blade [10 pts], Frag & Krak grenades, Forge Master, Obsidian Aquila, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Relic blade"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combi Weapon"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Forge Master", "Iron Halo", "Obsidian Aquila", "Rites of Battle"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "3x Space Marine (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine Sergeant (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine w/Special Weapon (Bolt pistol, Flamer [5 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combat Squads"])}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "3x Space Marine (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine Sergeant (Bolt pistol, 2x Boltgun [10 pts], Combi-flamer [10 pts], Frag & Krak grenades)",
                  "Space Marine w/Special Weapon (Bolt pistol, Flamer [5 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combat Squads", "Combi Weapon"])}),
              jasmine.objectContaining({
                '_name': "Redemptor Dreadnought",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 175, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought [1] (7+ wounds remaining)"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought [2] (4-6 wounds remaining)"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought [3] (1-3 wounds remaining)"}),
                ],
                '_modelList': [
                  "Redemptor Dreadnought (2x Fragstorm Grenade Launchers, Heavy flamer, Heavy Onslaught Gatling Cannon, Redemptor Fist)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Redemptor Fist"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D3)"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Duty Eternal"]),
                }}),
              jasmine.objectContaining({
                '_name': "Devastator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Devastator Marine"}),
                  jasmine.objectContaining({'_name': "Devastator Marine Sergeant"}),
                ],
                '_modelList': [
                  "Devastator Marine Sergeant (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "2x Devastator Marine w/Heavy Weapon (Bolt pistol, Heavy bolter [10 pts], Frag & Krak grenades)",
                  "2x Devastator Marine w/Heavy Weapon (Bolt pistol, Multi-melta [20 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Multi-melta"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Combat Squads"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Signum"]),
                }}),
            ],
            '_rules': new Map([
              ["Combat Doctrines", jasmine.any(String)],
              ["And They Shall Know No Fear", jasmine.any(String)],
              ["Bolter Discipline", jasmine.any(String)],
              ["Angels of Death", jasmine.any(String)],
              ["Shock Assault", jasmine.any(String)],
              ["Combi Weapon", jasmine.any(String)],
              ["Combat Squads", jasmine.any(String)],
              ["Explodes (6\"/D3)", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Forged in Battle", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});