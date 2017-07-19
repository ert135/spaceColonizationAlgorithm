

export default class Branch {

    private position: p5.Vector;
    private parent: any;
    private direction: p5.Vector;
    private count: number;
    private originalDirection: p5.Vector;
    private length: number
    private parentPositionX: number;
    private parentpositionY: number;
    private lastPosition: p5.Vector;
    private static debugArray: any;

    constructor(position: p5.Vector, lastPosition: p5.Vector, direction: p5.Vector) {
        this.position = position.copy();

        if(lastPosition) {
            this.lastPosition = lastPosition.copy();
        }

        this.direction = direction.copy();
        this.originalDirection = direction.copy();
        this.count = 0;
        this.length = 5;
    }

    public getDirection(): p5.Vector {
        return this.direction;
    }

    public incrementCount(): void {
        this.count++;
    }

    public drawBranch(): void {
        stroke(204, 102, 0);
        if(this.lastPosition && (this.getPosition().copy().sub(this.lastPosition.copy()).mag() < 6)){
            line(
                this.getPosition().copy().x, 
                this.getPosition().copy().y, 
                this.lastPosition.copy().x, 
                this.lastPosition.copy().y 
            );
        }
    }

    public getPosition(): p5.Vector {
        return this.position;
    }

    public getCount(): number {
        return this.count;
    }

    public reset(): void {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    public setPreviousPosition(position: p5.Vector): void {
        this.lastPosition = position.copy()
                ellipse(this.lastPosition.copy().x, this.lastPosition.copy().y, 10, 10)
    }

    public setParent(parent: Branch) {
        this.parent = parent;
    }

    public next(): Branch {
        var prevPos = this.position.copy();
        //Branch.debugArray.push(ellipse(prevPos.copy().x, prevPos.copy().y, 10, 10))
        //ellipse(prevPos.copy().x, prevPos.copy().y, 10, 10)
        var nextDir = this.direction.copy().mult(this.length);
        var nextPos = this.position.add(nextDir).copy();
        let branch = new Branch(nextPos, prevPos, this.direction.copy());
        if(prevPos){
            branch.setPreviousPosition(prevPos);
        }
        branch.setParent(this)
        return branch
    }
}
