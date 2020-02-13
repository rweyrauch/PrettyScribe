/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _roster40k__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roster40k */ "./src/roster40k.ts");
/* harmony import */ var _renderer40k__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer40k */ "./src/renderer40k.ts");
/* harmony import */ var _rosterAoS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rosterAoS */ "./src/rosterAoS.ts");
/* harmony import */ var _rendererAoS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rendererAoS */ "./src/rendererAoS.ts");




function removeAllChildren(parent) {
    if (parent) {
        let first = parent.firstElementChild;
        while (first) {
            first.remove();
            first = parent.firstElementChild;
        }
    }
}
function cleanup() {
    const rosterTitle = document.getElementById('roster-title');
    removeAllChildren(rosterTitle);
    const rosterList = document.getElementById('roster-lists');
    removeAllChildren(rosterList);
    const forceUnits = document.getElementById('force-units');
    removeAllChildren(forceUnits);
}
function getFileExtension(filename) {
    const substrings = filename.split('.');
    if (substrings.length > 1) {
        return substrings[substrings.length - 1];
    }
    return "";
}
function handleFileSelect(event) {
    const input = event.target;
    const files = input.files;
    cleanup();
    if (files) {
        let output = [];
        for (let f of files) {
            const fileExt = getFileExtension(f.name);
            if (fileExt == "rosz") {
                console.log("Got zipped file.");
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                const re = e.target;
                if (re && re.result) {
                    let sourceData = re.result;
                    const xmldatastart = sourceData.toString().indexOf(',') + 1;
                    const xmldata = window.atob(sourceData.toString().slice(xmldatastart));
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(xmldata, "text/xml");
                    if (doc) {
                        let info = doc.querySelector("roster");
                        if (info) {
                            const gameType = (_a = info.getAttributeNode("gameSystemName")) === null || _a === void 0 ? void 0 : _a.nodeValue;
                            if (!gameType)
                                return;
                            const rosterTitle = document.getElementById('roster-title');
                            const rosterList = document.getElementById('roster-lists');
                            const forceUnits = document.getElementById('force-units');
                            if (gameType == "Warhammer 40,000 8th Edition") {
                                let roster = Object(_roster40k__WEBPACK_IMPORTED_MODULE_0__["Create40kRoster"])(doc);
                                if (roster) {
                                    if (roster._forces.length > 0) {
                                        const renderer = new _renderer40k__WEBPACK_IMPORTED_MODULE_1__["Renderer40k"](roster);
                                        renderer.render(rosterTitle, rosterList, forceUnits);
                                    }
                                }
                            }
                            else if (gameType == "Warhammer 40,000: Kill Team (2018)") {
                                let roster = Object(_roster40k__WEBPACK_IMPORTED_MODULE_0__["Create40kRoster"])(doc, false);
                                if (roster) {
                                    if (roster._forces.length > 0) {
                                        const renderer = new _renderer40k__WEBPACK_IMPORTED_MODULE_1__["Renderer40k"](roster);
                                        renderer.render(rosterTitle, rosterList, forceUnits);
                                    }
                                }
                            }
                            else if (gameType == "Age of Sigmar") {
                                let roster = Object(_rosterAoS__WEBPACK_IMPORTED_MODULE_2__["CreateAoSRoster"])(doc);
                                if (roster) {
                                    const renderer = new _rendererAoS__WEBPACK_IMPORTED_MODULE_3__["RendererAoS"](roster);
                                    renderer.render(rosterTitle, rosterList, forceUnits);
                                }
                            }
                        }
                    }
                }
            };
            reader.readAsDataURL(f);
        }
    }
}
const finput = document.getElementById('roster-file');
if (finput)
    finput.addEventListener('change', handleFileSelect, false);


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/*! exports provided: Justification, RenderText, RenderParagraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Justification", function() { return Justification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderText", function() { return RenderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderParagraph", function() { return RenderParagraph; });
var Justification;
(function (Justification) {
    Justification[Justification["Left"] = 0] = "Left";
    Justification[Justification["Right"] = 1] = "Right";
    Justification[Justification["Center"] = 2] = "Center";
})(Justification || (Justification = {}));
;
function RenderText(ctx, text, x, y, w, h, how) {
    if (ctx && text.length) {
        ctx.textBaseline = 'top';
        let measure = ctx.measureText(text);
        const tw = measure.width;
        const th = measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
        if (how == Justification.Center) {
            ctx.fillText(text, x + (w - tw) / 2, y + (h - th) / 2);
        }
        else if (how == Justification.Left) {
            ctx.fillText(text, x, y + (h - th) / 2);
        }
        else if (how == Justification.Right) {
            ctx.fillText(text, x + w - tw, y + (h - th) / 2);
        }
    }
}
function RenderParagraph(ctx, text, x, y, w) {
    let curY = y;
    if (ctx && text.length) {
        let lines = [];
        let currentLine = [];
        ctx.textBaseline = 'top';
        let length = 0;
        const spaceWidth = ctx.measureText(" ").width;
        const heightMeasure = ctx.measureText(text);
        const th = (heightMeasure.actualBoundingBoxDescent - heightMeasure.actualBoundingBoxAscent) * 1.2;
        text.split(" ").forEach(function (word) {
            const measure = ctx.measureText(word);
            if ((length + measure.width) > w) {
                lines.push(currentLine.join(" "));
                currentLine.length = 0;
                length = 0;
            }
            length += measure.width + spaceWidth;
            currentLine.push(word);
        });
        if (currentLine.length > 0) {
            lines.push(currentLine.join(" "));
        }
        for (let l of lines) {
            ctx.fillText(l, x, curY);
            curY += th;
        }
    }
    return curY;
}


/***/ }),

/***/ "./src/renderer40k.ts":
/*!****************************!*\
  !*** ./src/renderer40k.ts ***!
  \****************************/
/*! exports provided: Renderer40k */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer40k", function() { return Renderer40k; });
/* harmony import */ var _roster40k__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roster40k */ "./src/roster40k.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");


class Renderer40k {
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
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].HQ, document.getElementById('role_hq'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].TR, document.getElementById('role_tr'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].EL, document.getElementById('role_el'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].FA, document.getElementById('role_fa'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].HS, document.getElementById('role_hs'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].FL, document.getElementById('role_fl'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].DT, document.getElementById('role_dt'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].FT, document.getElementById('role_ft'));
        this._roles.set(_roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRole"].LW, document.getElementById('role_lw'));
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
                role.innerHTML = _roster40k__WEBPACK_IMPORTED_MODULE_0__["UnitRoleToString"][unit._role];
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
                Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, labels[i], x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, spell._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, spell._manifest.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, spell._range.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, spell._details, x, this._currentY, w);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, expl._name, x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, expl._diceRoll, x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, expl._distance, x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, expl._mortalWounds, x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._range.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._type.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._str.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._ap.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._damage.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            if (weapon._abilities) {
                this._currentY += 4;
                this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, weapon._abilities, x, this._currentY, w);
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._move.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._ws.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._bs.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._str.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._toughness.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._wounds.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._attacks.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._leadership.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, model._save.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        this._currentY += height;
    }
    renderAbilities(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "ABILITIES", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        for (let ab of unit._abilities) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            this._currentY += 2;
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 600);
            this._currentY += 2;
        }
    }
    renderRules(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "RULES", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        for (let rule of unit._rules) {
            const content = rule[0].toUpperCase();
            const desc = rule[1];
            this._currentY += 2;
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 600);
            this._currentY += 4;
        }
    }
    renderKeywords(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, kw, this._currentX + 190, this._currentY, 600);
        this._currentY += 2;
    }
    renderFactions(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "FACTIONS", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._factions];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, kw, this._currentX + 190, this._currentY, 600);
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
            x += w;
            for (let attr of tracker._table) {
                if (columnWidths)
                    w = columnWidths[ci++];
                Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, attr[1], x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
                x += w;
            }
            this._currentY += height;
        }
    }
    renderModelList(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "MODELS", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
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
        this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, modelList, this._currentX + 190, this._currentY, 600);
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
                this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, model._name, this._currentX + unitNameWidth, this._currentY + (woundBoxSize - 14) / 2, boxStartX - unitNameWidth - boxMargin);
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
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            const roleImg = this._roles.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart + 2 + 4, 24, 24);
            }
            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._powerLevel.toString(), imgX, yStart + 2, 32, 32, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart + 2, 32, 32);
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._points.toString(), imgX, yStart + 2, 32, 32, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unitName, title_x, yStart, maxWidth, titleHeight, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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


/***/ }),

/***/ "./src/rendererAoS.ts":
/*!****************************!*\
  !*** ./src/rendererAoS.ts ***!
  \****************************/
/*! exports provided: RendererAoS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererAoS", function() { return RendererAoS; });
/* harmony import */ var _rosterAoS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rosterAoS */ "./src/rosterAoS.ts");
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");


class RendererAoS {
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
                role.innerHTML = _rosterAoS__WEBPACK_IMPORTED_MODULE_0__["AoSUnitRoleToString"][unit._role];
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unitName, title_x, yStart, maxWidth, titleHeight, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
                Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, labels[i], x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
                x += w;
            }
        }
        this._currentY += height;
    }
    renderKeywords(ctx, unit) {
        ctx.font = '14px sans-serif';
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        const kwlist = [...unit._keywords];
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, kw, this._currentX + 190, this._currentY, 500);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._range.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._attacks.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._toHit.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._toWound.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._rend.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, weapon._damage.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, title, this._currentX + 20, this._currentY, 100, 16, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Left);
        ctx.font = '12px serif';
        for (let ab of data) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            this._currentY += 2;
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, content + ": " + desc, this._currentX + 190, this._currentY, 500);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, spell._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, spell._castingValue.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, spell._description, x, this._currentY, w);
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
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, prayer._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
            x += w;
            if (columnWidths)
                w = columnWidths[ci++];
            this._currentY += 2;
            this._currentY = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderParagraph"])(ctx, prayer._description, x, this._currentY, w);
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._name.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._move.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._wounds.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._bravery.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        if (columnWidths)
            w = columnWidths[ci++];
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._save.toString(), x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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
        Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, unit._woundTracker._name, x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
        x += w;
        for (let attr of unit._woundTracker._table) {
            if (columnWidths)
                w = columnWidths[ci++];
            Object(_renderer__WEBPACK_IMPORTED_MODULE_1__["RenderText"])(ctx, attr[1], x, this._currentY, w, height, _renderer__WEBPACK_IMPORTED_MODULE_1__["Justification"].Center);
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


/***/ }),

/***/ "./src/roster40k.ts":
/*!**************************!*\
  !*** ./src/roster40k.ts ***!
  \**************************/
/*! exports provided: Weapon, WoundTracker, Explosion, PsychicPower, UnitRole, UnitRoleToString, Model, Unit, Force, Roster40k, Create40kRoster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Weapon", function() { return Weapon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WoundTracker", function() { return WoundTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explosion", function() { return Explosion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PsychicPower", function() { return PsychicPower; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitRole", function() { return UnitRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitRoleToString", function() { return UnitRoleToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unit", function() { return Unit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Force", function() { return Force; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roster40k", function() { return Roster40k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Create40kRoster", function() { return Create40kRoster; });
class Weapon {
    constructor() {
        this._name = "";
        this._range = "Melee";
        this._type = "Melee";
        this._str = "user";
        this._ap = "";
        this._damage = "";
        this._abilities = "";
    }
}
class WoundTracker {
    constructor() {
        this._name = "";
        this._table = new Map();
    }
}
;
class Explosion {
    constructor() {
        this._name = "";
        this._diceRoll = "";
        this._distance = "";
        this._mortalWounds = "";
    }
}
class PsychicPower {
    constructor() {
        this._name = "";
        this._manifest = 0;
        this._range = "";
        this._details = "";
    }
}
var UnitRole;
(function (UnitRole) {
    UnitRole[UnitRole["NONE"] = 0] = "NONE";
    UnitRole[UnitRole["HQ"] = 1] = "HQ";
    UnitRole[UnitRole["TR"] = 2] = "TR";
    UnitRole[UnitRole["EL"] = 3] = "EL";
    UnitRole[UnitRole["FA"] = 4] = "FA";
    UnitRole[UnitRole["HS"] = 5] = "HS";
    UnitRole[UnitRole["FL"] = 6] = "FL";
    UnitRole[UnitRole["DT"] = 7] = "DT";
    UnitRole[UnitRole["FT"] = 8] = "FT";
    UnitRole[UnitRole["LW"] = 9] = "LW";
    UnitRole[UnitRole["COMMANDER"] = 10] = "COMMANDER";
    UnitRole[UnitRole["LEADER"] = 11] = "LEADER";
    UnitRole[UnitRole["SPECIALIST"] = 12] = "SPECIALIST";
    UnitRole[UnitRole["NON_SPECIALIST"] = 13] = "NON_SPECIALIST";
})(UnitRole || (UnitRole = {}));
;
const UnitRoleToString = [
    'None',
    'HQ',
    'Troops',
    'Elites',
    'Fast Attack',
    'Heavy Support',
    'Flyer',
    'Dedicated Transport',
    'Fortification',
    'Lord of War',
    'Commander',
    'Leader',
    'Specialist',
    'Non-specialist'
];
class Model {
    constructor() {
        this._name = "";
        this._count = 0;
        this._move = "0\"";
        this._ws = "";
        this._bs = "";
        this._str = 4;
        this._toughness = 4;
        this._wounds = 1;
        this._attacks = "";
        this._leadership = 7;
        this._save = "";
        this._weapons = [];
        this._psychicPowers = [];
        this._explosions = [];
    }
}
;
class Unit {
    constructor() {
        this._name = "";
        this._role = UnitRole.NONE;
        this._factions = new Set();
        this._keywords = new Set();
        this._abilities = new Map();
        this._rules = new Map();
        this._models = [];
        this._points = 0;
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._woundTracker = [];
    }
}
class Force {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._faction = "Unknown";
        this._rules = new Map();
        this._units = [];
    }
}
;
class Roster40k {
    constructor() {
        this._powerLevel = 0;
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
;
function Create40kRoster(doc, is40k = true) {
    var _a;
    if (doc) {
        var info = doc.querySelector("roster");
        if (info) {
            const roster = new Roster40k();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "40k Army Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster, is40k);
            return roster;
        }
    }
    return null;
}
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    var costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which == " PL") {
                    roster._powerLevel = +value;
                }
                else if (which === "pts") {
                    roster._points = +value;
                }
                else if (which === "CP") {
                    roster._commandPoints = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster, is40k) {
    var _a, _b, _c;
    var forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
            let f = new Force();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            var rules = root.querySelectorAll("force>rules>rule");
            for (let rule of rules) {
                if (rule.hasAttribute("name")) {
                    let ruleName = (_c = rule.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    var desc = rule.querySelector("rule>description");
                    if (ruleName && desc) {
                        f._rules.set(ruleName, desc.textContent);
                    }
                }
            }
            ParseUnits(root, f, is40k);
            roster._forces.push(f);
        }
    }
}
function ParseUnits(root, force, is40k) {
    var selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        var unit = CreateUnit(selection, is40k);
        if (unit && unit._role != UnitRole.NONE) {
            force._units.push(unit);
        }
    }
    force._units.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role)
            return 0;
        return -1;
    });
}
function LookupRole(roleText) {
    switch (roleText) {
        case 'HQ': return UnitRole.HQ;
        case 'Troops': return UnitRole.TR;
        case 'Elites': return UnitRole.EL;
        case 'Fast Attack': return UnitRole.FA;
        case 'Heavy Support': return UnitRole.HS;
        case 'Flyer': return UnitRole.FL;
        case 'Dedicated Transport': return UnitRole.DT;
        case 'Fortification': return UnitRole.FT;
        case 'Lord of War': return UnitRole.LW;
    }
    return UnitRole.NONE;
}
function LookupRoleKillTeam(roleText) {
    switch (roleText) {
        case 'Commander': return UnitRole.COMMANDER;
        case 'Leader': return UnitRole.LEADER;
        case 'Specialist': return UnitRole.SPECIALIST;
        case 'Non-specialist': return UnitRole.NON_SPECIALIST;
    }
    return UnitRole.NONE;
}
function CreateUnit(root, is40k) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var unit = new Unit();
    var unitName = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
    if (unitName) {
        unit._name = unitName;
    }
    var categories = root.querySelectorAll(":scope categories>category");
    for (let cat of categories) {
        let catName = (_b = cat.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (catName) {
            const factPattern = "Faction: ";
            const factIndex = catName.lastIndexOf(factPattern);
            if (factIndex >= 0) {
                const factKeyword = catName.slice(factIndex + factPattern.length);
                unit._factions.add(factKeyword);
            }
            else {
                const roleText = catName.trim();
                var unitRole = LookupRole(roleText);
                if (unitRole != UnitRole.NONE) {
                    unit._role = unitRole;
                }
                else {
                    if (!is40k) {
                        unitRole = LookupRoleKillTeam(roleText);
                        if (unitRole != UnitRole.NONE) {
                            unit._role = unitRole;
                        }
                        else {
                            unit._keywords.add(catName);
                        }
                    }
                    else {
                        unit._keywords.add(catName);
                    }
                }
            }
        }
    }
    var props = root.querySelectorAll(":scope profiles>profile");
    for (let prop of props) {
        let propName = (_c = prop.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
        let propType = (_d = prop.getAttributeNode("typeName")) === null || _d === void 0 ? void 0 : _d.nodeValue;
        if (propName && propType) {
            if ((propType === "Unit") || (propType === "Model")) {
                var model = new Model();
                model._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'M':
                                    model._move = char.textContent;
                                    break;
                                case 'WS':
                                    model._ws = char.textContent;
                                    break;
                                case 'BS':
                                    model._bs = char.textContent;
                                    break;
                                case 'S':
                                    model._str = +char.textContent;
                                    break;
                                case 'T':
                                    model._toughness = +char.textContent;
                                    break;
                                case 'W':
                                    model._wounds = +char.textContent;
                                    break;
                                case 'A':
                                    model._attacks = char.textContent;
                                    break;
                                case 'Ld':
                                    model._leadership = +char.textContent;
                                    break;
                                case 'Save':
                                    model._save = char.textContent;
                                    break;
                            }
                        }
                    }
                    if (prop.parentElement && prop.parentElement.parentElement) {
                        const parentSelection = prop.parentElement.parentElement;
                        let countValue = (_f = parentSelection.getAttributeNode("number")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                        if (countValue) {
                            model._count = +countValue;
                        }
                    }
                }
                unit._models.push(model);
            }
            else if ((propType === "Abilities") || (propType === "Wargear") || (propType === "Ability")) {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                    if (charName && char.textContent && propName) {
                        if ((charName === "Description") || (charName === "Ability")) {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType === "Weapon") {
                let weapon = new Weapon();
                weapon._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_h = char.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range':
                                    weapon._range = char.textContent;
                                    break;
                                case 'Type':
                                    weapon._type = char.textContent;
                                    break;
                                case 'S':
                                    weapon._str = char.textContent;
                                    break;
                                case 'AP':
                                    weapon._ap = char.textContent;
                                    break;
                                case 'D':
                                    weapon._damage = char.textContent;
                                    break;
                                case 'Abilities':
                                    weapon._abilities = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                if (unit._models.length) {
                    unit._models[unit._models.length - 1]._weapons.push(weapon);
                }
            }
            else if (propType.includes("Wound Track")) {
                let tracker = new WoundTracker();
                tracker._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_j = char.getAttributeNode("name")) === null || _j === void 0 ? void 0 : _j.nodeValue;
                    if (charName && propName) {
                        if (char.textContent) {
                            tracker._table.set(charName, char.textContent);
                        }
                        else {
                            tracker._table.set(charName, "-");
                        }
                    }
                }
                unit._woundTracker.push(tracker);
            }
            else if (propType == "Transport") {
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_k = char.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
                    if (charName && char.textContent && propName) {
                        if (charName === "Capacity") {
                            unit._abilities.set(propName, char.textContent);
                        }
                    }
                }
            }
            else if (propType == "Psychic Power") {
                let power = new PsychicPower();
                power._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_l = char.getAttributeNode("name")) === null || _l === void 0 ? void 0 : _l.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Range':
                                    power._range = char.textContent;
                                    break;
                                case 'Warp Charge':
                                    power._manifest = +char.textContent;
                                    break;
                                case 'Details':
                                    power._details = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._models[unit._models.length - 1]._psychicPowers.push(power);
            }
            else if (propType == "Explosion") {
                let explosion = new Explosion();
                explosion._name = propName;
                let chars = prop.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_m = char.getAttributeNode("name")) === null || _m === void 0 ? void 0 : _m.nodeValue;
                    if (charName) {
                        if (char.textContent) {
                            switch (charName) {
                                case 'Dice Roll':
                                    explosion._diceRoll = char.textContent;
                                    break;
                                case 'Distance':
                                    explosion._distance = char.textContent;
                                    break;
                                case 'Mortal Wounds':
                                    explosion._mortalWounds = char.textContent;
                                    break;
                            }
                        }
                    }
                }
                unit._models[unit._models.length - 1]._explosions.push(explosion);
            }
            else {
                console.log("Unknown profile type: " + propType);
            }
        }
    }
    var costs = root.querySelectorAll(":scope costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_o = cost.getAttributeNode("name")) === null || _o === void 0 ? void 0 : _o.nodeValue;
            let value = (_p = cost.getAttributeNode("value")) === null || _p === void 0 ? void 0 : _p.nodeValue;
            if (value) {
                if (which == " PL") {
                    unit._powerLevel += +value;
                }
                else if (which == "pts") {
                    unit._points += +value;
                }
                else if (which == "CP") {
                    unit._commandPoints += +value;
                }
            }
        }
    }
    var rules = root.querySelectorAll(":scope rules > rule");
    for (let rule of rules) {
        if (rule.hasAttribute("name")) {
            let ruleName = (_q = rule.getAttributeNode("name")) === null || _q === void 0 ? void 0 : _q.nodeValue;
            var desc = rule.querySelector("description");
            if (ruleName && desc && desc.textContent) {
                unit._rules.set(ruleName, desc.textContent);
            }
        }
    }
    return unit;
}


/***/ }),

