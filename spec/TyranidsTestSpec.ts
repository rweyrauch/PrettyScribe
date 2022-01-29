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
                  "Acolyte Hybrid (Heavy Weapon) (Autopistol, Heavy Rock Saw [10 pts], Blasting Charges)",
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
                  "Brood Brother (Flamer) (Flamer [6 pts], Frag Grenades)",
                  "Brood Brother (Grenade) (Grenade Launcher [3 pts], Frag Grenades)",
                  "Brood Brother (Vox-caster) (Lasgun, Frag Grenades, Cult Vox-caster [5 pts])",
                  "Brood Brothers Leader (Laspistol, Chainsword, Frag Grenades)",
                  "Brood Brothers Weapons Team (Lascannon [20 pts], Lasgun, Frag Grenades)"
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
                  "Neophyte Hybrid (Flamer) (Autopistol, Flamer [6 pts], Blasting Charges)",
                  "Neophyte Hybrid (Lasgun) (Autopistol, Lasgun, Blasting Charges)",
                  "Neophyte Hybrid (Mining) (Autopistol, Mining Laser [12 pts], Blasting Charges)",
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
                  "Atalan Leader (Autopistol, Power Pick [9 pts], Blasting Charges, Demolition Charge [10 pts])"
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
                  "Cult Leman Russ (Battle Cannon [22 pts], Heavy Bolter [8 pts], 2x Heavy Flamer [28 pts], Heavy Stubber [2 pts], Hunter-killer Missile [6 pts])"
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
                  "Goliath Rockgrinder (Cache of Demolition Charges [10 pts], Heavy Mining Laser [15 pts], Heavy Stubber [2 pts], Drilldozer Blade)"
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
            ],
            '_rules': new Map([
              ["Cult Ambush", jasmine.any(String)],
              ["Unquestioning Loyalty", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Battle-forged CP [3 CP]",
              "No Force Org Slot - Detachment CP [5 CP]",
              "No Force Org Slot - Hive Fleet: Hydra",
              "No Force Org Slot - Stratagem: Bounty of the Hive Fleet: 1 Extra Bio-artefact [-1 CP]",
              "No Force Org Slot - Stratagem: Progeny of the Hive [-1 CP]",
            ],
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
                  "Hive Tyrant (2x Monstrous Scything Talons [20 pts], Prehensile Pincer Tail)"
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
                  "Tyranid Warrior (Devourer [4 pts], Boneswords [2 pts])",
                  "Tyranid Warrior (Devourer [4 pts], Lash Whip and Bonesword [2 pts])",
                  "Tyranid Warrior (Devourer [4 pts], Rending Claws [2 pts])",
                  "Tyranid Warrior (Devourer [4 pts], Scything Talons)",
                  "Tyranid Warrior (Bio-cannon) (Venom Cannon [12 pts], Scything Talons)"
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
                  "3x Hive Guard (Impaler) (Impaler Cannon [25 pts])",
                  "Hive Guard (Shock) (Shockcannon [21 pts])",
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
                  "Carnifex (2x Monstrous Scything Talons [15 pts])"
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
            ],
            '_rules': new Map([
              ["Hive Fleet Adaptations", jasmine.any(String)],
              ["Bounty of the Hive Fleet", jasmine.any(String)],
              ["Stratagem: Progeny of the Hive", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Swarming Insects", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});