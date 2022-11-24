/*
 * Utility script to render Roster file contents on the command line.
 *
 * Run with:
 *   $ npx ts-node tools/printRosterStructure.ts [-v] 'path/to/file'
 * 
 * Options:
 *   -v: verbose; print out everything in the roster file
 */

import { readZippedRosterFile } from '../spec/helpers/readRosterFile';

let verbose = false;

/**
 * Visits an Element node and its children, outputting useful bits to console.
 * @param el element to process
 * @param indent level to indent (increments by 1)
 */
function visit(el: Element, indent = 0): void {
  if (!verbose && ['categories', 'characteristics', 'publications'].includes(el.tagName)) {
    return;
  } else if (el.children.length === 0 && el.attributes.length === 0) {
    return;
  } else if (['selections', 'profiles', 'rules'].includes(el.tagName) && el.attributes.length === 0) {
    for (const child of el.children) {
      visit(child, indent);
    }
  } else if (el.tagName === 'costs') {
    visitCosts(el, indent);
  } else {
    visitPrintableElement(el, indent);
    for (const child of el.children) {
      visit(child, indent + 1);
    }
  }
}

function visitCosts(el: Element, indent: number) {
  const costs: {[index: string]: number} = {};
  let hasNonZeroCosts = false;
  for (const cost of el.children) {
    const name = cost.getAttribute('name');
    const value = Number(cost.getAttribute('value'));
    if (cost.tagName === 'cost' && name && value) {
      costs[name] = value;
    }
    if (value > 0 || value < 0) {
      hasNonZeroCosts = true;
    }
  }
  if (hasNonZeroCosts) {
    // Reversing sort order means the final order is pts / PL / CP.
    const costsString = Object.keys(costs).map(c => `${costs[c]} ${c.trim()}`).sort().reverse().join(' / ');
    printLine(el, indent, costsString);
  }
  return;
}

function visitPrintableElement(el: Element, indent: number) {
  const attrs = [];
  for (const attr of el.attributes) {
    if (!verbose && ['id', 'publicationId', 'entryId', 'catalogueId', 'catalogueRevision',
         'entryGroupId', 'typeId', 'page', 'hidden'].includes(attr.name)) {
        continue
    };
    attrs.push(`${attr.name}="${attr.value}"`);
  }

  printLine(el, indent, attrs.join(' '));
}

function printLine(el: Element, indent: number, details: string) {
  console.log(`${' '.repeat(indent * 2)}(${indent}) ${el.tagName} ${details}`);
}

async function main(args: string[]) {
  const verboseFlagIndex = args.indexOf('-v');
  if (verboseFlagIndex !== -1) {
    args.splice(verboseFlagIndex, 1);
    verbose = true;
  }

  if (args.length !== 3) {
    console.error(`ERROR: Expected one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }
  const filename = args[2];
  const doc = await readZippedRosterFile(filename);
  visit(doc.documentElement);
}

main(process.argv);
