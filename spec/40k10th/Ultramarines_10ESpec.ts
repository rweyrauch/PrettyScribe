import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Ultramarines_10E.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k10th/Ultramarines_10E.rosz');
    const roster = Wh40k.CreateRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 810}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Show/Hide Options: Legends are visible, Unaligned Forces are visible, Unaligned Fortifications are visible, Imperial Knights are visible, Agents of the Imperium are visible, Titans are visible",
              "Battle Size: 1. Incursion (1000 Point limit)",
              "Detachment: Gladius Task Force",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Assault Intercessor Squad",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Assault Intercessor Squad"}),
                ],
                '_modelList': [
                  "Assault Intercessor Sergeant (Astartes Chainsword, Heavy Bolt Pistol)",
                  "4x Assault Intercessors (Astartes Chainsword, Heavy Bolt Pistol)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Astartes Chainsword"}),
                  jasmine.objectContaining({'_name': "Heavy Bolt Pistol"}),
                ],
                '_rules': mapWithKeys(["Oath of Moment", "Pistol"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Shock Assault"]),
                }}),
              jasmine.objectContaining({
                '_name': "Assault Intercessor Squad",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Assault Intercessor Squad"}),
                ],
                '_modelList': [
                  "Assault Intercessor Sergeant (Astartes Chainsword, Heavy Bolt Pistol)",
                  "4x Assault Intercessors (Astartes Chainsword, Heavy Bolt Pistol)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Astartes Chainsword"}),
                  jasmine.objectContaining({'_name': "Heavy Bolt Pistol"}),
                ],
                '_rules': mapWithKeys(["Oath of Moment", "Pistol"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Shock Assault"]),
                }}),
              jasmine.objectContaining({
                '_name': "Eliminator Squad",
                '_cost': jasmine.objectContaining({_points: 75}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Eliminator Squad"}),
                ],
                '_modelList': [
                  "2x Eliminator (Bolt Pistol, Bolt Sniper Rifle, Close Combat Weapon)",
                  "Eliminator Sergeant (Bolt Pistol, Bolt Sniper Rifle, Close Combat Weapon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Bolt Sniper Rifle"}),
                  jasmine.objectContaining({'_name': "Close Combat Weapon"}),
                ],
                '_rules': mapWithKeys(["Heavy", "Infiltrators", "Oath of Moment", "Pistol", "Precision", "Stealth"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Mark the Target", "Reposition Under Covering Fire"]),
                }}),
              jasmine.objectContaining({
                '_name': "Lieutenant in Phobos Armour",
                '_cost': jasmine.objectContaining({_points: 60}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lieutenant in Phobos Armor"}),
                ],
                '_modelList': [
                  "Lieutenant in Phobos Armour (Bolt Pistol, Master-crafted Scoped Bolt Carbine, Paired Combat Blades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted Scoped Bolt Carbine"}),
                  jasmine.objectContaining({'_name': "Paired Combat Blades"}),
                ],
                '_rules': mapWithKeys(["Deep Strike", "Infiltrators", "Leader", "Oath of Moment", "Pistol", "Scouts 6\"", "Sustained Hits"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Leader", "Shoot and Fade", "Tactical Precision"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Captain",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Captain"}),
                ],
                '_modelList': [
                  "Primaris Captain (Bolt Pistol, Close Combat Weapon, Master-crafted Bolt Rifle, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Close Combat Weapon"}),
                  jasmine.objectContaining({'_name': "Master-crafted Bolt Rifle"}),
                ],
                '_rules': mapWithKeys(["Leader", "Oath of Moment", "Pistol"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Finest Hour", "Invulnerable Save", "Leader", "Rites of Battle"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Lieutenant",
                '_cost': jasmine.objectContaining({_points: 75}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Lieutenant"}),
                ],
                '_modelList': [
                  "Primaris Lieutenant (Bolt Pistol, Close Combat Weapon, Master-crafted Bolt Rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Close Combat Weapon"}),
                  jasmine.objectContaining({'_name': "Master-crafted Bolt Rifle"}),
                ],
                '_rules': mapWithKeys(["Leader", "Oath of Moment", "Pistol"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Leader", "Tactical Precision", "Target Priority"]),
                }}),
              jasmine.objectContaining({
                '_name': "Outrider Squad",
                '_cost': jasmine.objectContaining({_points: 105}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Outrider Squad"}),
                ],
                '_modelList': [
                  "2x Outrider (Astartes Chainsword, Heavy Bolt Pistol, Twin Bolt Rifle)",
                  "Outrider Sergeant (Astartes Chainsword, Heavy Bolt Pistol, Twin Bolt Rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Astartes Chainsword"}),
                  jasmine.objectContaining({'_name': "Heavy Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Twin Bolt Rifle"}),
                ],
                '_rules': mapWithKeys(["Oath of Moment", "Pistol", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo Boost"]),
                }}),
              jasmine.objectContaining({
                '_name': "Impulsor",
                '_cost': jasmine.objectContaining({_points: 85}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Impulsor"}),
                ],
                '_modelList': [
                  "Impulsor (Bellicatus Missile Array, Armoured Hull, 2 Fragstorm Grenade Launchers, Ironhail Heavy Stubber)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "➤ Bellicatus Missile Array - Frag"}),
                  jasmine.objectContaining({'_name': "➤ Bellicatus Missile Array - Icarus"}),
                  jasmine.objectContaining({'_name': "➤ Bellicatus Missile Array - Krak"}),
                  jasmine.objectContaining({'_name': "Armoured Tracks"}),
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                ],
                '_rules': mapWithKeys(["Anti-", "Blast", "Deadly Demise D3", "Firing Deck 6", "Oath of Moment", "Rapid Fire"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Assault Vehicle", "Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Land Speeder Storm",
                '_cost': jasmine.objectContaining({_points: 70}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Land Speeder Storm"}),
                ],
                '_modelList': [
                  "Land Speeder Storm (Cerberus Launcher, Heavy Bolter)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Cerberus Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy Bolter"}),
                ],
                '_rules': mapWithKeys(["Blast", "Deadly Demise 1", "Firing Deck 6", "Oath of Moment", "Sustained Hits"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Storm Assault", "Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Razorback",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Razorback"}),
                ],
                '_modelList': [
                  "Razorback (Armoured Tracks, Hunter Killer Missile, Storm Bolter, Twin Heavy Bolter)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armoured Tracks"}),
                  jasmine.objectContaining({'_name': "Hunter Killer Missile"}),
                  jasmine.objectContaining({'_name': "Storm Bolter"}),
                  jasmine.objectContaining({'_name': "Twin Heavy Bolter"}),
                ],
                '_rules': mapWithKeys(["Deadly Demise D3", "Oath of Moment", "One Shot", "Rapid Fire", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Fire Support", "Transport"]),
                }}),
            ],
            '_rules': new Map([
              ["Oath of Moment", jasmine.any(String)],
              ["Pistol", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
              ["Leader", jasmine.any(String)],
              ["Sustained Hits", jasmine.any(String)],
              ["One Shot", jasmine.any(String)],
              ["Rapid Fire", jasmine.any(String)],
              ["Deadly Demise D3", jasmine.any(String)],
              ["Precision", jasmine.any(String)],
              ["Heavy", jasmine.any(String)],
              ["Infiltrators", jasmine.any(String)],
              ["Stealth", jasmine.any(String)],
              ["Scouts 6\"", jasmine.any(String)],
              ["Deep Strike", jasmine.any(String)],
              ["Blast", jasmine.any(String)],
              ["Anti-", jasmine.any(String)],
              ["Firing Deck 6", jasmine.any(String)],
              ["Deadly Demise 1", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Combat Doctrines", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});