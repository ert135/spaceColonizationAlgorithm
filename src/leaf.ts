///<reference path='../p5-global-mode.d.ts'/>

export default class Leaf {
    private position: p5.Vector;
    private reached: boolean;

    constructor() {
        //TODO change to pass in values, plan to add functionality to draw tree in future so need a way to constrain drawing area
        this.position = createVector(random(0, 800), random(0, 600))
        this.reached = false;
    }

    public draw() {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, 3, 3)
    }

    public getPosition(): p5.Vector {
        return this.position.copy();
    }

    public setReached(): void {
        this.reached = true
    }

    public getReached(): boolean {
        return this.reached;
    }
    
}
