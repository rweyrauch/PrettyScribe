/*
    Copyright 2023 Rick Weyrauch,

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

import { HorusHeresy } from "./rosterHH2";
import { Renderer } from "./renderer";
import { first } from "lodash";
import { type } from "jquery";

export class RendererHH2 implements Renderer {

    private readonly _roster: HorusHeresy.Roster | null = null;

    private _roles: Map<HorusHeresy.UnitRole, HTMLImageElement | null> = new Map();

    constructor(roster: HorusHeresy.Roster) {

        this._roster = roster;

        this._roles.set(HorusHeresy.UnitRole.HQ, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.TR, document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.EL, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.FA, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.HS, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.FL, document.getElementById('role_fl') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.DT, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.FT, document.getElementById('role_ft') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.LW, document.getElementById('role_lw') as HTMLImageElement);
        this._roles.set(HorusHeresy.UnitRole.PR, document.getElementById('role_lw') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) return;

        if (title) {
            this.renderOptionsDiv(title);

            title.appendChild(document.createElement('h2')).appendChild(document.createTextNode('...Prerelease - not ready for primetime...'));

            const costs = [`${this._roster._cost._points} pts`];
            const text = `${this._roster._name} (${costs.join(', ')})`;
            title.appendChild(document.createElement('h3')).appendChild(document.createTextNode(text));

            // Footer div is hideEnabled, except when printing.
            const footer = title.appendChild(document.createElement('div'));
            footer.classList.add('footer');
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode('PrettyScribe'));
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode(text));
        }

        if (list) {
            this.renderRosterSummary(list);
        }

        if (forces) {
            this.renderRosterDetails(forces);
        }

        this.loadOptionsFromLocalStorage();
    }

    private renderRosterSummary(list: HTMLElement) {
        if (!this._roster) return;

        for (const force of this._roster._forces) {

            const forceTitle = document.createElement('div');
            if (force._faction) {
                forceTitle.appendChild(document.createTextNode(`${force._catalog} ${force._name} (${force._faction})`));
            } else {
                forceTitle.appendChild(document.createTextNode(`${force._catalog} ${force._name}`));
            }
            list.appendChild(forceTitle);

            const table = document.createElement('table');
            table.classList.add('table', 'table-sm', 'table-striped');
            const thead = document.createElement('thead');
            table.appendChild(thead);
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            thead.appendChild(tr);
            const headerInfo = [{ name: "NAME", w: '20%' }, { name: "ROLE", w: '15%' }, { name: "MODELS", w: '55%' }, { name: "POINTS", w: '5%' }];
            headerInfo.forEach(element => {
                let th = document.createElement('th');
                th.scope = "col";
                th.appendChild(document.createTextNode(element.name));
                th.style.width = element.w;
                tr.appendChild(th);
            });
            forceTitle.appendChild(table);

            let body = document.createElement('tbody');
            table.appendChild(body);
            for (let unit of force._units) {
                const tr = document.createElement('tr');
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._name));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(HorusHeresy.UnitRoleToString[unit._role]));
                const models = tr.appendChild(document.createElement('td'));
                this.renderModelList(models, unit);
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._points.toString()));
                body.appendChild(tr);
            }
        }
    }

    private renderOptionsDiv(title: HTMLElement) {
        const optionsDiv = title.appendChild(document.createElement('div'));
        optionsDiv.classList.add('wh40k_options_div', 'd-print-none');
        optionsDiv.id = 'wh40k_options_div';

        // A toggle to hide or show options, since there are several.
        const optionsToggleSpan = optionsDiv.appendChild(document.createElement('span'));
        optionsToggleSpan.classList.add('wh40k_options_toggle');
        optionsToggleSpan.id = 'wh40k_options_toggle';
        const optionsToggleExpandedText = '[\u2212] Options:';
        const optionsToggleCollapsedText = '[+] Options';
        optionsToggleSpan.appendChild(document.createTextNode(optionsToggleExpandedText));
        optionsToggleSpan.addEventListener('click', (e: Event) => {
            const optionsDiv = document.getElementById('wh40k_options_div');
            const optionsToggle = document.getElementById('wh40k_options_toggle');
            if (!optionsDiv || !optionsToggle) return;

            if (optionsDiv.classList.contains('hide_options')) {
                optionsDiv.classList.remove('hide_options');
                optionsToggle.innerText = optionsToggleExpandedText;
                this.saveOptionToLocalStorage('option-toggle-hidden', 'false');
            } else {
                optionsDiv.classList.add('hide_options');
                optionsToggle.innerText = optionsToggleCollapsedText;
                this.saveOptionToLocalStorage('option-toggle-hidden', 'true');
            }
        });

        this.renderCheckboxOption(optionsDiv, 'showUpgradeCosts', 'Show upgrade costs',
            (e: Event) => {
                const costSpans = document.getElementsByClassName('wh40k_upgrade_cost');
                for (const span of costSpans) {
                    if ((e.target as HTMLInputElement).checked) {
                        span.classList.remove('d-none')
                    } else {
                        span.classList.add('d-none')
                    }
                }
            });
        this.renderCheckboxOption(optionsDiv, 'collateDatasheets', 'Collate Detachment Datasheets',
            (e: Event) => {
                const collatedSheets = document.getElementById('collated_sheets');
                const detachmentSheets = document.getElementById('detachment_sheets');
                if (!collatedSheets || !detachmentSheets) return;

                if ((e.target as HTMLInputElement).checked) {
                    collatedSheets.classList.remove('d-none')
                    detachmentSheets.classList.add('d-none')
                } else {
                    collatedSheets.classList.add('d-none')
                    detachmentSheets.classList.remove('d-none')
                }
            });

        // Options related to printing are grouped together
        const printOptionsDiv = optionsDiv.appendChild(document.createElement('span'));
        printOptionsDiv.classList.add('wh40k_options_print_subsection');
        printOptionsDiv.appendChild(document.createTextNode('Print:'));
        this.renderCheckboxOption(printOptionsDiv, 'printBigger', 'Larger Text',
            (e: Event) => {
                const unitSheetDiv = document.getElementsByClassName('wh40k_unit_sheet');
                for (const div of unitSheetDiv) {
                    if ((e.target as HTMLInputElement).checked) {
                        div.classList.add('bigger')
                    } else {
                        div.classList.remove('bigger')
                    }
                }
            });

        // ability to hide divs (abilities, rules, ...) from printing
        this.renderCheckboxOption(printOptionsDiv, 'hideElements', 'Hide Elements',
            (e: Event) => {
                const body = document.body;
                if ((e.target as HTMLInputElement).checked) {
                    body.classList.add('hide_enabled')
                    body.addEventListener('click', toggleHidden)
                } else {
                    body.classList.remove('hide_enabled')
                    body.removeEventListener('click', toggleHidden)
                }
            });
        this.renderCheckboxOption(printOptionsDiv, 'datasheetPageBreaks', 'One Datasheet per Page',
            (e: Event) => {
                const unitSheetDiv = document.getElementsByClassName('wh40k_unit_sheet');
                for (const div of unitSheetDiv) {
                    if ((e.target as HTMLInputElement).checked) {
                        div.classList.add('page_break')
                    } else {
                        div.classList.remove('page_break')
                    }
                }
            });
    }

    private renderCheckboxOption(optionsDiv: HTMLElement, idAndName: string, text: string, eventHandler: EventListenerOrEventListenerObject) {
        const optDiv = optionsDiv.appendChild(document.createElement('div'));
        optDiv.classList.add('wh40k_option');
        const input = optDiv.appendChild(document.createElement('input'));
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', idAndName);
        input.setAttribute('id', idAndName);
        input.addEventListener('input', eventHandler);
        input.addEventListener('change', e => this.saveCheckboxToLocalStorage(idAndName));
        const label = optDiv.appendChild(document.createElement('label'));
        label.setAttribute('for', idAndName);
        label.appendChild(document.createTextNode(` ${text}`));
    }

    private saveCheckboxToLocalStorage(idAndName: string) {
        const el = document.getElementById(idAndName) as HTMLInputElement;
        if (!el) return;
        this.saveOptionToLocalStorage(`option-checkbox-${idAndName}`, el.checked);
    }

    private saveOptionToLocalStorage(key: string, value: any) {
        try {
            window.localStorage[key] = value;
        } catch (e) {
            // localStorage not supported or enabled
        }
    }

    private loadOptionsFromLocalStorage() {
        try {
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                const checkboxId = key?.match(/option-checkbox-(.*)/)?.[1];
                if (checkboxId) {
                    const option = document.getElementById(checkboxId) as HTMLInputElement;
                    if (!option) continue;

                    option.checked = window.localStorage[key] === 'true';
                    option.dispatchEvent(new Event('input'));
                } else if (key === 'option-toggle-hidden') {
                    const optionsDiv = document.getElementById('wh40k_options_div');
                    const optionsToggle = document.getElementById('wh40k_options_toggle');
                    if (!optionsDiv || !optionsToggle) return;

                    const hideOptions = !!window.localStorage[key];

                    if (optionsDiv.classList.contains('hide_options') !== hideOptions) {
                        optionsToggle.dispatchEvent(new Event('click'));
                    }
                }
            }
        } catch (e) {
            // localStorage not supported or enabled
        }
    }

    private renderRosterDetails(forces: HTMLElement) {
        if (!this._roster) return;

        const catalogueRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        const subFactionRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        const detachmentSheets = forces.appendChild(document.createElement('div'));
        detachmentSheets.id = 'detachment_sheets';
        const collatedSheets = forces.appendChild(document.createElement('div'));
        collatedSheets.id = 'collated_sheets';
        collatedSheets.style.pageBreakBefore = "always";
        collatedSheets.classList.add('d-none');
        const collatedUnits: HorusHeresy.Unit[] = [];

        for (const force of this._roster._forces) {
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
            detachmentSheets.appendChild(h3);

            this.renderDatasheets(detachmentSheets, force._units);

            collatedUnits.push(...force._units);

            mergeRules(catalogueRules, force._catalog, force._rules);
        }

        collatedUnits.sort((lhs: HorusHeresy.Unit, rhs: HorusHeresy.Unit) => {
            if (lhs._role != rhs._role) return lhs._role - rhs._role;
            if (lhs._name != rhs._name) return HorusHeresy.Compare(lhs._name, rhs._name);
            return lhs._points - rhs._points;  // Simple heuristic, could do better.
        });
        this.renderDatasheets(collatedSheets, collatedUnits);

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        this.printRules(subFactionRules, rules);
        forces.appendChild(rules);
    }

    private renderDatasheets(forces: HTMLElement, units: HorusHeresy.Unit[]) {
        let numIdenticalUnits = 0;
        for (let i = 0; i < units.length; i++) {
            numIdenticalUnits++;
            const unit = units[i];
            const nextUnit = units[i + 1];
            if (unit.equal(nextUnit)) continue;

            this.renderUnitHtml(forces, unit, numIdenticalUnits);
            numIdenticalUnits = 0
        }
    }

    private renderUnitHtml(forces: HTMLElement, unit: HorusHeresy.Unit, unitCount: number) {
        const statsDiv = forces.appendChild(document.createElement('div'));
        statsDiv.classList.add('wh40k_unit_sheet');
        const statsTable = document.createElement('table');
        statsTable.classList.add('table', 'table-sm', 'table-striped');
        statsDiv.appendChild(statsTable);

        // unit header
        let thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('table-dark', 'unit_header');
        const unitCostDiv = document.createElement('div');
        unitCostDiv.classList.add('unit_costs');
        const roleImg = this._roles.get(unit._role);
        unitCostDiv.appendChild(document.createElement('span')).appendChild(roleImg?.cloneNode() || document.createTextNode('-'));
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._points.toString()));

        let cpCostDiv: Element | string = '';
        thead.appendChild(createTableRow([unitCostDiv, unit._name + (unitCount > 1 ? ` (${unitCount})` : ''), cpCostDiv], [0.1, 0.8, 0.1]));

        // Add an invisible row of 20, 5% columns. This ensures correct
        // spacing for the first few columns of visible rows.
        const spacerTr = thead.appendChild(document.createElement('tr'));
        for (let i = 0; i < 20; i++) {
            const td = spacerTr.appendChild(document.createElement('td'));
            td.colSpan = 1;
            td.style.width = '5%';
            td.style.padding = '0';
        }

        let notesTableHead = createNoteHead('Unit notes', unit);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // models
        if (unit._modelStats.length > 0) {

            const modelsByType = bucketSortModels(unit._modelStats);

            const models = modelsByType.get("Models");
            if (models != null && models.length > 0) {
                thead = statsTable.appendChild(document.createElement('thead'));
                thead.classList.add('table-active');        
                thead.appendChild(createTableRow(RendererHH2._infantryLabels, this._infantryLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of models) {
                    let infantry = model as HorusHeresy.Model;
                    tbody.append(createTableRow([
                        infantry._name,
                        infantry._type,
                        infantry._move.toString(),
                        infantry._ws.toString(),
                        infantry._bs.toString(),
                        infantry._str.toString(),
                        infantry._toughness.toString(),
                        infantry._wounds.toString(),
                        infantry._initiative.toString(),
                        infantry._attacks.toString(),
                        infantry._leadership.toString(),
                        infantry._save,
                    ], this._infantryLabelWidthsNormalized));
                }
            }
            const vehicles = modelsByType.get("Vehicles");
            if (vehicles != null && vehicles.length > 0) {
                thead = statsTable.appendChild(document.createElement('thead'));
                thead.classList.add('table-active');        
                thead.appendChild(createTableRow(RendererHH2._vehicleLabels, this._vehicleLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of vehicles) {
                    let vehicle = model as HorusHeresy.Vehicle;
                    tbody.append(createTableRow([
                        vehicle._name,
                        vehicle._type,
                        vehicle._move.toString(),
                        vehicle._bs.toString(),
                        vehicle._front.toString(),
                        vehicle._side.toString(),
                        vehicle._rear.toString(),
                        vehicle._hp.toString(),
                        vehicle._capacity.toString(),
                    ], this._vehicleLabelWidthsNormalized));

                }
            }

            const knights = modelsByType.get("Knights");
            if (knights != null && knights.length > 0) {
                thead = statsTable.appendChild(document.createElement('thead'));
                thead.classList.add('table-active');        
                thead.appendChild(createTableRow(RendererHH2._knightLabels, this._knightLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of knights) {
                    let knight = model as HorusHeresy.Knight;
                    tbody.append(createTableRow([
                        knight._name,
                        knight._type,
                        knight._move.toString(),
                        knight._ws.toString(),
                        knight._bs.toString(),
                        knight._str.toString(),
                        knight._front.toString(),
                        knight._side.toString(),
                        knight._rear.toString(),
                        knight._hp.toString(),
                        knight._initiative.toString(),
                        knight._attacks.toString(),
                        knight._hp.toString(),
                    ], this._knightLabelWidthsNormalized));
                }
            }

            const forts = modelsByType.get("Fortifications");
            if (forts != null && forts.length > 0) {
                thead = statsTable.appendChild(document.createElement('thead'));
                thead.classList.add('table-active');        
                thead.appendChild(createTableRow(RendererHH2._fortificationLabels, this._fortificationLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of forts) {
                    let fort = model as HorusHeresy.Fortification;
                    tbody.append(createTableRow([
                        fort._name,
                        fort._type,
                        fort._bs.toString(),
                        fort._front.toString(),
                        fort._side.toString(),
                        fort._rear.toString(),
                        fort._hp.toString(),
                        fort._capacity.toString(),
                    ], this._fortificationLabelWidthsNormalized));
                }
            }
        }

        notesTableHead = createNotesHead('Model notes', unit._models);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // weapons
        const unitWeapons = unit.weapons();
        if (unitWeapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererHH2._weaponLabels, this._weaponLabelWidthNormalized, /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const weapon of unitWeapons) {
                // parse weapon._type into type and special rules links.
                let rules = weapon._type.split(',');
                let weaponType = rules[0].trim();
                let weaponRules = document.createElement('div');
                rules.forEach((rule, index) => {
                    let text = rule.trim();
                    if (index > 1) {
                        weaponRules.appendChild(document.createTextNode(", "));
                    }
                    if (index != 0) {
                        let anchor = document.createElement('a');
                        anchor.href = "#" + text;
                        anchor.text = text;
                        weaponRules.appendChild(anchor);
                    }
                });

                tbody.append(createTableRow([
                    weapon.name().toString(),
                    weapon._range,
                    weapon._str.toString(),
                    weapon._ap,
                    weaponType,
                    weaponRules], this._weaponLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Weapon notes', unitWeapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead)

        // weapons
        const psychicWeapons = unit.psychicWeapons();;
        if (psychicWeapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererHH2._psychicWeaponLabels, this._psychicWeaponLabelWidthNormalized, /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const weapon of psychicWeapons) {
                // parse weapon._type into type and special rules links.
                let rules = weapon._type.split(',');
                let weaponType = rules[0].trim();
                let weaponRules = document.createElement('div');
                rules.forEach((rule, index) => {
                    let text = rule.trim();
                    if (index > 1) {
                        weaponRules.appendChild(document.createTextNode(", "));
                    }
                    if (index != 0) {
                        let anchor = document.createElement('a');
                        anchor.href = "#" + text;
                        anchor.text = text;
                        weaponRules.appendChild(anchor);
                    }
                });

                tbody.append(createTableRow([
                    weapon.name().toString(),
                    weapon._range,
                    weapon._str.toString(),
                    weapon._ap,
                    weaponType,
                    weaponRules], this._psychicWeaponLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Psychic Weapon notes', psychicWeapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead)
        
        // unit rules; rules are shared across units, with their
        // descriptions printed in bulk later
        if (unit._rules.size > 0) {
            const rules = Array.from(unit._rules.keys()).sort(HorusHeresy.Compare);
            const weaponRules = unit.weaponRules();
            // Hide weapon rules.
            let unitRules: string[] = [];
            for (const rule of rules) {
                if (!weaponRules.includes(rule)) {
                    unitRules.push(rule);
                }
            }
            this.renderUnitRules(statsTable, 'Rules', unitRules);
        }

        // keywords
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const keywords = Array.from(unit._keywords).sort(HorusHeresy.Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Keywords', keywords], [0.10, 0.90], /* header= */ false));

        // model list
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const modelListDiv = document.createElement('div');
        this.renderModelList(modelListDiv, unit);
        thead.appendChild(createTableRow(['MODELS', modelListDiv], [0.10, 0.90], /* header= */ false));
    }

    private renderUnitRules(container: HTMLElement, rulesGroup: string, rules: string[]) {
        const thead = container.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const rulesDiv = document.createElement('div');
         rules.forEach((rule, index) => {
            let text = rule.trim();
            if (index > 1) {
                rulesDiv.appendChild(document.createTextNode(", "));
            }
            if (index != 0) {
                let anchor = document.createElement('a');
                anchor.href = "#" + text;
                anchor.text = text;
                rulesDiv.appendChild(anchor);
            }
        });


        thead.appendChild(createTableRow([rulesGroup, rulesDiv], [0.10, 0.90], /* header= */ false));

    }

    private renderModelList(container: HTMLElement, unit: HorusHeresy.Unit) {
        for (const model of unit._models) {
            const div = container.appendChild(document.createElement('div'));

            div.appendChild(document.createTextNode((model._count > 1 ? `${model._count}x ` : '') + model._name));

            const modelGear = model.getDedupedWeaponsAndUpgrades();
            if (modelGear.length === 0) continue;

            div.appendChild(document.createTextNode(' ('));
            for (const gear of modelGear) {
                if (gear !== modelGear[0]) div.appendChild(document.createTextNode(', '));
                div.appendChild(document.createTextNode((gear._count > 1 ? `${gear._count}x ` : '') + gear.selectionName()));
                if (gear._cost.hasValues()) {
                    const costSpan = div.appendChild(document.createElement('span'));
                    costSpan.classList.add('wh40k_upgrade_cost', 'd-none');
                    costSpan.appendChild(document.createTextNode(` ${gear._cost.toString()}`));
                }
            }
            div.appendChild(document.createTextNode(')'));
        }
    }

    private printRules(root: Map<string, Map<string, string | null>>, section: HTMLElement | null) {
        if (root.size === 0 || !section) return;

        for (let [subFaction, rules] of root.entries()) {
            let allegianceRules = document.createElement('div');
            allegianceRules.classList.add('wh40k_rules');
            let rulesHeader = document.createElement('h3');
            allegianceRules.appendChild(rulesHeader);
            rulesHeader.appendChild(document.createTextNode(subFaction));

            for (let rule of rules) {
                let row = addHideAble(document.createElement('div'));
                let name = document.createElement('b');
                name.id = rule[0];
                name.appendChild(document.createTextNode(rule[0]));
                let desc = document.createElement('p');
                desc.appendChild(document.createTextNode(rule[1] || ''));
                row.appendChild(name);
                row.appendChild(desc);
                allegianceRules.appendChild(row);
            }

            section.appendChild(allegianceRules);
        }
    }

    private static _infantryLabels = ["Model", "Type", "M", "WS", "BS", "S", "T", "W", "I", "A", "Ld", "Sv", ""];
    private _infantryLabelWidthsNormalized = [0.20, 0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1];
    private static _vehicleLabels = ["Model", "Type", "M", "BS", "Front", "Side", "Rear", "HP", "Capacity", ""];
    private _vehicleLabelWidthsNormalized = [0.20, 0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.1];
    private static _knightLabels = ["Model", "Type", "M", "WS", "BS", "S", "Front", "Side", "Rear", "I", "A", "HP", ""];
    private _knightLabelWidthsNormalized = [0.20, 0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1];
    private static _fortificationLabels = ["Model", "Type", "BS", "Front", "Side", "Rear", "HP", "Capacity", ""];
    private _fortificationLabelWidthsNormalized = [0.20, 0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.20, 0.15];

    private static _weaponLabels = ["Weapon", "Range", "Str", "AP", "Type", "Rules"];
    private _weaponLabelWidthNormalized = [0.25, 0.05, 0.05, 0.05, 0.15, 0.35];
    private static _psychicWeaponLabels = ["Psychic Weapon", "Range", "Str", "AP", "Type", "Rules"];
    private _psychicWeaponLabelWidthNormalized = [0.25, 0.05, 0.05, 0.05, 0.15, 0.35];
}

