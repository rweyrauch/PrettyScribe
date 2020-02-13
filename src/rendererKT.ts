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