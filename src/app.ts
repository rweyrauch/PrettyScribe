/*
    Copyright 2020-26 Rick Weyrauch,

    Permission to use, copy, modify, and/or distribute this software for any purpose 
    with or without fee is hereby granted, provided that the above copyright notice
    and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
    FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS 
    OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER 
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE 
    OF THIS SOFTWARE.
*/

import JSZip from "jszip";

import { CreateKT21Roster } from "./rosterKT21";
import { RendererKT21 } from "./rendererKT21";
import { Create40kRoster } from "./roster40k";
import { Wh40k } from "./roster40k10th";
import { Renderer40k } from "./renderer40k";
import { Create30kRoster } from "./roster30k";
import { Renderer30k } from "./renderer30k";
import { HorusHeresy } from "./rosterHH2";
import { RendererHH2 } from "./rendererHH2";
import { HorusHeresy3 } from "./rosterHH3";
import { RendererHH3 } from "./rendererHH3";
import { CreateAoSRoster } from "./rosterAoS";
import { RendererAoS } from "./rendererAoS";
import { CreateWarcryRoster } from "./rosterWarcry";
import { RendererWarcry } from "./rendererWarcry";
import { Wh40kRenderer } from "./renderer40k10th";
import { CreateMESBGRoster } from "./rosterMESBG";
import { renderMESBG } from "./rendererMESBG";

import { Registry } from "./rosterizer";
import { Create40kRosterFromRegistry } from "./registry40k10th";

function cleanup(): void {
  $('#roster-title').empty();
  $('#roster-lists').empty();
  $('#force-units').empty();
}

function getFileExtension(filename: string): string {
  const substrings = filename.split('.');
  if (substrings.length > 1) {
    return substrings[substrings.length-1].toLowerCase();
  }
  return "";
}

