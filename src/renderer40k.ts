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

import {BaseNotes, Compare, Explosion, Model, PsychicPower, Psyker, Roster40k, Unit, UnitRole, UnitRoleToString, Weapon} from "./roster40k";
import {Justification, Renderer, RenderParagraph, RenderText, RenderTextFull, FixDPI, VertAlign} from "./renderer";

export class Renderer40k implements Renderer {

    public static readonly _res: number = 144; // original is 144
    public static readonly _margin: number = 0;

    private static readonly _bevelSize = 15;
    private readonly _descriptionStartX = 140;
    private _descriptionWidth: number = 600;

    private _showWoundBoxes: boolean = false;

    private _roster: Roster40k | null = null;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    private _octagon: HTMLImageElement | null = null;

    private _roles: Map<UnitRole, HTMLImageElement | null> = new Map();

    private static readonly _blackColor = '#1d272a';
    private static readonly _grey1 = '#b3bbb5';
    private static readonly _greyLight = '#dde1df';
    private static readonly _fillColor = '#f6f6f6';
    private static readonly _offset: number = 20;

    private static readonly _titleFont = 'bold 14px sans-serif';
    private static readonly _headerFont = 'bold 14px sans-serif';
    private static readonly _font = '14px sans-serif';
    private static readonly _boldFont = 'bold 14px sans-serif';

