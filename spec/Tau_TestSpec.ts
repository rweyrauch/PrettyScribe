import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Tau_Test.ros", async function() {
    const doc = await readZippedRosterFile('test/Tau_Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 138,
        '_points': 1981,
        '_commandPoints': 13,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Aun'Shi",
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "Commander in XV8 Crisis Battlesuit"}),
              ],
              '_modelList': [
                "Commander in XV8 Crisis Battlesuit (Burst cannon, Missile pod)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Burst cannon"}),
                jasmine.objectContaining({'_name': "Missile pod"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Commander in XV85 Enforcer Battlesuit",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Commander in XV85 Enforcer Battlesuit"}),
              ],
              '_modelList': [
                "Commander in XV85 Enforcer Battlesuit (Burst cannon, Missile pod)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Burst cannon"}),
                jasmine.objectContaining({'_name': "Missile pod"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Strike Team",
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "MV5 Stealth Drone"}),
                jasmine.objectContaining({'_name': "XV95 Ghostkeel Shas'vre"}),
              ],
              '_modelList': [
                "XV95 Ghostkeel Battlesuit (2x Flamer, Fusion collider)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "AX3 Razorshark Strike Fighter"}),
              ],
              '_modelList': [
                "AX3 Razorshark Strike Fighter (Burst cannon, Quad ion turret, 2x Seeker missile)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                jasmine.objectContaining({'_name': "TY7 Devilfish"}),
              ],
              '_modelList': [
                "TY7 Devilfish (Burst cannon, 4x Pulse carbine)"
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
            jasmine.objectContaining({
              '_name': "Detachment CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
          ]}),
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Commander Farsight",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Commander Farsight"}),
              ],
              '_modelList': [
                "Commander Farsight (High-intensity plasma rifle, Dawn blade)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "High-intensity plasma rifle"}),
                jasmine.objectContaining({'_name': "Dawn blade"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Darkstrider",
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
              ],
              '_modelList': [
                "XV104 Riptide Battlesuit (Heavy burst cannon, 2x Smart missile system)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
              ],
              '_modelList': [
                "XV104 Riptide Battlesuit (Heavy burst cannon, 2x Smart missile system)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
              ],
              '_modelList': [
                "XV104 Riptide Battlesuit (Heavy burst cannon, 2x Smart missile system)"
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
              '_modelStats': [
                jasmine.objectContaining({'_name': "Heavy Gun Drone"}),
              ],
              '_modelList': [
                "2x Heavy Gun Drone w/ 2x BC (Burst cannon)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Burst cannon"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Battle-forged CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
            jasmine.objectContaining({
              '_name': "Detachment CP",
              '_modelStats': [
                
              ],
              '_modelList': [
                
              ],
              '_weapons': [
                
              ]}),
          ]}),
        ]}));
  });
});