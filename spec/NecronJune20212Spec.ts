import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/Necron June 2021 2.ros", async function() {
    const doc = await readZippedRosterFile('test/Necron June 2021 2.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 31, _points: 620, _commandPoints: 3}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Dynasty Choice: Dynasty: <Custom>, Dynastic Tradition: Unyielding, Circumstance of Awakening: Healthy Paranoia",
              "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Chronomancer",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chronomancer"}),
                ],
                '_modelList': [
                  "Chronomancer (Aeonstave, Chronotendrils)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Aeonstave (Shooting)"}),
                  jasmine.objectContaining({'_name': "Aeonstave (Melee)"}),
                  jasmine.objectContaining({'_name': "Chronotendrils"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Chronometron", "Dynastic Advisors", "Timesplinter Mantle"]),
                }}),
              jasmine.objectContaining({
                '_name': "Royal Warden",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Royal Warden"}),
                ],
                '_modelList': [
                  "Royal Warden (Relic Gauss Blaster, Relic: Veil of Darkness, Warlord, Warlord Trait (Codex 1): Enduring Will)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Relic Gauss Blaster"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Adaptive Strategy", "Relentless March (Aura)", "Veil of Darkness"]),
                  "Warlord Trait": mapWithKeys(["Enduring Will"]),
                }}),
              jasmine.objectContaining({
                '_name': "Necron Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 260, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Necron Warrior"}),
                ],
                '_modelList': [
                  "20x Necron Warrior (Gauss Reaper) (Gauss Reaper)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Gauss Reaper"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Objective Secured", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Their Number Is Legion"]),
                }}),
              jasmine.objectContaining({
                '_name': "Skorpekh Destroyers",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Skorpekh Destroyer"}),
                ],
                '_modelList': [
                  "Skorpekh Destroyer (Reap-Blade) (Hyperphase Reap-Blade)",
                  "2x Skorpekh Destroyer (Thresher) (Hyperphase Threshers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hyperphase Reap-Blade"}),
                  jasmine.objectContaining({'_name': "Hyperphase Threshers"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Hardwired for Destruction"]),
                }}),
              jasmine.objectContaining({
                '_name': "Canoptek Scarab Swarms",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Canoptek Scarab Swarm"}),
                ],
                '_modelList': [
                  "4x Canoptek Scarab Swarm (Feeder Mandibles)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Feeder Mandibles"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal", "Reanimation Protocols"])}),
              jasmine.objectContaining({
                '_name': "Bound Creation",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cryptothrall"}),
                ],
                '_modelList': [
                  "2x Cryptothrall (Scouring Eye, Scythed Limbs)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Scouring Eye"}),
                  jasmine.objectContaining({'_name': "Scythed Limbs"}),
                ],
                '_rules': mapWithKeys(["Command Protocols", "Living Metal", "Reanimation Protocols"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Bound Creation", "Protectors (Aura)", "Systematic Vigour"]),
                }}),
            ],
            '_rules': new Map([
              ["Dynastic Agents and Star Gods", jasmine.any(String)],
              ["The Royal Court", jasmine.any(String)],
              ["Command Protocols", jasmine.any(String)],
              ["Living Metal", jasmine.any(String)],
              ["Reanimation Protocols", jasmine.any(String)],
              ["Objective Secured", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Unyielding", jasmine.any(String)],
              ["Healthy Paranoia", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});