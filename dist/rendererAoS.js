import { AoSUnitRoleToString } from "./rosterAoS.js";
import { Justification, RenderText, RenderParagraph } from "./renderer.js";
export class RendererAoS {
    constructor(roster) {
        this._roster = null;
        this._currentX = 0;
        this._currentY = 0;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._unitLabelWidthsNormalized = [0.4, 0.15, 0.15, 0.15, 0.15];
        this._weaponLabelWidthNormalized = [0.4, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
        this._spellLabelWidthNormalized = [0.3, 0.2, 0.5];
        this._prayerLabelWidthNormalized = [0.4, 0.6];
        this._trackerLabelWidth = [0.3, 0.2, 0.15, 0.15, 0.15];
        this._roster = roster;
    }
    render(title, list, forces) {
        var _a;
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
            const headerInfo = [{ name: "NAME", w: '35%' }, { name: "ROLE", w: '25%' }, { name: "MODELS", w: '25%' }, { name: "POINTS", w: '15%' }];
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
            for (let unit of force._units) {
                let canvas = document.createElement('canvas');
                canvas.width = RendererAoS._res * 5.5;
                canvas.height = RendererAoS._res * 8.5;
                const dims = this.renderUnit(unit, canvas, 0, 0);
                const border = 25;
                let finalCanvas = document.createElement('canvas');
                finalCanvas.width = dims[0] + border * 2;
                finalCanvas.height = dims[1] + border * 2;
                let finalCtx = finalCanvas.getContext('2d');
                (_a = finalCtx) === null || _a === void 0 ? void 0 : _a.drawImage(canvas, border, border);
                if (forces)
                    forces.appendChild(finalCanvas);
            }
        }
    }
    renderUnit(unit, canvas, xOffset, yOffset) {
        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }
        this._currentX = xOffset + RendererAoS._margin;
        this._currentY = yOffset + RendererAoS._margin;
        this._maxWidth = canvas.width - this._currentX;
        this._maxHeight = Math.max(0, canvas.height - this._currentY);
        this.renderHeader(unit, ctx);
        const unitLabelWidths = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        this.renderTableHeader(ctx, RendererAoS._unitLabels, unitLabelWidths);
        this.renderUnitStats(ctx, unit, unitLabelWidths, 0);
        const uniqueWeapons = [];
        const scratchMap = new Map();
        for (const w of unit._weapons) {
            if (!scratchMap.has(w._name)) {
                scratchMap.set(w._name, w);
                uniqueWeapons.push(w);
            }
        }
        let missileWeapons = [];
        let meleeWeapons = [];
        for (let weapon of uniqueWeapons) {
            if (weapon._type == "Melee") {
                meleeWeapons.push(weapon);
            }
            else {
                missileWeapons.push(weapon);
            }
        }
        if (missileWeapons.length) {
            const weaponLabelWidths = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, missileWeapons, weaponLabelWidths);
        }
        if (meleeWeapons.length) {
            const meleeLabelWidths = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                meleeLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._meleeLabels, meleeLabelWidths);
            this.renderWeapons(ctx, meleeWeapons, meleeLabelWidths);
        }
        if (unit._spells.length > 0) {
            const spellLabelWidths = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererAoS._spellLabels, spellLabelWidths);
            this.renderSpells(ctx, unit._spells, spellLabelWidths);
        }
        if (unit._prayers.length > 0) {
            const prayerLabelWidths = [];
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
        if (unit._woundTracker) {
            this.renderLine(ctx);
            const trackerLabelWidths = [];
            this._trackerLabelWidth.forEach(element => {
                trackerLabelWidths.push(element * this._maxWidth);
            });
            this.renderTableHeader(ctx, unit._woundTracker._woundTrackerLabels, trackerLabelWidths);
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
    renderHeader(unit, ctx) {
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
        // unit name
        let iters = 0;
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
    renderTableHeader(ctx, labels, columnWidths) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = RendererAoS._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);
        ctx.fillStyle = RendererAoS._blackColor;
        ctx.font = '14px sans-serif';
        var w = 50;
        if (labels) {
            ctx.font = '12px sans-serif';
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths)
                    w = columnWidths[i];
                RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }
        this._currentY += height;
    }
    renderKeywords(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY = RenderParagraph(ctx, kw, this._currentX + 190, this._currentY, 500);
        this._currentY += 4;
    }
    renderLine(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = RendererAoS._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }
    renderWeapons(ctx, weapons, columnWidths) {
        ctx.font = '12px sans-serif';
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
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._attacks.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._toHit.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._toWound.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._rend.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            this._currentY += height;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2)
                ctx.fillStyle = RendererAoS._greyLight;
            else
                ctx.fillStyle = '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;
            ctx.restore();
        }
        ctx.restore();
    }
    renderMap(ctx, title, data) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, title, this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        for (let ab of data) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 500);
        }
        this._currentY += 4;
    }
    renderSpells(ctx, spells, columnWidths) {
        ctx.font = '12px sans-serif';
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
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, spell._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, spell._castingValue.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, spell._description, x, this._currentY, w);
            x += w;
            ctx.save();
            if (i % 2)
                ctx.fillStyle = RendererAoS._greyLight;
            else
                ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;
            ctx.restore();
        }
        ctx.restore();
    }
    renderPrayers(ctx, prayers, columnWidths) {
        ctx.font = '12px sans-serif';
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
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, prayer._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, prayer._description, x, this._currentY, w);
            x += w;
            ctx.save();
            if (i % 2)
                ctx.fillStyle = RendererAoS._greyLight;
            else
                ctx.fillStyle = '#ffffff';
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;
            ctx.restore();
        }
        ctx.restore();
    }
    renderUnitStats(ctx, unit, columnWidths, bg) {
        const height = 22;
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        if (bg % 2)
            ctx.fillStyle = RendererAoS._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = RendererAoS._blackColor;
        ctx.font = '12px sans-serif';
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._bravery.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._save.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderWoundTable(ctx, unit, columnWidths) {
        const height = 22;
        if (unit._woundTracker == null) {
            return;
        }
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        ctx.fillStyle = RendererAoS._greyLight;
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = RendererAoS._blackColor;
        ctx.font = '12px sans-serif';
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, unit._woundTracker._name, x, this._currentY, w, height, Justification.Center);
        x += w;
        for (let attr of unit._woundTracker._table) {
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, attr[1], x, this._currentY, w, height, Justification.Center);
            x += w;
        }
        this._currentY += height;
    }
    renderBorder(ctx, x, y, w, h) {
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
RendererAoS._res = 144;
RendererAoS._margin = 0;
RendererAoS._bevelSize = 15;
RendererAoS._blackColor = '#1d272a';
RendererAoS._grey1 = '#b3bbb5';
RendererAoS._greyLight = '#dde1df';
RendererAoS._fillColor = '#f6f6f6';
RendererAoS._unitLabels = ["UNIT", "MOVE", "WOUNDS", "BRAVERY", "SAVE"];
RendererAoS._weaponLabels = ["MISSILE WEAPONS", "RANGE", "ATTACKS", "TO HIT", "TO WOUND", "REND", "DAMAGE"];
RendererAoS._meleeLabels = ["MELEE WEAPONS", "RANGE", "ATTACKS", "TO HIT", "TO WOUND", "REND", "DAMAGE"];
RendererAoS._spellLabels = ["SPELL", "CASTING VALUE", "DESCRIPTION"];
RendererAoS._prayerLabels = ["PRAYER", "DESCRIPTION"];
