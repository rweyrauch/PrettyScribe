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
import { Renderer40k } from "./renderer40k";
import { Create30kRoster } from "./roster30k";
import { Renderer30k } from "./renderer30k";
import { CreateAoSRoster } from "./rosterAoS";
import { RendererAoS } from "./rendererAoS";
import { CreateWarcryRoster } from "./rosterWarcry";
import { RendererWarcry } from "./rendererWarcry";
//import { RendererHtml40k } from "./rendererHtml40k";

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
  let parser = new DOMParser();
  let doc = parser.parseFromString(xmldata, "text/xml");

  if (doc) {
    // Determine roster type (game system).
    let info = doc.querySelector("roster");
    if (info) {
      const gameType = info.getAttributeNode("gameSystemName")?.nodeValue;
      if (!gameType) return;

      const rosterTitle = $('#roster-title')[0];
      const rosterList = $('#roster-lists')[0];
      const forceUnits = $('#force-units')[0];

      if (gameType == "Warhammer 40,000 8th Edition") {
        let roster = Create40kRoster(doc);
        if (roster) {
          if (roster._forces.length > 0) {
            const renderer: Renderer40k = new Renderer40k(roster);
            renderer.render(rosterTitle, rosterList, forceUnits);
          }
        }
      }
      else if (gameType == "Warhammer 40,000 9th Edition") {
        let roster = Create40kRoster(doc);
        if (roster) {
          if (roster._forces.length > 0) {
            const renderer: Renderer40k = new Renderer40k(roster);
            renderer.render(rosterTitle, rosterList, forceUnits);
          }
        }
      }
      else if (gameType == "Warhammer 40,000: Kill Team (2018)") {
        //alert("Kill Team not supported yet.");
        let roster = Create40kRoster(doc, false);
        if (roster) {
          if (roster._forces.length > 0) {
            const renderer: Renderer40k = new Renderer40k(roster);
            renderer.render(rosterTitle, rosterList, forceUnits);
          }
        }
      }
      else if (gameType == "Warhammer 40,000: Kill Team (2021)") {
        //alert("Kill Team not supported yet.");
        let roster = CreateKT21Roster(doc);
        if (roster) {
          if (roster._forces.length > 0) {
            const renderer: RendererKT21 = new RendererKT21(roster);
            renderer.render(rosterTitle, rosterList, forceUnits);
          }
        }
      }
      else if (gameType == "Age of Sigmar") {
        let roster = CreateAoSRoster(doc);
        if (roster) {
          const renderer: RendererAoS = new RendererAoS(roster);
          renderer.render(rosterTitle, rosterList, forceUnits);
        }
      }
      else if (gameType == "Warhammer Age of Sigmar: Warcry") {
        let roster = CreateWarcryRoster(doc);
        if (roster) {
          const renderer: RendererWarcry = new RendererWarcry(roster);
          renderer.render(rosterTitle, rosterList, forceUnits);
        }
      }
      else if (gameType == "Warhammer 30,000 - The Horus Heresy") {
          let roster = Create30kRoster(doc);
          if (roster) {
            if (roster._forces.length > 0) {
              const renderer: Renderer30k = new Renderer30k(roster);
              renderer.render(rosterTitle, rosterList, forceUnits);
            }
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
          $('#errorDialog').modal();
      }
    }
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
