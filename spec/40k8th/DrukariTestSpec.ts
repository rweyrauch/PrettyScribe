import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/Drukari Test.ros", async function() {
    const doc = await readZippedRosterFile('test/40k8th/Drukari Test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 127, _points: 2068, _commandPoints: 13}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Detachment Type: Mixed Detachment",
              "Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Archon",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 61, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Archon"}),
                ],
                '_modelList': [
                  "Archon (Splinter pistol, Huskblade [6 pts], Shadowfield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Huskblade"}),
                ],
                '_rules': mapWithKeys(["Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Overlord", "Shadowfield"]),
                }}),
              jasmine.objectContaining({
                '_name': "Haemonculus",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 74, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Haemonculus"}),
                ],
                '_modelList': [
                  "Haemonculus (Splinter pistol, Agoniser [4 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Agoniser"}),
                ],
                '_rules': mapWithKeys(["Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Insensible to Pain", "Master of Pain"]),
                }}),
              jasmine.objectContaining({
                '_name': "Kabalite Warriors",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 30, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Kabalite Warrior"}),
                  jasmine.objectContaining({'_name': "Sybarite"}),
                ],
                '_modelList': [
                  "4x Kabalite Warrior (Splinter Rifle)",
                  "Sybarite (Splinter Rifle)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter rifle"}),
                ],
                '_rules': mapWithKeys(["Power from Pain", "Vanguard of the Dark City"])}),
              jasmine.objectContaining({
                '_name': "Wracks",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 45, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Acothyst"}),
                  jasmine.objectContaining({'_name': "Wracks"}),
                ],
                '_modelList': [
                  "Acothyst (Haemonculus tools)",
                  "4x Wracks (Haemonculus Tools)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Haemonculus tools"}),
                ],
                '_rules': mapWithKeys(["Power from Pain", "Vanguard of the Dark City"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Insensible to Pain"]),
                }}),
              jasmine.objectContaining({
                '_name': "Wyches",
                '_cost': jasmine.objectContaining({_powerLevel: 2, _points: 40, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Hekatrix"}),
                  jasmine.objectContaining({'_name': "Wych"}),
                ],
                '_modelList': [
                  "Hekatrix (Splinter pistol, Hekatarii blade, Plasma Grenade)",
                  "4x Wych (Splinter Pistol, Hekatarii blade, Plasma Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Hekatarii blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ],
                '_rules': mapWithKeys(["Combat Drugs", "Power from Pain", "Vanguard of the Dark City"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Dodge", "No Escape"]),
                }}),
              jasmine.objectContaining({
                '_name': "Grotesques",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 105, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Grotesque"}),
                ],
                '_modelList': [
                  "3x Grotesque with Monstrous Cleaver (Flesh gauntlet [3 pts], Monstrous cleaver)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Flesh Gauntlet"}),
                  jasmine.objectContaining({'_name': "Monstrous cleaver"}),
                ],
                '_rules': mapWithKeys(["Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Insensible to Pain"]),
                }}),
              jasmine.objectContaining({
                '_name': "Hellions",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Helliarch"}),
                  jasmine.objectContaining({'_name': "Hellion"}),
                ],
                '_modelList': [
                  "Helliarch (Splinter pods, Hellglaive)",
                  "4x Hellion (Splinter pods, Hellglaive)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pods"}),
                  jasmine.objectContaining({'_name': "Hellglaive"}),
                ],
                '_rules': mapWithKeys(["Combat Drugs", "Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Hit and Run"]),
                }}),
              jasmine.objectContaining({
                '_name': "Reavers",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 48, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Arena Champion"}),
                  jasmine.objectContaining({'_name': "Reaver"}),
                ],
                '_modelList': [
                  "Arena Champion (Splinter pistol, Bladevanes, Splinter Rifle)",
                  "2x Reaver (Splinter pistol, Splinter rifle, Bladevanes)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter pistol"}),
                  jasmine.objectContaining({'_name': "Splinter rifle"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ],
                '_rules': mapWithKeys(["Combat Drugs", "Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Matchless Swiftness"]),
                }}),
              jasmine.objectContaining({
                '_name': "Scourges",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 60, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Scourge"}),
                  jasmine.objectContaining({'_name': "Solarite"}),
                ],
                '_modelList': [
                  "4x Scourge w/ shardcarbine (Shardcarbine, Plasma Grenade)",
                  "Solarite (Shardcarbine, Plasma Grenade)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shardcarbine"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ],
                '_rules': mapWithKeys(["Power from Pain"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Ghostplate Armour", "Winged Strike"]),
                }}),
              jasmine.objectContaining({
                '_name': "Ravager",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 140, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Ravager"}),
                ],
                '_modelList': [
                  "Ravager (3x Dark Lance [45 pts], Bladevanes, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Dark Lance"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes", "Hovering", "Night Shield"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Ravager"}),
                  jasmine.objectContaining({'_name': "Ravager 1"}),
                  jasmine.objectContaining({'_name': "Ravager 3"}),
                  jasmine.objectContaining({'_name': "Ravager 2"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Reaper",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 150, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Reaper"}),
                ],
                '_modelList': [
                  "Reaper (Storm Vortex Projector, Scythevanes, Sharpened prow blade, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm Vortex Projector - Beam"}),
                  jasmine.objectContaining({'_name': "Storm Vortex Projector - Blast"}),
                  jasmine.objectContaining({'_name': "Scythevanes"}),
                  jasmine.objectContaining({'_name': "Sharpened prow blade"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes", "Hovering", "Night Shield", "Storm Vortex Projector"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Reaper"}),
                  jasmine.objectContaining({'_name': "Reaper 1"}),
                  jasmine.objectContaining({'_name': "Reaper 2"}),
                  jasmine.objectContaining({'_name': "Reaper 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Voidraven",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 155, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Voidraven"}),
                ],
                '_modelList': [
                  "Voidraven (Two void lances, Night Shield, Void Mine)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Void lance"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Airborne", "Crash and Burn", "Hard to Hit", "Night Shield", "Supersonic", "Void Mine"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Voidraven 1"}),
                  jasmine.objectContaining({'_name': "Voidraven"}),
                  jasmine.objectContaining({'_name': "Voidraven 3"}),
                  jasmine.objectContaining({'_name': "Voidraven 2"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Raider",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Raider"}),
                ],
                '_modelList': [
                  "Raider (Dark Lance [15 pts], Bladevanes, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Dark Lance"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes", "Hovering", "Night Shield", "Open-topped"]),
                  "Transport": mapWithKeys(["Raider"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Raider 3"}),
                  jasmine.objectContaining({'_name': "Raider 2"}),
                  jasmine.objectContaining({'_name': "Raider 1"}),
                  jasmine.objectContaining({'_name': "Raider"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Venom",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 65, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Venom"}),
                ],
                '_modelList': [
                  "Venom (Splinter Cannon [10 pts], Twin splinter rifle, Bladevanes, Flickerfield, Night Shield)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Splinter Cannon"}),
                  jasmine.objectContaining({'_name': "Twin splinter rifle"}),
                  jasmine.objectContaining({'_name': "Bladevanes"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Explodes", "Flickerfield", "Night Shield", "Open-topped"]),
                  "Transport": mapWithKeys(["Venom"]),
                }}),
            ],
            '_rules': new Map([
              ["Poisoned Weapon", jasmine.any(String)],
              ["Power from Pain", jasmine.any(String)],
              ["Vanguard of the Dark City", jasmine.any(String)],
              ["Combat Drugs", jasmine.any(String)],
            ]),
            '_factionRules': new Map(),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "Masque Form: The Silent Shroud: Dance of Nightmares Made Flesh",
              "Battle-forged CP [3 CP]",
              "Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Shadowseer",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Shadowseer"}),
                ],
                '_modelList': [
                  "Shadowseer (Hallucinogen Grenade Launcher, Shuriken Pistol, Miststave, Smite)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Hallucinogen Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Shuriken Pistol"}),
                  jasmine.objectContaining({'_name': "Miststave"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Flip Belt", "Holo-suit", "Rising Crescendo", "Shield from Harm"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Shadowseer - Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "The Yncarne",
                '_cost': jasmine.objectContaining({_powerLevel: 14, _points: 280, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "The Yncarne"}),
                ],
                '_modelList': [
                  "The Yncarne (Vilith-zhar, the Sword of Souls)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Vilith-zhar, the Sword of Souls"}),
                ],
                '_rules': mapWithKeys(["Strength from Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Avatar of Ynnead", "Daemonic Avatar", "Inevitable Death", "Summoned by Death", "Ynnead Stirs"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Yvraine",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 115, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Yvraine"}),
                ],
                '_modelList': [
                  "Yvraine (Kha-vir, the Sword of Sorrows.)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Kha-vir, the Sword of Sorrows."}),
                ],
                '_rules': mapWithKeys(["Strength from Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Favoured of Ynnead", "Grinx Familiar", "Herald of Ynnead", "Revered Figurehead", "Runesuit"]),
                },
                '_spells': [
                  jasmine.objectContaining({'_name': "Smite"}),
                ],
                '_psykers': [
                  jasmine.objectContaining({'_name': "Psyker"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Troupe",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Player"}),
                ],
                '_modelList': [
                  "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Pistol"}),
                  jasmine.objectContaining({'_name': "Harlequin's Blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Flip Belt", "Holo-suit", "Rising Crescendo"]),
                }}),
              jasmine.objectContaining({
                '_name': "Troupe",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Player"}),
                ],
                '_modelList': [
                  "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Pistol"}),
                  jasmine.objectContaining({'_name': "Harlequin's Blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Flip Belt", "Holo-suit", "Rising Crescendo"]),
                }}),
              jasmine.objectContaining({
                '_name': "Troupe",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 55, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Player"}),
                ],
                '_modelList': [
                  "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Pistol"}),
                  jasmine.objectContaining({'_name': "Harlequin's Blade"}),
                  jasmine.objectContaining({'_name': "Plasma Grenade"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Flip Belt", "Holo-suit", "Rising Crescendo"]),
                }}),
              jasmine.objectContaining({
                '_name': "Death Jester",
                '_cost': jasmine.objectContaining({_powerLevel: 3, _points: 45, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Death Jester"}),
                ],
                '_modelList': [
                  "Death Jester (Shrieker Cannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shrieker Cannon (Shrieker)"}),
                  jasmine.objectContaining({'_name': "Shrieker Cannon (Shuriken)"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Deadly Hunter", "Death is Not Enough", "Flip Belt", "Holo-suit", "Rising Crescendo"]),
                }}),
              jasmine.objectContaining({
                '_name': "Skyweavers",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 70, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Skyweaver"}),
                ],
                '_modelList': [
                  "2x Skyweaver (Shuriken Cannon [10 pts], Star Bolas)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Cannon"}),
                  jasmine.objectContaining({'_name': "Star Bolas"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Blur of Colour", "Holo-suit", "Mirage Launchers", "Rising Crescendo"]),
                }}),
              jasmine.objectContaining({
                '_name': "Voidweaver",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Voidweaver"}),
                ],
                '_modelList': [
                  "Voidweaver (Haywire Cannon [15 pts], 2x Shuriken Cannon [20 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Haywire Cannon"}),
                  jasmine.objectContaining({'_name': "Shuriken Cannon"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Blur of Colour", "Explodes", "Holo-fields", "Mirage Launchers"]),
                }}),
              jasmine.objectContaining({
                '_name': "Starweaver",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 80, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Starweaver"}),
                ],
                '_modelList': [
                  "Starweaver (2x Shuriken Cannon [20 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Shuriken Cannon"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Blur of Colour", "Explodes", "Holo-fields", "Mirage Launchers", "Open-topped"]),
                  "Transport": mapWithKeys(["Starweaver - Transport"]),
                }}),
            ],
            '_rules': new Map([
              ["Strength from Death", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["The Silent Shroud: Dance of Nightmares Made Flesh", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});