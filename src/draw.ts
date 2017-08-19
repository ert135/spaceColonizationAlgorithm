//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Tree from "./tree";
import imageProcessor from "./imageProcessor";

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window { 
        setup: any;
        draw: any;
        mousePressed: any;
        mouseReleased: any;
        preload: any;
        mouseClicked: any;
    }
}

let tree: Tree
let max_distance = 100;
let min_distance = 10;
let pressed = false
let image: imageProcessor;
let sourceImage: p5.Image;
let startVector: p5.Vector;
let numberOfLeaves = 1000;

let preload = function() {
    sourceImage = loadImage("./image.jpg");
}

let setup = function() {
    createCanvas(800, 800);
    image = new imageProcessor(sourceImage);
    tree = new Tree(numberOfLeaves, max_distance, min_distance, sourceImage, image);
}

let draw = function() {
    //background(51);
    image.drawImage();
    if(pressed){
        tree.draw();
        tree.growBranches();
    }
}

let mouseClicked = function() {
    pressed = true
    startVector = createVector(mouseX, mouseY);
    tree.setStartVector(startVector);
    console.log('Mouse calicked¬¬!¬', mouseX, mouseY);
    console.log('Tree is ', tree);
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
