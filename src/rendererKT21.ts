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

import {BaseNotes, Compare, Operative, PsychicPower, RosterKT21, Specialism, Weapons} from "./rosterKT21";
import {Justification, Renderer, RenderParagraph, RenderText, RenderTextFull, VertAlign} from "./renderer";
import {createTableRow, createNoteHead, createNotesHead} from './html/table';
import {addHideAble, toggleHidden} from "./html/hideable"
import {loadOptionsFromLocalStorage, renderCheckboxOption, renderOptionsToggle} from "./html/options";

export class RendererKT21 implements Renderer {

    // for unknown reasons... symbols are correct with zipped *.rosz files but incorrect with *.ros
    /*
    private static readonly symTriangle = '▲';
    private static readonly symSquare = '⬛';
    private static readonly symCircle = '⬤';
    private static readonly symPentagon = '⬟';
    private static readonly symShooting = '⌖';
    private static readonly symCombat = '⚔';
    */

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private static readonly _bevelSize = 15;

    private readonly _descriptionStartX = 140;
    private _descriptionWidth: number = 600;

    private readonly _roster: RosterKT21 | null = null;
    private readonly _octagon: HTMLImageElement | null = null;
    private _specialisms: Map<Specialism, HTMLImageElement | null> = new Map();

    private static readonly _blackColor = '#1d272a';
    private static readonly _grey1 = '#b3bbb5';
    private static readonly _greyLight = '#dde1df';
    private static readonly _fillColor = '#f6f6f6';
    private static readonly _offset: number = 20;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    private static readonly _titleFont = 'bold 14px sans-serif';
    private static readonly _headerFont = 'bold 14px sans-serif';
    private static readonly _font = '14px sans-serif';
    private static readonly _boldFont = 'bold 14px sans-serif';

