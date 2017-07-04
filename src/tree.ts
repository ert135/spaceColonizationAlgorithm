import Leaf from "./leaf";
import Branch from "./branch";

export default class Tree {

    private leaves: Leaf[]
    private numberOfLeaves: number;
    private branches: Branch[];
    private root: Branch;
    private maxDistance: number;
    private minDistance: number

    constructor(
        leafAmount: number, 
        rootVector: p5.Vector,
        maxDistance: number,
        minDistance: number
    ) {
        this.createEmptyBranchesArray();
        this.numberOfLeaves = leafAmount;
        this.maxDistance = maxDistance;
        this.minDistance = minDistance;
        this.setLeafsToEmptyArray();
        this.generateLeafs();
        this.createTreeRoot(rootVector);
        this.growTree();
    }

    private createEmptyBranchesArray(): void {
        this.branches = [];
    }

    private createTreeRoot(rootPositionVector: p5.Vector): void {
        this.root = new Branch(rootPositionVector, null, createVector(0, -1));
        this.branches.push(this.root);
    }

    private setLeafsToEmptyArray(): void {
        this.leaves = [];
    }

    private generateLeafs(): void {
        for (var i = 0; i < this.numberOfLeaves; i++) {
            this.leaves.push(new Leaf());
        }
    }

    private checkMaxDistance(distance: number): boolean {
        return distance < this.maxDistance ? true : false;
    }

    private checkMinDistance(distance: number): boolean {
        return distance > this.minDistance ? true : false;
    }

    private foundLeaf(): boolean {
        return true;
    }

    private drawLeaves(): void {
        this.leaves.map((leaf: Leaf) => {
            leaf.draw();
        })
    }

    private drawBranches(): void {
        this.branches.map((branch) => {
            branch.drawBranch();
        })
    }

    public draw(): void {
        this.drawLeaves();
        this.drawBranches();
    }

    public growTree(): void {
        let found = false
        let currentBranch = this.root;

        while(!found){
            console.log()
            this.leaves.map((leaf) => {
                if(this.checkMaxDistance(this.root.getPosition().dist(leaf.getPosition()))){
                    console.log('condition true!!!')
                    found = true
                }
            })
            if(!found) {
                this.branches.push(currentBranch.getNextBranch())
            }
        }

        console.log("found is now", found);
        console.log(this.branches);
    }
}
