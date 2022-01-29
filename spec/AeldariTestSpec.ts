import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Aeldari Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Aeldari Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 98, _points: 1669, _commandPoints: 9}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Faction: <Craftworld> - Craftworld Attribute: Alaitoc: Fieldcraft",
              "Battle-forged CP [3 CP]",
              "Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Farseer",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Farseer"}),
                ],
                '_modelList': [
                  "Farseer (Shuriken Pistol, Witchblade, 0. Smite, Ghosthelm, Psyker (Farseer), Rune Armour, Runes of the Farseer, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken pistol"}),
                  jasmine.objectContaining({'_name': "Witchblade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Farseer)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Jain Zar",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 115, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Jain Zar"}),
                ],
                '_modelList': [
                  "Jain Zar (Silent Death, Blade of Destruction, Acrobatic, Banshee Mask, Cry of War Unending, The Storm of Silence, War Shout)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Silent Death"}),
                  jasmine.objectContaining({'_name': "Blade of Destruction"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Dire Avengers",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Dire Avenger"}),
                ],
                '_modelList': [
                  "5x Dire Avenger (Avenger Shuriken Catapult, Plasma Grenades)",
                  "Unit Upgrades (Defence Tactics)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Avenger Shuriken Catapult"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Rangers",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ranger"}),
                ],
                '_modelList': [
                  "5x Ranger (Ranger Long Rifle, Shuriken Pistol)",
                  "Unit Upgrades (Appear Unbidden, Cameleoline Cloaks)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Ranger Long Rifle"}),
                  jasmine.objectContaining({'_name': "Shuriken pistol"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Storm Guardians",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 48, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Storm Guardian"}),
                ],
                '_modelList': [
                  "8x Storm Guardian - Aeldari Blade (Shuriken Pistol, Aeldari Blade, Plasma Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken pistol"}),
                  jasmine.objectContaining({'_name': "Aeldari Blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Wraithlord",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Wraithlord"}),
                ],
                '_modelList': [
                  "Wraithlord (2x Shuriken Catapult, Wraithbone Fists)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Catapult"}),
                  jasmine.objectContaining({'_name': "Wraithbone Fists"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Wraithlord 1."}),
                  jasmine.objectContaining({'_name': "Wraithlord 2."}),
                  jasmine.objectContaining({'_name': "Wraithlord 3."}),
                ]}),
              jasmine.objectContaining({
                '_name': "Crimson Hunter",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 168, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Crimson Hunter"}),
                ],
                '_modelList': [
                  "Crimson Hunter (2x Bright Lance, Pulse Laser, Airborne, Crash and Burn, Hard to Hit, Skyhunters, Wings of Khaine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bright Lance"}),
                  jasmine.objectContaining({'_name': "Pulse Laser"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Crimson Hunter 1."}),
                  jasmine.objectContaining({'_name': "Crimson Hunter 2."}),
                  jasmine.objectContaining({'_name': "Crimson Hunter 3."}),
                ]}),
              jasmine.objectContaining({
                '_name': "Crimson Hunter Exarch",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 190, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Crimson Hunter Exarch"}),
                ],
                '_modelList': [
                  "Crimson Hunter Exarch (Two Bright Lances, Pulse Laser, Airborne, Crash and Burn, Hard to Hit, Marksman's Eye, Skyhunters, Wings of Khaine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bright Lance"}),
                  jasmine.objectContaining({'_name': "Pulse Laser"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Crimson Hunter Exarch 1."}),
                  jasmine.objectContaining({'_name': "Crimson Hunter Exarch 2."}),
                  jasmine.objectContaining({'_name': "Crimson Hunter Exarch 3."}),
                ]}),
            ],
            '_rules': new Map(),
            '_factionRules': new Map([
              ["Alaitoc: Fieldcraft", jasmine.any(String)],
            ]),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "Detachment Type: Mixed Detachment",
              "Detachment CP [1 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Succubus",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Succubus"}),
                ],
                '_modelList': [
                  "Succubus (Splinter pistol, Archite Glaive)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Archite glaive"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Urien Rakarth",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Urien Rakarth"}),
                ],
                '_modelList': [
                  "Urien Rakarth (Casket of Flensing, Haemonculus tools, Ichor Injector)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Casket of Flensing"}),
                  jasmine.objectContaining({'_name': "Haemonculus tools"}),
                  jasmine.objectContaining({'_name': "Ichor Injector"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Kabalite Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kabalite Warrior"}),
                  jasmine.objectContaining({'_name': "Sybarite"}),
                ],
                '_modelList': [
                  "4x Kabalite Warrior (Splinter Rifle)",
                  "Sybarite (Splinter Rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter rifle"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Wracks",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 45, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Acothyst"}),
                  jasmine.objectContaining({'_name': "Wracks"}),
                ],
                '_modelList': [
                  "Acothyst (Haemonculus tools)",
                  "4x Wracks (Haemonculus Tools)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Haemonculus tools"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Wyches",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hekatrix"}),
                  jasmine.objectContaining({'_name': "Wych"}),
                ],
                '_modelList': [
                  "Hekatrix (Splinter pistol, Hekatarii blade, Plasma Grenade)",
                  "4x Wych (Splinter Pistol, Hekatarii blade, Plasma Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Hekatarii blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Incubi",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Incubi"}),
                  jasmine.objectContaining({'_name': "Klaivex"}),
                ],
                '_modelList': [
                  "4x Incubi (Klaive)",
                  "Klaivex (Klaive)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Klaive"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Scourges",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Scourge"}),
                  jasmine.objectContaining({'_name': "Solarite"}),
                ],
                '_modelList': [
                  "4x Scourge w/ shardcarbine (Shardcarbine, Plasma Grenade)",
                  "Solarite (Shardcarbine, Plasma Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shardcarbine"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Ravager",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 140, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ravager"}),
                ],
                '_modelList': [
                  "Ravager (3x Dark Lance, Bladevanes, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Dark Lance"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Ravager"}),
                  jasmine.objectContaining({'_name': "Ravager 1"}),
                  jasmine.objectContaining({'_name': "Ravager 3"}),
                  jasmine.objectContaining({'_name': "Ravager 2"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Reaper",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Reaper"}),
                ],
                '_modelList': [
                  "Reaper (Storm Vortex Projector, Scythevanes, Sharpened prow blade, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm Vortex Projector - Beam"}),
                  jasmine.objectContaining({'_name': "Storm Vortex Projector - Blast"}),
                  jasmine.objectContaining({'_name': "Scythevanes"}),
                  jasmine.objectContaining({'_name': "Sharpened prow blade"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Reaper"}),
                  jasmine.objectContaining({'_name': "Reaper 1"}),
                  jasmine.objectContaining({'_name': "Reaper 2"}),
                  jasmine.objectContaining({'_name': "Reaper 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Talos",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 103, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Talos"}),
                ],
                '_modelList': [
                  "Talos (2x Splinter Cannon, 2x Macro-Scalpel)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter Cannon"}),
                  jasmine.objectContaining({'_name': "Macro-Scalpel"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Venom",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 65, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Venom"}),
                ],
                '_modelList': [
                  "Venom (Splinter Cannon, Twin splinter rifle, Bladevanes, Flickerfield, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter Cannon"}),
                  jasmine.objectContaining({'_name': "Twin splinter rifle"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ]}),
            ],
            '_rules': new Map([
              ["Poisoned Weapon", jasmine.any(String)],
              ["Power from Pain", jasmine.any(String)],
              ["Vanguard of the Dark City", jasmine.any(String)],
              ["Combat Drugs", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});