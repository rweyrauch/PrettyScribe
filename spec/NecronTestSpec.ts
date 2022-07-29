import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Necron Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Necron Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 50, _points: 785, _commandPoints: 0}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Dynasty Choice",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Cryptek",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cryptek"}),
                ],
                '_modelList': [
                  "Cryptek (Staff of Light [10 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Staff of Light (Shooting)"}),
                  jasmine.objectContaining({'_name': "Staff of Light (Melee)"}),
                ],
                '_rules': mapWithKeys(["Living Metal"]),
                '_abilities': mapWithKeys(["Technomancer"])}),
              jasmine.objectContaining({
                '_name': "Overlord",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Overlord"}),
                ],
                '_modelList': [
                  "Overlord (Staff of Light [10 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Staff of Light (Shooting)"}),
                  jasmine.objectContaining({'_name': "Staff of Light (Melee)"}),
                ],
                '_rules': mapWithKeys(["Living Metal"]),
                '_abilities': mapWithKeys(["My Will Be Done", "Phase Shifter"])}),
              jasmine.objectContaining({
                '_name': "Immortals",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Immortal"}),
                ],
                '_modelList': [
                  "5x Immortal (Gauss Blaster [35 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Gauss Blaster"}),
                ],
                '_rules': mapWithKeys(["Reanimation Protocols", "Their Number is Legion, Their Name is Death"])}),
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
                ],
                '_rules': mapWithKeys(["Reanimation Protocols", "Their Number is Legion, Their Name is Death"])}),
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
                ],
                '_rules': mapWithKeys(["Reanimation Protocols", "Their Number is Legion, Their Name is Death"])}),
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
                '_abilities': mapWithKeys(["Dread", "Enslaved Star God", "Grand Illusion", "Necrodermis", "Powers of the C'tan"]),
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
                '_rules': mapWithKeys(["Living Metal"]),
                '_abilities': mapWithKeys(["Airborne", "Hard to Hit", "Supersonic"]),
                '_explosions': [
                  jasmine.objectContaining({'_name': "Crash and Burn"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Doom Scythe Track 1"}),
                  jasmine.objectContaining({'_name': "Doom Scythe Track 2"}),
                  jasmine.objectContaining({'_name': "Doom Scythe Track 3"}),
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