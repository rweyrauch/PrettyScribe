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

import {Compare} from "./roster40k";
import {Unit} from "./roster";

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

export abstract class AbstractRenderer implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    protected static readonly _bevelSize = 15;
    protected readonly _descriptionStartX = 140;
    protected _descriptionWidth: number = 600;

    protected _currentX: number = 0;
    protected _currentY: number = 0;
    protected _maxWidth: number = 0;
    protected _maxHeight: number = 0;
    
    protected static readonly _blackColor = '#1d272a';
    protected static readonly _grey = '#b3bbb5';
    protected static readonly _fillColor = '#f6f6f6';
    protected static readonly _offset: number = 20;
    protected static readonly _titleFont = 'bold 14px sans-serif';
    protected static readonly _headerFont = 'bold 14px sans-serif';
    protected static readonly _font = '14px sans-serif';
    protected static readonly _boldFont = 'bold 14px sans-serif';

    abstract render(title: HTMLElement | null, list: HTMLElement | null, forces: HTMLElement | null): void;

    private drawBorderLines(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.beginPath();
        ctx.moveTo(x, y + AbstractRenderer._bevelSize);
        ctx.lineTo(x, y + h - AbstractRenderer._bevelSize);
        ctx.lineTo(x + AbstractRenderer._bevelSize, y + h);
        ctx.lineTo(x + w - AbstractRenderer._bevelSize, y + h);
        ctx.lineTo(x + w, y + h - AbstractRenderer._bevelSize);
        ctx.lineTo(x + w, y + AbstractRenderer._bevelSize);
        ctx.lineTo(x + w - AbstractRenderer._bevelSize, y);
        ctx.lineTo(x + AbstractRenderer._bevelSize, y);
        ctx.closePath();
    }

    protected renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = AbstractRenderer._blackColor;

        this.drawBorderLines(ctx, x, y, w,h);
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = AbstractRenderer._fillColor;
        ctx.globalCompositeOperation = "destination-over";
        this.drawBorderLines(ctx, x, y, w,h);
        ctx.fill();

        ctx.restore();
    }

    protected renderWatermark(ctx: CanvasRenderingContext2D) {

    }

    protected renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = AbstractRenderer._blackColor;
        ctx.beginPath();
        ctx.moveTo(this._currentX, this._currentY);
        ctx.lineTo(this._currentX + this._maxWidth, this._currentY);
        ctx.stroke();
        this._currentY += 1;
    }

    protected renderTableHeader(ctx: CanvasRenderingContext2D, labels: string[], columnWidths: number[] | null) {
        let x = this._currentX;
        const height = 22;
        const width = this._maxWidth;
        ctx.fillStyle = AbstractRenderer._grey;
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = AbstractRenderer._blackColor;
        ctx.font = AbstractRenderer._titleFont;
        var w = 50;
        if (labels) {
            ctx.font = AbstractRenderer._headerFont;
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                if (i == 0) RenderText(ctx, labels[i], x + AbstractRenderer._offset, this._currentY, w, height, Justification.Left);
                else RenderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }

        this._currentY += height;
    }

    protected renderKeywords(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = AbstractRenderer._titleFont;
        RenderText(ctx, "KEYWORDS", this._currentX + AbstractRenderer._offset, this._currentY, 100, 16, Justification.Left);

        ctx.font = AbstractRenderer._font;
        const kwlist = [...unit._keywords];
        kwlist.sort(Compare)
        const kw = kwlist.join(", ").toLocaleUpperCase();
        this._currentY += 2;
        this._currentY = RenderParagraph(ctx, kw, this._currentX + this._descriptionStartX, this._currentY, this._descriptionWidth - AbstractRenderer._offset, 0);
        this._currentY += 2;
    }

    protected abstract renderUnit(unit: Unit, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[];

    protected abstract renderUnitCost(unit: Unit, ctx: CanvasRenderingContext2D, imgX: number, yStart: number): void;

    protected renderHeaderPath(ctx: CanvasRenderingContext2D, xStart: number,  xEnd: number, yStart: number,  yEnd: number) {
        ctx.beginPath();
        ctx.moveTo(xStart, yStart + AbstractRenderer._bevelSize);
        ctx.lineTo(xStart, yEnd);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(xEnd, yStart + AbstractRenderer._bevelSize);
        ctx.lineTo(xEnd - AbstractRenderer._bevelSize, yStart);
        ctx.lineTo(xStart + AbstractRenderer._bevelSize, yStart);
        ctx.closePath();
        ctx.fill();
    }

    protected renderHeader(unit: Unit, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = AbstractRenderer._blackColor;

        const xStart = this._currentX;
        const xEnd = this._currentX + this._maxWidth;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;

        this.renderHeaderPath(ctx, xStart, xEnd, yStart, yEnd);

        let imgX = xStart + 6;
        
        this.renderUnitCost(unit, ctx, imgX, yStart);

        // unit name
        let iters: number = 0;
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
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
        RenderText(ctx, unitName, title_x, yStart, maxWidth, titleHeight, Justification.Center);

        this._currentY += titleHeight;
    }
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


