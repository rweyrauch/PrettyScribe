/*
 * Prints the structure of a Rosterizer registry file. 
 *
 * Run with:
 *   $ npx ts-node tools/printRegistryStructure.ts 'path/to/file'
 */

import fs from "fs";
import { Entry, filterAndOrderStats } from "../src/rosterizer";

function visit(entry: Entry, indent = 0, type = '') {
  printLine(indent, entry, type);
  for (const included of entry.assets.included) {
    visit(included, indent + 1, 'i');
  }
  for (const traits of entry.assets.traits) {
    visit(traits, indent + 1, 't');
  }
}

function printLine(indent: number, entry: Entry, type: string) {
  const stats = filterAndOrderStats(entry.stats).map(s => s[0]);
  const statsStr = stats.length > 0 ? ` stats=[${stats.join(',')}]` : '';
  console.log(`${' '.repeat(indent * 2)}(${indent}${type}) ${entry.designation} <${entry.classification}/${entry.keywords.Keywords ?? ''}>${statsStr}`);
}

function main(args: string[]) {
  if (args.length < 3) {
    console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }
  const filename = args[2];
  const json: string = fs.readFileSync(filename, 'binary');
  const registry: Entry = JSON.parse(json);
  visit(registry);
}

main(process.argv);
