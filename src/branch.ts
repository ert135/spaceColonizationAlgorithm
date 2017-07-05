

export default class Branch {

    private position: p5.Vector;
    private parent: any;
    private direction: p5.Vector;
    private count: number;
    private originalDirection: p5.Vector;
    private length: number
    private parentPositionX: number;
    private parentpositionY: number;

    constructor(position: p5.Vector, parent: Branch, direction: p5.Vector) {
        this.position = position;
        var newObj = {...parent};
        this.parent = newObj;
        this.direction = direction;
        this.originalDirection = direction.copy();
        this.count = 0;
        this.length = 5;
        if(parent){
            this.parentPositionX = parent.position.x;
            this.parentpositionY = parent.position.y;
        }
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
        if(this.parent != null && this.parentPositionX !=null && this.parentpositionY != null) {
            stroke(204, 102, 0);
            line(this.position.x, this.position.y,  this.parentPositionX,  this.parentpositionY)
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
        var nextDir = this.direction.copy().mult(this.length);
        var nextPos = this.position.add(nextDir).copy();
        return new Branch(nextPos, this, this.direction.copy());
    }
}
