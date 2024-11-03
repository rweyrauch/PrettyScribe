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
import {addHideAble, toggleHidden} from "./html/hideable"
import {loadOptionsFromLocalStorage, renderCheckboxOption, renderOptionsToggle, saveOptionToLocalStorage} from "./html/options";
import {PsJsx} from './html/jsx';

export class Wh40kRenderer implements Renderer {

    private readonly _roster: Wh40k.Roster40k | null = null;
    private readonly _rosterId: string | undefined;

    private _roles: Map<Wh40k.UnitRole, HTMLImageElement | null> = new Map();

    constructor(roster: Wh40k.Roster40k) {

        this._roster = roster;

        const rosterHash = this._roster?.hash() || 0;
        this._rosterId = `${this._roster?.name()}:${(rosterHash >>> 0).toString(16)}`;

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

        const costs = [`${this._roster._cost._points} pts`];
        for (const costName in this._roster._cost._freeformValues) {
            costs.push(`${this._roster._cost._freeformValues[costName]}${costName}`);
        }
        const rosterNameAndCost = `${this._roster.name()} (${costs.join(', ')})`;

        title?.appendChild(<>
            {this.renderOptionsDiv()}
            <h3>{rosterNameAndCost}</h3>
            {/* Footer div is hideEnabled, except when printing. */}
            <div className='footer'>
                <div>PrettyScribe</div>
                <div>{rosterNameAndCost}</div>
            </div>
            {this._roster._customNotes && <p>{this._roster._customNotes}</p>}
        </>);

        list?.appendChild(<>
            {this.renderRosterSummary()}
            {this.renderAbilitiesByPhase()}
        </>);

        forces?.appendChild(this.renderRosterDetails());

        loadOptionsFromLocalStorage();
        this.loadDatasheetOrderFromLocalStorage();
        this.collapseIdenticalUnits();
    }

    private renderRosterSummary() {
        return <>{this._roster?._forces.map(force =>
            this.renderForceSummary(force))}
        </>;
    }

    private renderForceSummary(force: Wh40k.Force) {
        let tbody: HTMLElement;
        const tbodyRef = (el: HTMLElement) => {
            tbody = el;
        }
        const resetDatasheetOrderButtonOnclick = (e: Event) => this.resetDatasheetOrder(tbody);

        const results = <div>
          {force._faction
              ? `${force._catalog} ${force.name()} (${force._faction})`
              : `${force._catalog} ${force.name()}`
          }
          {force._configurations.length > 0 && 
            <ul>{
              force._configurations.map(configuration => 
                <li><i>{configuration}</i></li>
              )
            }
            </ul>
          }
      
          <table className="table table-sm table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col" style="width: 20%;">NAME</th>
                <th scope="col" style="width: 15%;">ROLE</th>
                <th scope="col" style="width: 55%;">MODELS</th>
                <th scope="col" style="width: 5%;">POINTS</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {force._units.map((unit, i) => 
                <tr data-index={i}>
                  <td>{unit.nameWithExtraCosts()}</td>
                  <td>{Wh40k.UnitRoleToString[unit._role]}</td>
                  <td>{this.renderModelList(unit)}</td>
                  <td>{unit._cost._points.toString()}</td>
                </tr>)
              }
            </tbody>
          </table>
          <button
              id='reset-order-button'
              className="d-none btn btn-secondary d-print-none"
              onclick={resetDatasheetOrderButtonOnclick}>
                Reset datasheet order
          </button>
        </div>;

        this.makeForceSummaryListItemsDraggable(tbody!);
        return results;
    }

