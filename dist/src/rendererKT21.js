"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendererKT21 = void 0;
const rosterKT21_1 = require("./rosterKT21");
const renderer_1 = require("./renderer");
class RendererKT21 {
    constructor(roster) {
        this._descriptionStartX = 140;
        this._descriptionWidth = 600;
        this._roster = null;
        this._octagon = null;
        this._specialisms = new Map();
        this._currentX = 0;
        this._currentY = 0;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._unitLabelWidthsNormalized = [0.25, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
        this._weaponLabelWidthNormalized = [0.25, 0.05, 0.05, 0.05, 0.2, 0.2];
        this._spellLabelWidthNormalized = [0.25, 0.75];
        this._roster = roster;
        this._octagon = document.getElementById('octagon');
        this._specialisms.set(rosterKT21_1.Specialism.NONE, document.getElementById('role_hq'));
        this._specialisms.set(rosterKT21_1.Specialism.COMBAT, document.getElementById('role_hs'));
        this._specialisms.set(rosterKT21_1.Specialism.STAUNCH, document.getElementById('role_fa'));
        this._specialisms.set(rosterKT21_1.Specialism.MARKSMAN, document.getElementById('role_el'));
        this._specialisms.set(rosterKT21_1.Specialism.SCOUT, document.getElementById('role_tr'));
    }
    render(title, list, forces) {
        if (this._roster == null) {
            console.log("Roster is NULL");
            return;
        }
        if (title) {
            title.innerHTML = '<h3>' + this._roster.name() + ' (' + this._roster._equipmentPoints + ' EP)</h3>';
        }
        let catalogueRules = new Map();
        let subFactionRules = new Map();
        for (let force of this._roster._forces) {
            let catalogueRule = catalogueRules.get(force._catalog);
            if (!catalogueRule) {
                catalogueRule = new Map();
                catalogueRules.set(force._catalog, catalogueRule);
            }
            let subFactionRule = subFactionRules.get(force._catalog);
            if (!subFactionRule) {
                subFactionRule = new Map();
                subFactionRules.set(force._faction, subFactionRule);
            }
            const forceTitle = document.createElement('div');
            if (forceTitle) {
                if (force._faction) {
                    forceTitle.innerHTML = '<h4><p>' + force._faction + ' - ' + force.name() + '</p></h4>';
                }
                else {
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
            const headerInfo = [{ name: "MODELS", w: '55%' }, { name: "EP", w: '5%' }];
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
            }
            if (force._leader) {
                this.printOperative(force._leader, null, forces);
            }
            let prevOperative = null;
            for (let operative of force._operatives) {
                this.printOperative(operative, prevOperative, forces);
                prevOperative = operative;
            }
            function addRule(rules, append) {
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
    }
    printOperative(operative, prevOperative, forces) {
        let canvas = document.createElement('canvas');
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
        let finalCanvas = document.createElement('canvas');
        finalCanvas.width = dims[0] + border * 2;
        finalCanvas.height = dims[1] + border * 2;
        finalCanvas.style.width = finalCanvas.width.toString();
        finalCanvas.style.height = finalCanvas.height.toString();
        let finalCtx = finalCanvas.getContext('2d');
        finalCtx === null || finalCtx === void 0 ? void 0 : finalCtx.drawImage(canvas, border, border);
        if (forces) {
            let canvasDiv = document.createElement('div');
            canvasDiv.appendChild(finalCanvas);
            forces.appendChild(canvasDiv);
        }
    }
    printRules(root, section) {
        if (root.size > 0) {
            for (let [subFaction, rules] of root.entries()) {
                if (rules.size == 0)
                    continue;
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
    renderBorder(ctx, x, y, w, h) {
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
    renderNotes(ctx, title, notes) {
        if (!notes._customNotes)
            return;
        this.renderLine(ctx);
        ctx.font = RendererKT21._headerFont;
        renderer_1.RenderText(ctx, title.toLocaleUpperCase(), this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = RendererKT21._font;
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, notes._customNotes, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }
    renderNotesArray(ctx, title, notes) {
        let count = 0;
        for (const note of notes) {
            if (note._customNotes)
                count++;
        }
        if (count == 0)
            return;
        this.renderLine(ctx);
        ctx.font = RendererKT21._headerFont;
        renderer_1.RenderText(ctx, title.toLocaleUpperCase(), this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        for (const note of notes) {
            const name = note.name() + ':';
            const desc = note._customNotes;
            if (!desc)
                continue;
            ctx.font = RendererKT21._headerFont;
            this._currentY += 2;
            renderer_1.RenderTextFull(ctx, name, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, renderer_1.Justification.Left, renderer_1.VertAlign.Top);
            let offsetX = ctx.measureText(name).width;
            ctx.font = RendererKT21._font;
            this._currentY = renderer_1.RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, offsetX);
            this._currentY += 2;
        }
    }
    renderLine(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = RendererKT21._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }
    renderTableHeader(ctx, labels, columnWidths, justifications) {
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
                let justification = renderer_1.Justification.Center;
                if (columnWidths)
                    w = columnWidths[i];
                if (justifications)
                    justification = justifications[i];
                if (i == 0)
                    renderer_1.RenderText(ctx, labels[i], x + RendererKT21._offset, this._currentY, w, height, renderer_1.Justification.Left);
                else
                    renderer_1.RenderText(ctx, labels[i], x, this._currentY, w, height, justification);
                x += w;
            }
        }
        this._currentY += height;
    }
    renderSpells(ctx, spells, columnWidths) {
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
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, spell.name().toString(), x + RendererKT21._offset, this._currentY, w, height, renderer_1.Justification.Left);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 4;
            ctx.font = RendererKT21._font;
            this._currentY = renderer_1.RenderParagraph(ctx, spell._effect, x, this._currentY, w - RendererKT21._offset, 0);
            this._currentY += 2;
            x += w;
            ctx.save();
            if (i % 2)
                ctx.fillStyle = RendererKT21._greyLight;
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
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon.nameAndCosts(), x + RendererKT21._offset, this._currentY, w - RendererKT21._offset, height, RendererKT21._weaponJustifications[counter++]);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._attacks.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._skill.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            renderer_1.RenderText(ctx, weapon._rules.toString(), x, this._currentY, w, height, RendererKT21._weaponJustifications[counter++]);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            if (weapon._criticalEffects) {
                this._currentY += 4;
                this._currentY = renderer_1.RenderParagraph(ctx, weapon._criticalEffects, x, this._currentY, w - RendererKT21._offset, 0);
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
                ctx.fillStyle = RendererKT21._greyLight;
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
            ctx.fillStyle = RendererKT21._greyLight;
        else
            ctx.fillStyle = '#ffffff';
        ctx.fillRect(this._currentX, this._currentY, this._maxWidth, height);
        ctx.fillStyle = RendererKT21._blackColor;
        ctx.font = RendererKT21._font;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model.name().toString(), x + RendererKT21._offset, this._currentY, w, height, renderer_1.Justification.Left);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._move.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._apl.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._groupActivations.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._defence.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._saves.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        renderer_1.RenderText(ctx, model._wounds.toString(), x, this._currentY, w, height, renderer_1.Justification.Center);
        x += w;
        this._currentY += height;
    }
    renderAbilities(ctx, unit) {
        ctx.font = RendererKT21._titleFont;
        renderer_1.RenderText(ctx, "ABILITIES", this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        let rulesList = [...unit._rules.keys()];
        rulesList.sort(rosterKT21_1.Compare);
        const rules = rulesList.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, rules, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
        ctx.font = RendererKT21._boldFont;
        let keys = [...unit._abilities.keys()];
        keys.sort(rosterKT21_1.Compare);
        for (const key of keys) {
            const content = key.toUpperCase() + ':';
            const desc = unit._abilities.get(key);
            ctx.font = RendererKT21._boldFont;
            this._currentY += 2;
            renderer_1.RenderTextFull(ctx, content, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth, 16, renderer_1.Justification.Left, renderer_1.VertAlign.Top);
            let offsetX = ctx.measureText(content).width;
            ctx.font = RendererKT21._font;
            this._currentY = renderer_1.RenderParagraph(ctx, ' ' + desc, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, offsetX);
            this._currentY += 2;
        }
    }
    renderKeywords(ctx, unit) {
        ctx.font = RendererKT21._titleFont;
        renderer_1.RenderText(ctx, "KEYWORDS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = RendererKT21._font;
        const kwlist = [...unit._keywords];
        kwlist.sort(rosterKT21_1.Compare);
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }
    renderFactions(ctx, unit) {
        ctx.font = RendererKT21._titleFont;
        renderer_1.RenderText(ctx, "FACTIONS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = RendererKT21._font;
        const kwlist = [...unit._factions];
        kwlist.sort(rosterKT21_1.Compare);
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = renderer_1.RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
        this._currentY += 2;
    }
    renderModelList(ctx, models) {
        ctx.font = RendererKT21._titleFont;
        renderer_1.RenderText(ctx, "MODELS", this._currentX + RendererKT21._offset, this._currentY, 100, 16, renderer_1.Justification.Left);
        ctx.font = RendererKT21._font;
        for (let model of models) {
            let text;
            text = model.nameAndGear();
            this._currentY += 2;
            this._currentY = renderer_1.RenderParagraph(ctx, text, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - RendererKT21._offset, 0);
            this._currentY += 2;
        }
    }
    renderOperative(operative, canvas, xOffset, yOffset) {
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
        let weapons = [];
        let spells = [];
        const unitLabelWidths = [];
        this._unitLabelWidthsNormalized.forEach(element => {
            unitLabelWidths.push(element * this._maxWidth);
        });
        for (let weapon of operative._weapons) {
            weapons.push(weapon);
        }
        for (let spell of operative._psychicPowers) {
            spells.push(spell);
        }
        const uniqueModels = [];
        const scrathModels = new Map();
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
        const uniqueWeapons = [];
        const scratchMap = new Map();
        for (const w of weapons) {
            if (!scratchMap.has(w.name())) {
                scratchMap.set(w.name(), w);
                uniqueWeapons.push(w);
            }
        }
        if (uniqueWeapons.length > 0) {
            const weaponLabelWidths = [];
            this._weaponLabelWidthNormalized.forEach(element => {
                weaponLabelWidths.push(element * this._maxWidth);
            });
            this.renderLine(ctx);
            this.renderTableHeader(ctx, RendererKT21._weaponLabels, weaponLabelWidths, RendererKT21._weaponJustifications);
            this.renderWeapons(ctx, uniqueWeapons, weaponLabelWidths);
        }
        this.renderNotesArray(ctx, "Weapons notes", weapons);
        if (spells.length > 0) {
            const spellLabelWidths = [];
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
    renderHeader(unit, ctx) {
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
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            const roleImg = this._specialisms.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart + 2 + 4, 24, 24);
            }
            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            renderer_1.RenderText(ctx, unit.costs().toString(), imgX, yStart + 2, 32, 32, renderer_1.Justification.Center);
        }
        let iters = 0;
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
        ctx.textBaseline = 'top';
        renderer_1.RenderText(ctx, unitName, title_x, yStart, maxWidth, titleHeight, renderer_1.Justification.Center);
        this._currentY += titleHeight;
    }
}
exports.RendererKT21 = RendererKT21;
RendererKT21._res = 144;
RendererKT21._margin = 0;
RendererKT21._bevelSize = 15;
RendererKT21._blackColor = '#1d272a';
RendererKT21._grey1 = '#b3bbb5';
RendererKT21._greyLight = '#dde1df';
RendererKT21._fillColor = '#f6f6f6';
RendererKT21._offset = 20;
RendererKT21._titleFont = 'bold 14px sans-serif';
RendererKT21._headerFont = 'bold 14px sans-serif';
RendererKT21._font = '14px sans-serif';
RendererKT21._boldFont = 'bold 14px sans-serif';
RendererKT21._unitLabels = ["Operative", "M", "APL", "GA", "DF", "Save", "W"];
RendererKT21._weaponLabels = ["WEAPONS", "A", "WS/BS", "D", "SR", "!"];
RendererKT21._weaponJustifications = [renderer_1.Justification.Left, renderer_1.Justification.Center, renderer_1.Justification.Center, renderer_1.Justification.Center, renderer_1.Justification.Left, renderer_1.Justification.Left];
RendererKT21._spellLabels = ["PSYCHIC POWER", "DETAILS"];
//# sourceMappingURL=rendererKT21.js.map