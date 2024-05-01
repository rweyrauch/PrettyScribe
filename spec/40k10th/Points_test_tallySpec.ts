import { readZippedRegistryFile } from '../helpers/readRosterFile';
import { Create40kRosterFromRegistry } from "../../src/registry40k10th";
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Points_test_tally.regiztry", async function() {
    const doc = await readZippedRegistryFile('test/40k10th/Points_test_tally.regiztry');
    const roster = Create40kRosterFromRegistry(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 225}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Neurogaunts",
                '_cost': jasmine.objectContaining({_points: 45}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Neurogaunt Nodebeast"]),
                      jasmine.arrayContaining(["Neurogaunt"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Chitinous claws and teeth"]),
                    ],
                  })
                },
                '_modelList': [
                  "10x Neurogaunt (Chitinous claws and teeth)",
                  "Neurogaunt Nodebeast (Chitinous claws and teeth)"
                ],
                '_rules': mapWithKeys(["Synapse"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Neurocytes"]),
                }}),
              jasmine.objectContaining({
                '_name': "Neurogaunts",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Neurogaunt Nodebeast"]),
                      jasmine.arrayContaining(["Neurogaunt"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Chitinous claws and teeth"]),
                    ],
                  })
                },
                '_modelList': [
                  "11x Neurogaunt (Chitinous claws and teeth)",
                  "Neurogaunt Nodebeast (Chitinous claws and teeth)"
                ],
                '_rules': mapWithKeys(["Synapse"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Neurocytes"]),
                }}),
              jasmine.objectContaining({
                '_name': "Neurogaunts",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Neurogaunt Nodebeast"]),
                      jasmine.arrayContaining(["Neurogaunt"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Chitinous claws and teeth"]),
                    ],
                  })
                },
                '_modelList': [
                  "20x Neurogaunt (Chitinous claws and teeth)",
                  "2x Neurogaunt Nodebeast (Chitinous claws and teeth)"
                ],
                '_rules': mapWithKeys(["Synapse"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Neurocytes"]),
                }}),
            ],
            '_rules': new Map([
              ["Synapse", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});