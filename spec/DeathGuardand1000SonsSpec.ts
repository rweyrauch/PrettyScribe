import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Death Guard and 1000 Sons.rosz", async function() {
    const doc = await readZippedRosterFile('test/Death Guard and 1000 Sons.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 129, _points: 2044, _commandPoints: 7}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [],
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
                  "Lord of Contagion (Manreaper)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Manreaper"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Sorcerer",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 88, _commandPoints: -1}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Sorcerer"}),
                ],
                '_modelList': [
                  "Sorcerer (Coruscator, Inferno Bolt Pistol, Force sword, Frag & Krak grenades, 2. Undying Form, Gift of Chaos, Magister [-1 CP], Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Coruscator"}),
                  jasmine.objectContaining({'_name': "Inferno Bolt Pistol"}),
                  jasmine.objectContaining({'_name': "Force sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
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
                  "Chaos Cultist w/ special weapon (Heavy stubber)",
                  "Cultist Champion (Brutal assault weapon and Autopistol)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Autogun"}),
                  jasmine.objectContaining({'_name': "Autopistol"}),
                  jasmine.objectContaining({'_name': "Heavy stubber"}),
                  jasmine.objectContaining({'_name': "Brutal assault weapon"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Plague Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 10, _points: 133, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plague Champion"}),
                  jasmine.objectContaining({'_name': "Plague Marine"}),
                ],
                '_modelList': [
                  "Plague Champion (Boltgun, Plague knife, Blight Grenades, Krak grenades)",
                  "Plague Marine w/ Special Weapon (Plasma gun, Plague knife, Blight Grenades, Krak grenades)",
                  "4x Plague Marine w/ boltgun (Boltgun, Plague knife, Blight Grenades, Krak Grenades)",
                  "Plague Marine w/ melee weapons (Flail of Corruption, Plague knife, Blight Grenades, Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Plasma gun, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma gun, Supercharge"}),
                  jasmine.objectContaining({'_name': "Flail of Corruption"}),
                  jasmine.objectContaining({'_name': "Plague knife"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
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
                ]}),
              jasmine.objectContaining({
                '_name': "Rubric Marines",
                '_cost': jasmine.objectContaining({_powerLevel: 21, _points: 212, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aspiring Sorcerer"}),
                  jasmine.objectContaining({'_name': "Rubric Marine"}),
                ],
                '_modelList': [
                  "Aspiring Sorcerer (Plasma pistol, Force sword, Glamour of Tzeentch, Smite)",
                  "8x Rubric Marine w/ Inferno Boltgun (Inferno boltgun)",
                  "Rubric Marine w/ Soulreaper cannon (Soulreaper cannon)",
                  "Rubric Marine w/ Warpflamer (Warpflamer)",
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
                  "Plague Marine (Boltgun, Meltagun, 2x Plague knife, 2x Blight Grenades, 2x Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Meltagun"}),
                  jasmine.objectContaining({'_name': "Plague knife"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
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
                ]}),
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
                ]}),
              jasmine.objectContaining({
                '_name': "Helbrute",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 102, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Helbrute"}),
                ],
                '_modelList': [
                  "Helbrute (Multi-melta, Helbrute fist)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Multi-melta"}),
                  jasmine.objectContaining({'_name': "Helbrute fist"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tallyman",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tallyman"}),
                ],
                '_modelList': [
                  "Tallyman (Plasma pistol, Blight Grenades, Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Blight Grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Tzaangor Shaman",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Tzaangor Shaman"}),
                ],
                '_modelList': [
                  "Tzaangor Shaman (Blades on Disc of Tzeentch, Force stave, Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Blades on Disc of Tzeentch"}),
                  jasmine.objectContaining({'_name': "Force stave"}),
                ],
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
                  "Foetid Bloat-drone (2x Plaguespitters, Plague probe)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plaguespitter"}),
                  jasmine.objectContaining({'_name': "Plague probe"}),
                ],
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
                  "Greater Blight Drone (Bile maw, Blightreaper cannon, Plague probe)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bile maw"}),
                  jasmine.objectContaining({'_name': "Blightreaper cannon"}),
                  jasmine.objectContaining({'_name': "Plague probe"}),
                ],
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
                  "Aviarch (Divining spears)",
                  "2x Enlightened (Blades on Disc of Tzeentch, Divining spears)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Blades on Disc of Tzeentch"}),
                  jasmine.objectContaining({'_name': "Divining Spear"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Plagueburst Crawler",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 136, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Plagueburst Crawler"}),
                ],
                '_modelList': [
                  "Plagueburst Crawler (2x Entropy cannon, Heavy slugger, Plagueburst Mortar)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Entropy cannon"}),
                  jasmine.objectContaining({'_name': "Heavy slugger"}),
                  jasmine.objectContaining({'_name': "Plagueburst Mortar"}),
                ],
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
                  "Chaos Xiphon Interceptor (Soulstalker missiles, 2x Twin lascannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Soulstalker missiles"}),
                  jasmine.objectContaining({'_name': "Twin lascannon"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor1"}),
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor2"}),
                  jasmine.objectContaining({'_name': "Chaos Xiphon Interceptor3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Battle-forged CP",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 3}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Cults of the Legion",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 0}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Detachment CP",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 5}),
                '_modelStats': [
                  
                ],
                '_modelList': [
                  
                ],
                '_weapons': [
                  
                ]}),
              jasmine.objectContaining({
                '_name': "Detachment CP",
                '_cost': jasmine.objectContaining({_powerLevel: 0, _points: 0, _commandPoints: 0}),
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