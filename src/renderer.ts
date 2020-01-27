import { Unit, UnitRole, Model } from "./unit.js";
import { Weapon } from "./weapon.js";

export enum Justification {
    Left,
    Right,
    Center
};

export class Renderer {

    readonly _res: number = 144;
    readonly _margin: number = 70;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxX: number = 0;
    private _maxY: number = 0;

    private _octagon: HTMLImageElement|null = null;

    private _roles: Map<UnitRole, HTMLImageElement|null> = new Map();

    constructor() {

        this._octagon = document.getElementById('octagon') as HTMLImageElement;

        this._roles.set(UnitRole['HQ'], document.getElementById('role_hq') as HTMLImageElement);
        this._roles.set(UnitRole['Troops'], document.getElementById('role_tr') as HTMLImageElement);
        this._roles.set(UnitRole['Elites'], document.getElementById('role_el') as HTMLImageElement);
        this._roles.set(UnitRole['Fast Attack'], document.getElementById('role_fa') as HTMLImageElement);
        this._roles.set(UnitRole['Heavy Support'], document.getElementById('role_hs') as HTMLImageElement);
        this._roles.set(UnitRole['Flyer'], document.getElementById('role_fl') as HTMLImageElement);
        this._roles.set(UnitRole['Dedicated Transport'], document.getElementById('role_dt') as HTMLImageElement);
        this._roles.set(UnitRole['Fortification'], document.getElementById('role_ft') as HTMLImageElement);
        this._roles.set(UnitRole['Lord of War'], document.getElementById('role_lw') as HTMLImageElement);
    }
    