    constructor(roster: RosterKT21) {

        this._roster = roster;
        this._octagon = document.getElementById('octagon') as HTMLImageElement;

        // TODO this needs to be corrected
        this._specialisms.set(Specialism.NONE, document.getElementById('role_hq') as HTMLImageElement);
        this._specialisms.set(Specialism.COMBAT, document.getElementById('role_hs') as HTMLImageElement);
        this._specialisms.set(Specialism.STAUNCH, document.getElementById('role_fa') as HTMLImageElement);
        this._specialisms.set(Specialism.MARKSMAN, document.getElementById('role_el') as HTMLImageElement);
        this._specialisms.set(Specialism.SCOUT, document.getElementById('role_tr') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) {
            console.log("Roster is NULL");
            return
        }

        if (title) {
            this.renderOptionsDiv(title);

            const text = `${this._roster.name()} (${this._roster._equipmentPoints} EP)`;
            title.appendChild(document.createElement('h3')).appendChild(document.createTextNode(text));
        }

        let catalogueRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();
        let subFactionRules: Map<string, Map<string, string | null>> = new Map<string, Map<string, string | null>>();

        for (let force of this._roster._forces) {

            let catalogueRule =  catalogueRules.get(force._catalog);
            if (!catalogueRule) {
                catalogueRule = new Map<string, string | null>()
                catalogueRules.set(force._catalog, catalogueRule);
            }
            let subFactionRule =  subFactionRules.get(force._catalog);
            if (!subFactionRule) {
                subFactionRule = new Map<string, string | null>()
                subFactionRules.set(force._faction, subFactionRule);
            }

            const forceTitle = document.createElement('div');
            if (forceTitle) {
                if (force._faction) {
                    forceTitle.innerHTML = '<h4><p>' + force._faction + ' - ' + force.name() + '</p></h4>';
                } else {
                    forceTitle.innerHTML = '<h4><p>' + force.name() + '</p></h4>';
                }
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
            const headerInfo = [{name: "MODELS", w: '55%'}, {name: "EP", w: '5%'}];
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
            if (force._leader) {
                let tr = document.createElement('tr');
                let models = document.createElement('td');
                models.innerHTML = force._leader.nameAndGear();
                let ep = document.createElement('td');
                ep.innerHTML = force._leader.costs().toString();
                tr.appendChild(models);
                tr.appendChild(ep);
                body.appendChild(tr);
            }
            for (let operative of force._operatives) {
                let tr = document.createElement('tr');
                let models = document.createElement('td');
                models.innerHTML = operative.nameAndGear();
                let ep = document.createElement('td');
                ep.innerHTML = operative.costs().toString();
                tr.appendChild(models);
                tr.appendChild(ep);
                body.appendChild(tr);
            }


            if (forces) {
                const forceTitle = document.createElement('div');
                if (forceTitle) {
                    const p = document.createElement("p");
                    p.appendChild(document.createTextNode(force.name()));
                    if (force._faction) {
                        p.appendChild(document.createTextNode(" (" + force._faction + ")"));
                    }
                    forceTitle.appendChild(p);
                }

                let h3 = document.createElement('h3');
                h3.appendChild(forceTitle);
                forces.appendChild(h3);

                const canvasDiv = forces.appendChild(document.createElement('div'));
                canvasDiv.id = 'kt_canvas';
                canvasDiv.classList.add('d-none');
                const htmlDiv = forces.appendChild(document.createElement('div'));
                htmlDiv.id = 'kt_html';

                if (force._leader) {
                    this.printOperative(force._leader, null, canvasDiv);
                    this.printOperativeHtml(force._leader, null, htmlDiv);
                }
    
                let prevOperative: Operative | null = null;
                for (let operative of force._operatives) {
                    this.printOperative(operative, prevOperative, canvasDiv);
                    this.printOperativeHtml(operative, prevOperative, htmlDiv);
                    prevOperative = operative;
                }
            }

            function addRule(rules: Map<string, string | null>, append: Map<string, string | null>) {
                for (const rule of append) {
                    rules.set(rule[0], rule[1]);
                }
            }

            if (force._rules.size > 0) {
                addRule(catalogueRule, force._rules);
            }
            if (force._factionRules.size > 0) {
                addRule(subFactionRule, force._factionRules);
            }
            // models might have additional rules in weapons
            if (force._leader && force._leader._rules.size > 0) {
                addRule(catalogueRule, force._leader._rules);
            }
            if (force._operatives && force._operatives.length > 0) {
                for (const o of force._operatives) {
                    if (o._rules && o._rules.size > 0) {
                        addRule(catalogueRule, o._rules);
                    }
                }
            }
        }

        let rules = document.createElement("div");
        rules.style.pageBreakBefore = "always";
        this.printRules(catalogueRules, rules);
        this.printRules(subFactionRules, rules);
        if (forces)
            forces.appendChild(rules);

        loadOptionsFromLocalStorage();
    }

    private renderOptionsDiv(title: HTMLElement) {
        const optionsDiv = title.appendChild(document.createElement('div'));
        optionsDiv.classList.add('wh40k_options_div', 'd-print-none');
        optionsDiv.id = 'wh40k_options_div';

        // A toggle to hide or show options, since there are several.
        const optionsToggleSpan = optionsDiv.appendChild(document.createElement('span'));
        renderOptionsToggle(optionsToggleSpan);

        renderCheckboxOption(optionsDiv, 'ktWithCanvas', 'Use old formatting',
        (e) => {
            const htmlDiv = document.getElementById('kt_html');
            const canvasDiv = document.getElementById('kt_canvas');
            const htmlOptionsDiv = document.getElementById('ktHtmlOptions');
            if (!htmlDiv || !canvasDiv || !htmlOptionsDiv) return;

            if ((e.target as HTMLInputElement).checked) {
                htmlDiv.classList.add('d-none');
                htmlOptionsDiv.classList.add('d-none');
                canvasDiv.classList.remove('d-none');
            } else {
                htmlDiv.classList.remove('d-none');
                htmlOptionsDiv.classList.remove('d-none');
                canvasDiv.classList.add('d-none');
            }
        });

        // Options related to printing are grouped together
        const printOptionsDiv = optionsDiv.appendChild(document.createElement('span'));
        printOptionsDiv.classList.add('wh40k_options_print_subsection');
        printOptionsDiv.id = 'ktHtmlOptions';
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

    private printOperativeHtml(operative: Operative, prevOperative: null | Operative, forces: HTMLElement) {
        if (operative.equal(prevOperative)) {
            return;
        }

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
        const roleImg = this._specialisms.get(operative._role);
        unitCostDiv.appendChild(document.createElement('span')).appendChild(roleImg?.cloneNode() || document.createTextNode('-'));
        thead.appendChild(createTableRow([unitCostDiv, operative.name()], [0.1, 0.9]));

        // Add an invisible row of 20, 5% columns. This ensures correct
        // spacing for the first few columns of visible rows.
        const spacerTr = thead.appendChild(document.createElement('tr'));
        for (let i = 0; i < 20; i++) {
            const td = spacerTr.appendChild(document.createElement('td'));
            td.colSpan = 1;
            td.style.width = '5%';
            td.style.padding = '0';
        }

        // Unique list of models
        const uniqueModels: Operative[] = [];
        const scrathModels: Map<string, Operative> = new Map();
        if (!scrathModels.has(operative.name())) {
            scrathModels.set(operative.name(), operative);
            uniqueModels.push(operative);
        }

        let notesTableHead = createNoteHead('Operative notes', operative);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('table-active');
        thead.appendChild(createTableRow(RendererKT21._unitLabels, this._unitLabelWidthsNormalized, /* header= */ true));

        let tbody = statsTable.appendChild(document.createElement('tbody'));
        tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
        for (const model of uniqueModels) {
            tbody.append(createTableRow([
                model.name(),
                model._move,
                model._apl,
                model._groupActivations,
                model._defence.toString(),
                model._saves,
                model._wounds.toString(),
            ], this._unitLabelWidthsNormalized));
        }

        // Unique list of weapons
        const uniqueWeapons: Weapons[] = [];
        const scratchMap: Map<string, Weapons> = new Map();
        for (const w of operative._weapons) {
            if (!scratchMap.has(w.name())) {
                scratchMap.set(w.name(), w);
                uniqueWeapons.push(w);
            }
        }

        if (uniqueWeapons.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererKT21._weaponLabels, this._weaponLabelWidthNormalized, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.
            for (const weapon of uniqueWeapons) {
                tbody.append(createTableRow([
                    weapon.nameAndCosts(),
                    weapon._attacks,
                    weapon._skill,
                    weapon._damage,
                    weapon._rules,
                    weapon._criticalEffects,
                ], this._weaponLabelWidthNormalized));    
            }
        }
        notesTableHead = createNotesHead('Weapon notes', operative._weapons);
        if (notesTableHead) statsTable.appendChild(notesTableHead);

        // spells
        if (operative._psychicPowers.length > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('table-active');
            thead.appendChild(createTableRow(RendererKT21._spellLabels, this._spellLabelWidthNormalized, /* header= */ true));

            tbody = statsTable.appendChild(document.createElement('tbody'));
            tbody.append(document.createElement('tr')); // Reverse the stripe coloring to start with white.

            for (const spell of operative._psychicPowers) {
                tbody.append(createTableRow([
                    spell.name(),
                    spell._effect,
                ], this._spellLabelWidthNormalized));
            }
        }
        notesTableHead = createNotesHead('Spell notes', operative._psychicPowers);
        if (notesTableHead) statsTable.appendChild(notesTableHead);
        
        // abilities
        if (operative._abilities.size > 0 || operative._rules.size > 0) {
            const thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('info_row');
            const abilitiesDiv = document.createElement('div');
            if (operative._rules.size > 0) {
                const rules = Array.from(operative._rules.keys()).sort(Compare).join(', ');
                abilitiesDiv.appendChild(document.createElement('div')).appendChild(document.createElement('b')).appendChild(document.createTextNode(rules));
            }
                const abilities = Array.from(operative._abilities.keys()).sort(Compare);
            for (const ability of abilities) {
                const abilityDiv = addHideAble(abilitiesDiv.appendChild(document.createElement('div')));
                abilityDiv.appendChild(document.createElement('b')).appendChild(document.createTextNode(`${ability.toUpperCase()}: `));
                abilityDiv.appendChild(document.createTextNode(operative._abilities.get(ability) || '??'));
            }
            thead.appendChild(createTableRow(['Abilities', abilitiesDiv], [0.10, 0.90], /* header= */ false));
            }

        // factions
        if (operative._factions.size > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('info_row');
            const factions = Array.from(operative._factions).sort(Compare).join(', ').toLocaleUpperCase();
            thead.appendChild(createTableRow(['Factions', factions], [0.10, 0.90], /* header= */ false));
        }

        // keywords
        if (operative._keywords.size > 0) {
            thead = statsTable.appendChild(document.createElement('thead'));
            thead.classList.add('info_row');
            const keywords = Array.from(operative._keywords).sort(Compare).join(', ').toLocaleUpperCase();
            thead.appendChild(createTableRow(['Keywords', keywords], [0.10, 0.90], /* header= */ false));
        }

        // model list
        thead = statsTable.appendChild(document.createElement('thead'));
        thead.classList.add('info_row');
        const modelListDiv = document.createElement('div');
        for (const model of [operative]) {
            const div = modelListDiv.appendChild(document.createElement('div'));
            div.appendChild(document.createTextNode(model.nameAndGear()));
        }
        thead.appendChild(createTableRow(['MODELS', modelListDiv], [0.10, 0.90], /* header= */ false));
    }

    private printOperative(operative: Operative, prevOperative: null | Operative, forces: HTMLElement | null) {
        let canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = RendererKT21._res * 7.5;
        canvas.height = RendererKT21._res * 12;
        canvas.style.width = canvas.width.toString();
        canvas.style.height = canvas.height.toString();

        this._descriptionWidth = canvas.width - this._descriptionStartX - 10;

        if (operative.equal(prevOperative)) {
            return;
        }

        const dims = this.renderOperative(operative, canvas, 0, 0);
        const border = 15;
        let finalCanvas = document.createElement('canvas') as HTMLCanvasElement;

        finalCanvas.width = dims[0] + border * 2;
        finalCanvas.height = dims[1] + border * 2;
        finalCanvas.style.width = finalCanvas.width.toString();
        finalCanvas.style.height = finalCanvas.height.toString();

        let finalCtx = finalCanvas.getContext('2d');
        finalCtx?.drawImage(canvas, border, border);
        if (forces) {
            let canvasDiv = document.createElement('div');
            canvasDiv.appendChild(finalCanvas);
            forces.appendChild(canvasDiv);
        }
    }

    private printRules(root: Map<string, Map<string, string | null>>, section: HTMLElement | null) {
        if (root.size > 0) {
            for (let [subFaction, rules] of root.entries()) {
                if (rules.size == 0) continue
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

    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = RendererKT21._blackColor;

        ctx.beginPath();
        ctx.moveTo(x, y + RendererKT21._bevelSize);
        ctx.lineTo(x, y + h - RendererKT21._bevelSize);
        ctx.lineTo(x + RendererKT21._bevelSize, y + h);
        ctx.lineTo(x + w - RendererKT21._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererKT21._bevelSize);
        ctx.lineTo(x + w, y + RendererKT21._bevelSize);
        ctx.lineTo(x + w - RendererKT21._bevelSize, y);
        ctx.lineTo(x + RendererKT21._bevelSize, y);
        ctx.closePath();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = RendererKT21._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.moveTo(x, y + RendererKT21._bevelSize);
        ctx.lineTo(x, y + h - RendererKT21._bevelSize);
        ctx.lineTo(x + RendererKT21._bevelSize, y + h);
        ctx.lineTo(x + w - RendererKT21._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererKT21._bevelSize);
        ctx.lineTo(x + w, y + RendererKT21._bevelSize);
        ctx.lineTo(x + w - RendererKT21._bevelSize, y);
        ctx.lineTo(x + RendererKT21._bevelSize, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    private renderNotes(ctx: CanvasRenderingContext2D, title: string, notes: BaseNotes): void {

        if (!notes._customNotes) return;

        this.renderLine(ctx);

        ctx.font = RendererKT21._headerFont;
        RenderText(ctx, title.toLocaleUpperCase(), this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererKT21._font;
        this._currentY += 2; // TODO: fix this kludge to align text and paragraph
        this._currentY = RenderParagraph(ctx, notes._customNotes, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }


    private renderNotesArray(ctx: CanvasRenderingContext2D, title: string, notes: BaseNotes[]): void {

        let count = 0;
        for (const note of notes) {
            if (note._customNotes) count++;
        }
        if (count == 0) return;
        this.renderLine(ctx);

        ctx.font = RendererKT21._headerFont;
        RenderText(ctx, title.toLocaleUpperCase(), this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        for (const note of notes) {
            const name = note.name() + ':';
            const desc = note._customNotes;

            if (!desc) continue;

            ctx.font = RendererKT21._headerFont;
            this._currentY += 2;
            RenderTextFull(ctx, name, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(name).width;

            ctx.font = RendererKT21._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, offsetX);
            this._currentY += 2;
        }
    }

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = RendererKT21._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }

    private renderTableHeader(ctx: CanvasRenderingContext2D, labels: string[], columnWidths: number[] | null, justifications: Justification[] | null) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = RendererKT21._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = RendererKT21._blackColor;
        ctx.font = RendererKT21._titleFont;
        var w = 50;
        if (labels) {
            ctx.font = RendererKT21._headerFont;
            for (let i = 0; i < labels.length; i++) {
                let justification = Justification.Center;
                if (columnWidths) w = columnWidths[i];
                if (justifications) justification = justifications[i];
                if (i == 0) RenderText(ctx, labels[i], x + RendererKT21._offset, this._currentY, w, height, Justification.Left);
                else RenderText(ctx, labels[i], x, this._currentY, w, height, justification);
                x += w;
            }
        }

        this._currentY += height;
    }

    private renderSpells(ctx: CanvasRenderingContext2D, spells: PsychicPower[], columnWidths: number[] | null): void {

        const height = 22;

        let i = 0;
        let w = 50;

        ctx.save();

        for (const spell of spells) {
            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = RendererKT21._blackColor;
            ctx.font = RendererKT21._font;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell.name().toString(), x + RendererKT21._offset, this._currentY, w, height, Justification.Left);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this._currentY += 4; // TODO: Fix this kludge to align text and paragraph
            ctx.font = RendererKT21._font;
            this._currentY = RenderParagraph(ctx, spell._effect, x, this._currentY, w - RendererKT21._offset, 0);
            this._currentY += 2;
            x += w;


            ctx.save();
            if (i % 2) ctx.fillStyle = RendererKT21._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: Weapons[], columnWidths: number[] | null): void {
        ctx.font = RendererKT21._font;

        const height = 22;

        ctx.save();

        let i = 0;
        let w = 50;
        for (const weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            let counter = 0;
            ctx.fillStyle = RendererKT21._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon.nameAndCosts(), x + RendererKT21._offset, this._currentY, w - RendererKT21._offset, height, RendererKT21._weaponJustifications[counter++]);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._attacks.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._skill.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._rules.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            if (weapon._criticalEffects) {
                this._currentY += 4; // TODO: fix this kludge to align text and the paragraph.
                this._currentY = RenderParagraph(ctx, weapon._criticalEffects, x, this._currentY, w - RendererKT21._offset, 0);
                this._currentY += 2;
            } else {
                this._currentY += height;
            }
            x += w;

            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2) ctx.fillStyle = RendererKT21._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderModel(ctx: CanvasRenderingContext2D, model: Operative, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = RendererKT21._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(this._currentX, this._currentY, this._maxWidth, height);

        ctx.fillStyle = RendererKT21._blackColor;
        ctx.font = RendererKT21._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model.name().toString(), x + RendererKT21._offset, this._currentY, w, height, Justification.Left);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._apl.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._groupActivations.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._defence.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._saves.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderAbilities(ctx: CanvasRenderingContext2D, unit: Operative): void {
        ctx.font = RendererKT21._titleFont;
        RenderText(ctx, "ABILITIES", this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        let rulesList = [...unit._rules.keys()];
        rulesList.sort(Compare)
        const rules = rulesList.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, rules, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;

        ctx.font = RendererKT21._boldFont;
        let keys = [...unit._abilities.keys()];
        keys.sort(Compare);

        for (const key of keys) {
            const content = key.toUpperCase() + ':';
            const desc = unit._abilities.get(key);

            ctx.font = RendererKT21._boldFont;
            this._currentY += 2;
            RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(content).width;

            ctx.font = RendererKT21._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, offsetX);
            this._currentY += 2;
        }
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: Operative): void {
        ctx.font = RendererKT21._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererKT21._font;
        const kwlist = [...unit._keywords];
        kwlist.sort(Compare);
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }

    private renderFactions(ctx: CanvasRenderingContext2D, unit: Operative): void {
        ctx.font = RendererKT21._titleFont;
        RenderText(ctx, "FACTIONS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererKT21._font;
        const kwlist = [...unit._factions];
        kwlist.sort(Compare);
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }

    private renderModelList(ctx: CanvasRenderingContext2D, models: Operative[]) {
        ctx.font = RendererKT21._titleFont;
        RenderText(ctx, "MODELS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererKT21._font;
        for (let model of models) {
            let text: string;
            text = model.nameAndGear();
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, text, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
            this._currentY += 2;
        }
    }

    private static _unitLabels = ["Operative", "M", "APL", "GA", "DF", "Save", "W"];
    private _unitLabelWidthsNormalized = [0.25, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
    private static _weaponLabels = ["WEAPONS", "A", "WS/BS", "D", "SR", "!"];
    private _weaponLabelWidthNormalized = [0.25, 0.05, 0.05, 0.05, 0.2, 0.2];
    private static _weaponJustifications = [Justification.Left, Justification.Center, Justification.Center, Justification.Center, Justification.Left, Justification.Left];

    private static _spellLabels = ["PSYCHIC POWER", "DETAILS"];
    private _spellLabelWidthNormalized = [0.25, 0.75];

    protected renderOperative(operative: Operative, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._currentX = xOffset + RendererKT21._margin;
        this._currentY = yOffset + RendererKT21._margin;
        this._maxWidth = canvas.width - this._currentX;
        this._maxHeight = Math.max(0, canvas.height - this._currentY);

        this.renderHeader(operative, ctx);

        ctx.fillStyle = RendererKT21._blackColor;

        let weapons: Weapons[] = [];
        let spells: PsychicPower[] = [];
        const unitLabelWidths: number[] = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });

        for (let weapon of operative._weapons) {
            weapons.push(weapon);
        }
        for (let spell of operative._psychicPowers) {
            spells.push(spell);
        }

        // Unique list of models
        const uniqueModels: Operative[] = [];
        const scrathModels: Map<string, Operative> = new Map();
        if (!scrathModels.has(operative.name())) {
            scrathModels.set(operative.name(), operative);
            uniqueModels.push(operative);
        }

        this.renderNotes(ctx, "Operative notes", operative);

        this.renderTableHeader(ctx, RendererKT21._unitLabels, unitLabelWidths, null);
        let i = 0;
        for (var model of uniqueModels) {
            this.renderModel(ctx, model, unitLabelWidths, i % 2);
            i++;
        }

        this.renderNotes(ctx, "Model notes", operative);

        // Unique list of weapons
        const uniqueWeapons: Weapons[] = [];
        const scratchMap: Map<string, Weapons> = new Map();
        for (const w of weapons) {
            if (!scratchMap.has(w.name())) {
                scratchMap.set(w.name(), w);
                uniqueWeapons.push(w);
            }
        }

        if (uniqueWeapons.length > 0) {
            const weaponLabelWidths: number[] = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererKT21._weaponLabels, weaponLabelWidths, RendererKT21._weaponJustifications);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }

        this.renderNotesArray(ctx, "Weapons notes", weapons);

        if (spells.length > 0) {
            const spellLabelWidths: number[] = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererKT21._spellLabels, spellLabelWidths, null);
            this.renderSpells(ctx, spells, spellLabelWidths);
        }

        this.renderNotesArray(ctx, "Spell notes", spells);

        if (operative._abilities.size > 0 || operative._rules.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderAbilities(ctx, operative);
        }

        /*
                if (operative._rules.size > 0) {
                    this.renderLine(ctx);
                    this._currentY += 2;
                    this.renderRules(ctx, operative);
                }
        */
        if (operative._factions.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderFactions(ctx, operative);
        }

        if (operative._keywords.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderKeywords(ctx, operative);
        }

        this.renderLine(ctx);
        this._currentY += 2;
        this.renderModelList(ctx, [operative]);

        this._currentY += 2;

        const totalHeight = this._currentY - (yOffset + RendererKT21._margin);
        const totalWidth = this._maxWidth;

        this.renderBorder(ctx, this._currentX, yOffset + RendererKT21._margin, totalWidth, totalHeight);

        return [this._maxWidth, this._currentY];
    }

    private renderHeader(unit: Operative, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = RendererKT21._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart + RendererKT21._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + RendererKT21._bevelSize);
        ctx.lineTo(xEnd - RendererKT21._bevelSize, yStart);
        ctx.lineTo(xStart + RendererKT21._bevelSize, yStart);
        ctx.closePath();
        ctx.fill();

        let imgX = xStart + 6;

        if (this._octagon) {

            // Operative battlefield role icon
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            const roleImg = this._specialisms.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart + 2 + 4, 24, 24);
            }

            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            // Equipment Points
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            RenderText(ctx, unit.costs().toString(), imgX, yStart + 2, 32, 32, Justification.Center);
        }

        // unit name
        let iters: number = 0;
        let title_size = 28;
        const title_x = imgX + 6;
        ctx.font = title_size + 'px ' + 'bold serif';
        const unitName = unit.name().toLocaleUpperCase();
        let check = ctx.measureText(unitName);
        const maxWidth = this._maxWidth - title_x;
        while (iters < 6 && check.width > maxWidth) {
            iters += 1;
            title_size -= 2;
            ctx.font = title_size + 'px ' + 'bold serif';
            check = ctx.measureText(unitName);
        }
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
        RenderText(ctx, unitName, title_x, yStart, maxWidth, titleHeight, Justification.Center);

        this._currentY += titleHeight;
    }

}
