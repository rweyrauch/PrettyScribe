import { Roster } from "./roster.js";

var roster: Roster | null = null;

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (files) {
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (let f of files) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
        f.size, ' bytes, last modified: ',
        f.lastModified ? f.lastModified.toString() : 'n/a',
        '</li>');
      const reader = new FileReader();
      reader.onload = function (e) {
        const re = e.target;
        if (re && re.result) {
          //console.log(re.result);
          if (re.result) {
            // Skip encoding tag
            const xmldatastart = re.result.toString().indexOf(',') + 1;
            console.log("XML Start: " + xmldatastart);
            const xmldata = window.atob(re.result.toString().slice(xmldatastart));
            roster = Roster.CreateRoster(xmldata);
            if (roster) {
              console.log("Points: " + roster._points + "  Power Level: " + roster._powerLevel + "  CP: " + roster._commandPoints);
            }
          }
        }
      }
      reader.readAsDataURL(f);
    }
    const list = document.getElementById('list');
    if (list) list.innerHTML = '<ul>' + output.join('') + '</ul>';
  }
}

const finput = document.getElementById('roster-file');
if (finput) finput.addEventListener('change', handleFileSelect, false);
