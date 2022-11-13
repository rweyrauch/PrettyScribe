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

import {BaseNotes, Compare, Roster40k, Unit, UnitRole, UnitRoleToString} from "./roster40k";
import {Renderer} from "./renderer";

export class Renderer40k implements Renderer {

    private _roster: Roster40k | null = null;

    private _roles: Map<UnitRole, HTMLImageElement | null> = new Map();

    constructor(roster: Roster40k) {

        this._roster = roster;

        this._roles.set(UnitRole.HQ, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(UnitRole.TR, document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(UnitRole.EL, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(UnitRole.FA, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(UnitRole.HS, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(UnitRole.FL, document.getElementById('role_fl') as HTMLImageElement);
        this._roles.set(UnitRole.DT, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(UnitRole.FT, document.getElementById('role_ft') as HTMLImageElement);
        this._roles.set(UnitRole.LW, document.getElementById('role_lw') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) return;

        if (title) {
            this.renderOptionsDiv(title);

            const costs = [`${this._roster._cost._points} pts`, `${this._roster._cost._powerLevel} PL`, `${this._roster._cost._commandPoints} CP`];
            for (const costName in this._roster._cost._freeformValues) {
                costs.push(`${this._roster._cost._freeformValues[costName]}${costName}`);
            }
            const text = `${this._roster.name()} (${costs.join(', ')})`;
            title.appendChild(document.createElement('h3')).appendChild(document.createTextNode(text));

            // Footer div is hidden, except when printing.
            const footer = title.appendChild(document.createElement('div'));
            footer.classList.add('footer');
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode('PrettyScribe'));
            footer.appendChild(document.createElement('div')).appendChild(document.createTextNode(text));
        }

        if (list) {
            this.renderRosterSummary(list);
            this.renderAbilitiesByPhase(list);
        }

        if (forces) {
            this.renderRosterDetails(forces);
        }
    }

    private renderRosterSummary(list: HTMLElement) {
        if (!this._roster) return;

        // Only add units' CP costs if at least one unit has CP values. This
        // saves horizontal space for rosters that don't spend CP on units.
        const unitsHaveCpCost = this._roster._forces.some(f => f._units.some(u => u._cost._commandPoints !== 0));

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
            const headerInfo = [{ name: "NAME", w: '20%' }, { name: "ROLE", w: '15%' }, { name: "MODELS", w: '55%' }, { name: "POINTS", w: '5%' }, { name: "POWER", w: '5%' }];
            if (unitsHaveCpCost) {
                headerInfo.push({name: "CP", w: '5%'});
            }
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
                const extraCosts = [];  // Track extra costs like cabal points.
                for (const freeformCostType in unit._cost._freeformValues) {
                    if (unit._cost._freeformValues[freeformCostType] === 0) continue;
                    extraCosts.push(`${unit._cost._freeformValues[freeformCostType]}${freeformCostType}`);
                }
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit.name() + (extraCosts.length ? ` [${extraCosts.join(', ')}]` : '')));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(UnitRoleToString[unit._role]));
                const models = tr.appendChild(document.createElement('td'));
                this.renderModelList(models, unit);
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._cost._points.toString()));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._cost._powerLevel.toString()));
                if (unitsHaveCpCost) {
                    const commandPointsString = (unit._cost._commandPoints || '') + '';
                    tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(commandPointsString));
                }
                body.appendChild(tr);
            }
        }
    }

    private renderOptionsDiv(title: HTMLElement) {
        const optionsDiv = title.appendChild(document.createElement('div'));
        optionsDiv.classList.add('wh40k_options_div', 'd-print-none');
        optionsDiv.appendChild(document.createTextNode('Options:'));
        optionsDiv.appendChild(document.createElement('span')).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.renderCheckboxOption(optionsDiv, 'showPhaseAbilities', 'Show abilities by phase', 
            (e) => {
                const abilities = document.getElementById('wh40k_abilities_list');
                if (!abilities) return;

                if ((e.target as any).checked) {
                    abilities.classList.remove('d-none');
                } else {
                    abilities.classList.add('d-none');
                }
            });
        optionsDiv.appendChild(document.createElement('span')).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.renderCheckboxOption(optionsDiv, 'showUpgradeCosts', 'Show upgrade costs',
            (e: Event) => {
                const costSpans = document.getElementsByClassName('wh40k_upgrade_cost');
                for (const span of costSpans) {
                    if ((e.target as any).checked) {
                        span.classList.remove('d-none')
                    } else {
                        span.classList.add('d-none')
                    }
                }
            });
        optionsDiv.appendChild(document.createElement('span')).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.renderCheckboxOption(optionsDiv, 'printBigger', 'Print Larger Text',
            (e: Event) => {
                const unitSheetDiv = document.getElementsByClassName('wh40k_unit_sheet');
                for (const div of unitSheetDiv) {
                    if ((e.target as any).checked) {
                        div.classList.add('bigger')
                    } else {
                        div.classList.remove('bigger')
                    }
                }
            });
        optionsDiv.appendChild(document.createElement('span')).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.renderCheckboxOption(optionsDiv, 'collateDatasheets', 'Collate Detachment Datasheets',
            (e: Event) => {
                const collatedSheets = document.getElementById('collated_sheets');
                const detachmentSheets = document.getElementById('detachment_sheets');
                if (!collatedSheets || !detachmentSheets) return;

                if ((e.target as any).checked) {
                    collatedSheets.classList.remove('d-none')
                    detachmentSheets.classList.add('d-none')
                } else {
                    collatedSheets.classList.add('d-none')
                    detachmentSheets.classList.remove('d-none')
                }
            });
    }

    private renderCheckboxOption(optionsDiv: HTMLElement, idAndName: string, text: string, eventHandler: EventListenerOrEventListenerObject) {
        const input = optionsDiv.appendChild(document.createElement('input'));
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', idAndName);
        input.setAttribute('id', idAndName);
        input.addEventListener('input', eventHandler);
        const label = optionsDiv.appendChild(document.createElement('label'));
        label.setAttribute('for', idAndName);
        label.appendChild(document.createTextNode(` ${text}`));
    }

    private renderAbilitiesByPhase(list: HTMLElement) {
        if (!this._roster) return;

        const allPhaseAbilities: {[key: string]: Element[]} = {};
        const allPhaseAbilityNames: {[key: string]: string[]} = {};
        for (const force of this._roster._forces) {
            for (const unit of force._units) {
                for (const abilities of Object.values(unit._abilities)) {
                    for (const [ability, description] of abilities.entries()) {
                        const matches = [...description.matchAll(/(?:before the first turn begins|set up|Reinforcements|(?:Command|Movement|Psychic|Shooting|Charge|Fight|Morale) phase)/ig)];
                        if (matches.length === 0) continue;

                        // Create a div with the ability, to highlight the phase in
                        // the ability's rule.
                        const abilityDiv = document.createElement('div');
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
                                    if(!description.includes('reinforcements')) {
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
        const detachmentSheets = forces.appendChild(document.createElement('div'));
        detachmentSheets.id = 'detachment_sheets';
        const collatedSheets = forces.appendChild(document.createElement('div'));
        collatedSheets.id = 'collated_sheets';
        collatedSheets.style.pageBreakBefore = "always";
        collatedSheets.classList.add('d-none');
        const collatedUnits: Unit[] = [];

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
            mergeRules(subFactionRules, force._faction, force._factionRules);
        }

        collatedUnits.sort((lhs: Unit, rhs: Unit) => {
            if (lhs._role != rhs._role) return lhs._role - rhs._role;
            if (lhs._name != rhs._name) return Compare(lhs._name, rhs._name);
            return lhs._cost._points - rhs._cost._points;  // Simple heuristic, could do better.
        });
        this.renderDatasheets(collatedSheets, collatedUnits);

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        this.printRules(subFactionRules, rules);
        forces.appendChild(rules);
    }

    private renderDatasheets(forces: HTMLElement, units: Unit[]) {
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

    private renderUnitHtml(forces: HTMLElement, unit: Unit, unitCount: number) {
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
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._cost._powerLevel.toString()));
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._cost._points.toString()));

        let cpCostDiv: Element|string = '';
        if (unit._cost._commandPoints !== 0) {
            cpCostDiv = document.createElement('div');
            cpCostDiv.classList.add('unit_costs', 'unit_cp_costs');
            const span = cpCostDiv.appendChild(document.createElement('span'));
            span.appendChild(document.createTextNode(unit._cost._commandPoints.toString()));
            span.appendChild(document.createElement('span')).appendChild(document.createTextNode('CP'));
        }
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

        // models
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('table-active');
        thead.appendChild(createTableRow(Renderer40k._unitLabels, this._unitLabelWidthsNormalized, /* header= */ true));

        let tbody = statsTable.appendChild(document.createElement('tbody'));
        tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
        for (const model of unit._modelStats) {
            tbody.append(createTableRow([
                model._name,
                model._move,
                model._ws,
                model._bs,
                model._str.toString(),
                model._toughness.toString(),
                model._wounds.toString(),
                model._attacks.toString(),
                model._leadership.toString(),
                model._save,
            ], this._unitLabelWidthsNormalized));
        }

        notesTableHead = createNotesHead('Model notes', unit._modelStats);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // Wound Tracker
        if (unit._woundTracker.length > 0) {
            const labels = Array.from(Renderer40k._trackerLabels);

            // Determine wound table headers.
            if (unit._woundTracker.length == 4) {
              // Use first entry in table as labels.
              // TODO: Grrrh some tables put the column labels at the end.  Deal with this.
              const newLabels = Array.from(unit._woundTracker[0]._table.values());
              labels.splice(1, newLabels.length, ...newLabels);
            } else if (unit._woundTracker.length == 3) {
              // Use keys as labels.
              const newLabels = Array.from(unit._woundTracker[0]._table.keys());
              labels.splice(1, newLabels.length, ...newLabels);
            }
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(labels, this._trackerLabelWidth, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
            for (const tracker of unit._woundTracker) {
                // TODO fix length 4 tracker
                tbody.appendChild(createTableRow([''].concat(Array.from(tracker._table.values())), this._trackerLabelWidth));
            }
        }

        // weapons
        if (unit._weapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._weaponLabels, this._weaponLabelWidthNormalized, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const weapon of unit._weapons) {
                tbody.append(createTableRow([
                    weapon.name().toString(),
                    weapon._range,
                    weapon._type,
                    weapon._str.toString(),
                    weapon._ap,
                    weapon._damage,
                    weapon._abilities,
                ], this._weaponLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Weapon notes', unit._weapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // spells
        if (unit._spells.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._spellLabels, this._spellLabelWidthNormalized, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const spell of unit._spells) {
                tbody.append(createTableRow([
                    spell.name(),
                    spell._manifest.toString(),
                    spell._range,
                    spell._details,
                ], this._spellLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Spell notes', unit._spells);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // psyker
        if (unit._psykers.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('info_row');
            const psykersDiv = document.createElement('div');
            for (const psyker of unit._psykers) {
                let text = `CAST: ${psyker._cast}, DENY: ${psyker._deny}, POWERS KNOWN: ${psyker._powers}`;
                if (psyker._other) {
                    text += `, OTHER: ${psyker._other}`;
                }
                psykersDiv.appendChild(document.createElement('div')).appendChild(document.createTextNode(text));
            }
            thead.appendChild(createTableRow(['Psykers', psykersDiv], [0.10, 0.90], /* header= */ false));
        }
        notesTableHead = createNotesHead('Psyker notes', unit._psykers);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // unit abilities and rules; rules are shared across units, with their
        // descriptions printed in bulk later, but show up with unit 'Abilities'
        if (!unit._abilities['Abilities'] && unit._rules.size > 0) {
            this.renderUnitAbilitiesAndRules(statsTable, 'Abilities', new Map(), unit._rules);
        }
        for (const abilitiesGroup of Object.keys(unit._abilities).sort()) {
            const abilitiesMap = unit._abilities[abilitiesGroup];
            const rules = abilitiesGroup === 'Abilities' ? unit._rules : undefined;
            this.renderUnitAbilitiesAndRules(statsTable, abilitiesGroup, abilitiesMap, rules);
        }

        // factions
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const factions = Array.from(unit._factions).sort(Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Factions', factions], [0.10, 0.90], /* header= */ false));

        // keywords
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const keywords = Array.from(unit._keywords).sort(Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Keywords', keywords], [0.10, 0.90], /* header= */ false));

        // model list
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const modelListDiv = document.createElement('div');
        this.renderModelList(modelListDiv, unit);
        thead.appendChild(createTableRow(['MODELS', modelListDiv], [0.10, 0.90], /* header= */ false));

        // explosions
        if (unit._explosions.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._explosionLabels, this._explosionLabelWidthNormalized, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
            for (const explosion of unit._explosions) {
                tbody.append(createTableRow([
                    explosion.name(),
                    explosion._diceRoll,
                    explosion._distance,
                    explosion._mortalWounds,
                ], this._explosionLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Explosion notes', unit._explosions);
        if (notesTableHead) statsTable.appendChild(notesTableHead);
    }

    private renderUnitAbilitiesAndRules(container: HTMLElement, abilitiesGroup: string, abilitiesMap: Map<string, string>, rulesMap?: Map<string, string>) {
        const thead = container.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const abilitiesDiv = document.createElement('div');
        if (rulesMap && rulesMap.size > 0) {
            const rules = Array.from(rulesMap.keys()).sort(Compare).join(', ');
            abilitiesDiv.appendChild(document.createElement('div')).appendChild(document.createElement('b')).appendChild(document.createTextNode(rules));
        }
        const abilities = Array.from(abilitiesMap.keys()).sort(Compare);
        for (const ability of abilities) {
            const abilityDiv = abilitiesDiv.appendChild(document.createElement('div'));
            abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${ability.toUpperCase()}: `));
            abilityDiv.appendChild(document.createTextNode(abilitiesMap.get(ability) || '??'));
        }
        thead.appendChild(createTableRow([abilitiesGroup, abilitiesDiv], [0.10, 0.90], /* header= */ false));

    }

    private renderModelList(container: HTMLElement, unit: Unit) {
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
                let row = document.createElement('div');
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

    private static _unitLabels = ["MODEL", "M", "WS", "BS", "S", "T", "W", "A", "LD", "SAVE"];
    private _unitLabelWidthsNormalized = [0.25, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
    private static _weaponLabels = ["WEAPONS", "RANGE", "TYPE", "S", "AP", "D", "ABILITIES"];
    private _weaponLabelWidthNormalized = [0.25, 0.05, 0.1, 0.05, 0.05, 0.05, 0.45];

    private static _spellLabels = ["PSYCHIC POWER", "MANIFEST", "RANGE", "DETAILS"];
    private _spellLabelWidthNormalized = [0.25, 0.05, 0.1, 0.60];

    private static _explosionLabels = ["EXPLOSION", "DICE ROLL", "DISTANCE", "MORTAL WOUNDS"];
    private _explosionLabelWidthNormalized = [0.2, 0.10, 0.10, 0.15];

    private static _trackerLabels = ["WOUND TRACK", "REMAINING W", "ATTRIBUTE", "ATTRIBUTE", "ATTRIBUTE"];
    private _trackerLabelWidth = [0.2, 0.15, 0.1, 0.1, 0.1];
};

function mergeRules(ruleGroups: Map<string, Map<string, string | null>>, groupName: string, rulesToAdd: Map<string, string | null>) {
    if (rulesToAdd.size === 0) return;
    ruleGroups.set(groupName, new Map([...ruleGroups.get(groupName) || [], ...rulesToAdd]));
}

function createTableRow(labels: (string|Element)[], widths: number[], header = false) {
    const row = document.createElement('tr');
    if (header) row.classList.add('header_row');
    for (var i = 0, colCount = 0; i < labels.length && i < widths.length || colCount < 20; i++) {
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

function createNoteHead(title: string, note: BaseNotes) {
    if (!note._customNotes) return null;

    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    thead.appendChild(createTableRow([title, note._customNotes], [0.10, 0.90], /* header= */ false));

    return thead;
}

function createNotesHead(title: string, notes: BaseNotes[]) {
    if (!notes.some(note => note._customNotes)) return null;

    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    const notesDiv = document.createElement('div');
    for (const note of notes) {
        if (!note._customNotes) continue;

        const noteDiv = notesDiv.appendChild(document.createElement('div'));
        noteDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${note.name()}: `));
        noteDiv.appendChild(document.createTextNode(note._customNotes));
    }
    thead.appendChild(createTableRow([title, notesDiv], [0.10, 0.90], /* header= */ false));

    return thead;
}


