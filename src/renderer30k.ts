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

import { Unit30k, UnitRole30k, UnitRoleToString30k, Model30k, Vehicle30k, Walker30k, Flyer30k, PsychicPower30k, Weapon30k, Roster30k, Psyker30k } from "./roster30k";
import { Renderer, Justification, RenderText, RenderTextFull, RenderParagraph, VertAlign, FixDPI } from "./renderer";

export class Renderer30k implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private static readonly _bevelSize = 15;
    private readonly _descriptionStartX = 190;
    private _descriptionWidth: number = 600;

    private _showWoundBoxes: boolean = false;

    private _roster: Roster30k | null = null;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;

    private _octagon: HTMLImageElement | null = null;

    private _roles: Map<UnitRole30k, HTMLImageElement | null> = new Map();

    private static readonly _blackColor = '#1d272a';
    private static readonly _grey1 = '#b3bbb5';
    private static readonly _greyLight = '#dde1df';
    private static readonly _fillColor = '#f6f6f6';

    private static readonly _titleFont = 'bold 14px sans-serif';
    private static readonly _headerFont = 'bold 14px sans-serif';
    private static readonly _font = '14px sans-serif';
    private static readonly _boldFont = 'bold 14px sans-serif';

    constructor(roster: Roster30k) {

        this._roster = roster;
        this._octagon = document.getElementById('octagon') as HTMLImageElement;

        this._roles.set(UnitRole30k.HQ, document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(UnitRole30k.TR, document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(UnitRole30k.EL, document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(UnitRole30k.FA, document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(UnitRole30k.HS, document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(UnitRole30k.FL, document.getElementById('role_fl') as HTMLImageElement);
        this._roles.set(UnitRole30k.DT, document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(UnitRole30k.FT, document.getElementById('role_ft') as HTMLImageElement);
        this._roles.set(UnitRole30k.LW, document.getElementById('role_lw') as HTMLImageElement);
    }

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void {

        if (this._roster == null) return;

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts)</h3>';
        }

        for (let force of this._roster._forces) {
            const forceTitle = document.createElement('div');
            if (forceTitle) {
                forceTitle.innerHTML = '<p>' + force._catalog + ' ' + force._name + '</p>';
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
            const headerInfo = [{ name: "NAME", w: '25%' }, { name: "ROLE", w: '20%' }, { name: "MODELS", w: '40%' }, { name: "POINTS", w: '15%' }];
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
                uname.innerHTML = unit._name;
                let role = document.createElement('td');
                role.innerHTML = UnitRoleToString30k[unit._role];
                let models = document.createElement('td');
                models.innerHTML = "";
                let mi = 0;
                // TODO: the list of models may not be unique, make the list unique and update counts accordingly.
                for (const model of unit._models) {
                    if (model._count > 1) {
                        models.innerHTML += model._count + " " + model._name;
                    }
                    else {
                        models.innerHTML += model._name;
                    }
                    mi++;
                    if (mi != unit._models.length) {
                        models.innerHTML += ",  "
                    }
                }
                let pts = document.createElement('td');
                pts.innerHTML = unit._points.toString();
                tr.appendChild(uname);
                tr.appendChild(role);
                tr.appendChild(models);
                tr.appendChild(pts);
                body.appendChild(tr);
            }

            if (force._rules.size > 0) {
                let allegianceRules = document.createElement('div');
                let rulesHeader = document.createElement('h3');
                allegianceRules.appendChild(rulesHeader);
                rulesHeader.textContent = force._catalog + " Allegiance Rules";
                for (let rule of force._rules) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = rule[0];
                    let desc = document.createElement('p');
                    desc.textContent = rule[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceRules.appendChild(row);
                }
            
                if (forces)
                    forces.appendChild(allegianceRules);
            }

            for (let unit of force._units) {
                let canvas = document.createElement('canvas') as HTMLCanvasElement;
                canvas.width = Renderer30k._res * 7.5;
                canvas.height = Renderer30k._res * 20;
                this._descriptionWidth = canvas.width - this._descriptionStartX - 10;

                FixDPI(canvas);
                const dims = this.renderUnit(unit, canvas, 0, 0);

                const border = 25;
                let finalCanvas = document.createElement('canvas') as HTMLCanvasElement;
                finalCanvas.width = dims[0] + border * 2;
                finalCanvas.height = dims[1] + border * 2;
                let finalCtx = finalCanvas.getContext('2d');
                finalCtx?.drawImage(canvas, border, border);
                if (forces) {
                    let canvasDiv = document.createElement('div');
                    canvasDiv.appendChild(finalCanvas);
                    forces.appendChild(canvasDiv);
                }

            }
        }
    }

    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = Renderer30k._blackColor;

        ctx.beginPath();
        ctx.moveTo(x, y + Renderer30k._bevelSize);
        ctx.lineTo(x, y + h - Renderer30k._bevelSize);
        ctx.lineTo(x + Renderer30k._bevelSize, y + h);
        ctx.lineTo(x + w - Renderer30k._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - Renderer30k._bevelSize);
        ctx.lineTo(x + w, y + Renderer30k._bevelSize);
        ctx.lineTo(x + w - Renderer30k._bevelSize, y);
        ctx.lineTo(x + Renderer30k._bevelSize, y);
        ctx.closePath();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = Renderer30k._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.moveTo(x, y + Renderer30k._bevelSize);
        ctx.lineTo(x, y + h - Renderer30k._bevelSize);
        ctx.lineTo(x + Renderer30k._bevelSize, y + h);
        ctx.lineTo(x + w - Renderer30k._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - Renderer30k._bevelSize);
        ctx.lineTo(x + w, y + Renderer30k._bevelSize);
        ctx.lineTo(x + w - Renderer30k._bevelSize, y);
        ctx.lineTo(x + Renderer30k._bevelSize, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    private renderWatermark(ctx: CanvasRenderingContext2D) {

    }

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = Renderer30k._blackColor;
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
        ctx.fillStyle = Renderer30k._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._titleFont;
        var w = 50;
        if (labels) {
            ctx.font = Renderer30k._headerFont;
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }

        this._currentY += height;
    }

    private renderPowers(ctx: CanvasRenderingContext2D, powers: PsychicPower30k[], columnWidths: number[] | null): void {
        ctx.font = Renderer30k._font;

        const height = 22;

        let i = 0;
        let w = 50;

        ctx.save();

        for (const power of powers) {
            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = Renderer30k._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, power._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, power._warpCharge.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, power._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this._currentY += 4;
            this._currentY = RenderParagraph(ctx, power._details, x, this._currentY, w, 0);
            this._currentY += 2;
            x += w;


            ctx.save();
            if (i % 2) ctx.fillStyle = Renderer30k._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: Weapon30k[], columnWidths: number[] | null): void {
        ctx.font = Renderer30k._font;

        const height = 22;

        ctx.save();

        let i = 0;
        let w = 50;
        for (const weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = Renderer30k._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._str.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._ap.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._type.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            this._currentY += height;
            x += w;

            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2) ctx.fillStyle = Renderer30k._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderModel(ctx: CanvasRenderingContext2D, model: Model30k, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = Renderer30k._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
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
        RenderText(ctx, model._initiative.toString(), x, this._currentY, w, height, Justification.Center);
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

    private renderVehicle(ctx: CanvasRenderingContext2D, model: Vehicle30k, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = Renderer30k._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._front.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._side.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._type.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderWalker(ctx: CanvasRenderingContext2D, model: Walker30k, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = Renderer30k._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
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
        RenderText(ctx, model._front.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._side.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._initiative.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._attacks.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._type.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderFlyer(ctx: CanvasRenderingContext2D, model: Flyer30k, columnWidths: number[] | null, bg: number): void {

        const height = 24;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = Renderer30k._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._front.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._side.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._type.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._role.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._pursuit.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, model._agility.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderAbilities(ctx: CanvasRenderingContext2D, unit: Unit30k): void {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "ABILITIES", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        for (let ab of unit._abilities) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];

            ctx.font = Renderer30k._boldFont;
            this._currentY += 2;
            RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(content).width;

            ctx.font = Renderer30k._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, offsetX);
            this._currentY += 2;
        }
    }

    private renderRules(ctx: CanvasRenderingContext2D, unit: Unit30k): void {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "RULES", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        for (let rule of unit._rules) {
            const content = rule[0].toUpperCase();
            const desc = rule[1];

            ctx.font = Renderer30k._boldFont;
            this._currentY += 2;
            RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(content).width;

            ctx.font = Renderer30k._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, offsetX);
            this._currentY += 2;
        }
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: Unit30k): void {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer30k._font;
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }

    private renderFactions(ctx: CanvasRenderingContext2D, unit: Unit30k): void {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "FACTIONS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer30k._font;
        const kwlist = [...unit._factions];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }

    private renderModelList(ctx: CanvasRenderingContext2D, models: Model30k[]) {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "MODELS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer30k._font;
        let modelList = "";
        let mi = 0;
        for (const model of models) {
            if (model._count > 1) {
                modelList += model._count + " " + model._name;
            }
            else {
                modelList += model._name;
            }
            mi++;
            if (mi != models.length) {
                modelList += ",  "
            }
        }

        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, modelList, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }

    private renderWoundBoxes(ctx: CanvasRenderingContext2D, models: Model30k[]) {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "WOUNDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        const woundBoxSize = 20;
        const boxMargin = 5;
        const unitNameStartX = this._currentX + this._descriptionStartX;
        const unitNameWidth = 200 - boxMargin;
        const boxStartX = unitNameStartX + unitNameWidth;

        ctx.save();

        for (let model of models) {
            if (model._wounds > 1) {

                let currentY = this._currentY;

                ctx.font = Renderer30k._font;
                ctx.fillStyle = Renderer30k._blackColor;

                this._currentY = RenderParagraph(ctx, model._name, unitNameStartX, this._currentY + (woundBoxSize - 14) / 2, unitNameWidth, 0);

                let x = this._currentX + boxStartX;
                ctx.strokeStyle = Renderer30k._blackColor;
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

    private static _unitLabels = ["MODEL", "WS", "BS", "S", "T", "W", "I", "A", "LD", "SAVE"];
    private _unitLabelWidthsNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077];

    private static _vehicleLabels = ["MODEL", "BS", "FRONT", "SIDE", "REAR", "HP", "TYPE"];
    private _vehicleLabelWidthsNormalized = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2];

    private static _walkerLabels = ["MODEL", "WS", "BS", "S", "FRONT", "SIDE", "REAR", "I", "A", "HP", "TYPE"];
    private _walkerLabelWidthsNormalized = [0.3, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.15];

    private static _flyerLabels = ["MODEL", "BS", "FRONT", "SIDE", "REAR", "HP", "TYPE", "ROLE", "PURSUIT", "AGILITY"];
    private _flyerLabelWidthsNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077];

    private static _weaponLabels = ["WEAPONS", "RANGE", "S", "AP", "TYPE"];
    private _weaponLabelWidthNormalized = [0.3, 0.1, 0.1, 0.1, 0.4];

    private static _spellLabels = ["PSYCHIC POWER", "WARP CHARGE", "RANGE", "DETAILS"];
    private _spellLabelWidthNormalized = [0.3, 0.1, 0.1, 0.5];

    protected renderUnit(unit: Unit30k, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._currentX = xOffset + Renderer30k._margin;
        this._currentY = yOffset + Renderer30k._margin;
        this._maxWidth = canvas.width - this._currentX;

        this.renderHeader(unit, ctx);

        ctx.fillStyle = Renderer30k._blackColor;

        let weapons: Weapon30k[] = [];
        let powers: PsychicPower30k[] = [];
        let psykers: Psyker30k[] = [];
        let models: Model30k[] = [];
        const unitLabelWidths: number[] = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        const vehicleLabelWidths: number[] = [];
        this._vehicleLabelWidthsNormalized.forEach(element => {
            vehicleLabelWidths.push(element * this._maxWidth);
        });
        const walkerLabelWidths: number[] = [];
        this._walkerLabelWidthsNormalized.forEach(element => {
            walkerLabelWidths.push(element * this._maxWidth);
        });
        const flyerLabelWidths: number[] = [];
        this._flyerLabelWidthsNormalized.forEach(element => {
            flyerLabelWidths.push(element * this._maxWidth);
        });

        for (var model of unit._models) {
            models.push(model);
            for (let weapon of model._weapons) {
                weapons.push(weapon);
            }
            for (let power of model._psychicPowers) {
                powers.push(power);
            }
            if (model._psyker) {
                psykers.push(model._psyker);
            }
        }

        // Unique list of models
        const uniqueModels: Model30k[] = [];
        const scrathModels: Map<string, Model30k> = new Map();
        for (const m of models) {
            if (!scrathModels.has(m._name)) {
                scrathModels.set(m._name, m);
                uniqueModels.push(m);
            }
        }

        if (uniqueModels.length > 0) {
            this.renderTableHeader(ctx, Renderer30k._unitLabels, unitLabelWidths);
            let i = 0;
            for (var model of uniqueModels) {
                this.renderModel(ctx, model, unitLabelWidths, i % 2);
                i++;
            }
        }

        if (unit._vehicles.length > 0) {
            this.renderTableHeader(ctx, Renderer30k._vehicleLabels, vehicleLabelWidths);
            let i = 0;
            for (var vehicle of unit._vehicles) {
                this.renderVehicle(ctx, vehicle, vehicleLabelWidths, i % 2);
                i++;
            }
        }
        if (unit._walkers.length > 0) {
            this.renderTableHeader(ctx, Renderer30k._walkerLabels, walkerLabelWidths);
            let i = 0;
            for (var walker of unit._walkers) {
                this.renderWalker(ctx, walker, walkerLabelWidths, i % 2);
                i++;
            }
        }
        if (unit._flyers.length > 0) {
            this.renderTableHeader(ctx, Renderer30k._flyerLabels, flyerLabelWidths);
            let i = 0;
            for (var flyer of unit._flyers) {
                this.renderFlyer(ctx, flyer, flyerLabelWidths, i % 2);
                i++;
            }
        }

        // Unique list of weapons
        const uniqueWeapons: Weapon30k[] = [];
        const scratchMap: Map<string, Weapon30k> = new Map();
        for (const w of weapons) {
            if (!scratchMap.has(w._name)) {
                scratchMap.set(w._name, w);
                uniqueWeapons.push(w);
            }
        }

        if (uniqueWeapons.length > 0) {
            const weaponLabelWidths: number[] = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer30k._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }

        if (powers.length > 0) {
            const spellLabelWidths: number[] = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer30k._spellLabels, spellLabelWidths);
            this.renderPowers(ctx, powers, spellLabelWidths);
        }

        if (unit._abilities.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderAbilities(ctx, unit);
        }

        if (psykers.length > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderPsykers(ctx, psykers);
        }

        if (unit._rules.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderRules(ctx, unit);
        }

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
            this.renderModelList(ctx, uniqueModels);
        }


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

        const totalHeight = this._currentY - (yOffset + Renderer30k._margin);
        const totalWidth = this._maxWidth;

        this.renderBorder(ctx, this._currentX, yOffset + Renderer30k._margin, totalWidth, totalHeight);
        this.renderWatermark(ctx);

        return [this._maxWidth, this._currentY];
    }

    private renderHeader(unit: Unit30k, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = Renderer30k._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart + Renderer30k._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + Renderer30k._bevelSize);
        ctx.lineTo(xEnd - Renderer30k._bevelSize, yStart);
        ctx.lineTo(xStart + Renderer30k._bevelSize, yStart);
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
        const unitName = unit._name.toLocaleUpperCase();
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

    private renderPsykers(ctx: CanvasRenderingContext2D, psykers: Psyker30k[]): void {
        ctx.font = Renderer30k._titleFont;
        RenderText(ctx, "PSYKERS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = Renderer30k._font;
        this._currentY += 2;
        for (let psyker of psykers) {
            this._currentY = RenderParagraph(ctx, "MASTERY LEVEL: " + psyker._masteryLevel, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
            this._currentY += 2;

            this._currentY = RenderParagraph(ctx, "DISCIPLINES: " + psyker._disciplines, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
            this._currentY += 2;
        }
    }
};
