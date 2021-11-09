import { readRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Black Templar - Test Output.ros", function() {
    const doc = readRosterFile('test/Black Templar - Test Output.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 124,
        '_points': 2087,
        '_commandPoints': -3,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Chapter Master in Phobos Armor",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Chapter Master in Phobos Armor (Stratagem: Chapter Master)"}),
              ],
              '_modelList': [
                "Chapter Master in Phobos Armor (Bolt pistol, Master-crafted instigator bolt carbine, Combat knife, Frag grenade, Krak grenade, Camo cloak, Frontline Commander)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Master-crafted instigator bolt carbine"}),
                jasmine.objectContaining({'_name': "Combat knife"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Primaris Lieutenants",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Primaris Lieutenants"}),
              ],
              '_modelList': [
                "Primaris Lieutenants (Bolt pistol, Master-crafted auto bolt rifle, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Master-crafted auto bolt rifle"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Scout Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Scout"}),
                jasmine.objectContaining({'_name': "Scout Sergeant"}),
              ],
              '_modelList': [
                "Scout Squad (2x Bolt pistol, 2x Boltgun, 2x Frag grenade, 2x Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Boltgun"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Tactical Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
              ],
              '_modelList': [
                "6x Space Marine (7x Bolt pistol, Boltgun, Grav-gun, 7x Frag grenade, 7x Krak grenade)",
                "Space Marine Sergeant (2x Bolt pistol, Boltgun, Grav-gun, 2x Frag grenade, 2x Krak grenade, Melta bomb)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Boltgun"}),
                jasmine.objectContaining({'_name': "Grav-gun"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
                jasmine.objectContaining({'_name': "Melta bomb"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Tactical Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
              ],
              '_modelList': [
                "4x Space Marine (Bolt pistol, Boltgun, Frag grenade, Krak grenade)",
                "Space Marine Sergeant (Bolt pistol, Boltgun, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Boltgun"}),
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
                "3x Initiate w/Chainsword (Bolt pistol, Chainsword, Frag grenade, Krak grenade)",
                "Initiate w/Heavy or Melee Weapon (Bolt pistol, Lascannon, Frag grenade, Krak grenade)",
                "Sword Brother (Bolt pistol, Power axe, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Lascannon"}),
                jasmine.objectContaining({'_name': "Chainsword"}),
                jasmine.objectContaining({'_name': "Power axe"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Crusader Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Initiate"}),
                jasmine.objectContaining({'_name': "Neophyte"}),
                jasmine.objectContaining({'_name': "Sword Brother"}),
              ],
              '_modelList': [
                "4x Initiate (Bolt pistol, Boltgun, Frag grenade, Krak grenade)",
                "Initiate w/Special Weapon (Bolt pistol, Grav-gun, Frag grenade, Krak grenade)",
                "Neophyte w/Shotgun (Astartes shotgun, Bolt pistol, Frag grenade, Krak grenade)",
                "Sword Brother (Bolt pistol, Power fist, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Astartes shotgun"}),
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Boltgun"}),
                jasmine.objectContaining({'_name': "Grav-gun"}),
                jasmine.objectContaining({'_name': "Power fist"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Crusader Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Initiate"}),
                jasmine.objectContaining({'_name': "Neophyte"}),
                jasmine.objectContaining({'_name': "Neophyte"}),
                jasmine.objectContaining({'_name': "Neophyte"}),
                jasmine.objectContaining({'_name': "Sword Brother"}),
              ],
              '_modelList': [
                "4x Initiate (Bolt pistol, Boltgun, Frag grenade, Krak grenade)",
                "Initiate w/Chainsword (Bolt pistol, Chainsword, Frag grenade, Krak grenade)",
                "Initiate w/Heavy or Melee Weapon (Bolt pistol, Heavy bolter, Frag grenade, Krak grenade)",
                "Neophyte w/Boltgun (Bolt pistol, Boltgun, Frag grenade, Krak grenade)",
                "Neophyte w/Combat Knife (Bolt pistol, Combat knife, Frag grenade, Krak grenade)",
                "Neophyte w/Shotgun (Astartes shotgun, Bolt pistol, Frag grenade, Krak grenade)",
                "Sword Brother (Bolt pistol, Power fist, Frag grenade, Krak grenade)"
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
              ]}),
            jasmine.objectContaining({
              '_name': "**Chapter Selection**",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
          ]}),
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Lieutenants in Phobos Armor",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Lieutenant in Phobos Armour"}),
              ],
              '_modelList': [
                "Lieutenant in Phobos Armour (Bolt pistol, Master-crafted occulus bolt rifle, Paired Combat Blades, Frag grenade, Krak grenade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Bolt pistol"}),
                jasmine.objectContaining({'_name': "Master-crafted occulus bolt rifle"}),
                jasmine.objectContaining({'_name': "Paired Combat Blades"}),
                jasmine.objectContaining({'_name': "Frag grenade"}),
                jasmine.objectContaining({'_name': "Krak grenade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Centurion Devastator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Centurion"}),
                jasmine.objectContaining({'_name': "Centurion Sergeant"}),
              ],
              '_modelList': [
                "Centurion Devastator Squad (3x Heavy bolter, 3x Hurricane bolter)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Heavy bolter"}),
                jasmine.objectContaining({'_name': "Hurricane bolter"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Devastator Squad",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Space Marine"}),
                jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
              ],
              '_modelList': [
                "Devastator Squad (5x Bolt pistol, Grav-cannon and grav-amp, Grav-pistol, 2x Heavy bolter, Multi-melta, Chainsword, 5x Frag grenade, 5x Krak grenade)"
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
              '_name': "Repulsor Executioner",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Repulsor Executioner"}),
              ],
              '_modelList': [
                "Repulsor Executioner (2x Fragstorm Grenade Launcher, Heavy Onslaught Gatling Cannon, Icarus Rocket Pod, Ironhail Heavy Stubber, Macro Plasma Incinerator, Standard, Macro Plasma Incinerator, Supercharged, 2x Storm bolter, Twin Heavy Bolter, Twin Icarus Ironhail Heavy Stubber)"
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
              '_name': "Repulsor",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Repulsor"}),
              ],
              '_modelList': [
                "Repulsor (Heavy Onslaught Gatling Cannon, Icarus Ironhail Heavy Stubber, 2x Ironhail Heavy Stubber, 2x Krakstorm Grenade Launcher, Storm bolter, Twin heavy bolter)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                jasmine.objectContaining({'_name': "Icarus Ironhail Heavy Stubber"}),
                jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                jasmine.objectContaining({'_name': "Krakstorm Grenade Launcher"}),
                jasmine.objectContaining({'_name': "Storm bolter"}),
                jasmine.objectContaining({'_name': "Twin heavy bolter"}),
              ],
              '_woundTracker': [
                jasmine.objectContaining({'_name': "Repulsor 1"}),
                jasmine.objectContaining({'_name': "Repulsor 2"}),
                jasmine.objectContaining({'_name': "Repulsor 3"}),
              ]}),
            jasmine.objectContaining({
              '_name': "**Chapter Selection**",
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