    /** Make the table rows re-orderable via drag-and-drop. */
    private makeForceSummaryListItemsDraggable(tbody: HTMLElement) {
        for (const child of tbody.children) {
            (child as HTMLElement).draggable = true;
            child.classList.add('draggable');
        }

        let draggedItem: Element | null;
        let dropTarget: Element | null;
        tbody.addEventListener("dragstart", ev => {
            draggedItem = (ev.target as Element).closest('[draggable]');
            ev.dataTransfer!.effectAllowed = 'move';
        });
        tbody.addEventListener('dragover', ev => {
            ev.preventDefault();
            const target = (ev.target as Element).closest('[draggable]');
            if (dropTarget === target) return;

            dropTarget?.classList.remove('draggable_drop_target_top')
            target?.classList.add('draggable_drop_target_top');
            dropTarget = target;
        });
        tbody.addEventListener("drop", ev => {
            ev.preventDefault();
            dropTarget?.classList.remove('draggable_drop_target_top')
            const target = (ev.target as Element).closest('[draggable]');
            if (!draggedItem || draggedItem === target) return;

            // TODO: drop the item after target if dropped on lower half of target
            const container = draggedItem.parentElement!;
            container.insertBefore(draggedItem, target);

            // Reorder all the datasheets.
            // NB: this is the only part of this function that's not generic; we
            // could separate it out, and reuse the rest of this function as a
            // general function under ./html/draggable.
            this.orderDatasheetsToMatchSummary(container);
            this.collapseIdenticalUnits();
            this.saveDatasheetOrderToLocalStorage();
        });
    }

    /**
     * Reorders datasheets to match the DOM order of of the roster summary table.
     */
    private orderDatasheetsToMatchSummary(container: Element) {
        const children = container.children;
        let isNaturallySorted = true;
        for (let i = 0; i < children.length; i++) {
            const originalIndex = (children[i] as HTMLElement).dataset.index;
            if (i > 0) {
                const prevIndex = (children[i - 1] as HTMLElement).dataset.index || -1;
                isNaturallySorted &&= +(originalIndex || 0) > +prevIndex;
            }
            const datasheet = document.querySelector(`.wh40k_unit_sheet[data-index="${originalIndex}"]`) as HTMLElement;
            if (!datasheet) continue;
            datasheet.style.order = String(i);
        }

        const resetDatasheetOrderButton = document.querySelector('#reset-order-button');
        if (isNaturallySorted) {
            resetDatasheetOrderButton?.classList.add('d-none');
        } else {
            resetDatasheetOrderButton?.classList.remove('d-none');
        }
    }

    /**
     * Iterates over datasheets, which may have been reordered, and collapses
     * identical units into a single datasheet, noting the count of that unit.
     */
    private collapseIdenticalUnits() {
        const datasheets = document.querySelectorAll('.wh40k_unit_sheet');
        const sortedDatasheets = (Array.from(datasheets) as HTMLElement[]).sort((a, b) => {
            return +a.style.order - +b.style.order;
        });

        let lastDatasheet = null;
        for (const datasheet of sortedDatasheets) {
            datasheet.classList.remove('d-none');
            const unitCountSpan = datasheet.querySelector('div.unit_count > span') as HTMLElement;
            if (lastDatasheet && lastDatasheet?.dataset.hash === datasheet.dataset.hash) {
                lastDatasheet.classList.add('d-none');
                const lastUnitCountSpan = lastDatasheet.querySelector('div.unit_count > span') as HTMLElement;
                const lastCount = +(lastUnitCountSpan?.dataset.count || '');
                unitCountSpan.dataset.count = String(lastCount + 1);
                unitCountSpan.parentElement?.classList.remove('d-none');
            } else {
                unitCountSpan.dataset.count = String(1);
                unitCountSpan.parentElement?.classList.add('d-none');
            }
            lastDatasheet = datasheet;
        }
    }

    private saveDatasheetOrderToLocalStorage() {
        try {
            const summaryRows = document.querySelectorAll('tr.draggable');
            const order = (Array.from(summaryRows) as HTMLElement[]).map(e => e.dataset.index);
            saveOptionToLocalStorage(`40k-order-${this._rosterId}`, JSON.stringify(order));
        } catch (e) {
            // localStorage not supported or enabled
            console.warn('Error in saveDatasheetOrderToLocalStorage', e);
        }
    }

