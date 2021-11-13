import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/roster.ros", async function() {
    const doc = await readZippedRosterFile('test/roster.ros');
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
                "Captain in Phobos Armour (Bolt pistol, Master-crafted instigator bolt carbine, Combat knife, Frag & Krak grenades, Camo cloak, Frontline Commander, The Aurillian Shroud, Warlord)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "Initiate"}),
                jasmine.objectContaining({'_name': "Sword Brother"}),
              ],
              '_modelList': [
                "4x Initiate w/Chainsword (Bolt pistol, Chainsword, Frag & Krak grenades)",
                "Sword Brother (Bolt pistol, Power fist, Frag & Krak grenades)"
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
                "4x Infilltrator (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)",
                "Infiltrator Sergeant (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)"
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
                "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag & Krak grenades)",
                "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer, Frag & Krak grenades)"
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
                "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag & Krak grenades)",
                "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer, Frag & Krak grenades)"
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
                "Vanguard Veteran Squad (Grav-pistol, Relic blade, 4x Thunder hammer, 5x Frag & Krak grenades, Jump Pack, Storm shield, Storm shield, Storm shield, Storm shield)"
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
                "Assault Squad (2x Bolt pistol, 3x Plasma pistol, 4x Chainsword, 4x Frag & Krak grenades, Jump Pack)"
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
                "Chaplain Grimaldus (Plasma pistol, Artificer Crozius, Frag & Krak grenades, 1. Litany of Divine Protection, 5. Fervent Acclamation, Litany of Hate)"
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
              '_name': "Devastator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
              ],
              '_modelList': [
                "Devastator Squad (7x Bolt pistol, Boltgun, 4x Grav-cannon and grav-amp, Chainsword, 6x Frag & Krak grenades, Armorium Cherub)"
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
                "Repulsor Executioner (2x Fragstorm Grenade Launcher, Heavy Laser Destroyer, Heavy Onslaught Gatling Cannon, Ironhail Heavy Stubber, 2x Storm bolter, Twin Heavy Bolter, Twin Icarus Ironhail Heavy Stubber, Auto Launchers)"
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
                "Impulsor (Ironhail Heavy Stubber, Ironhail Skytalon Array, 2x Storm Bolters)"
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