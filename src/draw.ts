//import typescirpt types. 
///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Tree from "./tree";
import Branch from "./branch";

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window { 
        setup: any;
        draw: any;
    }
}
var tree : Tree
let setup = function() {
    createCanvas(800, 800);
    tree = new Tree(200);
}

let draw = function() {
    background(51);
    tree.drawLeaves();
}
window.setup = setup;
window.draw = draw;
