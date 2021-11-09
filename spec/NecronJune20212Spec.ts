import { readRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Necron June 2021 2.ros", function() {
    const doc = readRosterFile('test/Necron June 2021 2.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 25,
        '_points': 500,
        '_commandPoints': 3,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({
              '_name': "Royal Warden",
              '_modelStats': [
                jasmine.objectContaining({'_name': "Royal Warden"}),
              ],
              '_modelList': [
                "Royal Warden (Relic Gauss Blaster, Enduring Will, Veil of Darkness)"
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
          ]}),
        ]}));
  });
});