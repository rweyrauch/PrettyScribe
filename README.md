# PrettyScribe

PrettyScribe is a simple single-page web application that renders BattleScribe roster files in
a (hopefully) useful format for viewing on device or printing.   The PrettyScribe application
is inspired by the (poorly named but quite useful) ButtScribe, http://www.buttscri.be/, application.

Currently PrettyScribe supports roster files for Warhammer 40k, Warhammer 40k Kill Team,
Warhammer Age of Sigmar, Warhammer Warcry and Warhammer 30k.

This work was started as an exercise in learning web-development (Javascript, Typescript, etc.) and
a passion for the table-top wargamming hobby in general.

PrettyScribe is very much a work in progress.   Suggestions, bugs, comments are welcomed.

If you actually use this tool and find it useful let me know.

## Building

### Quick Start

Prettyscribe is written in Typescript and uses npm for initialization, compiling and launching a
test server at http://localhost:8080.

    $ git clone https://github.com/rweyrauch/PrettyScribe.git
    $ cd PrettyScribe
    $ npm install
    $ npm start

### Details

Prettyscribe uses webpack for compilation of the Typescript into Javascript and to bundle the
Javascript source into a single Javascript file.

Prettyscribe can be built in either a debug or production release.   The default is a debug build.
To build PrettyScribe for debugging:

    $ npm run build

To build PrettyScribe for release:

    $ npm run buildprod

### Tests

Prettyscribe uses jasmine tests to validate roster parsing.   Test rosters live under the `test/`
directory.   Test specs live under `spec/` and are generated via a command, but should be reviewed
manually to verify changes.

Only 40k has tests, and parsing fixes must include minimal rosters and specs verifying the fix.

To run PrettyScribe tests:

    $ npm test

To (re)generate PrettyScribe tests:

    $ npm run writetests

