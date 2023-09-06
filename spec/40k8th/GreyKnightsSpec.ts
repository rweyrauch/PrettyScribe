import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Grey Knights.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Grey Knights.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 90, _points: 1132, _commandPoints: 8}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Battle-forged CP [3 CP]",
              "Detachment CP [5 CP]",
              "Detachment Bonuses: Show Bonuses",
              "Stratagems - Armoury of Titan",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Brother-Captain",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 113, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Brother Captain"}),
                ],
                '_modelList': [
                  "Brother-Captain (Storm Bolter [2 pts], Nemesis Force Halberd [1 pts], Frag & Krak grenades, Psyk-out Grenade, Domina Liber Demonica, Iron Halo, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Halberd"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Daemon Hunters", "Domina Liber Demonica", "Iron Halo", "Masters of the Warp", "Psychic Locus", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Chaplain",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 107, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight Chaplain"}),
                ],
                '_modelList': [
                  "Chaplain (Storm bolter [2 pts], Crozius Arcanum, Frag & Krak grenades, Psyk-out Grenade, Sanctuary)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Crozius arcanum"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Rosarius", "Shock Assault", "Spiritual Leaders", "Teleport Strike"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Litany of Hate", "Rosarius"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Sanctuary"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Grand Master",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 133, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grand Master"}),
                ],
                '_modelList': [
                  "Grand Master (Storm Bolter [2 pts], Nemesis Force Halberd [1 pts], Frag & Krak grenades, Psyk-out Grenade, Inner Fire, Iron Halo)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Halberd"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Daemon Hunters", "Iron Halo", "Masters of the Warp", "Rites of Banishment", "Rites of Battle", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Inner Fire"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (2/1)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight"}),
                  jasmine.objectContaining({'_name': "Grey Knight Justicar"}),
                ],
                '_modelList': [
                  "4x Grey Knight (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Grey Knight Justicar (Storm bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight"}),
                  jasmine.objectContaining({'_name': "Grey Knight Justicar"}),
                ],
                '_modelList': [
                  "4x Grey Knight (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Grey Knight Justicar (Storm bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Terminator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 13, _points: 175, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight Terminator"}),
                  jasmine.objectContaining({'_name': "Grey Knight Terminator Justicar"}),
                ],
                '_modelList': [
                  "Grey Knight Terminator Justicar (Storm bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "4x Terminator (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades (Astral Aim)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Crux Terminatus", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Astral Aim"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Paladin Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 132, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Paladin"}),
                  jasmine.objectContaining({'_name': "Paragon"}),
                ],
                '_modelList': [
                  "2x Paladin (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Paragon (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades (Sanctuary)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Crux Terminatus", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Sanctuary"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Paladin Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 132, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Paladin"}),
                  jasmine.objectContaining({'_name': "Paragon"}),
                ],
                '_modelList': [
                  "2x Paladin (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Paragon (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades (Astral Aim)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Crux Terminatus", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault", "Teleport Strike"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Astral Aim"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Purifier Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight of the Flame"}),
                  jasmine.objectContaining({'_name': "Purifier"}),
                ],
                '_modelList': [
                  "Knight of the Flame (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "4x Purifier (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades (Hammerhand)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Daemon Hunters", "Masters of the Warp", "Purifying Flame", "Shock Assault"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Purifying Flame)"}),
                  jasmine.objectContaining({'_name': "Hammerhand"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Purgation Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 85, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Purgator"}),
                  jasmine.objectContaining({'_name': "Purgator Justicar"}),
                ],
                '_modelList': [
                  "4x Purgator (Sword) (Storm Bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)",
                  "Purgator Justicar (Storm bolter [2 pts], Nemesis Force Sword [1 pts], Frag & Krak grenades, Psyk-out Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Bolter Discipline", "Combat Squads", "Daemon Hunters", "Masters of the Warp", "Rites of Banishment", "Shock Assault"]),
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
            ],
            '_rules': new Map([
              ["Psychic Locus", jasmine.any(String)],
              ["And They Shall Know No Fear", jasmine.any(String)],
              ["Daemon Hunters", jasmine.any(String)],
              ["Teleport Strike", jasmine.any(String)],
              ["Rites of Banishment", jasmine.any(String)],
              ["Bolter Discipline", jasmine.any(String)],
              ["Shock Assault", jasmine.any(String)],
              ["Masters of the Warp", jasmine.any(String)],
              ["Iron Halo", jasmine.any(String)],
              ["Domina Liber Demonica", jasmine.any(String)],
              ["Rosarius", jasmine.any(String)],
              ["Spiritual Leaders", jasmine.any(String)],
              ["Combat Squads", jasmine.any(String)],
              ["Crux Terminatus", jasmine.any(String)],
              ["Rites of Battle", jasmine.any(String)],
              ["Purifying Flame", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Brotherhood of Psykers", jasmine.any(String)],
              ["Knights of Titan", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});