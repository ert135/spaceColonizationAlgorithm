//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Tree from "./tree";

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window { 
        setup: any;
        draw: any;
    }
}

var tree: Tree
var max_distance = 10;
var min_distance = 10;

let setup = function() {
    createCanvas(800, 800);
    tree = new Tree(500, createVector(width/2, 800), max_distance, min_distance);
}


let draw = function() {
    background(51);
    tree.draw();
}

window.setup = setup;
window.draw = draw;
