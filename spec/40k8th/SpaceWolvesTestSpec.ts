import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Space Wolves Test.rosz", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Space Wolves Test.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 122, _points: 1942, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Detachment CP [5 CP]",
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Champion of the Kingsguard", "Teleport Strike", "Thane to the High King", "The Anvil Sheild"]),
                }}),
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
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Lord of Tempests", "Psychic hood", "Runic Armour"]),
                },
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Defenders of Humanity", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Beserk Charge", "Headstrong", "Mixed Unit"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Defenders of Humanity", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Mixed Unit"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Defenders of Humanity", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Mixed Unit"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hellblaster Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 8, _points: 165, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hellblaster"}),
                  jasmine.objectContaining({'_name': "Hellblaster Pack Leader"}),
                ],
                '_modelList': [
                  "4x Hellblaster (Bolt pistol, Plasma Incinerator [75 pts], Frag & Krak grenades)",
                  "Hellblaster Pack Leader (Bolt pistol, Plasma Incinerator [75 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Plasma incinerator, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma incinerator, Supercharge"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads"]),
                }}),
              jasmine.objectContaining({
                '_name': "Stormfang Gunship",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 251, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Stormfang Gunship"}),
                ],
                '_modelList': [
                  "Stormfang Gunship (Helfrost destructor, 2x Stormstrike missile launcher [42 pts], 2x Twin heavy bolter [34 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Helfrost destructor - Dispersed beam"}),
                  jasmine.objectContaining({'_name': "Helfrost destructor - Focused beam"}),
                  jasmine.objectContaining({'_name': "Stormstrike missile launcher"}),
                  jasmine.objectContaining({'_name': "Twin heavy bolter"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Airborne", "Crash and Burn", "Hard to Hit", "Hover Jet", "Power of the Machine Spirit", "Supersonic"]),
                  "Transport": mapWithKeys(["Transport"]),
                },
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
                  
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Drop Pod Assault", "Immobile (Drop Pods)"]),
                  "Transport": mapWithKeys(["Transport"]),
                }}),
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
              "Battle-forged CP [3 CP]",
              "Detachment CP [5 CP]",
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
                  "Bjorn the Fell-handed (Assault cannon [22 pts], Heavy flamer [14 pts], Trueclaw, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Assault cannon"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Trueclaw"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Ancient Tactician", "Explodes (Dreadnought)", "Last of the Company of Russ", "Legendary Tenacity", "Saga of Majesty", "Smoke Launchers"]),
                }}),
              jasmine.objectContaining({
                '_name': "Primaris Battle Leader",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Primaris Battle Leader"}),
                ],
                '_modelList': [
                  "Primaris Battle Leader (Bolt carbine, Bolt pistol, Power axe [5 pts], Frag & Krak grenades, Helm of Durfast)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt Carbine"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Power axe"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Helm of Durfast", "Huskarl to the Jarl"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Defenders of Humanity", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Beserk Charge", "Headstrong", "Mixed Unit"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Defenders of Humanity", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Mixed Unit"]),
                }}),
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
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Concealed Positions", "Multi-spectrum array", "Smoke Grenades"]),
                }}),
              jasmine.objectContaining({
                '_name': "Lone Wolf [Index]",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lone Wolf"}),
                ],
                '_modelList': [
                  "Lone Wolf [Index] (Chainsword, Power axe [5 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Power axe"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["...Worthy of a Saga", "A Glorious Death...", "An Army of One"]),
                }}),
              jasmine.objectContaining({
                '_name': "Lone Wolf in Terminator Armour [Index]",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 121, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Lone Wolf"}),
                ],
                '_modelList': [
                  "Lone Wolf in Terminator Armour [Index] (Storm bolter [2 pts], Power sword [4 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Power sword"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["...Worthy of a Saga", "A Glorious Death...", "An Army of One", "Crux Terminatus", "Teleport Strike"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Blood Claw Hero", "Master of Mischief", "Pelt of the Doppegangrel", "The Last Laugh"]),
                }}),
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
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes (Dreadnought)", "Force of Untamed Destruction", "Murderlust"]),
                }}),
              jasmine.objectContaining({
                '_name': "Wulfen",
                '_cost': jasmine.objectContaining({_powerLevel: 11, _points: 164, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Wulfen"}),
                  jasmine.objectContaining({'_name': "Wulfen Pack Leader"}),
                ],
                '_modelList': [
                  "4x Wulfen (Frost claws [11 pts], Great frost axe [9 pts], Thunder Hammer [16 pts], Wulfen claws)",
                  "Wulfen Pack Leader (2x Frost claws [22 pts], Great frost axe [9 pts], Thunder Hammer [16 pts], Wulfen claws)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Frost claws"}),
                  jasmine.objectContaining({'_name': "Great frost axe"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Wulfen claws"}),
                ],
                '_rules': mapWithKeys(["And They Shall Know No Fear", "Hunters Unleashed"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Bounding Lope", "Curse of the Wulfen (Hunt)", "Curse of the Wulfen (Kill)", "Death Frenzy", "Storm Shield"]),
                }}),
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