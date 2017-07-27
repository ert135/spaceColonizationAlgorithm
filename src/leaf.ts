///<reference path='../p5-global-mode.d.ts'/>

export default class Leaf {
    private position: p5.Vector;
    private reached: boolean;
    private image: p5.Image;

    constructor(image: p5.Image) {
        //TODO change to pass in values, plan to add functionality to draw tree in future so need a way to constrain drawing area
        this.position = this.getBlackPosition()
        this.reached = false;
        this.image = image;
    }

    private getBlackPosition(): p5.Vector {

        return createVector(0,0);
    }

    public draw() {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, 1, 1)
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
