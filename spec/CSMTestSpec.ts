import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/CSMTest.rosz", async function() {
    const doc = await readZippedRosterFile('test/CSMTest.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 185, _commandPoints: 3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Legion: Red Corsairs",
              "Gametype: Open",
              "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Dark Apostle",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Dark Apostle"}),
                  jasmine.objectContaining({'_name': "Dark Disciple"}),
                ],
                '_modelList': [
                  "2x Dark Disciple (Bolt pistol, Accursed crozius, Close combat weapon, Frag & Krak grenades)",
                  "Unit Upgrades (Chaos Undivided, Soultearer Portent, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Accursed crozius"}),
                  jasmine.objectContaining({'_name': "Close combat weapon"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Let the Galaxy Burn"]),
                '_abilities': mapWithKeys(["Dark Disciples", "Dark Zealotry (Aura)", "Demagogue (Aura)", "Icons of Destruction", "Priest", "Soultearer Portent"])}),
              jasmine.objectContaining({
                '_name': "Legionaries",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Champion"}),
                  jasmine.objectContaining({'_name': "Legionary"}),
                ],
                '_modelList': [
                  "Aspiring Champion (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Marine w/ boltgun (Bolt pistol, Boltgun, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenades"}),
                ],
                '_rules': mapWithKeys(["Let the Galaxy Burn", "Malicious Volleys"])}),
            ],
            '_rules': new Map([
              ["Armour of Contempt", jasmine.any(String)],
              ["Let the Galaxy Burn", jasmine.any(String)],
              ["Malicious Volleys", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Raiders from the Maelstrom", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});