import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Chaos SM Test.ros", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Chaos SM Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 130, _points: 1973, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Legion: Renegade Chapters",
              "No Force Org Slot - Battle-forged CP [3 CP]",
              "No Force Org Slot - Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Daemon Prince",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 156, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Daemon Prince"}),
                ],
                '_modelList': [
                  "Daemon Prince (Hellforged sword [10 pts], Malefic talon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hellforged sword"}),
                  jasmine.objectContaining({'_name': "Malefic talon"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Death to the False Emperor"]),
                }}),
              jasmine.objectContaining({
                '_name': "Lord Discordant on Helstalker",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 160, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lord Discordant on Helstalker"}),
                ],
                '_modelList': [
                  "Lord Discordant on Helstalker (Autocannon [10 pts], Bolt pistol, Bladed limbs and tail, Impaler chainglaive, Mechatendrils, Techno-virus injector, Frag & Krak grenades, 4. Hatred Incarnate, Intoxicating Elixir, Mark of Slaanesh, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autocannon"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bladed limbs and tail"}),
                  jasmine.objectContaining({'_name': "Impaler chainglaive"}),
                  jasmine.objectContaining({'_name': "Mechatendrils"}),
                  jasmine.objectContaining({'_name': "Techno-virus injector"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aura of Discord", "Daemonic", "Death to the False Emperor", "Hatred Incarnate", "Infernal Regeneration", "Intoxicating Elixir", "Spirit Thief"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Lord Discordant"}),
                  jasmine.objectContaining({'_name': "Lord Discordant1"}),
                  jasmine.objectContaining({'_name': "Lord Discordant2"}),
                  jasmine.objectContaining({'_name': "Lord Discordant3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Sorcerer",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 88, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Sorcerer"}),
                ],
                '_modelList': [
                  "Sorcerer (Bolt pistol, Force sword [8 pts], Frag & Krak grenades, No Chaos Mark, Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Force sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Sorcerer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Chaos Cultists",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Cultist"}),
                  jasmine.objectContaining({'_name': "Cultist Champion"}),
                ],
                '_modelList': [
                  "9x Chaos Cultist w/ Autogun (Autogun)",
                  "Cultist Champion (Autogun)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autogun"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Mere Mortals"]),
                }}),
              jasmine.objectContaining({
                '_name': "Chaos Space Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Champion"}),
                  jasmine.objectContaining({'_name': "Chaos Space Marine"}),
                ],
                '_modelList': [
                  "Aspiring Champion (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Marine w/ Boltgun (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor"]),
                }}),
              jasmine.objectContaining({
                '_name': "Chaos Space Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Champion"}),
                  jasmine.objectContaining({'_name': "Chaos Space Marine"}),
                ],
                '_modelList': [
                  "Aspiring Champion (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Marine w/ Boltgun (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor"]),
                }}),
              jasmine.objectContaining({
                '_name': "Chaos Terminators",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 135, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Terminator"}),
                  jasmine.objectContaining({'_name': "Chaos Terminator Champion"}),
                ],
                '_modelList': [
                  "Chaos Terminator Champion (Combi-bolter [2 pts], Chainaxe [1 pts])",
                  "4x Terminator (Combi-bolter [2 pts], Chainaxe [1 pts])",
                  "Unit Upgrades (Icon of Vengeance [5 pts], No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Combi-bolter"}),
                  jasmine.objectContaining({'_name': "Chainaxe"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Icon of Vengeance", "Teleport Strike", "Terminator Armour"]),
                }}),
              jasmine.objectContaining({
                '_name': "Mutilators",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Mutilator"}),
                ],
                '_modelList': [
                  "3x Mutilator (Fleshmetal weapons)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fleshmetal weapons"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Death to the False Emperor", "Fleshmetal Weapons", "Teleport Strike"]),
                }}),
              jasmine.objectContaining({
                '_name': "Plague Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plague Champion"}),
                  jasmine.objectContaining({'_name': "Plague Marine"}),
                ],
                '_modelList': [
                  "Plague Champion (Boltgun, Plague knife, Blight Grenades, Krak grenades)",
                  "4x Plague Marine w/ boltgun (Boltgun, Plague knife, Blight Grenades, Krak Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Plague knife"}),
                  jasmine.objectContaining({'_name': "Blight Grenades"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Disgustingly Resilient", "Vectors of Death and Disease"]),
                }}),
              jasmine.objectContaining({
                '_name': "Possessed",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Possessed"}),
                ],
                '_modelList': [
                  "5x Possessed (Horrifying Mutations)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Horrifying Mutations"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Death to the False Emperor", "Writhing Tentacles"]),
                }}),
              jasmine.objectContaining({
                '_name': "Chaos Spawn",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 20, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Spawn"}),
                ],
                '_modelList': [
                  "Chaos Spawn (Hideous mutations)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hideous mutations"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Fearsome", "Mutated Beyond Reason"]),
                  "Mutated Beyond Reason": mapWithKeys(["1 - Razor Claws", "2 - Grasping Pseudopods", "3 - Toxic Haemorrhage"]),
                }}),
              jasmine.objectContaining({
                '_name': "Obliterators",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Obliterator"}),
                ],
                '_modelList': [
                  "Obliterator (Fleshmetal guns, Crushing fists)",
                  "Unit Upgrades (No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fleshmetal guns"}),
                  jasmine.objectContaining({'_name': "Crushing fists"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Death to the False Emperor", "Fleshmetal Guns", "Teleport Strike"]),
                }}),
              jasmine.objectContaining({
                '_name': "Heldrake",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 140, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Heldrake"}),
                ],
                '_modelList': [
                  "Heldrake (Hades Autocannon [20 pts], Heldrake claws, No Chaos Mark)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hades autocannon"}),
                  jasmine.objectContaining({'_name': "Heldrake claws"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Hateful Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Crash and Burn", "Daemonic", "Infernal Regeneration"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Heldrake"}),
                  jasmine.objectContaining({'_name': "Heldrake1"}),
                  jasmine.objectContaining({'_name': "Heldrake2"}),
                  jasmine.objectContaining({'_name': "Heldrake3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Despoilers of the Galaxy (Renegade Chapters)", jasmine.any(String)],
              ["Daemonic Ritual", jasmine.any(String)],
              ["Hateful Assault", jasmine.any(String)],
              ["Hateful Volleys", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Dark Raiders", jasmine.any(String)],
            ]),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Chaos Allegiance: Chaos Undivided",
              "No Force Org Slot - Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Fateskimmer",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fateskimmer"}),
                ],
                '_modelList': [
                  "Fateskimmer (Lamprey bite, Ritual dagger, Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lamprey bite"}),
                  jasmine.objectContaining({'_name': "Ritual dagger"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Ephemeral Form", "Locus of Tzeentch"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Kairos Fateweaver",
                '_cost': jasmine.objectContaining({_powerLevel: 19, _points: 250, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kairos Fateweaver"}),
                ],
                '_modelList': [
                  "Kairos Fateweaver (Staff of Tomorrow, Bolt of Change, Boon of Change, Flickering Flames, Gaze of Fate, Infernal Gateway, Smite, Treason of Tzeentch)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Staff of Tomorrow"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Ephemeral Form", "Foretell", "Greater Daemon"]),
                  "Boon of Change - D3 Roll": mapWithKeys(["1 - Extra Limb", "2 - Mystic Strength", "3 - Iron Skin"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Bolt of Change"}),
                  jasmine.objectContaining({'_name': "Boon of Change"}),
                  jasmine.objectContaining({'_name': "Flickering Flames"}),
                  jasmine.objectContaining({'_name': "Gaze of Fate"}),
                  jasmine.objectContaining({'_name': "Infernal Gateway"}),
                  jasmine.objectContaining({'_name': "Treason of Tzeentch"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Kairos Fateweaver"}),
                  jasmine.objectContaining({'_name': "Kairos Fateweaver1"}),
                  jasmine.objectContaining({'_name': "Kairos Fateweaver2"}),
                  jasmine.objectContaining({'_name': "Kairos Fateweaver3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Bloodletters",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Bloodletter"}),
                  jasmine.objectContaining({'_name': "Bloodreaper"}),
                ],
                '_modelList': [
                  "9x Bloodletter (Hellblade)",
                  "Bloodreaper (Hellblade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hellblade"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Murderous Tide", "Unstoppable Ferocity"]),
                }}),
              jasmine.objectContaining({
                '_name': "Daemonettes",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Alluress"}),
                  jasmine.objectContaining({'_name': "Daemonette"}),
                ],
                '_modelList': [
                  "Alluress (Piercing claws)",
                  "9x Daemonette (Piercing claws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Piercing claws"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Graceful Killers", "Quicksilver Swiftness"]),
                }}),
              jasmine.objectContaining({
                '_name': "Nurglings",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 54, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Nurgling Swarm"}),
                ],
                '_modelList': [
                  "3x Nurgling Swarms (Diseased claws and teeth)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Diseased claws and teeth"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Disgustingly Resilient", "Mischief Makers", "Squishable"]),
                }}),
              jasmine.objectContaining({
                '_name': "Exalted Flamer",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Exalted Flamer"}),
                ],
                '_modelList': [
                  "Exalted Flamer (Fire of Tzeentch, Tongues of flame)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fire of Tzeentch (Blue)"}),
                  jasmine.objectContaining({'_name': "Fire of Tzeentch (Pink)"}),
                  jasmine.objectContaining({'_name': "Tongues of flame"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Ephemeral Form"]),
                }}),
              jasmine.objectContaining({
                '_name': "Seekers",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Heartseeker"}),
                  jasmine.objectContaining({'_name': "Seeker"}),
                ],
                '_modelList': [
                  "Heartseeker (Lashing tongue, Piercing claws)",
                  "4x Seeker (Lashing tongue, Piercing claws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lashing tongue"}),
                  jasmine.objectContaining({'_name': "Piercing claws"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Quicksilver Swiftness", "Unholy Speed"]),
                }}),
              jasmine.objectContaining({
                '_name': "Seeker Chariot",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Seeker Chariot"}),
                ],
                '_modelList': [
                  "Seeker Chariot (2x Lashes of Torment, Lashing tongues, 2x Piercing claws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Lashes of Torment"}),
                  jasmine.objectContaining({'_name': "Lashing tongues"}),
                  jasmine.objectContaining({'_name': "Piercing claws"}),
                ],
                '_rules': mapWithKeys(["Daemonic Ritual"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Quicksilver Swiftness", "Scything Impact"]),
                }}),
            ],
            '_rules': new Map([
              ["Daemonic Ritual", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});