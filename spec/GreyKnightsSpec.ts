import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Grey Knights.rosz", async function() {
    const doc = await readZippedRosterFile('test/Grey Knights.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 90,
        '_points': 1132,
        '_commandPoints': 8,
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Battle-forged CP",
              "Detachment CP",
              "Detachment Bonuses: Show Bonuses",
              "Stratagems - Armoury of Titan",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Brother-Captain",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Brother Captain"}),
                ],
                '_modelList': [
                  "Brother-Captain (Storm Bolter, Nemesis Force Halberd, Frag & Krak grenades, Psyk-out Grenade, Domina Liber Demonica, Iron Halo, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Halberd"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Chaplain",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight Chaplain"}),
                ],
                '_modelList': [
                  "Chaplain (Storm bolter, Crozius Arcanum, Frag & Krak grenades, Psyk-out Grenade, Sanctuary)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Crozius arcanum"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Sanctuary"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Grand Master",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grand Master"}),
                ],
                '_modelList': [
                  "Grand Master (Storm Bolter, Nemesis Force Halberd, Frag & Krak grenades, Psyk-out Grenade, Inner Fire, Iron Halo)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Halberd"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Inner Fire"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (2/1)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight"}),
                  jasmine.objectContaining({'_name': "Grey Knight Justicar"}),
                ],
                '_modelList': [
                  "4x Grey Knight (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Grey Knight Justicar (Storm bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight"}),
                  jasmine.objectContaining({'_name': "Grey Knight Justicar"}),
                ],
                '_modelList': [
                  "4x Grey Knight (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Grey Knight Justicar (Storm bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Terminator Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Knight Terminator"}),
                  jasmine.objectContaining({'_name': "Grey Knight Terminator Justicar"}),
                ],
                '_modelList': [
                  "Grey Knight Terminator Justicar (Storm bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "4x Terminator (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Astral Aim"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Paladin Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Paladin"}),
                  jasmine.objectContaining({'_name': "Paragon"}),
                ],
                '_modelList': [
                  "2x Paladin (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Paragon (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Sanctuary"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Paladin Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Paladin"}),
                  jasmine.objectContaining({'_name': "Paragon"}),
                ],
                '_modelList': [
                  "2x Paladin (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Paragon (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                  jasmine.objectContaining({'_name': "Astral Aim"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Purifier Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Knight of the Flame"}),
                  jasmine.objectContaining({'_name': "Purifier"}),
                ],
                '_modelList': [
                  "Knight of the Flame (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "4x Purifier (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Purifying Flame)"}),
                  jasmine.objectContaining({'_name': "Hammerhand"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Purgation Squad",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Purgator"}),
                  jasmine.objectContaining({'_name': "Purgator Justicar"}),
                ],
                '_modelList': [
                  "4x Purgator (Sword) (Storm Bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Purgator Justicar (Storm bolter, Nemesis Force Sword, Frag & Krak grenades, Psyk-out Grenade)",
                  "Unit Upgrades"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Nemesis Force Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                  jasmine.objectContaining({'_name': "Psyk-out Grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite (Rites of Banishment)"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker (Sanctic 1 Squad)"}),
                ]}),
            ]
          }),
        ]}));
  });
});