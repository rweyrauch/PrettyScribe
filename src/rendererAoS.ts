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

import { AoSSpell, AoSUnit, AoSUnitRoleToString, RosterAoS } from "./rosterAoS";
import { Renderer } from "./renderer";

type TableHeaderEntry = {
    name: string;
    width: string;
};

export class RendererAoS implements Renderer {

    private _roster: RosterAoS | null = null;

    constructor(roster: RosterAoS) {
        this._roster = roster;
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {
        if (this._roster == null) {
            return;
        }

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name.toUpperCase() + ' (' + this._roster._points + ' pts, ' + this._roster._commandPoints + ' CP)</h3>';
            let roster = document.createElement('h3');
            roster.textContent = "ROSTER";
            title.appendChild(roster);
        }

        for (let force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (forceTitle) {
                forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force._name + '</p>';
            }
            if (list)
                list.appendChild(forceTitle);

            const headerInfo = [{ name: "NAME", width: '35%' }, { name: "ROLE", width: '15%' }, { name: "SELECTIONS", width: '40%' }, { name: "POINTS", width: '10%' }];
            const table = this.createTable(headerInfo);
            table.classList.add("table", "table-sm", "aos_font");
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);

            for (let unit of force._units) {
                let tr = document.createElement('tr');
                let uname = document.createElement('td');
                uname.innerHTML = `<a class="text-dark" href="#unit_${unit._id}">${unit._name}</a>`;
                let role = document.createElement('td');
                role.innerHTML = AoSUnitRoleToString[unit._role];
                let selections = document.createElement('td');
                selections.innerHTML = "";
                let mi = 0;
                for (const selection of unit._selections) {
                    selections.innerHTML += selection + "<br>";
                }

                let pts = document.createElement('td');
                pts.textContent = unit._points.toString();
                tr.appendChild(uname);
                tr.appendChild(role);
                tr.appendChild(selections);
                tr.appendChild(pts);
                body.appendChild(tr);
            }

            let allegianceAbilities = document.createElement('div');
            let allegianceHeader = document.createElement('h3');
            allegianceHeader.textContent = force._allegiance._name.toUpperCase();
            allegianceAbilities.appendChild(allegianceHeader);

            if (force._allegiance._commandAbilities.size > 0) {
                this.renderAbilityMap(allegianceAbilities, "ABILITIES", force._allegiance._commandAbilities);
            }

            if (force._allegiance._battleTraits.size > 0) {
                this.renderAbilityMap(allegianceAbilities, "BATTLE TRAITS", force._allegiance._battleTraits);
            }

            if (force._allegiance._spells.length > 0) {
                let title = document.createElement('h4');
                title.textContent = "ALLEGIANCE SPELLS";
                allegianceAbilities.append(title);
                this.renderSpells(allegianceAbilities, force._allegiance._spells);
            }

            if (force._allegiance._extraProfiles.length > 0) {
                let prevProfName = "";
                for (let profile of force._allegiance._extraProfiles) {
                    if (profile._value._fields.size == 1) {
                        if (prevProfName != profile._value._typeName) {
                            let profHeader = document.createElement('h4');
                            allegianceAbilities.appendChild(profHeader);
                            profHeader.textContent = profile._value._typeName.toUpperCase();
                            prevProfName = profile._value._typeName;
                        }
                        const values = profile._value._fields.values();

                        let p = document.createElement('p');
                        p.classList.add("aos_font");
                        p.innerHTML = `<strong>${profile._name}:  </strong>${values.next().value}`;
                        allegianceAbilities.appendChild(p);
                    }
                    else {
                        console.log("Table profiles not implemented. " + profile._value._typeName);
                    }
                }
            }

            if (force._grandStrategy && force._grandStrategy._name != "") {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "GRAND STRATEGY";
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
                header.textContent = "TRIUMPH";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = force._triumph._name;
                let desc = document.createElement('p');
                desc.textContent = force._triumph._description;
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            if (force._realmOfBattle && force._realmOfBattle._name.length > 0) {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "REALM OF BATTLE (" + force._realmOfBattle._name + ")";

                if (force._realmOfBattle._spells.length > 0) {
                    let title = document.createElement('h4');
                    title.textContent = "SPELLS";
                    allegianceAbilities.append(title);
                    this.renderSpells(allegianceAbilities, force._realmOfBattle._spells);
                }

                if (force._realmOfBattle._commandAbilities.size > 0) {
                    this.renderAbilityMap(allegianceAbilities, "COMMAND ABILITIES", force._realmOfBattle._commandAbilities);
                }
                if (force._realmOfBattle._rules.length > 0) {
                    let title = document.createElement('h4');
                    title.textContent = "SPECIAL RULES";
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
                header.textContent = "RULES";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = rule[0];
                let desc = document.createElement('p');
                desc.textContent = rule[1];
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            if (force._battleTactics.size > 0) {
                let header = document.createElement('h3');
                header.textContent = "BATTLE TACTICS";
                allegianceAbilities.appendChild(header);

                const headerInfo = [{ name: "NAME", width: '20%' }, { name: "DESCRIPTION", width: '80%' }];
                const table = this.createTable(headerInfo);
                table.classList.add("table", "table-sm", "aos_table", "aos_font");
                let body = document.createElement('tbody');
                table.appendChild(body);
                for (let tactic of force._battleTactics) {
                    let tr = document.createElement('tr');
                    let tacticName = document.createElement('td');
                    tacticName.textContent = tactic[0];
                    let desc = document.createElement('td');
                    desc.textContent = tactic[1];
                    tr.appendChild(tacticName);
                    tr.appendChild(desc);
                    body.appendChild(tr);
                }
                allegianceAbilities.appendChild(table);
            }

            for (let battalion of force._battalions) {
                let battalionHeader = document.createElement('h3');
                allegianceAbilities.appendChild(battalionHeader);
                battalionHeader.textContent = battalion._name.toUpperCase();
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
            divider.classList.add("aos_dark");
            forces.appendChild(divider);

            for (let unit of force._units) {
                forces.appendChild(this.renderUnitHtml(unit));

                let divider = document.createElement('hr');
                divider.classList.add("aos_dark");
                forces.appendChild(divider);
            }
        }
    }

    protected createTable(heading: { name: string, width: string }[]): HTMLTableElement {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        thead.classList.add('aos_light');
        const tr = document.createElement('tr');
        thead.appendChild(tr);
        heading.forEach(element => {
            let th = document.createElement('th');
            th.scope = "col";
            th.textContent = element.name;
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
        unitRoot.classList.add("container-fluid", "aos_unit");

        let unitName = document.createElement('div');
        unitName.classList.add("p-2", "mb-2", "aos_medium", "text-center", "text-uppercase", "text-black");
        unitName.innerHTML = `<span class="h3"><a name="unit_${unit._id}">${unit._name}</a></span>`;
        unitRoot.append(unitName);

        let unitRow = document.createElement('div');
        unitRow.classList.add("row");
        unitRoot.append(unitRow);

        if (unit.isNormalUnit()) {
            let unitStats = document.createElement('div');
            unitStats.classList.add("col-6", "col-sm-3");
            unitStats.innerHTML = `<div class="aos_unit_stats">
                <div class="aos_unit_move"><p class="h2">${unit._move}</p></div>
                <div class="aos_unit_wounds"><p class="h2">${unit._wounds}</p></div>
                <div class="aos_unit_bravery"><p class="h2">${unit._bravery}</p></div>
                <div class="aos_unit_save"><p class="h2">${unit._save}</p></div>      
                </div>`;
            unitRow.append(unitStats);
        }

        let unitInfo = document.createElement('div');
        unitInfo.classList.add("col");
        unitRow.appendChild(unitInfo);

        let missileWeaponTable = document.createElement('table');
        missileWeaponTable.classList.add("table", "table-sm", "aos_table", "aos_font", "text-center");
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
        meleeWeaponTable.classList.add("table", "table-sm", "aos_table", "aos_font", "text-center");
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

        if (unit._woundTracker && unit._woundTracker._labels.length > 0) {
            let labels: TableHeaderEntry[] = [];

            const columnWidth: string = ((1 / unit._woundTracker._labels.length) * 100).toString() + '%';
            for (let key of unit._woundTracker._labels) {
                labels.push({ name: key, width: columnWidth });
            }

            const table = this.createTable(labels);
            table.classList.add("table", "table-sm", "aos_table", "aos_font", "text-center");
            unitInfo.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);

            for (let wt of unit._woundTracker._table) {
                let tr = document.createElement('tr');
                for (let value of wt) {
                    let v = document.createElement('td');
                    v.textContent = value;
                    tr.appendChild(v);
                }
                body.appendChild(tr);
            }
        }

        if (unit._abilities.size > 0) {
            this.renderAbilityMap(unitInfo, "ABILITIES", unit._abilities);
        }

        if (unit._commandAbilities.size > 0) {
            this.renderAbilityMap(unitInfo, "COMMAND ABILITIES", unit._commandAbilities);
        }

        if (unit._commandTraits.size > 0) {
            this.renderAbilityMap(unitInfo, "COMMAND TRAITS", unit._commandTraits);
        }

        if (unit._magic.size > 0) {
            this.renderAbilityMap(unitInfo, "MAGIC", unit._magic);
        }

        if (unit._spells.length > 0) {
            let spells = document.createElement('h4');
            spells.textContent = "SPELLS";
            unitInfo.appendChild(spells);
            this.renderSpells(unitInfo, unit._spells);
        }

        if (unit._prayers.length > 0) {
            let prayers = document.createElement('h4');
            prayers.textContent = "PRAYERS";
            unitInfo.appendChild(prayers);
            const headerInfo = [{ name: "NAME", width: '20%' }, { name: "ANSWER VALUE", width: '10%' }, { name: "RANGE", width: '10%' }, { name: "DESCRIPTION", width: '60%' }];
            const table = this.createTable(headerInfo);
            table.classList.add("table", "table-sm", "aos_table", "aos_font");
            let body = document.createElement('tbody');
            table.appendChild(body);
            for (let prayer of unit._prayers) {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                name.textContent = prayer._name;
                let value = document.createElement('td');
                value.textContent = prayer._answerValue.toString();
                let range = document.createElement('td');
                range.textContent = prayer._range.toString();
                let desc = document.createElement('td');
                desc.textContent = prayer._description;
                tr.appendChild(name);
                tr.appendChild(value);
                tr.appendChild(range);
                tr.appendChild(desc);
                body.appendChild(tr);
            }
            unitInfo.appendChild(table);
        }

        if (unit._artefacts.size > 0) {
            this.renderAbilityMap(unitInfo, "ARTEFACTS", unit._artefacts);
        }

        let prevProfName = "";
        for (let profile of unit._extraProfiles) {
            if (profile._value._fields.size == 1) {
                if (prevProfName != profile._value._typeName) {
                    let profHeader = document.createElement('h4');
                    unitInfo.appendChild(profHeader);
                    profHeader.textContent = profile._value._typeName.toUpperCase();
                    prevProfName = profile._value._typeName;
                }

                const values = profile._value._fields.values();

                let p = document.createElement('p');
                p.classList.add("aos_font");
                p.innerHTML = `<strong>${profile._name}:  </strong>${values.next().value}`;
                unitInfo.appendChild(p);
            }
            else {
                console.log("Table profiles not implemented. " + profile._value._typeName);
            }
        }

        if (unit._keywords.size > 0) {
            let keywords = document.createElement('div');
            keywords.classList.add("container-fluid");
            let row = document.createElement('div');
            row.classList.add("row");
            keywords.appendChild(row);
            let label = document.createElement('div');
            label.classList.add("col-5", "border", "aos_dark", "text-center");
            label.innerHTML = "<strong>KEYWORDS</strong>";
            row.appendChild(label);
            let previous_separator = "";
            let all_keywords = "";
            for (let kw of unit._keywords) {
                if (!this.internalKeyword(kw)) {
                    all_keywords += previous_separator;
                    all_keywords += kw;
                    previous_separator = ", ";
                }
            }
            let values = document.createElement('div');
            values.classList.add("col", "border", "text-left", "text-uppercase");
            values.innerText = all_keywords;
            row.appendChild(values);
            unitRoot.appendChild(keywords);
        }

        return unitRoot;
    }

    private renderAbilityMap(root: HTMLElement, title: string, abilities: Map<string, string>): void {
        let header = document.createElement('h4');
        header.textContent = title;
        root.appendChild(header);
        for (let ability of abilities) {
            let a = document.createElement('p');
            a.classList.add("aos_font");
            a.innerHTML = `<strong>${ability[0]}:  </strong>${ability[1]}`;
            header.appendChild(a);
        }
    }

    private renderSpells(root: HTMLElement, spells: AoSSpell[]): void {
        const headerInfo = [{ name: "NAME", width: '25%' }, { name: "CASTING VALUE", width: '15%' }, { name: "RANGE", width: '10%' }, { name: "DESCRIPTION", width: '50%' }];
        const table = this.createTable(headerInfo);
        table.classList.add("table", "table-sm", "aos_font");
        let body = document.createElement('tbody');
        table.appendChild(body);
        for (let spell of spells) {
            let tr = document.createElement('tr');
            let spellName = document.createElement('td');
            spellName.textContent = spell._name;
            let value = document.createElement('td');
            value.textContent = spell._castingValue.toString();
            let range = document.createElement('td');
            range.textContent = spell._range.toString();
            let desc = document.createElement('td');
            desc.textContent = spell._description;
            tr.appendChild(spellName);
            tr.appendChild(value);
            tr.appendChild(range);
            tr.appendChild(desc);
            body.appendChild(tr);
        }
        root.appendChild(table);
    }
}
