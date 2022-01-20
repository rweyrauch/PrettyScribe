"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readRosterFile_1 = require("./readRosterFile");
let verbose = false;
function visit(el, indent = 0) {
    if (!verbose && ['categories', 'characteristics', 'publications'].includes(el.tagName)) {
        return;
    }
    else if (el.children.length === 0 && el.attributes.length === 0) {
        return;
    }
    else if (['selections', 'profiles', 'rules'].includes(el.tagName) && el.attributes.length === 0) {
        for (const child of el.children) {
            visit(child, indent);
        }
    }
    else if (el.tagName === 'costs') {
        visitCosts(el, indent);
    }
    else {
        visitPrintableElement(el, indent);
        for (const child of el.children) {
            visit(child, indent + 1);
        }
    }
}
function visitCosts(el, indent) {
    const costs = {};
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
        const costsString = Object.keys(costs).map(c => `${costs[c]} ${c.trim()}`).sort().reverse().join(' / ');
        printLine(el, indent, costsString);
    }
    return;
}
function visitPrintableElement(el, indent) {
    const attrs = [];
    for (const attr of el.attributes) {
        if (!verbose && ['id', 'publicationId', 'entryId', 'catalogueId', 'catalogueRevision',
            'entryGroupId', 'typeId', 'page', 'hidden'].includes(attr.name)) {
            continue;
        }
        ;
        attrs.push(`${attr.name}="${attr.value}"`);
    }
    printLine(el, indent, attrs.join(' '));
}
function printLine(el, indent, details) {
    console.log(`${' '.repeat(indent * 2)}(${indent}) ${el.tagName} ${details}`);
}
function main(args) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const doc = yield readRosterFile_1.readZippedRosterFile(filename);
        visit(doc.documentElement);
    });
}
main(process.argv);
//# sourceMappingURL=printRosterStructure.js.map