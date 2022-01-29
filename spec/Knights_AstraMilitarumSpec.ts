import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Knights_AstraMilitarum.rosz", async function() {
    const doc = await readZippedRosterFile('test/Knights_AstraMilitarum.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 106, _points: 1964, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Household Choice: Questor Imperialis, House Griffith, Household Tradition: Glory of the Charge",
              "Detachment CP",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Armiger Helverins",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 169, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Armiger Helverin"}),
                ],
                '_modelList': [
                  "Armiger Helverin (2x Armiger Autocannon, Meltagun)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armiger Autocannon"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Explodes (Armiger)"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Armiger Helverin 1"}),
                  jasmine.objectContaining({'_name': "Armiger Helverin 2"}),
                  jasmine.objectContaining({'_name': "Armiger Helverin 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Armiger Warglaives",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 159, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Armiger Warglaive"}),
                ],
                '_modelList': [
                  "Armiger Warglaive (Meltagun, Thermal Spear, Reaper Chain-Cleaver)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Thermal Spear"}),
                  jasmine.objectContaining({'_name': "Reaper Chain-Cleaver (Strike)"}),
                  jasmine.objectContaining({'_name': "Reaper Chain-Cleaver (Sweep)"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Explodes (Armiger)"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Armiger Warglaive 1"}),
                  jasmine.objectContaining({'_name': "Armiger Warglaive 2"}),
                  jasmine.objectContaining({'_name': "Armiger Warglaive 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Knight Castellan",
                '_cost': jasmine.objectContaining({_powerLevel: 30, _points: 704, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight Castellan"}),
                ],
                '_modelList': [
                  "Knight Castellan (Plasma Decimator, 2x Shieldbreaker Missile, 2x Twin Meltagun, 2x Twin Siegebreaker Cannon, Volcano Lance, Titanic Feet, Character (Knight Lance), Heirloom: Armour of the Sainted Ion, Warlord, Warlord Trait: Fearsome Reputation)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma Decimator (Standard)"}),
                  jasmine.objectContaining({'_name': "Plasma Decimator (Supercharge)"}),
                  jasmine.objectContaining({'_name': "Shieldbreaker Missile"}),
                  jasmine.objectContaining({'_name': "Twin Meltagun"}),
                  jasmine.objectContaining({'_name': "Twin Siegebreaker Cannon"}),
                  jasmine.objectContaining({'_name': "Volcano Lance"}),
                  jasmine.objectContaining({'_name': "Titanic Feet"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Dual Plasma Core Explosion"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Knight Castellan 3"}),
                  jasmine.objectContaining({'_name': "Knight Castellan 2"}),
                  jasmine.objectContaining({'_name': "Knight Castellan 1"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Knight Crusader",
                '_cost': jasmine.objectContaining({_powerLevel: 25, _points: 452, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight Crusader"}),
                ],
                '_modelList': [
                  "Knight Crusader (Avenger Gatling Cannon, Heavy Flamer, Heavy Stubber, Thermal Cannon, Titanic Feet)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Avenger Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Thermal Cannon"}),
                  jasmine.objectContaining({'_name': "Titanic Feet"}),
                ],
                '_explosions': [
                  jasmine.objectContaining({'_name': "Explodes"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Knight Crusader 1"}),
                  jasmine.objectContaining({'_name': "Knight Crusader 2"}),
                  jasmine.objectContaining({'_name': "Knight Crusader 3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Knight Lance", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "Detachment CP",
              "Regimental Doctrine: Astra Millitarum",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Company Commander",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Company Commander"}),
                ],
                '_modelList': [
                  "Company Commander (Laspistol, Chainsword, Frag grenades, Display Astra Militarum Orders)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Company Commander",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Company Commander"}),
                ],
                '_modelList': [
                  "Company Commander (Laspistol, Chainsword, Frag grenades, Display Astra Militarum Orders)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
            ],
            '_rules': new Map([
              ["Defenders of Humanity", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "Detachment CP",
              "Regimental Doctrine: Regiment: Catachan",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Company Commander",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Company Commander"}),
                ],
                '_modelList': [
                  "Company Commander (Laspistol, Chainsword, Frag grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Company Commander",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Company Commander"}),
                ],
                '_modelList': [
                  "Company Commander (Laspistol, Chainsword, Frag grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Guardsman"}),
                  jasmine.objectContaining({'_name': "Sergeant"}),
                ],
                '_modelList': [
                  "9x Guardsman (Lasgun, Frag grenade)",
                  "Sergeant (Laspistol, Frag grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Bullgryns",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 120, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Bullgryn"}),
                  jasmine.objectContaining({'_name': "Bullgryn Bone 'ead"}),
                ],
                '_modelList': [
                  "2x Bullgryn (Grenadier Gauntlet, Frag Bombs, Slabshield)",
                  "Bullgryn Bone 'ead (Grenadier Gauntlet, Frag Bombs, Slabshield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Grenadier Gauntlet"}),
                  jasmine.objectContaining({'_name': "Frag Bombs"}),
                ]}),
            ],
            '_rules': new Map([
              ["Avalanche of Muscle", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Brutal Strength", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});