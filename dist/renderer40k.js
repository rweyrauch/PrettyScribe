import { UnitRole, UnitRoleToString } from "./roster40k.js";
import { Justification, RenderText, RenderParagraph } from "./renderer.js";
export class Renderer40k {
    constructor(roster) {
        this._roster = null;
        this._currentX = 0;
        this._currentY = 0;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._octagon = null;
        this._roles = new Map();
        this._unitLabelWidthsNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077];
        this._weaponLabelWidthNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.3];
        this._spellLabelWidthNormalized = [0.3, 0.1, 0.1, 0.5];
        this._explosionLabelWidthNormalized = [0.3, 0.15, 0.15, 0.15];
        this._trackerLabelWidth = [0.3, 0.2, 0.15, 0.15, 0.15];
        this._roster = roster;
        this._octagon = document.getElementById('octagon');
        this._roles.set(UnitRole.HQ, document.getElementById('role_hq'));
        this._roles.set(UnitRole.TR, document.getElementById('role_tr'));
        this._roles.set(UnitRole.EL, document.getElementById('role_el'));
        this._roles.set(UnitRole.FA, document.getElementById('role_fa'));
        this._roles.set(UnitRole.HS, document.getElementById('role_hs'));
        this._roles.set(UnitRole.FL, document.getElementById('role_fl'));
        this._roles.set(UnitRole.DT, document.getElementById('role_dt'));
        this._roles.set(UnitRole.FT, document.getElementById('role_ft'));
        this._roles.set(UnitRole.LW, document.getElementById('role_lw'));
    }
    render(title, list, forces) {
        var _a;
        if (this._roster == null)
            return;
        if (title) {
            title.innerHTML = '<h3>' + this._roster._name + ' (' + this._roster._points + ' pts, ' + this._roster._powerLevel + ' PL, ' + this._roster._commandPoints + ' CP)</h3>';
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
            const headerInfo = [{ name: "NAME", w: '25%' }, { name: "ROLE", w: '20%' }, { name: "MODELS", w: '25%' }, { name: "POINTS", w: '15%' }, { name: "POWER", w: '15%' }];
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
                role.innerHTML = UnitRoleToString[unit._role];
                let models = document.createElement('td');
                models.innerHTML = "";
                let mi = 0;
                for (const model of unit._models) {
                    if (model._count > 1) {
                        models.innerHTML += model._count + " " + model._name;
                    }
                    else {
                        models.innerHTML += model._name;
                    }
                    mi++;
                    if (mi != unit._models.length) {
                        models.innerHTML += ",  ";
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
            for (let unit of force._units) {
                let canvas = document.createElement('canvas');
                canvas.width = Renderer40k._res * 5.5;
                canvas.height = Renderer40k._res * 8.5;
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
    renderBorder(ctx, x, y, w, h) {
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
    renderWatermark(ctx) {
    }
    renderLine(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = Renderer40k._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }
    renderTableHeader(ctx, labels, columnWidths) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = Renderer40k._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);
        ctx.fillStyle = Renderer40k._blackColor;
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
            ctx.fillStyle = Renderer40k._blackColor;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, spell._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, spell._manifest.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, spell._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            //this._currentY += 2;
            this._currentY = RenderParagraph(ctx, spell._details, x, this._currentY, w);
            x += w;
            ctx.save();
            if (i % 2)
                ctx.fillStyle = Renderer40k._greyLight;
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
    renderExplosion(ctx, explosions, columnWidths) {
        ctx.font = '12px sans-serif';
        const height = 22;
        let i = 0;
        let w = 50;
        for (const expl of explosions) {
            let ci = 0;
            let x = this._currentX;
            if (i % 2)
                ctx.fillStyle = Renderer40k._greyLight;
            else
                ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, this._currentY, this._maxWidth, height);
            i++;
            ctx.fillStyle = Renderer40k._blackColor;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, expl._name, x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, expl._diceRoll, x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, expl._distance, x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, expl._mortalWounds, x, this._currentY, w, height, Justification.Center);
            x += w;
            this._currentY += height;
        }
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
            ctx.fillStyle = Renderer40k._blackColor;
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
            RenderText(ctx, weapon._type.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._str.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._ap.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            if (weapon._abilities) {
                this._currentY += 4;
                this._currentY = RenderParagraph(ctx, weapon._abilities, x, this._currentY, w);
                this._currentY += 2;
            }
            else {
                this._currentY += height;
            }
            x += w;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2)
                ctx.fillStyle = Renderer40k._greyLight;
            else
                ctx.fillStyle = '#ffffff';
            ctx.fillRect(xStart, yStart, this._maxWidth, actualHeight);
            i++;
            ctx.restore();
        }
        ctx.restore();
    }
    renderModel(ctx, model, columnWidths, bg) {
        const height = 24;
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        if (bg % 2)
            ctx.fillStyle = Renderer40k._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = Renderer40k._blackColor;
        ctx.font = '12px sans-serif';
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._ws.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._str.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._toughness.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._attacks.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._leadership.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        RenderText(ctx, model._save.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderAbilities(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "ABILITIES", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        for (let ab of unit._abilities) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 600);
            this._currentY += 2;
        }
    }
    renderRules(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "RULES", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        for (let rule of unit._rules) {
            const content = rule[0].toUpperCase();
            const desc = rule[1];
            this._currentY += 2;
            this._currentY = RenderParagraph(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 600);
            this._currentY += 4;
        }
    }
    renderKeywords(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + 190, this._currentY, 600);
        this._currentY += 2;
    }
    renderFactions(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "FACTIONS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._factions];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + 190, this._currentY, 600);
        this._currentY += 2;
    }
    renderWoundTable(ctx, unit, columnWidths) {
        const height = 22;
        let w = 50;
        for (let tracker of unit._woundTracker) {
            let x = this._currentX;
            let ci = 0;
            ctx.fillStyle = Renderer40k._greyLight;
            ctx.fillRect(x, this._currentY, this._maxWidth, height);
            ctx.fillStyle = Renderer40k._blackColor;
            ctx.font = '12px sans-serif';
            if (columnWidths)
                w = columnWidths[ci++];
            //RenderText(ctx, tracker._name, x, this._currentY, w, height, Justification.Center);
            x += w;
            for (let attr of tracker._table) {
                if (columnWidths)
                    w = columnWidths[ci++];
                RenderText(ctx, attr[1], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
            this._currentY += height;
        }
    }
    renderModelList(ctx, unit) {
        ctx.font = '14px sans-serif';
        RenderText(ctx, "MODELS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);
        ctx.font = '12px serif';
        let modelList = "";
        let mi = 0;
        for (const model of unit._models) {
            if (model._count > 1) {
                modelList += model._count + " " + model._name;
            }
            else {
                modelList += model._name;
            }
            mi++;
            if (mi != unit._models.length) {
                modelList += ",  ";
            }
        }
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, modelList, this._currentX + 190, this._currentY, 600);
        this._currentY += 2;
    }
    renderWoundBoxes(ctx, unit) {
        const woundBoxSize = 30;
        const boxMargin = 10;
        const boxStartX = 340;
        const unitNameWidth = 80;
        ctx.save();
        for (let model of unit._models) {
            if (model._wounds > 1) {
                let currentY = this._currentY;
                ctx.font = '14px sans-serif';
                ctx.fillStyle = Renderer40k._blackColor;
                this._currentY = RenderParagraph(ctx, model._name, this._currentX + unitNameWidth, this._currentY + (woundBoxSize - 14) / 2, boxStartX - unitNameWidth - boxMargin);
                let x = this._currentX + boxStartX;
                ctx.strokeStyle = Renderer40k._blackColor;
                ctx.fillStyle = '#ffffff';
                for (let w = 0; w < model._wounds; w++) {
                    if (w % 10 == 0 && w != 0) {
                        currentY += woundBoxSize + boxMargin;
                        x = this._currentX + boxStartX;
                    }
                    ctx.fillRect(x, currentY, woundBoxSize, woundBoxSize);
                    ctx.strokeRect(x, currentY, woundBoxSize, woundBoxSize);
                    x += woundBoxSize + boxMargin;
                }
                currentY += woundBoxSize + boxMargin;
                this._currentY = currentY;
            }
        }
        ctx.restore();
    }
    renderUnit(unit, canvas, xOffset, yOffset) {
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
        let weapons = [];
        let spells = [];
        let explosions = [];
        const unitLabelWidths = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        this.renderTableHeader(ctx, Renderer40k._unitLabels, unitLabelWidths);
        let i = 0;
        for (var model of unit._models) {
            this.renderModel(ctx, model, unitLabelWidths, i % 2);
            i++;
            for (let weapon of model._weapons) {
                weapons.push(weapon);
            }
            for (let spell of model._psychicPowers) {
                spells.push(spell);
            }
            for (let expl of model._explosions) {
                explosions.push(expl);
            }
        }
        // Unique list of weapons
        const uniqueWeapons = [];
        const scratchMap = new Map();
        for (const w of weapons) {
            if (!scratchMap.has(w._name)) {
                scratchMap.set(w._name, w);
                uniqueWeapons.push(w);
            }
        }
        if (uniqueWeapons.length > 0) {
            const weaponLabelWidths = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer40k._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }
        if (spells.length > 0) {
            const spellLabelWidths = [];
            this._spellLabelWidthNormalized.forEach(element => {
                spellLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, Renderer40k._spellLabels, spellLabelWidths);
            this.renderSpells(ctx, spells, spellLabelWidths);
        }
        if (unit._abilities.size > 0) {
            this.renderLine(ctx);
            this._currentY += 2;
            this.renderAbilities(ctx, unit);
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
            this.renderModelList(ctx, unit);
        }
        if (unit._woundTracker.length > 0) {
            this.renderLine(ctx);
            const trackerLabelWidths = [];
            this._trackerLabelWidth.forEach(element => {
                trackerLabelWidths.push(element * this._maxWidth);
            });
            this.renderTableHeader(ctx, Renderer40k._trackerLabels, trackerLabelWidths);
            this.renderWoundTable(ctx, unit, trackerLabelWidths);
        }
        if (explosions.length > 0) {
            this.renderLine(ctx);
            const explLabelWidths = [];
            this._explosionLabelWidthNormalized.forEach(element => {
                explLabelWidths.push(element * this._maxWidth);
            });
            this.renderTableHeader(ctx, Renderer40k._explosionLabels, explLabelWidths);
            this.renderExplosion(ctx, explosions, explLabelWidths);
        }
        // wound tracker boxes
        let hasTracks = false;
        for (let model of unit._models) {
            if (model._wounds > 1) {
                hasTracks = true;
            }
        }
        if (hasTracks) {
            this.renderLine(ctx);
            this._currentY += 5;
            this.renderWoundBoxes(ctx, unit);
        }
        const totalHeight = this._currentY - (yOffset + Renderer40k._margin);
        const totalWidth = this._maxWidth;
        this.renderBorder(ctx, this._currentX, yOffset + Renderer40k._margin, totalWidth, totalHeight);
        this.renderWatermark(ctx);
        return [this._maxWidth, this._currentY];
    }
    renderHeader(unit, ctx) {
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
}
Renderer40k._res = 144;
Renderer40k._margin = 0;
Renderer40k._bevelSize = 15;
Renderer40k._blackColor = '#1d272a';
Renderer40k._grey1 = '#b3bbb5';
Renderer40k._greyLight = '#dde1df';
Renderer40k._fillColor = '#f6f6f6';
Renderer40k._unitLabels = ["MODEL", "M", "WS", "BS", "S", "T", "W", "A", "LD", "SAVE"];
Renderer40k._weaponLabels = ["WEAPONS", "RANGE", "TYPE", "S", "AP", "D", "ABILITIES"];
Renderer40k._spellLabels = ["PSYCHIC POWER", "MANIFEST", "RANGE", "DETAILS"];
Renderer40k._explosionLabels = ["EXPLOSION", "DICE ROLL", "DISTANCE", "MORTAL WOUNDS"];
Renderer40k._trackerLabels = ["WOUND TRACK", "REMAINING W", "ATTRIBUTE", "ATTRIBUTE", "ATTRIBUTE"];
;
