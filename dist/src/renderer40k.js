"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer40k = void 0;
const roster40k_1 = require("./roster40k");
class Renderer40k {
    constructor(roster) {
        this._roster = null;
        this._roles = new Map();
        this._unitLabelWidthsNormalized = [0.25, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
        this._weaponLabelWidthNormalized = [0.25, 0.05, 0.1, 0.05, 0.05, 0.05, 0.45];
        this._spellLabelWidthNormalized = [0.25, 0.05, 0.1, 0.60];
        this._explosionLabelWidthNormalized = [0.2, 0.10, 0.10, 0.10];
        this._trackerLabelWidth = [0.2, 0.15, 0.1, 0.1, 0.1];
        this._roster = roster;
        this._roles.set(roster40k_1.UnitRole.HQ, document.getElementById('role_hq'));
        this._roles.set(roster40k_1.UnitRole.TR, document.getElementById('role_tr'));
        this._roles.set(roster40k_1.UnitRole.EL, document.getElementById('role_el'));
        this._roles.set(roster40k_1.UnitRole.FA, document.getElementById('role_fa'));
        this._roles.set(roster40k_1.UnitRole.HS, document.getElementById('role_hs'));
        this._roles.set(roster40k_1.UnitRole.FL, document.getElementById('role_fl'));
        this._roles.set(roster40k_1.UnitRole.DT, document.getElementById('role_dt'));
        this._roles.set(roster40k_1.UnitRole.FT, document.getElementById('role_ft'));
        this._roles.set(roster40k_1.UnitRole.LW, document.getElementById('role_lw'));
    }
    render(title, list, forces) {
        if (this._roster == null)
            return;
        if (title) {
            this.renderOptionsDiv(title);
            const text = `${this._roster.name()} (${this._roster._points} pts, ${this._roster._powerLevel} PL, ${this._roster._commandPoints} CP)`;
            title.appendChild(document.createElement('h3')).appendChild(document.createTextNode(text));
            const footer = title.appendChild(document.createElement('div'));
            footer.classList.add('footer');
            footer.appendChild(document.createTextNode(text));
        }
        if (list) {
            this.renderRosterSummary(list);
            this.renderAbilitiesByPhase(list);
        }
        if (forces) {
            this.renderRosterDetails(forces);
        }
    }
    renderRosterSummary(list) {
        if (!this._roster)
            return;
        for (const force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (force._faction) {
                forceTitle.appendChild(document.createTextNode(`${force._catalog} ${force.name()} (${force._faction})`));
            }
            else {
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
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit.name()));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(roster40k_1.UnitRoleToString[unit._role]));
                const models = tr.appendChild(document.createElement('td'));
                for (let i = 0; i < unit._modelList.length; i++) {
                    if (i > 0)
                        models.appendChild(document.createElement('br'));
                    models.appendChild(document.createTextNode(unit._modelList[i]));
                }
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._points.toString()));
                tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(unit._powerLevel.toString()));
                body.appendChild(tr);
            }
        }
    }
    renderOptionsDiv(title) {
        const optionsDiv = title.appendChild(document.createElement('div'));
        optionsDiv.classList.add('wh40k_options_div', 'd-print-none');
        optionsDiv.appendChild(document.createTextNode('Options: '));
        const input = optionsDiv.appendChild(document.createElement('input'));
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'showPhaseAbilities');
        input.setAttribute('id', 'showPhaseAbilities');
        input.addEventListener('input', (e) => {
            const abilities = document.getElementById('wh40k_abilities_list');
            if (!abilities)
                return;
            if (e.target.checked) {
                abilities.classList.remove('d-none');
            }
            else {
                abilities.classList.add('d-none');
            }
        });
        const label = optionsDiv.appendChild(document.createElement('label'));
        label.setAttribute('for', 'showPhaseAbilities');
        label.appendChild(document.createTextNode(' Show abilities by phase'));
    }
    renderAbilitiesByPhase(list) {
        if (!this._roster)
            return;
        const allPhaseAbilities = {};
        const allPhaseAbilityNames = {};
        for (const force of this._roster._forces) {
            for (const unit of force._units) {
                for (const [ability, description] of unit._abilities.entries()) {
                    const matches = [...description.matchAll(/(?:before the first turn begins|set up|Reinforcements|(?:Command|Movement|Psychic|Shooting|Charge|Fight|Morale) phase)/ig)];
                    if (matches.length === 0)
                        continue;
                    const abilityDiv = document.createElement('div');
                    abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(unit.name()));
                    abilityDiv.appendChild(document.createTextNode(' - '));
                    abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(ability));
                    abilityDiv.appendChild(document.createTextNode(' - '));
                    let text = description;
                    for (const match of matches) {
                        if (!match.index)
                            continue;
                        const phaseMatch = match[0].toLocaleLowerCase();
                        let phase = phaseMatch;
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
                        if (description.toLocaleLowerCase().includes('as if it were your ' + phase)) {
                            continue;
                        }
                        const textIndex = match.index - (description.length - text.length);
                        if (textIndex > 0) {
                            abilityDiv.appendChild(document.createTextNode(text.substring(0, textIndex)));
                        }
                        const phaseAbilities = allPhaseAbilities[phase] = allPhaseAbilities[phase] || [];
                        const phaseAbilityNames = allPhaseAbilityNames[phase] = allPhaseAbilityNames[phase] || [];
                        if (!phaseAbilityNames.includes(ability)) {
                            phaseAbilityNames.push(ability);
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
        const sectionDiv = list.appendChild(document.createElement('div'));
        sectionDiv.setAttribute('id', 'wh40k_abilities_list');
        sectionDiv.classList.add('d-none');
        sectionDiv.appendChild(document.createElement('h3')).appendChild(document.createTextNode('Abilities by Phase'));
        const sortedPhases = ['pre-game phase', 'command phase', 'movement phase', 'psychic phase', 'shooting phase', 'charge phase', 'fight phase', 'morale phase']
            .filter(phase => !!allPhaseAbilities[phase]);
        if (sortedPhases.length === 0) {
            sectionDiv.appendChild(document.createTextNode('No phase-specific abilities in roster'));
        }
        else {
            for (const phase of sortedPhases) {
                sectionDiv.appendChild(document.createElement('h4')).appendChild(document.createTextNode(phase));
                for (const abilitiesDiv of allPhaseAbilities[phase]) {
                    sectionDiv.appendChild(abilitiesDiv.parentElement ? abilitiesDiv.cloneNode(true) : abilitiesDiv);
                }
            }
        }
    }
    renderRosterDetails(forces) {
        if (!this._roster)
            return;
        const catalogueRules = new Map();
        const subFactionRules = new Map();
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
            h3.appendChild(forceTitle);
            forces.appendChild(h3);
            let prevUnit = null;
            for (let unit of force._units) {
                if (unit.equal(prevUnit)) {
                    continue;
                }
                prevUnit = unit;
                this.renderUnitHtml(forces, unit);
            }
            if (force._rules.size > 0) {
                let rules = new Map();
                catalogueRules.set(force._catalog, rules);
                for (let rule of force._rules) {
                    rules.set(rule[0], rule[1]);
                }
            }
            if (force._factionRules.size > 0) {
                let rules = new Map();
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
        forces.appendChild(rules);
    }
    renderUnitHtml(forces, unit) {
        const statsDiv = forces.appendChild(document.createElement('div'));
        statsDiv.classList.add('wh40k_unit_sheet');
        const statsTable = document.createElement('table');
        statsTable.classList.add('table', 'table-sm', 'table-striped');
        statsDiv.appendChild(statsTable);
        let thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('table-dark', 'unit_header');
        const unitCostDiv = document.createElement('div');
        unitCostDiv.classList.add('unit_costs');
        const roleImg = this._roles.get(unit._role);
        unitCostDiv.appendChild(document.createElement('span')).appendChild((roleImg === null || roleImg === void 0 ? void 0 : roleImg.cloneNode()) || document.createTextNode('-'));
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._powerLevel.toString()));
        unitCostDiv.appendChild(document.createElement('span')).appendChild(document.createTextNode(unit._points.toString()));
        thead.appendChild(createTableRow([unitCostDiv, unit.name(), ''], [0.1, 0.8, 0.1]));
        const spacerTr = thead.appendChild(document.createElement('tr'));
        for (let i = 0; i < 20; i++) {
            const td = spacerTr.appendChild(document.createElement('td'));
            td.colSpan = 1;
            td.style.width = '5%';
            td.style.padding = '0';
        }
        let notesTableHead = createNoteHead('Unit notes', unit);
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('table-active');
        thead.appendChild(createTableRow(Renderer40k._unitLabels, this._unitLabelWidthsNormalized, true));
        let tbody = statsTable.appendChild(document.createElement('tbody'));
        tbody.append(document.createElement('tr'));
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
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
        if (unit._woundTracker.length > 0) {
            const labels = Array.from(Renderer40k._trackerLabels);
            if (unit._woundTracker.length == 4) {
                const newLabels = Array.from(unit._woundTracker[0]._table.values());
                labels.splice(1, newLabels.length, ...newLabels);
            }
            else if (unit._woundTracker.length == 3) {
                const newLabels = Array.from(unit._woundTracker[0]._table.keys());
                labels.splice(1, newLabels.length, ...newLabels);
            }
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(labels, this._trackerLabelWidth, true));
            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));
            for (const tracker of unit._woundTracker) {
                tbody.appendChild(createTableRow([''].concat(Array.from(tracker._table.values())), this._trackerLabelWidth));
            }
        }
        if (unit._weapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._weaponLabels, this._weaponLabelWidthNormalized, true));
            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));
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
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
        if (unit._spells.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._spellLabels, this._spellLabelWidthNormalized, true));
            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));
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
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
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
            thead.appendChild(createTableRow(['Psykers', psykersDiv], [0.10, 0.90], false));
        }
        notesTableHead = createNotesHead('Psyker notes', unit._psykers);
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const abilitiesDiv = document.createElement('div');
        const rules = Array.from(unit._rules.keys()).sort(roster40k_1.Compare).join(', ');
        abilitiesDiv.appendChild(document.createElement('div')).appendChild(document.createElement('b')).appendChild(document.createTextNode(rules));
        const abilities = Array.from(unit._abilities.keys()).sort(roster40k_1.Compare);
        for (const ability of abilities) {
            const abilityDiv = abilitiesDiv.appendChild(document.createElement('div'));
            abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${ability.toUpperCase()}: `));
            abilityDiv.appendChild(document.createTextNode(unit._abilities.get(ability) || '??'));
        }
        thead.appendChild(createTableRow(['Abilities', abilitiesDiv], [0.10, 0.90], false));
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const factions = Array.from(unit._factions).sort(roster40k_1.Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Factions', factions], [0.10, 0.90], false));
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const keywords = Array.from(unit._keywords).sort(roster40k_1.Compare).join(', ').toLocaleUpperCase();
        thead.appendChild(createTableRow(['Keywords', keywords], [0.10, 0.90], false));
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const modelListDiv = document.createElement('div');
        for (const modelName of unit._modelList) {
            const mDiv = modelListDiv.appendChild(document.createElement('div')).appendChild(document.createTextNode(modelName));
        }
        thead.appendChild(createTableRow(['MODELS', modelListDiv], [0.10, 0.90], false));
        if (unit._explosions.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(Renderer40k._explosionLabels, this._explosionLabelWidthNormalized, true));
            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr'));
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
        if (notesTableHead)
            statsTable.appendChild(notesTableHead);
    }
    printRules(root, section) {
        if (root.size === 0 || !section)
            return;
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
}
exports.Renderer40k = Renderer40k;
Renderer40k._res = 144;
Renderer40k._margin = 0;
Renderer40k._unitLabels = ["MODEL", "M", "WS", "BS", "S", "T", "W", "A", "LD", "SAVE"];
Renderer40k._weaponLabels = ["WEAPONS", "RANGE", "TYPE", "S", "AP", "D", "ABILITIES"];
Renderer40k._spellLabels = ["PSYCHIC POWER", "MANIFEST", "RANGE", "DETAILS"];
Renderer40k._explosionLabels = ["EXPLOSION", "DICE ROLL", "DISTANCE", "MORTAL WOUNDS"];
Renderer40k._trackerLabels = ["WOUND TRACK", "REMAINING W", "ATTRIBUTE", "ATTRIBUTE", "ATTRIBUTE"];
;
function createTableRow(labels, widths, header = false) {
    const row = document.createElement('tr');
    if (header)
        row.classList.add('header_row');
    for (var i = 0, colCount = 0; i < labels.length && i < widths.length || colCount < 20; i++) {
        const cell = document.createElement(header ? 'th' : 'td');
        cell.scope = 'col';
        if (i < labels.length && i < widths.length) {
            let node;
            const label = labels[i];
            if (typeof label === 'string') {
                node = document.createTextNode(label);
            }
            else {
                node = labels[i];
            }
            cell.appendChild(node);
            cell.style.width = `${widths[i] * 100}%`;
            colCount += cell.colSpan = Math.round(widths[i] / 0.05);
        }
        else if (colCount < 20) {
            cell.colSpan = (20 - colCount);
            colCount = 20;
        }
        else {
            break;
        }
        row.appendChild(cell);
    }
    return row;
}
function createNoteHead(title, note) {
    if (!note._customNotes)
        return null;
    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    thead.appendChild(createTableRow([title, note._customNotes], [0.10, 0.90], false));
    return thead;
}
function createNotesHead(title, notes) {
    if (!notes.some(note => note._customNotes))
        return null;
    const thead = document.createElement('thead');
    thead.classList.add('info_row');
    const notesDiv = document.createElement('div');
    for (const note of notes) {
        if (!note._customNotes)
            continue;
        const noteDiv = notesDiv.appendChild(document.createElement('div'));
        noteDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${note.name()}: `));
        noteDiv.appendChild(document.createTextNode(note._customNotes));
    }
    thead.appendChild(createTableRow([title, notesDiv], [0.10, 0.90], false));
    return thead;
}
//# sourceMappingURL=renderer40k.js.map