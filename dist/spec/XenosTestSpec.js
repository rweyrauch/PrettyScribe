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
    it("loads test/Xenos Test.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Xenos Test.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 51,
                '_points': 831,
                '_commandPoints': -2,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                            "Clan Kultur: Bad Moons",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Big Mek [Legends]",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Big Mek" }),
                                    jasmine.objectContaining({ '_name': "Grot Oiler" }),
                                ],
                                '_modelList': [
                                    "Grot Oiler (Slugga, Choppa, Stikkbombs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Slugga" }),
                                    jasmine.objectContaining({ '_name': "Choppa" }),
                                    jasmine.objectContaining({ '_name': "Stikkbomb" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Weirdboy",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Weirdboy" }),
                                ],
                                '_modelList': [
                                    "Weirdboy (Weirdboy Staff, 3. Da Jump)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Weirdboy Staff" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                    jasmine.objectContaining({ '_name': "Da Jump" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Psyker" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Boyz",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Ork Boy" }),
                                ],
                                '_modelList': [
                                    "10x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Slugga" }),
                                    jasmine.objectContaining({ '_name': "Choppa" }),
                                    jasmine.objectContaining({ '_name': "Stikkbomb" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Boyz",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Boss Nob" }),
                                    jasmine.objectContaining({ '_name': "Ork Boy" }),
                                ],
                                '_modelList': [
                                    "Boss Nob (Slugga, Choppa, Stikkbombs)",
                                    "2x Ork Boy W/ Shoota (Shoota, Stikkbombs)",
                                    "8x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Shoota" }),
                                    jasmine.objectContaining({ '_name': "Slugga" }),
                                    jasmine.objectContaining({ '_name': "Choppa" }),
                                    jasmine.objectContaining({ '_name': "Stikkbomb" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Boyz",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Boss Nob" }),
                                    jasmine.objectContaining({ '_name': "Ork Boy" }),
                                ],
                                '_modelList': [
                                    "Boss Nob (Slugga, Choppa, Stikkbombs)",
                                    "10x Ork Boy W/ Slugga & Choppa (Slugga, Choppa, Stikkbombs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Slugga" }),
                                    jasmine.objectContaining({ '_name': "Choppa" }),
                                    jasmine.objectContaining({ '_name': "Stikkbomb" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Painboy on Warbike [Legends]",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Painboy on Warbike" }),
                                ],
                                '_modelList': [
                                    "Painboy on Warbike [Legends] (2x Dakkagun, 'Urty Syringe, Killsaw, Super Cybork Body)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Dakkagun" }),
                                    jasmine.objectContaining({ '_name': "'Urty Syringe" }),
                                    jasmine.objectContaining({ '_name': "Killsaw" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Deff Dread Mob",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Deff Dread" }),
                                ],
                                '_modelList': [
                                    "Deff Dread (2x Big Shoota, 2x Dread Klaw)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Big Shoota" }),
                                    jasmine.objectContaining({ '_name': "Dread Klaw" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Killa Kans",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Killa Kan" }),
                                ],
                                '_modelList': [
                                    "Killa Kan (Big Shoota, Kan Klaw)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Big Shoota" }),
                                    jasmine.objectContaining({ '_name': "Kan Klaw" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Blitza-bommer",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Blitza-bommer" }),
                                ],
                                '_modelList': [
                                    "Blitza-bommer (Big Shoota, 2x Supa Shoota, Boom Bomb)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Big Shoota" }),
                                    jasmine.objectContaining({ '_name': "Supa Shoota" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "BlitzaBom1" }),
                                    jasmine.objectContaining({ '_name': "BlitzaBom2" }),
                                    jasmine.objectContaining({ '_name': "BlitzaBom3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Dakkajet",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Dakkajet" }),
                                ],
                                '_modelList': [
                                    "Dakkajet (4x Supa Shoota)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Supa Shoota" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Dakkajet1" }),
                                    jasmine.objectContaining({ '_name': "Dakkajet2" }),
                                    jasmine.objectContaining({ '_name': "Dakkajet3" }),
                                ]
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=XenosTestSpec.js.map