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

import { AoSUnit, AoSUnitRoleToString, RosterAoS } from "./rosterAoS";
import { Renderer } from "./renderer";

export class RendererAoS implements Renderer {

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

            const headerInfo = [{ name: "NAME", width: '35%'}, {name:"ROLE", width:'15%'}, {name:"SELECTIONS", width:'40%'}, {name:"POINTS", width:'10%'}];
            const table = this.createTable(headerInfo);
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);
            for (let unit of force._units) {
              let tr = document.createElement('tr');
              let uname = document.createElement('td');
              uname.innerHTML = unit._name;
              let role = document.createElement('td');
              role.innerHTML = AoSUnitRoleToString[unit._role];
              let selections = document.createElement('td');
              selections.innerHTML = "";
              let mi = 0;
              for (const selection of unit._selections) {
                    selections.innerHTML += selection + "<br>";
              }

              let pts = document.createElement('td');
              pts.innerHTML = unit._points.toString();
              tr.appendChild(uname);
              tr.appendChild(role);
              tr.appendChild(selections);
              tr.appendChild(pts);
              body.appendChild(tr);    
            }

            let allegianceAbilities = document.createElement('div');
            if (force._allegiance._commandAbilities.size > 0) {
                let allegianceHeader = document.createElement('h3');
                allegianceAbilities.appendChild(allegianceHeader);
                allegianceHeader.textContent = force._allegiance._name + " Allegiance Abilities";
                for (let command of force._allegiance._commandAbilities) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = command[0];
                    let desc = document.createElement('p');
                    desc.textContent = command[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (force._allegiance._battleTraits.size > 0) {
                let traitHeader = document.createElement('h3');
                allegianceAbilities.appendChild(traitHeader);
                traitHeader.textContent = force._allegiance._name + " Allegiance Battle Traits";
                for (let trait of force._allegiance._battleTraits) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = trait[0];
                    let desc = document.createElement('p');
                    desc.textContent = trait[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (force._grandStrategy && force._grandStrategy._name != "") {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Grand Strategy";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = force._grandStrategy._name;
                let desc = document.createElement('p');
                desc.textContent = force._grandStrategy._description;
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            if (force._triumph && force._triumph._name != "") {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Triumph";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = force._triumph._name;
                let desc = document.createElement('p');
                desc.textContent = force._triumph._description;
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            if (force._realmOfBattle) {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Realm of Battle (" + force._realmOfBattle._name + ")";
                
                if (force._realmOfBattle._spells.length > 0) {
                    let title = document.createElement('h4');
                    title.innerHTML = "Realm Spells";
                    allegianceAbilities.append(title);

                    const headerInfo = [{ name: "NAME", width: '25%'}, {name:"CASTING VALUE", width:'15%'}, {name:"RANGE", width:'10%'}, {name:"DESCRIPTION", width:'50%'}];
                    const table = this.createTable(headerInfo);
                    let body = document.createElement('tbody');
                    table.appendChild(body);        
                    for (let spell of force._realmOfBattle._spells) {
                        let tr = document.createElement('tr');
                        let spellName = document.createElement('td');
                        spellName.innerHTML = spell._name;
                        let value = document.createElement('td');
                        value.innerHTML = spell._castingValue.toString();
                        let range = document.createElement('td');
                        range.innerHTML = spell._range.toString();
                        let desc = document.createElement('td');
                        desc.innerHTML = spell._description;
                        tr.appendChild(spellName);
                        tr.appendChild(value);
                        tr.appendChild(range);
                        tr.appendChild(desc);
                        body.appendChild(tr);                       
                    }
                    allegianceAbilities.appendChild(table);
                }

                if (force._realmOfBattle._commandAbilities.size > 0) {
                    let title = document.createElement('h4');
                    title.innerHTML = "Realm Command Abilities";
                    allegianceAbilities.append(title);
                    for (let ability of force._realmOfBattle._commandAbilities) {    
                        let row = document.createElement('div');
                        let desc = document.createElement('p');
                        desc.textContent = ability[0] + ": " + ability[1];
                        row.appendChild(desc);
                        allegianceAbilities.appendChild(row); 
                    }                       
                }
                if (force._realmOfBattle._rules.length > 0) {
                    let title = document.createElement('h4');
                    title.innerHTML = "Realm Special Rules";
                    allegianceAbilities.append(title);
                    for (let rule of force._realmOfBattle._rules) {    
                        let row = document.createElement('div');
                        let desc = document.createElement('p');
                        desc.textContent = rule._name + ": " + rule._description;
                        row.appendChild(desc);
                        allegianceAbilities.appendChild(row); 
                    }                       
                }
            }

            for (let rule of force._rules) {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Rules";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = rule[0];
                let desc = document.createElement('p');
                desc.textContent = rule[1];
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);               
            }

            for (let battalion of force._battalions) {
                let battalionHeader = document.createElement('h3');
                allegianceAbilities.appendChild(battalionHeader);
                battalionHeader.textContent = battalion._name;
                for (let ability of battalion._abilities) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = ability[0];
                    let desc = document.createElement('p');
                    desc.textContent = ability[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (forces)
                forces.appendChild(allegianceAbilities);
            else
                continue;

            let divider = document.createElement('hr');
            divider.className = "aos_dark";
            forces.appendChild(divider);             
 
            let prevUnit: AoSUnit | null = null;
            for (let unit of force._units) {
               forces.appendChild(this.renderUnitHtml(unit));  

               let divider = document.createElement('hr');
               divider.className = "aos_dark";
               forces.appendChild(divider);             
            }    
        }
    }

    protected createTable(heading: {name: string, width: string}[]): HTMLTableElement {
        const table = document.createElement('table');
        table.className = "table aos_table aos_font table-sm";
        const thead = document.createElement('thead');
        table.appendChild(thead);
        thead.classList.add('aos_light');
        const tr = document.createElement('tr');
        thead.appendChild(tr);
        heading.forEach(element => {
            let th = document.createElement('th');
            th.scope = "col";
            th.innerHTML = element.name;
            th.style.width = element.width;
            tr.appendChild(th);
        });

        return table;
    }

    private internalKeyword(keyword: string): boolean {
        // Internal keywords _not_ all upper case.
        const kw_upper = keyword.toUpperCase();
        if (kw_upper != keyword) {
            return true;
        }
        return false;
    }

    protected renderUnitHtml(unit: AoSUnit): HTMLDivElement {

        let unitRoot = document.createElement('div');
        unitRoot.className = "container-fluid aos_unit";
        let unitRow = document.createElement('div');
        unitRow.className = "row";
        unitRoot.append(unitRow);

        let unitStats = document.createElement('div');
        unitStats.className = "col-3";
        if (unit.isNormalUnit()) {
            unitStats.innerHTML = `<div class="aos_unit_stats">
                <div class="aos_unit_move"><p class="h2">${unit._move}</p></div>
                <div class="aos_unit_wounds"><p class="h2">${unit._wounds}</p></div>
                <div class="aos_unit_bravery"><p class="h2">${unit._bravery}</p></div>
                <div class="aos_unit_save"><p class="h2">${unit._save}</p></div>      
                </div>`;
        }
        else {
            unitStats.innerHTML = '<div></div>';
        }
        unitRow.append(unitStats);

        let unitInfo = document.createElement('div');
        unitInfo.className = "col";
        unitInfo.innerHTML = `<div class="p-2 mb-2 aos_medium text-center text-uppercase text-black">
            <span class="h3">${unit._name}</span></div>`;

        let missileWeaponTable = document.createElement('table');
        missileWeaponTable.className = "table table-sm aos_font text-center";
        let thead = document.createElement('thead');
        missileWeaponTable.appendChild(thead);
        missileWeaponTable.innerHTML = 
            `<tr class="aos_light">
                <th>Missile Weapons</th>
                <th>Range</th>
                <th>Attacks</th>
                <th>To Hit</th>
                <th>To Wound</th>
                <th>Rend</th>
                <th>Damage</th>
            </tr>`;
        let missileWeaponBody = document.createElement('tbody');
        missileWeaponTable.appendChild(missileWeaponBody);

        let meleeWeaponTable = document.createElement('table');
        meleeWeaponTable.className = "table table-sm aos_font text-center";
        thead = document.createElement('thead');
        meleeWeaponTable.appendChild(thead);
        meleeWeaponTable.innerHTML = 
            `<tr class="aos_light">
                <th>Melee Weapons</th>
                <th>Range</th>
                <th>Attacks</th>
                <th>To Hit</th>
                <th>To Wound</th>
                <th>Rend</th>
                <th>Damage</th>
            </tr>`;
        let meleeWeaponBody = document.createElement('tbody');
        meleeWeaponTable.appendChild(meleeWeaponBody);

        let haveMissile = false;
        let haveMelee = false;
        for (let weapon of unit._weapons) {
            if (weapon._type === "Missile") {
                let row = document.createElement('tr');
                row.innerHTML = `<td>${weapon._name}</td><td>${weapon._range}</td><td>${weapon._attacks}</td>
                                 <td>${weapon._toHit}</td><td>${weapon._toWound}</td><td>${weapon._rend}</td><td>${weapon._damage}</td>`;
                missileWeaponBody.appendChild(row);  
                haveMissile = true;                               
            }
            else if (weapon._type === "Melee") {
                let row = document.createElement('tr');
                row.innerHTML = `<td>${weapon._name}</td><td>${weapon._range}</td><td>${weapon._attacks}</td>
                                 <td>${weapon._toHit}</td><td>${weapon._toWound}</td><td>${weapon._rend}</td><td>${weapon._damage}</td>`;
                meleeWeaponBody.appendChild(row);
                haveMelee = true;                                 
            }
        }
        if (haveMissile) {
            unitInfo.appendChild(missileWeaponTable);
        }
        if (haveMelee) {
            unitInfo.appendChild(meleeWeaponTable);
        }
        unitRow.append(unitInfo);

        if (unit._abilities.size > 0) {
            let abilities = document.createElement('h4');
            abilities.innerHTML = "ABILITIES";
            unitInfo.appendChild(abilities);
            for (let ability of unit._abilities) {
                let ab = document.createElement('p');
                ab.className = "aos_font";
                ab.innerHTML = `<strong>${ability[0]}:  </strong>${ability[1]}`;
                abilities.appendChild(ab);
            }
        }

        if (unit._commandAbilities.size > 0) {
            let abilities = document.createElement('h4');
            abilities.innerHTML = "COMMAND ABILITIES";
            unitInfo.appendChild(abilities);
            for (let ability of unit._commandAbilities) {
                let ab = document.createElement('p');
                ab.className = "aos_font";
                ab.innerHTML = `<strong>${ability[0]}:  </strong>${ability[1]}`;
                abilities.appendChild(ab);
            }
        }

        if (unit._commandTraits.size > 0) {
            let traits = document.createElement('h4');
            traits.innerHTML = "COMMAND TRAITS";
            unitInfo.appendChild(traits);
            for (let trait of unit._commandTraits) {
                let t = document.createElement('p');
                t.className = "aos_font";
                t.innerHTML = `<strong>${trait[0]}:  </strong>${trait[1]}`;
                traits.appendChild(t);
            }
        }

        if (unit._magic.size > 0) {
            let magic = document.createElement('h4');
            magic.innerHTML = "MAGIC";
            unitInfo.appendChild(magic);
            for (let mg of unit._magic) {
                let a = document.createElement('p');
                a.className = "aos_font";
                a.innerHTML = `<strong>${mg[0]}:  </strong>${mg[1]}`;
                magic.appendChild(a);
            }
        }

        if (unit._spells.length > 0) {
            let spells = document.createElement('h4');
            spells.innerHTML = "SPELLS";
            unitInfo.appendChild(spells);

            const headerInfo = [{ name: "NAME", width: '25%'}, {name:"CASTING VALUE", width:'15%'}, {name:"RANGE", width:'10%'}, {name:"DESCRIPTION", width:'50%'}];
            const table = this.createTable(headerInfo);
            let body = document.createElement('tbody');
            table.appendChild(body);        
            for (let spell of unit._spells) {
                let tr = document.createElement('tr');
                let spellName = document.createElement('td');
                spellName.innerHTML = spell._name;
                let value = document.createElement('td');
                value.innerHTML = spell._castingValue.toString();
                let range = document.createElement('td');
                range.innerHTML = spell._range.toString();
                let desc = document.createElement('td');
                desc.innerHTML = spell._description;
                tr.appendChild(spellName);
                tr.appendChild(value);
                tr.appendChild(range);
                tr.appendChild(desc);
                body.appendChild(tr);                       
            }
            unitInfo.appendChild(table);
        }
        if (unit._prayers.length > 0) {
            let prayers = document.createElement('h4');
            prayers.innerHTML = "PRAYERS";
            unitInfo.appendChild(prayers);
            const headerInfo = [{ name: "NAME", width: '25%'}, {name:"ANSWER VALUE", width:'15%'}, {name:"RANGE", width:'10%'}, {name:"DESCRIPTION", width:'50%'}];
            const table = this.createTable(headerInfo);
            let body = document.createElement('tbody');
            table.appendChild(body);        
            for (let prayer of unit._prayers) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.innerHTML = prayer._name;
                let value = document.createElement('td');
                value.innerHTML = prayer._answerValue.toString();
                let range = document.createElement('td');
                range.innerHTML = prayer._range.toString();
                let desc = document.createElement('td');
                desc.innerHTML = prayer._description;
                tr.appendChild(name);
                tr.appendChild(value);
                tr.appendChild(range);
                tr.appendChild(desc);
                body.appendChild(tr);                       
            }
            unitInfo.appendChild(table);
        }

        if (unit._artefacts.size > 0) {
            let artefacts = document.createElement('h4');
            artefacts.innerHTML = "ARTEFACTS";
            unitInfo.appendChild(artefacts);
            for (let artefact of unit._artefacts) {
                let a = document.createElement('p');
                a.className = "aos_font";
                a.innerHTML = `<strong>${artefact[0]}:  </strong>${artefact[1]}`;
                artefacts.appendChild(a);
            }
        }

        if (unit._woundTracker) {
            let labels = [{ name: "Wounds Suffered", width: '25%'}, {name:"Attribute 1", width:'25%'}, {name:"Attribute 2", width:'25%'}, {name:"Attribute 3", width:'25%'}];

            //console.log("Num Labels: " + unit._woundTracker._labels.length);
            let i = 0;
            for (let key of unit._woundTracker._labels) {
                 labels[i++].name = key;
            }
            
            const table = this.createTable(labels);
            table.className = "table table-sm aos_font text-center";
            unitInfo.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);        

            for (let wt of unit._woundTracker._table) {
                let tr = document.createElement('tr');
                for (let value of wt) {
                    let v = document.createElement('td');
                    v.innerHTML = value;
                    tr.appendChild(v);
                }
                body.appendChild(tr);                                      
            }
        }

        if (unit._keywords.size > 0) {
            let keywords = document.createElement('div');
            keywords.className = "container";
            let row = document.createElement('div');
            row.className = "row";
            keywords.appendChild(row);
            let label = document.createElement('div');
            label.className = "col-3 border aos_dark text-center";
            label.innerHTML = "<strong>KEYWORDS</strong>";
            row.appendChild(label);
            let all_keywords = "";
            for (let kw of unit._keywords) {
                if (!this.internalKeyword(kw)) {
                    all_keywords += kw;
                    all_keywords += ", "; 
                }
            }
            let values = document.createElement('div');
            values.className = "col border text-left text-uppercase";
            values.innerText = all_keywords;
            row.appendChild(values);
            unitInfo.appendChild(keywords);
        }

        return unitRoot;
    }
}
