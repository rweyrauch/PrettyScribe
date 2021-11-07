import { Create40kRoster } from "../src/roster40k";
import fs from "fs";
import {JSDOM} from 'jsdom';

function readXmlFile(filename: string): Document {
  const xmldata: string = fs.readFileSync(filename).toString();
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}

describe("roster40k Create40kRoster", function() {
  it("loads BloodAngels test", function() {
    const doc = readXmlFile('test/BloodAngels test.ros');
    const roster = Create40kRoster(doc);

    expect(roster).toEqual(
      jasmine.objectContaining({
        '_powerLevel': 30,
        '_points': 625,
        '_commandPoints': 1,
        '_forces': [
          jasmine.objectContaining({'_units': [
            jasmine.objectContaining({'_name': 'Lieutenants'}),
            jasmine.objectContaining({'_name': 'Assault Intercessor Squad'}),
            jasmine.objectContaining({'_name': 'Bladeguard Veteran Squad'}),
            jasmine.objectContaining({'_name': 'Bladeguard Veteran Squad'}),
            jasmine.objectContaining({'_name': 'Outrider Squad'}),
            ]})]}));
  });
});
