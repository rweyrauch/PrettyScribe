import { Roster40k } from "./roster40k.js";
import { Renderer40k } from "./renderer40k.js";

var roster: Roster40k | null = null;

function removeAllChildren(parent: Element | null): void {
  if (parent) {
    var first = parent.firstElementChild;
    while (first) {
      first.remove();
      first = parent.firstElementChild;
    }
  }
}

function cleanup(): void {
  const rosterTitle = document.getElementById('roster-title');
  removeAllChildren(rosterTitle);

  const rosterList = document.getElementById('roster-lists');
  removeAllChildren(rosterList);

  const forceUnits = document.getElementById('force-units');
  removeAllChildren(forceUnits);
}

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  cleanup();

  if (files) {
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (let f of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const re = e.target;
        if (re && re.result) {
          if (re.result) {
            // Skip encoding tag
            const xmldatastart = re.result.toString().indexOf(',') + 1;
            //console.log("XML Start: " + xmldatastart);
            const xmldata = window.atob(re.result.toString().slice(xmldatastart));
            var parser = new DOMParser();
            var doc = parser.parseFromString(xmldata, "text/xml");

            if (doc) {
              // Determine roster type (game system).
              var info = doc.querySelector("roster");
              if (info) {
                const gameType = info.getAttributeNode("gameSystemName")?.nodeValue;
                if (!gameType) return;

                if (gameType == "Warhammer 40,000 8th Edition") {
                  var roster = Roster40k.CreateRoster(doc);
                  if (roster) {
                    if (roster._forces.length > 0) {
                      const rosterTitle = document.getElementById('roster-title');
                      const rosterList = document.getElementById('roster-lists');
                      const forceUnits = document.getElementById('force-units');

                      const renderer: Renderer40k = new Renderer40k();
                      renderer.render(roster, rosterTitle, rosterList, forceUnits);
                    }
                  }
                }
                else if (gameType == "Warhammer 40,000: Kill Team (2018)") {
                  alert("Kill Team not supported yet.");
                }
                else if (gameType == "Age of Sigmar") {
                  alert("Age of Sigmar not supported yet.");
                }
              }
            }
          }
        }
      }
      reader.readAsDataURL(f);
    }
  }
}

const finput = document.getElementById('roster-file');
if (finput) finput.addEventListener('change', handleFileSelect, false);
