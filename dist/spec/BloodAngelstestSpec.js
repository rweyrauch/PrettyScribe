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
    it("loads test/BloodAngels test.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/BloodAngels test.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 30,
                '_points': 625,
                '_commandPoints': 1,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                            "PC: BA - **Chapter Selector**: Blood Angels",
                            "Battle Size: 1. Combat Patrol (0-50 Total PL / 0-500 Points)  [3 CP]",
                            "Gametype: Matched",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Lieutenants",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Lieutenant in Phobos Armour" }),
                                    jasmine.objectContaining({ '_name': "Primaris Lieutenant" }),
                                ],
                                '_modelList': [
                                    "Lieutenant in Phobos Armour (Bolt pistol, Master-crafted occulus bolt carbine, Paired Combat Blades, Frag & Krak grenades)",
                                    "Primaris Lieutenant (Bolt pistol, Neo-volkite pistol, Master-crafted power sword, Frag & Krak grenades, Storm shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Bolt pistol" }),
                                    jasmine.objectContaining({ '_name': "Master-crafted occulus bolt rifle" }),
                                    jasmine.objectContaining({ '_name': "Neo-volkite pistol" }),
                                    jasmine.objectContaining({ '_name': "Master-crafted power sword" }),
                                    jasmine.objectContaining({ '_name': "Paired Combat Blades" }),
                                    jasmine.objectContaining({ '_name': "Frag grenades" }),
                                    jasmine.objectContaining({ '_name': "Krak grenades" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Assault Intercessor Squad",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Assault Intercessor" }),
                                    jasmine.objectContaining({ '_name': "Assault Intercessor Sgt" }),
                                ],
                                '_modelList': [
                                    "4x Assault Intercessor (Heavy Bolt Pistol, Astartes Chainsword, Frag & Krak grenades)",
                                    "Assault Intercessor Sgt (Heavy Bolt Pistol, Astartes Chainsword, Frag & Krak grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Heavy Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Astartes Chainsword" }),
                                    jasmine.objectContaining({ '_name': "Frag grenades" }),
                                    jasmine.objectContaining({ '_name': "Krak grenades" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Bladeguard Veteran Squad",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Bladeguard Veteran" }),
                                    jasmine.objectContaining({ '_name': "Bladeguard Veteran Sergeant" }),
                                ],
                                '_modelList': [
                                    "2x Bladeguard Veteran (Heavy Bolt Pistol, Master-crafted power sword, Frag & Krak grenades, Storm Shield)",
                                    "Bladeguard Veteran Sergeant (Heavy Bolt Pistol, Master-crafted power sword, Frag & Krak grenades, Storm Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Heavy Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Master-crafted power sword" }),
                                    jasmine.objectContaining({ '_name': "Frag grenades" }),
                                    jasmine.objectContaining({ '_name': "Krak grenades" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Bladeguard Veteran Squad",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Bladeguard Veteran" }),
                                    jasmine.objectContaining({ '_name': "Bladeguard Veteran Sergeant" }),
                                ],
                                '_modelList': [
                                    "2x Bladeguard Veteran (Heavy Bolt Pistol, Master-crafted power sword, Frag & Krak grenades, Storm Shield)",
                                    "Bladeguard Veteran Sergeant (Heavy Bolt Pistol, Master-crafted power sword, Frag & Krak grenades, Storm Shield)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Heavy Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Master-crafted power sword" }),
                                    jasmine.objectContaining({ '_name': "Frag grenades" }),
                                    jasmine.objectContaining({ '_name': "Krak grenades" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Outrider Squad",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Outrider" }),
                                    jasmine.objectContaining({ '_name': "Outrider Sgt" }),
                                ],
                                '_modelList': [
                                    "2x Outrider (Heavy Bolt Pistol, Twin Bolt rifle, Astartes Chainsword, Frag & Krak grenades)",
                                    "Outrider Sgt (Heavy Bolt Pistol, Twin Bolt rifle, Astartes Chainsword, Frag & Krak grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Heavy Bolt Pistol" }),
                                    jasmine.objectContaining({ '_name': "Twin Bolt rifle" }),
                                    jasmine.objectContaining({ '_name': "Astartes Chainsword" }),
                                    jasmine.objectContaining({ '_name': "Frag grenades" }),
                                    jasmine.objectContaining({ '_name': "Krak grenades" }),
                                ]
                            }),
                        ]
                    }),
                ]
            }));
        });
    });
});
//# sourceMappingURL=BloodAngelstestSpec.js.map