/*
    Copyright 2023-26 Rick Weyrauch,

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

import { HorusHeresy3 } from "./rosterHH3";
import { Renderer } from "./renderer";

export class RendererHH3 implements Renderer {

    private readonly _roster: HorusHeresy3.Roster | null = null;

    private _roles: Map<HorusHeresy3.UnitRole, HTMLImageElement | null> = new Map();

    constructor(roster: HorusHeresy3.Roster) {

        this._roster = roster;

        this._roles.set(HorusHeresy3.UnitRole.HIGH_COMMAND, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.COMMAND, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.TROOPS, document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.ELITES, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.FAST_ATTACK, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.HEAVY_ASSAULT, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.SUPPORT, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.RECON, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.RETINUE, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.TRANSPORT, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.HEAVY_TRANSPORT, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.WAR_ENGINE, document.getElementById('role_lw') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.ARMOUR, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(HorusHeresy3.UnitRole.REWARDS_OF_TREACHERY, document.getElementById('role_el') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) return;

        if (title) {
            this.renderOptionsDiv(title);

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
            forceTitle.classList.add('hh3_force_header');
            const catalogSpan = document.createElement('span');
            catalogSpan.appendChild(document.createTextNode(force._catalog.trim()));
            if (force._faction) {
                catalogSpan.appendChild(document.createTextNode(` (${force._faction})`));
            }
            forceTitle.appendChild(catalogSpan);
            const detachmentSpan = document.createElement('span');
            detachmentSpan.classList.add('hh3_detachment_name');
            detachmentSpan.appendChild(document.createTextNode(force._name));
            forceTitle.appendChild(detachmentSpan);
            list.appendChild(forceTitle);

            const table = document.createElement('table');
            table.classList.add('table', 'table-sm', 'table-striped', 'hh3_roster_summary_table');
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
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(HorusHeresy3.UnitRoleToString[unit._role]));
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
        const detachmentSheets = forces.appendChild(document.createElement('div'));
        detachmentSheets.id = 'detachment_sheets';
        const collatedSheets = forces.appendChild(document.createElement('div'));
        collatedSheets.id = 'collated_sheets';
        collatedSheets.style.pageBreakBefore = "always";
        collatedSheets.classList.add('d-none');
        const collatedUnits: HorusHeresy3.Unit[] = [];

        for (const force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            forceTitle.classList.add('hh3_force_header');
            forceTitle.style.pageBreakBefore = "always";
            const catalogSpan = document.createElement('span');
            catalogSpan.appendChild(document.createTextNode(force._catalog.trim()));
            if (force._faction) {
                catalogSpan.appendChild(document.createTextNode(" (" + force._faction + ")"));
            }
            forceTitle.appendChild(catalogSpan);
            const detachmentSpan = document.createElement('span');
            detachmentSpan.classList.add('hh3_detachment_name');
            detachmentSpan.appendChild(document.createTextNode(force._name));
            forceTitle.appendChild(detachmentSpan);
            detachmentSheets.appendChild(forceTitle);

            this.renderDatasheets(detachmentSheets, force._units);

            collatedUnits.push(...force._units);

            mergeRules(catalogueRules, force._catalog + " - " + force._name, force._rules);
        }

        collatedUnits.sort((lhs: HorusHeresy3.Unit, rhs: HorusHeresy3.Unit) => {
            if (lhs._role != rhs._role) return lhs._role - rhs._role;
            if (lhs._name != rhs._name) return HorusHeresy3.Compare(lhs._name, rhs._name);
            return lhs._points - rhs._points;
        });
        this.renderDatasheets(collatedSheets, collatedUnits);

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        forces.appendChild(rules);
    }

    private renderDatasheets(forces: HTMLElement, units: HorusHeresy3.Unit[]) {
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

    private renderUnitHtml(forces: HTMLElement, unit: HorusHeresy3.Unit, unitCount: number) {
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

        // Add an invisible row of 20, 5% columns.
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
                thead.appendChild(createTableRow(RendererHH3._infantryLabels, this._infantryLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of models) {
                    let infantry = model as HorusHeresy3.Model;
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
                        infantry._cool.toString(),
                        infantry._willpower.toString(),
                        infantry._intelligence.toString(),
                        infantry._save,
                        infantry._invuln,
                    ], this._infantryLabelWidthsNormalized));
                }
            }
            const vehicles = modelsByType.get("Vehicles");
            if (vehicles != null && vehicles.length > 0) {
                thead = statsTable.appendChild(document.createElement('thead'));
                thead.classList.add('table-active');
                thead.appendChild(createTableRow(RendererHH3._vehicleLabels, this._vehicleLabelWidthsNormalized, /* header= */ true));
                let tbody = statsTable.appendChild(document.createElement('tbody'));
                tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
                for (const model of vehicles) {
                    let vehicle = model as HorusHeresy3.Vehicle;
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
        }

        notesTableHead = createNotesHead('Model notes', unit._models);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // ranged weapons
        const rangedWeapons = unit.rangedWeapons();
        if (rangedWeapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererHH3._rangedWeaponLabels, this._rangedWeaponLabelWidthNormalized, /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const weapon of rangedWeapons) {
                let specialRulesDiv = document.createElement('div');
                const rules = weapon._specialRules.split(',');
                rules.forEach((rule, index) => {
                    let text = rule.trim();
                    if (!text || text === '-') return;
                    if (index > 0) {
                        specialRulesDiv.appendChild(document.createTextNode(", "));
                    }
                    let anchor = document.createElement('a');
                    anchor.classList.add('hh3-rule-link');
                    anchor.href = "#" + text;
                    anchor.text = text;
                    specialRulesDiv.appendChild(anchor);
                });

                tbody.append(createTableRow([
                    weapon.name(),
                    weapon._range,
                    weapon._fp,
                    weapon._rs,
                    weapon._ap,
                    weapon._damage,
                    specialRulesDiv,
                    weapon._traits,
                ], this._rangedWeaponLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Ranged Weapon notes', rangedWeapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // melee weapons
        const meleeWeapons = unit.meleeWeapons();
        if (meleeWeapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererHH3._meleeWeaponLabels, this._meleeWeaponLabelWidthNormalized, /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const weapon of meleeWeapons) {
                let specialRulesDiv = document.createElement('div');
                const rules = weapon._specialRules.split(',');
                rules.forEach((rule, index) => {
                    let text = rule.trim();
                    if (!text || text === '-') return;
                    if (index > 0) {
                        specialRulesDiv.appendChild(document.createTextNode(", "));
                    }
                    let anchor = document.createElement('a');
                    anchor.classList.add('hh3-rule-link');
                    anchor.href = "#" + text;
                    anchor.text = text;
                    specialRulesDiv.appendChild(anchor);
                });

                tbody.append(createTableRow([
                    weapon.name(),
                    weapon._im,
                    weapon._am,
                    weapon._sm,
                    weapon._ap,
                    weapon._damage,
                    specialRulesDiv,
                    weapon._traits,
                ], this._meleeWeaponLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Melee Weapon notes', meleeWeapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // wargear items
        const wargear = unit.wargear();
        if (wargear.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererHH3._wargearLabels, this._wargearLabelWidthNormalized, /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const gear of wargear) {
                const descDiv = document.createElement('div');
                if (gear._summary) {
                    const summaryEl = document.createElement('div');
                    summaryEl.classList.add('hh3_wargear_summary');
                    summaryEl.appendChild(document.createTextNode(gear._summary));
                    descDiv.appendChild(summaryEl);
                }
                if (gear._description) {
                    const descEl = document.createElement('div');
                    descEl.classList.add('hh3_wargear_description');
                    descEl.appendChild(document.createTextNode(gear._description));
                    descDiv.appendChild(descEl);
                }
                tbody.append(createTableRow([
                    gear.name(),
                    descDiv,
                ], this._wargearLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Wargear notes', wargear);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // reactions
        const reactions = unit.reactions();
        if (reactions.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(["Reactions", ""], [0.25, 0.75], /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));

            for (const reaction of reactions) {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('hh3_reaction_card');

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('hh3_reaction_name');
                nameDiv.appendChild(document.createTextNode(reaction.name()));
                cardDiv.appendChild(nameDiv);

                if (reaction._summary) {
                    const summaryDiv = document.createElement('div');
                    summaryDiv.classList.add('hh3_reaction_summary');
                    summaryDiv.appendChild(document.createTextNode(reaction._summary));
                    cardDiv.appendChild(summaryDiv);
                }

                const fields = [
                    { label: 'Trigger', value: reaction._trigger },
                    { label: 'Cost', value: reaction._reactionCost },
                    { label: 'Target', value: reaction._target },
                    { label: 'Process', value: reaction._process },
                ];
                for (const field of fields) {
                    if (!field.value) continue;
                    const fieldDiv = document.createElement('div');
                    fieldDiv.classList.add('hh3_reaction_field');
                    const b = document.createElement('b');
                    b.appendChild(document.createTextNode(field.label + ': '));
                    fieldDiv.appendChild(b);
                    fieldDiv.appendChild(document.createTextNode(field.value));
                    cardDiv.appendChild(fieldDiv);
                }

                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 20;
                td.appendChild(cardDiv);
                tr.appendChild(td);
                tbody.append(tr);
            }
        }

        // gambits
        const gambits = unit.gambits();
        if (gambits.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(["Gambits", ""], [0.25, 0.75], /* header= */ true));

            let tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));

            for (const gambit of gambits) {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('hh3_gambit_card');

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('hh3_gambit_name');
                nameDiv.appendChild(document.createTextNode(gambit.name()));
                cardDiv.appendChild(nameDiv);

                if (gambit._summary) {
                    const summaryDiv = document.createElement('div');
                    summaryDiv.classList.add('hh3_gambit_summary');
                    summaryDiv.appendChild(document.createTextNode(gambit._summary));
                    cardDiv.appendChild(summaryDiv);
                }
                if (gambit._description) {
                    const descDiv = document.createElement('div');
                    descDiv.classList.add('hh3_gambit_description');
                    descDiv.appendChild(document.createTextNode(gambit._description));
                    cardDiv.appendChild(descDiv);
                }

                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 20;
                td.appendChild(cardDiv);
                tr.appendChild(td);
                tbody.append(tr);
            }
        }

        // unit rules
        if (unit._rules.size > 0) {
            const rules = Array.from(unit._rules.keys()).sort(HorusHeresy3.Compare);
            const weaponRules = unit.weaponRules();
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
        thead.classList.add('info_row', 'hh3_keywords_row');
        const keywordsDiv = document.createElement('span');
        keywordsDiv.classList.add('hh3_keywords_value');
        keywordsDiv.appendChild(document.createTextNode(Array.from(unit._keywords).sort(HorusHeresy3.Compare).join(', ').toLocaleUpperCase()));
        const keywordsLabel = document.createElement('span');
        keywordsLabel.classList.add('hh3_keywords_label');
        keywordsLabel.appendChild(document.createTextNode('Keywords'));
        thead.appendChild(createTableRow([keywordsLabel, keywordsDiv], [0.10, 0.90], /* header= */ false));

        // model list
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row', 'hh3_model_list_row');
        const modelListDiv = document.createElement('div');
        this.renderModelList(modelListDiv, unit);
        thead.appendChild(createTableRow(['Models', modelListDiv], [0.10, 0.90], /* header= */ false));
    }

    private renderUnitRules(container: HTMLElement, rulesGroup: string, rules: string[]) {
        const thead = container.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const rulesDiv = document.createElement('div');
        rules.forEach((rule, index) => {
            let text = rule.trim();
            if (index > 0) {
                rulesDiv.appendChild(document.createTextNode(', '));
            }
            let anchor = document.createElement('a');
            anchor.classList.add('hh3-rule-link');
            anchor.href = "#" + text;
            anchor.text = text;
            rulesDiv.appendChild(anchor);
        });

        const labelSpan = document.createElement('span');
        labelSpan.classList.add('hh3_keywords_label');
        labelSpan.appendChild(document.createTextNode(rulesGroup));
        thead.appendChild(createTableRow([labelSpan, rulesDiv], [0.10, 0.90], /* header= */ false));
    }

    private renderModelList(container: HTMLElement, unit: HorusHeresy3.Unit) {
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
            allegianceRules.classList.add('hh3_rules_section');
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

    // 16 data columns = Model, Type, M, WS, BS, S, T, W, I, A, LD, CL, WP, IN, SAV, INV
    // ColSpans: 3 + 3 + 14×1 = 20 (fills the 20-column grid exactly)
    private static _infantryLabels = ["Model", "Type", "M", "WS", "BS", "S", "T", "W", "I", "A", "LD", "CL", "WP", "IN", "SAV", "INV"];
    private _infantryLabelWidthsNormalized = [0.15, 0.15, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
    private static _vehicleLabels = ["Model", "Type", "M", "BS", "Front", "Side", "Rear", "HP", "Capacity", ""];
    private _vehicleLabelWidthsNormalized = [0.20, 0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.1];

    private static _rangedWeaponLabels = ["Ranged Weapon", "R", "FP", "RS", "AP", "D", "Special Rules", "Traits"];
    private _rangedWeaponLabelWidthNormalized = [0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.30, 0.25];
    private static _meleeWeaponLabels = ["Melee Weapon", "IM", "AM", "SM", "AP", "D", "Special Rules", "Traits"];
    private _meleeWeaponLabelWidthNormalized = [0.20, 0.05, 0.05, 0.05, 0.05, 0.05, 0.30, 0.25];
    private static _wargearLabels = ["Wargear", "Description"];
    private _wargearLabelWidthNormalized = [0.25, 0.75];
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
                node = labels[i] as Element;
            }
            cell.appendChild(node);
            cell.style.width = `${widths[i] * 100}%`;
            colCount += cell.colSpan = Math.round(widths[i] / 0.05);
        } else if (colCount < 20) {
            cell.colSpan = (20 - colCount);
            colCount = 20;
        } else {
            break;
        }
        row.appendChild(cell);
    }
    return row;
}

function createNoteHead(title: string, note: HorusHeresy3.BaseNote) {
    if (!note.notes()) return null;

    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    thead.appendChild(createTableRow([title, note._customNotes], [0.10, 0.90], /* header= */ false));

    return thead;
}

function createNotesHead(title: string, notes: HorusHeresy3.BaseNote[]) {
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

function bucketSortModels(models: HorusHeresy3.BaseModel[]): Map<string, HorusHeresy3.BaseModel[]> {
    let buckets = new Map<string, HorusHeresy3.BaseModel[]>();

    const vehicles = models.filter(model => model instanceof HorusHeresy3.Vehicle);
    buckets.set("Vehicles", vehicles);
    const simple = models.filter(model => model instanceof HorusHeresy3.Model);
    buckets.set("Models", simple);
    return buckets;
}
