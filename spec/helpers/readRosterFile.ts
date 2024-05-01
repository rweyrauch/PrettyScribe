import fs from "fs";
import {JSDOM} from 'jsdom';
import JSZip from "jszip";
import { Entry, Registry } from "../../src/rosterizer";

export function readRosterFile(filename: string): Document {
  const xmldata: string = fs.readFileSync(filename, 'binary');
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}

export async function readZippedRosterFile(filename: string): Promise<Document> {
  const buf: ArrayBuffer = fs.readFileSync(filename);
  const xmldata = await maybeUnzip(buf, /[^/]+\.ros$/);
  return new JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}

export async function readZippedRegistryFile(filename: string): Promise<Registry> {
  const buf: ArrayBuffer = fs.readFileSync(filename);
  const json = await maybeUnzip(buf, /[^/]+\.registry$/);
  return JSON.parse(json) as Registry;
}

/**
 * If the input buffer is zipped, returns contents of the first file matching
 * fileRegex, otherwise UTF8-decodes the buffer.
 */
async function maybeUnzip(buf: ArrayBuffer, fileRegex: RegExp): Promise<string> {
  const array = new Int8Array(buf, 0, 1);
  const isZipped = array[0] === 'P'.charCodeAt(0);

  if (isZipped) {
    const jszip = new JSZip()
    const zip = await jszip.loadAsync(buf)
    return zip.file(fileRegex)[0].async('string') // Get roster files that are in the root
  } else {
    const utf8decoder = new TextDecoder();  // Defaults to UTF-8
    return utf8decoder.decode(buf);
  }
}
