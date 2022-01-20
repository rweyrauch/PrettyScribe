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
    it("loads test/Magnus.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Magnus.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 79,
                '_points': 1315,
                '_commandPoints': 8,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                            "Battle-forged CP",
                            "Detachment CP",
                            "Cults of the Legion: Cult of Scheming",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Ahriman",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Ahriman" }),
                                ],
                                '_modelList': [
                                    "Ahriman (Inferno Bolt Pistol, Black Staff of Ahriman, Frag & Krak grenades, Smite)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Inferno Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Black Staff of Ahriman" }),
                                    jasmine.objectContaining({ '_name': "Frag grenade" }),
                                    jasmine.objectContaining({ '_name': "Krak grenade" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Ahriman" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Exalted Sorcerer",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Exalted Sorcerer" }),
                                ],
                                '_modelList': [
                                    "Exalted Sorcerer (Inferno Bolt Pistol, Force stave, Frag & Krak grenades, Smite)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Inferno Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Force stave" }),
                                    jasmine.objectContaining({ '_name': "Frag grenade" }),
                                    jasmine.objectContaining({ '_name': "Krak grenade" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Seeded Strategy" }),
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Exalted Sorcerer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Chaos Cultists",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Chaos Cultist" }),
                                    jasmine.objectContaining({ '_name': "Cultist Champion" }),
                                ],
                                '_modelList': [
                                    "9x Chaos Cultist w/ Autogun (Autogun)",
                                    "Cultist Champion (Autogun)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Autogun" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Rubric Marines",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Aspiring Sorcerer" }),
                                    jasmine.objectContaining({ '_name': "Rubric Marine" }),
                                ],
                                '_modelList': [
                                    "Aspiring Sorcerer (Inferno Bolt Pistol, Force stave, Smite)",
                                    "4x Rubric Marine w/ Inferno Boltgun (Inferno boltgun)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Inferno Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Inferno boltgun" }),
                                    jasmine.objectContaining({ '_name': "Force stave" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Seeded Strategy" }),
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Aspiring Sorcerer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Tzaangors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Twistbray" }),
                                    jasmine.objectContaining({ '_name': "Tzaangors" }),
                                ],
                                '_modelList': [
                                    "Twistbray (Tzaangor blades)",
                                    "9x Tzaangor w/ Tzaangor Blades (Tzaangor blades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Tzaangor blades" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Helbrute",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Helbrute" }),
                                ],
                                '_modelList': [
                                    "Helbrute (Multi-melta, Helbrute fist)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Multi-melta" }),
                                    jasmine.objectContaining({ '_name': "Helbrute fist" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Scarab Occult Terminators",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Scarab Occult Sorcerer" }),
                                    jasmine.objectContaining({ '_name': "Scarab Occult Terminator" }),
                                ],
                                '_modelList': [
                                    "Scarab Occult Sorcerer (Inferno Combi-bolter, Force stave, Smite)",
                                    "4x Terminator (Inferno Combi-bolter, Powersword)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Inferno Combi-bolter" }),
                                    jasmine.objectContaining({ '_name': "Force stave" }),
                                    jasmine.objectContaining({ '_name': "Power sword" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Seeded Strategy" }),
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Scarab Occult Sorcerer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Heldrake",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Heldrake" }),
                                ],
                                '_modelList': [
                                    "Heldrake (Hades Autocannon, Heldrake claws)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Hades autocannon" }),
                                    jasmine.objectContaining({ '_name': "Heldrake claws" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Heldrake" }),
                                    jasmine.objectContaining({ '_name': "Heldrake1" }),
                                    jasmine.objectContaining({ '_name': "Heldrake2" }),
                                    jasmine.objectContaining({ '_name': "Heldrake3" }),
                                ]
                            }),
                        ]
                    }),
                    jasmine.objectContaining({
                        '_configurations': [
                            "Cults of the Legion: Cult of Prophecy",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Magnus the Red",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Magnus the Red" }),
                                ],
                                '_modelList': [
                                    "Magnus the Red (The Blade of Magnus, Smite, Warlord)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "The Blade of Magnus" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Magnus the Red" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Magnus the Red" }),
                                    jasmine.objectContaining({ '_name': "Magnus the Red1" }),
                                    jasmine.objectContaining({ '_name': "Magnus the Red2" }),
                                    jasmine.objectContaining({ '_name': "Magnus the Red3" }),
                                ]
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=MagnusSpec.js.map