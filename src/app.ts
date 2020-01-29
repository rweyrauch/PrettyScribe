import { Roster } from "./roster.js";
import { Renderer } from "./renderer.js";

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

              if (roster._forces.length > 0) {
                const rosterTitle = document.getElementById('roster-title');
                if (rosterTitle) {
                  rosterTitle.innerHTML = '<h3>Army Roster (' + roster._points + ' pts, ' + roster._powerLevel + ')</h3>';
                }

                const renderer: Renderer = new Renderer();

                const rosterList = document.getElementById('roster-lists');
                const forceUnits = document.getElementById('force-units');
                 
                for (let force of roster._forces) {
                    const forceTitle = document.createElement('div');
                    if (forceTitle) {
                      forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force._name + '</p>';
                    }
                    rosterList?.appendChild(forceTitle);

                    const table = document.createElement('table');
                    table.classList.add('table');
                    table.classList.add('table-sm');
                    table.classList.add('table-striped');
                    const thead = document.createElement('thead');
                    table.appendChild(thead);
                    thead.classList.add('thead-light');
                    const tr = document.createElement('tr');
                    thead.appendChild(tr);
                    const headerLabels = ["NAME", "ROLE", "MODELS", "POINTS", "POWER"];
                    headerLabels.forEach(element => {
                      const th = document.createElement('th');
                      th.scope = "col";
                      th.innerHTML = element;
                      tr.appendChild(th);
                    });
                    forceTitle.appendChild(table);

                    let body = document.createElement('tbody');
                    table.appendChild(body);
                    for (let unit of force._units) {
                      let tr = document.createElement('tr');
                      let uname = document.createElement('td');
                      uname.innerHTML = unit._name;
                      let role = document.createElement('td');
                      role.innerHTML = unit._role.toString();
                      let models = document.createElement('td');
                      models.innerHTML = 'TBD';
                      let pts = document.createElement('td');
                      pts.innerHTML = unit._points.toString();
                      let pwr = document.createElement('td');
                      pwr.innerHTML = unit._powerLevel.toString();
                      tr.appendChild(uname);
                      tr.appendChild(role);
                      tr.appendChild(models);
                      tr.appendChild(pts);
                      tr.appendChild(pwr);
                      body.appendChild(tr);    
                    }

                    for (let unit of force._units) {
                      let canvas = document.createElement('canvas') as HTMLCanvasElement;
                      canvas.width = Renderer._res * 5.5;
                      canvas.height = Renderer._res * 8.5;
                      
                      const dims = renderer.render(unit, canvas, 0, 0);
                      console.log("Dims: " + dims);

                      const border = 25;
                      let finalCanvas = document.createElement('canvas') as HTMLCanvasElement;
                      finalCanvas.width = dims[0] + border * 2;
                      finalCanvas.height = dims[1] + border * 2;
                      let finalCtx = finalCanvas.getContext('2d');
                      finalCtx?.drawImage(canvas, border, border);
                      forceUnits?.appendChild(finalCanvas);
                    }
                }
              }
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
