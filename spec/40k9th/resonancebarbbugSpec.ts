import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k9th/resonance barb bug.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k9th/resonance barb bug.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 180, _commandPoints: 3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Leviathan - Hive Fleet: Leviathan",
              "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Neurothrope",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 100, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Neurothrope"}),
                ],
                '_modelList': [
                  "Neurothrope (Power: Catalyst, Power: Neuroparasite, Power: Onslaught, Relic: Resonance Barb, Warlord, Warlord Trait: Alien Cunning)"
                ],
                '_weapons': [
                  
                ],
                '_rules': mapWithKeys(["Objective Secured"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Alien Cunning", "Neurothrope", "Resonance Barb", "Shadow in the Warp (Aura)", "Spirit Leech", "Synapse", "Warp Field (Neurothrope)", "Warp Siphon"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Catalyst"}),
                  jasmine.objectContaining({'_name': "Neuroparasite"}),
                  jasmine.objectContaining({'_name': "Onslaught"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Neurothrope"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Gargoyles",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Gargoyle"}),
                ],
                '_modelList': [
                  "10x Gargoyle (Fleshborer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fleshborer"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Swarming Masses"]),
                }}),
            ],
            '_rules': new Map([
              ["Hive Fleet Adaptations", jasmine.any(String)],
              ["Hyper-adaptations", jasmine.any(String)],
              ["Objective Secured", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Synaptic Control", jasmine.any(String)],
              ["Adaptive (Leviathan)", jasmine.any(String)],
              ["Hyper-adaptation (Leviathan)", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});