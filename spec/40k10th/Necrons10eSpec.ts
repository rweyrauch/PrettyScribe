import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Necrons 10e.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k10th/Necrons 10e.rosz');
    const roster = Wh40k.CreateRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 1205}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Detachment Choice: Awakened Dynasty",
              "Battle Size: 2. Strike Force (2000 Point limit)",
              "Show Legends",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "The Silent King",
                '_cost': jasmine.objectContaining({_points: 470}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Szarekh"]),
                      jasmine.arrayContaining(["Triarchal Menhir"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Sceptre of Eternal Glory"]),
                      jasmine.arrayContaining(["Staff of Stars"]),
                      jasmine.arrayContaining(["Annihilator beam"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Scythe of Dust"]),
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Szarekh (Sceptre of Eternal Glory, Scythe of Dust, Staff of Stars)",
                  "2x Triarchal Menhir (Annihilator beam, Close combat weapon)",
                  "Unit Upgrades (Warlord)"
                ],
                '_rules': mapWithKeys(["Command Protocols", "Deadly Demise D6+3 (Szarekh model only)", "Devastating Wounds", "Indirect Fire", "Lethal Hits", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-6 wounds remaining", "Invulnerable Save", "The Silent King", "Triarchal Menhirs", "Voice of the Triarch"]),
                  "Triarch Abilities": mapWithKeys(["Bringer of Unity (Aura)", "Phaeron of the Blades (Aura)", "Phaeron of the Stars (Aura)"]),
                }}),
              jasmine.objectContaining({
                '_name': "Overlord",
                '_cost': jasmine.objectContaining({_points: 85}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Overlord"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Tachyon arrow"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Overlord's blade"]),
                    ],
                  })
                },
                '_modelList': [
                  "Overlord (Overlord's blade, Tachyon arrow)"
                ],
                '_rules': mapWithKeys(["Command Protocols", "Devastating Wounds", "Leader", "One Shot", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Implacable Resilience", "Invulnerable Save", "Leader", "My Will Be Done"]),
                }}),
              jasmine.objectContaining({
                '_name': "Doom Scythe",
                '_cost': jasmine.objectContaining({_points: 225}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Doom Scythe"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy death ray"]),
                      jasmine.arrayContaining(["Twin tesla destructor"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured bulk"]),
                    ],
                  })
                },
                '_modelList': [
                  "Doom Scythe (Armoured bulk, Heavy death ray, Twin tesla destructor)"
                ],
                '_rules': mapWithKeys(["Command Protocols", "Deadly Demise D3", "Reanimation Protocols", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Atavistic Instigation", "Damaged: 1-4 wounds remaining"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tesseract Vault",
                '_cost': jasmine.objectContaining({_points: 425}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Tesseract Vault"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Tesla sphere"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured bulk"]),
                    ],
                  }),
                  "C'tan Powers": jasmine.objectContaining({
                    '_headers': ["C'tan Powers","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Cosmic Fire"]),
                      jasmine.arrayContaining(["Time's Arrow"]),
                      jasmine.arrayContaining(["Antimatter Meteor"]),
                    ],
                  })
                },
                '_modelList': [
                  "Tesseract Vault (Armoured bulk, C'tan Powers, 4x Tesla sphere)"
                ],
                '_rules': mapWithKeys(["Anti-", "Blast", "Command Protocols", "Deadly Demise D6+3", "Devastating Wounds", "Ignores Cover", "Indirect Fire", "Precision", "Reanimation Protocols", "Sustained Hits", "Torrent"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-8 wounds remaining", "Invulnerable Save", "Powers of the C’tan"]),
                }}),
            ],
            '_rules': new Map([
              ["Devastating Wounds", jasmine.any(String)],
              ["One Shot", jasmine.any(String)],
              ["Command Protocols", jasmine.any(String)],
              ["Leader", jasmine.any(String)],
              ["Reanimation Protocols", jasmine.any(String)],
              ["Anti-", jasmine.any(String)],
              ["Sustained Hits", jasmine.any(String)],
              ["Blast", jasmine.any(String)],
              ["Indirect Fire", jasmine.any(String)],
              ["Ignores Cover", jasmine.any(String)],
              ["Torrent", jasmine.any(String)],
              ["Precision", jasmine.any(String)],
              ["Deadly Demise D6+3", jasmine.any(String)],
              ["Lethal Hits", jasmine.any(String)],
              ["Deadly Demise D6+3 (Szarekh model only)", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
              ["Deadly Demise D3", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});