    constructor(roster: Roster40k) {

        this._roster = roster;
        this._octagon = document.getElementById('octagon') as HTMLImageElement;

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
            title.innerHTML = '<h3>' + this._roster.name() + ' (' + this._roster._points + ' pts, ' + this._roster._powerLevel + ' PL, ' + this._roster._commandPoints + ' CP)</h3>';
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

            const table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-sm');
            table.classList.add('table-striped');
            const thead = document.createElement('thead');
            table.appendChild(thead);
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            thead.appendChild(tr);
            const headerInfo = [{ name: "NAME", w: '20%' }, { name: "ROLE", w: '15%' }, { name: "MODELS", w: '55%' }, { name: "POINTS", w: '5%' }, { name: "POWER", w: '5%' }];
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
            for (let unit of force._units) {
                let tr = document.createElement('tr');
                let uname = document.createElement('td');
                uname.innerHTML = unit.name();
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
                pts.innerHTML = unit._points.toString();
                let pwr = document.createElement('td');
                pwr.innerHTML = unit._powerLevel.toString();
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

            let prevUnit: Unit | null = null;
            for (let unit of force._units) {
                let canvas = document.createElement('canvas') as HTMLCanvasElement;
                canvas.width = Renderer40k._res * 7.5;
                canvas.height = Renderer40k._res * 12;
                canvas.style.width = canvas.width.toString();
                canvas.style.height = canvas.height.toString();

                this._descriptionWidth = canvas.width - this._descriptionStartX - 10;

                if (unit.equal(prevUnit)) {
                    continue;
                }

                const dims = this.renderUnit(unit, canvas, 0, 0);
                prevUnit = unit;

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

    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = Renderer40k._blackColor;

        ctx.beginPath();
        ctx.moveTo(x, y + Renderer40k._bevelSize);
        ctx.lineTo(x, y + h - Renderer40k._bevelSize);
        ctx.lineTo(x + Renderer40k._bevelSize, y + h);
        ctx.lineTo(x + w - Renderer40k._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - Renderer40k._bevelSize);
        ctx.lineTo(x + w, y + Renderer40k._bevelSize);
        ctx.lineTo(x + w - Renderer40k._bevelSize, y);
        ctx.lineTo(x + Renderer40k._bevelSize, y);
        ctx.closePath();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = Renderer40k._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.moveTo(x, y + Renderer40k._bevelSize);
        ctx.lineTo(x, y + h - Renderer40k._bevelSize);
        ctx.lineTo(x + Renderer40k._bevelSize, y + h);
        ctx.lineTo(x + w - Renderer40k._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - Renderer40k._bevelSize);
        ctx.lineTo(x + w, y + Renderer40k._bevelSize);
        ctx.lineTo(x + w - Renderer40k._bevelSize, y);
        ctx.lineTo(x + Renderer40k._bevelSize, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    private renderWatermark(ctx: CanvasRenderingContext2D) {

    }

    private renderNotes(ctx: CanvasRenderingContext2D, title: string,  notes: BaseNotes): void {

        if (!notes._customNotes) return;

        this.renderLine(ctx);

        ctx.font = Renderer40k._headerFont;
        RenderText(ctx, title.toLocaleUpperCase(), this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        this._currentY += 2; // TODO: fix this kludge to align text and paragraph
        this._currentY = RenderParagraph(ctx, notes._customNotes, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
        this._currentY += 2;
    }

    private renderNotesArray(ctx: CanvasRenderingContext2D, title: string,  notes: BaseNotes[]): void {

        let count = 0;
        for (const note of notes) {
            if (note._customNotes) count++;
        }
        if (count == 0) return;
        this.renderLine(ctx);

        ctx.font = Renderer40k._headerFont;
        RenderText(ctx, title.toLocaleUpperCase(), this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        for (const note of notes) {
            const name = note.name() + ':';
            const desc = note._customNotes;

            if (!desc) continue;

            ctx.font = Renderer40k._headerFont;
            this._currentY += 2;
            RenderTextFull(ctx, name, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(name).width;

            ctx.font = Renderer40k._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, offsetX);
            this._currentY += 2;
        }
    }

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = Renderer40k._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }

    private renderTableHeader(ctx: CanvasRenderingContext2D, labels: string[], columnWidths: number[] | null) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = Renderer40k._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = Renderer40k._blackColor;
        ctx.font = Renderer40k._titleFont;
        var w = 50;
        if (labels) {
            ctx.font = Renderer40k._headerFont;
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                if (i == 0) RenderText(ctx, labels[i], x + Renderer40k._offset, this._currentY, w, height, Justification.Left);
                else RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
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

            ctx.fillStyle = Renderer40k._blackColor;
            ctx.font = Renderer40k._font;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell.name().toString(), x + Renderer40k._offset, this._currentY, w, height, Justification.Left);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell._manifest.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this._currentY += 4; // TODO: Fix this kludge to align text and paragraph
            ctx.font = Renderer40k._font;
            this._currentY = RenderParagraph(ctx, spell._details, x, this._currentY, w - Renderer40k._offset, 0);
            this._currentY += 2;
            x += w;


            ctx.save();
            if (i % 2) ctx.fillStyle = Renderer40k._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderExplosion(ctx: CanvasRenderingContext2D, explosions: Explosion[], columnWidths: number[] | null): void {
        ctx.font = Renderer40k._font;

        const height = 22;

        let i = 0;
        let w = 50;

        for (const expl of explosions) {
            let ci = 0;
            let x = this._currentX;

            if (i % 2) ctx.fillStyle = Renderer40k._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, this._currentY, this._maxWidth, height);
            i++;

            ctx.fillStyle = Renderer40k._blackColor;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, expl.name(), x + Renderer40k._offset, this._currentY, w, height, Justification.Left);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, expl._diceRoll, x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, expl._distance, x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, expl._mortalWounds, x, this._currentY, w, height, Justification.Center);
            x += w;

            this._currentY += height;
        }
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: Weapon[], columnWidths: number[] | null): void {
        ctx.font = Renderer40k._font;

        const height = 22;

        ctx.save();

        let i = 0;
        let w = 50;
        for (const weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = Renderer40k._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon.name().toString(), x + Renderer40k._offset, this._currentY, w, height, Justification.Left);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._type.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._str.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._ap.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            if (weapon._abilities) {
                this._currentY += 4; // TODO: fix this kludge to align text and the paragraph.
                this._currentY = RenderParagraph(ctx, weapon._abilities, x, this._currentY, w - Renderer40k._offset, 0);
                this._currentY += 2;
            }
            else {
                this._currentY += height;
            }
            x += w;

            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2) ctx.fillStyle = Renderer40k._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderModel(ctx: CanvasRenderingContext2D, model: Model, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = Renderer40k._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(this._currentX, this._currentY, this._maxWidth, height);

        ctx.fillStyle = Renderer40k._blackColor;
        ctx.font = Renderer40k._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model.name().toString(), x + Renderer40k._offset, this._currentY, w, height, Justification.Left);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._ws.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._str.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._toughness.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._attacks.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._leadership.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._save.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderAbilities(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "ABILITIES", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._boldFont;
        let keys = [...unit._abilities.keys()];
        keys.sort(Compare);

        let rulesList = [...unit._rules.keys()];
        rulesList.sort(Compare)
        const rules = rulesList.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, rules, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
        this._currentY += 2;

        for (const key of keys) {
            const content = key.toUpperCase() + ':';
            const desc = unit._abilities.get(key);

            ctx.font = Renderer40k._boldFont;
            this._currentY += 2;
            RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(content).width;

            ctx.font = Renderer40k._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, offsetX);
            this._currentY += 2;
        }
    }

    private renderRules(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "RULES", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        for (let rule of unit._rules) {
            const content = rule[0].toUpperCase();
            const desc = rule[1];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, content + ": " + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
            this._currentY += 4;
        }
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        const kwlist = [...unit._keywords];
        kwlist.sort(Compare)
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
        this._currentY += 2;
    }

    private renderFactions(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "FACTIONS", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        const kwlist = [...unit._factions];
        kwlist.sort(Compare)
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
        this._currentY += 2;
    }

    private renderWoundTable(ctx: CanvasRenderingContext2D, unit: Unit, columnWidths: number[] | null): void {
        const height = 22;

        let w = 50;

        let firstRow = true;
        for (let tracker of unit._woundTracker) {

            if (firstRow && (unit._woundTracker.length == 4)) {
                // Skip column labels
                firstRow = false;
                continue;
            }

            let x = this._currentX;
            let ci = 0;

            ctx.fillStyle = Renderer40k._greyLight;
            ctx.fillRect(x, this._currentY, this._maxWidth, height);

            ctx.fillStyle = Renderer40k._blackColor;
            ctx.font = Renderer40k._font;
            if (columnWidths) w = columnWidths[ci++];

            //RenderText(ctx, tracker.name(), x, this._currentY, w, height, Justification.Center);
            x += w;

            for (let attr of tracker._table) {
                if (columnWidths) w = columnWidths[ci++];
                RenderText(ctx, attr[1], x, this._currentY, w, height, Justification.Center);
                x += w;
            }

            this._currentY += height;
        }
    }

    private renderModelList(ctx: CanvasRenderingContext2D, models: Model[]) {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "MODELS", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        for (let model of models) {
            let text: string;
            if (model._count > 1) {
                text = model._count + "x " + model.nameAndGear();
            }
            else {
                text = model.nameAndGear();
            }
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, text, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
            this._currentY += 2;
        }
    }

    private renderWoundBoxes(ctx: CanvasRenderingContext2D, models: Model[]) {

        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "WOUNDS", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        const woundBoxSize = 20;
        const boxMargin = 5;
        const unitNameStartX = this._currentX + this._descriptionStartX;
        const unitNameWidth = 200 - boxMargin;
        const boxStartX = unitNameStartX + unitNameWidth;

        ctx.save();

        for (let model of models) {
            if (model._wounds > 1) {

                let currentY = this._currentY;

                ctx.font = Renderer40k._font;
                ctx.fillStyle = Renderer40k._blackColor;

                this._currentY = RenderParagraph(ctx, model._name, unitNameStartX, this._currentY + (woundBoxSize - 14) / 2, unitNameWidth - Renderer40k._offset, 0);

                let x = this._currentX + boxStartX;
                ctx.strokeStyle = Renderer40k._blackColor;
                ctx.fillStyle = '#ffffff';
                for (let w = 0; w < model._wounds; w++) {
                    if (w % 15 == 0 && w != 0) {
                        currentY += woundBoxSize + boxMargin;
                        x = this._currentX + boxStartX;
                    }
                    ctx.fillRect(x, currentY, woundBoxSize, woundBoxSize);
                    ctx.strokeRect(x, currentY, woundBoxSize, woundBoxSize);
                    x += woundBoxSize + boxMargin;
                }
                currentY += woundBoxSize + boxMargin;
                this._currentY = Math.max(this._currentY, currentY);
            }
        }
        ctx.restore();
    }

    private static _unitLabels = ["MODEL", "M", "WS", "BS", "S", "T", "W", "A", "LD", "SAVE"];
    private _unitLabelWidthsNormalized = [0.25, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
    private static _weaponLabels = ["WEAPONS", "RANGE", "TYPE", "S", "AP", "D", "ABILITIES"];
    private _weaponLabelWidthNormalized = [0.25, 0.05, 0.1, 0.05, 0.05, 0.05, 0.45];

    private static _spellLabels = ["PSYCHIC POWER", "MANIFEST", "RANGE", "DETAILS"];
    private _spellLabelWidthNormalized = [0.25, 0.05, 0.1, 0.60];

    private static _explosionLabels = ["EXPLOSION", "DICE ROLL", "DISTANCE", "MORTAL WOUNDS"];
    private _explosionLabelWidthNormalized = [0.2, 0.10, 0.10, 0.10];

    private static _trackerLabels = ["WOUND TRACK", "REMAINING W", "ATTRIBUTE", "ATTRIBUTE", "ATTRIBUTE"];
    private _trackerLabelWidth = [0.2, 0.15, 0.1, 0.1, 0.1];

    protected renderUnit(unit: Unit, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._currentX = xOffset + Renderer40k._margin;
        this._currentY = yOffset + Renderer40k._margin;
        this._maxWidth = canvas.width - this._currentX;
        this._maxHeight = Math.max(0, canvas.height - this._currentY);

        this.renderHeader(unit, ctx);

        ctx.fillStyle = Renderer40k._blackColor;

        let weapons: Weapon[] = [];
        let spells: PsychicPower[] = [];
        let explosions: Explosion[] = [];
        let psykers: Psyker[] = [];
        let models: Model[] = [];
        const unitLabelWidths: number[] = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });

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

        this.renderNotes(ctx, "Unit notes", unit);

        this.renderTableHeader(ctx, Renderer40k._unitLabels, unitLabelWidths);
        let i = 0;
        for (var model of uniqueModels) {
            this.renderModel(ctx, model, unitLabelWidths, i % 2);
            i++;
        }

        this.renderNotesArray(ctx, "Model notes", models);

        if (unit._woundTracker.length > 0) {
          this._currentY += 2;
          this.renderLine(ctx);
          const trackerLabelWidths: number[] = [];
          this._trackerLabelWidth.forEach(element => {
              trackerLabelWidths.push(element * this._maxWidth);
          });

          let labels = Renderer40k._trackerLabels;

          // Determine wound table headers.
          if (unit._woundTracker.length == 4) {
              // Use first entry in table as labels.
              let i = 1;
              // TODO: Grrrh some tables put the column labels at the end.  Deal with this.
              for (let key of unit._woundTracker[0]._table.values()) {
                  labels[i++] = key;
              }
          }
          else if (unit._woundTracker.length == 3) {
              // Use keys as labels.
              let i = 1;
              for (let key of unit._woundTracker[0]._table.keys()) {
                  labels[i++] = key;
              }
          }
          this.renderTableHeader(ctx, labels, trackerLabelWidths);
          this.renderWoundTable(ctx, unit, trackerLabelWidths);
      }

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
            const weaponLabelWidths: number[] = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer40k._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }

        this.renderNotesArray(ctx, "Weapon notes", weapons);

        if (spells.length > 0) {
            const spellLabelWidths: number[] = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer40k._spellLabels, spellLabelWidths);
            this.renderSpells(ctx, spells, spellLabelWidths);
        }

