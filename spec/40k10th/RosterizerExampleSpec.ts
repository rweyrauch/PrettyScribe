import { readZippedRegistryFile } from '../helpers/readRosterFile';
import { Create40kRosterFromRegistry } from "../../src/registry40k10th";
import { Wh40k } from "../../src/roster40k10th";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("CreateRoster", function() {
  it("loads test/40k10th/Rosterizer Example.regiztry", async function() {
    const doc = await readZippedRegistryFile('test/40k10th/Rosterizer Example.regiztry');
    const roster = Create40kRosterFromRegistry(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_points: 995}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "WL Commander Shadowsun",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["WL Commander Shadowsun"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Flechette launcher"]),
                      jasmine.arrayContaining(["High-energy fusion blaster"]),
                      jasmine.arrayContaining(["Light missile pod"]),
                      jasmine.arrayContaining(["Pulse pistol"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Battlesuit fists"]),
                    ],
                  })
                },
                '_modelList': [
                  "WL Commander Shadowsun (Advanced Guardian Drone, Battlesuit fists, Command-link Drone (aura), Flechette launcher, 2x High-energy fusion blaster, Light missile pod, Pulse pistol)"
                ],
                '_rules': mapWithKeys(["For the Greater Good", "Infiltrators", "Invulnerable 5+", "Lone Operative", "Stealth"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Agile Combatant", "Hero of the Empire (aura)", "Supreme Commander"]),
                  "Wargear": mapWithKeys(["Advanced Guardian Drone", "Command-link Drone (aura)"]),
                }}),
              jasmine.objectContaining({
                '_name': "Commander in Coldstar Battlesuit",
                '_cost': jasmine.objectContaining({_points: 125}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Commander in Coldstar Battlesuit"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Plasma rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Battlesuit fists"]),
                    ],
                  })
                },
                '_modelList': [
                  "Commander in Coldstar Battlesuit (Battlesuit fists, Exemplar of Kauyon [15 pts], 4x Plasma rifle, 2x Shield Drone)"
                ],
                '_rules': mapWithKeys(["Deep Strike", "For the Greater Good", "Leader"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Coldstar Commander", "Leader"]),
                  "Enhancement": mapWithKeys(["Exemplar of Kauyon"]),
                  "Wargear": mapWithKeys(["Shield Drone"]),
                }}),
              jasmine.objectContaining({
                '_name': "Commander Farsight",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Commander Farsight"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["High-intensity plasma rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Dawn Blade - Strike"]),
                      jasmine.arrayContaining(["Dawn Blade - Sweep"]),
                    ],
                  })
                },
                '_modelList': [
                  "Commander Farsight (Dawn Blade, High-intensity plasma rifle)"
                ],
                '_rules': mapWithKeys(["Deep Strike", "For the Greater Good", "Invulnerable 4+", "Leader"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aggressive Offensive", "Leader", "Way of the Short Blade"]),
                }}),
              jasmine.objectContaining({
                '_name': "Breacher Team",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Breacher Fire Warrior Shas’ui"]),
                      jasmine.arrayContaining(["Breacher Fire Warriors"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Pulse blaster"]),
                      jasmine.arrayContaining(["Pulse pistol"]),
                      jasmine.arrayContaining(["Support turret missile system"]),
                      jasmine.arrayContaining(["Twin Linked Pulse Carbine"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Breacher Fire Warrior Shas’ui (Close combat weapon, Guardian Drone, Gun Drone, Pulse blaster, Pulse pistol, Support turret missile system, Twin Linked Pulse Carbine)",
                  "9x Breacher Fire Warriors (Close combat weapon, Pulse blaster, Pulse pistol)"
                ],
                '_rules': mapWithKeys(["For the Greater Good"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Breach and Clear", "Ds8 Support Turret", "Markerlight"]),
                  "Wargear": mapWithKeys(["Guardian Drone", "Gun Drone"]),
                }}),
              jasmine.objectContaining({
                '_name': "Stealth Battlesuits",
                '_cost': jasmine.objectContaining({_points: 60}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Stealth Shas’vre"]),
                      jasmine.arrayContaining(["Stealth Shas’ui"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Fusion blaster"]),
                      jasmine.arrayContaining(["Twin Linked Pulse Carbine"]),
                      jasmine.arrayContaining(["Burst cannon"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Battlesuit fists"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Stealth Shas’ui (Battlesuit fists, Burst cannon)",
                  "Stealth Shas’vre (Battlesuit Support System, Battlesuit fists, Fusion blaster, Gun Drone, Homing Beacon, Marker Drone, Twin Linked Pulse Carbine)"
                ],
                '_rules': mapWithKeys(["For the Greater Good", "Infiltrators", "Stealth"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Forward Observers"]),
                  "Wargear": mapWithKeys(["Battlesuit Support System", "Gun Drone", "Homing Beacon", "Marker Drone"]),
                }}),
              jasmine.objectContaining({
                '_name': "Crisis Battlesuits",
                '_cost': jasmine.objectContaining({_points: 200}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Crisis Shas’vre"]),
                      jasmine.arrayContaining(["Crisis Shas’ui"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Plasma rifle"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Battlesuit fists"]),
                    ],
                  })
                },
                '_modelList': [
                  "2x Crisis Shas’ui (Battlesuit fists, 3x Plasma rifle, 2x Shield Drone, Shield Generator)",
                  "Crisis Shas’vre (Battlesuit fists, 3x Plasma rifle, 2x Shield Drone, Shield Generator)"
                ],
                '_rules': mapWithKeys(["Deep Strike", "For the Greater Good"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Turbo-jets"]),
                  "Wargear": mapWithKeys(["Shield Drone", "Shield Generator"]),
                }}),
              jasmine.objectContaining({
                '_name': "Ghostkeel Battlesuit",
                '_cost': jasmine.objectContaining({_points: 160}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Ghostkeel Battlesuit"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Cyclic ion raker - Standard"]),
                      jasmine.arrayContaining(["Cyclic ion raker - Overcharge"]),
                      jasmine.arrayContaining(["Twin T’au flamer"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Ghostkeel fists"]),
                    ],
                  })
                },
                '_modelList': [
                  "Ghostkeel Battlesuit (Battlesuit Support System, Cyclic ion raker, Ghostkeel fists, Twin T’au flamer)"
                ],
                '_rules': mapWithKeys(["Deadly Demise D3", "For the Greater Good", "Infiltrators", "Lone Operative", "Stealth"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-4 wounds remaining", "Stealth Drones"]),
                  "Wargear": mapWithKeys(["Battlesuit Support System"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hammerhead Gunship",
                '_cost': jasmine.objectContaining({_points: 130}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Hammerhead Gunship"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Railgun"]),
                      jasmine.arrayContaining(["Twin pulse carbine"]),
                      jasmine.arrayContaining(["Seeker missile"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Armoured hull"]),
                    ],
                  })
                },
                '_modelList': [
                  "Hammerhead Gunship (Armoured hull, Railgun, 2x Seeker missile, 2x Twin pulse carbine)"
                ],
                '_rules': mapWithKeys(["Deadly Demise D3", "For the Greater Good"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Armour Hunter", "Damaged: 1-5 wounds remaining", "Targeting Array"]),
                }}),
              jasmine.objectContaining({
                '_name': "Cadre Fireblade",
                '_cost': jasmine.objectContaining({_points: 40}),
                '_profileTables': {
                  "Unit": jasmine.objectContaining({
                    '_headers': ["Unit","M","T","Sv","W","Ld","OC"],
                    '_contents': [
                      jasmine.arrayContaining(["Cadre Fireblade"]),
                    ],
                  }),
                  "Ranged Weapons": jasmine.objectContaining({
                    '_headers': ["Ranged Weapons","Range","A","BS","S","AP","D","Keywords"],
                    '_contents': [
                      jasmine.arrayContaining(["Fireblade pulse rifle"]),
                      jasmine.arrayContaining(["Twin Linked Pulse Carbine"]),
                    ],
                  }),
                  "Melee Weapons": jasmine.objectContaining({
                    '_headers': ["Melee Weapons","Range","A","WS","S","AP","D"],
                    '_contents': [
                      jasmine.arrayContaining(["Close combat weapon"]),
                    ],
                  })
                },
                '_modelList': [
                  "Cadre Fireblade (Close combat weapon, Fireblade pulse rifle, 2x Gun Drone, 2x Twin Linked Pulse Carbine)"
                ],
                '_rules': mapWithKeys(["For the Greater Good", "Leader"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Crack Shot", "Leader", "Volley Fire"]),
                  "Wargear": mapWithKeys(["Gun Drone"]),
                }}),
            ],
            '_rules': new Map([
              ["Assault", jasmine.any(String)],
              ["Deadly Demise D3", jasmine.any(String)],
              ["Deep Strike", jasmine.any(String)],
              ["Devastating Wounds", jasmine.any(String)],
              ["For the Greater Good", jasmine.any(String)],
              ["Hazardous", jasmine.any(String)],
              ["Heavy", jasmine.any(String)],
              ["Ignores Cover", jasmine.any(String)],
              ["Indirect Fire", jasmine.any(String)],
              ["Infiltrators", jasmine.any(String)],
              ["Invulnerable 4+", jasmine.any(String)],
              ["Invulnerable 5+", jasmine.any(String)],
              ["Kauyon", jasmine.any(String)],
              ["Leader", jasmine.any(String)],
              ["Lone Operative", jasmine.any(String)],
              ["Melta 2", jasmine.any(String)],
              ["One Shot", jasmine.any(String)],
              ["Pistol", jasmine.any(String)],
              ["Rapid Fire 1", jasmine.any(String)],
              ["Stealth", jasmine.any(String)],
              ["Torrent", jasmine.any(String)],
              ["Twin-linked", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});