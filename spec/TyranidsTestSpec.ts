import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Tyranids Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Tyranids Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 116, _points: 1798, _commandPoints: 6}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Abominant",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Abominant"}),
                ],
                '_modelList': [
                  "Abominant (Familiar Claws, Power Sledgehammer, Rending Claw)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Familiar Claws"}),
                  jasmine.objectContaining({'_name': "Power Sledgehammer"}),
                  jasmine.objectContaining({'_name': "Rending Claw(s)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Magus",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 92, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Familiar"}),
                  jasmine.objectContaining({'_name': "Magus"}),
                ],
                '_modelList': [
                  "Magus (Autopistol, Cultist Knife, Force stave, Power: Psychic Stimulus)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Cultist Knife"}),
                  jasmine.objectContaining({'_name': "Force stave"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Psychic Stimulus"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Magus"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Acolyte Hybrids",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 52, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Acolyte Hybrid"}),
                  jasmine.objectContaining({'_name': "Acolyte Leader"}),
                ],
                '_modelList': [
                  "4x Acolyte Hybrid (Autopistol, Cultist Knife, Rending Claw, Blasting Charges)",
                  "Acolyte Hybrid (Heavy Weapon) (Autopistol, Heavy Rock Saw, Blasting Charges)",
                  "Acolyte Leader (Autopistol, Cultist Knife, Rending Claw, Blasting Charges)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Cultist Knife"}),
                  jasmine.objectContaining({'_name': "Heavy Rock Saw"}),
                  jasmine.objectContaining({'_name': "Rending Claw(s)"}),
                  jasmine.objectContaining({'_name': "Blasting Charge"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Brood Brothers Infantry Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 94, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Brood Brother"}),
                  jasmine.objectContaining({'_name': "Brood Brothers Leader"}),
                  jasmine.objectContaining({'_name': "Brood Brothers Weapons Team"}),
                ],
                '_modelList': [
                  "9x Brood Brother (Lasgun, Frag Grenades)",
                  "Brood Brother (Flamer) (Flamer, Frag Grenades)",
                  "Brood Brother (Grenade) (Grenade Launcher, Frag Grenades)",
                  "Brood Brother (Vox-caster) (Lasgun, Frag Grenades, Cult Vox-caster)",
                  "Brood Brothers Leader (Laspistol, Chainsword, Frag Grenades)",
                  "Brood Brothers Weapons Team (Lascannon, Lasgun, Frag Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Grenade Launcher (Frag)"}),
                  jasmine.objectContaining({'_name': "Grenade Launcher (Krak)"}),
                  jasmine.objectContaining({'_name': "Lascannon"}),
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Laspistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag Grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Neophyte Hybrids",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 88, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Neophyte Hybrid"}),
                  jasmine.objectContaining({'_name': "Neophyte Leader"}),
                ],
                '_modelList': [
                  "9x Neophyte Hybrid (Autogun, Autopistol, Blasting Charges)",
                  "Neophyte Hybrid (Flamer) (Autopistol, Flamer, Blasting Charges)",
                  "Neophyte Hybrid (Lasgun) (Autopistol, Lasgun, Blasting Charges)",
                  "Neophyte Hybrid (Mining) (Autopistol, Mining Laser, Blasting Charges)",
                  "Neophyte Hybrid (Shotgun) (Autopistol, Shotgun, Blasting Charges)",
                  "Neophyte Leader (Autogun, Autopistol, Blasting Charges)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autogun"}),
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Lasgun"}),
                  jasmine.objectContaining({'_name': "Mining Laser"}),
                  jasmine.objectContaining({'_name': "Shotgun"}),
                  jasmine.objectContaining({'_name': "Blasting Charge"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Atalan Jackals",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 59, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Atalan Jackal"}),
                  jasmine.objectContaining({'_name': "Atalan Leader"}),
                ],
                '_modelList': [
                  "3x Atalan Jackal (Autopistol, Blasting Charges)",
                  "Atalan Leader (Autopistol, Power Pick, Blasting Charges, Demolition Charge)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Power Pick"}),
                  jasmine.objectContaining({'_name': "Blasting Charge"}),
                  jasmine.objectContaining({'_name': "Demolition Charge"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Cult Leman Russ",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 173, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cult Leman Russ"}),
                ],
                '_modelList': [
                  "Cult Leman Russ (Battle Cannon, Heavy Bolter, 2x Heavy Flamer, Heavy Stubber, Hunter-killer Missile)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Battle Cannon"}),
                  jasmine.objectContaining({'_name': "Heavy bolter"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Hunter-killer missile"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Cult Leman Russ (1)"}),
                  jasmine.objectContaining({'_name': "Cult Leman Russ (2)"}),
                  jasmine.objectContaining({'_name': "Cult Leman Russ (3)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Goliath Rockgrinder",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Goliath Rockgrinder"}),
                ],
                '_modelList': [
                  "Goliath Rockgrinder (Cache of Demolition Charges, Heavy Mining Laser, Heavy Stubber, Drilldozer Blade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Cache of Demolition Charges"}),
                  jasmine.objectContaining({'_name': "Heavy Mining Laser"}),
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Drilldozer Blade"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Goliath Rockgrinder (1)"}),
                  jasmine.objectContaining({'_name': "Goliath Rockgrinder (2)"}),
                  jasmine.objectContaining({'_name': "Goliath Rockgrinder (3)"}),
                ]}),
            ]
          }),
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Broodlord",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 115, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Broodlord"}),
                ],
                '_modelList': [
                  "Broodlord (Monstrous Rending Claws, Adrenal Webs, Power: Catalyst, Power: Smite, Resonance Barb, Warlord, Warlord Trait: Instinctive Killer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Monstrous Rending Claws"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Catalyst"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Broodlord"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Hive Tyrant",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 163, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hive Tyrant"}),
                ],
                '_modelList': [
                  "Hive Tyrant (2x Monstrous Scything Talons, Prehensile Pincer Tail)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Monstrous Scything Talons"}),
                  jasmine.objectContaining({'_name': "Prehensile Pincer Tail"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Hive Tyrant"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Hive Tyrant (1)"}),
                  jasmine.objectContaining({'_name': "Hive Tyrant (3)"}),
                  jasmine.objectContaining({'_name': "Hive Tyrant (2)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Hormagaunts",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hormagaunt"}),
                ],
                '_modelList': [
                  "10x Hormagaunt (Scything Talons)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Scything Talons"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Termagants",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Termagant"}),
                ],
                '_modelList': [
                  "10x Termagant (Fleshborer) (Fleshborer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fleshborer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tyranid Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 124, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tyranid Warrior"}),
                ],
                '_modelList': [
                  "Tyranid Warrior (Devourer, Boneswords)",
                  "Tyranid Warrior (Devourer, Lash Whip and Bonesword)",
                  "Tyranid Warrior (Devourer, Rending Claws)",
                  "Tyranid Warrior (Devourer, Scything Talons)",
                  "Tyranid Warrior (Bio-cannon) (Venom Cannon, Scything Talons)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Devourer"}),
                  jasmine.objectContaining({'_name': "Venom Cannon"}),
                  jasmine.objectContaining({'_name': "Boneswords"}),
                  jasmine.objectContaining({'_name': "Lash Whip and Bonesword"}),
                  jasmine.objectContaining({'_name': "Rending Claws"}),
                  jasmine.objectContaining({'_name': "Scything Talons"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Hive Guard",
                '_cost': jasmine.objectContaining({_powerLevel: 13, _points: 176, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hive Guard"}),
                ],
                '_modelList': [
                  "3x Hive Guard (Impaler) (Impaler Cannon)",
                  "Hive Guard (Shock) (Shockcannon)",
                  "Unit Upgrades (Adrenal Glands [4 pts], Toxin Sacs [4 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Impaler Cannon"}),
                  jasmine.objectContaining({'_name': "Shockcannon"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Carnifexes",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 82, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Carnifex"}),
                ],
                '_modelList': [
                  "Carnifex (2x Monstrous Scything Talons)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Monstrous Scything Talons"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Exocrine",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 155, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Exocrine"}),
                ],
                '_modelList': [
                  "Exocrine (Bio-plasmic Cannon, Powerful Limbs)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bio-plasmic Cannon"}),
                  jasmine.objectContaining({'_name': "Powerful Limbs"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Exocrine (1)"}),
                  jasmine.objectContaining({'_name': "Exocrine (2)"}),
                  jasmine.objectContaining({'_name': "Exocrine (3)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Toxicrene",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 125, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Toxicrene"}),
                ],
                '_modelList': [
                  "Toxicrene (Chocking Spores, Massive Toxic Lashes)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Choking Spores"}),
                  jasmine.objectContaining({'_name': "Massive Toxic Lashes (Shooting)"}),
                  jasmine.objectContaining({'_name': "Massive Toxic Lashes (Melee)"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Toxicrene (1)"}),
                  jasmine.objectContaining({'_name': "Toxicrene (2)"}),
                  jasmine.objectContaining({'_name': "Toxicrene (3)"}),
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
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 5}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Hive Fleet",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  "Unit Upgrades (Hydra)"
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Stratagem: Bounty of the Hive Fleet",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: -1}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  "Unit Upgrades (1 Extra Bio-artefact [-1 CP])"
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Stratagem: Progeny of the Hive",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: -1}),
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