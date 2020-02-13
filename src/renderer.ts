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

export interface Renderer {

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void;

}

export enum Justification {
    Left,
    Right,
    Center
};

export function RenderText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number, how: Justification): void {
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

export function RenderParagraph(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number): number {
    let curY: number = y;
    if (ctx && text.length) {
        let lines: string[] = [];
        let currentLine: string[] = [];
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
        let length = 0;
        const spaceWidth = ctx.measureText(" ").width;
        const heightMeasure = ctx.measureText(text);
        const th = (heightMeasure.actualBoundingBoxDescent - heightMeasure.actualBoundingBoxAscent) * 1.2;

        text.split(" ").forEach(function (word) {
            const measure: TextMetrics = ctx.measureText(word);
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


