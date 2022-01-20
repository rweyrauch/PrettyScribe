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
exports.readZippedRosterFile = exports.readRosterFile = void 0;
const fs_1 = __importDefault(require("fs"));
const jsdom_1 = require("jsdom");
const jszip_1 = __importDefault(require("jszip"));
function readRosterFile(filename) {
    const xmldata = fs_1.default.readFileSync(filename, 'binary');
    return new jsdom_1.JSDOM(xmldata, { contentType: "text/xml" }).window.document;
}
exports.readRosterFile = readRosterFile;
function readZippedRosterFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const contents = fs_1.default.readFileSync(filename, 'binary');
        const xmldata = yield unzip(contents);
        return new jsdom_1.JSDOM(xmldata, { contentType: "text/xml" }).window.document;
    });
}
exports.readZippedRosterFile = readZippedRosterFile;
function unzip(contents) {
    return __awaiter(this, void 0, void 0, function* () {
        if (contents.charAt(0) !== 'P') {
            return contents;
        }
        else {
            const jszip = new jszip_1.default();
            const zip = yield jszip.loadAsync(contents);
            return zip.file(/[^/]+\.ros/)[0].async('string');
        }
    });
}
//# sourceMappingURL=readRosterFile.js.map