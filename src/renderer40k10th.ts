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

import {Renderer} from "./renderer";
import {Wh40k} from "./roster40k10th";
import {createTableRow, createNoteHead, createNotesHead} from './html/table';
import {addHideAble, toggleHidden} from "./html/hideable"
import {loadOptionsFromLocalStorage, renderCheckboxOption, renderOptionsToggle} from "./html/options";

export class Wh40kRenderer implements Renderer {

    private readonly _roster: Wh40k.Roster40k | null = null;

    private _roles: Map<Wh40k.UnitRole, HTMLImageElement | null> = new Map();

    constructor(roster: Wh40k.Roster40k) {

        this._roster = roster;

        this._roles.set(Wh40k.UnitRole.EpicHero, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Character, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Battleline, document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Infantry, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Vehicle, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Mounted, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Transport, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(Wh40k.UnitRole.Fortification, document.getElementById('role_ft') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) return;

        if (title) {
            this.renderOptionsDiv(title);

            const costs = [`${this._roster._cost._points} pts`];
            for (const costName in this._roster._cost._freeformValues) {
                costs.push(`${this._roster._cost._freeformValues[costName]}${costName}`);
            }
            const text = `${this._roster.name()} (${costs.join(', ')})`;
            title.appendChild(document.createElement('h3')).appendChild(document.createTextNode(text));

            // Footer div is hideEnabled, except when printing.
            const footer = title.appendChild(document.createElement('div'));
            footer.classList.add('footer');
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode('PrettyScribe'));
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode(text));

            if (this._roster._customNotes) {
                title.appendChild(document.createElement('p')).appendChild(document.createTextNode(this._roster._customNotes));
            }
        }

        if (list) {
            this.renderRosterSummary(list);
            this.renderAbilitiesByPhase(list);
        }

        if (forces) {
            this.renderRosterDetails(forces);
        }

