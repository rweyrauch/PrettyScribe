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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const _40kRosterExpectation_1 = require("./40kRosterExpectation");
function writeRosterExpectations(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const filenameMatch = filename.match('([^/]+)\.rosz?$');
        if (!filenameMatch) {
            console.error(`ERROR: Unexpected input filename doesn't match regex: ${filename}`);
            return;
        }
        const outputFilename = `spec/${filenameMatch[1].replace(/\s/g, '')}Spec.ts`;
        const output = yield _40kRosterExpectation_1.getRosterExpectation(filename);
        fs_1.default.writeFile(outputFilename, output, function (err) {
            if (err)
                return console.log(err);
            console.log(`Wrote file '${outputFilename}'`);
        });
    });
}
function main(args) {
    if (args.length < 3) {
        console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
        return;
    }
    Promise.all(args.slice(2).map(writeRosterExpectations));
}
main(process.argv);
//# sourceMappingURL=write40kRosterExpectation.js.map