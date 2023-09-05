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
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Szarekh"}),
                  jasmine.objectContaining({'_name': "Triarchal Menhir"}),
                ],
                '_modelList': [
                  "Szarekh (Sceptre of Eternal Glory, Scythe of Dust, Staff of Stars)",
                  "2x Triarchal Menhir (Annihilator beam, Close combat weapon)",
                  "Unit Upgrades (Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Annihilator beam"}),
                  jasmine.objectContaining({'_name': "Close combat weapon"}),
                  jasmine.objectContaining({'_name': "Sceptre of Eternal Glory"}),
                  jasmine.objectContaining({'_name': "Scythe of Dust"}),
                  jasmine.objectContaining({'_name': "Staff of Stars"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Deadly Demise D6+3 (Szarekh model only)", "Devastating Wounds", "Indirect Fire", "Lethal Hits", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-6 wounds remaining", "Invulnerable Save", "The Silent King", "Triarchal Menhirs", "Voice of the Triarch"]),
                  "Triarch Abilities": mapWithKeys(["Bringer of Unity (Aura)", "Phaeron of the Blades (Aura)", "Phaeron of the Stars (Aura)"]),
                }}),
              jasmine.objectContaining({
                '_name': "Overlord",
                '_cost': jasmine.objectContaining({_points: 85}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Overlord"}),
                ],
                '_modelList': [
                  "Overlord (Overlord's blade, Tachyon arrow)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Overlord's blade"}),
                  jasmine.objectContaining({'_name': "Tachyon arrow"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Devastating Wounds", "Leader", "One Shot", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Implacable Resilience", "Invulnerable Save", "Leader", "My Will Be Done"]),
                }}),
              jasmine.objectContaining({
                '_name': "Doom Scythe",
                '_cost': jasmine.objectContaining({_points: 225}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Doom Scythe"}),
                ],
                '_modelList': [
                  "Doom Scythe (Armoured bulk, Heavy death ray, Twin tesla destructor)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armoured bulk"}),
                  jasmine.objectContaining({'_name': "Heavy death ray"}),
                  jasmine.objectContaining({'_name': "Twin tesla destructor"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Deadly Demise D3", "Reanimation Protocols", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Atavistic Instigation", "Damaged: 1-4 wounds remaining"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tesseract Vault",
                '_cost': jasmine.objectContaining({_points: 425}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tesseract Vault"}),
                ],
                '_modelList': [
                  "Tesseract Vault (Armoured bulk, 4x Tesla sphere, C'tan Powers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armoured bulk"}),
                  jasmine.objectContaining({'_name': "Tesla sphere"}),
                ],
                '_rules': mapWithKeys(["Anti-", "Blast", "Command Protocols", "Deadly Demise D6+3", "Devastating Wounds", "Ignores Cover", "Indirect Fire", "Precision", "Reanimation Protocols", "Sustained Hits", "Torrent"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-8 wounds remaining", "Invulnerable Save", "Powers of the C’tan"]),
                  "C'tan Powers": mapWithKeys(["Antimatter Meteor - A", "Antimatter Meteor - AP", "Antimatter Meteor - BS", "Antimatter Meteor - D", "Antimatter Meteor - Keywords", "Antimatter Meteor - Range", "Antimatter Meteor - S", "Cosmic Fire - A", "Cosmic Fire - AP", "Cosmic Fire - BS", "Cosmic Fire - D", "Cosmic Fire - Keywords", "Cosmic Fire - Range", "Cosmic Fire - S", "Time's Arrow - A", "Time's Arrow - AP", "Time's Arrow - BS", "Time's Arrow - D", "Time's Arrow - Keywords", "Time's Arrow - Range", "Time's Arrow - S"]),
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