    private loadDatasheetOrderFromLocalStorage() {
        try {
            // Load order from LocalStorage
            const order = JSON.parse(window.localStorage[`40k-order-${this._rosterId}`] || '[]');
            const container = document.querySelector('tr.draggable')?.parentElement!;
            if (order.length) {
                // Take a snapshot of container.children, which is a live array that
                // would change as we start calling appendChild below. 
                const summaries = Array.from(container.children);
                for (let i = 0; i < summaries.length && i < order.length; i++) {
                    const o = order[i];
                    container.appendChild(summaries[o]);
                }
                this.orderDatasheetsToMatchSummary(container);
                // This call to this.collapseIdenticalUnits() should be optional
                // because the caller of this method _should_ call it, just in
                // case we didn't load order from localStorage. However, we call
                // it here just in case. 
                this.collapseIdenticalUnits();
            }
        } catch (e) {
            // localStorage not supported or enabled
            console.warn('Error in loadDatasheetOrderFromLocalStorage', e);
        }
    }

    private resetDatasheetOrder(container: Element) {
        try {
            delete window.localStorage[`40k-order-${this._rosterId}`];
            const sortedSummaries = (Array.from(container.children) as HTMLElement[]).sort((a, b) => {
                return +(a.dataset.index || 0) - +(b.dataset.index || 0);
            })
            for (const row of sortedSummaries) {
                container.appendChild(row);
            }
            this.orderDatasheetsToMatchSummary(container);
            this.collapseIdenticalUnits();
        } catch (e) {
            // localStorage not supported or enabled
            console.warn('Error in resetDatasheetOrder', e);
        }
    }

    private renderOptionsDiv() {
        const optionsDiv = <div
            className='wh40k_options_div d-print-none'
            id='wh40k_options_div'></div>;

        // A toggle to hide or show options, since there are several.
        const optionsToggleSpan = optionsDiv.appendChild(<span></span>);
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
        renderCheckboxOption(optionsDiv, 'showArmyRules', 'Show army rules',
            (e: Event) => {
                const rulesDiv = document.getElementById('all-army-rules');
                if ((e.target as HTMLInputElement).checked) {
                    rulesDiv?.classList.remove('d-none')
                } else {
                    rulesDiv?.classList.add('d-none')
                }
            },
            /* defaultChecked= */ true);
        renderCheckboxOption(optionsDiv, 'singleColumnDatasheets', 'Single-Column Datasheets',
            (e: Event) => {
                if ((e.target as HTMLInputElement).checked) {
                    document.body.classList.add('single_column');
                } else {
                    document.body.classList.remove('single_column');
                }
            });

        // Options related to printing are grouped together
        const printOptionsDiv = optionsDiv.appendChild(
            <span className='wh40k_options_print_subsection'>Print:</span>
        );
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

        return optionsDiv;
    }

    private renderAbilitiesByPhase() {
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
                        const abilityDiv = <div className='hide_able'>
                            <b>{unit.name()}</b> - <b>{ability}</b>{' - '}
                        </div>;

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

                            abilityDiv.appendChild(<u>{match[0]}</u>);

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

        const sortedPhases = ['pre-game phase', 'command phase', 'movement phase', 'psychic phase', 'shooting phase', 'charge phase', 'fight phase', 'morale phase']
           .filter(phase => !!allPhaseAbilities[phase]);

        // Options will allow user to toggle this on.
        return <div id='wh40k_abilities_list' className='d-none'>
            <h3>Abilities by Phase</h3>
            {sortedPhases.length === 0
                ? 'No phase-specific abilities in roster'
                : sortedPhases.map(phase => <>
                    <h4>{phase}</h4>
                    {/* Clone abilitiesDiv, so that if it shows up in multiple phases, each shows a copy. */}
                    {allPhaseAbilities[phase].map(abilitiesDiv => abilitiesDiv.cloneNode(true))}
                </>)}
        </div>;
    }

