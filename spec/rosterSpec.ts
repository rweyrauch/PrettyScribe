import { readRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/roster.ros", function() {
    const doc = readRosterFile('test/roster.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 100,
        '_points': 1998,
        '_commandPoints': 8,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Captain in Phobos Armour",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Captain in Phobos Armour"}),
              ],
              '_modelList': [
                "Captain in Phobos Armour (Bolt pistol, Master-crafted instigator bolt carbine, Combat knife, Frag grenade, Krak grenade, Camo cloak, Frontline Commander)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Master-crafted instigator bolt carbine"}),
                jasmine.objectContaining({'_name': "Combat knife"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "The Emperor's Champion",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Emperor's Champion"}),
              ],
              '_modelList': [
                "The Emperor's Champion (Bolt pistol, Black Sword, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Black Sword"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Crusader Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Initiate"}),
                jasmine.objectContaining({'_name': "Sword Brother"}),
              ],
              '_modelList': [
                "4x Initiate w/Chainsword (Bolt pistol, Chainsword, Frag grenade, Krak grenade)",
                "Sword Brother (Bolt pistol, Power fist, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Chainsword"}),
                jasmine.objectContaining({'_name': "Power fist"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Infiltrator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Infiltrator"}),
                jasmine.objectContaining({'_name': "Infiltrator Sergeant"}),
              ],
              '_modelList': [
                "4x Infilltrator (Bolt pistol, Marksman bolt carbine, Frag grenade, Krak grenade)",
                "Infiltrator Sergeant (Bolt pistol, Marksman bolt carbine, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Marksman bolt carbine"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Intercessor Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Intercessor"}),
                jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
              ],
              '_modelList': [
                "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag grenade, Krak grenade)",
                "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Stalker Bolt Rifle"}),
                jasmine.objectContaining({'_name': "Thunder hammer"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Intercessor Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Intercessor"}),
                jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
              ],
              '_modelList': [
                "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag grenade, Krak grenade)",
                "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Stalker Bolt Rifle"}),
                jasmine.objectContaining({'_name': "Thunder hammer"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Vanguard Veteran Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine Veteran (Jump Pack)"}),
                jasmine.objectContaining({'_name': "Veteran Sergeant (Jump Pack)"}),
              ],
              '_modelList': [
                "Vanguard Veteran Squad (Grav-pistol, Relic blade, 4x Thunder hammer, 5x Frag grenade, 5x Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Grav-pistol"}),
                jasmine.objectContaining({'_name': "Relic blade"}),
                jasmine.objectContaining({'_name': "Thunder hammer"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Assault Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine (Jump Pack)"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant (Jump Pack)"}),
              ],
              '_modelList': [
                "Assault Squad (2x Bolt pistol, 3x Plasma pistol, Standard, 3x Plasma pistol, Supercharge, 4x Chainsword, 4x Frag grenade, 4x Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                jasmine.objectContaining({'_name': "Chainsword"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Suppressor Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Suppressor"}),
                jasmine.objectContaining({'_name': "Suppressor Sergeant"}),
              ],
              '_modelList': [
                "2x Suppressor (Accelerator autocannon, Bolt pistol, Frag grenade, Krak grenade, Grav-chute)",
                "Suppressor Sergeant (Accelerator autocannon, Bolt pistol, Frag grenade, Krak grenade, Grav-chute)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Accelerator autocannon"}),
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Eliminator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Eliminator"}),
                jasmine.objectContaining({'_name': "Eliminator Sergeant"}),
              ],
              '_modelList': [
                "Eliminator Sergeant (Bolt pistol, Bolt sniper rifle, Bolt sniper rifle - Executioner round, Bolt sniper rifle - Hyperfrag round, Bolt sniper rifle - Mortis round, Frag grenade, Krak grenade)",
                "2x Eliminator with Bolt Sniper (Bolt pistol, Bolt sniper rifle, Bolt sniper rifle - Executioner round, Bolt sniper rifle - Hyperfrag round, Bolt sniper rifle - Mortis round, Frag grenade, Krak grenade)"
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
              '_name': "**Chapter Selection**",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
            jasmine.objectContaining({
              '_name': "Battle-forged CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
            jasmine.objectContaining({
              '_name': "Detachment CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
          ]}),
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Chaplain Grimaldus",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Chaplain Grimaldus"}),
              ],
              '_modelList': [
                "Chaplain Grimaldus (Plasma pistol, Standard, Plasma pistol, Supercharge, Artificer Crozius, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                jasmine.objectContaining({'_name': "Artificer Crozius"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Aggressor Squad",
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
              '_name': "Redemptor Dreadnought",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Redemptor Dreadnought"}),
              ],
              '_modelList': [
                "Redemptor Dreadnought (Fragstorm Grenade Launcher, Heavy flamer, Heavy Onslaught Gatling Cannon, Redemptor Fist)"
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
              '_name': "Devastator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
              ],
              '_modelList': [
                "Devastator Squad (7x Bolt pistol, Boltgun, 4x Grav-cannon and grav-amp, Chainsword, 6x Frag grenade, 6x Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Boltgun"}),
                jasmine.objectContaining({'_name': "Grav-cannon and grav-amp"}),
                jasmine.objectContaining({'_name': "Chainsword"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Repulsor Executioner",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Repulsor Executioner"}),
              ],
              '_modelList': [
                "Repulsor Executioner (2x Fragstorm Grenade Launcher, Heavy Laser Destroyer, Heavy Onslaught Gatling Cannon, Ironhail Heavy Stubber, 2x Storm bolter, Twin Heavy Bolter, Twin Icarus Ironhail Heavy Stubber)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                jasmine.objectContaining({'_name': "Heavy Laser Destroyer"}),
                jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "Impulsor"}),
              ],
              '_modelList': [
                "Impulsor (Ironhail Heavy Stubber, Ironhail Sytalon Array, Storm bolter)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                jasmine.objectContaining({'_name': "Ironhail Sytalon Array"}),
                jasmine.objectContaining({'_name': "Storm bolter"}),
              ],
              '_woundTracker': [
                jasmine.objectContaining({'_name': "Impulsor Wound Track 1"}),
                jasmine.objectContaining({'_name': "Impulsor Wound Track 2"}),
                jasmine.objectContaining({'_name': "Impulsor Wound Track 3"}),
              ]}),
            jasmine.objectContaining({
              '_name': "**Chapter Selection**",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
            jasmine.objectContaining({
              '_name': "Cenobyte Servitors",
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
              '_name': "Detachment CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
            jasmine.objectContaining({
              '_name': "Relics of the Chapter",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
          ]}),
        ]}));
  });
});