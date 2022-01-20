"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _40kRosterExpectation_1 = require("./40kRosterExpectation");
function main(args) {
    if (args.length < 3) {
        console.error(`ERROR: Expected at least one CLI argument; got ${args.length}: ${args.join(' ')}`);
        return;
    }
    Promise.all(args.slice(2).map(_40kRosterExpectation_1.getRosterExpectation));
}
main(process.argv);
//# sourceMappingURL=print40kRosterExpectation.js.map