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

    render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void;

}

export enum Justification {
    Left,
    Right,
    Center
};
export enum VertAlign {
    Top,
    Bottom,
    Center
}

export function RenderTextFull(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number, how: Justification, howVert: VertAlign): void {
    if (ctx && text.length) {
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
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
        } else if (how == Justification.Left) {
            ctx.fillText(text, x, alignedY, w);
        } else if (how == Justification.Right) {
            ctx.fillText(text, x + w - tw, alignedY, w);
        }
    }
}

export function RenderText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number, how: Justification): void {
    RenderTextFull(ctx, text, x, y, w, h, how, VertAlign.Center);
}

export function RenderParagraph(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, indentX: number): number {
    let curY: number = y;
    if (ctx && text.length) {
        let lines: string[] = [];
        let currentLine: string[] = [];
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
        let length = 0;
        const spaceWidth = ctx.measureText(" ").width;
        const heightMeasure = ctx.measureText(text);
        const th = (heightMeasure.actualBoundingBoxDescent - heightMeasure.actualBoundingBoxAscent) * 1.2;

        const firstLineWidth = w - indentX;
        let activeWidth = firstLineWidth;

        text.split(" ").forEach(function (word) {
            const measure: TextMetrics = ctx.measureText(word);
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

export function FixDPI(canvas: HTMLCanvasElement) {
    let dpi: number = window.devicePixelRatio;

    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    //get CSS height
    let style_height: number = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width: number = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    if (style_height == 0) style_height = canvas.height;
    if (style_width == 0) style_width = canvas.width;

    //scale the canvas
    canvas.setAttribute('height', (style_height * dpi).toString());
    canvas.setAttribute('width', (style_width * dpi).toString());
/*
    var scaleX = window.innerWidth / canvas.width;
    var scaleY = window.innerHeight / canvas.height;

    var scaleToFit = Math.min(scaleX, scaleY);

    canvas.style.transformOrigin = '0 0'; //scale from top left
    canvas.style.transform = 'scale(' + scaleToFit + ')';
 */
}


