import { readRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Salamanders test.ros", function() {
    const doc = readRosterFile('test/Salamanders test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 24,
        '_points': 475,
        '_commandPoints': 6,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Captain",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Captain"}),
              ],
              '_modelList': [
                "Captain (Bolt pistol, Boltgun, Meltagun, Relic blade, Frag grenades, Krak grenades, Forge Master, Obsidian Aquila)"
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
                "3x Space Marine (Bolt pistol, Boltgun, Frag grenades, Krak grenades)",
                "Space Marine Sergeant (Bolt pistol, Boltgun, Frag grenades, Krak grenades)",
                "Space Marine w/Special Weapon (Bolt pistol, Flamer, Frag grenades, Krak grenades)"
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
                "3x Space Marine (Bolt pistol, Boltgun, Frag grenades, Krak grenades)",
                "Space Marine Sergeant (Bolt pistol, 2x Boltgun, Flamer, Frag grenades, Krak grenades)",
                "Space Marine w/Special Weapon (Bolt pistol, Flamer, Frag grenades, Krak grenades)"
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
                "Redemptor Dreadnought (Fragstorm Grenade Launcher, Heavy flamer, Heavy Onslaught Gatling Cannon, Redemptor Fist)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                jasmine.objectContaining({'_name': "Heavy flamer"}),
                jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                jasmine.objectContaining({'_name': "Redemptor Fist"}),
              ]}),
          ]}),
        ]}));
  });
});