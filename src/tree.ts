import Leaf from "./leaf";

export default class Tree {
    private leaves: Leaf[]
    private numberOfLeaves: number;

    constructor(leafAmount: number) {
        this.numberOfLeaves = leafAmount;
        this.setLeafsToEmptyArray();
        this.generateLeafs();
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
