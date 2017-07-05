export default class Branch {
    private position: p5.Vector;
    private parent: Branch;
    private direction: p5.Vector;
    private count: number;
    private originalDirection: p5.Vector;
    private length: number

    constructor(position: p5.Vector, parent: Branch, direction: p5.Vector) {
        this.position = position;
        this.parent = parent;
        this.direction = direction;
        this.originalDirection = direction.copy();
        this.count = 0;
        this.length = 5;
    }

    private getNextPosition(): p5.Vector {
        return this.position.add(0, -1).copy()
    }

    public getDirection(): p5.Vector {
        return this.direction;
    }

    public incrementCount(): void {
        this.count++;
    }

    public drawBranch(): void {
        if(this.parent != null){
            stroke(204, 102, 0);
            line(this.position.x, this.position.y, this.parent.getPosition().x, this.parent.getPosition().y)
        }
    }

    public getPosition(): p5.Vector {
        return this.position;
    }

    public getNextBranch(): any {
        return new Branch(this.getNextPosition(), this, this.direction.copy())
    }

    public getCount(): number {
        return this.count;
    }

    public resetCount(): void {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    public next(): Branch {
        var nextDir = this.direction.mult(5);
        var nextPos = this.position.add(nextDir).copy()
        return new Branch(nextPos, this, this.direction.copy());
    }
}
