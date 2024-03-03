import { readZippedRegistryFile } from '../helpers/readRosterFile';
import { Create40kRosterFromRegistry } from "../../src/registry40k10th";
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Points_test_with_bonus_model.regiztry", async function() {
    const doc = await readZippedRegistryFile('test/40k10th/Points_test_with_bonus_model.regiztry');
    const roster = Create40kRosterFromRegistry(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 470}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Outrider Squad",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Outrider Sergeant"]),
                      jasmine.arrayContaining(["Outrider"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy bolt pistol"]),
                      jasmine.arrayContaining(["Twin bolt rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes chainsword"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Outrider (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)",
                  "Outrider Sergeant (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo-boost"]),
                }}),
              jasmine.objectContaining({
                '_name': "Outrider Squad",
                '_cost': jasmine.objectContaining({_points: 160}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Outrider Sergeant"]),
                      jasmine.arrayContaining(["Outrider"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy bolt pistol"]),
                      jasmine.arrayContaining(["Twin bolt rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes chainsword"]),
                    ],
                  })
                },
                '_modelList': [
                  "5x Outrider (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)",
                  "Outrider Sergeant (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo-boost"]),
                }}),
              jasmine.objectContaining({
                '_name': "Outrider Squad",
                '_cost': jasmine.objectContaining({_points: 230}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Outrider Sergeant"]),
                      jasmine.arrayContaining(["Outrider"]),
                      jasmine.arrayContaining(["Invader ATV"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy bolt pistol"]),
                      jasmine.arrayContaining(["Twin bolt rifle"]),
                      jasmine.arrayContaining(["Onslaught gatling cannon"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes chainsword"]),
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Invader ATV (Close combat weapon, Heavy bolt pistol, Onslaught gatling cannon, Twin bolt rifle)",
                  "5x Outrider (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)",
                  "Outrider Sergeant (Astartes chainsword, Heavy bolt pistol, Twin bolt rifle)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo-boost"]),
                }}),
            ],
            '_rules': new Map([
              ["Devastating Wounds", jasmine.any(String)],
              ["Oath of Moment", jasmine.any(String)],
              ["Pistol", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});