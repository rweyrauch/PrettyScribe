import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/01.LoV.Leviathan.v0102.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k10th/01.LoV.Leviathan.v0102.rosz');
    const roster = Wh40k.CreateRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 965}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Detachment Choice: Oathband",
              "Battle Size: 1. Incursion (1000 Point limit)",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Einhyr Champion",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Einhyr Champion"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Autoch-pattern combi-bolter"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Mass hammer"]),
                    ],
                  })
                },
                '_modelList': [
                  "Einhyr Champion (Appraising Glare [20 pts], Autoch-pattern combi-bolter, Mass hammer, Warlord, Weavefield crest)"
                ],
                '_rules': mapWithKeys(["Eye of the Ancestors", "Leader", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Appraising Glare", "Exemplar of the Einhyr", "Leader", "Mass Driver Accelerators", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hearthkyn Warriors",
                '_cost': jasmine.objectContaining({_points: 110}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Hearthkyn Warriors"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Autoch-pattern bolt pistol"]),
                      jasmine.arrayContaining(["Ion blaster"]),
                      jasmine.arrayContaining(["Etacarn plasma pistol"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - blast"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - focused"]),
                      jasmine.arrayContaining(["Magna-rail rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "7x Hearthkyn Warrior (Autoch-pattern bolt pistol, Close combat weapon, Ion blaster)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, L7 missile launcher*)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, Magna-rail rifle*)",
                  "Theyn (Close combat weapon, Etacarn plasma pistol, Ion blaster, Weavefield crest)",
                  "Unit Upgrades (Comms array, Medipack, Pan spectral scanner)"
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Feel No Pain 6+", "Heavy", "Ignores Cover", "Pistol", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Comms array", "Luck Has, Need Keeps, Toil Earns", "Medipack", "Pan spectral scanner", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hearthkyn Warriors",
                '_cost': jasmine.objectContaining({_points: 110}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Hearthkyn Warriors"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Autoch-pattern bolt pistol"]),
                      jasmine.arrayContaining(["Autoch-pattern bolter"]),
                      jasmine.arrayContaining(["Etacarn plasma pistol"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - blast"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - focused"]),
                      jasmine.arrayContaining(["Magna-rail rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "7x Hearthkyn Warrior (Autoch-pattern bolt pistol, Autoch-pattern bolter, Close combat weapon)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, L7 missile launcher*)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, Magna-rail rifle*)",
                  "Theyn (Autoch-pattern bolter, Close combat weapon, Etacarn plasma pistol, Weavefield crest)",
                  "Unit Upgrades (Comms array, Medipack, Pan spectral scanner)"
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Feel No Pain 6+", "Heavy", "Ignores Cover", "Pistol", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Comms array", "Luck Has, Need Keeps, Toil Earns", "Medipack", "Pan spectral scanner", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Einhyr Hearthguard",
                '_cost': jasmine.objectContaining({_points: 150}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Einhyr Hearthguard"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Exo-armour grenade launcher"]),
                      jasmine.arrayContaining(["Volkanite disintegrator"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Concussion hammer"]),
                      jasmine.arrayContaining(["Concussion gauntlet"]),
                    ],
                  })
                },
                '_modelList': [
                  "4x Einhyr Hearthguard (Concussion gauntlet, Exo-armour grenade launcher, Volkanite disintegrator)",
                  "Hesyr (Concussion hammer, Exo-armour grenade launcher, Teleport crest, Volkanite disintegrator)"
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Oathband Bodyguard", "Teleport crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hekaton Land Fortress",
                '_cost': jasmine.objectContaining({_points: 225}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Hekaton Land Fortress"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["MATR autocannon"]),
                      jasmine.arrayContaining(["SP heavy conversion beamer"]),
                      jasmine.arrayContaining(["Twin bolt cannon"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured wheels"]),
                    ],
                  })
                },
                '_modelList': [
                  "Hekaton Land Fortress (Armoured wheels, MATR autocannon, Pan spectral scanner, SP heavy conversion beamer, 2x Twin bolt cannon)"
                ],
                '_rules': mapWithKeys(["Conversion", "Deadly Demise D6", "Eye of the Ancestors", "Ruthless Efficiency", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-5 wounds remaining", "Fire Support", "Pan spectral scanner"]),
                  "Transport": mapWithKeys(["Hekaton Land Fortress"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hernkyn Pioneers",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Hernkyn Pioneer"]),
                      jasmine.arrayContaining(["Hernkyn Pioneer w/ ion beamer"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Bolt revolver"]),
                      jasmine.arrayContaining(["Bolt shotgun"]),
                      jasmine.arrayContaining(["Magna-coil autocannon"]),
                      jasmine.arrayContaining(["Ion beamer"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Plasma knife"]),
                    ],
                  })
                },
                '_modelList': [
                  "Hernkyn Pioneer w/ ion beamer (Bolt revolver, Bolt shotgun, Ion beamer, Magna-coil autocannon, Plasma knife)",
                  "Hernkyn Pioneer w/ pan-spectral scanner (Bolt revolver, Bolt shotgun, Magna-coil autocannon, Pan-spectral scanner, Plasma knife)",
                  "Hernkyn Pioneer w/ searchlight (Bolt revolver, Bolt shotgun, Magna-coil autocannon, Plasma knife, Rollbar searchlight)"
                ],
                '_rules': mapWithKeys(["Assault", "Eye of the Ancestors", "Ignores Cover", "Pistol", "Ruthless Efficiency", "Scouts 9\"", "Sustained Hits"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Outflanking Mag-Riders", "Pan-spectral scanner", "Rollbar searchlight"]),
                }}),
              jasmine.objectContaining({
                '_name': "Sagitaur",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Sagitaur"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Twin bolt cannon"]),
                      jasmine.arrayContaining(["Sagitaur missile launcher"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - blast"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - focused"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured wheels"]),
                    ],
                  })
                },
                '_modelList': [
                  "Sagitaur (Armoured wheels, L7 missile launcher and Sagitaur missile launcher, Twin bolt cannon)"
                ],
                '_rules': mapWithKeys(["Blast", "Deadly Demise 1", "Eye of the Ancestors", "Ruthless Efficiency", "Scouts 6\"", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Blistering Advance"]),
                  "Transport": mapWithKeys(["Sagitaur"]),
                }}),
              jasmine.objectContaining({
                '_name': "Sagitaur",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Sagitaur"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Twin bolt cannon"]),
                      jasmine.arrayContaining(["Sagitaur missile launcher"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - blast"]),
                      jasmine.arrayContaining(["➤ L7 missile launcher - focused"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured wheels"]),
                    ],
                  })
                },
                '_modelList': [
                  "Sagitaur (Armoured wheels, L7 missile launcher and Sagitaur missile launcher, Twin bolt cannon)"
                ],
                '_rules': mapWithKeys(["Blast", "Deadly Demise 1", "Eye of the Ancestors", "Ruthless Efficiency", "Scouts 6\"", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Blistering Advance"]),
                  "Transport": mapWithKeys(["Sagitaur"]),
                }}),
            ],
            '_rules': new Map([
              ["Eye of the Ancestors", jasmine.any(String)],
              ["Ruthless Efficiency", jasmine.any(String)],
              ["Pistol", jasmine.any(String)],
              ["Feel No Pain 6+", jasmine.any(String)],
              ["Ignores Cover", jasmine.any(String)],
              ["Blast", jasmine.any(String)],
              ["Devastating Wounds", jasmine.any(String)],
              ["Heavy", jasmine.any(String)],
              ["Scouts 9\"", jasmine.any(String)],
              ["Assault", jasmine.any(String)],
              ["Sustained Hits", jasmine.any(String)],
              ["Deadly Demise D6", jasmine.any(String)],
              ["Conversion", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
              ["Scouts 6\"", jasmine.any(String)],
              ["Deadly Demise 1", jasmine.any(String)],
              ["Leader", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});