import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Tau_Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Tau_Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 138, _points: 1981, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Aun'Shi",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aun'Shi"}),
                ],
                '_modelList': [
                  "Aun'Shi (Honour blade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Honour blade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Commander in XV8 Crisis Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Commander in XV8 Crisis Battlesuit"}),
                ],
                '_modelList': [
                  "Commander in XV8 Crisis Battlesuit (Burst cannon [8 pts], Missile pod [15 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                  jasmine.objectContaining({'_name': "Missile pod"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Commander in XV85 Enforcer Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 99, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Commander in XV85 Enforcer Battlesuit"}),
                ],
                '_modelList': [
                  "Commander in XV85 Enforcer Battlesuit (Burst cannon [8 pts], Missile pod [15 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                  jasmine.objectContaining({'_name': "Missile pod"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                ],
                '_modelList': [
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse rifle"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                ],
                '_modelList': [
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse rifle"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                ],
                '_modelList': [
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse rifle"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Kroot Shaper",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 20, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kroot Shaper"}),
                ],
                '_modelList': [
                  "Kroot Shaper (Kroot rifle, Ritual blade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Kroot rifle (shooting)"}),
                  jasmine.objectContaining({'_name': "Kroot rifle (melee)"}),
                  jasmine.objectContaining({'_name': "Ritual blade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV95 Ghostkeel Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 119, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV5 Stealth Drone"}),
                  jasmine.objectContaining({'_name': "XV95 Ghostkeel Shas'vre"}),
                ],
                '_modelList': [
                  "XV95 Ghostkeel Battlesuit (2x Flamer [12 pts], Fusion collider [25 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Flamer"}),
                  jasmine.objectContaining({'_name': "Fusion collider"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV95 Ghostkeel Shas'vre 1"}),
                  jasmine.objectContaining({'_name': "XV95 Ghostkeel Shas'vre 2"}),
                  jasmine.objectContaining({'_name': "XV95 Ghostkeel Shas'vre 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "AX3 Razorshark Strike Fighter",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 108, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "AX3 Razorshark Strike Fighter"}),
                ],
                '_modelList': [
                  "AX3 Razorshark Strike Fighter (Burst cannon [8 pts], Quad ion turret [30 pts], 2x Seeker missile [10 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                  jasmine.objectContaining({'_name': "Quad ion turret (Overcharge)"}),
                  jasmine.objectContaining({'_name': "Quad ion turret (Standard)"}),
                  jasmine.objectContaining({'_name': "Seeker missile"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "AX3 Razorshark Strike Fighter 1"}),
                  jasmine.objectContaining({'_name': "AX3 Razorshark Strike Fighter 2"}),
                  jasmine.objectContaining({'_name': "AX3 Razorshark Strike Fighter 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "TY7 Devilfish",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 98, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                  jasmine.objectContaining({'_name': "TY7 Devilfish"}),
                ],
                '_modelList': [
                  "TY7 Devilfish (Burst cannon [8 pts], 4x Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "TY7 Devilfish 1"}),
                  jasmine.objectContaining({'_name': "TY7 Devilfish 2"}),
                  jasmine.objectContaining({'_name': "TY7 Devilfish 3"}),
                ]}),
            ],
            '_rules': new Map([
              ["For the Greater Good", jasmine.any(String)],
              ["Manta Strike", jasmine.any(String)],
              ["Airborne", jasmine.any(String)],
              ["Crash and Burn", jasmine.any(String)],
              ["Hard to Hit", jasmine.any(String)],
              ["Supersonic", jasmine.any(String)],
              ["Hover Tank", jasmine.any(String)],
              ["Explodes", jasmine.any(String)],
              ["Attached Drones (TY7 Devilfish)", jasmine.any(String)],
              ["Saviour Protocols", jasmine.any(String)],
              ["Detach", jasmine.any(String)],
              ["Drone Support", jasmine.any(String)],
              ["Infiltrator", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Battle-forged CP [3 CP]",
              "No Force Org Slot - Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Commander Farsight",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Commander Farsight"}),
                ],
                '_modelList': [
                  "Commander Farsight (High-intensity plasma rifle, Dawn blade, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "High-intensity plasma rifle"}),
                  jasmine.objectContaining({'_name': "Dawn blade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Darkstrider",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 45, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Darkstrider"}),
                ],
                '_modelList': [
                  "Darkstrider (Markerlight, Pulse carbine, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Markerlight"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Breacher Team",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                ],
                '_modelList': [
                  "5x Fire Warrior (Pulse blaster, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse blaster (1 Close range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (2 Medium range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (3 Long range)"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Kroot Carnivores",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kroot"}),
                ],
                '_modelList': [
                  "10x Kroot (Kroot rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Kroot rifle (shooting)"}),
                  jasmine.objectContaining({'_name': "Kroot rifle (melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 35, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                ],
                '_modelList': [
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse rifle"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "DX-4 Technical Drones",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 32, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "DX-4 Technical Drone"}),
                ],
                '_modelList': [
                  "2x DX-4 Technical Drone (Defensive charge)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Defensive charge"}),
                ]}),
              jasmine.objectContaining({
                '_name': "DX-4 Technical Drones",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 32, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "DX-4 Technical Drone"}),
                ],
                '_modelList': [
                  "2x DX-4 Technical Drone (Defensive charge)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Defensive charge"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Dahyak Grekh",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 20, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Dahyak Grekh"}),
                ],
                '_modelList': [
                  "Dahyak Grekh (Kroot pistol, Kroot rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Kroot pistol"}),
                  jasmine.objectContaining({'_name': "Kroot rifle (shooting)"}),
                  jasmine.objectContaining({'_name': "Kroot rifle (melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV104 Riptide Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 14, _points: 250, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
                ],
                '_modelList': [
                  "XV104 Riptide Battlesuit (Heavy burst cannon [35 pts], 2x Smart missile system [30 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy burst cannon"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 1"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 2"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV104 Riptide Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 14, _points: 250, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
                ],
                '_modelList': [
                  "XV104 Riptide Battlesuit (Heavy burst cannon [35 pts], 2x Smart missile system [30 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy burst cannon"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 1"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 2"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV104 Riptide Battlesuit",
                '_cost': jasmine.objectContaining({_powerLevel: 14, _points: 250, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
                ],
                '_modelList': [
                  "XV104 Riptide Battlesuit (Heavy burst cannon [35 pts], 2x Smart missile system [30 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy burst cannon"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 1"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 2"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Drones",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                ],
                '_modelList': [
                  "4x MV1 Gun Drone (2x Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Drones",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                ],
                '_modelList': [
                  "4x MV1 Gun Drone (2x Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Drones",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                ],
                '_modelList': [
                  "4x MV1 Gun Drone (2x Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Great Knarloc",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Great Knarloc"}),
                ],
                '_modelList': [
                  "Great Knarloc (Razor talons, Crushing Beak)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Razor talons"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Great Knarloc",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Great Knarloc"}),
                ],
                '_modelList': [
                  "Great Knarloc (Razor talons, Crushing Beak)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Razor talons"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Heavy Gun Drone Squadron",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 68, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Heavy Gun Drone"}),
                ],
                '_modelList': [
                  "2x Heavy Gun Drone w/ 2x BC (Burst cannon [8 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                ]}),
            ],
            '_rules': new Map([
              ["For the Greater Good", jasmine.any(String)],
              ["Drone Support", jasmine.any(String)],
              ["Manta Strike", jasmine.any(String)],
              ["Pulse blaster", jasmine.any(String)],
              ["Markerlights", jasmine.any(String)],
              ["Saviour Protocols", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});