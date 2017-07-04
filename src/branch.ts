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
        return this.position.add(0, -1).copy()
    }

    public drawBranch(): void {
        if(this.parent != null){
            stroke(204, 102, 0);
            line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y)
        }
    }

    public getPosition(): p5.Vector {
        return this.position;
    }

    public getNextBranch(): any {
        console.log('new branch is', new Branch(this.getNextPosition(), this, this.direction.copy()))
        return new Branch(this.getNextPosition(), this, this.direction.copy())
    }
}