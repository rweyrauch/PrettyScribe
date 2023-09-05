/*
 * Utility script to write Jasminen spec file for rosters. By default, writes
 * test specs for all 40k rosters. Pass in one or more filenames to limit to
 * just those files.
 *
 * Run with:
 *   $ npx ts-node tools/write40kRosterExpectation.ts [optional/path/to/file another/file ...]
 */

import fs from "fs";
import path from "path";
import * as rosterExpectation40k from "./rosterExpectation40k";

/* Input directory where test rosters are. */
const INPUT_DIRECTORY = 'test';

/* Mapping of input subdirectories to how to generate their expectations. */
const INPUT_SUBDIR_TO_EXPECTATIONS: { [key: string]: (filename: string) => Promise<string>; } = {
  '40k8th': rosterExpectation40k.getRosterExpectation,
  '40k9th': rosterExpectation40k.getRosterExpectation,
};

/* Output directory where test specs are. */
const OUTPUT_DIRECTORY = 'spec';

async function writeRosterExpectations(filename: string) {
  const filenameMatch = filename.match(`${INPUT_DIRECTORY}/(?:([^/]+)/)?([^/]+)\.rosz?$`);
  if (!filenameMatch) {
    throw new Error(`ERROR: Unexpected input filename doesn't match regex: ${filename}`);
  }
  const subdir = filenameMatch[1];
  if (!subdir) {
    throw new Error(`ERROR: filename must be in in a subdirectory, but was not: ${filename}`);
  }
  const rosterExpectationFunction = INPUT_SUBDIR_TO_EXPECTATIONS[subdir];
  if (!rosterExpectationFunction) {
    throw new Error(`ERROR: No roster expectation identified for subdir "${subdir}" of file: ${filename}`)
  }

  const specName = `${filenameMatch[2].replace(/\s/g, '')}Spec.ts`;
  const outputFilename = path.join(OUTPUT_DIRECTORY, subdir, specName);

  const output = await rosterExpectationFunction(filename);

  fs.writeFile(outputFilename, output, function (err) {
    if (err) return console.log(err);
    console.log(`Wrote file '${outputFilename}'`);
  });
}

async function readAllTestFiles() {
  Promise.all(Object.keys(INPUT_SUBDIR_TO_EXPECTATIONS).map(async (subdir) => {
    const subdirPath = path.join(INPUT_DIRECTORY, subdir);
    const contents = await fs.promises.readdir(subdirPath);
    const filenames = contents
        .filter(name => name.endsWith('.ros') || name.endsWith('.rosz'))
        .map(name => path.join(subdirPath, name));
    Promise.all(
      filenames.map(writeRosterExpectations));
    }));
}

function main(args: string[]) {
  if (args.length >= 3) {
    Promise.all(args.slice(2).map(writeRosterExpectations));
  } else {
    readAllTestFiles();
  }
}

main(process.argv);
