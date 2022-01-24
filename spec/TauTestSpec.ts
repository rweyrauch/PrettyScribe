import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Tau Test.rosz", async function() {
    const doc = await readZippedRosterFile('test/Tau Test.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 126,
        '_points': 2029,
        '_commandPoints': 15,
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
            '_units': [
              jasmine.objectContaining({
                '_name': "Aun'Shi",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aun'Shi"}),
                ],
                '_modelList': [
                  "Aun'Shi (Honour blade, Academy Luminary (Vior'la Sept), Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Honour blade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Aun'Va",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aun'va"}),
                  jasmine.objectContaining({'_name': "Ethereal Guard"}),
                ],
                '_modelList': [
                  "Aun'Va",
                  "3x Ethereal Guard (Honour blade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Honour blade"}),
                ]}),
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
                '_name': "Breacher Team",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "DS8 Tactical Support Turret"}),
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                  jasmine.objectContaining({'_name': "Fire Warrior Shas'ui"}),
                  jasmine.objectContaining({'_name': "MV4 Shield Drone"}),
                ],
                '_modelList': [
                  "DS8 Tactical Support Turret w/ SMS (Smart missile system)",
                  "5x Fire Warrior (Pulse blaster, Photon grenades)",
                  "Fire Warrior Shas'ui (Pulse blaster, Photon grenades)",
                  "2x Fire Warrior w/ Pulse Pistol (Pulse blaster, Pulse pistol, Photon grenades)",
                  "2x MV4 Shield Drone (Shield generator)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse blaster (1 Close range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (2 Medium range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (3 Long range)"}),
                  jasmine.objectContaining({'_name': "Pulse pistol"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Breacher Team",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                  jasmine.objectContaining({'_name': "Fire Warrior Shas'ui"}),
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                ],
                '_modelList': [
                  "5x Fire Warrior (Pulse blaster, Photon grenades)",
                  "Fire Warrior Shas'ui (Pulse blaster, Photon grenades)",
                  "Fire Warrior w/ Pulse Pistol (Pulse blaster, Pulse pistol, Photon grenades)",
                  "2x MV1 Gun Drone (Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse blaster (1 Close range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (2 Medium range)"}),
                  jasmine.objectContaining({'_name': "Pulse blaster (3 Long range)"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Pulse pistol"}),
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
                '_name': "Kroot Carnivores",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kroot"}),
                ],
                '_modelList': [
                  "14x Kroot (Kroot rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Kroot rifle (shooting)"}),
                  jasmine.objectContaining({'_name': "Kroot rifle (melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "DS8 Tactical Support Turret"}),
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                  jasmine.objectContaining({'_name': "Fire Warrior Shas'ui"}),
                  jasmine.objectContaining({'_name': "MV36 Guardian Drone"}),
                  jasmine.objectContaining({'_name': "MV4 Shield Drone"}),
                ],
                '_modelList': [
                  "DS8 Tactical Support Turret w/ SMS (Smart missile system)",
                  "Fire Warrior Shas'ui (Pulse rifle, Photon grenades)",
                  "Fire Warrior w/ Pulse Carbine (Pulse carbine, Photon grenades)",
                  "Fire Warrior w/ Pulse Pistol + Pulse Rifle (Pulse pistol, Pulse rifle, Photon grenades)",
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)",
                  "MV36 Guardian Drone",
                  "MV4 Shield Drone (Shield generator)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Pulse pistol"}),
                  jasmine.objectContaining({'_name': "Pulse rifle"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
                  jasmine.objectContaining({'_name': "Photon grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Strike Team",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "DS8 Tactical Support Turret"}),
                  jasmine.objectContaining({'_name': "Fire Warrior"}),
                  jasmine.objectContaining({'_name': "Fire Warrior Shas'ui"}),
                  jasmine.objectContaining({'_name': "MV4 Shield Drone"}),
                ],
                '_modelList': [
                  "DS8 Tactical Support Turret w/ Missile pod (Missile pod)",
                  "Fire Warrior Shas'ui (Pulse rifle, Photon grenades)",
                  "Fire Warrior w/ Pulse Carbine (Pulse carbine, Photon grenades)",
                  "Fire Warrior w/ Pulse Pistol + Pulse Carbine (Pulse carbine, Pulse pistol, Photon grenades)",
                  "Fire Warrior w/ Pulse Pistol + Pulse Rifle (Pulse pistol, Pulse rifle, Photon grenades)",
                  "5x Fire Warrior w/ Pulse Rifle (Pulse rifle, Photon grenades)",
                  "2x MV4 Shield Drone (Shield generator)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Missile pod"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Pulse pistol"}),
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
                '_name': "Firesight Marksman",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Firesight Marksman"}),
                ],
                '_modelList': [
                  "Firesight Marksman (Markerlight, Pulse pistol, Multi-sensory discouragement array)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Markerlight"}),
                  jasmine.objectContaining({'_name': "Pulse pistol"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Kroot Shaper",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kroot Shaper"}),
                ],
                '_modelList': [
                  "Kroot Shaper (Pulse carbine [Index], Ritual blade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Ritual blade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV104 Riptide Battlesuit",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV84 Shielded Missile Drone"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Battlesuit"}),
                ],
                '_modelList': [
                  "XV104 Riptide Battlesuit (Heavy burst cannon, Missile pod, 2x Plasma rifle, Early warning override, Shield generator)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy burst cannon"}),
                  jasmine.objectContaining({'_name': "Missile pod"}),
                  jasmine.objectContaining({'_name': "Plasma rifle"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 1"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 2"}),
                  jasmine.objectContaining({'_name': "XV104 Riptide Shas'vre 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV25 Stealth Battlesuits",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV4 Shield Drone"}),
                  jasmine.objectContaining({'_name': "Stealth Shas'ui"}),
                  jasmine.objectContaining({'_name': "Stealth Shas'vre"}),
                ],
                '_modelList': [
                  "MV4 Shield Drone (Shield generator)",
                  "4x Stealth Shas'ui w/ Burst Cannon (Burst cannon)",
                  "Stealth Shas'vre (Burst cannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                ]}),
              jasmine.objectContaining({
                '_name': "TX4 Piranhas",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                  jasmine.objectContaining({'_name': "TX4 Piranha"}),
                ],
                '_modelList': [
                  "TX4 Piranha (Burst cannon, 4x Pulse carbine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Burst cannon"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tactical Drones",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                  jasmine.objectContaining({'_name': "MV4 Shield Drone"}),
                  jasmine.objectContaining({'_name': "MV7 Marker Drone"}),
                ],
                '_modelList': [
                  "4x MV1 Gun Drone (2x Pulse carbine)",
                  "MV4 Shield Drone (Shield generator)",
                  "MV7 Marker Drone (Markerlight)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Markerlight"}),
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV109 Y'vahra Battlesuit",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "XV109 Y'vahra Battlesuit"}),
                ],
                '_modelList': [
                  "XV109 Y'vahra Battlesuit (Fletchette pod, Ionic discharge cannon, Phased plasma-flamer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fletchette pod (shooting)"}),
                  jasmine.objectContaining({'_name': "Ionic discharge cannon (Nova reactor)"}),
                  jasmine.objectContaining({'_name': "Ionic discharge cannon (Standard)"}),
                  jasmine.objectContaining({'_name': "Phased plasma-flamer (Nova reactor)"}),
                  jasmine.objectContaining({'_name': "Phased plasma-flamer (Standard)"}),
                  jasmine.objectContaining({'_name': "Fletchette pod (melee)"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "XV109 Y'vahra Battlesuit 1"}),
                  jasmine.objectContaining({'_name': "XV109 Y'vahra Battlesuit 2"}),
                  jasmine.objectContaining({'_name': "XV109 Y'vahra Battlesuit 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "MV71 Sniper Drones",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV71 Sniper Drone"}),
                ],
                '_modelList': [
                  "3x MV71 Sniper Drone (Longshot pulse rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Longshot pulse rifle"}),
                ]}),
              jasmine.objectContaining({
                '_name': "TX7 Hammerhead Gunship",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "MV1 Gun Drone"}),
                  jasmine.objectContaining({'_name': "TX7 Hammerhead Gunship"}),
                ],
                '_modelList': [
                  "TX7 Hammerhead Gunship (4x Pulse carbine, Railgun)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Pulse carbine"}),
                  jasmine.objectContaining({'_name': "Railgun (Solid shot)"}),
                  jasmine.objectContaining({'_name': "Railgun (Submunitions)"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "TX7 Hammerhead Gunship 1"}),
                  jasmine.objectContaining({'_name': "TX7 Hammerhead Gunship 2"}),
                  jasmine.objectContaining({'_name': "TX7 Hammerhead Gunship 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "XV88 Broadside Battlesuits",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Broadside Shas'ui"}),
                ],
                '_modelList': [
                  "Broadside Shas'ui (Heavy rail rifle, 2x Smart missile system)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy rail rifle"}),
                  jasmine.objectContaining({'_name': "Smart missile system"}),
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
            ]
          }),
        ]}));
  });
});