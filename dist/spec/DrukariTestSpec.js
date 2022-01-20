"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readRosterFile_1 = require("./helpers/readRosterFile");
const roster40k_1 = require("../src/roster40k");
describe("Create40kRoster", function () {
    it("loads test/Drukari Test.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Drukari Test.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 127,
                '_points': 2068,
                '_commandPoints': 13,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                            "Detachment Type: Mixed Detachment",
                            "Detachment CP",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Archon",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Archon" }),
                                ],
                                '_modelList': [
                                    "Archon (Splinter pistol, Huskblade, Shadowfield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter pistol" }),
                                    jasmine.objectContaining({ '_name': "Huskblade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Haemonculus",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Haemonculus" }),
                                ],
                                '_modelList': [
                                    "Haemonculus (Splinter pistol, Agoniser)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter pistol" }),
                                    jasmine.objectContaining({ '_name': "Agoniser" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Kabalite Warriors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Kabalite Warrior" }),
                                    jasmine.objectContaining({ '_name': "Sybarite" }),
                                ],
                                '_modelList': [
                                    "4x Kabalite Warrior (Splinter Rifle)",
                                    "Sybarite (Splinter Rifle)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter rifle" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Wracks",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Acothyst" }),
                                    jasmine.objectContaining({ '_name': "Wracks" }),
                                ],
                                '_modelList': [
                                    "Acothyst (Haemonculus tools)",
                                    "4x Wracks (Haemonculus Tools)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Haemonculus tools" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Wyches",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Hekatrix" }),
                                    jasmine.objectContaining({ '_name': "Wych" }),
                                ],
                                '_modelList': [
                                    "Hekatrix (Splinter pistol, Hekatarii blade, Plasma Grenade)",
                                    "4x Wych (Splinter Pistol, Hekatarii blade, Plasma Grenade)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter pistol" }),
                                    jasmine.objectContaining({ '_name': "Hekatarii blade" }),
                                    jasmine.objectContaining({ '_name': "Plasma Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Grotesques",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Grotesque" }),
                                ],
                                '_modelList': [
                                    "3x Grotesque with Monstrous Cleaver (Flesh gauntlet, Monstrous cleaver)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Flesh Gauntlet" }),
                                    jasmine.objectContaining({ '_name': "Monstrous cleaver" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Hellions",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Helliarch" }),
                                    jasmine.objectContaining({ '_name': "Hellion" }),
                                ],
                                '_modelList': [
                                    "Helliarch (Splinter pods, Hellglaive)",
                                    "4x Hellion (Splinter pods, Hellglaive)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter pods" }),
                                    jasmine.objectContaining({ '_name': "Hellglaive" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Reavers",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Arena Champion" }),
                                    jasmine.objectContaining({ '_name': "Reaver" }),
                                ],
                                '_modelList': [
                                    "Arena Champion (Splinter pistol, Bladevanes, Splinter Rifle)",
                                    "2x Reaver (Splinter pistol, Splinter rifle, Bladevanes)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter pistol" }),
                                    jasmine.objectContaining({ '_name': "Splinter rifle" }),
                                    jasmine.objectContaining({ '_name': "Bladevanes" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Scourges",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Scourge" }),
                                    jasmine.objectContaining({ '_name': "Solarite" }),
                                ],
                                '_modelList': [
                                    "4x Scourge w/ shardcarbine (Shardcarbine, Plasma Grenade)",
                                    "Solarite (Shardcarbine, Plasma Grenade)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shardcarbine" }),
                                    jasmine.objectContaining({ '_name': "Plasma Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Ravager",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Ravager" }),
                                ],
                                '_modelList': [
                                    "Ravager (3x Dark Lance, Bladevanes, Night Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Dark Lance" }),
                                    jasmine.objectContaining({ '_name': "Bladevanes" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Ravager" }),
                                    jasmine.objectContaining({ '_name': "Ravager 1" }),
                                    jasmine.objectContaining({ '_name': "Ravager 3" }),
                                    jasmine.objectContaining({ '_name': "Ravager 2" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Reaper",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Reaper" }),
                                ],
                                '_modelList': [
                                    "Reaper (Storm Vortex Projector, Scythevanes, Sharpened prow blade, Night Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Storm Vortex Projector - Beam" }),
                                    jasmine.objectContaining({ '_name': "Storm Vortex Projector - Blast" }),
                                    jasmine.objectContaining({ '_name': "Scythevanes" }),
                                    jasmine.objectContaining({ '_name': "Sharpened prow blade" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Reaper" }),
                                    jasmine.objectContaining({ '_name': "Reaper 1" }),
                                    jasmine.objectContaining({ '_name': "Reaper 2" }),
                                    jasmine.objectContaining({ '_name': "Reaper 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Voidraven",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Voidraven" }),
                                ],
                                '_modelList': [
                                    "Voidraven (Two void lances, Night Shield, Void Mine)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Void lance" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Voidraven 1" }),
                                    jasmine.objectContaining({ '_name': "Voidraven" }),
                                    jasmine.objectContaining({ '_name': "Voidraven 3" }),
                                    jasmine.objectContaining({ '_name': "Voidraven 2" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Raider",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Raider" }),
                                ],
                                '_modelList': [
                                    "Raider (Dark Lance, Bladevanes, Night Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Dark Lance" }),
                                    jasmine.objectContaining({ '_name': "Bladevanes" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Raider 3" }),
                                    jasmine.objectContaining({ '_name': "Raider 2" }),
                                    jasmine.objectContaining({ '_name': "Raider 1" }),
                                    jasmine.objectContaining({ '_name': "Raider" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Venom",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Venom" }),
                                ],
                                '_modelList': [
                                    "Venom (Splinter Cannon, Twin splinter rifle, Bladevanes, Flickerfield, Night Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Splinter Cannon" }),
                                    jasmine.objectContaining({ '_name': "Twin splinter rifle" }),
                                    jasmine.objectContaining({ '_name': "Bladevanes" }),
                                ]
                            }),
                        ]
                    }),
                    jasmine.objectContaining({
                        '_configurations': [
                            "Masque Form: The Silent Shroud: Dance of Nightmares Made Flesh",
                            "Battle-forged CP",
                            "Detachment CP",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Shadowseer",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Shadowseer" }),
                                ],
                                '_modelList': [
                                    "Shadowseer (Hallucinogen Grenade Launcher, Shuriken Pistol, Miststave, Smite)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Hallucinogen Grenade Launcher" }),
                                    jasmine.objectContaining({ '_name': "Shuriken Pistol" }),
                                    jasmine.objectContaining({ '_name': "Miststave" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Shadowseer - Psyker" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "The Yncarne",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "The Yncarne" }),
                                ],
                                '_modelList': [
                                    "The Yncarne (Vilith-zhar, the Sword of Souls)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Vilith-zhar, the Sword of Souls" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Psyker" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Yvraine",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Yvraine" }),
                                ],
                                '_modelList': [
                                    "Yvraine (Kha-vir, the Sword of Sorrows.)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Kha-vir, the Sword of Sorrows." }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Psyker" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Troupe",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Player" }),
                                ],
                                '_modelList': [
                                    "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shuriken Pistol" }),
                                    jasmine.objectContaining({ '_name': "Harlequin's Blade" }),
                                    jasmine.objectContaining({ '_name': "Plasma Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Troupe",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Player" }),
                                ],
                                '_modelList': [
                                    "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shuriken Pistol" }),
                                    jasmine.objectContaining({ '_name': "Harlequin's Blade" }),
                                    jasmine.objectContaining({ '_name': "Plasma Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Troupe",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Player" }),
                                ],
                                '_modelList': [
                                    "5x Player (Shuriken Pistol, Harlequin's Blade, Plasma Grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shuriken Pistol" }),
                                    jasmine.objectContaining({ '_name': "Harlequin's Blade" }),
                                    jasmine.objectContaining({ '_name': "Plasma Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Death Jester",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Death Jester" }),
                                ],
                                '_modelList': [
                                    "Death Jester (Shrieker Cannon)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shrieker Cannon (Shrieker)" }),
                                    jasmine.objectContaining({ '_name': "Shrieker Cannon (Shuriken)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Skyweavers",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Skyweaver" }),
                                ],
                                '_modelList': [
                                    "2x Skyweaver (Shuriken Cannon, Star Bolas)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shuriken Cannon" }),
                                    jasmine.objectContaining({ '_name': "Star Bolas" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Voidweaver",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Voidweaver" }),
                                ],
                                '_modelList': [
                                    "Voidweaver (Haywire Cannon, 2x Shuriken Cannon)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Haywire Cannon" }),
                                    jasmine.objectContaining({ '_name': "Shuriken Cannon" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Starweaver",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Starweaver" }),
                                ],
                                '_modelList': [
                                    "Starweaver (2x Shuriken Cannon)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shuriken Cannon" }),
                                ]
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=DrukariTestSpec.js.map