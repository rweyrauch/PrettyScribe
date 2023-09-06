import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Death Guard and 1000 Sons.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Death Guard and 1000 Sons.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 129, _points: 2044, _commandPoints: 7}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - Detachment CP [5 CP]",
              "No Force Org Slot - Cults of the Legion: *No Cult*",
              "No Force Org Slot - Battle-forged CP [3 CP]",
              "No Force Org Slot - Detachment CP",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Ahriman",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 131, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ahriman"}),
                ],
                '_modelList': [
                  "Ahriman (Inferno Bolt Pistol, Black Staff of Ahriman, Frag & Krak grenades, Gift of Chaos, Smite, Temporal Manipulation, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Inferno Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Black Staff of Ahriman"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Brotherhood of Sorcerors", "Hateful Assault", "Malicious Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Arch-Sorceror of Tzeentch", "Death to the False Emperor", "Lord of the Thousand Sons", "Otherworldly Prescience", "Sigil of Corruption"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Gift of Chaos"}),
                  jasmine.objectContaining({'_name': "Temporal Manipulation"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Ahriman"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lord of Contagion",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 112, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lord of Contagion"}),
                ],
                '_modelList': [
                  "Lord of Contagion (Manreaper [17 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Manreaper"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Cataphractii Armour", "Death to the False Emperor", "Disgustingly Resilient", "Nurgle's Gift", "Teleport Strike"]),
                }}),
              jasmine.objectContaining({
                '_name': "Sorcerer",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 88, _commandPoints: -1}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Sorcerer"}),
                ],
                '_modelList': [
                  "Sorcerer (Coruscator, Inferno Bolt Pistol, Force sword [8 pts], Frag & Krak grenades, 2. Undying Form, Gift of Chaos, Magister [-1 CP], Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Coruscator"}),
                  jasmine.objectContaining({'_name': "Inferno Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Force sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Brotherhood of Sorcerors", "Hateful Assault", "Malicious Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Coruscator", "Death to the False Emperor", "Favour of Tzeentch", "Undying Form"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Gift of Chaos"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Sorcerer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Chaos Cultists",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Cultist"}),
                  jasmine.objectContaining({'_name': "Chaos Cultist w/ Brutal assault weapon"}),
                  jasmine.objectContaining({'_name': "Cultist Champion (Brutal assault weapon and Autopistol)"}),
                ],
                '_modelList': [
                  "9x Chaos Cultist w/ Autogun (Autogun)",
                  "Chaos Cultist w/ autopistol and brutal assault weapon (Autopistol, Brutal assault weapon)",
                  "Chaos Cultist w/ special weapon (Heavy stubber [2 pts])",
                  "Cultist Champion (Brutal assault weapon and Autopistol)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autogun"}),
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Brutal assault weapon"}),
                ],
                '_rules': mapWithKeys(["Disciples of Tzeentch"])}),
              jasmine.objectContaining({
                '_name': "Plague Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 133, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plague Champion"}),
                  jasmine.objectContaining({'_name': "Plague Marine"}),
                ],
                '_modelList': [
                  "Plague Champion (Boltgun, Plague knife, Blight Grenades, Krak grenades)",
                  "Plague Marine w/ Special Weapon (Plasma gun [11 pts], Plague knife, Blight Grenades, Krak grenades)",
                  "4x Plague Marine w/ boltgun (Boltgun, Plague knife, Blight Grenades, Krak Grenades)",
                  "Plague Marine w/ melee weapons (Flail of Corruption [10 pts], Plague knife, Blight Grenades, Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Plasma gun, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma gun, Supercharge"}),
                  jasmine.objectContaining({'_name': "Flail of Corruption"}),
                  jasmine.objectContaining({'_name': "Plague knife"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Disgustingly Resilient", "Vectors of Death and Disease"]),
                }}),
              jasmine.objectContaining({
                '_name': "Poxwalkers",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 50, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Poxwalker"}),
                ],
                '_modelList': [
                  "10x Poxwalker (Improvised weapon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Improvised weapon"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Curse of the Walking Pox", "Diseased Horde", "Disgustingly Resilient", "Mindless"]),
                }}),
              jasmine.objectContaining({
                '_name': "Rubric Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 21, _points: 212, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Sorcerer"}),
                  jasmine.objectContaining({'_name': "Rubric Marine"}),
                ],
                '_modelList': [
                  "Aspiring Sorcerer (Plasma pistol [5 pts], Force sword [8 pts], Glamour of Tzeentch, Smite)",
                  "8x Rubric Marine w/ Inferno Boltgun (Inferno boltgun)",
                  "Rubric Marine w/ Soulreaper cannon (Soulreaper cannon [10 pts])",
                  "Rubric Marine w/ Warpflamer (Warpflamer [8 pts])",
                  "Unit Upgrades (Icon of Flame [5 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Inferno boltgun"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Soulreaper Cannon"}),
                  jasmine.objectContaining({'_name': "Warpflamer"}),
                  jasmine.objectContaining({'_name': "Force sword"}),
                ],
                '_rules': mapWithKeys(["Brotherhood of Sorcerors", "Disciples of Tzeentch", "Hateful Assault", "Malicious Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["All is Dust", "Death to the False Emperor", "Favoured of Tzeentch", "Icon of Flame"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                  jasmine.objectContaining({'_name': "Glamour of Tzeentch"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Aspiring Sorcerer"}),
                ]}),
              jasmine.objectContaining({
                '_name': "The Plague Brethren",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 62, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plague Champion"}),
                  jasmine.objectContaining({'_name': "Plague Marine"}),
                ],
                '_modelList': [
                  "Plague Champion (Bolt pistol, Boltgun, 2x Plague knife, 2x Blight Grenades, 2x Krak grenades)",
                  "Plague Marine (Boltgun, Meltagun [14 pts], 2x Plague knife, 2x Blight Grenades, 2x Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Plague knife"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Disgustingly Resilient"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tzaangors",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Twistbray"}),
                  jasmine.objectContaining({'_name': "Tzaangors"}),
                ],
                '_modelList': [
                  "Twistbray (Tzaangor blades)",
                  "8x Tzaangor w/ Tzaangor Blades (Tzaangor blades)",
                  "Tzaangor w/ autopistol and chainsword (Autopistol, Chainsword)",
                  "Unit Upgrades (Brayhorn [10 pts], Icon of Flame [5 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Tzaangor blades"}),
                ],
                '_rules': mapWithKeys(["Disciples of Tzeentch"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aura of Dark Glory", "Brayhorn", "Icon of Flame", "Relic Hunters"]),
                }}),
              jasmine.objectContaining({
                '_name': "Foul Blightspawn",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 77, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Foul Blightspawn"}),
                ],
                '_modelList': [
                  "Foul Blightspawn (Plague sprayer, Blight Grenades, Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plague sprayer"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Disgustingly Resilient", "Revolting Stench", "Unholy Death's Head"]),
                }}),
              jasmine.objectContaining({
                '_name': "Helbrute",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 102, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Helbrute"}),
                ],
                '_modelList': [
                  "Helbrute (Multi-melta [22 pts], Helbrute fist [20 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Multi-melta"}),
                  jasmine.objectContaining({'_name': "Helbrute fist"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Malicious Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Crazed", "Explodes"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tallyman",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tallyman"}),
                ],
                '_modelList': [
                  "Tallyman (Plasma pistol [5 pts], Blight Grenades, Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Death to the False Emperor", "Disgustingly Resilient", "Festering Zealot", "The Seven-fold Chant"]),
                }}),
              jasmine.objectContaining({
                '_name': "Tzaangor Shaman",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tzaangor Shaman"}),
                ],
                '_modelList': [
                  "Tzaangor Shaman (Blades on Disc of Tzeentch, Force stave [8 pts], Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Blades on Disc of Tzeentch"}),
                  jasmine.objectContaining({'_name': "Force stave"}),
                ],
                '_rules': mapWithKeys(["Brotherhood of Sorcerors"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aura of Dark Glory", "Bestial Prophet", "Sorcerous Elixir"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Tzaangor Shaman"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Foetid Bloat-drone",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 138, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Foetid Bloat-drone"}),
                ],
                '_modelList': [
                  "Foetid Bloat-drone (2x Plaguespitters [34 pts], Plague probe [5 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plaguespitter"}),
                  jasmine.objectContaining({'_name': "Plague probe"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Disgustingly Resilient", "Putrid Explosion"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Foetid Bloat-drone1"}),
                  jasmine.objectContaining({'_name': "Foetid Bloat-drone2"}),
                  jasmine.objectContaining({'_name': "Foetid Bloat-drone3"}),
                  jasmine.objectContaining({'_name': "Foetid Bloat-drone"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Greater Blight Drone",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 231, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Greater Blight Drone"}),
                ],
                '_modelList': [
                  "Greater Blight Drone (Bile maw [18 pts], Blightreaper cannon [18 pts], Plague probe [25 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bile maw"}),
                  jasmine.objectContaining({'_name': "Blightreaper cannon"}),
                  jasmine.objectContaining({'_name': "Plague probe"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Carrion Haunter", "Daemon Engine", "Infernal Regeneration", "Putrid Explosion"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Greater Blight Drone"}),
                  jasmine.objectContaining({'_name': "Greater Blight Drone1"}),
                  jasmine.objectContaining({'_name': "Greater Blight Drone2"}),
                  jasmine.objectContaining({'_name': "Greater Blight Drone3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tzaangor Enlightened",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 42, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aviarch"}),
                  jasmine.objectContaining({'_name': "Enlightened"}),
                ],
                '_modelList': [
                  "Aviarch (Divining spears [3 pts])",
                  "2x Enlightened (Blades on Disc of Tzeentch, Divining spears [3 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Blades on Disc of Tzeentch"}),
                  jasmine.objectContaining({'_name': "Divining Spear"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Aura of Dark Glory", "Guided by Fate"]),
                }}),
              jasmine.objectContaining({
                '_name': "Plagueburst Crawler",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 136, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plagueburst Crawler"}),
                ],
                '_modelList': [
                  "Plagueburst Crawler (2x Entropy cannon [30 pts], Heavy slugger [6 pts], Plagueburst Mortar)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Entropy cannon"}),
                  jasmine.objectContaining({'_name': "Heavy slugger"}),
                  jasmine.objectContaining({'_name': "Plagueburst Mortar"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Daemonic", "Disgustingly Resilient", "Explodes"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Plagueburst Crawler1"}),
                  jasmine.objectContaining({'_name': "Plagueburst Crawler2"}),
                  jasmine.objectContaining({'_name': "Plagueburst Crawler3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Chaos Xiphon Interceptor",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 240, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor"}),
                ],
                '_modelList': [
                  "Chaos Xiphon Interceptor (Soulstalker missiles [50 pts], 2x Twin lascannon [80 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Soulstalker missiles"}),
                  jasmine.objectContaining({'_name': "Twin lascannon"}),
                ],
                '_rules': mapWithKeys(["Hateful Assault", "Malicious Volleys"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Airborne", "Crash and Burn", "Hard to Hit", "Preternatural Manoeuvrability", "Skyborn Predator", "Terminal Targeting"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor1"}),
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor2"}),
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor3"}),
                ]}),
            ],
            '_rules': new Map([
              ["Plague Weapon", jasmine.any(String)],
              ["Inexorable Advance", jasmine.any(String)],
              ["Plague Host", jasmine.any(String)],
              ["Bolter Discipline", jasmine.any(String)],
              ["Daemonic Ritual", jasmine.any(String)],
              ["Hateful Assault", jasmine.any(String)],
              ["Brotherhood of Sorcerors", jasmine.any(String)],
              ["Malicious Volleys", jasmine.any(String)],
              ["Disciples of Tzeentch", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
        ]}));
  });
});