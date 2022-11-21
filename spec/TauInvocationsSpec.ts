import {readZippedRosterFile} from './helpers/readRosterFile';
import {Create40kRoster} from "../src/roster40k";

function mapWithKeys(keys: string[]) {
    return new Map(keys.map(e => [e, jasmine.any(String)]));
}

describe("Create40kRoster", function () {
    it("loads test/Tau Invocations.rosz", async function () {
        const doc = await readZippedRosterFile('test/Tau Invocations.rosz');
        const roster = Create40kRoster(doc);

        expect(roster).toEqual(
            jasmine.objectContaining({
                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 80, _commandPoints: -2}),
                '_forces': [
                    jasmine.objectContaining({
                        '_configurations': [
                          "Sept Choice: T'au Sept",
                          "Gametype",
                        ],
                        '_units': [
                            jasmine.objectContaining({
                                '_name': "Aun'Va",
                                '_cost': jasmine.objectContaining({_powerLevel: 4, _points: 80, _commandPoints: 0}),
                                '_modelStats': [
                                  jasmine.objectContaining({'_name': "Aun'va"}),
                                  jasmine.objectContaining({'_name': "Ethereal Guard"}),
                                ],
                                '_modelList': [
                                    "Aun'Va", "2x Ethereal Guard (Honour Blade)", "Unit Upgrades (1. Storm of Fire, 2. Sense of Stone, 3. Zephyr's Grace)"
                                ],
                                '_weapons': [
                                    jasmine.objectContaining({'_name': "Honour Blade"}),
                                ],
                                '_abilities': {
                                    "Abilities": mapWithKeys(["Serene Unifier (Aun'va)", "Supreme Loyalty (Aura)", "Leadership Caste (Aun'va)", "Paradox of Duality"]),
                                    "Invocations": mapWithKeys(["1. Storm of Fire", "2. Sense of Stone", "3. Zephyr's Grace"]),
                                },
                            }),
                        ],
                        '_rules': new Map([
                            ["Philosophies of War", jasmine.any(String)],
                            ["Inspired to Greatness", jasmine.any(String)],
                        ]),
                        '_factionRules': new Map([
                            ["T'au Sept Tenet: Coordinated Fire Arcs", jasmine.any(String)],
                        ]),
                    }),
                ]
            }));
    });
});