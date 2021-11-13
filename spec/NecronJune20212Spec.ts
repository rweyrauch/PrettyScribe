import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Necron June 2021 2.ros", async function() {
    const doc = await readZippedRosterFile('test/Necron June 2021 2.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 31,
        '_points': 620,
        '_commandPoints': 3,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Chronomancer",
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
              ]}),
            jasmine.objectContaining({
              '_name': "Royal Warden",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Royal Warden"}),
              ],
              '_modelList': [
                "Royal Warden (Relic Gauss Blaster, Relic: Veil of Darkness, Warlord, Warlord Trait (Codex 1): Enduring Will)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Relic Gauss Blaster"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Necron Warriors",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Necron Warrior"}),
              ],
              '_modelList': [
                "20x Necron Warrior (Gauss Reaper) (Gauss Reaper)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Gauss Reaper"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Skorpekh Destroyers",
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
              ]}),
            jasmine.objectContaining({
              '_name': "Canoptek Scarab Swarms",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Canoptek Scarab Swarm"}),
              ],
              '_modelList': [
                "4x Canoptek Scarab Swarm (Feeder Mandibles)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Feeder Mandibles"}),
              ]}),
            jasmine.objectContaining({
              '_name': "Bound Creation",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Cryptothrall"}),
              ],
              '_modelList': [
                "2x Cryptothrall (Scouring Eye, Scythed Limbs)"
              ],
              '_weapons': [
                jasmine.objectContaining({'_name': "Scouring Eye"}),
                jasmine.objectContaining({'_name': "Scythed Limbs"}),
              ]}),
          ]}),
        ]}));
  });
});