/*
    Copyright 2020 Rick Weyrauch,

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

import { CreateKT21Roster } from "./rosterKT21";
import { RendererKT21 } from "./rendererKT21";
import { Create40kRoster } from "./roster40k";
import { Wh40k } from "./roster40k10th";
import { Renderer40k } from "./renderer40k";
import { Create30kRoster } from "./roster30k";
import { Renderer30k } from "./renderer30k";
import { HorusHeresy } from "./rosterHH2";
import { RendererHH2 } from "./rendererHH2";
import { CreateAoSRoster } from "./rosterAoS";
import { RendererAoS } from "./rendererAoS";
import { CreateWarcryRoster } from "./rosterWarcry";
import { RendererWarcry } from "./rendererWarcry";
import { Wh40kRenderer } from "./renderer40k10th";
import { CreateMESBGRoster } from "./rosterMESBG";
import { renderMESBG } from "./rendererMESBG";

import JSZip from "jszip";
import { reject } from "lodash";

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

function parseXML(xmldata: string) {
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
  } else if (gameType == "(HH V2) Horus Heresy (2022)") {
    const roster = HorusHeresy.CreateRoster(doc);
    if (roster && roster._forces.length > 0) {
      const renderer: RendererHH2 = new RendererHH2(roster);
      renderer.render(rosterTitle, rosterList, forceUnits);
    }
  } else if (gameType == "Warhammer 40,000 10th Edition") {
    const roster = Wh40k.CreateRoster(doc);
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
      $('#errorText').html('PrettyScribe does not support game type \'' + gameType + '\'.');
      $('#errorDialog').modal('show');
  }
}

const unzip = async (file: string) : Promise<string> => {
  if (file.charAt(0) !== 'P') {
    return file
  } else {
    const jszip = new JSZip()
    const zip = await jszip.loadAsync(file)
    return zip.file(/[^/]+\.ros/)[0].async('string') // Get roster files that are in the root
  }
}

let fileChangeEvent: Event | null = null;

function handleFileSelect(event: Event) {

  let input;
  let files;

  if (event?.type === "resize") input = fileChangeEvent?.target as HTMLInputElement;
  else input = event?.target as HTMLInputElement;

  files = input?.files;

  cleanup();

  if (files) {
    if (event?.type !== "resize") fileChangeEvent = event;

    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Failed to read roster file.'));
    }
    reader.onloadend = async () => {
      const content = reader.result as string;
      const xmldata = await unzip(content);
      parseXML(xmldata);
    }
    reader.readAsBinaryString(files[0]);
  }
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
