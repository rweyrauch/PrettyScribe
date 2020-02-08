import { AoSUnit, AoSUnitRole, AoSUnitRoleToString, AoSWeapon, RosterAoS } from "./rosterAoS.js";
import { Renderer, Justification, RenderText, RenderParagraph} from "./renderer.js";

export class RendererAoS implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private _roster: RosterAoS|null = null;

    constructor(roster: RosterAoS) {
        this._roster = roster;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {
        if (this._roster == null) {
            return;
        }

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts, ' + this._roster._commandPoints + ' CP)</h3>';
        }

        for (let force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (forceTitle) {
              forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force._name + '</p>';
            }
            if (list)
                list.appendChild(forceTitle);

            const table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-sm');
            table.classList.add('table-striped');
            const thead = document.createElement('thead');
            table.appendChild(thead);
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            thead.appendChild(tr);
            const headerInfo = [{ name: "NAME", w: '35%'}, {name:"ROLE", w:'25%'}, {name:"MODELS", w:'25%'}, {name:"POINTS", w:'15%'}];
            headerInfo.forEach(element => {
              let th = document.createElement('th');
              th.scope = "col";
              th.innerHTML = element.name;
              th.style.width = element.w;
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
              role.innerHTML = AoSUnitRoleToString[unit._role];
              let models = document.createElement('td');
              models.innerHTML = "";
              let pts = document.createElement('td');
              pts.innerHTML = unit._points.toString();
              tr.appendChild(uname);
              tr.appendChild(role);
              tr.appendChild(models);
              tr.appendChild(pts);
              body.appendChild(tr);    
            }
        }

    }

}
