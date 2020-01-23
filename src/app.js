function handleFileSelect(event) {
  const input = event.target;
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
            createRoster(xmldata);
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

function createRoster(str) {

  var pts = 0;
  var pl = 0;
  var cp = 0;

  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/xml");
  if (doc) {

    var costs = doc.querySelectorAll("roster>costs>cost");
    for (cost of costs) {
      if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
        let which = cost.getAttributeNode("name").nodeValue;
        let value = cost.getAttributeNode("value").nodeValue;
        if (which == " PL") {
           pl = +value;
        }
        else if (which === "pts") {
           pts = +value;
        }
        else if (which === "CP") {
          cp = +value;
        }
      }
    }

    var forceList = [];

    var forces = doc.querySelectorAll("roster>forces>force");
    for (force of forces) {
         if (force.hasAttribute("name") && force.hasAttribute("catalogueName")) {
          let which = force.getAttributeNode("name").nodeValue;
          let value = force.getAttributeNode("catalogueName").nodeValue;

          forceList.push({type: which, catalogue: value});

          var rules = force.querySelectorAll("force>rules>rule");
          console.log("Name: " + which + "  Rules: " + rules);
          for (rule of rules) {
            console.log(rule);
          }

          var selections = force.querySelectorAll("force>selections>selection");
          for (selection of selections) {
            console.log(selection);
          }
      }
    }

    console.log(forceList);
  }

  console.log("Points: " + pts + "  Power Level: " + pl + "  CP: " + cp);

}