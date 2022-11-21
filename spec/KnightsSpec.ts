import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Knights.ros", async function() {
    const doc = await readZippedRosterFile('test/Knights.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 90, _points: 1904, _commandPoints: 0}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Household Choice: Questor Imperialis, House Griffith, Household Tradition: Glory of the Charge",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Armiger Helverins",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 169, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Armiger Helverin"}),
                ],
                '_modelList': [
                  "Armiger Helverin (2x Armiger Autocannon, Meltagun [14 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armiger Autocannon"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Ion Shield", "Vehicle Squadron"]),
                },
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
                  "Armiger Warglaive (Meltagun [14 pts], Thermal Spear, Reaper Chain-Cleaver)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Thermal Spear"}),
                  jasmine.objectContaining({'_name': "Reaper Chain-Cleaver (Strike)"}),
                  jasmine.objectContaining({'_name': "Reaper Chain-Cleaver (Sweep)"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Ion Shield", "Vehicle Squadron"]),
                },
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
                  "Knight Castellan (Plasma Decimator [40 pts], 2x Shieldbreaker Missile [24 pts], 2x Twin Meltagun, 2x Twin Siegebreaker Cannon [70 pts], Volcano Lance [60 pts], Titanic Feet, Character (Knight Lance), Heirloom: Armour of the Sainted Ion, Warlord, Warlord Trait: Fearsome Reputation)"
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
                '_abilities': {
                  "Abilities": mapWithKeys(["Armour of the Sainted Ion", "Ion Shield", "Super-Heavy Walker"]),
                  "Warlord Trait": mapWithKeys(["Fearsome Reputation"]),
                },
                '_explosions': [
                  jasmine.objectContaining({'_name': "Dual Plasma Core Explosion"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Knight Castellan 3"}),
                  jasmine.objectContaining({'_name': "Knight Castellan 2"}),
                  jasmine.objectContaining({'_name': "Knight Castellan 1"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Knight Errant",
                '_cost': jasmine.objectContaining({_powerLevel: 22, _points: 455, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight Errant"}),
                ],
                '_modelList': [
                  "Knight Errant (Meltagun [14 pts], Stormspear Rocket Pod [45 pts], Thermal Cannon [76 pts], Thunderstrike gauntlet [35 pts], Titanic Feet)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Stormspear Rocket Pod"}),
                  jasmine.objectContaining({'_name': "Thermal Cannon"}),
                  jasmine.objectContaining({'_name': "Thunderstrike gauntlet"}),
                  jasmine.objectContaining({'_name': "Titanic Feet"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Ion Shield", "Super-Heavy Walker"]),
                },
                '_explosions': [
                  jasmine.objectContaining({'_name': "Explodes"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Knight Errant 1"}),
                  jasmine.objectContaining({'_name': "Knight Errant 2"}),
                  jasmine.objectContaining({'_name': "Knight Errant 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Knight Gallant",
                '_cost': jasmine.objectContaining({_powerLevel: 20, _points: 417, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight Gallant"}),
                ],
                '_modelList': [
                  "Knight Gallant (Heavy Stubber [2 pts], Stormspear Rocket Pod [45 pts], Reaper Chainsword [30 pts], Thunderstrike gauntlet [35 pts], Titanic Feet)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Stormspear Rocket Pod"}),
                  jasmine.objectContaining({'_name': "Reaper Chainsword"}),
                  jasmine.objectContaining({'_name': "Thunderstrike gauntlet"}),
                  jasmine.objectContaining({'_name': "Titanic Feet"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Ion Shield", "Super-Heavy Walker"]),
                },
                '_explosions': [
                  jasmine.objectContaining({'_name': "Explodes"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Knight Gallant 1"}),
                  jasmine.objectContaining({'_name': "Knight Gallant 2"}),
                  jasmine.objectContaining({'_name': "Knight Gallant 3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Knight Lance", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Glory of the Charge", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});