    private renderRosterDetails() {
        if (!this._roster) return;

        const catalogueRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        const subFactionRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        return <>
            <div className='page_break' style='display: flex; flex-direction: column;'>
                {this._roster._forces.map(force =>
                    <>
                        {this._roster!._forces.length > 1 && <h3>
                            <div style='page-break-before: always;'><p>
                                {force._catalog}
                                {force._faction && ` (${force._faction})`}
                            </p></div>
                        </h3>}
                        {mergeRules(catalogueRules, force._catalog, force._rules)}
                        {mergeRules(subFactionRules, force._faction, force._factionRules)}
                        {force._units.map((unit, i) => this.renderUnit(unit, i))}
                    </>
                )}
            </div>
            <div id='all-army-rules' style='page-break-before: always;'>
                {this.renderRules(catalogueRules)}
                {this.renderRules(subFactionRules)}
            </div>
        </>;
    }

    private renderUnit(unit: Wh40k.Unit, index: number) {
        return <div className='wh40k_unit_sheet'
                data-hash={(unit.hash() >>> 0).toString(16)}
                data-name={unit.name()}
                data-index={String(index)}
            style={`order: ${index};`}>
            <table className="table table-sm table-striped">
                <thead className='table-dark unit_header'>
                    {/* unit header */}
                    <tr className='hide_able'>
                        <td scope='col' colspan='2' style='width: 10%;'>
                            <div className='unit_costs'>
                                <span>{this._roles.get(unit._role)?.cloneNode() || '-'}</span>
                                <span>{unit._cost._points.toString()}</span>
                            </div>
                        </td>
                        <td scope='col' colspan='16' style='width: 80%;'>{unit.name()}</td>
                        <td scope='col' colspan='2' style='width: 10%;'>
                            <div className='unit_costs unit_count'>
                                <span className='unit_count' data-count='1'></span>
                            </div>
                        </td>
                    </tr>

                    {/* Add an invisible row of 20, 5% columns. This ensures correct
                        spacing for the first few columns of visible rows.*/}
                    <tr>
                        {[...Array(20).keys()].map(i =>
                            <td colspan='1' style='width: 5%; padding: 0px;'></td>)}
                    </tr>

                    {this.renderNotesHead('Unit notes', unit)}
                </thead>
                <thead>
                    <tr>
                        <td colspan='20' className='subTableTd'>
                            <div>
                                {this.renderProfilesTables(unit)}
                                <table className="table table-sm table-striped">
                                    {!unit._abilities['Abilities'] && unit._rules.size > 0 &&
                                        this.renderUnitAbilitiesAndRules('Abilities', new Map(), unit._rules)}
                                    {Object.entries(unit._abilities).sort().map(([abilitiesGroup, abilitiesMap]) =>
                                        this.renderUnitAbilitiesAndRules(
                                            abilitiesGroup,
                                            abilitiesMap,
                                            abilitiesGroup === 'Abilities' ? unit._rules : undefined))}
                                </table>
                            </div>
                        </td>
                    </tr>
                </thead>
                <thead className='info_row keywords_row'>
                    <tr class='hide_able'>
                        <td colspan='20'>
                            <div class='wh40k_keywords_and_factions'>
                                <div class='wh40k_keywords'>
                                    <div>Keywords</div>
                                    <div>{Array.from(unit._keywords).sort(Wh40k.Compare).join(', ').toLocaleUpperCase()}</div>
                                </div>
                                <div class='wh40k_factions'>
                                    <div>Factions</div>
                                    <div>{Array.from(unit._factions).sort(Wh40k.Compare).join(', ').toLocaleUpperCase()}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
                <thead className='info_row'>
                    <tr class='hide_able'>
                        <td scope='col' colspan='2' style='width: 10%;'>MODELS</td>
                         {/* TODO remove the next div; it was added to confirm TSX transition */}
                        <td scope='col' colspan='18' style='width: 90%;'><div>{this.renderModelList(unit)}</div></td>
                    </tr>
                </thead>
            </table>
        </div>;
    }

    private renderProfilesTables(unit: Wh40k.Unit) {
        const entries = Object.entries(unit._profileTables)
            .sort((a, b) => Wh40k.CompareProfileTableName(a[0], b[0]))
            .map(([typeName, table]) => {
                const className = typeName === 'Unit' ? 'wh40k_unit_profile_table' : 'wh40k_weapon_profile_table';
                return [table, className];
            }) as [Wh40k.TabularProfile, string][];
        
        return <div>
            {entries.map(([table, className]) => <div class={className}>
                <div className='hide_able'>
                    {table._headers.map((header) => <div>
                        {this.renderProfileTableHeaderCell(header)}
                    </div>)}
                </div>
                {table._contents.map(row => <div className='hide_able'>
                        {row.map((cell) => <div>
                            {cell === '-' ? '' : cell}
                        </div>)}
                    </div>)}
                </div>)}
        </div>
    }

