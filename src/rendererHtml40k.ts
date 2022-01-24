/*
    Copyright 2021 Rick Weyrauch,

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
import {BaseNotes, Compare, Explosion, Model, PsychicPower, Psyker, Roster40k, Unit, UnitRole, UnitRoleToString, Weapon} from "./roster40k";
import {Justification, Renderer, RenderParagraph, RenderText, RenderTextFull, FixDPI, VertAlign} from "./renderer";

type TableHeaderEntry = {
    name: string;
    width: string;
};

export class RendererHtml40k implements Renderer {

    private _roster: Roster40k|null = null;

    constructor(roster: Roster40k) {
        this._roster = roster;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {
        if (this._roster == null) return;

        if (title) {
            title.innerHTML = '<h3>' + this._roster.name().toUpperCase() + ' (' + this._roster._cost._points + ' pts, ' + this._roster._cost._powerLevel + ' PL, ' + this._roster._cost._commandPoints + ' CP)</h3>';
            let roster = document.createElement('h3');
            roster.textContent = "ROSTER";
            title.appendChild(roster);
        }

        let catalogueRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        let subFactionRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();

        for (let force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (forceTitle) {
                if (force._faction) {
                    forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force.name() + " (" + force._faction + ")" + '</p>';
                }
                else {
                    forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force.name() + '</p>';
                }
            }
            if (list)
                list.appendChild(forceTitle);

            const headerInfo: TableHeaderEntry[] = [{ name: "NAME", width: '20%' }, { name: "ROLE", width: '15%' }, { name: "MODELS", width: '55%' }, { name: "POINTS", width: '5%' }, { name: "POWER", width: '5%' }];
            const table = this.createTable(headerInfo);
            table.className = "table table-sm aos_font";
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);

            for (let unit of force._units) {
                let tr = document.createElement('tr');
                let uname = document.createElement('td');
                uname.innerHTML = `<a class="text-dark" href="#unit_${unit._id}">${unit._name}</a>`;
                let role = document.createElement('td');
                role.innerHTML = UnitRoleToString[unit._role];
                let models = document.createElement('td');
                models.innerHTML = "";
                let mi = 0;
                // TODO: the list of models may not be unique, make the list unique and update counts accordingly.
                for (const model of unit._models) {
                    if (model._count > 1) {
                        models.innerHTML += model._count + "x " + model.nameAndGear();
                    }
                    else {
                        models.innerHTML += model.nameAndGear();
                    }
                    mi++;
                    if (mi != unit._models.length) {
                        models.innerHTML += "<br>"
                    }
                }
                let pts = document.createElement('td');
                pts.innerHTML = unit._cost._points.toString();
                let pwr = document.createElement('td');
                pwr.innerHTML = unit._cost._powerLevel.toString();
                tr.appendChild(uname);
                tr.appendChild(role);
                tr.appendChild(models);
                tr.appendChild(pts);
                tr.appendChild(pwr);
                body.appendChild(tr);
            }

            if (forces) {
                const forceTitle = document.createElement('div');
                forceTitle.style.pageBreakBefore = "always";
                if (forceTitle) {
                    const p = document.createElement("p");
                    p.appendChild(document.createTextNode(force._catalog));
                    if (force._faction) {
                        p.appendChild(document.createTextNode(" (" + force._faction + ")"));
                    }
                    forceTitle.appendChild(p);
                }

                let h3 = document.createElement('h3');
                h3.appendChild(forceTitle)
                forces.appendChild(h3);
            }
            else
                continue;

            let prevUnit: Unit | null = null;
            for (let unit of force._units) {
                if (unit.equal(prevUnit)) {
                    continue;
                }

                forces.appendChild(this.renderUnitHtml(unit));

                let divider = document.createElement('hr');
                divider.className = "aos_dark";
                forces.appendChild(divider);
            }

            if (force._rules.size > 0) {
                let rules = new Map<string, string|null>();
                catalogueRules.set(force._catalog, rules);
                for (let rule of force._rules) {
                    rules.set(rule[0], rule[1]);
                }
            }
            if (force._factionRules.size > 0) {
                let rules = new Map<string, string|null>();
                subFactionRules.set(force._faction, rules);
                for (let rule of force._factionRules) {
                    rules.set(rule[0], rule[1]);
                }
            }
        }

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        this.printRules(subFactionRules, rules);
        if (forces)
            forces.appendChild(rules);
    }

    private getRoleImage(role: UnitRole): string {
        switch (role) {
            case UnitRole.DT: return "DT";
            case UnitRole.HQ: return "HQ";
            case UnitRole.TR: return "TR";
            case UnitRole.EL: return "EL";
            case UnitRole.FA: return "FA";
            case UnitRole.FL: return "FL";
            case UnitRole.HS: return "HS";
            case UnitRole.FT: return "FT";
            case UnitRole.LW: return "LW";
        }
        return "TR";
    }

    protected renderUnitHtml(unit: Unit): HTMLDivElement {
        let unitRoot = document.createElement('div');
        unitRoot.className = "container-fluid aos_unit";

        let header = document.createElement('div');
        header.className = "row";
        unitRoot.appendChild(header);

        let roleImg = document.createElement('div');
        roleImg.className = "col-1";
        roleImg.innerHTML = `<img class="wh40k_light_img" src="./assets/icon_${this.getRoleImage(unit._role)}.png" alt="">`;
        header.appendChild(roleImg);

        let unitName = document.createElement('div');
        unitName.className = "col";
        unitName.innerHTML = `<p><span>${unit._name}</span></p>`;
        header.appendChild(unitName);
        let unitCost = document.createElement('div');
        unitCost.className = "col";
        unitCost.innerHTML = `<p><span>${unit._cost._points}</span> / <span>${unit._cost._powerLevel}</span></p>`;
        header.appendChild(unitCost);

        let weapons: Weapon[] = [];
        let spells: PsychicPower[] = [];
        let explosions: Explosion[] = [];
        let psykers: Psyker[] = [];
        let models: Model[] = [];

        for (var model of unit._models) {
            models.push(model);
            for (let weapon of model._weapons) {
                weapons.push(weapon);
            }
            for (let spell of model._psychicPowers) {
                spells.push(spell);
            }
            for (let expl of model._explosions) {
                explosions.push(expl);
            }
            if (model._psyker) {
                psykers.push(model._psyker);
            }
        }

        // Unique list of models
        const uniqueModels: Model[] = [];
        const scrathModels: Map<string, Model> = new Map();
        for (const m of models) {
            if (!scrathModels.has(m.name())) {
                scrathModels.set(m.name(), m);
                uniqueModels.push(m);
            }
        }

        this.renderNotes(unitRoot, "Unit notes", unit);

        this.renderModels(unitRoot, uniqueModels);

        this.renderNotesArray(unitRoot, "Model notes", models);

        // Unique list of weapons
        const uniqueWeapons: Weapon[] = [];
        const scratchMap: Map<string, Weapon> = new Map();
        for (const w of weapons) {
            if (!scratchMap.has(w.name())) {
                scratchMap.set(w.name(), w);
                uniqueWeapons.push(w);
            }
        }

        if (uniqueWeapons.length > 0) {
             this.renderWeapons(unitRoot, uniqueWeapons);
        }
        this.renderNotesArray(unitRoot, "Weapon notes", weapons);

        if (spells.length > 0) {
            this.renderSpells(unitRoot, spells);
        }
        this.renderNotesArray(unitRoot, "Spell notes", spells);

        if (psykers.length > 0) {
            this.renderPsykers(unitRoot, psykers);
        }

        this.renderNotesArray(unitRoot, "Psyker notes", psykers);

        if (unit._abilities.size > 0 || unit._rules.size > 0) {
            this.renderAbilities(unitRoot, unit);
        }

        if (unit._factions.size > 0) {
            this.renderFactions(unitRoot, unit);
        }

        if (unit._keywords.size > 0) {
            this.renderKeywords(unitRoot, unit);
        }

        if (unit._models.length > 0) {
            this.renderModelList(unitRoot, unit._models);
        }

        if (explosions.length > 0) {
            this.renderExplosion(unitRoot, explosions);
        }

        this.renderNotesArray(unitRoot, "Explosion notes", explosions);

        return unitRoot;
    }

    private printRules(root: Map<string, Map<string, string | null>>, section: HTMLElement | null) {
        if (root.size > 0) {
            for (let [subFaction, rules] of root.entries()) {
                let allegianceRules = document.createElement('div');
                let rulesHeader = document.createElement('h3');
                allegianceRules.appendChild(rulesHeader);
                rulesHeader.textContent = subFaction;

                for (let rule of rules) {
                    let row = document.createElement('div');
                    let name = document.createElement('b');
                    name.textContent = rule[0];
                    let desc = document.createElement('p');
                    desc.setAttribute("style", "white-space: pre-wrap;");
                    desc.appendChild(document.createTextNode(rule[1] || ''));
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceRules.appendChild(row);
                }

                if (section)
                    section.appendChild(allegianceRules);
            }
        }
    }

    protected createTable(heading: {name: string, width: string}[]): HTMLTableElement {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        //thead.classList.add('aos_light');
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

    private renderNotes(root: HTMLElement, title: string,  notes: BaseNotes): void {
    }

    private renderNotesArray(root: HTMLElement, title: string,  notes: BaseNotes[]): void {
    }

    private renderSpells(root: HTMLElement, spells: PsychicPower[]): void {
        const spellLabels = [{name: "PSYCHIC POWER", width: "25%"}, {name: "MANIFEST", width: "5%"}, {name: "RANGE", width: "10%"}, {name: "DETAILS", width: "60%"}];
        const spellTable = this.createTable(spellLabels);
        spellTable.className = "table table-sm aos_table aos_font";
        root.appendChild(spellTable);
        for (let spell of spells) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${spell._name}</td><td>${spell._manifest}</td><td>${spell._range}</td><td>${spell._details}</td>`;
            spellTable.appendChild(row);
        }
    }

    private renderExplosion(root: HTMLElement, explosions: Explosion[]): void {
        const explosionLabels = [{name: "EXPLOSION", width: "20%"}, {name: "DICE ROLL", width: "10%"}, {name: "DISTANCE", width: "10%"}, {name: "MORTAL WOUNDS", width: "10%"}];
        const table = this.createTable(explosionLabels);
        table.className = "table table-sm aos_table aos_font";
        root.appendChild(table);
        for (let explosion of explosions) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${explosion._name}</td><td>${explosion._diceRoll}</td><td>${explosion._distance}</td><td>${explosion._mortalWounds}</td>`;
            table.appendChild(row);
        }
    }

    private renderWeapons(root: HTMLElement, weapons: Weapon[]): void {
        const weaponLabels = [{name: "WEAPON", width: "25%"}, {name: "RANGE", width: "5%"}, {name: "TYPE", width: "10%"}, {name: "S", width: "5%"},
            {name: "AP", width: "5%"}, {name: "D", width: "5%"}, {name: "ABILITIES", width: "45%"}];
        const weaponTable = this.createTable(weaponLabels);
        weaponTable.className = "table table-sm aos_table aos_font";
        root.appendChild(weaponTable);
        for (let weapon of weapons) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${weapon._name}</td><td>${weapon._range}</td><td>${weapon._type}</td><td>${weapon._str}</td>
                         <td>${weapon._ap}</td><td>${weapon._damage}</td><td>${weapon._abilities}</td>`;
            weaponTable.appendChild(row);
        }
    }

    private renderModels(root: HTMLElement, models: Model[]): void {
        const labels: TableHeaderEntry[] = [{name: "No.", width: "3%"}, {name: "Name", width: "22%"}, {name: "M", width: "5%"}, {name: "WS", width: "5%"},
                            {name: "BS", width: "5%"}, {name: "S", width: "5%"}, {name: "T", width: "5%"},
                            {name: "W", width: "5%"}, {name: "A", width: "5%"}, {name: "Ld", width: "5%"},
                            {name: "Sv", width: "5%"}];
        const table = this.createTable(labels);
        table.className = "table table-sm aos_table aos_font";

        root.appendChild(table);
        for (var model of models) {
            let row = document.createElement('tr');
            row.innerHTML = `<td>${model._count}</td><td>${model._name}</td><td>${model._move}</td><td>${model._ws}</td>
                             <td>${model._bs}</td><td>${model._str}</td><td>${model._toughness}</td>
                             <td>${model._wounds}</td><td>${model._attacks}</td><td>${model._leadership}</td><td>${model._save}</td>`;
            table.appendChild(row);
        }
    }

    private renderModelList(root: HTMLElement, models: Model[]): void {
    }

    private renderAbilities(root: HTMLElement, unit: Unit): void {
        if (unit._abilities.size > 0) {
            this.renderAbilityMap(root, "ABILITIES", unit._abilities);
        }
        if (unit._rules.size > 0) {
            this.renderAbilityMap(root, "RULES", unit._rules);
        }
    }

    private renderKeywords(root: HTMLElement, unit: Unit): void {
        if (unit._keywords.size > 0) {
            const kwlist = [...unit._keywords];
            kwlist.sort(Compare)
            const kw = kwlist.join(", ").toLocaleUpperCase();

            let values = document.createElement('div');
            values.className = "text-left text-uppercase";
            values.innerText = "KEYWORDS: " + kw;
            root.appendChild(values);
        }
    }

    private renderFactions(root: HTMLElement, unit: Unit): void {
        if (unit._factions.size > 0) {
            const kwlist = [...unit._factions];
            kwlist.sort(Compare)
            const kw = kwlist.join(", ").toLocaleUpperCase();

            let values = document.createElement('div');
            values.className = "text-left text-uppercase";
            values.innerText = "FACTION KEYWORDS: " + kw;
            root.appendChild(values);
        }
    }

    private renderPsykers(root: HTMLElement, psykers: Psyker[]): void {
    }

    private renderAbilityMap(root: HTMLElement, title: string, abilities: Map<string, string>): void {
        let header = document.createElement('h4');
        header.innerHTML = title;
        root.appendChild(header);
        for (let ability of abilities) {
            let a = document.createElement('p');
            a.className = "aos_font";
            a.innerHTML = `<strong>${ability[0]}:  </strong>${ability[1]}`;
            header.appendChild(a);
        }
    }
}
