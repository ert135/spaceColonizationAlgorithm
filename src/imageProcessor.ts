///<reference path='../p5-global-mode.d.ts'/>
import Leaf from "./leaf"

export default class imageProcessor {
    private sourceImage: p5.Image;
    private destinationImage: p5.Image;
    private reached: boolean;
    //horrible typescript hack
    private threshold: number | any;

    constructor(preloadedImage: p5.Image) {
        //TODO change to pass in values, plan to add functionality to draw tree in future so need a way to constrain drawing area

        //Set threashhold for image processing
        this.threshold = 60;
        this.sourceImage = preloadedImage;
        this.loadImages();
        this.loadPixels();
        this.processImage();
    }

    private loadImages(): void {
        this.destinationImage = createImage(this.sourceImage.width, this.sourceImage.height);
    }

    private loadPixels(): void {
        this.sourceImage.loadPixels();
        this.destinationImage.loadPixels();
    }

    private processImage(): void {
        for (var x = 0; x < this.sourceImage.width; x++) {
            for (var y = 0; y < this.sourceImage.height; y++ ) {
                var location = (x + y * this.sourceImage.width)*4;
                var r = this.sourceImage.pixels[location+0];
                var g = this.sourceImage.pixels[location+1];
                var b = this.sourceImage.pixels[location+2];
                var a = this.sourceImage.pixels[location+3];
                var col = color(r,g,b,a)
                // Test the brightness against the threshold
                //console.log(color(this.sourceImage.pixels[location]));
                if (brightness(col) > this.threshold) {
                    this.destinationImage.set(x,y, [255, 255, 255, 255]);  // White
                }  else {
                    this.destinationImage.set(x,y, [0, 0, 0, 255]);  // Black
                }
            }
        }

        this.destinationImage.updatePixels();
        image(this.destinationImage, 0, 0);
    }

    public drawImage(): void {
        image(this.destinationImage, 0, 0);
    }

    public getColorAtPosition(position: p5.Vector): boolean {

        let blackArray = JSON.stringify([0,0,0,255]);
        let whiteArray = JSON.stringify([255,255,255,255]);

        if(JSON.stringify(this.destinationImage.get(position.x, position.y)) === blackArray){
            return true;
        }

        if(JSON.stringify(this.destinationImage.get(position.x, position.y)) === whiteArray){
            console.log('Whiate array true!!!');
            return false;
        }

    }
    
}
