import { readZippedRosterFile } from './helpers/readRosterFile';
import { Create40kRoster } from "../src/roster40k";

describe("Create40kRoster", function() {
  it("loads test/longweaponnames.rosz", async function() {
    const doc = await readZippedRosterFile('test/longweaponnames.rosz');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 8,
        '_points': 170,
        '_commandPoints': -3,
        '_forces': [
          jasmine.objectContaining({
            '_configurations': [
              "Cults of the Legion: *No Cult*",
            ],
            '_units': [
              jasmine.objectContaining({
                '_name': "Chaos Contemptor Dreadnought",
                '_modelStats': [
                  jasmine.objectContaining({'_name': "Chaos Contemptor Dreadnought"}),
                ],
                '_modelList': [
                  "Chaos Contemptor Dreadnought (Conversion beam cannon, Hellforged cyclone missile launcher, Hellforged heavy plasma cannon)"
                ],
                '_weapons': [
                  jasmine.objectContaining({'_name': "Conversion beam cannon 1 - Short range"}),
                  jasmine.objectContaining({'_name': "Conversion beam cannon 2 - Medium range"}),
                  jasmine.objectContaining({'_name': "Conversion beam cannon 3 - Long range"}),
                  jasmine.objectContaining({'_name': "Hellforged cyclone missile launcher"}),
                  jasmine.objectContaining({'_name': "Hellforged cyclone missile launcher - frag missile"}),
                  jasmine.objectContaining({'_name': "Hellforged cyclone missile launcher - krak missile"}),
                  jasmine.objectContaining({'_name': "Hellforged heavy plasma cannon"}),
                  jasmine.objectContaining({'_name': "Hellforged heavy plasma cannon - Standard"}),
                  jasmine.objectContaining({'_name': "Hellforged heavy plasma cannon - Supercharge"}),
                ]}),
            ]
          }),
        ]}));
  });
});