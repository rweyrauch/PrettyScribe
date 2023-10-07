import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Black Templar - Test Output.ros", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Black Templar - Test Output.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 124, _points: 2087, _commandPoints: -3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - **Chapter Selection**: Black Templars",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Chapter Master in Phobos Armor",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 99, _commandPoints: -3}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chapter Master in Phobos Armor (Stratagem: Chapter Master)"}),
                ],
                '_modelList': [
                  "Chapter Master in Phobos Armor (Bolt pistol, Master-crafted instigator bolt carbine [6 pts], Combat knife, Frag & Krak grenades, Camo cloak [3 pts], Frontline Commander, Stratagem: Chapter Master [-2 CP], Stratagem: Hero of the Chapter [-1 CP])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted instigator bolt carbine"}),
                  jasmine.objectContaining({'_name': "Combat knife"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Camo cloak", "Chapter Master", "Concealed Position", "Frontline Commander", "Iron Halo", "Omni-scrambler"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Lieutenants",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 69, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Lieutenants"}),
                ],
                '_modelList': [
                  "Primaris Lieutenants (Bolt pistol, Master-crafted auto bolt rifle [4 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted auto bolt rifle"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Company Heroes", "Tactical Precision"]),
                }}),
              jasmine.objectContaining({
                '_name': "Scout Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Scout"}),
                  jasmine.objectContaining({'_name': "Scout Sergeant"}),
                ],
                '_modelList': [
                  "Scout Squad (5x Bolt pistol, 5x Boltgun, 5x Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Concealed Positions"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 111, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "6x Space Marine (7x Bolt pistol, Boltgun, Grav-gun [10 pts], 7x Frag & Krak grenades)",
                  "Space Marine Sergeant (2x Bolt pistol, Boltgun, Grav-gun [10 pts], 2x Frag & Krak grenades, Melta bombs [5 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Grav-gun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Melta bomb"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tactical Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "4x Space Marine (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Space Marine Sergeant (Bolt pistol, Boltgun, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads"]),
                }}),
            ],
            '_rules': new Map([
              ["Bolter Discipline", jasmine.any(String)],
              ["Angels of Death", jasmine.any(String)],
              ["Shock Assault", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Righteous Zeal", jasmine.any(String)],
            ]),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - **Chapter Selection**: Black Templars",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Chaplain Grimaldus",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaplain Grimaldus"}),
                ],
                '_modelList': [
                  "Chaplain Grimaldus (Plasma pistol, Artificer Crozius, Frag & Krak grenades, 1. Litany of Divine Protection, 3. Vow of Retribution, Litany of Hate)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Artificer Crozius"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["1. Litany of Divine Protection", "3. Vow of Retribution", "Devout Puritan", "Litanies of Battle (Chaplain Grimaldus)", "Litany of Hate", "Rosarius", "Spiritual Leader", "Unmatched Zeal"]),
                }}),
              jasmine.objectContaining({
                '_name': "The Emperor's Champion",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Emperor's Champion"}),
                ],
                '_modelList': [
                  "The Emperor's Champion (Bolt pistol, Black Sword, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Black Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Armour of Faith", "Sigismund's Honour", "Skilful Parry", "Slayer of Champions"]),
                }}),
              jasmine.objectContaining({
                '_name': "Crusader Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Initiate"}),
                  jasmine.objectContaining({'_name': "Sword Brother"}),
                ],
                '_modelList': [
                  "3x Initiate w/Chainsword (Bolt pistol, Chainsword, Frag & Krak grenades)",
                  "Initiate w/Heavy or Melee Weapon (Bolt pistol, Lascannon [25 pts], Frag & Krak grenades)",
                  "Sword Brother (Bolt pistol, Power axe [5 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Lascannon"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Power axe"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Paired Combatants"]),
                }}),
              jasmine.objectContaining({
                '_name': "Crusader Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 108, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Initiate"}),
                  jasmine.objectContaining({'_name': "Neophyte"}),
                  jasmine.objectContaining({'_name': "Sword Brother"}),
                ],
                '_modelList': [
                  "4x Initiate (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Initiate w/Special Weapon (Bolt pistol, Grav-gun [10 pts], Frag & Krak grenades)",
                  "Neophyte w/Shotgun (Astartes shotgun, Bolt pistol, Frag & Krak grenades)",
                  "Sword Brother (Bolt pistol, Power fist [9 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Astartes shotgun"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Grav-gun"}),
                  jasmine.objectContaining({'_name': "Power fist"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Paired Combatants"]),
                }}),
              jasmine.objectContaining({
                '_name': "Crusader Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 143, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Initiate"}),
                  jasmine.objectContaining({'_name': "Neophyte"}),
                  jasmine.objectContaining({'_name': "Sword Brother"}),
                ],
                '_modelList': [
                  "4x Initiate (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Initiate w/Chainsword (Bolt pistol, Chainsword, Frag & Krak grenades)",
                  "Initiate w/Heavy or Melee Weapon (Bolt pistol, Heavy bolter [10 pts], Frag & Krak grenades)",
                  "Neophyte w/Boltgun (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Neophyte w/Combat Knife (Bolt pistol, Combat knife, Frag & Krak grenades)",
                  "Neophyte w/Shotgun (Astartes shotgun, Bolt pistol, Frag & Krak grenades)",
                  "Sword Brother (Bolt pistol, Power fist [9 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Astartes shotgun"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Combat knife"}),
                  jasmine.objectContaining({'_name': "Power fist"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Paired Combatants"]),
                }}),
            ],
            '_rules': new Map([
              ["Angels of Death", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Righteous Zeal", jasmine.any(String)],
            ]),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - **Chapter Selection**: Black Templars",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Lieutenants in Phobos Armor",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 81, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lieutenant in Phobos Armour"}),
                ],
                '_modelList': [
                  "Lieutenant in Phobos Armour (Bolt pistol, Master-crafted occulus bolt rifle [4 pts], Paired Combat Blades, Frag & Krak grenades, Grav-chute [2 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted occulus bolt rifle"}),
                  jasmine.objectContaining({'_name': "Paired Combat Blades"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Company Heroes", "Grav-chute", "Tactical Precision", "Terror Troops"]),
                }}),
              jasmine.objectContaining({
                '_name': "Centurion Devastator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 210, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Centurion"}),
                  jasmine.objectContaining({'_name': "Centurion Sergeant"}),
                ],
                '_modelList': [
                  "Centurion Devastator Squad (3x Two Heavy Bolters [60 pts], 3x Hurricane bolter [30 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Hurricane bolter"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Decimator Protocols", "Omniscope"]),
                }}),
              jasmine.objectContaining({
                '_name': "Devastator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 135, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "Devastator Squad (5x Bolt pistol, Grav-cannon and grav-amp [20 pts], Grav-pistol [8 pts], 2x Heavy bolter [20 pts], Multi-melta [22 pts], Chainsword, 5x Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Grav-cannon and grav-amp"}),
                  jasmine.objectContaining({'_name': "Grav-pistol"}),
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Multi-melta"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Signum"]),
                }}),
              jasmine.objectContaining({
                '_name': "Eliminator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 72, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Eliminator"}),
                  jasmine.objectContaining({'_name': "Eliminator Sergeant"}),
                ],
                '_modelList': [
                  "Eliminator Sergeant (Bolt pistol, Bolt sniper rifle [3 pts], Frag & Krak grenades, Camo cloak [3 pts])",
                  "2x Eliminator with Bolt Sniper (Bolt pistol, Bolt sniper rifle [3 pts], Frag & Krak grenades, Camo cloak [3 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Executioner round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Hyperfrag round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Mortis round"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Camo cloaks", "Concealed Positions", "Covering Fire", "Guided Aim"]),
                }}),
              jasmine.objectContaining({
                '_name': "Repulsor Executioner",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 327, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Repulsor Executioner"}),
                ],
                '_modelList': [
                  "Repulsor Executioner (2x Fragstorm Grenade Launcher [8 pts], Heavy Onslaught Gatling Cannon [30 pts], Icarus Rocket Pod [6 pts], Ironhail Heavy Stubber [6 pts], Macro Plasma Incinerator [31 pts], 2x Storm bolter [4 pts], Twin Heavy Bolter [17 pts], Twin Icarus Ironhail Heavy Stubber [10 pts], Auto Launchers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Icarus Rocket Pod"}),
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Macro Plasma Incinerator, Standard"}),
                  jasmine.objectContaining({'_name': "Macro Plasma Incinerator, Supercharged"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Twin Heavy Bolter"}),
                  jasmine.objectContaining({'_name': "Twin Icarus Ironhail Heavy Stubber"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D6)"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aquilon Optics", "Auto Launchers", "Hover Tank", "Power of the Machine Spirit", "Repulsor Field"]),
                  "Transport": mapWithKeys(["Transport"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Repulsor Executioner 1"}),
                  jasmine.objectContaining({'_name': "Repulsor Executioner 2"}),
                  jasmine.objectContaining({'_name': "Repulsor Executioner 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Drop Pod",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 65, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Drop Pod"}),
                ],
                '_modelList': [
                  "Drop Pod (Storm bolter [2 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Drop Pod Assault", "Immobile"]),
                  "Transport": mapWithKeys(["Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Repulsor",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 292, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Repulsor"}),
                ],
                '_modelList': [
                  "Repulsor (Heavy Onslaught Gatling Cannon [30 pts], Icarus Ironhail Heavy Stubber [6 pts], 2x Ironhail Heavy Stubber [12 pts], 2x Krakstorm Grenade Launcher [8 pts], 2x Storm Bolters [4 pts], Twin heavy bolter [17 pts], Auto Launchers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Icarus Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Krakstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Twin heavy bolter"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D6)"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Auto Launchers", "Hover Tank", "Power of the Machine Spirit", "Repulsor Field"]),
                  "Transport": mapWithKeys(["Transport"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Repulsor 1"}),
                  jasmine.objectContaining({'_name': "Repulsor 2"}),
                  jasmine.objectContaining({'_name': "Repulsor 3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Angels of Death", jasmine.any(String)],
              ["Explodes (6\"/D6)", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Righteous Zeal", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});