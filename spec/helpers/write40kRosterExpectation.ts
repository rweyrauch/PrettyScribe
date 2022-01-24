/*
 * Utility script to write Jasminen spec file for rosters. By default, writes
 * test specs for all 40k rosters. Pass in one or more filenames to limit to
 * just those files.
 *
 * Run with:
 *   $ ts-node spec/helpers/write40kRosterExpectation.ts [optional/path/to/file another/file ...]
 */

import fs from "fs";
import path from "path";
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
  if (args.length >= 3) {
    Promise.all(args.slice(2).map(writeRosterExpectations));
  } else {
    const dir = 'test';
    const filenames = fs.readdirSync(dir)
        .filter(name => name.endsWith('.ros') || name.endsWith('.rosz'))
        .map(name => path.join(dir, name));
    Promise.all(
      // Catch errors to handle non-40k roster files.
      filenames.map(name => writeRosterExpectations(`${name}`)
          .catch(e => console.warn(`Unable to process file '${name}': ${e}`))));
  }
}

main(process.argv);

