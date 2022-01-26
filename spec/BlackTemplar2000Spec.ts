import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Black Templar 2000.ros", async function() {
    const doc = await readZippedRosterFile('test/Black Templar 2000.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 104, _points: 1994, _commandPoints: 14}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Captain in Phobos Armour",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 99, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Captain in Phobos Armour"}),
                ],
                '_modelList': [
                  "Captain in Phobos Armour (Bolt pistol, Master-crafted instigator bolt carbine, Combat knife, Frag & Krak grenades, Camo cloak, Champion of Humanity, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted instigator bolt carbine"}),
                  jasmine.objectContaining({'_name': "Combat knife"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lieutenants in Phobos Armor",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 81, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lieutenant in Phobos Armour"}),
                ],
                '_modelList': [
                  "Lieutenant in Phobos Armour (Bolt pistol, Master-crafted occulus bolt rifle, Paired Combat Blades, Frag & Krak grenades, Grav-chute, The Armour Indomitus)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted occulus bolt rifle"}),
                  jasmine.objectContaining({'_name': "Paired Combat Blades"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
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
                ]}),
              jasmine.objectContaining({
                '_name': "Crusader Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 74, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Initiate"}),
                  jasmine.objectContaining({'_name': "Sword Brother"}),
                ],
                '_modelList': [
                  "4x Initiate (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Sword Brother (Boltgun, Power fist, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Power fist"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Infiltrator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 120, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Infiltrator"}),
                  jasmine.objectContaining({'_name': "Infiltrator Sergeant"}),
                ],
                '_modelList': [
                  "4x Infilltrator (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)",
                  "Infiltrator Sergeant (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)",
                  "Unit Upgrades (Infiltrator Comms Array [10 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Marksman bolt carbine"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 107, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
                ],
                '_modelList': [
                  "4x Intercessor (Auto Bolt Rifle, Bolt pistol, Frag & Krak grenades)",
                  "Intercessor Sergeant (Auto Bolt Rifle, Bolt pistol, Thunder hammer, Frag & Krak grenades)",
                  "Unit Upgrades (Auxiliary Grenade Launcher [1 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Auto Bolt Rifle"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 107, _commandPoints: -1}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor (Veteran Intercessors)"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant (Veteran Intercessors)"}),
                ],
                '_modelList': [
                  "4x Intercessor (Auto Bolt Rifle, Bolt pistol, Frag & Krak grenades)",
                  "Intercessor Sergeant (Auto Bolt Rifle, Bolt pistol, Thunder hammer, Frag & Krak grenades)",
                  "Unit Upgrades (Auxiliary Grenade Launcher [1 pts], Veteran Intercessors [-1 CP])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Auto Bolt Rifle"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Scout Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Scout"}),
                  jasmine.objectContaining({'_name': "Scout Sergeant"}),
                ],
                '_modelList': [
                  "Scout Squad (2x Bolt pistol, 2x Boltgun, 2x Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
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
                ]}),
              jasmine.objectContaining({
                '_name': "Aggressor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 111, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aggressor"}),
                  jasmine.objectContaining({'_name': "Aggressor Sergeant"}),
                ],
                '_modelList': [
                  "2x Aggressor (Auto Boltstorm Gauntlets, Fragstorm Grenade Launcher)",
                  "Aggressor Sergeant (Auto Boltstorm Gauntlets, Fragstorm Grenade Launcher)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Auto Boltstorm Gauntlets (Shooting)"}),
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Auto Boltstorm Gauntlets (Melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Cenobyte Servitors",
                '_cost': jasmine.objectContaining({_powerLevel: 1, _points: 6, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cenobyte Servitors"}),
                ],
                '_modelList': [
                  "Cenobyte Servitors (3x Close Combat Weapon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Close Combat Weapon"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Redemptor Dreadnought",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 157, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought"}),
                ],
                '_modelList': [
                  "Redemptor Dreadnought (2x Fragstorm Grenade Launchers, Heavy flamer, Heavy Onslaught Gatling Cannon, Redemptor Fist)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Redemptor Fist"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 1"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 2"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Assault Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine (Jump Pack)"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant (Jump Pack)"}),
                ],
                '_modelList': [
                  "Assault Squad (2x Bolt pistol/Chainsword, 2x Frag & Krak grenades, Bolt pistol, Chainsword, Jump Pack)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Assault Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine (Jump Pack)"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant (Jump Pack)"}),
                ],
                '_modelList': [
                  "Assault Squad (2x Bolt pistol/Chainsword, 2x Frag & Krak grenades, Bolt pistol, Chainsword, Jump Pack)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Suppressor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Suppressor"}),
                  jasmine.objectContaining({'_name': "Suppressor Sergeant"}),
                ],
                '_modelList': [
                  "2x Suppressor (Accelerator autocannon, Bolt pistol, Frag & Krak grenades, Grav-chute)",
                  "Suppressor Sergeant (Accelerator autocannon, Bolt pistol, Frag & Krak grenades, Grav-chute)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Accelerator autocannon"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Eliminator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 72, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Eliminator"}),
                  jasmine.objectContaining({'_name': "Eliminator Sergeant"}),
                ],
                '_modelList': [
                  "Eliminator Sergeant (Bolt pistol, Bolt sniper rifle, Frag & Krak grenades, Camo cloak)",
                  "2x Eliminator with Bolt Sniper (Bolt pistol, Bolt sniper rifle, Frag & Krak grenades, Camo cloak)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Executioner round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Hyperfrag round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Mortis round"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Predator",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 147, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Predator"}),
                ],
                '_modelList': [
                  "Predator (Two Heavy Bolters, Storm bolter, Twin lascannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Twin lascannon"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Predator 1"}),
                  jasmine.objectContaining({'_name': "Predator 2"}),
                  jasmine.objectContaining({'_name': "Predator 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Repulsor Executioner",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 315, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Repulsor Executioner"}),
                ],
                '_modelList': [
                  "Repulsor Executioner (2x Fragstorm Grenade Launcher, Heavy Onslaught Gatling Cannon, Macro Plasma Incinerator, 2x Storm bolter, Twin Heavy Bolter, Twin Icarus Ironhail Heavy Stubber, Auto Launchers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Macro Plasma Incinerator, Standard"}),
                  jasmine.objectContaining({'_name': "Macro Plasma Incinerator, Supercharged"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Twin Heavy Bolter"}),
                  jasmine.objectContaining({'_name': "Twin Icarus Ironhail Heavy Stubber"}),
                ],
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
                  "Drop Pod (Storm bolter)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Impulsor",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 103, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Impulsor"}),
                ],
                '_modelList': [
                  "Impulsor (Ironhail Heavy Stubber, 2x Storm Bolters, Shield Dome)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 1"}),
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 2"}),
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "**Chapter Selection**",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Battle-forged CP",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 3}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Detachment CP",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 12}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
            ]
          }),
        ]}));
  });
});