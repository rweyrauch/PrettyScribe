import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Necron Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Necron Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 50, _points: 785, _commandPoints: 0}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Cryptek",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cryptek"}),
                ],
                '_modelList': [
                  "Cryptek (Staff of Light)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Staff of Light (Shooting)"}),
                  jasmine.objectContaining({'_name': "Staff of Light (Melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Overlord",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Overlord"}),
                ],
                '_modelList': [
                  "Overlord (Staff of Light)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Staff of Light (Shooting)"}),
                  jasmine.objectContaining({'_name': "Staff of Light (Melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Immortals",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Immortal"}),
                ],
                '_modelList': [
                  "5x Immortal (Gauss Blaster)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Gauss Blaster"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Necron Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Necron Warrior"}),
                ],
                '_modelList': [
                  "10x Necron Warrior (Gauss Flayer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Gauss Flayer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Necron Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Necron Warrior"}),
                ],
                '_modelList': [
                  "10x Necron Warrior (Gauss Flayer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Gauss Flayer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "C'tan Shard of the Deceiver",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 180, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "C'tan Shard of the Deceiver"}),
                ],
                '_modelList': [
                  "C'tan Shard of the Deceiver (Star-God Fists)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Star-God Fists"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Reality Unravels"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Doom Scythe",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Doom Scythe"}),
                ],
                '_modelList': [
                  "Doom Scythe (Death Ray, 2x Tesla Destructor)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Death Ray"}),
                  jasmine.objectContaining({'_name': "Tesla Destructor"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Crash and Burn"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Doom Scythe Track 1"}),
                  jasmine.objectContaining({'_name': "Doom Scythe Track 2"}),
                  jasmine.objectContaining({'_name': "Doom Scythe Track 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Dynasty Choice",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
            ],
            '_rules': new Map([
              ["Living Metal", jasmine.any(String)],
              ["Reanimation Protocols", jasmine.any(String)],
              ["Their Number is Legion, Their Name is Death", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});