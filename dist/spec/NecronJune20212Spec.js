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
    it("loads test/Necron June 2021 2.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Necron June 2021 2.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 31,
                '_points': 620,
                '_commandPoints': 3,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                            "Dynasty Choice: Dynasty: <Custom>, Dynastic Tradition: Unyielding, Circumstance of Awakening: Healthy Paranoia",
                            "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Chronomancer",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Chronomancer" }),
                                ],
                                '_modelList': [
                                    "Chronomancer (Aeonstave, Chronotendrils)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Aeonstave (Shooting)" }),
                                    jasmine.objectContaining({ '_name': "Aeonstave (Melee)" }),
                                    jasmine.objectContaining({ '_name': "Chronotendrils" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Royal Warden",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Royal Warden" }),
                                ],
                                '_modelList': [
                                    "Royal Warden (Relic Gauss Blaster, Relic: Veil of Darkness, Warlord, Warlord Trait (Codex 1): Enduring Will)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Relic Gauss Blaster" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Necron Warriors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Necron Warrior" }),
                                ],
                                '_modelList': [
                                    "20x Necron Warrior (Gauss Reaper) (Gauss Reaper)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Gauss Reaper" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Skorpekh Destroyers",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Skorpekh Destroyer" }),
                                ],
                                '_modelList': [
                                    "Skorpekh Destroyer (Reap-Blade) (Hyperphase Reap-Blade)",
                                    "2x Skorpekh Destroyer (Thresher) (Hyperphase Threshers)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Hyperphase Reap-Blade" }),
                                    jasmine.objectContaining({ '_name': "Hyperphase Threshers" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Canoptek Scarab Swarms",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Canoptek Scarab Swarm" }),
                                ],
                                '_modelList': [
                                    "4x Canoptek Scarab Swarm (Feeder Mandibles)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Feeder Mandibles" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Bound Creation",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Cryptothrall" }),
                                ],
                                '_modelList': [
                                    "2x Cryptothrall (Scouring Eye, Scythed Limbs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Scouring Eye" }),
                                    jasmine.objectContaining({ '_name': "Scythed Limbs" }),
                                ]
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=NecronJune20212Spec.js.map