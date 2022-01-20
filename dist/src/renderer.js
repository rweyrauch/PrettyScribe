"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixDPI = exports.RenderParagraph = exports.RenderText = exports.RenderTextFull = exports.VertAlign = exports.Justification = void 0;
var Justification;
(function (Justification) {
    Justification[Justification["Left"] = 0] = "Left";
    Justification[Justification["Right"] = 1] = "Right";
    Justification[Justification["Center"] = 2] = "Center";
})(Justification = exports.Justification || (exports.Justification = {}));
;
var VertAlign;
(function (VertAlign) {
    VertAlign[VertAlign["Top"] = 0] = "Top";
    VertAlign[VertAlign["Bottom"] = 1] = "Bottom";
    VertAlign[VertAlign["Center"] = 2] = "Center";
})(VertAlign = exports.VertAlign || (exports.VertAlign = {}));
function RenderTextFull(ctx, text, x, y, w, h, how, howVert) {
    if (ctx && text.length) {
        ctx.textBaseline = 'top';
        let measure = ctx.measureText(text);
        const tw = measure.width;
        const th = measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
        let alignedY = y;
        if (howVert == VertAlign.Top) {
            alignedY = y;
        }
        else if (howVert == VertAlign.Bottom) {
            alignedY = y + h - th;
        }
        else if (howVert == VertAlign.Center) {
            alignedY = y + (h - th) / 2;
        }
        if (how == Justification.Center) {
            ctx.fillText(text, x + Math.max((w - tw) / 2, 0), alignedY, w);
        }
        else if (how == Justification.Left) {
            ctx.fillText(text, x, alignedY, w);
        }
        else if (how == Justification.Right) {
            ctx.fillText(text, x + w - tw, alignedY, w);
        }
    }
}
exports.RenderTextFull = RenderTextFull;
function RenderText(ctx, text, x, y, w, h, how) {
    RenderTextFull(ctx, text, x, y, w, h, how, VertAlign.Center);
}
exports.RenderText = RenderText;
function RenderParagraph(ctx, text, x, y, w, indentX) {
    let curY = y;
    if (ctx && text.length) {
        let lines = [];
        let currentLine = [];
        ctx.textBaseline = 'top';
        let length = 0;
        const spaceWidth = ctx.measureText(" ").width;
        const heightMeasure = ctx.measureText(text);
        const th = (heightMeasure.actualBoundingBoxDescent - heightMeasure.actualBoundingBoxAscent) * 1.2;
        const firstLineWidth = w - indentX;
        let activeWidth = firstLineWidth;
        text.split(" ").forEach(function (word) {
            const measure = ctx.measureText(word);
            if ((length + measure.width) > activeWidth) {
                lines.push(currentLine.join(" "));
                activeWidth = w;
                currentLine.length = 0;
                length = 0;
            }
            length += measure.width + spaceWidth;
            currentLine.push(word);
        });
        if (currentLine.length > 0) {
            lines.push(currentLine.join(" "));
        }
        let lineStart = x + indentX;
        for (let l of lines) {
            ctx.fillText(l, lineStart, curY);
            lineStart = x;
            curY += th;
        }
    }
    return curY;
}
exports.RenderParagraph = RenderParagraph;
function FixDPI(canvas) {
    let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    if (style_height == 0)
        style_height = canvas.height;
    if (style_width == 0)
        style_width = canvas.width;
    canvas.setAttribute('height', (style_height * dpi).toString());
    canvas.setAttribute('width', (style_width * dpi).toString());
}
exports.FixDPI = FixDPI;
//# sourceMappingURL=renderer.js.map