        this.renderNotesArray(ctx, "Spell notes", spells);

        if (psykers.length > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderPsykers(ctx, psykers);
        }

        this.renderNotesArray(ctx, "Psyker notes", psykers);


        if (unit._abilities.size > 0 || unit._rules.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderAbilities(ctx, unit);
        }

        /*
                if (unit._rules.size > 0) {
                    this.renderLine(ctx);
                    this._currentY += 2;
                    this.renderRules(ctx, unit);
                }
        */
        if (unit._factions.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderFactions(ctx, unit);
        }

        if (unit._keywords.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderKeywords(ctx, unit);
        }

        if (unit._models.length > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderModelList(ctx, unit._models);
        }

        if (explosions.length > 0) {
            this._currentY += 2;
            this.renderLine(ctx);
            const explLabelWidths: number[] = [];
            this._explosionLabelWidthNormalized.forEach(element => {
                explLabelWidths.push(element * this._maxWidth);
            });
            this.renderTableHeader(ctx, Renderer40k._explosionLabels, explLabelWidths);
            this.renderExplosion(ctx, explosions, explLabelWidths);
        }

        this.renderNotesArray(ctx, "Explosion notes", explosions);

        if (this._showWoundBoxes) {
            // wound tracker boxes
            let hasTracks = false;
            for (let model of unit._models) {
                if (model._wounds > 2) { hasTracks = true; }
            }
            if (hasTracks) {
                this.renderLine(ctx);
                this._currentY += 5;
                this.renderWoundBoxes(ctx, unit._models);
            }
        }
        this._currentY += 2;

