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
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Einhyr Champion"}),
                ],
                '_modelList': [
                  "Einhyr Champion (Autoch-pattern combi-bolter, Mass hammer, Appraising Glare [20 pts], Warlord, Weavefield crest)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autoch-pattern combi-bolter"}),
                  jasmine.objectContaining({'_name': "Mass hammer"}),
                ],
                '_rules': mapWithKeys(["Eye of the Ancestors", "Leader", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Appraising Glare", "Exemplar of the Einhyr", "Leader", "Mass Driver Accelerators", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hearthkyn Warriors",
                '_cost': jasmine.objectContaining({_points: 110}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hearthkyn Warriors"}),
                ],
                '_modelList': [
                  "7x Hearthkyn Warrior (Autoch-pattern bolt pistol, Close combat weapon, Ion blaster)",
                  "Hearthkyn Warrior w/ heavy weapon (L7 missile launcher*, Autoch-pattern bolt pistol, Close combat weapon)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, Magna-rail rifle*)",
                  "Theyn (Close combat weapon, Etacarn plasma pistol, Ion blaster, Weavefield crest)",
                  "Unit Upgrades (Comms array, Medipack, Pan spectral scanner)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - blast"}),
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - focused"}),
                  jasmine.objectContaining({'_name': "Autoch-pattern bolt pistol"}),
                  jasmine.objectContaining({'_name': "Close combat weapon"}),
                  jasmine.objectContaining({'_name': "Etacarn plasma pistol"}),
                  jasmine.objectContaining({'_name': "Ion blaster"}),
                  jasmine.objectContaining({'_name': "Magna-rail rifle"}),
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Feel No Pain 6+", "Heavy", "Ignores Cover", "Pistol", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Comms array", "Luck Has, Need Keeps, Toil Earns", "Medipack", "Pan spectral scanner", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hearthkyn Warriors",
                '_cost': jasmine.objectContaining({_points: 110}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hearthkyn Warriors"}),
                ],
                '_modelList': [
                  "7x Hearthkyn Warrior (Autoch-pattern bolt pistol, Autoch-pattern bolter, Close combat weapon)",
                  "Hearthkyn Warrior w/ heavy weapon (L7 missile launcher*, Autoch-pattern bolt pistol, Close combat weapon)",
                  "Hearthkyn Warrior w/ heavy weapon (Autoch-pattern bolt pistol, Close combat weapon, Magna-rail rifle*)",
                  "Theyn (Autoch-pattern bolter, Close combat weapon, Etacarn plasma pistol, Weavefield crest)",
                  "Unit Upgrades (Comms array, Medipack, Pan spectral scanner)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - blast"}),
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - focused"}),
                  jasmine.objectContaining({'_name': "Autoch-pattern bolt pistol"}),
                  jasmine.objectContaining({'_name': "Autoch-pattern bolter"}),
                  jasmine.objectContaining({'_name': "Close combat weapon"}),
                  jasmine.objectContaining({'_name': "Etacarn plasma pistol"}),
                  jasmine.objectContaining({'_name': "Magna-rail rifle"}),
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Feel No Pain 6+", "Heavy", "Ignores Cover", "Pistol", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Comms array", "Luck Has, Need Keeps, Toil Earns", "Medipack", "Pan spectral scanner", "Weavefield crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Einhyr Hearthguard",
                '_cost': jasmine.objectContaining({_points: 150}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Einhyr Hearthguard"}),
                ],
                '_modelList': [
                  "4x Einhyr Hearthguard (Concussion gauntlet, Exo-armour grenade launcher, Volkanite disintegrator)",
                  "Hesyr (Concussion hammer, Exo-armour grenade launcher, Volkanite disintegrator, Teleport crest)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Concussion gauntlet"}),
                  jasmine.objectContaining({'_name': "Concussion hammer"}),
                  jasmine.objectContaining({'_name': "Exo-armour grenade launcher"}),
                  jasmine.objectContaining({'_name': "Volkanite disintegrator"}),
                ],
                '_rules': mapWithKeys(["Blast", "Devastating Wounds", "Eye of the Ancestors", "Ruthless Efficiency"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Oathband Bodyguard", "Teleport crest"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hekaton Land Fortress",
                '_cost': jasmine.objectContaining({_points: 225}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hekaton Land Fortress"}),
                ],
                '_modelList': [
                  "Hekaton Land Fortress (Armoured wheels, MATR autocannon, SP heavy conversion beamer, 2x Twin bolt cannon, Pan spectral scanner)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Armoured wheels"}),
                  jasmine.objectContaining({'_name': "MATR autocannon"}),
                  jasmine.objectContaining({'_name': "SP heavy conversion beamer"}),
                  jasmine.objectContaining({'_name': "Twin bolt cannon"}),
                ],
                '_rules': mapWithKeys(["Conversion", "Deadly Demise D6", "Eye of the Ancestors", "Ruthless Efficiency", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Damaged: 1-5 wounds remaining", "Fire Support", "Pan spectral scanner"]),
                  "Transport": mapWithKeys(["Hekaton Land Fortress"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hernkyn Pioneers",
                '_cost': jasmine.objectContaining({_points: 90}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hernkyn Pioneer"}),
                  jasmine.objectContaining({'_name': "Hernkyn Pioneer w/ ion beamer"}),
                ],
                '_modelList': [
                  "Hernkyn Pioneer w/ ion beamer (Bolt revolver, Bolt shotgun, Ion beamer, Magna-coil autocannon, Plasma knife)",
                  "Hernkyn Pioneer w/ pan-spectral scanner (Bolt revolver, Bolt shotgun, Magna-coil autocannon, Plasma knife, Pan-spectral scanner)",
                  "Hernkyn Pioneer w/ searchlight (Bolt revolver, Bolt shotgun, Magna-coil autocannon, Plasma knife, Rollbar searchlight)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt revolver"}),
                  jasmine.objectContaining({'_name': "Bolt shotgun"}),
                  jasmine.objectContaining({'_name': "Ion beamer"}),
                  jasmine.objectContaining({'_name': "Magna-coil autocannon"}),
                  jasmine.objectContaining({'_name': "Plasma knife"}),
                ],
                '_rules': mapWithKeys(["Assault", "Eye of the Ancestors", "Ignores Cover", "Pistol", "Ruthless Efficiency", "Scouts 9\"", "Sustained Hits"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Outflanking Mag-Riders", "Pan-spectral scanner", "Rollbar searchlight"]),
                }}),
              jasmine.objectContaining({
                '_name': "Sagitaur",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Sagitaur"}),
                ],
                '_modelList': [
                  "Sagitaur (L7 missile launcher and Sagitaur missile launcher, Armoured wheels, Twin bolt cannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - blast"}),
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - focused"}),
                  jasmine.objectContaining({'_name': "Armoured wheels"}),
                  jasmine.objectContaining({'_name': "Sagitaur missile launcher"}),
                  jasmine.objectContaining({'_name': "Twin bolt cannon"}),
                ],
                '_rules': mapWithKeys(["Blast", "Deadly Demise 1", "Eye of the Ancestors", "Ruthless Efficiency", "Scouts 6\"", "Sustained Hits", "Twin-linked"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Blistering Advance"]),
                  "Transport": mapWithKeys(["Sagitaur"]),
                }}),
              jasmine.objectContaining({
                '_name': "Sagitaur",
                '_cost': jasmine.objectContaining({_points: 100}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Sagitaur"}),
                ],
                '_modelList': [
                  "Sagitaur (L7 missile launcher and Sagitaur missile launcher, Armoured wheels, Twin bolt cannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - blast"}),
                  jasmine.objectContaining({'_name': "➤ L7 missile launcher - focused"}),
                  jasmine.objectContaining({'_name': "Armoured wheels"}),
                  jasmine.objectContaining({'_name': "Sagitaur missile launcher"}),
                  jasmine.objectContaining({'_name': "Twin bolt cannon"}),
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