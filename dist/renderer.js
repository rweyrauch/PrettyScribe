export var Justification;
(function (Justification) {
    Justification[Justification["Left"] = 0] = "Left";
    Justification[Justification["Right"] = 1] = "Right";
    Justification[Justification["Center"] = 2] = "Center";
})(Justification || (Justification = {}));
;
export function RenderText(ctx, text, x, y, w, h, how) {
    if (ctx && text.length) {
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
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
export function RenderParagraph(ctx, text, x, y, w) {
    let curY = y;
    if (ctx && text.length) {
        let lines = [];
        let currentLine = [];
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
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
