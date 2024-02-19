import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Ultramarines_10E.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k10th/Ultramarines_10E.rosz');
    const roster = Wh40k.CreateRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 810}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Show/Hide Options: Legends are visible, Unaligned Forces are visible, Unaligned Fortifications are visible, Imperial Knights are visible, Agents of the Imperium are visible, Titans are visible",
              "Battle Size: 1. Incursion (1000 Point limit)",
              "Detachment: Gladius Task Force",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Assault Intercessor Squad",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Assault Intercessor Squad"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy Bolt Pistol"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes Chainsword"]),
                    ],
                  })
                },
                '_modelList': [
                  "Assault Intercessor Sergeant (Astartes Chainsword, Heavy Bolt Pistol)",
                  "4x Assault Intercessors (Astartes Chainsword, Heavy Bolt Pistol)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Shock Assault"]),
                }}),
              jasmine.objectContaining({
                '_name': "Assault Intercessor Squad",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Assault Intercessor Squad"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy Bolt Pistol"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes Chainsword"]),
                    ],
                  })
                },
                '_modelList': [
                  "Assault Intercessor Sergeant (Astartes Chainsword, Heavy Bolt Pistol)",
                  "4x Assault Intercessors (Astartes Chainsword, Heavy Bolt Pistol)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Shock Assault"]),
                }}),
              jasmine.objectContaining({
                '_name': "Eliminator Squad",
                '_cost': jasmine.objectContaining({_points: 75}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Eliminator Squad"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Bolt Pistol"]),
                      jasmine.arrayContaining(["Bolt Sniper Rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Close Combat Weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Eliminator (Bolt Pistol, Bolt Sniper Rifle, Close Combat Weapon)",
                  "Eliminator Sergeant (Bolt Pistol, Bolt Sniper Rifle, Close Combat Weapon)"
                ],
                '_rules': mapWithKeys(["Infiltrators", "Oath of Moment", "Stealth"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Mark the Target", "Reposition Under Covering Fire"]),
                }}),
              jasmine.objectContaining({
                '_name': "Lieutenant in Phobos Armour",
                '_cost': jasmine.objectContaining({_points: 60}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Lieutenant in Phobos Armor"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Master-crafted Scoped Bolt Carbine"]),
                      jasmine.arrayContaining(["Bolt Pistol"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Paired Combat Blades"]),
                    ],
                  })
                },
                '_modelList': [
                  "Lieutenant in Phobos Armour (Bolt Pistol, Master-crafted Scoped Bolt Carbine, Paired Combat Blades)"
                ],
                '_rules': mapWithKeys(["Deep Strike", "Infiltrators", "Leader", "Oath of Moment", "Scouts 6\""]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Leader", "Shoot and Fade", "Tactical Precision"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Captain",
                '_cost': jasmine.objectContaining({_points: 80}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Primaris Captain"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Bolt Pistol"]),
                      jasmine.arrayContaining(["Master-crafted Bolt Rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Close Combat Weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Primaris Captain (Bolt Pistol, Close Combat Weapon, Master-crafted Bolt Rifle, Warlord)"
                ],
                '_rules': mapWithKeys(["Leader", "Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Finest Hour", "Invulnerable Save", "Leader", "Rites of Battle"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Lieutenant",
                '_cost': jasmine.objectContaining({_points: 75}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Primaris Lieutenant"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Bolt Pistol"]),
                      jasmine.arrayContaining(["Master-crafted Bolt Rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Close Combat Weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Primaris Lieutenant (Bolt Pistol, Close Combat Weapon, Master-crafted Bolt Rifle)"
                ],
                '_rules': mapWithKeys(["Leader", "Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Leader", "Tactical Precision", "Target Priority"]),
                }}),
              jasmine.objectContaining({
                '_name': "Outrider Squad",
                '_cost': jasmine.objectContaining({_points: 105}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Outrider Squad"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Heavy Bolt Pistol"]),
                      jasmine.arrayContaining(["Twin Bolt Rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Astartes Chainsword"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Outrider (Astartes Chainsword, Heavy Bolt Pistol, Twin Bolt Rifle)",
                  "Outrider Sergeant (Astartes Chainsword, Heavy Bolt Pistol, Twin Bolt Rifle)"
                ],
                '_rules': mapWithKeys(["Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo Boost"]),
                }}),
              jasmine.objectContaining({
                '_name': "Impulsor",
                '_cost': jasmine.objectContaining({_points: 85}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Impulsor"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Fragstorm Grenade Launcher"]),
                      jasmine.arrayContaining(["➤ Bellicatus Missile Array - Frag"]),
                      jasmine.arrayContaining(["➤ Bellicatus Missile Array - Icarus"]),
                      jasmine.arrayContaining(["➤ Bellicatus Missile Array - Krak"]),
                      jasmine.arrayContaining(["Ironhail Heavy Stubber"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured Tracks"]),
                    ],
                  })
                },
                '_modelList': [
                  "Impulsor (2 Fragstorm Grenade Launchers, Armoured Hull, Bellicatus Missile Array, Ironhail Heavy Stubber)"
                ],
                '_rules': mapWithKeys(["Deadly Demise D3", "Firing Deck 6", "Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Assault Vehicle", "Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Land Speeder Storm",
                '_cost': jasmine.objectContaining({_points: 70}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Land Speeder Storm"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Cerberus Launcher"]),
                      jasmine.arrayContaining(["Heavy Bolter"]),
                    ],
                  })
                },
                '_modelList': [
                  "Land Speeder Storm (Cerberus Launcher, Heavy Bolter)"
                ],
                '_rules': mapWithKeys(["Deadly Demise 1", "Firing Deck 6", "Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Storm Assault", "Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Razorback",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","SV","W","LD","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Razorback"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Twin Heavy Bolter"]),
                      jasmine.arrayContaining(["Hunter Killer Missile"]),
                      jasmine.arrayContaining(["Storm Bolter"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured Tracks"]),
                    ],
                  })
                },
                '_modelList': [
                  "Razorback (Armoured Tracks, Hunter Killer Missile, Storm Bolter, Twin Heavy Bolter)"
                ],
                '_rules': mapWithKeys(["Deadly Demise D3", "Oath of Moment"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Fire Support", "Transport"]),
                }}),
            ],
            '_rules': new Map([
              ["Anti-", jasmine.any(String)],
              ["Blast", jasmine.any(String)],
              ["Deadly Demise 1", jasmine.any(String)],
              ["Deadly Demise D3", jasmine.any(String)],
              ["Deep Strike", jasmine.any(String)],
              ["Firing Deck 6", jasmine.any(String)],
              ["Heavy", jasmine.any(String)],
              ["Infiltrators", jasmine.any(String)],
              ["Leader", jasmine.any(String)],
              ["Oath of Moment", jasmine.any(String)],
              ["One Shot", jasmine.any(String)],
              ["Pistol", jasmine.any(String)],
              ["Precision", jasmine.any(String)],
              ["Rapid Fire", jasmine.any(String)],
              ["Scouts 6\"", jasmine.any(String)],
              ["Stealth", jasmine.any(String)],
              ["Sustained Hits", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Combat Doctrines", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});