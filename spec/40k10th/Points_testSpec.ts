import { readZippedRegistryFile } from '../helpers/readRosterFile';
import { Create40kRosterFromRegistry } from "../../src/registry40k10th";
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Points_test.regiztry", async function() {
    const doc = await readZippedRegistryFile('test/40k10th/Points_test.regiztry');
    const roster = Create40kRosterFromRegistry(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 1130}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Meganobz",
                '_cost': jasmine.objectContaining({_points: 60}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Meganob"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Kustom shoota"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Power klaw"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Meganob (Kustom shoota, Power klaw)"
                ],
                '_rules': mapWithKeys(["Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Krumpin’ Time"]),
                }}),
              jasmine.objectContaining({
                '_name': "Meganobz",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Meganob"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Kustom shoota"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Power klaw"]),
                    ],
                  })
                },
                '_modelList': [
                  "3x Meganob (Kustom shoota, Power klaw)"
                ],
                '_rules': mapWithKeys(["Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Krumpin’ Time"]),
                }}),
              jasmine.objectContaining({
                '_name': "Meganobz",
                '_cost': jasmine.objectContaining({_points: 150}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Meganob"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Kustom shoota"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Power klaw"]),
                    ],
                  })
                },
                '_modelList': [
                  "4x Meganob (Kustom shoota, Power klaw)"
                ],
                '_rules': mapWithKeys(["Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Krumpin’ Time"]),
                }}),
              jasmine.objectContaining({
                '_name': "Meganobz",
                '_cost': jasmine.objectContaining({_points: 150}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Meganob"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Kustom shoota"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Power klaw"]),
                    ],
                  })
                },
                '_modelList': [
                  "5x Meganob (Kustom shoota, Power klaw)"
                ],
                '_rules': mapWithKeys(["Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Krumpin’ Time"]),
                }}),
              jasmine.objectContaining({
                '_name': "Meganobz",
                '_cost': jasmine.objectContaining({_points: 180}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Meganob"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Kustom shoota"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Power klaw"]),
                    ],
                  })
                },
                '_modelList': [
                  "6x Meganob (Kustom shoota, Power klaw)"
                ],
                '_rules': mapWithKeys(["Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Krumpin’ Time"]),
                }}),
              jasmine.objectContaining({
                '_name': "Squighog Boyz",
                '_cost': jasmine.objectContaining({_points: 125}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog Boyz"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Saddlegit weapons"]),
                      jasmine.arrayContaining(["Stikka - Ranged"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog jaws and saddlegits"]),
                      jasmine.arrayContaining(["Stikka - Melee"]),
                    ],
                  })
                },
                '_modelList': [
                  "3x Squighog Boyz (Saddlegit weapons, Squighog jaws and saddlegits, Stikka)"
                ],
                '_rules': mapWithKeys(["Feel No Pain 5+", "Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Wild Ride"]),
                }}),
              jasmine.objectContaining({
                '_name': "Squighog Boyz",
                '_cost': jasmine.objectContaining({_points: 125}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog Boyz"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Saddlegit weapons"]),
                      jasmine.arrayContaining(["Stikka - Ranged"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog jaws and saddlegits"]),
                      jasmine.arrayContaining(["Stikka - Melee"]),
                    ],
                  })
                },
                '_modelList': [
                  "3x Squighog Boyz (Saddlegit weapons, Squighog jaws and saddlegits, Stikka)",
                  "Unit Upgrades (Bomb Squig)"
                ],
                '_rules': mapWithKeys(["Feel No Pain 5+", "Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Wild Ride"]),
                  "Wargear": mapWithKeys(["Bomb Squig"]),
                }}),
              jasmine.objectContaining({
                '_name': "Squighog Boyz",
                '_cost': jasmine.objectContaining({_points: 250}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog Boyz"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Saddlegit weapons"]),
                      jasmine.arrayContaining(["Stikka - Ranged"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Squighog jaws and saddlegits"]),
                      jasmine.arrayContaining(["Stikka - Melee"]),
                    ],
                  })
                },
                '_modelList': [
                  "6x Squighog Boyz (Saddlegit weapons, Squighog jaws and saddlegits, Stikka)",
                  "Unit Upgrades (2x Bomb Squig)"
                ],
                '_rules': mapWithKeys(["Feel No Pain 5+", "Waaagh!"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Wild Ride"]),
                  "Wargear": mapWithKeys(["Bomb Squig"]),
                }}),
            ],
            '_rules': new Map([
              ["Anti- monster 4+", jasmine.any(String)],
              ["Anti- vehicle 4+", jasmine.any(String)],
              ["Assault", jasmine.any(String)],
              ["Extra Attacks", jasmine.any(String)],
              ["Feel No Pain 5+", jasmine.any(String)],
              ["Lance", jasmine.any(String)],
              ["Rapid Fire 2", jasmine.any(String)],
              ["Waaagh! Tribe", jasmine.any(String)],
              ["Waaagh!", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});