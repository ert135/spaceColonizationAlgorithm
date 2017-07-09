

export default class Branch {

    private position: p5.Vector;
    private parent: any;
    private direction: p5.Vector;
    private count: number;
    private originalDirection: p5.Vector;
    private length: number
    private parentPositionX: number;
    private parentpositionY: number;

    constructor(position: p5.Vector, lastPositionX: number, lastPositionY: number, direction: p5.Vector) {
        this.position = position.copy();

        this.direction = direction;
        this.originalDirection = direction.copy();
        this.count = 0;
        this.length = 2;
        this.parentPositionX = lastPositionX;
        this.parentpositionY = lastPositionY;
    }

    public getDirection(): p5.Vector {
        return this.direction;
    }

    public incrementCount(): void {
        this.count++;
    }

    public drawBranch(): void {
            stroke(204, 102, 0);
            line(this.getPosition().copy().x, this.getPosition().copy().y, this.getPosition().copy().x, this.getPosition().copy().y)
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

    public next(oldPositionTest: p5.Vector): Branch {
        let oldPosition = oldPositionTest;
        var nextDir = this.direction.copy().mult(this.length);
        var nextPos = this.position.add(nextDir).copy();
        return new Branch(nextPos, oldPosition.copy().x, oldPosition.copy().y, this.direction.copy());
    }
}
