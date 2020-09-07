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

import { WarcryUnit, WarcryForce, WarcryWeapon, WarcryUnitRoleToString, RosterWarcry } from "./rosterWarcry";
import { Renderer, Justification, RenderText, RenderParagraph} from "./renderer";

export class RendererWarcry implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private _roster: RosterWarcry|null = null;

    private static readonly _bevelSize = 15;
    private static readonly _blackColor = '#1d272a';
    private static readonly _grey1 = '#b3bbb5';
    private static readonly _greyLight = '#dde1df';
    private static readonly _fillColor = '#f6f6f6';

    private static readonly _titleFont = 'bold 14px sans-serif';
    private static readonly _headerFont = 'bold 14px sans-serif';
    private static readonly _font = '14px sans-serif';
    private static readonly _boldFont = 'bold 14px sans-serif';

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    private static _unitLabels = ["UNIT", "MOVE", "WOUNDS", "TOUGHNESS"];
    private _unitLabelWidthsNormalized = [0.4, 0.15, 0.15, 0.15];
    private static _weaponLabels = ["WEAPON", "RANGE", "ATTACKS", "STRENGTH", "DAMAGE"];
    private _weaponLabelWidthNormalized = [0.4, 0.15, 0.15, 0.15, 0.15];

    constructor(roster: RosterWarcry) {
        this._roster = roster;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {
        if (this._roster == null) {
            return;
        }

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts</h3>';
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
            const headerInfo = [{ name: "NAME", w: '35%'}, {name:"ROLE", w:'25%'}, {name:"POINTS", w:'15%'}];
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
              role.innerHTML = WarcryUnitRoleToString[unit._role];
              let pts = document.createElement('td');
              pts.innerHTML = unit._points.toString();
              tr.appendChild(uname);
              tr.appendChild(role);
              tr.appendChild(pts);
              body.appendChild(tr);    
            }

            let allegianceAbilities = document.createElement('div');
            if (force._allegiance._rules.size > 0) {
                let abilityHeader = document.createElement('h3');
                allegianceAbilities.appendChild(abilityHeader);
                abilityHeader.textContent = force._allegiance._name + " Abilities";
                for (let trait of force._allegiance._rules) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = trait[0];
                    let desc = document.createElement('p');
                    desc.textContent = trait[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (forces)
                forces.appendChild(allegianceAbilities);

            for (let unit of force._units) {
                let canvas = document.createElement('canvas') as HTMLCanvasElement;
                canvas.width = RendererWarcry._res * 7.5;
                canvas.height = RendererWarcry._res * 12;
                
                const dims = this.renderUnit(unit, canvas, 0, 0);
    
                const border = 25;
                let finalCanvas = document.createElement('canvas') as HTMLCanvasElement;
                finalCanvas.width = dims[0] + border * 2;
                finalCanvas.height = dims[1] + border * 2;
                let finalCtx = finalCanvas.getContext('2d');
                finalCtx?.drawImage(canvas, border, border);
                if (forces) 
                    forces.appendChild(finalCanvas);
            }                
        }
    }

    protected renderUnit(unit: WarcryUnit, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._currentX = xOffset + RendererWarcry._margin;
        this._currentY = yOffset + RendererWarcry._margin;
        this._maxWidth = canvas.width - this._currentX;
        this._maxHeight = Math.max(0, canvas.height - this._currentY);

        this.renderHeader(unit, ctx);

        const unitLabelWidths: number[] = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        this.renderTableHeader(ctx, RendererWarcry._unitLabels, unitLabelWidths);
        this.renderUnitStats(ctx, unit, unitLabelWidths, 0);

        const weaponLabelWidths: number[] = [];
        this._weaponLabelWidthNormalized.forEach(element => {
            weaponLabelWidths.push(element * this._maxWidth);
        });
        this.renderLine(ctx);
        this.renderTableHeader(ctx, RendererWarcry._weaponLabels, weaponLabelWidths);
        this.renderWeapons(ctx, unit._weapons, weaponLabelWidths);
        
        if (unit._keywords.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderKeywords(ctx, unit);
        }

        const totalHeight = this._currentY - (yOffset + RendererWarcry._margin);
        const totalWidth = this._maxWidth;

        this.renderBorder(ctx, this._currentX, yOffset + RendererWarcry._margin, totalWidth, totalHeight);

        return [this._maxWidth, this._currentY];
    }

    private renderHeader(unit: WarcryUnit, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = RendererWarcry._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart + RendererWarcry._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + RendererWarcry._bevelSize);
        ctx.lineTo(xEnd - RendererWarcry._bevelSize, yStart);
        ctx.lineTo(xStart + RendererWarcry._bevelSize, yStart);
        ctx.closePath();
        ctx.fill();

        let imgX = xStart + 6;

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

    private renderTableHeader(ctx: CanvasRenderingContext2D, labels: string[], columnWidths: number[] | null) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = RendererWarcry._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = RendererWarcry._blackColor;
        var w = 50;
        if (labels) {
            ctx.font = RendererWarcry._headerFont;
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }

        this._currentY += height;
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: WarcryUnit): void {
        ctx.font = RendererWarcry._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererWarcry._font;
        const kwlist = [...unit._keywords]; 
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY = RenderParagraph(ctx, kw, this._currentX + 190, this._currentY, 500, 0);

        this._currentY += 4;
    }

    private renderUnitStats(ctx: CanvasRenderingContext2D, unit: WarcryUnit, columnWidths: number[] | null, bg: number): void {

        const height = 22;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = RendererWarcry._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = RendererWarcry._blackColor;
        ctx.font = RendererWarcry._font;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, unit._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, unit._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, unit._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, unit._toughness.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: WarcryWeapon[], columnWidths: number[] | null): void {
        ctx.font = RendererWarcry._font;

        const height = 22;

        ctx.save();

        let i = 0;
        let w = 50;
        for (const weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = RendererWarcry._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._attacks.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._strength.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._damage, x, this._currentY, w, height, Justification.Center);
            x += w;

            this._currentY += height;

            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2) ctx.fillStyle = RendererWarcry._greyLight;
            else ctx.fillStyle =  '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = RendererWarcry._blackColor;

        ctx.beginPath();
        ctx.moveTo(x, y + RendererWarcry._bevelSize);
        ctx.lineTo(x, y + h - RendererWarcry._bevelSize);
        ctx.lineTo(x + RendererWarcry._bevelSize, y + h);
        ctx.lineTo(x + w - RendererWarcry._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererWarcry._bevelSize);
        ctx.lineTo(x + w, y + RendererWarcry._bevelSize);
        ctx.lineTo(x + w - RendererWarcry._bevelSize, y);
        ctx.lineTo(x + RendererWarcry._bevelSize, y);
        ctx.closePath();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = RendererWarcry._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.moveTo(x, y + RendererWarcry._bevelSize);
        ctx.lineTo(x, y + h - RendererWarcry._bevelSize);
        ctx.lineTo(x + RendererWarcry._bevelSize, y + h);
        ctx.lineTo(x + w - RendererWarcry._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererWarcry._bevelSize);
        ctx.lineTo(x + w, y + RendererWarcry._bevelSize);
        ctx.lineTo(x + w - RendererWarcry._bevelSize, y);
        ctx.lineTo(x + RendererWarcry._bevelSize, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = RendererWarcry._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }

}