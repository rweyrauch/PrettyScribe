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
    it("loads test/Tyranids Test.ros", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield readRosterFile_1.readZippedRosterFile('test/Tyranids Test.ros');
            const roster = roster40k_1.Create40kRoster(doc);
            expect(roster).toEqual(jasmine.objectContaining({
                '_powerLevel': 116,
                '_points': 1798,
                '_commandPoints': 6,
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Abominant",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Abominant" }),
                                ],
                                '_modelList': [
                                    "Abominant (Familiar Claws, Power Sledgehammer, Rending Claw)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Familiar Claws" }),
                                    jasmine.objectContaining({ '_name': "Power Sledgehammer" }),
                                    jasmine.objectContaining({ '_name': "Rending Claw(s)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Magus",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Familiar" }),
                                    jasmine.objectContaining({ '_name': "Magus" }),
                                ],
                                '_modelList': [
                                    "Magus (Autopistol, Cultist Knife, Force stave, Power: Psychic Stimulus)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Autopistol" }),
                                    jasmine.objectContaining({ '_name': "Cultist Knife" }),
                                    jasmine.objectContaining({ '_name': "Force stave" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Psychic Stimulus" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Magus" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Acolyte Hybrids",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Acolyte Hybrid" }),
                                    jasmine.objectContaining({ '_name': "Acolyte Leader" }),
                                ],
                                '_modelList': [
                                    "4x Acolyte Hybrid (Autopistol, Cultist Knife, Rending Claw, Blasting Charges)",
                                    "Acolyte Hybrid (Heavy Weapon) (Autopistol, Heavy Rock Saw, Blasting Charges)",
                                    "Acolyte Leader (Autopistol, Cultist Knife, Rending Claw, Blasting Charges)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Autopistol" }),
                                    jasmine.objectContaining({ '_name': "Cultist Knife" }),
                                    jasmine.objectContaining({ '_name': "Heavy Rock Saw" }),
                                    jasmine.objectContaining({ '_name': "Rending Claw(s)" }),
                                    jasmine.objectContaining({ '_name': "Blasting Charge" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Brood Brothers Infantry Squad",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Brood Brother" }),
                                    jasmine.objectContaining({ '_name': "Brood Brothers Leader" }),
                                    jasmine.objectContaining({ '_name': "Brood Brothers Weapons Team" }),
                                ],
                                '_modelList': [
                                    "9x Brood Brother (Lasgun, Frag Grenades)",
                                    "Brood Brother (Flamer) (Flamer, Frag Grenades)",
                                    "Brood Brother (Grenade) (Grenade Launcher, Frag Grenades)",
                                    "Brood Brother (Vox-caster) (Lasgun, Frag Grenades, Cult Vox-caster)",
                                    "Brood Brothers Leader (Laspistol, Chainsword, Frag Grenades)",
                                    "Brood Brothers Weapons Team (Lascannon, Lasgun, Frag Grenades)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Flamer" }),
                                    jasmine.objectContaining({ '_name': "Grenade Launcher (Frag)" }),
                                    jasmine.objectContaining({ '_name': "Grenade Launcher (Krak)" }),
                                    jasmine.objectContaining({ '_name': "Lascannon" }),
                                    jasmine.objectContaining({ '_name': "Lasgun" }),
                                    jasmine.objectContaining({ '_name': "Laspistol" }),
                                    jasmine.objectContaining({ '_name': "Chainsword" }),
                                    jasmine.objectContaining({ '_name': "Frag Grenade" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Neophyte Hybrids",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Neophyte Hybrid" }),
                                    jasmine.objectContaining({ '_name': "Neophyte Leader" }),
                                ],
                                '_modelList': [
                                    "9x Neophyte Hybrid (Autogun, Autopistol, Blasting Charges)",
                                    "Neophyte Hybrid (Flamer) (Autopistol, Flamer, Blasting Charges)",
                                    "Neophyte Hybrid (Lasgun) (Autopistol, Lasgun, Blasting Charges)",
                                    "Neophyte Hybrid (Mining) (Autopistol, Mining Laser, Blasting Charges)",
                                    "Neophyte Hybrid (Shotgun) (Autopistol, Shotgun, Blasting Charges)",
                                    "Neophyte Leader (Autogun, Autopistol, Blasting Charges)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Autogun" }),
                                    jasmine.objectContaining({ '_name': "Autopistol" }),
                                    jasmine.objectContaining({ '_name': "Flamer" }),
                                    jasmine.objectContaining({ '_name': "Lasgun" }),
                                    jasmine.objectContaining({ '_name': "Mining Laser" }),
                                    jasmine.objectContaining({ '_name': "Shotgun" }),
                                    jasmine.objectContaining({ '_name': "Blasting Charge" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Atalan Jackals",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Atalan Jackal" }),
                                    jasmine.objectContaining({ '_name': "Atalan Leader" }),
                                ],
                                '_modelList': [
                                    "3x Atalan Jackal (Autopistol, Blasting Charges)",
                                    "Atalan Leader (Autopistol, Power Pick, Blasting Charges, Demolition Charge)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Autopistol" }),
                                    jasmine.objectContaining({ '_name': "Power Pick" }),
                                    jasmine.objectContaining({ '_name': "Blasting Charge" }),
                                    jasmine.objectContaining({ '_name': "Demolition Charge" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Cult Leman Russ",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Cult Leman Russ" }),
                                ],
                                '_modelList': [
                                    "Cult Leman Russ (Battle Cannon, Heavy Bolter, 2x Heavy Flamer, Heavy Stubber, Hunter-killer Missile)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Battle Cannon" }),
                                    jasmine.objectContaining({ '_name': "Heavy bolter" }),
                                    jasmine.objectContaining({ '_name': "Heavy flamer" }),
                                    jasmine.objectContaining({ '_name': "Heavy stubber" }),
                                    jasmine.objectContaining({ '_name': "Hunter-killer missile" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Cult Leman Russ (1)" }),
                                    jasmine.objectContaining({ '_name': "Cult Leman Russ (2)" }),
                                    jasmine.objectContaining({ '_name': "Cult Leman Russ (3)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Goliath Rockgrinder",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Goliath Rockgrinder" }),
                                ],
                                '_modelList': [
                                    "Goliath Rockgrinder (Cache of Demolition Charges, Heavy Mining Laser, Heavy Stubber, Drilldozer Blade)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Cache of Demolition Charges" }),
                                    jasmine.objectContaining({ '_name': "Heavy Mining Laser" }),
                                    jasmine.objectContaining({ '_name': "Heavy stubber" }),
                                    jasmine.objectContaining({ '_name': "Drilldozer Blade" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Goliath Rockgrinder (1)" }),
                                    jasmine.objectContaining({ '_name': "Goliath Rockgrinder (2)" }),
                                    jasmine.objectContaining({ '_name': "Goliath Rockgrinder (3)" }),
                                ]
                            }),
                        ]
                    }),
                    jasmine.objectContaining({
                        '_configurations': [],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Broodlord",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Broodlord" }),
                                ],
                                '_modelList': [
                                    "Broodlord (Monstrous Rending Claws, Adrenal Webs, Power: Catalyst, Power: Smite, Resonance Barb, Warlord, Warlord Trait: Instinctive Killer)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Monstrous Rending Claws" }),
                                ],
                                '_spells': [
                                    jasmine.objectContaining({ '_name': "Smite" }),
                                    jasmine.objectContaining({ '_name': "Catalyst" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Broodlord" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Hive Tyrant",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Hive Tyrant" }),
                                ],
                                '_modelList': [
                                    "Hive Tyrant (2x Monstrous Scything Talons, Prehensile Pincer Tail)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Monstrous Scything Talons" }),
                                    jasmine.objectContaining({ '_name': "Prehensile Pincer Tail" }),
                                ],
                                '_psykers': [
                                    jasmine.objectContaining({ '_name': "Hive Tyrant" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Hive Tyrant (1)" }),
                                    jasmine.objectContaining({ '_name': "Hive Tyrant (3)" }),
                                    jasmine.objectContaining({ '_name': "Hive Tyrant (2)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Hormagaunts",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Hormagaunt" }),
                                ],
                                '_modelList': [
                                    "10x Hormagaunt (Scything Talons)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Scything Talons" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Termagants",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Termagant" }),
                                ],
                                '_modelList': [
                                    "10x Termagant (Fleshborer) (Fleshborer)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Fleshborer" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Tyranid Warriors",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Tyranid Warrior" }),
                                ],
                                '_modelList': [
                                    "Tyranid Warrior (Devourer, Boneswords)",
                                    "Tyranid Warrior (Devourer, Lash Whip and Bonesword)",
                                    "Tyranid Warrior (Devourer, Rending Claws)",
                                    "Tyranid Warrior (Devourer, Scything Talons)",
                                    "Tyranid Warrior (Bio-cannon) (Venom Cannon, Scything Talons)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Devourer" }),
                                    jasmine.objectContaining({ '_name': "Venom Cannon" }),
                                    jasmine.objectContaining({ '_name': "Boneswords" }),
                                    jasmine.objectContaining({ '_name': "Lash Whip and Bonesword" }),
                                    jasmine.objectContaining({ '_name': "Rending Claws" }),
                                    jasmine.objectContaining({ '_name': "Scything Talons" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Hive Guard",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Hive Guard" }),
                                ],
                                '_modelList': [
                                    "3x Hive Guard (Impaler) (Impaler Cannon)",
                                    "Hive Guard (Shock) (Shockcannon)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Impaler Cannon" }),
                                    jasmine.objectContaining({ '_name': "Shockcannon" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Carnifexes",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Carnifex" }),
                                ],
                                '_modelList': [
                                    "Carnifex (2x Monstrous Scything Talons)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Monstrous Scything Talons" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Exocrine",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Exocrine" }),
                                ],
                                '_modelList': [
                                    "Exocrine (Bio-plasmic Cannon, Powerful Limbs)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Bio-plasmic Cannon" }),
                                    jasmine.objectContaining({ '_name': "Powerful Limbs" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Exocrine (1)" }),
                                    jasmine.objectContaining({ '_name': "Exocrine (2)" }),
                                    jasmine.objectContaining({ '_name': "Exocrine (3)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Toxicrene",
                                '_modelStats': [
                                    jasmine.objectContaining({ '_name': "Toxicrene" }),
                                ],
                                '_modelList': [
                                    "Toxicrene (Chocking Spores, Massive Toxic Lashes)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({ '_name': "Choking Spores" }),
                                    jasmine.objectContaining({ '_name': "Massive Toxic Lashes (Shooting)" }),
                                    jasmine.objectContaining({ '_name': "Massive Toxic Lashes (Melee)" }),
                                ],
                                '_woundTracker': [
                                    jasmine.objectContaining({ '_name': "Toxicrene (1)" }),
                                    jasmine.objectContaining({ '_name': "Toxicrene (2)" }),
                                    jasmine.objectContaining({ '_name': "Toxicrene (3)" }),
                                ]
                            }),
                            jasmine.objectContaining({
                                '_name': "Battle-forged CP",
                                '_modelStats': [],
                                '_modelList': [],
                                '_weapons': []
                            }),
                            jasmine.objectContaining({
                                '_name': "Detachment CP",
                                '_modelStats': [],
                                '_modelList': [],
                                '_weapons': []
                            }),
                            jasmine.objectContaining({
                                '_name': "Hive Fleet",
                                '_modelStats': [],
                                '_modelList': [],
                                '_weapons': []
                            }),
                            jasmine.objectContaining({
                                '_name': "Stratagem: Bounty of the Hive Fleet",
                                '_modelStats': [],
                                '_modelList': [],
                                '_weapons': []
                            }),
                            jasmine.objectContaining({
                                '_name': "Stratagem: Progeny of the Hive",
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
//# sourceMappingURL=TyranidsTestSpec.js.map