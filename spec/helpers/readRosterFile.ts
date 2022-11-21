import fs from "fs";
import {JSDOM} from 'jsdom';
import JSZip from "jszip";

export function readRosterFile(filename: string): Document {
  const xmldata: string = fs.readFileSync(filename, 'binary');
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}

export async function readZippedRosterFile(filename: string): Promise<Document> {
  const contents: string = fs.readFileSync(filename, 'binary');
  const xmldata = await unzip(contents);
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}

async function unzip(contents: string): Promise<string> {
  if (contents.charAt(0) !== 'P') {
    return contents;
  } else {
    const jszip = new JSZip();
    const zip = await jszip.loadAsync(contents);
    return zip.file(/[^/]+\.ros/)[0].async('string'); // Get roster files that are in the root
  }

}
