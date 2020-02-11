export class RendererKT {
    constructor(roster) {
        this._roster = null;
        this._currentX = 0;
        this._currentY = 0;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._roster = roster;
    }
    render(title, list, forces) {
        if (this._roster == null)
            return;
    }
}
RendererKT._res = 144;
RendererKT._margin = 0;
RendererKT._ktColor = '#B23A07';
