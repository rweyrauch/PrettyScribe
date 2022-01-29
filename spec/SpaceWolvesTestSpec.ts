import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/Space Wolves Test.rosz", async function() {
    const doc = await readZippedRosterFile('test/Space Wolves Test.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 122, _points: 1942, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Detachment CP",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Arjac Rockfist",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Arjac Rockfist"}),
                ],
                '_modelList': [
                  "Arjac Rockfist (Foehammer)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Foehammer (shooting)"}),
                  jasmine.objectContaining({'_name': "Foehammer (melee)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Njal Stormcaller",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 115, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Njal Stormcaller"}),
                ],
                '_modelList': [
                  "Njal Stormcaller (Bolt pistol, Nightwing, 4. Fury of the Wolf Spirits, Staff of the Stormcaller, Frag & Krak grenades, Psychic hood, Runic armour)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Nightwing"}),
                  jasmine.objectContaining({'_name': "Freki and Geri"}),
                  jasmine.objectContaining({'_name': "Staff of the Stormcaller"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_spells': [
                  jasmine.objectContaining({'_name': "Fury of the Wolf Spirits"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Blood Claws",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Blood Claw"}),
                  jasmine.objectContaining({'_name': "Blood Claw Pack Leader"}),
                ],
                '_modelList': [
                  "4x Blood Claw (Bolt pistol, Chainsword, Frag & Krak grenades)",
                  "Blood Claw Pack Leader (Bolt pistol, Chainsword, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Grey Hunters",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Hunter"}),
                  jasmine.objectContaining({'_name': "Grey Hunter  Pack Leader"}),
                ],
                '_modelList': [
                  "Grey Hunter Pack Leader (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Grey Hunter w/Bolt Pistol (Bolt pistol, Boltgun, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Grey Hunters",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Hunter"}),
                  jasmine.objectContaining({'_name': "Grey Hunter  Pack Leader"}),
                ],
                '_modelList': [
                  "Grey Hunter Pack Leader (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Grey Hunter w/Bolt Pistol (Bolt pistol, Boltgun, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Hellblaster Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 165, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hellblaster"}),
                  jasmine.objectContaining({'_name': "Hellblaster Pack Leader"}),
                ],
                '_modelList': [
                  "4x Hellblaster (Bolt pistol, Plasma Incinerator, Frag & Krak grenades)",
                  "Hellblaster Pack Leader (Bolt pistol, Plasma Incinerator, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Plasma incinerator, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma incinerator, Supercharge"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Stormfang Gunship",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 251, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Stormfang Gunship"}),
                ],
                '_modelList': [
                  "Stormfang Gunship (Helfrost destructor, 2x Stormstrike missile launcher, 2x Twin heavy bolter)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Helfrost destructor - Dispersed beam"}),
                  jasmine.objectContaining({'_name': "Helfrost destructor - Focused beam"}),
                  jasmine.objectContaining({'_name': "Stormstrike missile launcher"}),
                  jasmine.objectContaining({'_name': "Twin heavy bolter"}),
                ],
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Stormfang Gunship (1)"}),
                  jasmine.objectContaining({'_name': "Stormfang Gunship (2)"}),
                  jasmine.objectContaining({'_name': "Stormfang Gunship (3)"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lucius Pattern Dreadnought Drop Pod",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lucius Drop Pod"}),
                ],
                '_modelList': [
                  "Lucius Pattern Dreadnought Drop Pod"
                ],
                '_weapons': [
                  
                ]}),
            ],
            '_rules': new Map([
              ["Shock Assault", jasmine.any(String)],
              ["Bolter Discipline", jasmine.any(String)],
              ["And They Shall Know No Fear", jasmine.any(String)],
              ["Hunters Unleashed", jasmine.any(String)],
              ["Defenders of Humanity", jasmine.any(String)],
              ["Angels of Death", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "Battle-forged CP",
              "Detachment CP",
              "Stratagems - Specialist Detachment: Stalker Pack [-1 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Bjorn the Fell-handed",
                '_cost': jasmine.objectContaining({_powerLevel: 12, _points: 186, _commandPoints: 1}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Bjorn the Fell-handed"}),
                ],
                '_modelList': [
                  "Bjorn the Fell-handed (Assault cannon, Heavy flamer, Trueclaw, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Assault cannon"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Trueclaw"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Primaris Battle Leader",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Battle Leader"}),
                ],
                '_modelList': [
                  "Primaris Battle Leader (Bolt carbine, Bolt pistol, Power axe, Frag & Krak grenades, Helm of Durfast)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Carbine"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Power axe"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Blood Claws",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Blood Claw"}),
                  jasmine.objectContaining({'_name': "Blood Claw Pack Leader"}),
                ],
                '_modelList': [
                  "4x Blood Claw (Bolt pistol, Chainsword, Frag & Krak grenades)",
                  "Blood Claw Pack Leader (Bolt pistol, Chainsword, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Grey Hunters",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grey Hunter"}),
                  jasmine.objectContaining({'_name': "Grey Hunter  Pack Leader"}),
                ],
                '_modelList': [
                  "Grey Hunter Pack Leader (Bolt pistol, Boltgun, Frag & Krak grenades)",
                  "4x Grey Hunter w/Bolt Pistol (Bolt pistol, Boltgun, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Incursor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 95, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Incursor"}),
                  jasmine.objectContaining({'_name': "Incursor Sergeant"}),
                ],
                '_modelList': [
                  "4x Incursor (Bolt pistol, Occulus bolt carbine, Paired combat blades, Frag & Krak grenades)",
                  "Incursor Sergeant (Bolt pistol, Occulus bolt carbine, Paired combat blades, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Occulus bolt carbine"}),
                  jasmine.objectContaining({'_name': "Paired combat blades"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lone Wolf [Index]",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lone Wolf"}),
                ],
                '_modelList': [
                  "Lone Wolf [Index] (Chainsword, Power axe, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Power axe"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lone Wolf in Terminator Armour [Index]",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 121, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lone Wolf"}),
                ],
                '_modelList': [
                  "Lone Wolf in Terminator Armour [Index] (Storm bolter, Power sword)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Power sword"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Lukas the Trickster",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lukas The Trickster"}),
                ],
                '_modelList': [
                  "Lukas the Trickster (Plasma pistol, Claw of the Jackalwolf, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Claw of the Jackalwolf"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Murderfang",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 125, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Murderfang"}),
                ],
                '_modelList': [
                  "Murderfang (Heavy flamer, Storm bolter, The Murderclaws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "The Murderclaws"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Wulfen",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 164, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Wulfen"}),
                  jasmine.objectContaining({'_name': "Wulfen Pack Leader"}),
                ],
                '_modelList': [
                  "4x Wulfen (Frost claws, Great frost axe, Thunder Hammer, Wulfen claws)",
                  "Wulfen Pack Leader (2x Frost claws, Great frost axe, Thunder Hammer, Wulfen claws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Frost claws"}),
                  jasmine.objectContaining({'_name': "Great frost axe"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Wulfen claws"}),
                ]}),
            ],
            '_rules': new Map([
              ["And They Shall Know No Fear", jasmine.any(String)],
              ["Hunters Unleashed", jasmine.any(String)],
              ["Defenders of Humanity", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Stalker Pack", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});