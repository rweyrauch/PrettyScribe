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
    it("loads test/Necron Test.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Necron Test.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 50,
                '_points': 785,
                '_commandPoints': 0,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Cryptek",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Cryptek" }),
                                ],
                                '_modelList': [
                                    "Cryptek (Staff of Light)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Staff of Light (Shooting)" }),
                                    jasmine.objectContaining({ '_name': "Staff of Light (Melee)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Overlord",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Overlord" }),
                                ],
                                '_modelList': [
                                    "Overlord (Staff of Light)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Staff of Light (Shooting)" }),
                                    jasmine.objectContaining({ '_name': "Staff of Light (Melee)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Immortals",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Immortal" }),
                                ],
                                '_modelList': [
                                    "5x Immortal (Gauss Blaster)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Gauss Blaster" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Necron Warriors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Necron Warrior" }),
                                ],
                                '_modelList': [
                                    "10x Necron Warrior (Gauss Flayer)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Gauss Flayer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Necron Warriors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Necron Warrior" }),
                                ],
                                '_modelList': [
                                    "10x Necron Warrior (Gauss Flayer)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Gauss Flayer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "C'tan Shard of the Deceiver",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "C'tan Shard of the Deceiver" }),
                                ],
                                '_modelList': [
                                    "C'tan Shard of the Deceiver (Star-God Fists)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Star-God Fists" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Reality Unravels" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Doom Scythe",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Doom Scythe" }),
                                ],
                                '_modelList': [
                                    "Doom Scythe (Death Ray, 2x Tesla Destructor)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Death Ray" }),
                                    jasmine.objectContaining({ '_name': "Tesla Destructor" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Crash and Burn" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Doom Scythe Track 1" }),
                                    jasmine.objectContaining({ '_name': "Doom Scythe Track 2" }),
                                    jasmine.objectContaining({ '_name': "Doom Scythe Track 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Dynasty Choice",
                                '_modelStats': [],
                                '_modelList': [],
                                '_weapons': []
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=NecronTestSpec.js.map