    private renderBorder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, y, w, h);
    }

    private renderWatermark(ctx: CanvasRenderingContext2D) {

    }

    private renderText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number, how: Justification): void {
        if (ctx && text.length) {
            ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
            let measure = ctx.measureText(text);
            const tw = measure.width;
            const th = measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;

            if (how == Justification.Center) {
                ctx.fillText(text, x + (w-tw)/2, y + (h-th)/2);
            }
            else if (how == Justification.Left) {
                ctx.fillText(text, x, y + (h-th)/2);                
            }
            else if (how == Justification.Right) {
                ctx.fillText(text, x + w - tw, y + (h-th)/2);                
            }
        }
    }

    private renderParagraph(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number): number {
        let curY: number = y;
        if (ctx && text.length) {
            let lines: string[] = [];
            let currentLine: string[] = [];
            ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
            let length = 0;
            const spaceWidth = ctx.measureText(" ").width;
            const heightMeasure = ctx.measureText(text);
            const th = (heightMeasure.actualBoundingBoxDescent - heightMeasure.actualBoundingBoxAscent) * 1.2;

            text.split(" ").forEach(function(word) {
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

    private renderLine(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
            ctx.moveTo(this._currentX, this._currentY);
            ctx.lineTo(this._maxX, this._currentY);
        ctx.stroke();
        this._currentY += 2;
    }

    private renderTableHeader(ctx: CanvasRenderingContext2D, labels: string[], columnWidths: number[]|null) {
        let x      = this._currentX;
        const height = 22;
        const width = this._maxX;
        ctx.fillStyle = '#AAAAAA';
        ctx.fillRect(this._currentX, this._currentY, width, height);

        ctx.fillStyle = 'black';
        ctx.font = '14px sans-serif';
        var w = 50;
        if (labels) {
            ctx.font = '12px sans-serif';
            for (let i = 0; i < labels.length; i++) {
                if (columnWidths) w = columnWidths[i];
                this.renderText(ctx, labels[i], x, this._currentY, w, height, Justification.Center);
                x += w;
            }
        }

        this._currentY += height;
    }

    private renderWeapons(ctx: CanvasRenderingContext2D, weapons: Weapon[], columnWidths: number[]|null): void {
        ctx.font = '12px sans-serif';

        const height = 22;

        let i = 0; 
        let w = 50;
        for (let weapon of weapons) {

            let ci = 0;
            let x = this._currentX;

            if (i % 2) ctx.fillStyle = '#eeeeee';
            else ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, this._currentY, this._maxX, height);
            i++;

            ctx.fillStyle = 'black'
            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._name.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._range.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._type.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._str.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._ap.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            this.renderText(ctx, weapon._damage.toString(), x, this._currentY, w, height, Justification.Center);
            x += w;

            if (columnWidths) w = columnWidths[ci++];
            for (let ab of weapon._abilities) {
                this.renderText(ctx, ab[0] + ' ' + ab[1], x, this._currentY, w, height, Justification.Center);
            }
            x += w;

            this._currentY += height;
        }
    }

    private renderModel(ctx: CanvasRenderingContext2D, model: Model, columnWidths: number[]|null, bg: number): void {
 
        const height = 22;

        let w = 50;
        let x = this._currentX;
        let ci = 0;

        if (bg % 2) ctx.fillStyle = '#eeeeee';
        else ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, this._currentY, this._maxX, height);

        ctx.fillStyle = 'black'
        ctx.font = '12px sans-serif';

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._name.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._move.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._ws.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._bs.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._str.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._toughness.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._wounds.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._attacks.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._leadership.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        if (columnWidths) w = columnWidths[ci++];
        this.renderText(ctx, model._save.toString(), x, this._currentY, w, height, Justification.Center);
        x += w;

        this._currentY += height;
    

    }

    private renderAbilities(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = '16px sans-serif';
        this.renderText(ctx, "ABILITIES", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font ='12px serif';
        for (let ab of unit._abilities) {
            const content = ab[0].toUpperCase();
            const desc = ab[1];
            this._currentY = this.renderParagraph(ctx, content+": "+desc, this._currentX + 190, this._currentY, 500);
        }
        this._currentY += 4;
    }

    private renderKeywords(ctx: CanvasRenderingContext2D, unit: Unit): void {
        ctx.font = '16px sans-serif';
        this.renderText(ctx, "KEYWORDS", this._currentX + 20, this._currentY, 100, 16, Justification.Left);

        ctx.font ='12px serif';
        const kw = unit._keywords.join(", ").toLocaleUpperCase();
        this._currentY = this.renderParagraph(ctx, kw, this._currentX + 190, this._currentY, 500);
        
        this._currentY += 4;
    }

    render(unit: Unit, canvas: HTMLCanvasElement, xOffset: number, yOffset: number): number[] {

        let ctx = canvas.getContext('2d');
        if (!ctx) {
            return [0, 0];
        }

        this._maxX = canvas.width;
        this._maxY = canvas.clientHeight;

        this._currentX = xOffset + this._margin;
        this._currentY = yOffset + this._margin;
    
        ctx.fillStyle = '#EEEEEE';
        ctx.fillRect(this._currentX, this._currentY, this._maxX, this._maxY);

        this.renderHeader(unit, ctx);

        ctx.fillStyle = '#000000';

        let weapons: Weapon[] = [];

        const unitLabels = ["UNIT", "M", "WS", "BS", "S", "T", "W", "A", "LD", "SAVE"];
        const unitLabelWidths = [200, 50, 50, 50, 50, 50, 50, 50, 50, 50];
        this.renderTableHeader(ctx, unitLabels, unitLabelWidths);
        let i = 0;
        for (var model of unit._models) {
            this.renderModel(ctx, model, unitLabelWidths, i%2);
            i++;
            for (let weapon of model._weapons) {
                weapons.push(weapon);
            }
        }


        const weaponLabels = ["WEAPONS", "RANGE", "TYPE", "S", "AP", "D", "ABILITIES"];
        const weaponLabelWidth = [200, 50, 100, 50, 50, 50, 200];
        this.renderTableHeader(ctx, weaponLabels, weaponLabelWidth);
        this.renderWeapons(ctx, weapons, weaponLabelWidth);

        if (unit._abilities.size > 0) {
            this.renderLine(ctx);
            this.renderAbilities(ctx, unit);
        }

        if (unit._keywords.length > 0) {
            this.renderLine(ctx);
            this.renderKeywords(ctx, unit);
        }
/*
        # wizard statlines:
        if(count($unit['powers']) > 0) {
            $needs_smite = true;
            foreach($unit['powers'] as $power) {
                if($power['Psychic Power'] == 'Smite') { $needs_smite = false; }
            }
            if($needs_smite) {
                array_unshift($unit['powers'], array(
                    'Psychic Power' => 'Smite',
                    'Warp Charge'   => 5,
                    'Range'         => '18"',
                    'Details'       => 'If manifested, the closest visible enemy unit within 18" of the psyker suffers D3 mortal wounds. If the result of the Psychic test was more than 10, the target suffers D6 mortal wounds instead.'
                ));
            }
            this.renderLine();
            this.renderTable($unit['powers']);
        }

        # wound tracker:
        $hasTracks = false;
        foreach($unit['model_stat'] as $type) {
            if($type['W'] > 1) { $hasTracks = true; }
        }
        if($hasTracks) {
            this.renderLine();
            this._currentY += 5;
            this.renderWoundBoxes($unit);
        }

        if(count($unit['wound_track']) > 0) {
            this.renderLine();
            this.renderTable($unit['wound_track']);
        }

        if(count($unit['explode_table']) > 0) {
            this.renderLine();
            this.renderTable($unit['explode_table']);
        }

*/
        const totalHeight = this._currentY - (yOffset + this._margin);
        const totalWidth = this._maxX - this._currentX - 1;
        this.renderBorder(ctx, this._currentX, yOffset + this._margin, totalWidth, totalHeight);
        this.renderWatermark(ctx);

        return [this._currentX, this._currentY];
    }

    private renderHeader(unit: Unit, ctx: CanvasRenderingContext2D): void {

        ctx.globalAlpha = 1;
        ctx.fillStyle = '#000000';
    
        const xStart = this._currentX;
        const xEnd = this._maxX;
        const yStart = this._currentY;
        const titleHeight = 36;
        const yEnd = yStart + titleHeight;
        const bevelSize = 15;

        ctx.beginPath();
            ctx.moveTo(xStart, yStart + bevelSize);
            ctx.lineTo(xStart, yEnd);
            ctx.lineTo(xEnd, yEnd);
            ctx.lineTo(xEnd, yStart + bevelSize);
            ctx.lineTo(xEnd - bevelSize, yStart);
            ctx.lineTo(xStart + bevelSize, yStart);
            ctx.closePath();
        ctx.fill();

        if (this._octagon) {
            let imgX = xStart + 6;

            // Unit battlefield role icon
            ctx.drawImage(this._octagon, imgX, yStart+2, 32, 32);
            const roleImg = this._roles.get(unit._role);
            if (roleImg) {
                ctx.drawImage(roleImg, imgX + 4, yStart+2 + 4, 24, 24);
            }

            ctx.fillStyle = 'white';
            ctx.font = "18px serif";
            // Power level icon
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart+2, 32, 32);
            this.renderText(ctx, unit._powerLevel.toString(), imgX, yStart+2, 32, 32, Justification.Center);

            // Points icon
            imgX += 34;
            ctx.drawImage(this._octagon, imgX, yStart+2, 32, 32);
            this.renderText(ctx, unit._points.toString(), imgX, yStart+2, 32, 32, Justification.Center);
        }

        // unit name
        let iters: number = 0;
        let title_size = 28;
        const title_x = this._currentX + 120;
        ctx.font = title_size + 'px ' + 'bold serif';
        const unitName = unit._name.toLocaleUpperCase();
        let check = ctx.measureText(unitName);
        const maxWidth = this._maxX - this._currentX - title_x;
        while (iters < 6 && check.width > maxWidth) {
            iters += 1;
            title_size -= 2;
            ctx.font = title_size + 'px ' + 'bold serif';
            check = ctx.measureText(unitName);
        }
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top'; // Make the text origin at the upper-left to make positioning easier
        this.renderText(ctx, unitName, title_x, yStart, maxWidth, titleHeight, Justification.Center);

        this._currentY += titleHeight;
    }

};