export default class Branch {
    private position: p5.Vector;
    private parent: Branch;
    private direction: p5.Vector;

    constructor(position: p5.Vector, parent: Branch, direction: p5.Vector) {
        this.position = position;
        this.parent = parent;
        this.direction = direction;
    }

    public drawBranch() {
        console.log('Drawing branch')
    }

    public getPosition(): p5.Vector {
        return this.position;
    }
}
