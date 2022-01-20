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
    it("loads test/Knights.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Knights.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 90,
                '_points': 1904,
                '_commandPoints': 0,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Armiger Helverins",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Armiger Helverin" }),
                                ],
                                '_modelList': [
                                    "Armiger Helverin (2x Armiger Autocannon, Meltagun)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Armiger Autocannon" }),
                                    jasmine.objectContaining({ '_name': "Meltagun" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Explodes (Armiger)" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Armiger Helverin 1" }),
                                    jasmine.objectContaining({ '_name': "Armiger Helverin 2" }),
                                    jasmine.objectContaining({ '_name': "Armiger Helverin 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Armiger Warglaives",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Armiger Warglaive" }),
                                ],
                                '_modelList': [
                                    "Armiger Warglaive (Meltagun, Thermal Spear, Reaper Chain-Cleaver)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Meltagun" }),
                                    jasmine.objectContaining({ '_name': "Thermal Spear" }),
                                    jasmine.objectContaining({ '_name': "Reaper Chain-Cleaver (Strike)" }),
                                    jasmine.objectContaining({ '_name': "Reaper Chain-Cleaver (Sweep)" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Explodes (Armiger)" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Armiger Warglaive 1" }),
                                    jasmine.objectContaining({ '_name': "Armiger Warglaive 2" }),
                                    jasmine.objectContaining({ '_name': "Armiger Warglaive 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Knight Castellan",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Knight Castellan" }),
                                ],
                                '_modelList': [
                                    "Knight Castellan (Plasma Decimator, 2x Shieldbreaker Missile, 2x Twin Meltagun, 2x Twin Siegebreaker Cannon, Volcano Lance, Titanic Feet, Character (Knight Lance), Heirloom: Armour of the Sainted Ion, Warlord, Warlord Trait: Fearsome Reputation)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Plasma Decimator (Standard)" }),
                                    jasmine.objectContaining({ '_name': "Plasma Decimator (Supercharge)" }),
                                    jasmine.objectContaining({ '_name': "Shieldbreaker Missile" }),
                                    jasmine.objectContaining({ '_name': "Twin Meltagun" }),
                                    jasmine.objectContaining({ '_name': "Twin Siegebreaker Cannon" }),
                                    jasmine.objectContaining({ '_name': "Volcano Lance" }),
                                    jasmine.objectContaining({ '_name': "Titanic Feet" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Dual Plasma Core Explosion" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Knight Castellan 3" }),
                                    jasmine.objectContaining({ '_name': "Knight Castellan 2" }),
                                    jasmine.objectContaining({ '_name': "Knight Castellan 1" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Knight Errant",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Knight Errant" }),
                                ],
                                '_modelList': [
                                    "Knight Errant (Meltagun, Stormspear Rocket Pod, Thermal Cannon, Thunderstrike gauntlet, Titanic Feet)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Meltagun" }),
                                    jasmine.objectContaining({ '_name': "Stormspear Rocket Pod" }),
                                    jasmine.objectContaining({ '_name': "Thermal Cannon" }),
                                    jasmine.objectContaining({ '_name': "Thunderstrike gauntlet" }),
                                    jasmine.objectContaining({ '_name': "Titanic Feet" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Explodes" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Knight Errant 1" }),
                                    jasmine.objectContaining({ '_name': "Knight Errant 2" }),
                                    jasmine.objectContaining({ '_name': "Knight Errant 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Knight Gallant",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Knight Gallant" }),
                                ],
                                '_modelList': [
                                    "Knight Gallant (Heavy Stubber, Stormspear Rocket Pod, Reaper Chainsword, Thunderstrike gauntlet, Titanic Feet)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Heavy stubber" }),
                                    jasmine.objectContaining({ '_name': "Stormspear Rocket Pod" }),
                                    jasmine.objectContaining({ '_name': "Reaper Chainsword" }),
                                    jasmine.objectContaining({ '_name': "Thunderstrike gauntlet" }),
                                    jasmine.objectContaining({ '_name': "Titanic Feet" }),
                                ],
                                '_explosions': [
                                    jasmine.objectContaining({ '_name': "Explodes" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Knight Gallant 1" }),
                                    jasmine.objectContaining({ '_name': "Knight Gallant 2" }),
                                    jasmine.objectContaining({ '_name': "Knight Gallant 3" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Household Choice",
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
//# sourceMappingURL=KnightsSpec.js.map