        const totalHeight = this._currentY - (yOffset + Renderer40k._margin);
        const totalWidth = this._maxWidth;

        this.renderBorder(ctx, this._currentX, yOffset + Renderer40k._margin, totalWidth, totalHeight);
        this.renderWatermark(ctx);

        return [this._maxWidth, this._currentY];
    }

    private renderHeader(unit: Unit, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = Renderer40k._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart + Renderer40k._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + Renderer40k._bevelSize);
        ctx.lineTo(xEnd - Renderer40k._bevelSize, yStart);
        ctx.lineTo(xStart + Renderer40k._bevelSize, yStart);
        ctx.closePath();
        ctx.fill();

        let imgX = xStart + 6;

        if (this._octagon) {

            // Unit battlefield role icon
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            const roleImg = this._roles.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart + 2 + 4, 24, 24);
            }

            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            // Power level icon
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            RenderText(ctx, unit._powerLevel.toString(), imgX, yStart + 2, 32, 32, Justification.Center);

            // Points icon
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            RenderText(ctx, unit._points.toString(), imgX, yStart + 2, 32, 32, Justification.Center);
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

    private renderPsykers(ctx: CanvasRenderingContext2D, psykers: Psyker[]): void {
        ctx.font = Renderer40k._titleFont;
        RenderText(ctx, "PSYKERS", this._currentX + Renderer40k._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer40k._font;
        this._currentY += 2;
        for (let psyker of psykers) {

            let text = "CAST: " + psyker._cast + ", DENY: " + psyker._deny + ", POWERS KNOWN: " + psyker._powers;

            if (psyker._other) {
                text += ", OTHER: " + psyker._other;
            }

            this._currentY = RenderParagraph(ctx, text, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - Renderer40k._offset, 0);
            this._currentY += 2;
        }
    }
};
