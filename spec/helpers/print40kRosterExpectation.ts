/*
 * Utility script to render Jasmine-stype expect() statements for a roster.
 *
 * Run with:
 *   $ ts-node spec/helpers/print40kRosterExpectation.ts 'path/to/file'
 */

import { getRosterExpectation } from "./40kRosterExpectation";
import { readRosterFile } from './readRosterFile';
import { BaseNotes, Create40kRoster, Force, Unit } from "../../src/roster40k";

function main(args: string[]) {
  if (args.length < 3) {
    console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }

  for (const filename of args.slice(2)) {
    console.log(getRosterExpectation(filename));
  }
}

main(process.argv);
