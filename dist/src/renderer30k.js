"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer30k = void 0;
const roster30k_1 = require("./roster30k");
const renderer_1 = require("./renderer");
class Renderer30k {
    constructor(roster) {
        this._descriptionStartX = 190;
        this._descriptionWidth = 600;
        this._showWoundBoxes = false;
        this._roster = null;
        this._currentX = 0;
        this._currentY = 0;
        this._maxWidth = 0;
        this._octagon = null;
        this._roles = new Map();
        this._unitLabelWidthsNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077];
        this._vehicleLabelWidthsNormalized = [0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2];
        this._walkerLabelWidthsNormalized = [0.3, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.15];
        this._flyerLabelWidthsNormalized = [0.3, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077, 0.077];
        this._weaponLabelWidthNormalized = [0.3, 0.1, 0.1, 0.1, 0.4];
        this._spellLabelWidthNormalized = [0.3, 0.1, 0.1, 0.5];
        this._roster = roster;
        this._octagon = document.getElementById('octagon');
        this._roles.set(roster30k_1.UnitRole30k.HQ, document.getElementById('role_hq'));
        this._roles.set(roster30k_1.UnitRole30k.TR, document.getElementById('role_tr'));
        this._roles.set(roster30k_1.UnitRole30k.EL, document.getElementById('role_el'));
        this._roles.set(roster30k_1.UnitRole30k.FA, document.getElementById('role_fa'));
        this._roles.set(roster30k_1.UnitRole30k.HS, document.getElementById('role_hs'));
        this._roles.set(roster30k_1.UnitRole30k.FL, document.getElementById('role_fl'));
        this._roles.set(roster30k_1.UnitRole30k.DT, document.getElementById('role_dt'));
        this._roles.set(roster30k_1.UnitRole30k.FT, document.getElementById('role_ft'));
        this._roles.set(roster30k_1.UnitRole30k.LW, document.getElementById('role_lw'));
    }
    render(title, list, forces) {
        if (this._roster == null)
            return;
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
                role.innerHTML = roster30k_1.UnitRoleToString30k[unit._role];
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
                let canvas = document.createElement('canvas');
                canvas.width = Renderer30k._res * 7.5;
                canvas.height = Renderer30k._res * 20;
                this._descriptionWidth = canvas.width - this._descriptionStartX - 10;
                renderer_1.FixDPI(canvas);
                const dims = this.renderUnit(unit, canvas, 0, 0);
                const border = 25;
                let finalCanvas = document.createElement('canvas');
                finalCanvas.width = dims[0] + border * 2;
                finalCanvas.height = dims[1] + border * 2;
                let finalCtx = finalCanvas.getContext('2d');
                finalCtx === null || finalCtx === void 0 ? void 0 : finalCtx.drawImage(canvas, border, border);
                if (forces) {
                    let canvasDiv = document.createElement('div');
                    canvasDiv.appendChild(finalCanvas);
                    forces.appendChild(canvasDiv);
                }
            }
        }
    }
    renderBorder(ctx, x, y, w, h) {
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
    renderWatermark(ctx) {
    }
    renderLine(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = Renderer30k._blackColor;
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
        ctx.fillStyle = Renderer30k._grey1;
        ctx.fillRect(this._currentX, this._currentY, width, height);
        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._titleFont;
        var w = 50;
        if (labels) {
            ctx.font = Renderer30k._headerFont;
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths)
                    w = columnWidths[i];
                renderer_1.RenderText(ctx, labels[i], x, this._currentY, w, height, renderer_1.Justification.Center);
                x += w;
            }
        }
        this._currentY += height;
    }
    renderPowers(ctx, powers, columnWidths) {
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
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, power._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, power._warpCharge.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, power._range.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 4;
            this._currentY = renderer_1.RenderParagraph(ctx, power._details, x, this._currentY, w, 0);
            this._currentY += 2;
            x += w;
            ctx.save();
            if (i % 2)
                ctx.fillStyle = Renderer30k._greyLight;
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
    renderWeapons(ctx, weapons, columnWidths) {
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
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._range.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._str.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._ap.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._type.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
            x += w;
            this._currentY += height;
            x += w;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            const actualHeight = this._currentY - yStart;
            if (i % 2)
                ctx.fillStyle = Renderer30k._greyLight;
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
            ctx.fillStyle = Renderer30k._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._ws.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._str.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._toughness.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._wounds.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._initiative.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._attacks.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._leadership.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._save.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderVehicle(ctx, model, columnWidths, bg) {
        const height = 24;
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        if (bg % 2)
            ctx.fillStyle = Renderer30k._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._front.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._side.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._type.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderWalker(ctx, model, columnWidths, bg) {
        const height = 24;
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        if (bg % 2)
            ctx.fillStyle = Renderer30k._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._ws.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._str.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._front.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._side.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._initiative.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._attacks.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._type.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderFlyer(ctx, model, columnWidths, bg) {
        const height = 24;
        let w = 50;
        let x = this._currentX;
        let ci = 0;
        if (bg % 2)
            ctx.fillStyle = Renderer30k._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxWidth, height);
        ctx.fillStyle = Renderer30k._blackColor;
        ctx.font = Renderer30k._font;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._name.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._bs.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._front.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._side.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._rear.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._hp.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._type.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._role.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._pursuit.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._agility.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderAbilities(ctx, unit) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "ABILITIES", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
        for (let ab of unit._abilities) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            ctx.font = Renderer30k._boldFont;
            this._currentY += 2;
            renderer_1.RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, renderer_1.Justification.Left, renderer_1.VertAlign.Top);
            let offsetX = ctx.measureText(content).width;
            ctx.font = Renderer30k._font;
            this._currentY = renderer_1.RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, offsetX);
            this._currentY += 2;
        }
    }
    renderRules(ctx, unit) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "RULES", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
        for (let rule of unit._rules) {
            const content = rule[0].toUpperCase();
            const desc = rule[1];
            ctx.font = Renderer30k._boldFont;
            this._currentY += 2;
            renderer_1.RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, renderer_1.Justification.Left, renderer_1.VertAlign.Top);
            let offsetX = ctx.measureText(content).width;
            ctx.font = Renderer30k._font;
            this._currentY = renderer_1.RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, offsetX);
            this._currentY += 2;
        }
    }
    renderKeywords(ctx, unit) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = Renderer30k._font;
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }
    renderFactions(ctx, unit) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "FACTIONS", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = Renderer30k._font;
        const kwlist = [...unit._factions];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }
    renderModelList(ctx, models) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "MODELS", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
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
                modelList += ",  ";
            }
        }
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, modelList, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
        this._currentY += 2;
    }
    renderWoundBoxes(ctx, models) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "WOUNDS", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
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
                this._currentY = renderer_1.RenderParagraph(ctx, model._name, unitNameStartX, this._currentY + (woundBoxSize - 14) / 2, unitNameWidth, 0);
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
    renderUnit(unit, canvas, xOffset, yOffset) {
        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }
        this._currentX = xOffset + Renderer30k._margin;
        this._currentY = yOffset + Renderer30k._margin;
        this._maxWidth = canvas.width - this._currentX;
        this.renderHeader(unit, ctx);
        ctx.fillStyle = Renderer30k._blackColor;
        let weapons = [];
        let powers = [];
        let psykers = [];
        let models = [];
        const unitLabelWidths = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        const vehicleLabelWidths = [];
        this._vehicleLabelWidthsNormalized.forEach(element => {
            vehicleLabelWidths.push(element * this._maxWidth);
        });
        const walkerLabelWidths = [];
        this._walkerLabelWidthsNormalized.forEach(element => {
            walkerLabelWidths.push(element * this._maxWidth);
        });
        const flyerLabelWidths = [];
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
        const uniqueModels = [];
        const scrathModels = new Map();
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
            this.renderTableHeader(ctx, Renderer30k._weaponLabels, weaponLabelWidths);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }
        if (powers.length > 0) {
            const spellLabelWidths = [];
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
            let hasTracks = false;
            for (let model of unit._models) {
                if (model._wounds > 2) {
                    hasTracks = true;
                }
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
    renderHeader(unit, ctx) {
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
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            const roleImg = this._roles.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart + 2 + 4, 24, 24);
            }
            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            renderer_1.RenderText(ctx, unit._points.toString(), imgX, yStart + 2, 32, 32, renderer_1.Justification.Center);
        }
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
        ctx.textBaseline = 'top';
        renderer_1.RenderText(ctx, unitName, title_x, yStart, maxWidth, titleHeight, renderer_1.Justification.Center);
        this._currentY += titleHeight;
    }
    renderPsykers(ctx, psykers) {
        ctx.font = Renderer30k._titleFont;
        renderer_1.RenderText(ctx, "PSYKERS", this._currentX + 20, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = Renderer30k._font;
        this._currentY += 2;
        for (let psyker of psykers) {
            this._currentY = renderer_1.RenderParagraph(ctx, "MASTERY LEVEL: " + psyker._masteryLevel, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
            this._currentY += 2;
            this._currentY = renderer_1.RenderParagraph(ctx, "DISCIPLINES: " + psyker._disciplines, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 0);
            this._currentY += 2;
        }
    }
}
exports.Renderer30k = Renderer30k;
Renderer30k._res = 144;
Renderer30k._margin = 0;
Renderer30k._bevelSize = 15;
Renderer30k._blackColor = '#1d272a';
Renderer30k._grey1 = '#b3bbb5';
Renderer30k._greyLight = '#dde1df';
Renderer30k._fillColor = '#f6f6f6';
Renderer30k._titleFont = 'bold 14px sans-serif';
Renderer30k._headerFont = 'bold 14px sans-serif';
Renderer30k._font = '14px sans-serif';
Renderer30k._boldFont = 'bold 14px sans-serif';
Renderer30k._unitLabels = ["MODEL", "WS", "BS", "S", "T", "W", "I", "A", "LD", "SAVE"];
Renderer30k._vehicleLabels = ["MODEL", "BS", "FRONT", "SIDE", "REAR", "HP", "TYPE"];
Renderer30k._walkerLabels = ["MODEL", "WS", "BS", "S", "FRONT", "SIDE", "REAR", "I", "A", "HP", "TYPE"];
Renderer30k._flyerLabels = ["MODEL", "BS", "FRONT", "SIDE", "REAR", "HP", "TYPE", "ROLE", "PURSUIT", "AGILITY"];
Renderer30k._weaponLabels = ["WEAPONS", "RANGE", "S", "AP", "TYPE"];
Renderer30k._spellLabels = ["PSYCHIC POWER", "WARP CHARGE", "RANGE", "DETAILS"];
;
//# sourceMappingURL=renderer30k.js.map