function parseBattleScribeXML(xmldata: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmldata, "text/xml");
  if (!doc) return;

  // Determine roster type (game system).
  const info = doc.querySelector("roster");
  if (!info) return;

  const gameType = info.getAttribute("gameSystemName");
  if (!gameType) return;

  const rosterName = info.getAttribute("name");
  if (rosterName) {
    document.title = `PrettyScribe ${rosterName}`;
  }

  const rosterTitle = $('#roster-title')[0];
  const rosterList = $('#roster-lists')[0];
  const forceUnits = $('#force-units')[0];

  if (gameType == "Warhammer 40,000 8th Edition") {
    const roster = Create40kRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: Renderer40k = new Renderer40k(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 40,000 9th Edition") {
    const roster = Create40kRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: Renderer40k = new Renderer40k(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 40,000: Kill Team (2018)") {
    const roster = Create40kRoster(doc, false);
    if (roster && roster._forces.length > 0) {
      const renderer: Renderer40k = new Renderer40k(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 40,000: Kill Team (2021)") {
    const roster = CreateKT21Roster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: RendererKT21 = new RendererKT21(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Age of Sigmar") {
    const roster = CreateAoSRoster(doc);
    if (roster) {
      const renderer: RendererAoS = new RendererAoS(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer Age of Sigmar: Warcry") {
    const roster = CreateWarcryRoster(doc);
    if (roster) {
      const renderer: RendererWarcry = new RendererWarcry(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 30,000 - The Horus Heresy") {
    const roster = Create30kRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: Renderer30k = new Renderer30k(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType === "Horus Heresy 3rd Edition") {
    const roster = HorusHeresy3.CreateRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: RendererHH3 = new RendererHH3(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType.includes("Horus Heresy (2022)")) {
    const roster = HorusHeresy.CreateRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: RendererHH2 = new RendererHH2(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 40,000 10th Edition") {
    const roster = Wh40k.CreateRoster(doc);
    (window as any).roster = roster;
    if (roster && roster._forces.length > 0) {
      const renderer: Wh40kRenderer = new Wh40kRenderer(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType === "Middle-Earth Strategy Battle Game") {
    const roster = CreateMESBGRoster(doc);
    if(roster !== null) {
      console.log(roster);
      renderMESBG(roster, rosterTitle, rosterList, forceUnits);
    }
  }
  // TODO: add (proper) support for Apocalypse
  // else if (gameType == "Warhammer 40,000: Apocalypse") {
  //    let roster = Create40kRoster(doc);
  //    if (roster) {
  //      if (roster._forces.length > 0) {
  //        const renderer: Renderer40k = new Renderer40k(roster);
  //        renderer.render(rosterTitle, rosterList, forceUnits);
  //      }
  //    }
  // }
  else {
    showErrorModal('PrettyScribe does not support game type \'' + gameType + '\'.');
  }
}

function parseRosterizerJSON(jsondata: string) {
  const registry: Registry = JSON.parse(jsondata);
  (window as any).registry = registry;

  const rosterTitle = $('#roster-title')[0];
  const rosterList = $('#roster-lists')[0];
  const forceUnits = $('#force-units')[0];

  const game = registry.info.game;
  if (game === 'Warhammer 40k') {
    const roster = Create40kRosterFromRegistry(registry);
    (window as any).roster = roster;

    const renderer: Wh40kRenderer = new Wh40kRenderer(roster);
    renderer.render(rosterTitle, rosterList, forceUnits);
  } else {
    showErrorModal('PrettyScribe does not support game type \'' + game + '\'.');
  }
}

/**
 * If the input buffer is zipped, returns contents of the first file matching
 * fileRegex, otherwise UTF8-decodes the buffer.
 */
async function maybeUnzip(buf: ArrayBuffer, fileRegex: RegExp): Promise<string> {
  const array = new Int8Array(buf, 0, 1);
  const isZipped = array[0] === 'P'.charCodeAt(0);

  if (isZipped) {
    const jszip = new JSZip()
    const zip = await jszip.loadAsync(buf)
    return zip.file(fileRegex)[0].async('string') // Get roster files that are in the root
  } else {
    const utf8decoder = new TextDecoder();  // Defaults to UTF-8
    return utf8decoder.decode(buf);
  }
}

let fileChangeEvent: Event | null = null;

function handleFileSelect(event: Event) {

  const input = event?.type === "resize"
      ? fileChangeEvent?.target as HTMLInputElement
      : event?.target as HTMLInputElement;

  cleanup();

  if (!input?.files) return;
  const file = input?.files[0];

  if (event?.type !== "resize") fileChangeEvent = event;

  file.arrayBuffer().then(async (buf: ArrayBuffer) => {
    if (file.name.match(/\.rosz?$/)) {
      const xmldata = await maybeUnzip(buf, /[^/]+\.ros$/);
      parseBattleScribeXML(xmldata);
    } else if (file.name.match(/\.regi[sz]try$/)) {
      const jsondata = await maybeUnzip(buf, /[^/]+\.registry$/);
      parseRosterizerJSON(jsondata);
    } else {
      showErrorModal(`PrettyScribe does not support extension of ${file.name}.`);
    }
  }).catch((e) => {
    showErrorModal(`Error opening ${file.name}: ${e}`);
    console.error(e);
  });
}

function showErrorModal(msg: string) {
  $('#errorText').html(msg);
  $('#errorDialog').modal('show');  

}

// TODO: re-render on resize if needed.  Reloading/parsing each time the window is
// resized yields very poor performance.
//$(window).on("resize", handleFileSelect);

$('#roster-file').on("change", handleFileSelect);

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.userAgent.match(/AppleWebKit.*Safari/)
      && !navigator.userAgent.includes('Chrome')) {
    // iPhone and iPad devices don't support extensions on the accept attribute
    // for input type=file (https://caniuse.com/input-file-accept). If set, they
    // will not allow any file to be selected, so remove the attribute.
    const inputEl = document.querySelector('input[type="file"');
    inputEl?.removeAttribute('accept');
  }
});