/***/ "./src/rosterAoS.ts":
/*!**************************!*\
  !*** ./src/rosterAoS.ts ***!
  \**************************/
/*! exports provided: AoSWeapon, AoSWoundTracker, AoSSpell, AoSPrayer, AoSAllegiance, AoSUnitRole, AoSUnitRoleToString, AoSUnit, AoSForce, RosterAoS, CreateAoSRoster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSWeapon", function() { return AoSWeapon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSWoundTracker", function() { return AoSWoundTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSSpell", function() { return AoSSpell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSPrayer", function() { return AoSPrayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSAllegiance", function() { return AoSAllegiance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSUnitRole", function() { return AoSUnitRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSUnitRoleToString", function() { return AoSUnitRoleToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSUnit", function() { return AoSUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AoSForce", function() { return AoSForce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RosterAoS", function() { return RosterAoS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateAoSRoster", function() { return CreateAoSRoster; });
class AoSWeapon {
    constructor() {
        this._name = "";
        this._type = "Melee";
        this._range = "";
        this._attacks = "";
        this._toHit = "";
        this._toWound = "";
        this._rend = "";
        this._damage = "";
    }
}
class AoSWoundTracker {
    constructor() {
        this._name = "";
        this._woundTrackerLabels = [];
        this._table = new Map();
    }
}
;
class AoSSpell {
    constructor() {
        this._name = "";
        this._castingValue = 0;
        this._description = "";
    }
}
class AoSPrayer {
    constructor() {
        this._name = "";
        this._description = "";
    }
}
class AoSAllegiance {
    constructor() {
        this._name = "";
        this._battleTraits = new Map();
        this._commandAbilities = new Map();
    }
}
var AoSUnitRole;
(function (AoSUnitRole) {
    AoSUnitRole[AoSUnitRole["NONE"] = 0] = "NONE";
    AoSUnitRole[AoSUnitRole["LEADER"] = 1] = "LEADER";
    AoSUnitRole[AoSUnitRole["BATTLELINE"] = 2] = "BATTLELINE";
    AoSUnitRole[AoSUnitRole["BEHEMOTH"] = 3] = "BEHEMOTH";
    AoSUnitRole[AoSUnitRole["ARTILLERY"] = 4] = "ARTILLERY";
    AoSUnitRole[AoSUnitRole["OTHER"] = 5] = "OTHER";
    AoSUnitRole[AoSUnitRole["SCENERY"] = 6] = "SCENERY";
    AoSUnitRole[AoSUnitRole["BATTALION"] = 7] = "BATTALION";
    AoSUnitRole[AoSUnitRole["MALIGN_SORCERY"] = 8] = "MALIGN_SORCERY";
    AoSUnitRole[AoSUnitRole["REALM"] = 9] = "REALM";
})(AoSUnitRole || (AoSUnitRole = {}));
;
const AoSUnitRoleToString = [
    'None',
    'Leader',
    'Battleline',
    'Behemoth',
    'Artillery',
    'Other',
    'Scenery',
    'Battalion',
    'Malign Sorcery',
    'Realm'
];
class AoSUnit {
    constructor() {
        this._name = "";
        this._role = AoSUnitRole.NONE;
        this._keywords = new Set();
        this._abilities = new Map();
        this._commandAbilities = new Map();
        this._commandTraits = new Map();
        this._magic = new Map();
        this._artefacts = new Map();
        this._count = 0;
        this._move = "0\"";
        this._wounds = 1;
        this._bravery = 7;
        this._save = "";
        this._weapons = [];
        this._spells = [];
        this._prayers = [];
        this._points = 0;
        this._woundTracker = null;
    }
}
class AoSForce {
    constructor() {
        this._catalog = "";
        this._name = "Unknown";
        this._units = [];
        this._allegiance = new AoSAllegiance();
    }
}
;
class RosterAoS {
    constructor() {
        this._commandPoints = 0;
        this._points = 0;
        this._name = "";
        this._forces = [];
    }
}
;
function LookupRole(roleText) {
    switch (roleText) {
        case 'Leader': return AoSUnitRole.LEADER;
        case 'Battleline': return AoSUnitRole.BATTLELINE;
        case 'Other': return AoSUnitRole.OTHER;
        case 'Behemoth': return AoSUnitRole.BEHEMOTH;
        case 'Artillery': return AoSUnitRole.ARTILLERY;
        case 'Scenery': return AoSUnitRole.SCENERY;
        case 'Battalion': return AoSUnitRole.BATTALION;
        case 'Malign Sorcery': return AoSUnitRole.MALIGN_SORCERY;
        case 'Realm': return AoSUnitRole.REALM;
    }
    return AoSUnitRole.NONE;
}
function CreateAoSRoster(doc) {
    var _a;
    if (doc) {
        let info = doc.querySelector("roster");
        if (info) {
            const roster = new RosterAoS();
            const name = (_a = info.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            if (name) {
                roster._name = name;
            }
            else {
                roster._name = "Age of Sigmar Roster";
            }
            ParseRosterPoints(doc, roster);
            ParseForces(doc, roster);
            return roster;
        }
    }
    return null;
}
function ParseRosterPoints(doc, roster) {
    var _a, _b;
    let costs = doc.querySelectorAll("roster>costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_a = cost.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = cost.getAttributeNode("value")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (value) {
                if (which === "pts") {
                    roster._points = +value;
                }
            }
        }
    }
}
function ParseForces(doc, roster) {
    var _a, _b;
    let forcesRoot = doc.querySelectorAll("roster>forces>force");
    for (let root of forcesRoot) {
        if (root.hasAttribute("name") && root.hasAttribute("catalogueName")) {
            let f = new AoSForce();
            let which = (_a = root.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
            let value = (_b = root.getAttributeNode("catalogueName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            if (which) {
                f._name = which;
            }
            if (value) {
                f._catalog = value;
            }
            ParseSelections(root, f);
            roster._forces.push(f);
        }
    }
    console.log(roster);
}
function ParseSelections(root, force) {
    var _a, _b;
    let selections = root.querySelectorAll("force>selections>selection");
    for (let selection of selections) {
        let selectionType = (_a = selection.getAttributeNode("type")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (!selectionType)
            continue;
        let selectionName = (_b = selection.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (selectionName && (selectionName.includes("Allegiance"))) {
            let allegiance = ParseAllegiance(selection);
            if (allegiance) {
                force._allegiance = allegiance;
            }
        }
        else {
            let unit = ParseUnit(selection);
            if (unit && (unit._role != AoSUnitRole.NONE)) {
                force._units.push(unit);
            }
        }
    }
    force._units.sort((a, b) => {
        if (a._role > b._role)
            return 1;
        else if (a._role == b._role)
            return 0;
        return -1;
    });
}
function ParseUnit(root) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let unit = new AoSUnit();
    let profiles = root.querySelectorAll("profiles>profile");
    for (let prof of profiles) {
        let profName = (_a = prof.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        let profType = (_b = prof.getAttributeNode("typeName")) === null || _b === void 0 ? void 0 : _b.nodeValue;
        if (profName && profType) {
            if (profType == "Unit") {
                unit._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_c = char.getAttributeNode("name")) === null || _c === void 0 ? void 0 : _c.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Move':
                                unit._move = char.textContent;
                                break;
                            case 'Wounds':
                                unit._wounds = +char.textContent;
                                break;
                            case 'Bravery':
                                unit._bravery = +char.textContent;
                                break;
                            case 'Save':
                                unit._save = char.textContent;
                                break;
                        }
                    }
                }
            }
            else if (profType == "Unit Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Command Abilities") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandAbilities.set(profName, char.textContent);
                }
            }
            else if (profType == "Magic") {
                let characteristics = prof.querySelectorAll("characteristics>characteristic");
                for (let char of characteristics) {
                    let charName = (_d = char.getAttributeNode("name")) === null || _d === void 0 ? void 0 : _d.nodeValue;
                    if (charName && char.textContent) {
                        unit._magic.set(charName, char.textContent);
                    }
                }
            }
            else if (profType == "Unit Leader") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._abilities.set(profType, char.textContent);
                }
            }
            else if (profType == "Spell") {
                let spell = new AoSSpell();
                spell._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_e = char.getAttributeNode("name")) === null || _e === void 0 ? void 0 : _e.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Casting Value':
                                spell._castingValue = +char.textContent;
                                break;
                            case 'Description':
                                spell._description = char.textContent;
                                break;
                        }
                    }
                }
                unit._spells.push(spell);
            }
            else if (profType == "Weapon") {
                let weapon = new AoSWeapon();
                weapon._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_f = char.getAttributeNode("name")) === null || _f === void 0 ? void 0 : _f.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Range':
                                weapon._range = char.textContent;
                                break;
                            case 'Type':
                                weapon._type = char.textContent;
                                break;
                            case 'Attacks':
                                weapon._attacks = char.textContent;
                                break;
                            case 'Rend':
                                weapon._rend = char.textContent;
                                break;
                            case 'To Hit':
                                weapon._toHit = char.textContent;
                                break;
                            case 'To Wound':
                                weapon._toWound = char.textContent;
                                break;
                            case 'Damage':
                                weapon._damage = char.textContent;
                                break;
                        }
                    }
                }
                unit._weapons.push(weapon);
            }
            else if (profType == "Command Trait") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._commandTraits.set(profName, char.textContent);
                }
            }
            else if (profType == "Artefact") {
                let char = prof.querySelector("characteristics>characteristic");
                if (char && char.textContent) {
                    unit._artefacts.set(profName, char.textContent);
                }
            }
            else if (profType == "Prayer") {
                let prayer = new AoSPrayer();
                prayer._name = profName;
                let chars = prof.querySelectorAll("characteristics>characteristic");
                for (let char of chars) {
                    let charName = (_g = char.getAttributeNode("name")) === null || _g === void 0 ? void 0 : _g.nodeValue;
                    if (charName && char.textContent) {
                        switch (charName) {
                            case 'Description':
                                prayer._description = char.textContent;
                                break;
                        }
                    }
                }
                unit._prayers.push(prayer);
            }
            else if (profType.includes("Wound Track") || profType.includes("Damage Table")) {
            }
            else {
                console.log("Unknown unit profile type: " + profType);
            }
        }
    }
    let costs = root.querySelectorAll("costs>cost");
    for (let cost of costs) {
        if (cost.hasAttribute("name") && cost.hasAttribute("value")) {
            let which = (_h = cost.getAttributeNode("name")) === null || _h === void 0 ? void 0 : _h.nodeValue;
            let value = (_j = cost.getAttributeNode("value")) === null || _j === void 0 ? void 0 : _j.nodeValue;
            if (value) {
                if (which === "pts") {
                    unit._points += +value;
                }
            }
        }
    }
    let categories = root.querySelectorAll(":scope categories>category");
    for (let category of categories) {
        let catName = (_k = category.getAttributeNode("name")) === null || _k === void 0 ? void 0 : _k.nodeValue;
        let catPrimary = (_l = category.getAttributeNode("primary")) === null || _l === void 0 ? void 0 : _l.nodeValue;
        if (catName) {
            const roleText = catName.trim();
            var unitRole = LookupRole(roleText);
            if (unitRole != AoSUnitRole.NONE) {
                unit._role = unitRole;
            }
            else {
                unit._keywords.add(catName);
            }
        }
    }
    return unit;
}
function ParseAllegiance(root) {
    var _a, _b, _c, _d, _e;
    let allegiance = null;
    let selection = root.querySelector("selections>selection");
    if (selection) {
        let name = (_a = selection.getAttributeNode("name")) === null || _a === void 0 ? void 0 : _a.nodeValue;
        if (name) {
            allegiance = new AoSAllegiance();
            allegiance._name = name;
        }
        let profiles = selection.querySelectorAll("profiles>profile");
        for (let prof of profiles) {
            let profName = (_b = prof.getAttributeNode("name")) === null || _b === void 0 ? void 0 : _b.nodeValue;
            let profType = (_c = prof.getAttributeNode("typeName")) === null || _c === void 0 ? void 0 : _c.nodeValue;
            if (profName && profType) {
                if (profType == "Battle Trait") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            (_d = allegiance) === null || _d === void 0 ? void 0 : _d._battleTraits.set(profName, description);
                        }
                    }
                }
                else if (profType == "Command Abilities") {
                    let desc = prof.querySelector("characteristics>characteristic");
                    if (desc) {
                        let description = desc.textContent;
                        if (description) {
                            (_e = allegiance) === null || _e === void 0 ? void 0 : _e._commandAbilities.set(profName, description);
                        }
                    }
                }
                else {
                    console.log("Unexpected allegiance profile type: " + profType);
                }
            }
        }
    }
    return allegiance;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlcmVyNDBrLnRzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXJlckFvUy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9zdGVyNDBrLnRzIiwid2VicGFjazovLy8uL3NyYy9yb3N0ZXJBb1MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlEO0FBQ2I7QUFDRTtBQUNGO0FBRTVDLFNBQVMsaUJBQWlCLENBQUMsTUFBc0I7SUFDL0MsSUFBSSxNQUFNLEVBQUU7UUFDVixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFD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LEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsa0JBQWtCLENBQUM7UUFDbEQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFD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Q0FBQyxXQUFXLENBQUM7WUFDeEMsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1RixDQUFD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QUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFNUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQ3hDLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0YsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUYsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUYsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0YsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksWUFBWTtnQkFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0YsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO1lBRXpCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxrQkFBa0IsQ0FBQztZQUNsRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQzs7Z0JBQzdDLEdBQUcsQ0FBQyxTQUFTLEdBQUksU0FBUyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxDQUFDO1lBRUosR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxTQUFTLENBQUMsR0FBNkIsRUFBRSxLQUFhLEVBQUUsSUFBeUI7UUFDckYsR0FBRyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUM3Qiw0REFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLHVEQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekYsR0FBRyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDeEIsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDakIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLGlFQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0c7UUFDRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sWUFBWSxDQUFDLEdBQTZCLEVBQUUsTUFBa0IsRUFBRSxZQUE2QjtRQUNqRyxHQUFHLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBRTdCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFWCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUU1QixHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDeEMsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1RixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLGlFQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVQLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDOztnQkFDN0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDL0IsR0FBRyxDQUFDLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDO1lBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxDQUFDO1lBRUosR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxhQUFhLENBQUMsR0FBNkIsRUFBRSxPQUFvQixFQUFFLFlBQTZCO1FBQ3BHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFFN0IsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVYLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRTVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxJQUFJLFlBQVk7Z0JBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLDREQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSx1REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdGLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFUCxJQUFJLFlBQVk7Z0JBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRVAsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7O2dCQUM3QyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMvQixHQUFHLENBQUMsd0JBQXdCLEdBQUcsa0JBQWtCLENBQUM7WUFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDN0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxFQUFFLENBQUM7WUFFSixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakI7UUFDRCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUE2QixFQUFFLElBQWEsRUFBRSxZQUE2QixFQUFFLEVBQVU7UUFFM0csTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVgsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQzs7WUFDOUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhELEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxHQUFHLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBRTdCLElBQUksWUFBWTtZQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVAsSUFBSSxZQUFZO1lBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLDREQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSx1REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNGLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFUCxJQUFJLFlBQVk7WUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsNERBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0YsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVQLElBQUksWUFBWTtZQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsdURBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVAsSUFBSSxZQUFZO1lBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLDREQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSx1REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNGLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBNkIsRUFBRSxJQUFhLEVBQUUsWUFBNkI7UUFDaEcsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVgsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWCxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhELEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN4QyxHQUFHLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQzdCLElBQUksWUFBWTtZQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVEQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUYsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVQLEtBQUssSUFBSSxJQUFJLElBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDekMsSUFBSSxZQUFZO2dCQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6Qyw0REFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSx1REFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFTyxZQUFZLENBQUMsR0FBNkIsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzFGLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUUxQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsa0JBQWtCLENBQUM7UUFDbEQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxH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QUM7QUFDdEIsQ0FBQyIsImZpbGUiOiJwcmV0dHlzY3JpYmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiaW1wb3J0IHsgUm9zdGVyNDBrLCBDcmVhdGU0MGtSb3N0ZXIgfSBmcm9tIFwiLi9yb3N0ZXI0MGtcIjtcbmltcG9ydCB7IFJlbmRlcmVyNDBrIH0gZnJvbSBcIi4vcmVuZGVyZXI0MGtcIjtcbmltcG9ydCB7IENyZWF0ZUFvU1Jvc3RlciB9IGZyb20gXCIuL3Jvc3RlckFvU1wiO1xuaW1wb3J0IHsgUmVuZGVyZXJBb1MgfSBmcm9tIFwiLi9yZW5kZXJlckFvU1wiO1xuXG5mdW5jdGlvbiByZW1vdmVBbGxDaGlsZHJlbihwYXJlbnQ6IEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gIGlmIChwYXJlbnQpIHtcbiAgICBsZXQgZmlyc3QgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGZpcnN0KSB7XG4gICAgICBmaXJzdC5yZW1vdmUoKTtcbiAgICAgIGZpcnN0ID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhbnVwKCk6IHZvaWQge1xuICBjb25zdCByb3N0ZXJUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3N0ZXItdGl0bGUnKTtcbiAgcmVtb3ZlQWxsQ2hpbGRyZW4ocm9zdGVyVGl0bGUpO1xuXG4gIGNvbnN0IHJvc3Rlckxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9zdGVyLWxpc3RzJyk7XG4gIHJlbW92ZUFsbENoaWxkcmVuKHJvc3Rlckxpc3QpO1xuXG4gIGNvbnN0IGZvcmNlVW5pdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9yY2UtdW5pdHMnKTtcbiAgcmVtb3ZlQWxsQ2hpbGRyZW4oZm9yY2VVbml0cyk7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHN1YnN0cmluZ3MgPSBmaWxlbmFtZS5zcGxpdCgnLicpO1xuICBpZiAoc3Vic3RyaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHN1YnN0cmluZ3Nbc3Vic3RyaW5ncy5sZW5ndGgtMV07XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QoZXZlbnQ6IEV2ZW50KSB7XG4gIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0IGZpbGVzID0gaW5wdXQuZmlsZXM7XG5cbiAgY2xlYW51cCgpO1xuXG4gIGlmIChmaWxlcykge1xuICAgIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgZm9yIChsZXQgZiBvZiBmaWxlcykge1xuXG4gICAgICBjb25zdCBmaWxlRXh0ID0gZ2V0RmlsZUV4dGVuc2lvbihmLm5hbWUpO1xuICAgICAgaWYgKGZpbGVFeHQgPT0gXCJyb3N6XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJHb3QgemlwcGVkIGZpbGUuXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gZS50YXJnZXQ7XG4gICAgICAgIGlmIChyZSAmJiByZS5yZXN1bHQpIHtcbiAgICAgICAgICBsZXQgc291cmNlRGF0YSA9IHJlLnJlc3VsdDtcbiAgICAgICAgICAvLyBTa2lwIGVuY29kaW5nIHRhZ1xuICAgICAgICAgIGNvbnN0IHhtbGRhdGFzdGFydCA9IHNvdXJjZURhdGEudG9TdHJpbmcoKS5pbmRleE9mKCcsJykgKyAxO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJYTUwgU3RhcnQ6IFwiICsgeG1sZGF0YXN0YXJ0KTtcbiAgICAgICAgICBjb25zdCB4bWxkYXRhID0gd2luZG93LmF0b2Ioc291cmNlRGF0YS50b1N0cmluZygpLnNsaWNlKHhtbGRhdGFzdGFydCkpO1xuICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoeG1sZGF0YSwgXCJ0ZXh0L3htbFwiKTtcblxuICAgICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgIC8vIERldGVybWluZSByb3N0ZXIgdHlwZSAoZ2FtZSBzeXN0ZW0pLlxuICAgICAgICAgICAgbGV0IGluZm8gPSBkb2MucXVlcnlTZWxlY3RvcihcInJvc3RlclwiKTtcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGdhbWVUeXBlID0gaW5mby5nZXRBdHRyaWJ1dGVOb2RlKFwiZ2FtZVN5c3RlbU5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKCFnYW1lVHlwZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJvc3RlclRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvc3Rlci10aXRsZScpO1xuICAgICAgICAgICAgICBjb25zdCByb3N0ZXJMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvc3Rlci1saXN0cycpO1xuICAgICAgICAgICAgICBjb25zdCBmb3JjZVVuaXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvcmNlLXVuaXRzJyk7XG5cbiAgICAgICAgICAgICAgaWYgKGdhbWVUeXBlID09IFwiV2FyaGFtbWVyIDQwLDAwMCA4dGggRWRpdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvc3RlciA9IENyZWF0ZTQwa1Jvc3Rlcihkb2MpO1xuICAgICAgICAgICAgICAgIGlmIChyb3N0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyb3N0ZXIuX2ZvcmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVyOiBSZW5kZXJlcjQwayA9IG5ldyBSZW5kZXJlcjQwayhyb3N0ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5yZW5kZXIocm9zdGVyVGl0bGUsIHJvc3Rlckxpc3QsIGZvcmNlVW5pdHMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChnYW1lVHlwZSA9PSBcIldhcmhhbW1lciA0MCwwMDA6IEtpbGwgVGVhbSAoMjAxOClcIikge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJLaWxsIFRlYW0gbm90IHN1cHBvcnRlZCB5ZXQuXCIpO1xuICAgICAgICAgICAgICAgIGxldCByb3N0ZXIgPSBDcmVhdGU0MGtSb3N0ZXIoZG9jLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJvc3Rlcikge1xuICAgICAgICAgICAgICAgICAgaWYgKHJvc3Rlci5fZm9yY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZXI6IFJlbmRlcmVyNDBrID0gbmV3IFJlbmRlcmVyNDBrKHJvc3Rlcik7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihyb3N0ZXJUaXRsZSwgcm9zdGVyTGlzdCwgZm9yY2VVbml0cyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGdhbWVUeXBlID09IFwiQWdlIG9mIFNpZ21hclwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvc3RlciA9IENyZWF0ZUFvU1Jvc3Rlcihkb2MpO1xuICAgICAgICAgICAgICAgIGlmIChyb3N0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVyOiBSZW5kZXJlckFvUyA9IG5ldyBSZW5kZXJlckFvUyhyb3N0ZXIpO1xuICAgICAgICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHJvc3RlclRpdGxlLCByb3N0ZXJMaXN0LCBmb3JjZVVuaXRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGYpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBmaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9zdGVyLWZpbGUnKTtcbmlmIChmaW5wdXQpIGZpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG4iLCJleHBvcnQgaW50ZXJmYWNlIFJlbmRlcmVyIHtcblxuICAgIHJlbmRlcih0aXRsZTogSFRNTEVsZW1lbnR8bnVsbCwgbGlzdDogSFRNTEVsZW1lbnR8bnVsbCwgZm9yY2VzOiBIVE1MRWxlbWVudHxudWxsKTogdm9pZDtcblxufVxuXG5leHBvcnQgZW51bSBKdXN0aWZpY2F0aW9uIHtcbiAgICBMZWZ0LFxuICAgIFJpZ2h0LFxuICAgIENlbnRlclxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlbmRlclRleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBob3c6IEp1c3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICBpZiAoY3R4ICYmIHRleHQubGVuZ3RoKSB7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJzsgLy8gTWFrZSB0aGUgdGV4dCBvcmlnaW4gYXQgdGhlIHVwcGVyLWxlZnQgdG8gbWFrZSBwb3NpdGlvbmluZyBlYXNpZXJcbiAgICAgICAgbGV0IG1lYXN1cmUgPSBjdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIGNvbnN0IHR3ID0gbWVhc3VyZS53aWR0aDtcbiAgICAgICAgY29uc3QgdGggPSBtZWFzdXJlLmFjdHVhbEJvdW5kaW5nQm94RGVzY2VudCAtIG1lYXN1cmUuYWN0dWFsQm91bmRpbmdCb3hBc2NlbnQ7XG5cbiAgICAgICAgaWYgKGhvdyA9PSBKdXN0aWZpY2F0aW9uLkNlbnRlcikge1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHggKyAodyAtIHR3KSAvIDIsIHkgKyAoaCAtIHRoKSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhvdyA9PSBKdXN0aWZpY2F0aW9uLkxlZnQpIHtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5ICsgKGggLSB0aCkgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChob3cgPT0gSnVzdGlmaWNhdGlvbi5SaWdodCkge1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHggKyB3IC0gdHcsIHkgKyAoaCAtIHRoKSAvIDIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVuZGVyUGFyYWdyYXBoKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBjdXJZOiBudW1iZXIgPSB5O1xuICAgIGlmIChjdHggJiYgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudExpbmU6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJzsgLy8gTWFrZSB0aGUgdGV4dCBvcmlnaW4gYXQgdGhlIHVwcGVyLWxlZnQgdG8gbWFrZSBwb3NpdGlvbmluZyBlYXNpZXJcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgICAgIGNvbnN0IHNwYWNlV2lkdGggPSBjdHgubWVhc3VyZVRleHQoXCIgXCIpLndpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHRNZWFzdXJlID0gY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICBjb25zdCB0aCA9IChoZWlnaHRNZWFzdXJlLmFjdHVhbEJvdW5kaW5nQm94RGVzY2VudCAtIGhlaWdodE1lYXN1cmUuYWN0dWFsQm91bmRpbmdCb3hBc2NlbnQpICogMS4yO1xuXG4gICAgICAgIHRleHQuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lYXN1cmU6IFRleHRNZXRyaWNzID0gY3R4Lm1lYXN1cmVUZXh0KHdvcmQpO1xuICAgICAgICAgICAgaWYgKChsZW5ndGggKyBtZWFzdXJlLndpZHRoKSA+IHcpIHtcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKGN1cnJlbnRMaW5lLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGluZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZW5ndGggKz0gbWVhc3VyZS53aWR0aCArIHNwYWNlV2lkdGg7XG4gICAgICAgICAgICBjdXJyZW50TGluZS5wdXNoKHdvcmQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnRMaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2goY3VycmVudExpbmUuam9pbihcIiBcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbCBvZiBsaW5lcykge1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGwsIHgsIGN1clkpO1xuICAgICAgICAgICAgY3VyWSArPSB0aDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VyWTtcbn1cblxuXG4iLCJpbXBvcnQgeyBVbml0LCBVbml0Um9sZSwgVW5pdFJvbGVUb1N0cmluZywgTW9kZWwsIFBzeWNoaWNQb3dlciwgRXhwbG9zaW9uLCBXZWFwb24sIFJvc3RlcjQwayB9IGZyb20gXCIuL3Jvc3RlcjQwa1wiO1xuaW1wb3J0IHsgUmVuZGVyZXIsIEp1c3RpZmljYXRpb24sIFJlbmRlclRleHQsIFJlbmRlclBhcmFncmFwaH0gZnJvbSBcIi4vcmVuZGVyZXJcIjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyNDBrIGltcGxlbWVudHMgUmVuZGVyZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBfcmVzOiBudW1iZXIgPSAxNDQ7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBfbWFyZ2luOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2JldmVsU2l6ZSA9IDE1O1xuXG4gICAgcHJpdmF0ZSBfcm9zdGVyOiBSb3N0ZXI0MGt8bnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50WDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jdXJyZW50WTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhXaWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIF9vY3RhZ29uOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9yb2xlczogTWFwPFVuaXRSb2xlLCBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfYmxhY2tDb2xvciA9ICcjMWQyNzJhJztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfZ3JleTEgPSAnI2IzYmJiNSc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2dyZXlMaWdodCA9ICcjZGRlMWRmJztcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfZmlsbENvbG9yID0gJyNmNmY2ZjYnO1xuXG4gICAgY29uc3RydWN0b3Iocm9zdGVyOiBSb3N0ZXI0MGspIHtcblxuICAgICAgICB0aGlzLl9yb3N0ZXIgPSByb3N0ZXI7XG4gICAgICAgIHRoaXMuX29jdGFnb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2N0YWdvbicpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fcm9sZXMuc2V0KFVuaXRSb2xlLkhRLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZV9ocScpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9yb2xlcy5zZXQoVW5pdFJvbGUuVFIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlX3RyJykgYXMgSFRNTEltYWdlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3JvbGVzLnNldChVbml0Um9sZS5FTCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGVfZWwnKSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcm9sZXMuc2V0KFVuaXRSb2xlLkZBLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZV9mYScpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9yb2xlcy5zZXQoVW5pdFJvbGUuSFMsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlX2hzJykgYXMgSFRNTEltYWdlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3JvbGVzLnNldChVbml0Um9sZS5GTCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGVfZmwnKSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fcm9sZXMuc2V0KFVuaXRSb2xlLkRULCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZV9kdCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9yb2xlcy5zZXQoVW5pdFJvbGUuRlQsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlX2Z0JykgYXMgSFRNTEltYWdlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX3JvbGVzLnNldChVbml0Um9sZS5MVywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGVfbHcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIodGl0bGU6IEhUTUxFbGVtZW50fG51bGwsIGxpc3Q6IEhUTUxFbGVtZW50fG51bGwsIGZvcmNlczogSFRNTEVsZW1lbnR8bnVsbCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3N0ZXIgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgdGl0bGUuaW5uZXJIVE1MID0gJzxoMz4nICsgdGhpcy5fcm9zdGVyLl9uYW1lICsgJyAoJyArIHRoaXMuX3Jvc3Rlci5fcG9pbnRzICsgJyBwdHMsICcgKyB0aGlzLl9yb3N0ZXIuX3Bvd2VyTGV2ZWwgKyAnIFBMLCAnICsgdGhpcy5fcm9zdGVyLl9jb21tYW5kUG9pbnRzICsgJyBDUCk8L2gzPic7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBmb3JjZSBvZiB0aGlzLl9yb3N0ZXIuX2ZvcmNlcykge1xuICAgICAgICAgICAgY29uc3QgZm9yY2VUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKGZvcmNlVGl0bGUpIHtcbiAgICAgICAgICAgICAgZm9yY2VUaXRsZS5pbm5lckhUTUwgPSAnPHA+JyArIGZvcmNlLl9jYXRhbG9nICsgJyAnICsgZm9yY2UuX25hbWUgKyAnPC9wPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGlzdClcbiAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGZvcmNlVGl0bGUpO1xuXG4gICAgICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCd0YWJsZScpO1xuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUtc20nKTtcbiAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlLXN0cmlwZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHRoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKTtcbiAgICAgICAgICAgIHRoZWFkLmNsYXNzTGlzdC5hZGQoJ3RoZWFkLWxpZ2h0Jyk7XG4gICAgICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICB0aGVhZC5hcHBlbmRDaGlsZCh0cik7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJJbmZvID0gW3sgbmFtZTogXCJOQU1FXCIsIHc6ICcyNSUnfSwge25hbWU6XCJST0xFXCIsIHc6JzIwJSd9LCB7bmFtZTpcIk1PREVMU1wiLCB3OicyNSUnfSwge25hbWU6XCJQT0lOVFNcIiwgdzonMTUlJ30sIHtuYW1lOlwiUE9XRVJcIiwgdzonMTUlJ31dO1xuICAgICAgICAgICAgaGVhZGVySW5mby5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBsZXQgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICAgICAgICB0aC5zY29wZSA9IFwiY29sXCI7XG4gICAgICAgICAgICAgIHRoLmlubmVySFRNTCA9IGVsZW1lbnQubmFtZTtcbiAgICAgICAgICAgICAgdGguc3R5bGUud2lkdGggPSBlbGVtZW50Lnc7XG4gICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yY2VUaXRsZS5hcHBlbmRDaGlsZCh0YWJsZSk7XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGJvZHkpO1xuICAgICAgICAgICAgZm9yIChsZXQgdW5pdCBvZiBmb3JjZS5fdW5pdHMpIHtcbiAgICAgICAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgICAgbGV0IHVuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgdW5hbWUuaW5uZXJIVE1MID0gdW5pdC5fbmFtZTtcbiAgICAgICAgICAgICAgbGV0IHJvbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICByb2xlLmlubmVySFRNTCA9IFVuaXRSb2xlVG9TdHJpbmdbdW5pdC5fcm9sZV07XG4gICAgICAgICAgICAgIGxldCBtb2RlbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICBtb2RlbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgbGV0IG1pID0gMDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlbCBvZiB1bml0Ll9tb2RlbHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5fY291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVscy5pbm5lckhUTUwgKz0gbW9kZWwuX2NvdW50ICsgXCIgXCIgKyBtb2RlbC5fbmFtZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIG1vZGVscy5pbm5lckhUTUwgKz0gbW9kZWwuX25hbWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBtaSsrO1xuICAgICAgICAgICAgICAgICAgaWYgKG1pICE9IHVuaXQuX21vZGVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlbHMuaW5uZXJIVE1MICs9IFwiLCAgXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgcHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgcHRzLmlubmVySFRNTCA9IHVuaXQuX3BvaW50cy50b1N0cmluZygpO1xuICAgICAgICAgICAgICBsZXQgcHdyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgcHdyLmlubmVySFRNTCA9IHVuaXQuX3Bvd2VyTGV2ZWwudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodW5hbWUpO1xuICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZChyb2xlKTtcbiAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQobW9kZWxzKTtcbiAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQocHRzKTtcbiAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQocHdyKTtcbiAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0cik7ICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCB1bml0IG9mIGZvcmNlLl91bml0cykge1xuICAgICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IFJlbmRlcmVyNDBrLl9yZXMgKiA1LjU7XG4gICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBSZW5kZXJlcjQway5fcmVzICogOC41O1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY29uc3QgZGltcyA9IHRoaXMucmVuZGVyVW5pdCh1bml0LCBjYW52YXMsIDAsIDApO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGJvcmRlciA9IDI1O1xuICAgICAgICAgICAgICBsZXQgZmluYWxDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgICAgICAgZmluYWxDYW52YXMud2lkdGggPSBkaW1zWzBdICsgYm9yZGVyICogMjtcbiAgICAgICAgICAgICAgZmluYWxDYW52YXMuaGVpZ2h0ID0gZGltc1sxXSArIGJvcmRlciAqIDI7XG4gICAgICAgICAgICAgIGxldCBmaW5hbEN0eCA9IGZpbmFsQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgIGZpbmFsQ3R4Py5kcmF3SW1hZ2UoY2FudmFzLCBib3JkZXIsIGJvcmRlcik7XG4gICAgICAgICAgICAgIGlmIChmb3JjZXMpIFxuICAgICAgICAgICAgICAgIGZvcmNlcy5hcHBlbmRDaGlsZChmaW5hbENhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gXG4gICAgcHJpdmF0ZSByZW5kZXJCb3JkZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeSArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHgsIHkgKyBoIC0gUmVuZGVyZXI0MGsuX2JldmVsU2l6ZSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdyAtIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIGggLSBSZW5kZXJlcjQway5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHggKyB3IC0gUmVuZGVyZXI0MGsuX2JldmVsU2l6ZSwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXI0MGsuX2ZpbGxDb2xvcjtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeSArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHgsIHkgKyBoIC0gUmVuZGVyZXI0MGsuX2JldmVsU2l6ZSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdyAtIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIGggLSBSZW5kZXJlcjQway5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHggKyB3IC0gUmVuZGVyZXI0MGsuX2JldmVsU2l6ZSwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbn1cblxuICAgIHByaXZhdGUgcmVuZGVyV2F0ZXJtYXJrKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckxpbmUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFJlbmRlcmVyNDBrLl9ibGFja0NvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy5fY3VycmVudFgsIHRoaXMuX2N1cnJlbnRZKTtcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLl9jdXJyZW50WCArIHRoaXMuX21heFdpZHRoLCB0aGlzLl9jdXJyZW50WSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclRhYmxlSGVhZGVyKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBsYWJlbHM6IHN0cmluZ1tdLCBjb2x1bW5XaWR0aHM6IG51bWJlcltdIHwgbnVsbCkge1xuICAgICAgICBsZXQgeCA9IHRoaXMuX2N1cnJlbnRYO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAyMjtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLl9tYXhXaWR0aDtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyNDBrLl9ncmV5MTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMuX2N1cnJlbnRYLCB0aGlzLl9jdXJyZW50WSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyNDBrLl9ibGFja0NvbG9yO1xuICAgICAgICBjdHguZm9udCA9ICcxNHB4IHNhbnMtc2VyaWYnO1xuICAgICAgICB2YXIgdyA9IDUwO1xuICAgICAgICBpZiAobGFiZWxzKSB7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2ldO1xuICAgICAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBsYWJlbHNbaV0sIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICB4ICs9IHc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJTcGVsbHMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHNwZWxsczogUHN5Y2hpY1Bvd2VyW10sIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjI7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgdyA9IDUwO1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzcGVsbCBvZiBzcGVsbHMpIHtcbiAgICAgICAgICAgIGxldCBjaSA9IDA7XG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuX2N1cnJlbnRYO1xuXG4gICAgICAgICAgICBsZXQgeFN0YXJ0ID0gdGhpcy5fY3VycmVudFg7XG4gICAgICAgICAgICBsZXQgeVN0YXJ0ID0gdGhpcy5fY3VycmVudFk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgc3BlbGwuX25hbWUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHNwZWxsLl9tYW5pZmVzdC50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgc3BlbGwuX3JhbmdlLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIC8vdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwgc3BlbGwuX2RldGFpbHMsIHgsIHRoaXMuX2N1cnJlbnRZLCB3KTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGlmIChpICUgMikgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyNDBrLl9ncmV5TGlnaHQ7XG4gICAgICAgICAgICBlbHNlIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWxIZWlnaHQgPSB0aGlzLl9jdXJyZW50WSAtIHlTdGFydDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4U3RhcnQsIHlTdGFydCwgdGhpcy5fbWF4V2lkdGgsIGFjdHVhbEhlaWdodCk7XG4gICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckV4cGxvc2lvbihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZXhwbG9zaW9uczogRXhwbG9zaW9uW10sIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjI7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgdyA9IDUwO1xuXG4gICAgICAgIGZvciAoY29uc3QgZXhwbCBvZiBleHBsb3Npb25zKSB7XG4gICAgICAgICAgICBsZXQgY2kgPSAwO1xuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WDtcblxuICAgICAgICAgICAgaWYgKGkgJSAyKSBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXI0MGsuX2dyZXlMaWdodDtcbiAgICAgICAgICAgIGVsc2UgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LCB0aGlzLl9jdXJyZW50WSwgdGhpcy5fbWF4V2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBleHBsLl9uYW1lLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgZXhwbC5fZGljZVJvbGwsIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBleHBsLl9kaXN0YW5jZSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIGV4cGwuX21vcnRhbFdvdW5kcywgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSBoZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlcldlYXBvbnMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHdlYXBvbnM6IFdlYXBvbltdLCBjb2x1bW5XaWR0aHM6IG51bWJlcltdIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDIyO1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgdyA9IDUwO1xuICAgICAgICBmb3IgKGNvbnN0IHdlYXBvbiBvZiB3ZWFwb25zKSB7XG5cbiAgICAgICAgICAgIGxldCBjaSA9IDA7XG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMuX2N1cnJlbnRYO1xuXG4gICAgICAgICAgICBsZXQgeFN0YXJ0ID0gdGhpcy5fY3VycmVudFg7XG4gICAgICAgICAgICBsZXQgeVN0YXJ0ID0gdGhpcy5fY3VycmVudFk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgd2VhcG9uLl9uYW1lLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX3JhbmdlLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX3R5cGUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHdlYXBvbi5fc3RyLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX2FwLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX2RhbWFnZS50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBpZiAod2VhcG9uLl9hYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwgd2VhcG9uLl9hYmlsaXRpZXMsIHgsIHRoaXMuX2N1cnJlbnRZLCB3KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsSGVpZ2h0ID0gdGhpcy5fY3VycmVudFkgLSB5U3RhcnQ7XG4gICAgICAgICAgICBpZiAoaSAlIDIpIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fZ3JleUxpZ2h0O1xuICAgICAgICAgICAgZWxzZSBjdHguZmlsbFN0eWxlID0gICcjZmZmZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4U3RhcnQsIHlTdGFydCwgdGhpcy5fbWF4V2lkdGgsIGFjdHVhbEhlaWdodCk7XG4gICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlck1vZGVsKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBtb2RlbDogTW9kZWwsIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsLCBiZzogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjQ7XG5cbiAgICAgICAgbGV0IHcgPSA1MDtcbiAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgbGV0IGNpID0gMDtcblxuICAgICAgICBpZiAoYmcgJSAyKSBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXI0MGsuX2dyZXlMaWdodDtcbiAgICAgICAgZWxzZSBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgICBjdHguZmlsbFJlY3QoeCwgdGhpcy5fY3VycmVudFksIHRoaXMuX21heFdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcbiAgICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgbW9kZWwuX25hbWUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIG1vZGVsLl9tb3ZlLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgeCArPSB3O1xuXG4gICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgIFJlbmRlclRleHQoY3R4LCBtb2RlbC5fd3MudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIG1vZGVsLl9icy50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgbW9kZWwuX3N0ci50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgbW9kZWwuX3RvdWdobmVzcy50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgbW9kZWwuX3dvdW5kcy50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgbW9kZWwuX2F0dGFja3MudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIG1vZGVsLl9sZWFkZXJzaGlwLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgeCArPSB3O1xuXG4gICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgIFJlbmRlclRleHQoY3R4LCBtb2RlbC5fc2F2ZS50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJBYmlsaXRpZXMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBzYW5zLXNlcmlmJztcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIFwiQUJJTElUSUVTXCIsIHRoaXMuX2N1cnJlbnRYICsgMjAsIHRoaXMuX2N1cnJlbnRZLCAxMDAsIDE2LCBKdXN0aWZpY2F0aW9uLkxlZnQpO1xuXG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2VyaWYnO1xuICAgICAgICBmb3IgKGxldCBhYiBvZiB1bml0Ll9hYmlsaXRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhYlswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgZGVzYyA9IGFiWzFdO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwgY29udGVudCArIFwiOiBcIiArIGRlc2MsIHRoaXMuX2N1cnJlbnRYICsgMTkwLCB0aGlzLl9jdXJyZW50WSwgNjAwKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclJ1bGVzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB1bml0OiBVbml0KTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7XG4gICAgICAgIFJlbmRlclRleHQoY3R4LCBcIlJVTEVTXCIsIHRoaXMuX2N1cnJlbnRYICsgMjAsIHRoaXMuX2N1cnJlbnRZLCAxMDAsIDE2LCBKdXN0aWZpY2F0aW9uLkxlZnQpO1xuXG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2VyaWYnO1xuICAgICAgICBmb3IgKGxldCBydWxlIG9mIHVuaXQuX3J1bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gcnVsZVswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgZGVzYyA9IHJ1bGVbMV07XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgPSBSZW5kZXJQYXJhZ3JhcGgoY3R4LCBjb250ZW50ICsgXCI6IFwiICsgZGVzYywgdGhpcy5fY3VycmVudFggKyAxOTAsIHRoaXMuX2N1cnJlbnRZLCA2MDApO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyS2V5d29yZHMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBzYW5zLXNlcmlmJztcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIFwiS0VZV09SRFNcIiwgdGhpcy5fY3VycmVudFggKyAyMCwgdGhpcy5fY3VycmVudFksIDEwMCwgMTYsIEp1c3RpZmljYXRpb24uTGVmdCk7XG5cbiAgICAgICAgY3R4LmZvbnQgPSAnMTJweCBzZXJpZic7XG4gICAgICAgIGNvbnN0IGt3bGlzdCA9IFsuLi51bml0Ll9rZXl3b3Jkc107IFxuICAgICAgICBjb25zdCBrdyA9IGt3bGlzdC5qb2luKFwiLCBcIikudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgPSBSZW5kZXJQYXJhZ3JhcGgoY3R4LCBrdywgdGhpcy5fY3VycmVudFggKyAxOTAsIHRoaXMuX2N1cnJlbnRZLCA2MDApO1xuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyRmFjdGlvbnMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHVuaXQ6IFVuaXQpOiB2b2lkIHtcbiAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBzYW5zLXNlcmlmJztcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIFwiRkFDVElPTlNcIiwgdGhpcy5fY3VycmVudFggKyAyMCwgdGhpcy5fY3VycmVudFksIDEwMCwgMTYsIEp1c3RpZmljYXRpb24uTGVmdCk7XG5cbiAgICAgICAgY3R4LmZvbnQgPSAnMTJweCBzZXJpZic7XG4gICAgICAgIGNvbnN0IGt3bGlzdCA9IFsuLi51bml0Ll9mYWN0aW9uc107IFxuICAgICAgICBjb25zdCBrdyA9IGt3bGlzdC5qb2luKFwiLCBcIikudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgPSBSZW5kZXJQYXJhZ3JhcGgoY3R4LCBrdywgdGhpcy5fY3VycmVudFggKyAxOTAsIHRoaXMuX2N1cnJlbnRZLCA2MDApO1xuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyV291bmRUYWJsZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdW5pdDogVW5pdCwgY29sdW1uV2lkdGhzOiBudW1iZXJbXSB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjI7XG5cbiAgICAgICAgbGV0IHcgPSA1MDtcblxuICAgICAgICBmb3IgKGxldCB0cmFja2VyIG9mIHVuaXQuX3dvdW5kVHJhY2tlcikge1xuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgICAgIGxldCBjaSA9IDA7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fZ3JleUxpZ2h0O1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHRoaXMuX2N1cnJlbnRZLCB0aGlzLl9tYXhXaWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyNDBrLl9ibGFja0NvbG9yO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTJweCBzYW5zLXNlcmlmJztcbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG5cbiAgICAgICAgICAgIC8vUmVuZGVyVGV4dChjdHgsIHRyYWNrZXIuX25hbWUsIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgZm9yIChsZXQgYXR0ciBvZiB0cmFja2VyLl90YWJsZSkge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIGF0dHJbMV0sIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICB4ICs9IHc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IGhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyTW9kZWxMaXN0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB1bml0OiBVbml0KSB7XG4gICAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7XG4gICAgICAgIFJlbmRlclRleHQoY3R4LCBcIk1PREVMU1wiLCB0aGlzLl9jdXJyZW50WCArIDIwLCB0aGlzLl9jdXJyZW50WSwgMTAwLCAxNiwgSnVzdGlmaWNhdGlvbi5MZWZ0KTtcblxuICAgICAgICBjdHguZm9udCA9ICcxMnB4IHNlcmlmJztcbiAgICAgICAgbGV0IG1vZGVsTGlzdCA9IFwiXCI7XG4gICAgICAgIGxldCBtaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgbW9kZWwgb2YgdW5pdC5fbW9kZWxzKSB7XG4gICAgICAgICAgICBpZiAobW9kZWwuX2NvdW50ID4gMSkge1xuICAgICAgICAgICAgICBtb2RlbExpc3QgKz0gbW9kZWwuX2NvdW50ICsgXCIgXCIgKyBtb2RlbC5fbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsTGlzdCArPSBtb2RlbC5fbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1pKys7XG4gICAgICAgICAgICBpZiAobWkgIT0gdW5pdC5fbW9kZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG1vZGVsTGlzdCArPSBcIiwgIFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICB0aGlzLl9jdXJyZW50WSA9IFJlbmRlclBhcmFncmFwaChjdHgsIG1vZGVsTGlzdCwgdGhpcy5fY3VycmVudFggKyAxOTAsIHRoaXMuX2N1cnJlbnRZLCA2MDApO1xuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyV291bmRCb3hlcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdW5pdDogVW5pdCkge1xuXG4gICAgICAgIGNvbnN0IHdvdW5kQm94U2l6ZSA9IDMwO1xuICAgICAgICBjb25zdCBib3hNYXJnaW4gPSAxMDtcbiAgICAgICAgY29uc3QgYm94U3RhcnRYID0gMzQwO1xuICAgICAgICBjb25zdCB1bml0TmFtZVdpZHRoID0gODA7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBmb3IgKGxldCBtb2RlbCBvZiB1bml0Ll9tb2RlbHMpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbC5fd291bmRzID4gMSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRZID0gdGhpcy5fY3VycmVudFk7XG5cbiAgICAgICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IHNhbnMtc2VyaWYnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwgbW9kZWwuX25hbWUsIHRoaXMuX2N1cnJlbnRYICsgdW5pdE5hbWVXaWR0aCwgdGhpcy5fY3VycmVudFkgKyAod291bmRCb3hTaXplLTE0KS8yLCBib3hTdGFydFgtdW5pdE5hbWVXaWR0aC1ib3hNYXJnaW4pO1xuXG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WCArIGJveFN0YXJ0WDtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgbW9kZWwuX3dvdW5kczsgdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3ICUgMTAgPT0gMCAmJiB3ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZICs9IHdvdW5kQm94U2l6ZSArIGJveE1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSB0aGlzLl9jdXJyZW50WCArIGJveFN0YXJ0WDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgY3VycmVudFksIHdvdW5kQm94U2l6ZSwgd291bmRCb3hTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgY3VycmVudFksIHdvdW5kQm94U2l6ZSwgd291bmRCb3hTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgeCArPSB3b3VuZEJveFNpemUgKyBib3hNYXJnaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRZICs9IHdvdW5kQm94U2l6ZSArIGJveE1hcmdpbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50WSA9IGN1cnJlbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VuaXRMYWJlbHMgPSBbXCJNT0RFTFwiLCBcIk1cIiwgXCJXU1wiLCBcIkJTXCIsIFwiU1wiLCBcIlRcIiwgXCJXXCIsIFwiQVwiLCBcIkxEXCIsIFwiU0FWRVwiXTtcbiAgICBwcml2YXRlIF91bml0TGFiZWxXaWR0aHNOb3JtYWxpemVkID0gWzAuMywgMC4wNzcsIDAuMDc3LCAwLjA3NywgMC4wNzcsIDAuMDc3LCAwLjA3NywgMC4wNzcsIDAuMDc3LCAwLjA3N107XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3dlYXBvbkxhYmVscyA9IFtcIldFQVBPTlNcIiwgXCJSQU5HRVwiLCBcIlRZUEVcIiwgXCJTXCIsIFwiQVBcIiwgXCJEXCIsIFwiQUJJTElUSUVTXCJdO1xuICAgIHByaXZhdGUgX3dlYXBvbkxhYmVsV2lkdGhOb3JtYWxpemVkID0gWzAuMywgMC4wNzcsIDAuMDc3LCAwLjA3NywgMC4wNzcsIDAuMDc3LCAwLjNdO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NwZWxsTGFiZWxzID0gW1wiUFNZQ0hJQyBQT1dFUlwiLCBcIk1BTklGRVNUXCIsIFwiUkFOR0VcIiwgXCJERVRBSUxTXCJdO1xuICAgIHByaXZhdGUgX3NwZWxsTGFiZWxXaWR0aE5vcm1hbGl6ZWQgPSBbMC4zLCAwLjEsIDAuMSwgMC41XTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9leHBsb3Npb25MYWJlbHMgPSBbXCJFWFBMT1NJT05cIiwgXCJESUNFIFJPTExcIiwgXCJESVNUQU5DRVwiLCBcIk1PUlRBTCBXT1VORFNcIl07XG4gICAgcHJpdmF0ZSBfZXhwbG9zaW9uTGFiZWxXaWR0aE5vcm1hbGl6ZWQgPSBbMC4zLCAwLjE1LCAwLjE1LCAwLjE1XTtcblxuICAgIHByaXZhdGUgc3RhdGljIF90cmFja2VyTGFiZWxzID0gW1wiV09VTkQgVFJBQ0tcIiwgXCJSRU1BSU5JTkcgV1wiLCBcIkFUVFJJQlVURVwiLCBcIkFUVFJJQlVURVwiLCBcIkFUVFJJQlVURVwiXTtcbiAgICBwcml2YXRlIF90cmFja2VyTGFiZWxXaWR0aCA9IFswLjMsIDAuMiwgMC4xNSwgMC4xNSwgMC4xNV07XG5cbiAgICBwcm90ZWN0ZWQgcmVuZGVyVW5pdCh1bml0OiBVbml0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB4T2Zmc2V0OiBudW1iZXIsIHlPZmZzZXQ6IG51bWJlcik6IG51bWJlcltdIHtcblxuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gWzAsIDBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3VycmVudFggPSB4T2Zmc2V0ICsgUmVuZGVyZXI0MGsuX21hcmdpbjtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgPSB5T2Zmc2V0ICsgUmVuZGVyZXI0MGsuX21hcmdpbjtcbiAgICAgICAgdGhpcy5fbWF4V2lkdGggPSBjYW52YXMud2lkdGggLSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgdGhpcy5fbWF4SGVpZ2h0ID0gTWF0aC5tYXgoMCwgY2FudmFzLmhlaWdodCAtIHRoaXMuX2N1cnJlbnRZKTtcblxuICAgICAgICB0aGlzLnJlbmRlckhlYWRlcih1bml0LCBjdHgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlcjQway5fYmxhY2tDb2xvcjtcblxuICAgICAgICBsZXQgd2VhcG9uczogV2VhcG9uW10gPSBbXTtcbiAgICAgICAgbGV0IHNwZWxsczogUHN5Y2hpY1Bvd2VyW10gPSBbXTtcbiAgICAgICAgbGV0IGV4cGxvc2lvbnM6IEV4cGxvc2lvbltdID0gW107XG4gICAgICAgIGNvbnN0IHVuaXRMYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgdGhpcy5fdW5pdExhYmVsV2lkdGhzTm9ybWFsaXplZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgdW5pdExhYmVsV2lkdGhzLnB1c2goZWxlbWVudCAqIHRoaXMuX21heFdpZHRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFibGVIZWFkZXIoY3R4LCBSZW5kZXJlcjQway5fdW5pdExhYmVscywgdW5pdExhYmVsV2lkdGhzKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKHZhciBtb2RlbCBvZiB1bml0Ll9tb2RlbHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTW9kZWwoY3R4LCBtb2RlbCwgdW5pdExhYmVsV2lkdGhzLCBpICUgMik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBmb3IgKGxldCB3ZWFwb24gb2YgbW9kZWwuX3dlYXBvbnMpIHtcbiAgICAgICAgICAgICAgICB3ZWFwb25zLnB1c2god2VhcG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHNwZWxsIG9mIG1vZGVsLl9wc3ljaGljUG93ZXJzKSB7XG4gICAgICAgICAgICAgICAgc3BlbGxzLnB1c2goc3BlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgZXhwbCBvZiBtb2RlbC5fZXhwbG9zaW9ucykge1xuICAgICAgICAgICAgICAgIGV4cGxvc2lvbnMucHVzaChleHBsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVuaXF1ZSBsaXN0IG9mIHdlYXBvbnNcbiAgICAgICAgY29uc3QgdW5pcXVlV2VhcG9uczogV2VhcG9uW10gPSBbXTtcbiAgICAgICAgY29uc3Qgc2NyYXRjaE1hcDogTWFwPHN0cmluZywgV2VhcG9uPiA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChjb25zdCB3IG9mIHdlYXBvbnMpIHtcbiAgICAgICAgICAgIGlmICghc2NyYXRjaE1hcC5oYXMody5fbmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzY3JhdGNoTWFwLnNldCh3Ll9uYW1lLCB3KTtcbiAgICAgICAgICAgICAgICB1bmlxdWVXZWFwb25zLnB1c2godyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pcXVlV2VhcG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWFwb25MYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkxhYmVsV2lkdGhOb3JtYWxpemVkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgd2VhcG9uTGFiZWxXaWR0aHMucHVzaChlbGVtZW50ICogdGhpcy5fbWF4V2lkdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFibGVIZWFkZXIoY3R4LCBSZW5kZXJlcjQway5fd2VhcG9uTGFiZWxzLCB3ZWFwb25MYWJlbFdpZHRocyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcldlYXBvbnMoY3R4LCB1bmlxdWVXZWFwb25zLCB3ZWFwb25MYWJlbFdpZHRocyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3BlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNwZWxsTGFiZWxXaWR0aHM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICB0aGlzLl9zcGVsbExhYmVsV2lkdGhOb3JtYWxpemVkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgc3BlbGxMYWJlbFdpZHRocy5wdXNoKGVsZW1lbnQgKiB0aGlzLl9tYXhXaWR0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjdHgsIFJlbmRlcmVyNDBrLl9zcGVsbExhYmVscywgc3BlbGxMYWJlbFdpZHRocyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNwZWxscyhjdHgsIHNwZWxscywgc3BlbGxMYWJlbFdpZHRocyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdC5fYWJpbGl0aWVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckFiaWxpdGllcyhjdHgsIHVuaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX3J1bGVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJ1bGVzKGN0eCwgdW5pdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdC5fZmFjdGlvbnMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRmFjdGlvbnMoY3R4LCB1bml0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bml0Ll9rZXl3b3Jkcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaW5lKGN0eCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJLZXl3b3JkcyhjdHgsIHVuaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX21vZGVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck1vZGVsTGlzdChjdHgsIHVuaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX3dvdW5kVHJhY2tlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrZXJMYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJMYWJlbFdpZHRoLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgdHJhY2tlckxhYmVsV2lkdGhzLnB1c2goZWxlbWVudCAqIHRoaXMuX21heFdpZHRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjdHgsIFJlbmRlcmVyNDBrLl90cmFja2VyTGFiZWxzLCB0cmFja2VyTGFiZWxXaWR0aHMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJXb3VuZFRhYmxlKGN0eCwgdW5pdCwgdHJhY2tlckxhYmVsV2lkdGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChleHBsb3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgY29uc3QgZXhwbExhYmVsV2lkdGhzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZXhwbG9zaW9uTGFiZWxXaWR0aE5vcm1hbGl6ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBleHBsTGFiZWxXaWR0aHMucHVzaChlbGVtZW50ICogdGhpcy5fbWF4V2lkdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhYmxlSGVhZGVyKGN0eCwgUmVuZGVyZXI0MGsuX2V4cGxvc2lvbkxhYmVscywgZXhwbExhYmVsV2lkdGhzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRXhwbG9zaW9uKGN0eCwgZXhwbG9zaW9ucywgZXhwbExhYmVsV2lkdGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdvdW5kIHRyYWNrZXIgYm94ZXNcbiAgICAgICAgbGV0IGhhc1RyYWNrcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBtb2RlbCBvZiB1bml0Ll9tb2RlbHMpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbC5fd291bmRzID4gMSkgeyBoYXNUcmFja3MgPSB0cnVlOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1RyYWNrcykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaW5lKGN0eCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSA1O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJXb3VuZEJveGVzKGN0eCwgdW5pdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b3RhbEhlaWdodCA9IHRoaXMuX2N1cnJlbnRZIC0gKHlPZmZzZXQgKyBSZW5kZXJlcjQway5fbWFyZ2luKTtcbiAgICAgICAgY29uc3QgdG90YWxXaWR0aCA9IHRoaXMuX21heFdpZHRoO1xuXG4gICAgICAgIHRoaXMucmVuZGVyQm9yZGVyKGN0eCwgdGhpcy5fY3VycmVudFgsIHlPZmZzZXQgKyBSZW5kZXJlcjQway5fbWFyZ2luLCB0b3RhbFdpZHRoLCB0b3RhbEhlaWdodCk7XG4gICAgICAgIHRoaXMucmVuZGVyV2F0ZXJtYXJrKGN0eCk7XG5cbiAgICAgICAgcmV0dXJuIFt0aGlzLl9tYXhXaWR0aCwgdGhpcy5fY3VycmVudFldO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVySGVhZGVyKHVuaXQ6IFVuaXQsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyNDBrLl9ibGFja0NvbG9yO1xuXG4gICAgICAgIGNvbnN0IHhTdGFydCA9IHRoaXMuX2N1cnJlbnRYO1xuICAgICAgICBjb25zdCB4RW5kID0gdGhpcy5fY3VycmVudFggKyB0aGlzLl9tYXhXaWR0aDtcbiAgICAgICAgY29uc3QgeVN0YXJ0ID0gdGhpcy5fY3VycmVudFk7XG4gICAgICAgIGNvbnN0IHRpdGxlSGVpZ2h0ID0gMzY7XG4gICAgICAgIGNvbnN0IHlFbmQgPSB5U3RhcnQgKyB0aXRsZUhlaWdodDtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeFN0YXJ0LCB5U3RhcnQgKyBSZW5kZXJlcjQway5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4U3RhcnQsIHlFbmQpO1xuICAgICAgICBjdHgubGluZVRvKHhFbmQsIHlFbmQpO1xuICAgICAgICBjdHgubGluZVRvKHhFbmQsIHlTdGFydCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHhFbmQgLSBSZW5kZXJlcjQway5fYmV2ZWxTaXplLCB5U3RhcnQpO1xuICAgICAgICBjdHgubGluZVRvKHhTdGFydCArIFJlbmRlcmVyNDBrLl9iZXZlbFNpemUsIHlTdGFydCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBsZXQgaW1nWCA9IHhTdGFydCArIDY7XG5cbiAgICAgICAgaWYgKHRoaXMuX29jdGFnb24pIHtcbiBcbiAgICAgICAgICAgIC8vIFVuaXQgYmF0dGxlZmllbGQgcm9sZSBpY29uXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX29jdGFnb24sIGltZ1gsIHlTdGFydCArIDIsIDMyLCAzMik7XG4gICAgICAgICAgICBjb25zdCByb2xlSW1nID0gdGhpcy5fcm9sZXMuZ2V0KHVuaXQuX3JvbGUpO1xuICAgICAgICAgICAgaWYgKHJvbGVJbWcpIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHJvbGVJbWcsIGltZ1ggKyA0LCB5U3RhcnQgKyAyICsgNCwgMjQsIDI0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBjdHguZm9udCA9IFwiMThweCBzZXJpZlwiO1xuICAgICAgICAgICAgLy8gUG93ZXIgbGV2ZWwgaWNvblxuICAgICAgICAgICAgaW1nWCArPSAzNDtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fb2N0YWdvbiwgaW1nWCwgeVN0YXJ0ICsgMiwgMzIsIDMyKTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB1bml0Ll9wb3dlckxldmVsLnRvU3RyaW5nKCksIGltZ1gsIHlTdGFydCArIDIsIDMyLCAzMiwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuXG4gICAgICAgICAgICAvLyBQb2ludHMgaWNvblxuICAgICAgICAgICAgaW1nWCArPSAzNDtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fb2N0YWdvbiwgaW1nWCwgeVN0YXJ0ICsgMiwgMzIsIDMyKTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB1bml0Ll9wb2ludHMudG9TdHJpbmcoKSwgaW1nWCwgeVN0YXJ0ICsgMiwgMzIsIDMyLCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bml0IG5hbWVcbiAgICAgICAgbGV0IGl0ZXJzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgdGl0bGVfc2l6ZSA9IDI4O1xuICAgICAgICBjb25zdCB0aXRsZV94ID0gaW1nWCArIDY7XG4gICAgICAgIGN0eC5mb250ID0gdGl0bGVfc2l6ZSArICdweCAnICsgJ2JvbGQgc2VyaWYnO1xuICAgICAgICBjb25zdCB1bml0TmFtZSA9IHVuaXQuX25hbWUudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgbGV0IGNoZWNrID0gY3R4Lm1lYXN1cmVUZXh0KHVuaXROYW1lKTtcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLl9tYXhXaWR0aCAtIHRpdGxlX3g7XG4gICAgICAgIHdoaWxlIChpdGVycyA8IDYgJiYgY2hlY2sud2lkdGggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgaXRlcnMgKz0gMTtcbiAgICAgICAgICAgIHRpdGxlX3NpemUgLT0gMjtcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGl0bGVfc2l6ZSArICdweCAnICsgJ2JvbGQgc2VyaWYnO1xuICAgICAgICAgICAgY2hlY2sgPSBjdHgubWVhc3VyZVRleHQodW5pdE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7IC8vIE1ha2UgdGhlIHRleHQgb3JpZ2luIGF0IHRoZSB1cHBlci1sZWZ0IHRvIG1ha2UgcG9zaXRpb25pbmcgZWFzaWVyXG4gICAgICAgIFJlbmRlclRleHQoY3R4LCB1bml0TmFtZSwgdGl0bGVfeCwgeVN0YXJ0LCBtYXhXaWR0aCwgdGl0bGVIZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSB0aXRsZUhlaWdodDtcbiAgICB9XG5cbn07XG4iLCJpbXBvcnQgeyBBb1NVbml0LCBBb1NVbml0Um9sZSwgQW9TVW5pdFJvbGVUb1N0cmluZywgQW9TV2VhcG9uLCBSb3N0ZXJBb1MsIEFvU1NwZWxsLCBBb1NQcmF5ZXIgfSBmcm9tIFwiLi9yb3N0ZXJBb1NcIjtcbmltcG9ydCB7IFJlbmRlcmVyLCBKdXN0aWZpY2F0aW9uLCBSZW5kZXJUZXh0LCBSZW5kZXJQYXJhZ3JhcGh9IGZyb20gXCIuL3JlbmRlcmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJlckFvUyBpbXBsZW1lbnRzIFJlbmRlcmVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgX3JlczogbnVtYmVyID0gMTQ0O1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgX21hcmdpbjogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9iZXZlbFNpemUgPSAxNTtcblxuICAgIHByaXZhdGUgX3Jvc3RlcjogUm9zdGVyQW9TfG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudFg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfY3VycmVudFk6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF4V2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF4SGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2JsYWNrQ29sb3IgPSAnIzFkMjcyYSc7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2dyZXkxID0gJyNiM2JiYjUnO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ncmV5TGlnaHQgPSAnI2RkZTFkZic7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX2ZpbGxDb2xvciA9ICcjZjZmNmY2JztcblxuICAgIGNvbnN0cnVjdG9yKHJvc3RlcjogUm9zdGVyQW9TKSB7XG4gICAgICAgIHRoaXMuX3Jvc3RlciA9IHJvc3RlcjtcbiAgICB9XG5cbiAgICByZW5kZXIodGl0bGU6IEhUTUxFbGVtZW50fG51bGwsIGxpc3Q6IEhUTUxFbGVtZW50fG51bGwsIGZvcmNlczogSFRNTEVsZW1lbnR8bnVsbCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcm9zdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgdGl0bGUuaW5uZXJIVE1MID0gJzxoMz4nICsgdGhpcy5fcm9zdGVyLl9uYW1lICsgJyAoJyArIHRoaXMuX3Jvc3Rlci5fcG9pbnRzICsgJyBwdHMsICcgKyB0aGlzLl9yb3N0ZXIuX2NvbW1hbmRQb2ludHMgKyAnIENQKTwvaDM+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGZvcmNlIG9mIHRoaXMuX3Jvc3Rlci5fZm9yY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JjZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpZiAoZm9yY2VUaXRsZSkge1xuICAgICAgICAgICAgICBmb3JjZVRpdGxlLmlubmVySFRNTCA9ICc8cD4nICsgZm9yY2UuX2NhdGFsb2cgKyAnICcgKyBmb3JjZS5fbmFtZSArICc8L3A+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaXN0KVxuICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoZm9yY2VUaXRsZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3RhYmxlJyk7XG4gICAgICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCd0YWJsZS1zbScpO1xuICAgICAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUtc3RyaXBlZCcpO1xuICAgICAgICAgICAgY29uc3QgdGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpO1xuICAgICAgICAgICAgdGhlYWQuY2xhc3NMaXN0LmFkZCgndGhlYWQtbGlnaHQnKTtcbiAgICAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIHRoZWFkLmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckluZm8gPSBbeyBuYW1lOiBcIk5BTUVcIiwgdzogJzM1JSd9LCB7bmFtZTpcIlJPTEVcIiwgdzonMjUlJ30sIHtuYW1lOlwiTU9ERUxTXCIsIHc6JzI1JSd9LCB7bmFtZTpcIlBPSU5UU1wiLCB3OicxNSUnfV07XG4gICAgICAgICAgICBoZWFkZXJJbmZvLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGxldCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgICAgICAgICAgIHRoLnNjb3BlID0gXCJjb2xcIjtcbiAgICAgICAgICAgICAgdGguaW5uZXJIVE1MID0gZWxlbWVudC5uYW1lO1xuICAgICAgICAgICAgICB0aC5zdHlsZS53aWR0aCA9IGVsZW1lbnQudztcbiAgICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3JjZVRpdGxlLmFwcGVuZENoaWxkKHRhYmxlKTtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoYm9keSk7XG4gICAgICAgICAgICBmb3IgKGxldCB1bml0IG9mIGZvcmNlLl91bml0cykge1xuICAgICAgICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgICBsZXQgdW5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICB1bmFtZS5pbm5lckhUTUwgPSB1bml0Ll9uYW1lO1xuICAgICAgICAgICAgICBsZXQgcm9sZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICAgIHJvbGUuaW5uZXJIVE1MID0gQW9TVW5pdFJvbGVUb1N0cmluZ1t1bml0Ll9yb2xlXTtcbiAgICAgICAgICAgICAgbGV0IG1vZGVscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICAgIG1vZGVscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICBsZXQgcHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgICAgcHRzLmlubmVySFRNTCA9IHVuaXQuX3BvaW50cy50b1N0cmluZygpO1xuICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh1bmFtZSk7XG4gICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHJvbGUpO1xuICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZChtb2RlbHMpO1xuICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZChwdHMpO1xuICAgICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRyKTsgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IHVuaXQgb2YgZm9yY2UuX3VuaXRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IFJlbmRlcmVyQW9TLl9yZXMgKiA1LjU7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IFJlbmRlcmVyQW9TLl9yZXMgKiA4LjU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgZGltcyA9IHRoaXMucmVuZGVyVW5pdCh1bml0LCBjYW52YXMsIDAsIDApO1xuICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGJvcmRlciA9IDI1O1xuICAgICAgICAgICAgICAgIGxldCBmaW5hbENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAgICAgICAgIGZpbmFsQ2FudmFzLndpZHRoID0gZGltc1swXSArIGJvcmRlciAqIDI7XG4gICAgICAgICAgICAgICAgZmluYWxDYW52YXMuaGVpZ2h0ID0gZGltc1sxXSArIGJvcmRlciAqIDI7XG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsQ3R4ID0gZmluYWxDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgICAgICBmaW5hbEN0eD8uZHJhd0ltYWdlKGNhbnZhcywgYm9yZGVyLCBib3JkZXIpO1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZXMpIFxuICAgICAgICAgICAgICAgICAgZm9yY2VzLmFwcGVuZENoaWxkKGZpbmFsQ2FudmFzKTtcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVuZGVyVW5pdCh1bml0OiBBb1NVbml0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB4T2Zmc2V0OiBudW1iZXIsIHlPZmZzZXQ6IG51bWJlcik6IG51bWJlcltdIHtcblxuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gWzAsIDBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3VycmVudFggPSB4T2Zmc2V0ICsgUmVuZGVyZXJBb1MuX21hcmdpbjtcbiAgICAgICAgdGhpcy5fY3VycmVudFkgPSB5T2Zmc2V0ICsgUmVuZGVyZXJBb1MuX21hcmdpbjtcbiAgICAgICAgdGhpcy5fbWF4V2lkdGggPSBjYW52YXMud2lkdGggLSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgdGhpcy5fbWF4SGVpZ2h0ID0gTWF0aC5tYXgoMCwgY2FudmFzLmhlaWdodCAtIHRoaXMuX2N1cnJlbnRZKTtcblxuICAgICAgICB0aGlzLnJlbmRlckhlYWRlcih1bml0LCBjdHgpO1xuXG4gICAgICAgIGNvbnN0IHVuaXRMYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgdGhpcy5fdW5pdExhYmVsV2lkdGhzTm9ybWFsaXplZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgdW5pdExhYmVsV2lkdGhzLnB1c2goZWxlbWVudCAqIHRoaXMuX21heFdpZHRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFibGVIZWFkZXIoY3R4LCBSZW5kZXJlckFvUy5fdW5pdExhYmVscywgdW5pdExhYmVsV2lkdGhzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJVbml0U3RhdHMoY3R4LCB1bml0LCB1bml0TGFiZWxXaWR0aHMsIDApO1xuXG4gICAgICAgIGNvbnN0IHVuaXF1ZVdlYXBvbnM6IEFvU1dlYXBvbltdID0gW107XG4gICAgICAgIGNvbnN0IHNjcmF0Y2hNYXA6IE1hcDxzdHJpbmcsIEFvU1dlYXBvbj4gPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3QgdyBvZiB1bml0Ll93ZWFwb25zKSB7XG4gICAgICAgICAgICBpZiAoIXNjcmF0Y2hNYXAuaGFzKHcuX25hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2NyYXRjaE1hcC5zZXQody5fbmFtZSwgdyk7XG4gICAgICAgICAgICAgICAgdW5pcXVlV2VhcG9ucy5wdXNoKHcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1pc3NpbGVXZWFwb25zOiBBb1NXZWFwb25bXSA9IFtdO1xuICAgICAgICBsZXQgbWVsZWVXZWFwb25zOiBBb1NXZWFwb25bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB3ZWFwb24gb2YgdW5pcXVlV2VhcG9ucykge1xuICAgICAgICAgICAgaWYgKHdlYXBvbi5fdHlwZSA9PSBcIk1lbGVlXCIpIHtcbiAgICAgICAgICAgICAgICBtZWxlZVdlYXBvbnMucHVzaCh3ZWFwb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWlzc2lsZVdlYXBvbnMucHVzaCh3ZWFwb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtaXNzaWxlV2VhcG9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYXBvbkxhYmVsV2lkdGhzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fd2VhcG9uTGFiZWxXaWR0aE5vcm1hbGl6ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICB3ZWFwb25MYWJlbFdpZHRocy5wdXNoKGVsZW1lbnQgKiB0aGlzLl9tYXhXaWR0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjdHgsIFJlbmRlcmVyQW9TLl93ZWFwb25MYWJlbHMsIHdlYXBvbkxhYmVsV2lkdGhzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyV2VhcG9ucyhjdHgsIG1pc3NpbGVXZWFwb25zLCB3ZWFwb25MYWJlbFdpZHRocyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVsZWVXZWFwb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbWVsZWVMYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkxhYmVsV2lkdGhOb3JtYWxpemVkLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgbWVsZWVMYWJlbFdpZHRocy5wdXNoKGVsZW1lbnQgKiB0aGlzLl9tYXhXaWR0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjdHgsIFJlbmRlcmVyQW9TLl9tZWxlZUxhYmVscywgbWVsZWVMYWJlbFdpZHRocyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcldlYXBvbnMoY3R4LCBtZWxlZVdlYXBvbnMsIG1lbGVlTGFiZWxXaWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX3NwZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzcGVsbExhYmVsV2lkdGhzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc3BlbGxMYWJlbFdpZHRoTm9ybWFsaXplZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNwZWxsTGFiZWxXaWR0aHMucHVzaChlbGVtZW50ICogdGhpcy5fbWF4V2lkdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFibGVIZWFkZXIoY3R4LCBSZW5kZXJlckFvUy5fc3BlbGxMYWJlbHMsIHNwZWxsTGFiZWxXaWR0aHMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTcGVsbHMoY3R4LCB1bml0Ll9zcGVsbHMsIHNwZWxsTGFiZWxXaWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX3ByYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcHJheWVyTGFiZWxXaWR0aHM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICB0aGlzLl9wcmF5ZXJMYWJlbFdpZHRoTm9ybWFsaXplZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHByYXllckxhYmVsV2lkdGhzLnB1c2goZWxlbWVudCAqIHRoaXMuX21heFdpZHRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaW5lKGN0eCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhYmxlSGVhZGVyKGN0eCwgUmVuZGVyZXJBb1MuX3ByYXllckxhYmVscywgcHJheWVyTGFiZWxXaWR0aHMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcmF5ZXJzKGN0eCwgdW5pdC5fcHJheWVycywgcHJheWVyTGFiZWxXaWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX2FiaWxpdGllcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaW5lKGN0eCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJNYXAoY3R4LCBcIkFCSUxJVElFU1wiLCB1bml0Ll9hYmlsaXRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVuaXQuX2NvbW1hbmRBYmlsaXRpZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFwKGN0eCwgXCJDT01NQU5EIEFCSUxJVElFU1wiLCB1bml0Ll9jb21tYW5kQWJpbGl0aWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bml0Ll9jb21tYW5kVHJhaXRzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck1hcChjdHgsIFwiQ09NTUFORCBUUkFJVFNcIiwgdW5pdC5fY29tbWFuZFRyYWl0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdC5fYXJ0ZWZhY3RzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck1hcChjdHgsIFwiQVJURUZBQ1RTXCIsIHVuaXQuX2FydGVmYWN0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdC5fbWFnaWMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGluZShjdHgpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFwKGN0eCwgXCJNQUdJQ1wiLCB1bml0Ll9tYWdpYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdC5fd291bmRUcmFja2VyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpbmUoY3R4KTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrZXJMYWJlbFdpZHRoczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNrZXJMYWJlbFdpZHRoLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgdHJhY2tlckxhYmVsV2lkdGhzLnB1c2goZWxlbWVudCAqIHRoaXMuX21heFdpZHRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjdHgsIHVuaXQuX3dvdW5kVHJhY2tlci5fd291bmRUcmFja2VyTGFiZWxzLCB0cmFja2VyTGFiZWxXaWR0aHMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJXb3VuZFRhYmxlKGN0eCwgdW5pdCwgdHJhY2tlckxhYmVsV2lkdGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bml0Ll9rZXl3b3Jkcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaW5lKGN0eCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAyO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJLZXl3b3JkcyhjdHgsIHVuaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdG90YWxIZWlnaHQgPSB0aGlzLl9jdXJyZW50WSAtICh5T2Zmc2V0ICsgUmVuZGVyZXJBb1MuX21hcmdpbik7XG4gICAgICAgIGNvbnN0IHRvdGFsV2lkdGggPSB0aGlzLl9tYXhXaWR0aDtcblxuICAgICAgICB0aGlzLnJlbmRlckJvcmRlcihjdHgsIHRoaXMuX2N1cnJlbnRYLCB5T2Zmc2V0ICsgUmVuZGVyZXJBb1MuX21hcmdpbiwgdG90YWxXaWR0aCwgdG90YWxIZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBbdGhpcy5fbWF4V2lkdGgsIHRoaXMuX2N1cnJlbnRZXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckhlYWRlcih1bml0OiBBb1NVbml0LCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlckFvUy5fYmxhY2tDb2xvcjtcblxuICAgICAgICBjb25zdCB4U3RhcnQgPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgY29uc3QgeEVuZCA9IHRoaXMuX2N1cnJlbnRYICsgdGhpcy5fbWF4V2lkdGg7XG4gICAgICAgIGNvbnN0IHlTdGFydCA9IHRoaXMuX2N1cnJlbnRZO1xuICAgICAgICBjb25zdCB0aXRsZUhlaWdodCA9IDM2O1xuICAgICAgICBjb25zdCB5RW5kID0geVN0YXJ0ICsgdGl0bGVIZWlnaHQ7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHhTdGFydCwgeVN0YXJ0ICsgUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSk7XG4gICAgICAgIGN0eC5saW5lVG8oeFN0YXJ0LCB5RW5kKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4RW5kLCB5RW5kKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4RW5kLCB5U3RhcnQgKyBSZW5kZXJlckFvUy5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4RW5kIC0gUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSwgeVN0YXJ0KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4U3RhcnQgKyBSZW5kZXJlckFvUy5fYmV2ZWxTaXplLCB5U3RhcnQpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgbGV0IGltZ1ggPSB4U3RhcnQgKyA2O1xuIFxuICAgICAgICAvLyB1bml0IG5hbWVcbiAgICAgICAgbGV0IGl0ZXJzOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgdGl0bGVfc2l6ZSA9IDI4O1xuICAgICAgICBjb25zdCB0aXRsZV94ID0gaW1nWCArIDY7XG4gICAgICAgIGN0eC5mb250ID0gdGl0bGVfc2l6ZSArICdweCAnICsgJ2JvbGQgc2VyaWYnO1xuICAgICAgICBjb25zdCB1bml0TmFtZSA9IHVuaXQuX25hbWUudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgbGV0IGNoZWNrID0gY3R4Lm1lYXN1cmVUZXh0KHVuaXROYW1lKTtcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLl9tYXhXaWR0aCAtIHRpdGxlX3g7XG4gICAgICAgIHdoaWxlIChpdGVycyA8IDYgJiYgY2hlY2sud2lkdGggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgaXRlcnMgKz0gMTtcbiAgICAgICAgICAgIHRpdGxlX3NpemUgLT0gMjtcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGl0bGVfc2l6ZSArICdweCAnICsgJ2JvbGQgc2VyaWYnO1xuICAgICAgICAgICAgY2hlY2sgPSBjdHgubWVhc3VyZVRleHQodW5pdE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7IC8vIE1ha2UgdGhlIHRleHQgb3JpZ2luIGF0IHRoZSB1cHBlci1sZWZ0IHRvIG1ha2UgcG9zaXRpb25pbmcgZWFzaWVyXG4gICAgICAgIFJlbmRlclRleHQoY3R4LCB1bml0TmFtZSwgdGl0bGVfeCwgeVN0YXJ0LCBtYXhXaWR0aCwgdGl0bGVIZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSB0aXRsZUhlaWdodDtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyVGFibGVIZWFkZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGxhYmVsczogc3RyaW5nW10sIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsKSB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5fY3VycmVudFg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDIyO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuX21heFdpZHRoO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2dyZXkxO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5fY3VycmVudFgsIHRoaXMuX2N1cnJlbnRZLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2JsYWNrQ29sb3I7XG4gICAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7XG4gICAgICAgIHZhciB3ID0gNTA7XG4gICAgICAgIGlmIChsYWJlbHMpIHtcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbaV07XG4gICAgICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIGxhYmVsc1tpXSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgICAgIHggKz0gdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IGhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlcktleXdvcmRzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB1bml0OiBBb1NVbml0KTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzE0cHggc2Fucy1zZXJpZic7XG4gICAgICAgIFJlbmRlclRleHQoY3R4LCBcIktFWVdPUkRTXCIsIHRoaXMuX2N1cnJlbnRYICsgMjAsIHRoaXMuX2N1cnJlbnRZLCAxMDAsIDE2LCBKdXN0aWZpY2F0aW9uLkxlZnQpO1xuXG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2VyaWYnO1xuICAgICAgICBjb25zdCBrd2xpc3QgPSBbLi4udW5pdC5fa2V5d29yZHNdOyBcbiAgICAgICAgY29uc3Qga3cgPSBrd2xpc3Quam9pbihcIiwgXCIpLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwga3csIHRoaXMuX2N1cnJlbnRYICsgMTkwLCB0aGlzLl9jdXJyZW50WSwgNTAwKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSA0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF91bml0TGFiZWxzID0gW1wiVU5JVFwiLCBcIk1PVkVcIiwgXCJXT1VORFNcIiwgXCJCUkFWRVJZXCIsIFwiU0FWRVwiXTtcbiAgICBwcml2YXRlIF91bml0TGFiZWxXaWR0aHNOb3JtYWxpemVkID0gWzAuNCwgMC4xNSwgMC4xNSwgMC4xNSwgMC4xNV07XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3dlYXBvbkxhYmVscyA9IFtcIk1JU1NJTEUgV0VBUE9OU1wiLCBcIlJBTkdFXCIsIFwiQVRUQUNLU1wiLCBcIlRPIEhJVFwiLCBcIlRPIFdPVU5EXCIsIFwiUkVORFwiLCBcIkRBTUFHRVwiXTtcbiAgICBwcml2YXRlIF93ZWFwb25MYWJlbFdpZHRoTm9ybWFsaXplZCA9IFswLjQsIDAuMSwgMC4xLCAwLjEsIDAuMSwgMC4xLCAwLjFdO1xuICAgIHByaXZhdGUgc3RhdGljIF9tZWxlZUxhYmVscyA9IFtcIk1FTEVFIFdFQVBPTlNcIiwgXCJSQU5HRVwiLCBcIkFUVEFDS1NcIiwgXCJUTyBISVRcIiwgXCJUTyBXT1VORFwiLCBcIlJFTkRcIiwgXCJEQU1BR0VcIl07XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfc3BlbGxMYWJlbHMgPSBbXCJTUEVMTFwiLCBcIkNBU1RJTkcgVkFMVUVcIiwgXCJERVNDUklQVElPTlwiXTtcbiAgICBwcml2YXRlIF9zcGVsbExhYmVsV2lkdGhOb3JtYWxpemVkID0gWzAuMywgMC4yLCAwLjVdO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3ByYXllckxhYmVscyA9IFtcIlBSQVlFUlwiLCBcIkRFU0NSSVBUSU9OXCJdO1xuICAgIHByaXZhdGUgX3ByYXllckxhYmVsV2lkdGhOb3JtYWxpemVkID0gWzAuNCwgMC42XTtcblxuICAgIHByaXZhdGUgX3RyYWNrZXJMYWJlbFdpZHRoID0gWzAuMywgMC4yLCAwLjE1LCAwLjE1LCAwLjE1XTtcblxuICAgIHByaXZhdGUgcmVuZGVyTGluZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gUmVuZGVyZXJBb1MuX2JsYWNrQ29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLl9jdXJyZW50WCwgdGhpcy5fY3VycmVudFkpO1xuICAgICAgICBjdHgubGluZVRvKHRoaXMuX2N1cnJlbnRYICsgdGhpcy5fbWF4V2lkdGgsIHRoaXMuX2N1cnJlbnRZKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSAxO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyV2VhcG9ucyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgd2VhcG9uczogQW9TV2VhcG9uW10sIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjI7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCB3ID0gNTA7XG4gICAgICAgIGZvciAoY29uc3Qgd2VhcG9uIG9mIHdlYXBvbnMpIHtcblxuICAgICAgICAgICAgbGV0IGNpID0gMDtcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3VycmVudFg7XG5cbiAgICAgICAgICAgIGxldCB4U3RhcnQgPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgICAgIGxldCB5U3RhcnQgPSB0aGlzLl9jdXJyZW50WTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyQW9TLl9ibGFja0NvbG9yO1xuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX25hbWUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHdlYXBvbi5fcmFuZ2UudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHdlYXBvbi5fYXR0YWNrcy50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgd2VhcG9uLl90b0hpdC50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG4gICAgICAgICAgICBSZW5kZXJUZXh0KGN0eCwgd2VhcG9uLl90b1dvdW5kLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCB3ZWFwb24uX3JlbmQudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHdlYXBvbi5fZGFtYWdlLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gaGVpZ2h0O1xuXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsSGVpZ2h0ID0gdGhpcy5fY3VycmVudFkgLSB5U3RhcnQ7XG4gICAgICAgICAgICBpZiAoaSAlIDIpIGN0eC5maWxsU3R5bGUgPSBSZW5kZXJlckFvUy5fZ3JleUxpZ2h0O1xuICAgICAgICAgICAgZWxzZSBjdHguZmlsbFN0eWxlID0gICcjZmZmZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4U3RhcnQsIHlTdGFydCwgdGhpcy5fbWF4V2lkdGgsIGFjdHVhbEhlaWdodCk7XG4gICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlck1hcChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdGl0bGU6IHN0cmluZywgZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IHZvaWQge1xuICAgICAgICBjdHguZm9udCA9ICcxNHB4IHNhbnMtc2VyaWYnO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgdGl0bGUsIHRoaXMuX2N1cnJlbnRYICsgMjAsIHRoaXMuX2N1cnJlbnRZLCAxMDAsIDE2LCBKdXN0aWZpY2F0aW9uLkxlZnQpO1xuXG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2VyaWYnO1xuICAgICAgICBmb3IgKGxldCBhYiBvZiBkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYWJbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBhYlsxXTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSA9IFJlbmRlclBhcmFncmFwaChjdHgsIGNvbnRlbnQgKyBcIjogXCIgKyBkZXNjLCB0aGlzLl9jdXJyZW50WCArIDE5MCwgdGhpcy5fY3VycmVudFksIDUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gNDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclNwZWxscyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgc3BlbGxzOiBBb1NTcGVsbFtdLCBjb2x1bW5XaWR0aHM6IG51bWJlcltdIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBjdHguZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDIyO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IHcgPSA1MDtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc3BlbGwgb2Ygc3BlbGxzKSB7XG4gICAgICAgICAgICBsZXQgY2kgPSAwO1xuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WDtcblxuICAgICAgICAgICAgbGV0IHhTdGFydCA9IHRoaXMuX2N1cnJlbnRYO1xuICAgICAgICAgICAgbGV0IHlTdGFydCA9IHRoaXMuX2N1cnJlbnRZO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2JsYWNrQ29sb3I7XG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgUmVuZGVyVGV4dChjdHgsIHNwZWxsLl9uYW1lLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBzcGVsbC5fY2FzdGluZ1ZhbHVlLnRvU3RyaW5nKCksIHgsIHRoaXMuX2N1cnJlbnRZLCB3LCBoZWlnaHQsIEp1c3RpZmljYXRpb24uQ2VudGVyKTtcbiAgICAgICAgICAgIHggKz0gdztcblxuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZICs9IDI7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50WSA9IFJlbmRlclBhcmFncmFwaChjdHgsIHNwZWxsLl9kZXNjcmlwdGlvbiwgeCwgdGhpcy5fY3VycmVudFksIHcpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgaWYgKGkgJSAyKSBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2dyZXlMaWdodDtcbiAgICAgICAgICAgIGVsc2UgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbEhlaWdodCA9IHRoaXMuX2N1cnJlbnRZIC0geVN0YXJ0O1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHhTdGFydCwgeVN0YXJ0LCB0aGlzLl9tYXhXaWR0aCwgYWN0dWFsSGVpZ2h0KTtcbiAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyUHJheWVycyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcHJheWVyczogQW9TUHJheWVyW10sIGNvbHVtbldpZHRoczogbnVtYmVyW10gfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gMjI7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgdyA9IDUwO1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmF5ZXIgb2YgcHJheWVycykge1xuICAgICAgICAgICAgbGV0IGNpID0gMDtcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3VycmVudFg7XG5cbiAgICAgICAgICAgIGxldCB4U3RhcnQgPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgICAgIGxldCB5U3RhcnQgPSB0aGlzLl9jdXJyZW50WTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyQW9TLl9ibGFja0NvbG9yO1xuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBwcmF5ZXIuX25hbWUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFkgKz0gMjtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRZID0gUmVuZGVyUGFyYWdyYXBoKGN0eCwgcHJheWVyLl9kZXNjcmlwdGlvbiwgeCwgdGhpcy5fY3VycmVudFksIHcpO1xuICAgICAgICAgICAgeCArPSB3O1xuXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgaWYgKGkgJSAyKSBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2dyZXlMaWdodDtcbiAgICAgICAgICAgIGVsc2UgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbEhlaWdodCA9IHRoaXMuX2N1cnJlbnRZIC0geVN0YXJ0O1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHhTdGFydCwgeVN0YXJ0LCB0aGlzLl9tYXhXaWR0aCwgYWN0dWFsSGVpZ2h0KTtcbiAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyVW5pdFN0YXRzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB1bml0OiBBb1NVbml0LCBjb2x1bW5XaWR0aHM6IG51bWJlcltdIHwgbnVsbCwgYmc6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDIyO1xuXG4gICAgICAgIGxldCB3ID0gNTA7XG4gICAgICAgIGxldCB4ID0gdGhpcy5fY3VycmVudFg7XG4gICAgICAgIGxldCBjaSA9IDA7XG5cbiAgICAgICAgaWYgKGJnICUgMikgY3R4LmZpbGxTdHlsZSA9IFJlbmRlcmVyQW9TLl9ncmV5TGlnaHQ7XG4gICAgICAgIGVsc2UgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHRoaXMuX2N1cnJlbnRZLCB0aGlzLl9tYXhXaWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2JsYWNrQ29sb3I7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIHVuaXQuX25hbWUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIHVuaXQuX21vdmUudG9TdHJpbmcoKSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIHVuaXQuX3dvdW5kcy50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgdW5pdC5fYnJhdmVyeS50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICBpZiAoY29sdW1uV2lkdGhzKSB3ID0gY29sdW1uV2lkdGhzW2NpKytdO1xuICAgICAgICBSZW5kZXJUZXh0KGN0eCwgdW5pdC5fc2F2ZS50b1N0cmluZygpLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgIHggKz0gdztcblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJXb3VuZFRhYmxlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB1bml0OiBBb1NVbml0LCBjb2x1bW5XaWR0aHM6IG51bWJlcltdIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAyMjtcblxuICAgICAgICBpZiAodW5pdC5fd291bmRUcmFja2VyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3ID0gNTA7XG5cbiAgICAgICAgbGV0IHggPSB0aGlzLl9jdXJyZW50WDtcbiAgICAgICAgbGV0IGNpID0gMDtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2dyZXlMaWdodDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHRoaXMuX2N1cnJlbnRZLCB0aGlzLl9tYXhXaWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2JsYWNrQ29sb3I7XG4gICAgICAgIGN0eC5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XG4gICAgICAgIGlmIChjb2x1bW5XaWR0aHMpIHcgPSBjb2x1bW5XaWR0aHNbY2krK107XG5cbiAgICAgICAgUmVuZGVyVGV4dChjdHgsIHVuaXQuX3dvdW5kVHJhY2tlci5fbmFtZSwgeCwgdGhpcy5fY3VycmVudFksIHcsIGhlaWdodCwgSnVzdGlmaWNhdGlvbi5DZW50ZXIpO1xuICAgICAgICB4ICs9IHc7XG5cbiAgICAgICAgZm9yIChsZXQgYXR0ciBvZiAgdW5pdC5fd291bmRUcmFja2VyLl90YWJsZSkge1xuICAgICAgICAgICAgaWYgKGNvbHVtbldpZHRocykgdyA9IGNvbHVtbldpZHRoc1tjaSsrXTtcbiAgICAgICAgICAgIFJlbmRlclRleHQoY3R4LCBhdHRyWzFdLCB4LCB0aGlzLl9jdXJyZW50WSwgdywgaGVpZ2h0LCBKdXN0aWZpY2F0aW9uLkNlbnRlcik7XG4gICAgICAgICAgICB4ICs9IHc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50WSArPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJCb3JkZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBSZW5kZXJlckFvUy5fYmxhY2tDb2xvcjtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeSArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHgsIHkgKyBoIC0gUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdyAtIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIGggLSBSZW5kZXJlckFvUy5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHggKyB3IC0gUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gUmVuZGVyZXJBb1MuX2ZpbGxDb2xvcjtcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeSArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHgsIHkgKyBoIC0gUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdyAtIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkgKyBoKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIGggLSBSZW5kZXJlckFvUy5fYmV2ZWxTaXplKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHggKyB3IC0gUmVuZGVyZXJBb1MuX2JldmVsU2l6ZSwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIFJlbmRlcmVyQW9TLl9iZXZlbFNpemUsIHkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbn1cbiIsInR5cGUgV2VhcG9uU3RyZW5ndGggPSBudW1iZXIgfCBzdHJpbmc7XG5cbmV4cG9ydCBjbGFzcyBXZWFwb24ge1xuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF9yYW5nZTogc3RyaW5nID0gXCJNZWxlZVwiO1xuICAgIF90eXBlOiBzdHJpbmcgPSBcIk1lbGVlXCI7XG4gICAgX3N0cjogV2VhcG9uU3RyZW5ndGggPSBcInVzZXJcIjtcbiAgICBfYXA6IHN0cmluZyA9IFwiXCI7XG4gICAgX2RhbWFnZTogc3RyaW5nID0gXCJcIjtcblxuICAgIF9hYmlsaXRpZXM6IHN0cmluZyA9IFwiXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBXb3VuZFRyYWNrZXIge1xuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF90YWJsZTogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBFeHBsb3Npb24ge1xuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF9kaWNlUm9sbDogc3RyaW5nID0gXCJcIjtcbiAgICBfZGlzdGFuY2U6IHN0cmluZyA9IFwiXCI7XG4gICAgX21vcnRhbFdvdW5kczogc3RyaW5nID0gXCJcIjtcbn1cblxuZXhwb3J0IGNsYXNzIFBzeWNoaWNQb3dlciB7XG4gICAgX25hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgX21hbmlmZXN0OiBudW1iZXIgPSAwO1xuICAgIF9yYW5nZTogc3RyaW5nID0gXCJcIjtcbiAgICBfZGV0YWlsczogc3RyaW5nID0gXCJcIjtcbn1cblxuZXhwb3J0IGVudW0gVW5pdFJvbGUge1xuICAgIE5PTkUsXG5cbiAgICAvLyA0MGtcbiAgICBIUSxcbiAgICBUUixcbiAgICBFTCxcbiAgICBGQSxcbiAgICBIUyxcbiAgICBGTCxcbiAgICBEVCxcbiAgICBGVCxcbiAgICBMVyxcblxuICAgIC8vIEtpbGwgVGVhbVxuICAgIENPTU1BTkRFUixcbiAgICBMRUFERVIsXG4gICAgU1BFQ0lBTElTVCxcbiAgICBOT05fU1BFQ0lBTElTVCxcbn07XG5cbmV4cG9ydCBjb25zdCBVbml0Um9sZVRvU3RyaW5nOiBzdHJpbmdbXSA9IFtcbiAgICAnTm9uZScsXG5cbiAgICAvLyA0MGtcbiAgICAnSFEnLFxuICAgICdUcm9vcHMnLFxuICAgICdFbGl0ZXMnLFxuICAgICdGYXN0IEF0dGFjaycsXG4gICAgJ0hlYXZ5IFN1cHBvcnQnLFxuICAgICdGbHllcicsXG4gICAgJ0RlZGljYXRlZCBUcmFuc3BvcnQnLFxuICAgICdGb3J0aWZpY2F0aW9uJyxcbiAgICAnTG9yZCBvZiBXYXInLFxuXG4gICAgLy8gS2lsbCBUZWFtXG4gICAgJ0NvbW1hbmRlcicsXG4gICAgJ0xlYWRlcicsXG4gICAgJ1NwZWNpYWxpc3QnLFxuICAgICdOb24tc3BlY2lhbGlzdCdcbl07XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfY291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAvLyBDaGFyYWN0ZXJpc3RpY3NcbiAgICBfbW92ZTogc3RyaW5nID0gXCIwXFxcIlwiO1xuICAgIF93czogc3RyaW5nID0gXCJcIjtcbiAgICBfYnM6IHN0cmluZyA9IFwiXCI7XG4gICAgX3N0cjogbnVtYmVyID0gNDtcbiAgICBfdG91Z2huZXNzOiBudW1iZXIgPSA0O1xuICAgIF93b3VuZHM6IG51bWJlciA9IDE7XG4gICAgX2F0dGFja3M6IHN0cmluZyA9IFwiXCI7XG4gICAgX2xlYWRlcnNoaXA6IG51bWJlciA9IDc7XG4gICAgX3NhdmU6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBfd2VhcG9uczogV2VhcG9uW10gPSBbXTtcbiAgICBfcHN5Y2hpY1Bvd2VyczogUHN5Y2hpY1Bvd2VyW10gPSBbXTtcbiAgICBfZXhwbG9zaW9uczogRXhwbG9zaW9uW10gPSBbXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBVbml0IHtcblxuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF9yb2xlOiBVbml0Um9sZSA9IFVuaXRSb2xlLk5PTkU7XG4gICAgX2ZhY3Rpb25zOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgICBfa2V5d29yZHM6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4gICAgX2FiaWxpdGllczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgICBfcnVsZXM6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbiAgICBfbW9kZWxzOiBNb2RlbFtdID0gW107XG5cbiAgICBfcG9pbnRzOiBudW1iZXIgPSAwO1xuICAgIF9wb3dlckxldmVsOiBudW1iZXIgPSAwO1xuICAgIF9jb21tYW5kUG9pbnRzOiBudW1iZXIgPSAwO1xuXG4gICAgX3dvdW5kVHJhY2tlcjogV291bmRUcmFja2VyW10gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEZvcmNlIHtcbiAgICBfY2F0YWxvZzogc3RyaW5nID0gXCJcIjtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJVbmtub3duXCI7XG4gICAgX2ZhY3Rpb246IHN0cmluZyA9IFwiVW5rbm93blwiO1xuICAgIF9ydWxlczogTWFwPHN0cmluZywgc3RyaW5nIHwgbnVsbD4gPSBuZXcgTWFwKCk7XG4gICAgX3VuaXRzOiBVbml0W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxufTtcblxuZXhwb3J0IGNsYXNzIFJvc3RlcjQwayB7XG4gICAgX3Bvd2VyTGV2ZWw6IG51bWJlciA9IDA7XG4gICAgX2NvbW1hbmRQb2ludHM6IG51bWJlciA9IDA7XG4gICAgX3BvaW50czogbnVtYmVyID0gMDtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfZm9yY2VzOiBGb3JjZVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGU0MGtSb3N0ZXIoZG9jOiBEb2N1bWVudCwgaXM0MGs6IGJvb2xlYW4gPSB0cnVlKTogUm9zdGVyNDBrIHwgbnVsbCB7XG4gICAgaWYgKGRvYykge1xuICAgICAgICAvLyBEZXRlcm1pbmUgcm9zdGVyIHR5cGUgKGdhbWUgc3lzdGVtKS5cbiAgICAgICAgdmFyIGluZm8gPSBkb2MucXVlcnlTZWxlY3RvcihcInJvc3RlclwiKTtcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IHJvc3RlciA9IG5ldyBSb3N0ZXI0MGsoKTtcblxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGluZm8uZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgcm9zdGVyLl9uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvc3Rlci5fbmFtZSA9IFwiNDBrIEFybXkgUm9zdGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFBhcnNlUm9zdGVyUG9pbnRzKGRvYywgcm9zdGVyKTtcbiAgICAgICAgICAgIFBhcnNlRm9yY2VzKGRvYywgcm9zdGVyLCBpczQwayk7XG5cbiAgICAgICAgICAgIHJldHVybiByb3N0ZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIFBhcnNlUm9zdGVyUG9pbnRzKGRvYzogWE1MRG9jdW1lbnQsIHJvc3RlcjogUm9zdGVyNDBrKTogdm9pZCB7XG4gICAgdmFyIGNvc3RzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJyb3N0ZXI+Y29zdHM+Y29zdFwiKTtcbiAgICBmb3IgKGxldCBjb3N0IG9mIGNvc3RzKSB7XG4gICAgICAgIGlmIChjb3N0Lmhhc0F0dHJpYnV0ZShcIm5hbWVcIikgJiYgY29zdC5oYXNBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkge1xuICAgICAgICAgICAgbGV0IHdoaWNoID0gY29zdC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gY29zdC5nZXRBdHRyaWJ1dGVOb2RlKFwidmFsdWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh3aGljaCA9PSBcIiBQTFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvc3Rlci5fcG93ZXJMZXZlbCA9ICt2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2hpY2ggPT09IFwicHRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyLl9wb2ludHMgPSArdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdoaWNoID09PSBcIkNQXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9zdGVyLl9jb21tYW5kUG9pbnRzID0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gUGFyc2VGb3JjZXMoZG9jOiBYTUxEb2N1bWVudCwgcm9zdGVyOiBSb3N0ZXI0MGssIGlzNDBrOiBib29sZWFuKTogdm9pZCB7XG4gICAgdmFyIGZvcmNlc1Jvb3QgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcInJvc3Rlcj5mb3JjZXM+Zm9yY2VcIik7XG4gICAgZm9yIChsZXQgcm9vdCBvZiBmb3JjZXNSb290KSB7XG4gICAgICAgIGlmIChyb290Lmhhc0F0dHJpYnV0ZShcIm5hbWVcIikgJiYgcm9vdC5oYXNBdHRyaWJ1dGUoXCJjYXRhbG9ndWVOYW1lXCIpKSB7XG5cbiAgICAgICAgICAgIGxldCBmID0gbmV3IEZvcmNlKCk7XG5cbiAgICAgICAgICAgIGxldCB3aGljaCA9IHJvb3QuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJvb3QuZ2V0QXR0cmlidXRlTm9kZShcImNhdGFsb2d1ZU5hbWVcIik/Lm5vZGVWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKHdoaWNoKSB7XG4gICAgICAgICAgICAgICAgZi5fbmFtZSA9IHdoaWNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZi5fY2F0YWxvZyA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcnVsZXMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb3JjZT5ydWxlcz5ydWxlXCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgIGlmIChydWxlLmhhc0F0dHJpYnV0ZShcIm5hbWVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJ1bGVOYW1lID0gcnVsZS5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYyA9IHJ1bGUucXVlcnlTZWxlY3RvcihcInJ1bGU+ZGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlTmFtZSAmJiBkZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmLl9ydWxlcy5zZXQocnVsZU5hbWUsIGRlc2MudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQYXJzZVVuaXRzKHJvb3QsIGYsIGlzNDBrKTtcblxuICAgICAgICAgICAgcm9zdGVyLl9mb3JjZXMucHVzaChmKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gUGFyc2VVbml0cyhyb290OiBFbGVtZW50LCBmb3JjZTogRm9yY2UsIGlzNDBrOiBib29sZWFuKTogdm9pZCB7XG4gICAgdmFyIHNlbGVjdGlvbnMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb3JjZT5zZWxlY3Rpb25zPnNlbGVjdGlvblwiKTtcbiAgICBmb3IgKGxldCBzZWxlY3Rpb24gb2Ygc2VsZWN0aW9ucykge1xuICAgICAgICB2YXIgdW5pdCA9IENyZWF0ZVVuaXQoc2VsZWN0aW9uLCBpczQwayk7XG4gICAgICAgIGlmICh1bml0ICYmIHVuaXQuX3JvbGUgIT0gVW5pdFJvbGUuTk9ORSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yY2UuX3VuaXRzLnB1c2godW5pdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTb3J0IGZvcmNlIHVuaXRzIGJ5IHJvbGUuXG4gICAgZm9yY2UuX3VuaXRzLnNvcnQoIChhOiBVbml0LCBiOiBVbml0KTpudW1iZXIgPT4ge1xuICAgICAgICBpZiAoYS5fcm9sZSA+IGIuX3JvbGUpIHJldHVybiAxO1xuICAgICAgICBlbHNlIGlmIChhLl9yb2xlID09IGIuX3JvbGUpIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIExvb2t1cFJvbGUocm9sZVRleHQ6IHN0cmluZyk6IFVuaXRSb2xlIHtcbiAgICBzd2l0Y2ggKHJvbGVUZXh0KSB7XG4gICAgICAgIGNhc2UgJ0hRJzogcmV0dXJuIFVuaXRSb2xlLkhRO1xuICAgICAgICBjYXNlICdUcm9vcHMnOiByZXR1cm4gVW5pdFJvbGUuVFI7XG4gICAgICAgIGNhc2UgJ0VsaXRlcyc6IHJldHVybiBVbml0Um9sZS5FTDtcbiAgICAgICAgY2FzZSAnRmFzdCBBdHRhY2snOiByZXR1cm4gVW5pdFJvbGUuRkE7XG4gICAgICAgIGNhc2UgJ0hlYXZ5IFN1cHBvcnQnOiByZXR1cm4gVW5pdFJvbGUuSFM7XG4gICAgICAgIGNhc2UgJ0ZseWVyJzogcmV0dXJuIFVuaXRSb2xlLkZMO1xuICAgICAgICBjYXNlICdEZWRpY2F0ZWQgVHJhbnNwb3J0JzogcmV0dXJuIFVuaXRSb2xlLkRUO1xuICAgICAgICBjYXNlICdGb3J0aWZpY2F0aW9uJzogcmV0dXJuIFVuaXRSb2xlLkZUO1xuICAgICAgICBjYXNlICdMb3JkIG9mIFdhcic6IHJldHVybiBVbml0Um9sZS5MVztcbiAgICB9XG4gICAgcmV0dXJuIFVuaXRSb2xlLk5PTkU7XG59XG5cbmZ1bmN0aW9uIExvb2t1cFJvbGVLaWxsVGVhbShyb2xlVGV4dDogc3RyaW5nKTogVW5pdFJvbGUge1xuICAgIHN3aXRjaCAocm9sZVRleHQpIHtcbiAgICAgICAgY2FzZSAnQ29tbWFuZGVyJzogcmV0dXJuIFVuaXRSb2xlLkNPTU1BTkRFUjtcbiAgICAgICAgY2FzZSAnTGVhZGVyJzogcmV0dXJuIFVuaXRSb2xlLkxFQURFUjtcbiAgICAgICAgY2FzZSAnU3BlY2lhbGlzdCc6IHJldHVybiBVbml0Um9sZS5TUEVDSUFMSVNUO1xuICAgICAgICBjYXNlICdOb24tc3BlY2lhbGlzdCc6IHJldHVybiBVbml0Um9sZS5OT05fU1BFQ0lBTElTVDtcbiAgICB9XG4gICAgcmV0dXJuIFVuaXRSb2xlLk5PTkU7XG59XG5cblxuZnVuY3Rpb24gQ3JlYXRlVW5pdChyb290OiBFbGVtZW50LCBpczQwazogYm9vbGVhbik6IFVuaXQgfCBudWxsIHtcbiAgICB2YXIgdW5pdDogVW5pdCA9IG5ldyBVbml0KCk7XG4gICAgdmFyIHVuaXROYW1lID0gcm9vdC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgIGlmICh1bml0TmFtZSkge1xuICAgICAgICB1bml0Ll9uYW1lID0gdW5pdE5hbWU7XG4gICAgfVxuXG4gICAgdmFyIGNhdGVnb3JpZXMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6c2NvcGUgY2F0ZWdvcmllcz5jYXRlZ29yeVwiKTtcbiAgICBmb3IgKGxldCBjYXQgb2YgY2F0ZWdvcmllcykge1xuICAgICAgICBsZXQgY2F0TmFtZSA9IGNhdC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICBpZiAoY2F0TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgZmFjdFBhdHRlcm4gPSBcIkZhY3Rpb246IFwiO1xuICAgICAgICAgICAgY29uc3QgZmFjdEluZGV4ID0gY2F0TmFtZS5sYXN0SW5kZXhPZihmYWN0UGF0dGVybik7XG4gICAgICAgICAgICBpZiAoZmFjdEluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmYWN0S2V5d29yZCA9IGNhdE5hbWUuc2xpY2UoZmFjdEluZGV4ICsgZmFjdFBhdHRlcm4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB1bml0Ll9mYWN0aW9ucy5hZGQoZmFjdEtleXdvcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9sZVRleHQgPSBjYXROYW1lLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB2YXIgdW5pdFJvbGUgPSBMb29rdXBSb2xlKHJvbGVUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAodW5pdFJvbGUgIT0gVW5pdFJvbGUuTk9ORSkge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9yb2xlID0gdW5pdFJvbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzNDBrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0Um9sZSA9IExvb2t1cFJvbGVLaWxsVGVhbShyb2xlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5pdFJvbGUgIT0gVW5pdFJvbGUuTk9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQuX3JvbGUgPSB1bml0Um9sZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtleXdvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0Ll9rZXl3b3Jkcy5hZGQoY2F0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZXl3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0Ll9rZXl3b3Jkcy5hZGQoY2F0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJvcHMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6c2NvcGUgcHJvZmlsZXM+cHJvZmlsZVwiKTtcbiAgICBmb3IgKGxldCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICAgIC8vIFdoYXQga2luZCBvZiBwcm9wIGlzIHRoaXNcbiAgICAgICAgbGV0IHByb3BOYW1lID0gcHJvcC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICBsZXQgcHJvcFR5cGUgPSBwcm9wLmdldEF0dHJpYnV0ZU5vZGUoXCJ0eXBlTmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICBpZiAocHJvcE5hbWUgJiYgcHJvcFR5cGUpIHtcbiAgICAgICAgICAgIGlmICgocHJvcFR5cGUgPT09IFwiVW5pdFwiKSB8fCAocHJvcFR5cGUgPT09IFwiTW9kZWxcIikpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWw6IE1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgICAgICAgICAgICAgbW9kZWwuX25hbWUgPSBwcm9wTmFtZTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnMgPSBwcm9wLnF1ZXJ5U2VsZWN0b3JBbGwoXCJjaGFyYWN0ZXJpc3RpY3M+Y2hhcmFjdGVyaXN0aWNcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaGFycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhck5hbWUgPSBjaGFyLmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOiBtb2RlbC5fbW92ZSA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdXUyc6IG1vZGVsLl93cyA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdCUyc6IG1vZGVsLl9icyA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzogbW9kZWwuX3N0ciA9ICtjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6IG1vZGVsLl90b3VnaG5lc3MgPSArY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1cnOiBtb2RlbC5fd291bmRzID0gK2NoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzogbW9kZWwuX2F0dGFja3MgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTGQnOiBtb2RlbC5fbGVhZGVyc2hpcCA9ICtjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnU2F2ZSc6IG1vZGVsLl9zYXZlID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHBhcmVudCBub2RlIChhIHNlbGVjdGlvbikgdG8gZGV0ZXJtaW5lIG1vZGVsIGNvdW50LlxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcC5wYXJlbnRFbGVtZW50ICYmIHByb3AucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRTZWxlY3Rpb24gPSBwcm9wLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudFZhbHVlID0gcGFyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZU5vZGUoXCJudW1iZXJcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuX2NvdW50ID0gK2NvdW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fbW9kZWxzLnB1c2gobW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKHByb3BUeXBlID09PSBcIkFiaWxpdGllc1wiKSB8fCAocHJvcFR5cGUgPT09IFwiV2FyZ2VhclwiKSB8fCAocHJvcFR5cGUgPT09IFwiQWJpbGl0eVwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBjaGFycyA9IHByb3AucXVlcnlTZWxlY3RvckFsbChcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGFyIG9mIGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFyTmFtZSA9IGNoYXIuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lICYmIGNoYXIudGV4dENvbnRlbnQgJiYgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2hhck5hbWUgPT09IFwiRGVzY3JpcHRpb25cIikgfHwgKGNoYXJOYW1lID09PSBcIkFiaWxpdHlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0Ll9hYmlsaXRpZXMuc2V0KHByb3BOYW1lLCBjaGFyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BUeXBlID09PSBcIldlYXBvblwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdlYXBvbjogV2VhcG9uID0gbmV3IFdlYXBvbigpO1xuICAgICAgICAgICAgICAgIHdlYXBvbi5fbmFtZSA9IHByb3BOYW1lO1xuICAgICAgICAgICAgICAgIGxldCBjaGFycyA9IHByb3AucXVlcnlTZWxlY3RvckFsbChcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGFyIG9mIGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFyTmFtZSA9IGNoYXIuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUmFuZ2UnOiB3ZWFwb24uX3JhbmdlID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1R5cGUnOiB3ZWFwb24uX3R5cGUgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6IHdlYXBvbi5fc3RyID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0FQJzogd2VhcG9uLl9hcCA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzogd2VhcG9uLl9kYW1hZ2UgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQWJpbGl0aWVzJzogd2VhcG9uLl9hYmlsaXRpZXMgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodW5pdC5fbW9kZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9tb2RlbHNbdW5pdC5fbW9kZWxzLmxlbmd0aCAtIDFdLl93ZWFwb25zLnB1c2god2VhcG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wVHlwZS5pbmNsdWRlcyhcIldvdW5kIFRyYWNrXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYWNrZXIgPSBuZXcgV291bmRUcmFja2VyKCk7XG4gICAgICAgICAgICAgICAgdHJhY2tlci5fbmFtZSA9IHByb3BOYW1lO1xuICAgICAgICAgICAgICAgIGxldCBjaGFycyA9IHByb3AucXVlcnlTZWxlY3RvckFsbChcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGFyIG9mIGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFyTmFtZSA9IGNoYXIuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lICYmIHByb3BOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrZXIuX3RhYmxlLnNldChjaGFyTmFtZSwgY2hhci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tlci5fdGFibGUuc2V0KGNoYXJOYW1lLCBcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fd291bmRUcmFja2VyLnB1c2godHJhY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wVHlwZSA9PSBcIlRyYW5zcG9ydFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gcHJvcC5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJOYW1lID0gY2hhci5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhck5hbWUgJiYgY2hhci50ZXh0Q29udGVudCAmJiBwcm9wTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lID09PSBcIkNhcGFjaXR5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0Ll9hYmlsaXRpZXMuc2V0KHByb3BOYW1lLCBjaGFyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BUeXBlID09IFwiUHN5Y2hpYyBQb3dlclwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvd2VyOiBQc3ljaGljUG93ZXIgPSBuZXcgUHN5Y2hpY1Bvd2VyKCk7XG4gICAgICAgICAgICAgICAgcG93ZXIuX25hbWUgPSBwcm9wTmFtZTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhcnMgPSBwcm9wLnF1ZXJ5U2VsZWN0b3JBbGwoXCJjaGFyYWN0ZXJpc3RpY3M+Y2hhcmFjdGVyaXN0aWNcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaGFycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhck5hbWUgPSBjaGFyLmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1JhbmdlJzogcG93ZXIuX3JhbmdlID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1dhcnAgQ2hhcmdlJzogcG93ZXIuX21hbmlmZXN0ID0gK2NoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEZXRhaWxzJzogcG93ZXIuX2RldGFpbHMgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fbW9kZWxzW3VuaXQuX21vZGVscy5sZW5ndGggLSAxXS5fcHN5Y2hpY1Bvd2Vycy5wdXNoKHBvd2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BUeXBlID09IFwiRXhwbG9zaW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXhwbG9zaW9uOiBFeHBsb3Npb24gPSBuZXcgRXhwbG9zaW9uKCk7XG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uLl9uYW1lID0gcHJvcE5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gcHJvcC5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJOYW1lID0gY2hhci5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEaWNlIFJvbGwnOiBleHBsb3Npb24uX2RpY2VSb2xsID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Rpc3RhbmNlJzogZXhwbG9zaW9uLl9kaXN0YW5jZSA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNb3J0YWwgV291bmRzJzogZXhwbG9zaW9uLl9tb3J0YWxXb3VuZHMgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fbW9kZWxzW3VuaXQuX21vZGVscy5sZW5ndGggLSAxXS5fZXhwbG9zaW9ucy5wdXNoKGV4cGxvc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gcHJvZmlsZSB0eXBlOiBcIiArIHByb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9ubHkgbWF0Y2ggY29zdHMtPmNvc3RzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdW5pdCBhbmQgbm90IGl0cyBjaGlsZHJlbiAobW9kZWwgYW5kIHdlYXBvbikgY29zdHMuXG4gICAgdmFyIGNvc3RzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiOnNjb3BlIGNvc3RzPmNvc3RcIik7XG4gICAgZm9yIChsZXQgY29zdCBvZiBjb3N0cykge1xuICAgICAgICBpZiAoY29zdC5oYXNBdHRyaWJ1dGUoXCJuYW1lXCIpICYmIGNvc3QuaGFzQXR0cmlidXRlKFwidmFsdWVcIikpIHtcbiAgICAgICAgICAgIGxldCB3aGljaCA9IGNvc3QuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGNvc3QuZ2V0QXR0cmlidXRlTm9kZShcInZhbHVlXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAod2hpY2ggPT0gXCIgUExcIikge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9wb3dlckxldmVsICs9ICt2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2hpY2ggPT0gXCJwdHNcIikge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9wb2ludHMgKz0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3aGljaCA9PSBcIkNQXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdC5fY29tbWFuZFBvaW50cyArPSArdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiOnNjb3BlIHJ1bGVzID4gcnVsZVwiKTtcbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgIGlmIChydWxlLmhhc0F0dHJpYnV0ZShcIm5hbWVcIikpIHtcbiAgICAgICAgICAgIGxldCBydWxlTmFtZSA9IHJ1bGUuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIHZhciBkZXNjID0gcnVsZS5xdWVyeVNlbGVjdG9yKFwiZGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICBpZiAocnVsZU5hbWUgJiYgZGVzYyAmJiBkZXNjLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdW5pdC5fcnVsZXMuc2V0KHJ1bGVOYW1lLCBkZXNjLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bml0O1xufVxuIiwiXG5leHBvcnQgY2xhc3MgQW9TV2VhcG9uIHtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfdHlwZTogc3RyaW5nID0gXCJNZWxlZVwiOyAvLyBvciBcIk1pc3NpbGVcIlxuICAgIF9yYW5nZTogc3RyaW5nID0gXCJcIjtcbiAgICBfYXR0YWNrczogc3RyaW5nID0gXCJcIjtcbiAgICBfdG9IaXQ6IHN0cmluZyA9IFwiXCI7XG4gICAgX3RvV291bmQ6IHN0cmluZyA9IFwiXCI7XG4gICAgX3JlbmQ6IHN0cmluZyA9IFwiXCI7XG4gICAgX2RhbWFnZTogc3RyaW5nID0gXCJcIjtcbn1cblxuZXhwb3J0IGNsYXNzIEFvU1dvdW5kVHJhY2tlciB7XG4gICAgX25hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgX3dvdW5kVHJhY2tlckxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBfdGFibGU6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG59O1xuXG5leHBvcnQgY2xhc3MgQW9TU3BlbGwge1xuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF9jYXN0aW5nVmFsdWU6IG51bWJlciA9IDA7XG4gICAgX2Rlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xufVxuXG5leHBvcnQgY2xhc3MgQW9TUHJheWVyIHtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBBb1NBbGxlZ2lhbmNlIHtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfYmF0dGxlVHJhaXRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICAgIF9jb21tYW5kQWJpbGl0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xufVxuXG5leHBvcnQgZW51bSBBb1NVbml0Um9sZSB7XG4gICAgTk9ORSxcblxuICAgIExFQURFUixcbiAgICBCQVRUTEVMSU5FLFxuICAgIEJFSEVNT1RILFxuICAgIEFSVElMTEVSWSxcbiAgICBPVEhFUixcbiAgICBTQ0VORVJZLFxuXG4gICAgQkFUVEFMSU9OLFxuICAgIE1BTElHTl9TT1JDRVJZLFxuICAgIFJFQUxNLFxufTtcblxuZXhwb3J0IGNvbnN0IEFvU1VuaXRSb2xlVG9TdHJpbmc6IHN0cmluZ1tdID0gW1xuICAgICdOb25lJyxcblxuICAgICdMZWFkZXInLFxuICAgICdCYXR0bGVsaW5lJyxcbiAgICAnQmVoZW1vdGgnLFxuICAgICdBcnRpbGxlcnknLFxuICAgICdPdGhlcicsXG4gICAgJ1NjZW5lcnknLFxuXG4gICAgJ0JhdHRhbGlvbicsXG4gICAgJ01hbGlnbiBTb3JjZXJ5JyxcbiAgICAnUmVhbG0nXG5dO1xuXG5leHBvcnQgY2xhc3MgQW9TVW5pdCB7XG5cbiAgICBfbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICBfcm9sZTogQW9TVW5pdFJvbGUgPSBBb1NVbml0Um9sZS5OT05FO1xuICAgIF9rZXl3b3JkczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG5cbiAgICBfYWJpbGl0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICAgIF9jb21tYW5kQWJpbGl0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICAgIF9jb21tYW5kVHJhaXRzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuICAgIF9tYWdpYzogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgICBfYXJ0ZWZhY3RzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gICAgX2NvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgLy8gQ2hhcmFjdGVyaXN0aWNzXG4gICAgX21vdmU6IHN0cmluZyA9IFwiMFxcXCJcIjtcbiAgICBfd291bmRzOiBudW1iZXIgPSAxO1xuICAgIF9icmF2ZXJ5OiBudW1iZXIgPSA3O1xuICAgIF9zYXZlOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgX3dlYXBvbnM6IEFvU1dlYXBvbltdID0gW107XG4gICAgX3NwZWxsczogQW9TU3BlbGxbXSA9IFtdO1xuICAgIF9wcmF5ZXJzOiBBb1NQcmF5ZXJbXSA9IFtdO1xuXG4gICAgX3BvaW50czogbnVtYmVyID0gMDtcblxuICAgIF93b3VuZFRyYWNrZXI6IEFvU1dvdW5kVHJhY2tlcnxudWxsID0gbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIEFvU0ZvcmNlIHtcbiAgICBfY2F0YWxvZzogc3RyaW5nID0gXCJcIjtcbiAgICBfbmFtZTogc3RyaW5nID0gXCJVbmtub3duXCI7XG4gICAgX2FsbGVnaWFuY2U6IEFvU0FsbGVnaWFuY2U7XG4gICAgX3VuaXRzOiBBb1NVbml0W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9hbGxlZ2lhbmNlID0gbmV3IEFvU0FsbGVnaWFuY2UoKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY2xhc3MgUm9zdGVyQW9TIHtcbiAgICBfY29tbWFuZFBvaW50czogbnVtYmVyID0gMDtcbiAgICBfcG9pbnRzOiBudW1iZXIgPSAwO1xuICAgIF9uYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIF9mb3JjZXM6IEFvU0ZvcmNlW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxufTtcblxuZnVuY3Rpb24gTG9va3VwUm9sZShyb2xlVGV4dDogc3RyaW5nKTogQW9TVW5pdFJvbGUge1xuICAgIHN3aXRjaCAocm9sZVRleHQpIHtcbiAgICAgICAgY2FzZSAnTGVhZGVyJzogcmV0dXJuIEFvU1VuaXRSb2xlLkxFQURFUjtcbiAgICAgICAgY2FzZSAnQmF0dGxlbGluZSc6IHJldHVybiBBb1NVbml0Um9sZS5CQVRUTEVMSU5FO1xuICAgICAgICBjYXNlICdPdGhlcic6IHJldHVybiBBb1NVbml0Um9sZS5PVEhFUjtcbiAgICAgICAgY2FzZSAnQmVoZW1vdGgnOiByZXR1cm4gQW9TVW5pdFJvbGUuQkVIRU1PVEg7XG4gICAgICAgIGNhc2UgJ0FydGlsbGVyeSc6IHJldHVybiBBb1NVbml0Um9sZS5BUlRJTExFUlk7XG4gICAgICAgIGNhc2UgJ1NjZW5lcnknOiByZXR1cm4gQW9TVW5pdFJvbGUuU0NFTkVSWTtcblxuICAgICAgICBjYXNlICdCYXR0YWxpb24nOiByZXR1cm4gQW9TVW5pdFJvbGUuQkFUVEFMSU9OO1xuICAgICAgICBjYXNlICdNYWxpZ24gU29yY2VyeSc6IHJldHVybiBBb1NVbml0Um9sZS5NQUxJR05fU09SQ0VSWTtcbiAgICAgICAgY2FzZSAnUmVhbG0nOiByZXR1cm4gQW9TVW5pdFJvbGUuUkVBTE07XG4gICAgfVxuICAgIHJldHVybiBBb1NVbml0Um9sZS5OT05FO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlQW9TUm9zdGVyKGRvYzogRG9jdW1lbnQpOiBSb3N0ZXJBb1MgfCBudWxsIHtcbiAgICBpZiAoZG9jKSB7XG4gICAgICAgIGxldCBpbmZvID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJyb3N0ZXJcIik7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCByb3N0ZXIgPSBuZXcgUm9zdGVyQW9TKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpbmZvLmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgIHJvc3Rlci5fbmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3N0ZXIuX25hbWUgPSBcIkFnZSBvZiBTaWdtYXIgUm9zdGVyXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFBhcnNlUm9zdGVyUG9pbnRzKGRvYywgcm9zdGVyKTtcbiAgICAgICAgICAgIFBhcnNlRm9yY2VzKGRvYywgcm9zdGVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJvc3RlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gUGFyc2VSb3N0ZXJQb2ludHMoZG9jOiBYTUxEb2N1bWVudCwgcm9zdGVyOiBSb3N0ZXJBb1MpOiB2b2lkIHtcbiAgICBsZXQgY29zdHMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcInJvc3Rlcj5jb3N0cz5jb3N0XCIpO1xuICAgIGZvciAobGV0IGNvc3Qgb2YgY29zdHMpIHtcbiAgICAgICAgaWYgKGNvc3QuaGFzQXR0cmlidXRlKFwibmFtZVwiKSAmJiBjb3N0Lmhhc0F0dHJpYnV0ZShcInZhbHVlXCIpKSB7XG4gICAgICAgICAgICBsZXQgd2hpY2ggPSBjb3N0LmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBjb3N0LmdldEF0dHJpYnV0ZU5vZGUoXCJ2YWx1ZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSBcInB0c1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvc3Rlci5fcG9pbnRzID0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gUGFyc2VGb3JjZXMoZG9jOiBYTUxEb2N1bWVudCwgcm9zdGVyOiBSb3N0ZXJBb1MpOiB2b2lkIHtcbiAgICBsZXQgZm9yY2VzUm9vdCA9IGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwicm9zdGVyPmZvcmNlcz5mb3JjZVwiKTtcbiAgICBmb3IgKGxldCByb290IG9mIGZvcmNlc1Jvb3QpIHtcbiAgICAgICAgaWYgKHJvb3QuaGFzQXR0cmlidXRlKFwibmFtZVwiKSAmJiByb290Lmhhc0F0dHJpYnV0ZShcImNhdGFsb2d1ZU5hbWVcIikpIHtcblxuICAgICAgICAgICAgbGV0IGYgPSBuZXcgQW9TRm9yY2UoKTtcblxuICAgICAgICAgICAgbGV0IHdoaWNoID0gcm9vdC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcm9vdC5nZXRBdHRyaWJ1dGVOb2RlKFwiY2F0YWxvZ3VlTmFtZVwiKT8ubm9kZVZhbHVlO1xuXG4gICAgICAgICAgICBpZiAod2hpY2gpIHtcbiAgICAgICAgICAgICAgICBmLl9uYW1lID0gd2hpY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmLl9jYXRhbG9nID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFBhcnNlU2VsZWN0aW9ucyhyb290LCBmKTtcblxuICAgICAgICAgICAgcm9zdGVyLl9mb3JjZXMucHVzaChmKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhyb3N0ZXIpO1xufVxuXG5mdW5jdGlvbiBQYXJzZVNlbGVjdGlvbnMocm9vdDogRWxlbWVudCwgZm9yY2U6IEFvU0ZvcmNlKTogdm9pZCB7XG4gICAgbGV0IHNlbGVjdGlvbnMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmb3JjZT5zZWxlY3Rpb25zPnNlbGVjdGlvblwiKTtcblxuICAgIGZvciAobGV0IHNlbGVjdGlvbiBvZiBzZWxlY3Rpb25zKSB7XG4gICAgICAgIC8vIFdoYXQga2luZCBvZiBzZWxlY3Rpb24gaXMgdGhpc1xuICAgICAgICBsZXQgc2VsZWN0aW9uVHlwZSA9IHNlbGVjdGlvbi5nZXRBdHRyaWJ1dGVOb2RlKFwidHlwZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICBpZiAoIXNlbGVjdGlvblR5cGUpIGNvbnRpbnVlO1xuICAgICAgICBsZXQgc2VsZWN0aW9uTmFtZSA9IHNlbGVjdGlvbi5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICBpZiAoc2VsZWN0aW9uTmFtZSAmJiAoc2VsZWN0aW9uTmFtZS5pbmNsdWRlcyhcIkFsbGVnaWFuY2VcIikpKSB7XG4gICAgICAgICAgICBsZXQgYWxsZWdpYW5jZSA9IFBhcnNlQWxsZWdpYW5jZShzZWxlY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGFsbGVnaWFuY2UpIHtcbiAgICAgICAgICAgICAgICBmb3JjZS5fYWxsZWdpYW5jZSA9IGFsbGVnaWFuY2U7XG4gICAgICAgICAgICB9ICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB1bml0ID0gUGFyc2VVbml0KHNlbGVjdGlvbik7XG4gICAgICAgICAgICBpZiAodW5pdCAmJiAodW5pdC5fcm9sZSAhPSBBb1NVbml0Um9sZS5OT05FKSkge1xuICAgICAgICAgICAgICAgIGZvcmNlLl91bml0cy5wdXNoKHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU29ydCBmb3JjZSB1bml0cyBieSByb2xlLlxuICAgIGZvcmNlLl91bml0cy5zb3J0KChhOiBBb1NVbml0LCBiOiBBb1NVbml0KTogbnVtYmVyID0+IHtcbiAgICAgICAgaWYgKGEuX3JvbGUgPiBiLl9yb2xlKSByZXR1cm4gMTtcbiAgICAgICAgZWxzZSBpZiAoYS5fcm9sZSA9PSBiLl9yb2xlKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBQYXJzZVVuaXQocm9vdDogRWxlbWVudCk6IEFvU1VuaXQge1xuICAgIGxldCB1bml0OiBBb1NVbml0ID0gbmV3IEFvU1VuaXQoKTtcblxuICAgIGxldCBwcm9maWxlcyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChcInByb2ZpbGVzPnByb2ZpbGVcIik7XG4gICAgZm9yIChsZXQgcHJvZiBvZiBwcm9maWxlcykge1xuICAgICAgICBsZXQgcHJvZk5hbWUgPSBwcm9mLmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgIGxldCBwcm9mVHlwZSA9IHByb2YuZ2V0QXR0cmlidXRlTm9kZShcInR5cGVOYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgIGlmIChwcm9mTmFtZSAmJiBwcm9mVHlwZSkge1xuICAgICAgICAgICAgaWYgKHByb2ZUeXBlID09IFwiVW5pdFwiKSB7XG4gICAgICAgICAgICAgICAgdW5pdC5fbmFtZSA9IHByb2ZOYW1lO1xuICAgICAgICAgICAgICAgIGxldCBjaGFycyA9IHByb2YucXVlcnlTZWxlY3RvckFsbChcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGFyIG9mIGNoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFyTmFtZSA9IGNoYXIuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lICYmIGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNb3ZlJzogdW5pdC5fbW92ZSA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1dvdW5kcyc6IHVuaXQuX3dvdW5kcyA9ICtjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdCcmF2ZXJ5JzogdW5pdC5fYnJhdmVyeSA9ICtjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdTYXZlJzogdW5pdC5fc2F2ZSA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvZlR5cGUgPT0gXCJVbml0IEFiaWxpdGllc1wiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXIgPSBwcm9mLnF1ZXJ5U2VsZWN0b3IoXCJjaGFyYWN0ZXJpc3RpY3M+Y2hhcmFjdGVyaXN0aWNcIik7XG4gICAgICAgICAgICAgICAgaWYgKGNoYXIgJiYgY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9hYmlsaXRpZXMuc2V0KHByb2ZOYW1lLCBjaGFyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9mVHlwZSA9PSBcIkNvbW1hbmQgQWJpbGl0aWVzXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hhciA9IHByb2YucXVlcnlTZWxlY3RvcihcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhciAmJiBjaGFyLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHVuaXQuX2NvbW1hbmRBYmlsaXRpZXMuc2V0KHByb2ZOYW1lLCBjaGFyLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9mVHlwZSA9PSBcIk1hZ2ljXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hhcmFjdGVyaXN0aWNzID0gcHJvZi5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcmFjdGVyaXN0aWNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFyTmFtZSA9IGNoYXIuZ2V0QXR0cmlidXRlTm9kZShcIm5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJOYW1lICYmIGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQuX21hZ2ljLnNldChjaGFyTmFtZSwgY2hhci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9mVHlwZSA9PSBcIlVuaXQgTGVhZGVyXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hhciA9IHByb2YucXVlcnlTZWxlY3RvcihcImNoYXJhY3RlcmlzdGljcz5jaGFyYWN0ZXJpc3RpY1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhciAmJiBjaGFyLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHVuaXQuX2FiaWxpdGllcy5zZXQocHJvZlR5cGUsIGNoYXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb2ZUeXBlID09IFwiU3BlbGxcIikge1xuICAgICAgICAgICAgICAgIGxldCBzcGVsbCA9IG5ldyBBb1NTcGVsbCgpO1xuICAgICAgICAgICAgICAgIHNwZWxsLl9uYW1lID0gcHJvZk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gcHJvZi5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJOYW1lID0gY2hhci5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhck5hbWUgJiYgY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Nhc3RpbmcgVmFsdWUnOiBzcGVsbC5fY2FzdGluZ1ZhbHVlID0gK2NoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Rlc2NyaXB0aW9uJzogc3BlbGwuX2Rlc2NyaXB0aW9uID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fc3BlbGxzLnB1c2goc3BlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvZlR5cGUgPT0gXCJXZWFwb25cIikge1xuICAgICAgICAgICAgICAgIGxldCB3ZWFwb24gPSBuZXcgQW9TV2VhcG9uKCk7XG4gICAgICAgICAgICAgICAgd2VhcG9uLl9uYW1lID0gcHJvZk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gcHJvZi5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJOYW1lID0gY2hhci5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhck5hbWUgJiYgY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1JhbmdlJzogd2VhcG9uLl9yYW5nZSA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1R5cGUnOiB3ZWFwb24uX3R5cGUgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBdHRhY2tzJzogd2VhcG9uLl9hdHRhY2tzID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUmVuZCc6IHdlYXBvbi5fcmVuZCA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1RvIEhpdCc6IHdlYXBvbi5fdG9IaXQgPSBjaGFyLnRleHRDb250ZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdUbyBXb3VuZCc6IHdlYXBvbi5fdG9Xb3VuZCA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0RhbWFnZSc6IHdlYXBvbi5fZGFtYWdlID0gY2hhci50ZXh0Q29udGVudDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5pdC5fd2VhcG9ucy5wdXNoKHdlYXBvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9mVHlwZSA9PSBcIkNvbW1hbmQgVHJhaXRcIikge1xuICAgICAgICAgICAgICAgIGxldCBjaGFyID0gcHJvZi5xdWVyeVNlbGVjdG9yKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyICYmIGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdC5fY29tbWFuZFRyYWl0cy5zZXQocHJvZk5hbWUsIGNoYXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb2ZUeXBlID09IFwiQXJ0ZWZhY3RcIikge1xuICAgICAgICAgICAgICAgIGxldCBjaGFyID0gcHJvZi5xdWVyeVNlbGVjdG9yKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyICYmIGNoYXIudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdC5fYXJ0ZWZhY3RzLnNldChwcm9mTmFtZSwgY2hhci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvZlR5cGUgPT0gXCJQcmF5ZXJcIikge1xuICAgICAgICAgICAgICAgIGxldCBwcmF5ZXIgPSBuZXcgQW9TUHJheWVyKCk7XG4gICAgICAgICAgICAgICAgcHJheWVyLl9uYW1lID0gcHJvZk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gcHJvZi5xdWVyeVNlbGVjdG9yQWxsKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJOYW1lID0gY2hhci5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhck5hbWUgJiYgY2hhci50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Rlc2NyaXB0aW9uJzogcHJheWVyLl9kZXNjcmlwdGlvbiA9IGNoYXIudGV4dENvbnRlbnQ7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuaXQuX3ByYXllcnMucHVzaChwcmF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvZlR5cGUuaW5jbHVkZXMoXCJXb3VuZCBUcmFja1wiKSB8fCBwcm9mVHlwZS5pbmNsdWRlcyhcIkRhbWFnZSBUYWJsZVwiKSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gdW5pdCBwcm9maWxlIHR5cGU6IFwiICsgcHJvZlR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNvc3RzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiY29zdHM+Y29zdFwiKTtcbiAgICBmb3IgKGxldCBjb3N0IG9mIGNvc3RzKSB7XG4gICAgICAgIGlmIChjb3N0Lmhhc0F0dHJpYnV0ZShcIm5hbWVcIikgJiYgY29zdC5oYXNBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSkge1xuICAgICAgICAgICAgbGV0IHdoaWNoID0gY29zdC5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gY29zdC5nZXRBdHRyaWJ1dGVOb2RlKFwidmFsdWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh3aGljaCA9PT0gXCJwdHNcIikge1xuICAgICAgICAgICAgICAgICAgICB1bml0Ll9wb2ludHMgKz0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjYXRlZ29yaWVzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiOnNjb3BlIGNhdGVnb3JpZXM+Y2F0ZWdvcnlcIik7XG4gICAgZm9yIChsZXQgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllcykge1xuICAgICAgICBsZXQgY2F0TmFtZSA9IGNhdGVnb3J5LmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgIGxldCBjYXRQcmltYXJ5ID0gY2F0ZWdvcnkuZ2V0QXR0cmlidXRlTm9kZShcInByaW1hcnlcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgaWYgKGNhdE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvbGVUZXh0ID0gY2F0TmFtZS50cmltKCk7XG4gICAgICAgICAgICB2YXIgdW5pdFJvbGUgPSBMb29rdXBSb2xlKHJvbGVUZXh0KTtcbiAgICAgICAgICAgIGlmICh1bml0Um9sZSAhPSBBb1NVbml0Um9sZS5OT05FKSB7XG4gICAgICAgICAgICAgICAgdW5pdC5fcm9sZSA9IHVuaXRSb2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gS2V5d29yZFxuICAgICAgICAgICAgICAgIHVuaXQuX2tleXdvcmRzLmFkZChjYXROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bml0O1xufVxuXG5mdW5jdGlvbiBQYXJzZUFsbGVnaWFuY2Uocm9vdDogRWxlbWVudCk6IEFvU0FsbGVnaWFuY2UgfCBudWxsIHtcbiAgICBsZXQgYWxsZWdpYW5jZTogQW9TQWxsZWdpYW5jZSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBzZWxlY3Rpb24gPSByb290LnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3Rpb25zPnNlbGVjdGlvblwiKTtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIGxldCBuYW1lID0gc2VsZWN0aW9uLmdldEF0dHJpYnV0ZU5vZGUoXCJuYW1lXCIpPy5ub2RlVmFsdWU7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhbGxlZ2lhbmNlID0gbmV3IEFvU0FsbGVnaWFuY2UoKTtcbiAgICAgICAgICAgIGFsbGVnaWFuY2UuX25hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9maWxlcyA9IHNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwicHJvZmlsZXM+cHJvZmlsZVwiKTtcbiAgICAgICAgZm9yIChsZXQgcHJvZiBvZiBwcm9maWxlcykge1xuICAgICAgICAgICAgbGV0IHByb2ZOYW1lID0gcHJvZi5nZXRBdHRyaWJ1dGVOb2RlKFwibmFtZVwiKT8ubm9kZVZhbHVlO1xuICAgICAgICAgICAgbGV0IHByb2ZUeXBlID0gcHJvZi5nZXRBdHRyaWJ1dGVOb2RlKFwidHlwZU5hbWVcIik/Lm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGlmIChwcm9mTmFtZSAmJiBwcm9mVHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9mVHlwZSA9PSBcIkJhdHRsZSBUcmFpdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXNjID0gcHJvZi5xdWVyeVNlbGVjdG9yKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzYy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbGVnaWFuY2U/Ll9iYXR0bGVUcmFpdHMuc2V0KHByb2ZOYW1lLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvZlR5cGUgPT0gXCJDb21tYW5kIEFiaWxpdGllc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXNjID0gcHJvZi5xdWVyeVNlbGVjdG9yKFwiY2hhcmFjdGVyaXN0aWNzPmNoYXJhY3RlcmlzdGljXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzYy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbGVnaWFuY2U/Ll9jb21tYW5kQWJpbGl0aWVzLnNldChwcm9mTmFtZSwgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVuZXhwZWN0ZWQgYWxsZWdpYW5jZSBwcm9maWxlIHR5cGU6IFwiICsgcHJvZlR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWxsZWdpYW5jZTtcbn0iXSwic291cmNlUm9vdCI6IiJ9