        loadOptionsFromLocalStorage();
    }

    private renderRosterSummary(list: HTMLElement) {
        if (!this._roster) return;

        for (const force of this._roster._forces) {

            const forceTitle = document.createElement('div');
            if (force._faction) {
                forceTitle.appendChild(document.createTextNode(`${force._catalog} ${force.name()} (${force._faction})`));
            } else {
                forceTitle.appendChild(document.createTextNode(`${force._catalog} ${force.name()}`));
            }
            if (force._configurations.length > 0) {
                const list = forceTitle.appendChild(document.createElement('ul'));
                for (const configuration of force._configurations) {
                    list.appendChild(document.createElement('li'))
                        .appendChild(document.createElement('i'))
                        .appendChild(document.createTextNode(configuration));
                }
            }
            list.appendChild(forceTitle);

            const table = document.createElement('table');
            table.classList.add('table', 'table-sm', 'table-striped');
            const thead = document.createElement('thead');
            table.appendChild(thead);
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            thead.appendChild(tr);
            const headerInfo = [{name: "NAME", w: '20%'}, {name: "ROLE", w: '15%'}, {name: "MODELS", w: '55%'}, {name: "POINTS", w: '5%'}];
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
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit.nameWithExtraCosts()));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(Wh40k.UnitRoleToString[unit._role]));
                const models = tr.appendChild(document.createElement('td'));
                this.renderModelList(models, unit);
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._cost._points.toString()));
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
        renderOptionsToggle(optionsToggleSpan);

        renderCheckboxOption(optionsDiv, 'showPhaseAbilities', 'Show abilities by phase',
            (e) => {
                const abilities = document.getElementById('wh40k_abilities_list');
                if (!abilities) return;

                if ((e.target as HTMLInputElement).checked) {
                    abilities.classList.remove('d-none');
                } else {
                    abilities.classList.add('d-none');
                }
            });
        renderCheckboxOption(optionsDiv, 'showUpgradeCosts', 'Show upgrade costs',
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
        renderCheckboxOption(optionsDiv, 'singleColumnDatasheets', 'Single-Column Datasheets',
            (e: Event) => {
                const singleColumnSheeets = document.getElementById('single_column_sheets');
                const doubleColumnSheets = document.getElementById('double_column_sheets');
                if (!singleColumnSheeets || !doubleColumnSheets) return;

                if ((e.target as HTMLInputElement).checked) {
                    singleColumnSheeets.classList.remove('d-none')
                    doubleColumnSheets.classList.add('d-none')
                } else {
                    singleColumnSheeets.classList.add('d-none')
                    doubleColumnSheets.classList.remove('d-none')
                }
            });

        // Options related to printing are grouped together
        const printOptionsDiv = optionsDiv.appendChild(document.createElement('span'));
        printOptionsDiv.classList.add('wh40k_options_print_subsection');
        printOptionsDiv.appendChild(document.createTextNode('Print:'));
        renderCheckboxOption(printOptionsDiv, 'printBigger', 'Larger Text',
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
        renderCheckboxOption(printOptionsDiv, 'hideElements', 'Hide Elements',
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
        renderCheckboxOption(printOptionsDiv, 'datasheetPageBreaks', 'One Datasheet per Page',
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


    private renderAbilitiesByPhase(list: HTMLElement) {
        if (!this._roster) return;

        const allPhaseAbilities: { [key: string]: Element[] } = {};
        const allPhaseAbilityNames: { [key: string]: string[] } = {};
        for (const force of this._roster._forces) {
            for (const unit of force._units) {
                for (const abilities of Object.values(unit._abilities)) {
                    for (const [ability, description] of abilities.entries()) {
                        const matches = [...description.matchAll(/(?:before the first turn begins|set up|Reinforcements|(?:Command|Movement|Psychic|Shooting|Charge|Fight|Morale) phase)/ig)];
                        if (matches.length === 0) continue;

                        // Create a div with the ability, to highlight the phase in
                        // the ability's rule.
                        const abilityDiv = addHideAble(document.createElement('div'));
                        abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(unit.name()));
                        abilityDiv.appendChild(document.createTextNode(' - '));
                        abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(ability));
                        abilityDiv.appendChild(document.createTextNode(' - '));

                        let text = description;
                        for (const match of matches) {
                            if (!match.index) continue;  // Should not happen.

                            const phaseMatch = match[0].toLocaleLowerCase();  // Normalize phase in case cases differ by ability.

                            // map special cases to the correct phase
                            // examples:
                            // - At the start of the first battle round but before the first turn begins, you can move this unit up to 9". It cannot end this move within 9" of any enemy models.

                            // - In your Shooting phase, after this model shoots, it can make a Normal Move or Fall Back as if it were your Movement phase, even if it arrived as Reinforcements this turn.

                            // - If this unit is set up in ambush, when revealing ambush markers, you can do one of the following:
                            // -- Remove one ambush marker from the battlefield and set up this unit underground instead.
                            // -- After setting up this unit from an ambush marker, this unit can make a Normal Move as if it were your Movement phase, but must end that move more than 9" away from enemy models.

                            let phase = phaseMatch; // map special cases to the correct phase
                            switch (phaseMatch) {
                                case 'before the first turn begins':
                                    phase = 'pre-game phase';
                                    break;
                                case 'set up':
                                    if (!description.includes('reinforcements')) {
                                        phase = 'pre-game phase';
                                    }
                                    break;
                                case 'reinforcements':
                                    phase = 'movement phase';
                                    break;
                            }

                            // ignore other phase mentions
                            if (description.toLocaleLowerCase().includes('as if it were your ' + phase)) {
                                continue;
                            }

                            const textIndex = match.index - (description.length - text.length);
                            if (textIndex > 0) {
                                abilityDiv.appendChild(document.createTextNode(text.substring(0, textIndex)));
                            }

                            const phaseAbilities = allPhaseAbilities[phase] = allPhaseAbilities[phase] || [];
                            const phaseAbilityNames = allPhaseAbilityNames[phase] = allPhaseAbilityNames[phase] || [];
                            // I don't know why duplicates are not removed if we check phaseAbilities directly
                            if (!phaseAbilityNames.includes(ability)) {
                                phaseAbilityNames.push(ability)
                                phaseAbilities.push(abilityDiv);
                            }

                            abilityDiv.appendChild(document.createElement('u')).appendChild(document.createTextNode(match[0]));

                            const newOffset = textIndex + phaseMatch.length;
                            text = text.substring(newOffset);
                        }
                        if (text.length > 0) {
                            abilityDiv.appendChild(document.createTextNode(text));
                        }
                    }
                }
            }
        }

        const sectionDiv = list.appendChild(document.createElement('div'));
        sectionDiv.setAttribute('id', 'wh40k_abilities_list');
        sectionDiv.classList.add('d-none');  // Options will allow user to toggle this on.
        sectionDiv.appendChild(document.createElement('h3')).appendChild(document.createTextNode('Abilities by Phase'));

        const sortedPhases = ['pre-game phase', 'command phase', 'movement phase', 'psychic phase', 'shooting phase', 'charge phase', 'fight phase', 'morale phase']
            .filter(phase => !!allPhaseAbilities[phase]);
        if (sortedPhases.length === 0) {
            sectionDiv.appendChild(document.createTextNode('No phase-specific abilities in roster'));
        } else {
            for (const phase of sortedPhases) {
                sectionDiv.appendChild(document.createElement('h4')).appendChild(document.createTextNode(phase));
                for (const abilitiesDiv of allPhaseAbilities[phase]) {
                    // If an ability applies to multiple phases, the first time
                    // we render its div, it will not have a parent; subsequent
                    // times, clone the div as elements can only have one parent.
                    sectionDiv.appendChild(abilitiesDiv.parentElement ? abilitiesDiv.cloneNode(true) : abilitiesDiv);
                }
            }
        }
    }

    private renderRosterDetails(forces: HTMLElement) {
        if (!this._roster) return;

        const catalogueRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        const subFactionRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        const doubleColumnSheets = forces.appendChild(document.createElement('div'));
        doubleColumnSheets.id = 'double_column_sheets';
        const singleColumnSheets = forces.appendChild(document.createElement('div'));
        singleColumnSheets.id = 'single_column_sheets';
        singleColumnSheets.style.pageBreakBefore = "always";
        singleColumnSheets.classList.add('d-none');

        for (const force of this._roster._forces) {
            if (this._roster._forces.length > 1) {
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
                doubleColumnSheets.appendChild(h3);
            }

            this.renderDatasheets(doubleColumnSheets, force._units);
            this.renderDatasheets(singleColumnSheets, force._units, true);

            mergeRules(catalogueRules, force._catalog, force._rules);
            mergeRules(subFactionRules, force._faction, force._factionRules);
        }

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        this.printRules(subFactionRules, rules);
        forces.appendChild(rules);
    }

    private renderDatasheets(forces: HTMLElement, units: Wh40k.Unit[], singleColumn = false) {
        let numIdenticalUnits = 0;
        for (let i = 0; i < units.length; i++) {
            numIdenticalUnits++;
            const unit = units[i];
            const nextUnit = units[i + 1];
            if (unit.equal(nextUnit)) continue;

            this.renderUnitHtml(forces, unit, numIdenticalUnits, singleColumn);
            numIdenticalUnits = 0
        }
    }

    private renderUnitHtml(forces: HTMLElement, unit: Wh40k.Unit, unitCount: number, singleColumn = false) {
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
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._cost._points.toString()));

        let cpCostDiv: Element | string = '';
        thead.appendChild(createTableRow([unitCostDiv, unit.name() + (unitCount > 1 ? ` (${unitCount})` : ''), cpCostDiv], [0.1, 0.8, 0.1]));

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

        const tbody = statsTable.appendChild(document.createElement('thead'));
        const tr = tbody.appendChild(document.createElement('tr'));

        let profilesTable = statsTable;
        if (!singleColumn) {
            const profilesTd = tr.appendChild(document.createElement('td'));
            profilesTd.colSpan = 12;
            profilesTd.classList.add('subTableTd');
            profilesTable = profilesTd.appendChild(document.createElement('table'));
            profilesTable.classList.add('table', 'table-sm', 'table-striped');
        }

        // Tabular profile data, like model stats and weapons.
        // Sort by unit, then weapons, then other stuff.
        const typeNames = Object.keys(unit._profileTables).sort(Wh40k.CompareProfileTableName);
        for (const typeName of typeNames) {
            const table = unit._profileTables[typeName];
            const widths = typeName === 'Unit' ? this._unitLabelWidthsNormalized : this._weaponLabelWidthNormalized;
            this.renderSubTable(profilesTable, table._headers, table._contents, widths, 'Notes', [table]);
        }

        let abilitiesTable = statsTable;
        if (!singleColumn) {
            const abilitiesTd = tr.appendChild(document.createElement('td'));
            abilitiesTd.colSpan = 8;
            abilitiesTd.classList.add('subTableTd');
            abilitiesTable = abilitiesTd.appendChild(document.createElement('table'));
            abilitiesTable.classList.add('table', 'table-sm', 'table-striped');
        }

        // unit abilities and rules; rules are shared across units, with their
        // descriptions printed in bulk later, but show up with unit 'Abilities'
        if (!unit._abilities['Abilities'] && unit._rules.size > 0) {
            this.renderUnitAbilitiesAndRules(abilitiesTable, 'Abilities', new Map(), unit._rules);
        }
        for (const abilitiesGroup of Object.keys(unit._abilities).sort()) {
            const abilitiesMap = unit._abilities[abilitiesGroup];
            const rules = abilitiesGroup === 'Abilities' ? unit._rules : undefined;
            this.renderUnitAbilitiesAndRules(abilitiesTable, abilitiesGroup, abilitiesMap, rules);
        }

        // keywords
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row', 'keywords_row');
        const keywords = Array.from(unit._keywords).sort(Wh40k.Compare).join(', ').toLocaleUpperCase();
        const factions = Array.from(unit._factions).sort(Wh40k.Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Keywords', keywords, 'Factions', factions], [0.10, 0.60, 0.10, 0.20], /* header= */ false));

        // model list
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const modelListDiv = document.createElement('div');
        this.renderModelList(modelListDiv, unit);
        thead.appendChild(createTableRow(['MODELS', modelListDiv], [0.10, 0.90], /* header= */ false));
    }

    renderSubTable(container: HTMLElement, labels: string[], contents: string[][], widths: number[], notesName: string, notes: Wh40k.BaseNotes[]) {
        const thead = container.appendChild(document.createElement('thead'));
        thead.classList.add('table-active');

        // header content
        thead.appendChild(createTableRow(labels, widths, /* header= */ true));

        let tbody = container.appendChild(document.createElement('tbody'));
        tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

        // body content
        for (const content of contents) {
            tbody.append(createTableRow(content, widths));
        }

        const notesTableHead = createNotesHead(notesName, notes);
        if (notesTableHead) container.appendChild(notesTableHead);
    }

    private renderUnitAbilitiesAndRules(container: HTMLElement, abilitiesGroup: string, abilitiesMap: Map<string, string>, rulesMap?: Map<string, string>) {
        const thead = container.appendChild(document.createElement('thead'));
        thead.classList.add('info_row', 'table-active');
        const tr = thead.appendChild(document.createElement('tr'));
        tr.classList.add('header_row');
        const th = tr.appendChild(document.createElement('th'));
        th.colSpan = 20;
        th.appendChild(document.createTextNode(abilitiesGroup));

        const tbody = container.appendChild(document.createElement('tbody'));
        tbody.classList.add('info_row');
        tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

        if (rulesMap && rulesMap.size > 0) {
            const rules = Array.from(rulesMap.keys()).sort(Wh40k.Compare).join(', ');
            const abilitiesDiv = document.createElement('div');
            abilitiesDiv.appendChild(document.createElement('div')).appendChild(document.createElement('b')).appendChild(document.createTextNode(rules));
            tbody.appendChild(createTableRow([abilitiesDiv], [1], /* header= */ false));
        }
        const abilities = Array.from(abilitiesMap.keys()).sort(Wh40k.Compare);
        for (const ability of abilities) {
            const abilitiesDiv = document.createElement('div');
            const abilityDiv = addHideAble(abilitiesDiv.appendChild(document.createElement('div')));
            abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${ability.toUpperCase()}: `));
            abilityDiv.appendChild(document.createTextNode(abilitiesMap.get(ability) || '??'));
            tbody.appendChild(createTableRow([abilitiesDiv], [1], /* header= */ false));
        }
    }

    private renderModelList(container: HTMLElement, unit: Wh40k.Unit) {
        for (const model of unit._models) {
            const div = container.appendChild(document.createElement('div'));

            div.appendChild(document.createTextNode((model._count > 1 ? `${model._count}x ` : '') + model.name()));

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

    private static _unitLabels = ["MODEL", "M", "T", "SV", "W", "LD", "OC"];
    private _unitLabelWidthsNormalized = [0.40, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
    private static _weaponLabels = ["WEAPONS", "RANGE", "A", "BS/WS", "S", "AP", "D", "ABILITIES"];
    private _weaponLabelWidthNormalized = [0.30, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05, 0.30];
}

function mergeRules(ruleGroups: Map<string, Map<string, string | null>>, groupName: string, rulesToAdd: Map<string, string | null>) {
    if (rulesToAdd.size === 0) return;
    ruleGroups.set(groupName, new Map([...ruleGroups.get(groupName) || [], ...rulesToAdd]));
}
