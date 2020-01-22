function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const files: FileList | null = input.files;

  if (files) {
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (let f of files) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModified ? f.lastModified.toString() : 'n/a',
                '</li>');
      const reader = new FileReader();
      reader.onload = function(e: Event) {
        const re = e.target as FileReader;
        if (re && re.result) {
          //console.log(re.result);
          if (re.result) {
            // Skip encoding tag
            const xmldatastart = re.result.toString().indexOf(',')+1;
            console.log("XML Start: " + xmldatastart);
            const xmldata = re.result.toString().slice(xmldatastart);
            createRoster(xmldata);
          }
        }
      }
    }
    const list: HTMLElement|null = document.getElementById('list');
    if (list) list.innerHTML = '<ul>' + output.join('') + '</ul>';
  }
}

const finput: HTMLElement|null = document.getElementById('input-file');
if (finput) finput.addEventListener('change', handleFileSelect, false);

function createRoster(str: string): void {

}
