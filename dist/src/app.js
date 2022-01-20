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
const rosterKT21_1 = require("./rosterKT21");
const rendererKT21_1 = require("./rendererKT21");
const roster40k_1 = require("./roster40k");
const renderer40k_1 = require("./renderer40k");
const roster30k_1 = require("./roster30k");
const renderer30k_1 = require("./renderer30k");
const rosterAoS_1 = require("./rosterAoS");
const rendererAoS_1 = require("./rendererAoS");
const rosterWarcry_1 = require("./rosterWarcry");
const rendererWarcry_1 = require("./rendererWarcry");
const jszip_1 = __importDefault(require("jszip"));
const lodash_1 = require("lodash");
function cleanup() {
    $('#roster-title').empty();
    $('#roster-lists').empty();
    $('#force-units').empty();
}
function getFileExtension(filename) {
    const substrings = filename.split('.');
    if (substrings.length > 1) {
        return substrings[substrings.length - 1].toLowerCase();
    }
    return "";
}
function parseXML(xmldata) {
    var _a;
    let parser = new DOMParser();
    let doc = parser.parseFromString(xmldata, "text/xml");
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const gameType = (_a = info.getAttributeNode("gameSystemName")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (!gameType)
                return;
            const rosterTitle = $('#roster-title')[0];
            const rosterList = $('#roster-lists')[0];
            const forceUnits = $('#force-units')[0];
            if (gameType == "Warhammer 40,000 8th Edition") {
                let roster = roster40k_1.Create40kRoster(doc);
                if (roster) {
                    if (roster._forces.length > 0) {
                        const renderer = new renderer40k_1.Renderer40k(roster);
                        renderer.render(rosterTitle, rosterList, forceUnits);
                    }
                }
            }
            else if (gameType == "Warhammer 40,000 9th Edition") {
                let roster = roster40k_1.Create40kRoster(doc);
                if (roster) {
                    if (roster._forces.length > 0) {
                        const renderer = new renderer40k_1.Renderer40k(roster);
                        renderer.render(rosterTitle, rosterList, forceUnits);
                    }
                }
            }
            else if (gameType == "Warhammer 40,000: Kill Team (2018)") {
                let roster = roster40k_1.Create40kRoster(doc, false);
                if (roster) {
                    if (roster._forces.length > 0) {
                        const renderer = new renderer40k_1.Renderer40k(roster);
                        renderer.render(rosterTitle, rosterList, forceUnits);
                    }
                }
            }
            else if (gameType == "Warhammer 40,000: Kill Team (2021)") {
                let roster = rosterKT21_1.CreateKT21Roster(doc);
                if (roster) {
                    if (roster._forces.length > 0) {
                        const renderer = new rendererKT21_1.RendererKT21(roster);
                        renderer.render(rosterTitle, rosterList, forceUnits);
                    }
                }
            }
            else if (gameType == "Age of Sigmar") {
                let roster = rosterAoS_1.CreateAoSRoster(doc);
                if (roster) {
                    const renderer = new rendererAoS_1.RendererAoS(roster);
                    renderer.render(rosterTitle, rosterList, forceUnits);
                }
            }
            else if (gameType == "Warhammer Age of Sigmar: Warcry") {
                let roster = rosterWarcry_1.CreateWarcryRoster(doc);
                if (roster) {
                    const renderer = new rendererWarcry_1.RendererWarcry(roster);
                    renderer.render(rosterTitle, rosterList, forceUnits);
                }
            }
            else if (gameType == "Warhammer 30,000 - The Horus Heresy") {
                let roster = roster30k_1.Create30kRoster(doc);
                if (roster) {
                    if (roster._forces.length > 0) {
                        const renderer = new renderer30k_1.Renderer30k(roster);
                        renderer.render(rosterTitle, rosterList, forceUnits);
                    }
                }
            }
            else {
                $('#errorText').html('PrettyScribe does not support game type \'' + gameType + '\'.');
                $('#errorDialog').modal();
            }
        }
    }
}
const unzip = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file.charAt(0) !== 'P') {
        return file;
    }
    else {
        const jszip = new jszip_1.default();
        const zip = yield jszip.loadAsync(file);
        return zip.file(/[^/]+\.ros/)[0].async('string');
    }
});
let fileChangeEvent = null;
function handleFileSelect(event) {
    let input;
    let files;
    if ((event === null || event === void 0 ? void 0 : event.type) === "resize")
        input = fileChangeEvent === null || fileChangeEvent === void 0 ? void 0 : fileChangeEvent.target;
    else
        input = event === null || event === void 0 ? void 0 : event.target;
    files = input === null || input === void 0 ? void 0 : input.files;
    cleanup();
    if (files) {
        if ((event === null || event === void 0 ? void 0 : event.type) !== "resize")
            fileChangeEvent = event;
        const reader = new FileReader();
        reader.onerror = () => {
            reader.abort();
            lodash_1.reject(new DOMException('Failed to read roster file.'));
        };
        reader.onloadend = () => __awaiter(this, void 0, void 0, function* () {
            const content = reader.result;
            const xmldata = yield unzip(content);
            parseXML(xmldata);
        });
        reader.readAsBinaryString(files[0]);
    }
}
$('#roster-file').on("change", handleFileSelect);
//# sourceMappingURL=app.js.map