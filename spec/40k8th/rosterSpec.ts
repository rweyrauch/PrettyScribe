import { readZippedRosterFile } from '../helpers/readRosterFile';
import { Create40kRoster } from "../../src/roster40k";

function mapWithKeys(keys: string[]) {
  return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function() {
  it("loads test/40k8th/roster.ros", async function() {
    const doc = await readZippedRosterFile('test/40k8th/roster.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_cost': jasmine.objectContaining({_powerLevel: 100, _points: 1998, _commandPoints: 8}),
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - **Chapter Selection**: Imperial Fists Successor, Black Templars",
              "No Force Org Slot - Battle-forged CP [3 CP]",
              "No Force Org Slot - Detachment CP [5 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Captain in Phobos Armour",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 99, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Captain in Phobos Armour"}),
                ],
                '_modelList': [
                  "Captain in Phobos Armour (Bolt pistol, Master-crafted instigator bolt carbine [6 pts], Combat knife, Frag & Krak grenades, Camo cloak [3 pts], Frontline Commander, The Aurillian Shroud, Warlord)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Master-crafted instigator bolt carbine"}),
                  jasmine.objectContaining({'_name': "Combat knife"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Camo cloak", "Concealed Position", "Frontline Commander", "Iron Halo", "Omni-scrambler", "Rites of Battle"]),
                }}),
              jasmine.objectContaining({
                '_name': "The Emperor's Champion",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 75, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Emperor's Champion"}),
                ],
                '_modelList': [
                  "The Emperor's Champion (Bolt pistol, Black Sword, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Black Sword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Armour of Faith", "Sigismund's Honour", "Skilful Parry", "Slayer of Champions"]),
                }}),
              jasmine.objectContaining({
                '_name': "Crusader Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 74, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Initiate"}),
                  jasmine.objectContaining({'_name': "Sword Brother"}),
                ],
                '_modelList': [
                  "4x Initiate w/Chainsword (Bolt pistol, Chainsword, Frag & Krak grenades)",
                  "Sword Brother (Bolt pistol, Power fist [9 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Power fist"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Paired Combatants"]),
                }}),
              jasmine.objectContaining({
                '_name': "Infiltrator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 110, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Infiltrator"}),
                  jasmine.objectContaining({'_name': "Infiltrator Sergeant"}),
                ],
                '_modelList': [
                  "4x Infilltrator (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)",
                  "Infiltrator Sergeant (Bolt pistol, Marksman bolt carbine, Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Marksman bolt carbine"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Concealed Positions", "Omni-scramblers", "Smoke Grenades"]),
                }}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 101, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
                ],
                '_modelList': [
                  "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag & Krak grenades)",
                  "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer [16 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Stalker Bolt Rifle"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads"]),
                }}),
              jasmine.objectContaining({
                '_name': "Intercessor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 101, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Intercessor"}),
                  jasmine.objectContaining({'_name': "Intercessor Sergeant"}),
                ],
                '_modelList': [
                  "4x Intercessor (Bolt pistol, Stalker Bolt Rifle, Frag & Krak grenades)",
                  "Intercessor Sergeant (Bolt pistol, Stalker Bolt Rifle, Thunder hammer [16 pts], Frag & Krak grenades)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Stalker Bolt Rifle"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads"]),
                }}),
              jasmine.objectContaining({
                '_name': "Vanguard Veteran Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 174, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine Veteran (Jump Pack)"}),
                  jasmine.objectContaining({'_name': "Veteran Sergeant (Jump Pack)"}),
                ],
                '_modelList': [
                  "Vanguard Veteran Squad (Grav-pistol [8 pts], Relic blade [9 pts], 4x Thunder hammer [64 pts], 5x Frag & Krak grenades, Jump Pack [15 pts / 1 PL], 4x Storm shield [8 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Grav-pistol"}),
                  jasmine.objectContaining({'_name': "Relic blade"}),
                  jasmine.objectContaining({'_name': "Thunder hammer"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Jump Pack Assault", "Storm shield"]),
                }}),
              jasmine.objectContaining({
                '_name': "Assault Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine (Jump Pack)"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant (Jump Pack)"}),
                ],
                '_modelList': [
                  "Assault Squad (2x Bolt pistol, 3x Plasma pistol [15 pts], 5x Chainsword, 5x Frag & Krak grenades, Jump Pack [15 pts / 1 PL])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Jump Pack Assault"]),
                }}),
              jasmine.objectContaining({
                '_name': "Suppressor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Suppressor"}),
                  jasmine.objectContaining({'_name': "Suppressor Sergeant"}),
                ],
                '_modelList': [
                  "2x Suppressor (Accelerator autocannon [10 pts], Bolt pistol, Frag & Krak grenades, Grav-chute [2 pts])",
                  "Suppressor Sergeant (Accelerator autocannon [10 pts], Bolt pistol, Frag & Krak grenades, Grav-chute [2 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Accelerator autocannon"}),
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Grav-chute", "Smoke Launcher", "Suppressing Fire"]),
                }}),
              jasmine.objectContaining({
                '_name': "Eliminator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 72, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Eliminator"}),
                  jasmine.objectContaining({'_name': "Eliminator Sergeant"}),
                ],
                '_modelList': [
                  "Eliminator Sergeant (Bolt pistol, Bolt sniper rifle [3 pts], Frag & Krak grenades, Camo cloak [3 pts])",
                  "2x Eliminator with Bolt Sniper (Bolt pistol, Bolt sniper rifle [3 pts], Frag & Krak grenades, Camo cloak [3 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Executioner round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Hyperfrag round"}),
                  jasmine.objectContaining({'_name': "Bolt sniper rifle - Mortis round"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Camo cloaks", "Concealed Positions", "Covering Fire", "Guided Aim"]),
                }}),
            ],
            '_rules': new Map([
              ["Bolter Discipline", jasmine.any(String)],
              ["Angels of Death", jasmine.any(String)],
              ["Shock Assault", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Righteous Zeal", jasmine.any(String)],
            ]),
          }),
          jasmine.objectContaining({
            '_configurations': [
              "No Force Org Slot - **Chapter Selection**: Imperial Fists Successor, Black Templars",
              "No Force Org Slot - Detachment CP [1 CP]",
              "No Force Org Slot - Relics of the Chapter: Number of extra Relics [-1 CP]",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Chaplain Grimaldus",
                '_cost': jasmine.objectContaining({_powerLevel: 6, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaplain Grimaldus"}),
                ],
                '_modelList': [
                  "Chaplain Grimaldus (Plasma pistol, Artificer Crozius, Frag & Krak grenades, 1. Litany of Divine Protection, 5. Fervent Acclamation, Litany of Hate)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Plasma pistol, Standard"}),
                  jasmine.objectContaining({'_name': "Plasma pistol, Supercharge"}),
                  jasmine.objectContaining({'_name': "Artificer Crozius"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["1. Litany of Divine Protection", "5. Fervent Acclamation", "Devout Puritan", "Litanies of Battle (Chaplain Grimaldus)", "Litany of Hate", "Rosarius", "Spiritual Leader", "Unmatched Zeal"]),
                }}),
              jasmine.objectContaining({
                '_name': "Aggressor Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 5, _points: 111, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Aggressor"}),
                  jasmine.objectContaining({'_name': "Aggressor Sergeant"}),
                ],
                '_modelList': [
                  "2x Aggressor (Auto Boltstorm Gauntlets, Fragstorm Grenade Launcher)",
                  "Aggressor Sergeant (Auto Boltstorm Gauntlets, Fragstorm Grenade Launcher)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Auto Boltstorm Gauntlets (Shooting)"}),
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Auto Boltstorm Gauntlets (Melee)"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Combat Squads", "Fire Storm", "Relentless Advance"]),
                }}),
              jasmine.objectContaining({
                '_name': "Redemptor Dreadnought",
                '_cost': jasmine.objectContaining({_powerLevel: 7, _points: 157, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought"}),
                ],
                '_modelList': [
                  "Redemptor Dreadnought (2x Fragstorm Grenade Launchers [8 pts], Heavy flamer [14 pts], Heavy Onslaught Gatling Cannon [30 pts], Redemptor Fist)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy flamer"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Redemptor Fist"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D6)"]),
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 1"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 2"}),
                  jasmine.objectContaining({'_name': "Redemptor Dreadnought 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Devastator Squad",
                '_cost': jasmine.objectContaining({_powerLevel: 9, _points: 163, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Space Marine"}),
                  jasmine.objectContaining({'_name': "Space Marine Sergeant"}),
                ],
                '_modelList': [
                  "Devastator Squad (7x Bolt pistol, Boltgun, 4x Grav-cannon and grav-amp [80 pts], Chainsword, 6x Frag & Krak grenades, Armorium Cherub [5 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Bolt pistol"}),
                  jasmine.objectContaining({'_name': "Boltgun"}),
                  jasmine.objectContaining({'_name': "Grav-cannon and grav-amp"}),
                  jasmine.objectContaining({'_name': "Chainsword"}),
                  jasmine.objectContaining({'_name': "Frag grenade"}),
                  jasmine.objectContaining({'_name': "Krak grenade"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Armorium Cherub", "Combat Squads", "Signum"]),
                }}),
              jasmine.objectContaining({
                '_name': "Repulsor Executioner",
                '_cost': jasmine.objectContaining({_powerLevel: 15, _points: 330, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Repulsor Executioner"}),
                ],
                '_modelList': [
                  "Repulsor Executioner (2x Fragstorm Grenade Launcher [8 pts], Heavy Laser Destroyer [40 pts], Heavy Onslaught Gatling Cannon [30 pts], Ironhail Heavy Stubber [6 pts], 2x Storm bolter [4 pts], Twin Heavy Bolter [17 pts], Twin Icarus Ironhail Heavy Stubber [10 pts], Auto Launchers)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Fragstorm Grenade Launcher"}),
                  jasmine.objectContaining({'_name': "Heavy Laser Destroyer"}),
                  jasmine.objectContaining({'_name': "Heavy Onslaught Gatling Cannon"}),
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                  jasmine.objectContaining({'_name': "Twin Heavy Bolter"}),
                  jasmine.objectContaining({'_name': "Twin Icarus Ironhail Heavy Stubber"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D6)"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Aquilon Optics", "Auto Launchers", "Hover Tank", "Power of the Machine Spirit", "Repulsor Field"]),
                  "Transport": mapWithKeys(["Transport"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Repulsor Executioner 1"}),
                  jasmine.objectContaining({'_name': "Repulsor Executioner 2"}),
                  jasmine.objectContaining({'_name': "Repulsor Executioner 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Drop Pod",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 65, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Drop Pod"}),
                ],
                '_modelList': [
                  "Drop Pod (Storm bolter [2 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                ],
                '_rules': mapWithKeys(["Angels of Death"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Drop Pod Assault", "Immobile"]),
                  "Transport": mapWithKeys(["Transport"]),
                }}),
              jasmine.objectContaining({
                '_name': "Impulsor",
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 90, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Impulsor"}),
                ],
                '_modelList': [
                  "Impulsor (Ironhail Heavy Stubber [6 pts], Ironhail Skytalon Array [5 pts], 2x Storm Bolters [4 pts])"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Ironhail Heavy Stubber"}),
                  jasmine.objectContaining({'_name': "Ironhail Sytalon Array"}),
                  jasmine.objectContaining({'_name': "Storm bolter"}),
                ],
                '_rules': mapWithKeys(["Angels of Death", "Explodes (6\"/D3)"]),
                '_abilities': {
                  "Abilities": mapWithKeys(["Assault Vehicle", "Hover Tank", "Repulsor Field"]),
                  "Transport": mapWithKeys(["Impulsor"]),
                },
                '_woundTracker': [
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 1"}),
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 2"}),
                  jasmine.objectContaining({'_name': "Impulsor Wound Track 3"}),
                ]}),
              jasmine.objectContaining({
                '_name': "Cenobyte Servitors",
                '_cost': jasmine.objectContaining({_powerLevel: 1, _points: 6, _commandPoints: 0}),
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Cenobyte Servitors"}),
                ],
                '_modelList': [
                  "Cenobyte Servitors (3x Close Combat Weapon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Close Combat Weapon"}),
                ],
                '_abilities': {
                  "Abilities": mapWithKeys(["Chaplain's Retinue", "Mindwiped", "Relic of Helsreach"]),
                }}),
            ],
            '_rules': new Map([
              ["Angels of Death", jasmine.any(String)],
              ["Explodes (6\"/D6)", jasmine.any(String)],
              ["Explodes (6\"/D3)", jasmine.any(String)],
            ]),
            '_factionRules': new Map([
              ["Righteous Zeal", jasmine.any(String)],
            ]),
          }),
        ]}));
  });
});