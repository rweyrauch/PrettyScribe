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

import { AoSUnit, AoSUnitRole, AoSUnitRoleToString, AoSWeapon, RosterAoS, AoSSpell, AoSPrayer } from "./rosterAoS";
import { Renderer, Justification, RenderText, RenderParagraph, RenderTextFull, VertAlign} from "./renderer";

export class RendererAoS implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private static readonly _bevelSize = 15;
    private readonly _descriptionStartX = 190;
    private _descriptionWidth: number = 600;

    private _statsWheel: HTMLImageElement | null = null;

    private _roster: RosterAoS|null = null;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    private static readonly _blackColor = '#1d272a';
    private static readonly _grey1 = '#b3bbb5';
    private static readonly _greyLight = '#dde1df';
    private static readonly _fillColor = '#f6f6f6';

    private static readonly _titleFont = 'bold 14px sans-serif';
    private static readonly _headerFont = 'bold 14px sans-serif';
    private static readonly _font = '14px sans-serif';
    private static readonly _boldFont = 'bold 14px sans-serif';

    constructor(roster: RosterAoS) {
        this._roster = roster;

        this._statsWheel = document.getElementById('aos_stats') as HTMLImageElement;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {
        if (this._roster == null) {
            return;
        }

        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts, ' + this._roster._commandPoints + ' CP)</h3>';
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
            const headerInfo = [{ name: "NAME", w: '35%'}, {name:"ROLE", w:'25%'}, {name:"MODELS", w:'25%'}, {name:"POINTS", w:'15%'}];
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
              role.innerHTML = AoSUnitRoleToString[unit._role];
              let models = document.createElement('td');
              models.innerHTML = "";
              let pts = document.createElement('td');
              pts.innerHTML = unit._points.toString();
              tr.appendChild(uname);
              tr.appendChild(role);
              tr.appendChild(models);
              tr.appendChild(pts);
              body.appendChild(tr);    
            }

            let allegianceAbilities = document.createElement('div');
            if (force._allegiance._commandAbilities.size > 0) {
                let allegianceHeader = document.createElement('h3');
                allegianceAbilities.appendChild(allegianceHeader);
                allegianceHeader.textContent = force._allegiance._name + " Allegiance Abilities";
                for (let command of force._allegiance._commandAbilities) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = command[0];
                    let desc = document.createElement('p');
                    desc.textContent = command[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (force._allegiance._battleTraits.size > 0) {
                let traitHeader = document.createElement('h3');
                allegianceAbilities.appendChild(traitHeader);
                traitHeader.textContent = force._allegiance._name + " Allegiance Battle Traits";
                for (let trait of force._allegiance._battleTraits) {
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

            if (force._grandStrategy && force._grandStrategy._name != "") {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Grand Strategy";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = force._grandStrategy._name;
                let desc = document.createElement('p');
                desc.textContent = force._grandStrategy._description;
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            if (force._triumph && force._triumph._name != "") {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Triumph";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = force._triumph._name;
                let desc = document.createElement('p');
                desc.textContent = force._triumph._description;
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);
            }

            for (let rule of force._rules) {
                let header = document.createElement('h3');
                allegianceAbilities.appendChild(header);
                header.textContent = "Rules";
                let row = document.createElement('div');
                let name = document.createElement('h4');
                name.textContent = rule[0];
                let desc = document.createElement('p');
                desc.textContent = rule[1];
                row.appendChild(name);
                row.appendChild(desc);
                allegianceAbilities.appendChild(row);               
            }

            for (let battalion of force._battalions) {
                let battalionHeader = document.createElement('h3');
                allegianceAbilities.appendChild(battalionHeader);
                battalionHeader.textContent = battalion._name;
                for (let ability of battalion._abilities) {
                    let row = document.createElement('div');
                    let name = document.createElement('h4');
                    name.textContent = ability[0];
                    let desc = document.createElement('p');
                    desc.textContent = ability[1];
                    row.appendChild(name);
                    row.appendChild(desc);
                    allegianceAbilities.appendChild(row);
                }
            }

            if (forces)
                forces.appendChild(allegianceAbilities);

            let prevUnit: AoSUnit | null = null;
            for (let unit of force._units) {
                let canvas = document.createElement('canvas') as HTMLCanvasElement;
                canvas.width = RendererAoS._res * 7.5;
                canvas.height = RendererAoS._res * 12;
                
                this._descriptionWidth = canvas.width - this._descriptionStartX - 10;

                if (unit.equal(prevUnit)) {
                    continue;
                }

                const dims = this.renderUnit(unit, canvas, 0, 0);
                prevUnit = unit;
  
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

    protected renderUnit(unit: AoSUnit, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._currentX = xOffset + RendererAoS._margin;
        this._currentY = yOffset + RendererAoS._margin;
        this._maxWidth = canvas.width - this._currentX;
        this._maxHeight = Math.max(0, canvas.height - this._currentY);

        this.renderHeader(unit, ctx);

        if (unit._role == AoSUnitRole.MALIGN_SORCERY) {

        }
        else if (unit._role == AoSUnitRole.SCENERY) {

        }
        else if (unit._role == AoSUnitRole.REALM) {

        }
        else {
            const unitLabelWidths: number[] = [];
            this._unitLabelWidthsNormalized.forEach(element => {
                unitLabelWidths.push(element * this._maxWidth);
            });
            this.renderTableHeader(ctx, RendererAoS._unitLabels, unitLabelWidths);
            this.renderUnitStats(ctx, unit, unitLabelWidths, 0);
        }

        const uniqueWeapons: AoSWeapon[] = [];
        const scratchMap: Map<string, AoSWeapon> = new Map();
        for (const w of unit._weapons) {
            if (!scratchMap.has(w._name)) {
                scratchMap.set(w._name, w);
                uniqueWeapons.push(w);
            }
        }

        let missileWeapons: AoSWeapon[] = [];
        let meleeWeapons: AoSWeapon[] = [];
        for (let weapon of uniqueWeapons) {
            if (weapon._type == "Melee") {
                meleeWeapons.push(weapon);
            }
            else {
                missileWeapons.push(weapon);
            }
        }
        if (missileWeapons.length) {
            const weaponLabelWidths: number[] = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, missileWeapons, weaponLabelWidths);
        }

        if (meleeWeapons.length) {
            const meleeLabelWidths: number[] = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                meleeLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._meleeLabels, meleeLabelWidths);
            this.renderWeapons(ctx, meleeWeapons, meleeLabelWidths);
        }

        if (unit._spells.length > 0) {
            const spellLabelWidths: number[] = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._spellLabels, spellLabelWidths);
            this.renderSpells(ctx, unit._spells, spellLabelWidths);
        }

        if (unit._prayers.length > 0) {
            const prayerLabelWidths: number[] = [];
            this._prayerLabelWidthNormalized.forEach(element => {
                prayerLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._prayerLabels, prayerLabelWidths);
            this.renderPrayers(ctx, unit._prayers, prayerLabelWidths);
        }

        if (unit._abilities.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderMap(ctx, "ABILITIES", unit._abilities);
        }

        if (unit._commandAbilities.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderMap(ctx, "COMMAND ABILITIES", unit._commandAbilities);
        }

        if (unit._commandTraits.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderMap(ctx, "COMMAND TRAITS", unit._commandTraits);
        }

        if (unit._artefacts.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderMap(ctx, "ARTEFACTS", unit._artefacts);
        }

        if (unit._magic.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderMap(ctx, "MAGIC", unit._magic);
        }

        if (unit._woundTracker.length > 0) {
            this._currentY += 2;
            this.renderLine(ctx);
            const trackerLabelWidths: number[] = [];
            this._trackerLabelWidth.forEach(element => {
                trackerLabelWidths.push(element * this._maxWidth);
            });

            let labels = RendererAoS._trackerLabels;

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

        if (unit._keywords.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderKeywords(ctx, unit);
        }

        const totalHeight = this._currentY - (yOffset + RendererAoS._margin);
        const totalWidth = this._maxWidth;

        this.renderBorder(ctx, this._currentX, yOffset + RendererAoS._margin, totalWidth, totalHeight);

        return [this._maxWidth, this._currentY];
    }

    private renderHeader(unit: AoSUnit, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = RendererAoS._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart + RendererAoS._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + RendererAoS._bevelSize);
        ctx.lineTo(xEnd - RendererAoS._bevelSize, yStart);
        ctx.lineTo(xStart + RendererAoS._bevelSize, yStart);
        ctx.closePath();
        ctx.fill();

        let imgX = xStart + 6;
 
        //if (this._statsWheel)
        //    ctx.drawImage(this._statsWheel, imgX, yStart + 2, 32, 32);

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
        ctx.fillStyle = RendererAoS._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = RendererAoS._blackColor;
        ctx.font = RendererAoS._headerFont;
        var w = 50;
        if (labels) {
             for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }

        this._currentY += height;
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: AoSUnit): void {
        ctx.font = RendererAoS._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererAoS._font;
        ctx.fillStyle = RendererAoS._blackColor;
        const kwlist = [...unit._keywords]; 
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);

        this._currentY += 4;
    }

    private static _unitLabels = ["UNIT", "MOVE", "WOUNDS", "BRAVERY", "SAVE"];
    private _unitLabelWidthsNormalized = [0.3, 0.1, 0.1, 0.1, 0.1];

    private static _weaponLabels = ["MISSILE WEAPONS", "RANGE", "ATTACKS", "TO HIT", "TO WOUND", "REND", "DAMAGE"];
    private static _meleeLabels = ["MELEE WEAPONS", "RANGE", "ATTACKS", "TO HIT", "TO WOUND", "REND", "DAMAGE"];
    private _weaponLabelWidthNormalized = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

    private static _spellLabels = ["SPELL", "CASTING VALUE", "RANGE", "DESCRIPTION"];
    private _spellLabelWidthNormalized = [0.2, 0.1, 0.2, 0.5];

    private static _prayerLabels = ["PRAYER", "ANSWER VALUE", "RANGE", "DESCRIPTION"];
    private _prayerLabelWidthNormalized = [0.2, 0.1, 0.2, 0.5];

    private static _trackerLabels = ["WOUND TRACK", "REMAINING W", "ATTRIBUTE", "ATTRIBUTE", "ATTRIBUTE"];
    private _trackerLabelWidth = [0.2, 0.15, 0.1, 0.1, 0.1];

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = RendererAoS._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: AoSWeapon[], columnWidths: number[] | null): void {
        ctx.font = RendererAoS._font;
        ctx.fillStyle = RendererAoS._blackColor;

        const height = 22;

        ctx.save();

        let i = 0;
        let w = 50;
        for (const weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = RendererAoS._blackColor;
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
            RenderText(ctx, weapon._toHit.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._toWound.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._rend.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            this._currentY += height;

            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2) ctx.fillStyle = RendererAoS._greyLight;
            else ctx.fillStyle =  '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderMap(ctx: CanvasRenderingContext2D, title: string, data: Map<string, string>): void {
        ctx.font = RendererAoS._titleFont;
        ctx.fillStyle = RendererAoS._blackColor;

        RenderText(ctx, title, this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font = RendererAoS._font;
        for (let ab of data) {
            const content = ab[0].toUpperCase() + ':';
            const desc = ab[1];

            ctx.font = RendererAoS._headerFont;
            this._currentY += 2;
            RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, Justification.Left, VertAlign.Top);
            let offsetX = ctx.measureText(content).width;

            ctx.font = RendererAoS._font;
            this._currentY = RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, offsetX);
            this._currentY += 2;
        }
        this._currentY += 4;
    }

    private renderSpells(ctx: CanvasRenderingContext2D, spells: AoSSpell[], columnWidths: number[] | null): void {
        ctx.font = RendererAoS._font;
        ctx.fillStyle = RendererAoS._blackColor;

        const height = 22;

        let i = 0;
        let w = 50;

        ctx.save();

        for (const spell of spells) {
            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = RendererAoS._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell._castingValue.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, spell._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, spell._description, x, this._currentY, w, 0);
            x += w;

            ctx.save();
            if (i % 2) ctx.fillStyle = RendererAoS._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderPrayers(ctx: CanvasRenderingContext2D, prayers: AoSPrayer[], columnWidths: number[] | null): void {
        ctx.font = RendererAoS._font;
        ctx.fillStyle = RendererAoS._blackColor;

        const height = 22;

        let i = 0;
        let w = 50;

        ctx.save();

        for (const prayer of prayers) {
            let ci = 0;
            let x = this._currentX;

            let xStart = this._currentX;
            let yStart = this._currentY;

            ctx.fillStyle = RendererAoS._blackColor;
            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, prayer._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, prayer._answerValue.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            RenderText(ctx, prayer._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, prayer._description, x, this._currentY, w, 0);
            x += w;

            ctx.save();
            if (i % 2) ctx.fillStyle = RendererAoS._greyLight;
            else ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;

            ctx.restore();
        }
        ctx.restore();
    }

    private renderUnitStats(ctx: CanvasRenderingContext2D, unit: AoSUnit, columnWidths: number[] | null, bg: number): void {

        const height = 22;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = RendererAoS._greyLight;
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);

        ctx.fillStyle = RendererAoS._blackColor;
        ctx.font = RendererAoS._font;

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
        RenderText(ctx, unit._bravery.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        RenderText(ctx, unit._save.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    }

    private renderWoundTable(ctx: CanvasRenderingContext2D, unit: AoSUnit, columnWidths: number[] | null): void {
        const height = 22;

        let w = 50;

        let firstRow = true;
        for (let tracker of unit._woundTracker) {

            // if (firstRow && (unit._woundTracker.length == 4)) {
            //     // Skip column labels
            //     firstRow = false;
            //     continue;
            // }

            let x = this._currentX;
            let ci = 0;

            ctx.fillStyle = RendererAoS._greyLight;
            ctx.fillRect(x, this._currentY, this._maxWidth, height);

            ctx.fillStyle = RendererAoS._blackColor;
            ctx.font = RendererAoS._font;
            if (columnWidths) w = columnWidths[ci++];

            RenderText(ctx, tracker._name, x, this._currentY, w, height, Justification.Center);
            x += w;

            for (let attr of tracker._table) {
                if (columnWidths) w = columnWidths[ci++];
                RenderText(ctx, attr[1], x, this._currentY, w, height, Justification.Center);
                x += w;
            }

            this._currentY += height;
        }
    }
    
    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = RendererAoS._blackColor;

        ctx.beginPath();
        ctx.moveTo(x, y + RendererAoS._bevelSize);
        ctx.lineTo(x, y + h - RendererAoS._bevelSize);
        ctx.lineTo(x + RendererAoS._bevelSize, y + h);
        ctx.lineTo(x + w - RendererAoS._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererAoS._bevelSize);
        ctx.lineTo(x + w, y + RendererAoS._bevelSize);
        ctx.lineTo(x + w - RendererAoS._bevelSize, y);
        ctx.lineTo(x + RendererAoS._bevelSize, y);
        ctx.closePath();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = RendererAoS._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        ctx.beginPath();
        ctx.moveTo(x, y + RendererAoS._bevelSize);
        ctx.lineTo(x, y + h - RendererAoS._bevelSize);
        ctx.lineTo(x + RendererAoS._bevelSize, y + h);
        ctx.lineTo(x + w - RendererAoS._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - RendererAoS._bevelSize);
        ctx.lineTo(x + w, y + RendererAoS._bevelSize);
        ctx.lineTo(x + w - RendererAoS._bevelSize, y);
        ctx.lineTo(x + RendererAoS._bevelSize, y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

}
