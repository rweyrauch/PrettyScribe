import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Xenos Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Xenos Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 51, _points: 831, _commandPoints: -2}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Clan Kultur: Bad Moons",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Big Mek [Legends]",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 59, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Big Mek"}),
                  jasmine.objectContaining({'_name': "Grot Oiler"}),
                ],
                '_modelList': [
                  "Grot Oiler (Slugga, Choppa, Stikkbombs)",
                  "Unit Upgrades (Ard as Nails, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Slugga"}),
                  jasmine.objectContaining({'_name': "Choppa"}),
                  jasmine.objectContaining({'_name': "Stikkbomb"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Ard as Nails", "Big Mekaniak", "Grot Oiler"]),
                }}),
              jasmine.objectContaining({
                '_name': "Weirdboy",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 62, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Weirdboy"}),
                ],
                '_modelList': [
                  "Weirdboy (Weirdboy Staff, 3. Da Jump)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Weirdboy Staff"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Waaagh! Energy"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Da Jump"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Boyz",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ork Boy"}),
                ],
                '_modelList': [
                  "10x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Slugga"}),
                  jasmine.objectContaining({'_name': "Choppa"}),
                  jasmine.objectContaining({'_name': "Stikkbomb"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Green Tide"]),
                }}),
              jasmine.objectContaining({
                '_name': "Boyz",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 77, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Boss Nob"}),
                  jasmine.objectContaining({'_name': "Ork Boy"}),
                ],
                '_modelList': [
                  "Boss Nob (Slugga, Choppa, Stikkbombs)",
                  "2x Ork Boy W/ Shoota (Shoota, Stikkbombs)",
                  "8x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shoota"}),
                  jasmine.objectContaining({'_name': "Slugga"}),
                  jasmine.objectContaining({'_name': "Choppa"}),
                  jasmine.objectContaining({'_name': "Stikkbomb"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Green Tide"]),
                }}),
              jasmine.objectContaining({
                '_name': "Boyz",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 77, _commandPoints: -2}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Boss Nob"}),
                  jasmine.objectContaining({'_name': "Ork Boy"}),
                ],
                '_modelList': [
                  "Boss Nob (Slugga, Choppa, Stikkbombs)",
                  "10x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)",
                  "Unit Upgrades ('Ard Boyz [-2 CP])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Slugga"}),
                  jasmine.objectContaining({'_name': "Choppa"}),
                  jasmine.objectContaining({'_name': "Stikkbomb"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["'Ard Boyz (2 CP)", "Green Tide"]),
                }}),
              jasmine.objectContaining({
                '_name': "Painboy on Warbike [Legends]",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Painboy on Warbike"}),
                ],
                '_modelList': [
                  "Painboy on Warbike [Legends] (2x Dakkagun, 'Urty Syringe, Killsaw [15 pts], Super Cybork Body)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Dakkagun"}),
                  jasmine.objectContaining({'_name': "'Urty Syringe"}),
                  jasmine.objectContaining({'_name': "Killsaw"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka", "Mob Rule"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Dok's Tools", "Sawbonez", "Super Cybork Body"]),
                }}),
              jasmine.objectContaining({
                '_name': "Deff Dread Mob",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Deff Dread"}),
                ],
                '_modelList': [
                  "Deff Dread (2x Big Shoota [10 pts], 2x Dread Klaw [30 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Big Shoota"}),
                  jasmine.objectContaining({'_name': "Dread Klaw"}),
                ],
                '_rules': mapWithKeys(["'Ere We Go!", "Dakka Dakka Dakka"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Dread Mob", "Explodes"]),
                }}),
              jasmine.objectContaining({
                '_name': "Killa Kans",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Killa Kan"}),
                ],
                '_modelList': [
                  "Killa Kan (Big Shoota [5 pts], Kan Klaw)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Big Shoota"}),
                  jasmine.objectContaining({'_name': "Kan Klaw"}),
                ],
                '_rules': mapWithKeys(["Dakka Dakka Dakka", "Grots"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes", "Scrag 'Em"]),
                }}),
              jasmine.objectContaining({
                '_name': "Blitza-bommer",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 133, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Blitza-bommer"}),
                ],
                '_modelList': [
                  "Blitza-bommer (Big Shoota [5 pts], 2x Supa Shoota [20 pts], 2x Boom Bomb)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Big Shoota"}),
                  jasmine.objectContaining({'_name': "Supa Shoota"}),
                ],
                '_rules': mapWithKeys(["Airborne", "Crash and Burn", "Dakka Dakka Dakka", "Hard to Hit"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Boom Bomb", "Grot Gunner", "Supersonic"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "BlitzaBom1"}),
                  jasmine.objectContaining({'_name': "BlitzaBom2"}),
                  jasmine.objectContaining({'_name': "BlitzaBom3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Dakkajet",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 128, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Dakkajet"}),
                ],
                '_modelList': [
                  "Dakkajet (4x Supa Shoota [40 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Supa Shoota"}),
                ],
                '_rules': mapWithKeys(["Airborne", "Crash and Burn", "Dakka Dakka Dakka", "Hard to Hit"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["All Da Dakka", "Supersonic"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Dakkajet1"}),
                  jasmine.objectContaining({'_name': "Dakkajet2"}),
                  jasmine.objectContaining({'_name': "Dakkajet3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Dis Is Ours! Zog Off!", jasmine.any(String)],
              ["'Ere We Go!", jasmine.any(String)],
              ["Mob Rule", jasmine.any(String)],
              ["Dakka Dakka Dakka", jasmine.any(String)],
              ["Grots", jasmine.any(String)],
              ["Airborne", jasmine.any(String)],
              ["Hard to Hit", jasmine.any(String)],
              ["Crash and Burn", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Bad Moons", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});