import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Salamanders test.ros", async function() {
    const doc = await readZippedRosterFile('test/Salamanders test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 32,
        '_points': 625,
        '_commandPoints': 6,
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
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Captain"}),
                ],
                '_modelList': [
                  "Captain (Bolt pistol, Combi-melta, Relic blade, Frag & Krak grenades, Forge Master, Obsidian Aquila, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Relic blade"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "3x Space Marine (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine Sergeant (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine w/Special Weapon (Bolt pistol, Flamer, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "3x Space Marine (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine Sergeant (Bolt pistol, 2x Boltgun, Combi-flamer, Frag & Krak grenades)",
                  "Space Marine w/Special Weapon (Bolt pistol, Flamer, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Redemptor Dreadnought",
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
                ]}),
              jasmine.objectContaining({
                '_name': "Devastator Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Devastator Marine"}),
                  jasmine.objectContaining({'_name': "Devastator Marine Sergeant"}),
                ],
                '_modelList': [
                  "Devastator Marine Sergeant (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "2x Devastator Marine w/Heavy Weapon (Bolt pistol, Heavy bolter, Frag & Krak grenades)",
                  "2x Devastator Marine w/Heavy Weapon (Bolt pistol, Multi-melta, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Multi-melta"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ]}),
            ]
          }),
        ]}));
  });
});