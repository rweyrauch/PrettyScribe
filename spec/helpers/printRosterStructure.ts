/*
 * Utility script to render Roster file contents on the command line.
 *
 * Run with:
 *   $ ts-node spec/helpers/printRosterStructure.ts 'path/to/file'
 */

import { readZippedRosterFile } from './readRosterFile';

/**
 * Visits an Element node and its children, outputting useful bits to console.
 * @param el element to process
 * @param indent level to indent (increments by 1)
 */
function visit(el: Element, indent = 0): void {
  if (['categories', 'costs', 'characteristics', 'publications'].includes(el.tagName)) {
    return;
  }

  if (el.children.length === 0 && el.attributes.length === 0) {
    return;
  }

  if (['selections', 'profiles', 'rules'].includes(el.tagName) && el.attributes.length === 0) {
    for (const child of el.children) {
      visit(child, indent);
    }
    return;
  }

  const attrs = [];
  for (const attr of ['name', 'type', 'typeName', 'number']) {
    const value = el.getAttribute(attr);
    if (value) attrs.push(`${attr}="${value}"`);
  }

  console.log(`${' '.repeat(indent * 2)}(${indent}) ${el.tagName} ${attrs.join(' ')}`);
  for (const child of el.children) {
    visit(child, indent + 1);
  }

}

async function main(args: string[]) {
  if (args.length !== 3) {
    console.error(`ERROR: Expected one CLI argument; got ${args.length}: ${args.join(' ')}`);
    return;
  }
  const filename = args[2];
  const doc = await readZippedRosterFile(filename);
  visit(doc.documentElement);
}

main(process.argv);