function mergeRules(ruleGroups: Map<string, Map<string, string | null>>, groupName: string, rulesToAdd: Map<string, string | null>) {
    if (rulesToAdd.size === 0) return;
    ruleGroups.set(groupName, new Map([...ruleGroups.get(groupName) || [], ...rulesToAdd]));
}

function createTableRow(labels: (string | Element)[], widths: number[], header = false) {
    const row = addHideAble(document.createElement('tr'));
    if (header) row.classList.add('header_row');
    for (let i = 0, colCount = 0; i < labels.length && i < widths.length || colCount < 20; i++) {
        const cell = document.createElement(header ? 'th' : 'td');
        cell.scope = 'col';
        if (i < labels.length && i < widths.length) {
            let node: Node;
            const label = labels[i];
            if (typeof label === 'string') {
                node = document.createTextNode(label);
            } else {
                node = labels[i] as Element; // TypeScript requires a cast here.
            }
            cell.appendChild(node);
            cell.style.width = `${widths[i] * 100}%`;
            colCount += cell.colSpan = Math.round(widths[i] / 0.05);
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

function createNoteHead(title: string, note: HorusHeresy.BaseNote) {
    if (!note.notes()) return null;

    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    thead.appendChild(createTableRow([title, note._customNotes], [0.10, 0.90], /* header= */ false));

    return thead;
}

function createNotesHead(title: string, notes: HorusHeresy.BaseNote[]) {
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

function addHideAble<T extends Element>(e: T): T {
    e.classList.add('hide_able')
    return e;
}

function toggleHidden(e: Event) {
    let element = e.target as Element;
    if (element) element = element.closest('.hide_able') as Element;
    if (!element) return;
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden')
    } else {
        element.classList.add('hidden')
    }
}

function bucketSortModels(models: HorusHeresy.BaseModel[]): Map<string, HorusHeresy.BaseModel[]> {

    let buckets = new Map<string, HorusHeresy.BaseModel[]>();

    const vehicles = models.filter(model => model instanceof HorusHeresy.Vehicle);
    buckets.set("Vehicles", vehicles);
    const knights = models.filter(model => model instanceof HorusHeresy.Knight);
    buckets.set("Knights", knights);
    const forts = models.filter(model => model instanceof HorusHeresy.Fortification);
    buckets.set("Fortifications", forts);
    const simple = models.filter(model => model instanceof HorusHeresy.Model);
    buckets.set("Models", simple);
    return buckets;
}
