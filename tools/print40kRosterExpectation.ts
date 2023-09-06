/*
 * Utility script to render Jasmine-stype expect() statements for a roster.
 *
 * Run with:
 *   $ npx ts-node tools/print40kRosterExpectation.ts 'path/to/file'
 */

import { getRosterExpectation } from "./rosterExpectation40k";

function main(args: string[]) {
  if (args.length < 3) {
    console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }

  Promise.all(args.slice(2).map(f => getRosterExpectation(f).then(console.log)));
}

main(process.argv);
