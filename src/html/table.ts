
/**
 * @fileoverview Methods for creating HTML tables.
 */

import { addHideAble } from "./hideable"

interface BaseNotes {
  name(): string | null,
  notes(): string | null,
  _customNotes: string,
}

/**
 * Creates a `<tr>` element with the specified elements and column widths.
 * 
 * @param labels array of strings or Elements to be rendered in each
 * @param widths array of what percent width (eg 0.05 for 5%) for columns
 * @param header whether this should be rendered as a header row in a <thead>
 */
export function createTableRow(labels: (string | Element)[], widths: number[], header = false) {
  const row = addHideAble(document.createElement('tr'));
  if (header) row.classList.add('header_row');
  for (let i = 0, colCount = 0; i < labels.length || colCount < 20; i++) {
      const cell = document.createElement(header ? 'th' : 'td');
      cell.scope = 'col';
      if (i < labels.length) {
          let node: Node;
          const label = labels[i];
          if (typeof label === 'string') {
              node = document.createTextNode(label);
          } else {
              node = labels[i] as Element; // TypeScript requires a cast here.
          }
          cell.appendChild(node);

          const width = widths[i] || 0.05;
          cell.style.width = `${width * 100}%`;
          colCount += cell.colSpan = Math.round(width / 0.05);
      } else if (colCount < 20) {
          // cell.style.width = `${(1 - width) * 100}%`;
          cell.colSpan = (20 - colCount);
          colCount = 20;
      } else {
          break;  // Shouldn't happen
      }
      row.appendChild(cell);
  }
  return row;
}

export function createNoteHead(title: string, note: BaseNotes) {
  if (!note.notes()) return null;

  const thead = document.createElement('thead');
  thead.classList.add('info_row');
  thead.appendChild(createTableRow([title, note._customNotes], [0.10, 0.90], /* header= */ false));

  return thead;
}

export function createNotesHead(title: string, notes: BaseNotes[]) {
  if (!notes.some(note => note._customNotes)) return null;

  const thead = document.createElement('thead');
  thead.classList.add('info_row');
  const notesDiv = document.createElement('div');
  for (const note of notes) {
      if (!note.notes()) continue;

      const noteDiv = notesDiv.appendChild(document.createElement('div'));
      noteDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${note.name()}: `));
      noteDiv.appendChild(document.createTextNode(note._customNotes));
  }
  thead.appendChild(createTableRow([title, notesDiv], [0.10, 0.90], /* header= */ false));

  return thead;
}
