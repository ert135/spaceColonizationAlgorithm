export default class Branch {
    private position: p5.Vector;
    private parent: Branch;
    private direction: p5.Vector;

    constructor(position: p5.Vector, parent: Branch, direction: p5.Vector) {
        this.position = position;
        this.parent = parent;
        this.direction = direction;
    }

    private doesParentBranchExist(): boolean {
        return this.parent != null ? true : false
    }

    private getNextPosition(): p5.Vector {
        console.log(this.position.add(this.direction))
        return this.position.add(this.direction)
    }

    public drawBranch(): void {
        if(this.parent != null){
            stroke(255)
            line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y)
        }
    }

    public getPosition(): p5.Vector {
        return this.position;
    }

    public getNextBranch(): Branch {
        return new Branch(this.getNextPosition(), this, this.direction.copy())
    }
}