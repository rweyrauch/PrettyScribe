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

import { Unit, UnitRole, UnitRoleToString, Model, PsychicPower, Explosion, Weapon, Roster40k } from "./roster40k";
import { Renderer, Justification, RenderText, RenderParagraph} from "./renderer";

export class RendererKT implements Renderer {

    public static readonly _res: number = 144;
    public static readonly _margin: number = 0;

    private static readonly _ktColor = '#B23A07';

    private _roster: Roster40k|null = null;

    private _currentX: number = 0;
    private _currentY: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    constructor(roster: Roster40k) {
        this._roster = roster;
    }

    render(title: HTMLElement|null, list: HTMLElement|null, forces: HTMLElement|null): void {

        if (this._roster == null) return;

    }
}