    private renderProfileTableHeaderCell(name: string) {
        if (name === 'Ranged Weapons' || name === 'Melee Weapons') {
            return <>
              <span class='desktop-only'>{name}</span><span class='mobile-only'>{name.replace(' Weapons', '')}</span>
            </>
        } else if (name === 'Range') {
            return <>
              <span class='desktop-only'>{name}</span><span class='mobile-only'>Rng</span>
            </>
        } else {
            return <>{name}</>;
        }
    }

    private renderUnitAbilitiesAndRules(abilitiesGroup: string, abilitiesMap: Map<string, string>, rulesMap?: Map<string, string>) {
        return <>
        <thead className='info_row table-active'>
            <tr className='header_row'>
                <th>{abilitiesGroup}</th>
            </tr>
        </thead>
        <tbody className='info_row'>
            <tr></tr> {/* Reverse the stripe coloring to start with white. */}
            {/* TODO remove the nested div; it was added to confirm TSX transition */}
            {rulesMap && rulesMap.size > 0 &&
                <tr className='hide_able'><td scope="col" style="width: 100%;"><div><div>
                    <b>{Array.from(rulesMap.keys()).sort(Wh40k.Compare).join(', ')}</b>
                </div></div></td></tr>}
            {Array.from(abilitiesMap.keys()).sort(Wh40k.Compare).map(ability =>
                <tr className='hide_able'><td scope="col" style="width: 100%;"><div><div className="hide_able">
                    <b>{`${ability.toUpperCase()}: `}</b>
                    {abilitiesMap.get(ability) || '??'}
                </div></div></td></tr>)}
        </tbody>
        </>
    }

    private renderModelList(unit: Wh40k.Unit) {
        return unit._models.map(model => 
            <div>
                {model._count > 1 ? `${model._count}x ` : ''}{model.name()}
                {model.getDedupedWeaponsAndUpgrades().length > 0 &&
                    <> (
                        {model.getDedupedWeaponsAndUpgrades().map((gear, i) =>
                          <>
                            {i > 0 ? ', ' : ''}
                            {gear._count > 1 ? `${gear._count}x ` : ''}{gear.selectionName()}
                            {gear._cost.hasValues() &&
                              <span className='wh40k_upgrade_cost d-none'>
                                {` ${gear._cost.toString()}`}
                              </span>}
                          </>
                        )}
                    )</>
                }
            </div>
        );
    }

    private renderRules(root: Map<string, Map<string, string | null>>) {
        if (root.size === 0) return null;

        return <>
            {Array.from(root.entries()).map(([subFaction, rules]) => <div className='wh40k_rules'>
                <h3>{subFaction}</h3>
                {Array.from(rules.entries()).map((rule) => <div className='hide_able'>
                    <b>{rule[0]}</b>
                    <p>{rule[1]}</p>
                </div>)}
            </div>)}
        </>;
    }

    private renderNotesHead(title: string, note: Wh40k.BaseNotes) {
        if (!note.notes()) return null
        return <thead className='info_row'>
            <tr>
                <td style='width: 10%' colspan='2'>{title}</td>
                <td style='width: 90%' colspan='18'>{note._customNotes}</td>
            </tr>
        </thead>;
    }

    private _unitLabelWidthsNormalized = [0.40, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.30];
    private _weaponLabelWidthNormalized = [0.30, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05, 0.30];
}

function mergeRules(ruleGroups: Map<string, Map<string, string | null>>, groupName: string, rulesToAdd: Map<string, string | null>) {
    if (rulesToAdd.size === 0) return;
    ruleGroups.set(groupName, new Map([...ruleGroups.get(groupName) || [], ...rulesToAdd]));
}
