/*
 * Utility script to write Jasminen spec file for a roster.
 *
 * Run with:
 *   $ ts-node spec/helpers/write40kRosterExpectation.ts 'path/to/file'
 *
 * To update all 40k files, on a Mac:
 *   $ smardan$ grep -l test/*.ros -E -e "Warhammer 40,000.*Edition" | tr \\n \\0 | xargs -0 ts-node spec/helpers/write40kRosterExpectation.ts
 * (see https://stackoverflow.com/questions/16758525/make-xargs-handle-filenames-that-contain-spaces)
 */

import fs from "fs";
import { getRosterExpectation } from "./40kRosterExpectation";

async function writeRosterExpectations(filename: string) {
  const filenameMatch = filename.match('([^/]+)\.rosz?$');
  if (!filenameMatch) {
    console.error(`ERROR: Unexpected input filename doesn't match regex: ${filename}`);
    return;
  }
  const outputFilename = `spec/${filenameMatch[1].replace(/\s/g, '')}Spec.ts`;

  const output = await getRosterExpectation(filename);

  fs.writeFile(outputFilename, output, function (err) {
    if (err) return console.log(err);
    console.log(`Wrote file '${outputFilename}'`);
  });
}

function main(args: string[]) {
  if (args.length < 3) {
    console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }

  Promise.all(args.slice(2).map(writeRosterExpectations));
}

main(process.argv);

