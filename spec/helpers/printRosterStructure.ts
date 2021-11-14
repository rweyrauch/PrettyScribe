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
  if (['categories', 'characteristics', 'publications'].includes(el.tagName)) {
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
  for (const attr of ['name', 'type', 'typeName', 'number', 'value']) {
    const value = el.getAttribute(attr);
    if (value) attrs.push(`${attr}="${value}"`);
  }

  printLine(el, indent, attrs.join(' '));
}

function printLine(el: Element, indent: number, details: string) {
  console.log(`${' '.repeat(indent * 2)}(${indent}) ${el.tagName} ${details}`);
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
