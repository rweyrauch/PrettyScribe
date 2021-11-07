import fs from "fs";
import {JSDOM} from 'jsdom';

export function readRosterFile(filename: string): Document {
  // For now, this doesn't support zipped files. Add later if needed.
  const xmldata: string = fs.readFileSync(filename).toString();
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}
