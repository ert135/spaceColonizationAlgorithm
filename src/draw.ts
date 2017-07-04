// import p5 from "../node_modules/p5/lib/p5"
// import p5 from "../../typings/p5";

///<reference path='../p5-global-mode.d.ts'/>

//import modules
import Tree from "./tree";
import Branch from "./branch";
import Leaf from "./leaf";

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window { 
        setup: any;
        draw: any;
    }
}

let draw = function() {
    ellipse(50, 50, 80, 80);
}

let setup = function() {
    let leaf = new Leaf();
    leaf.drawLeaf();
}

window.setup = setup;
window.draw = draw;
