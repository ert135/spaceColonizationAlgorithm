import Leaf from "./leaf";
import Branch from "./branch";

export default class Tree {
    private leaves: Leaf[]
    private numberOfLeaves: number;
    private branches: Branch[];
    private root: Branch;

    constructor(leafAmount: number, rootVector: p5.Vector) {
        this.numberOfLeaves = leafAmount;
        this.setLeafsToEmptyArray();
        this.generateLeafs();
        this.createTreeRoot(rootVector);
        this.createEmptyBranchesArray();
        this.pushRoot();
    }

    private pushRoot(): void {
        this.branches.push(this.root);
    }

    private createEmptyBranchesArray(): void {
        this.branches = [];
    }

    private createTreeRoot(rootPositionVector: p5.Vector): void {
        this.root = new Branch(rootPositionVector, null, createVector(0,-1))
    }

    private setLeafsToEmptyArray(): void {
        this.leaves = [];
    }

    private generateLeafs(): void {
        for (var i = 0; i < this.numberOfLeaves; i++) {
            this.leaves.push(new Leaf());
        }
    }

    public drawLeaves(): void {
        this.leaves.map((leaf: Leaf) => {
            leaf.draw()
        })
    }
}
