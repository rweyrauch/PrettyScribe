import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/zoanthropes bug.rosz", async function() {
    const doc = await readZippedRosterFile('test/zoanthropes bug.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 21, _points: 450, _commandPoints: -2}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Hive Fleet",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Zoanthropes",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Zoanthrope"}),
                ],
                '_modelList': [
                  "3x Zoanthrope",
                  "Unit Upgrades (Power: Catalyst)"
                ],
                '_weapons': [
                  
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Psybrood Coterie", "Shadow in the Warp (Aura)", "Synapse", "Warp Blast", "Warp Field (Zoanthropes)"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Catalyst"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Zoanthropes"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Zoanthropes",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Zoanthrope"}),
                ],
                '_modelList': [
                  "3x Zoanthrope",
                  "Unit Upgrades (Power: Onslaught)"
                ],
                '_weapons': [
                  
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Psybrood Coterie", "Shadow in the Warp (Aura)", "Synapse", "Warp Blast", "Warp Field (Zoanthropes)"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Onslaught"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Zoanthropes"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Zoanthropes",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Zoanthrope"}),
                ],
                '_modelList': [
                  "3x Zoanthrope",
                  "Unit Upgrades (Power: Psychic Scream)"
                ],
                '_weapons': [
                  
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Psybrood Coterie", "Shadow in the Warp (Aura)", "Synapse", "Warp Blast", "Warp Field (Zoanthropes)"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Psychic Scream"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Zoanthropes"}),
                ]}),
            ],
            '_rules': new Map([
              ["Hive Fleet Adaptations", jasmine.any(String)],
              ["Hyper-adaptations", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});