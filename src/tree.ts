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
        this.growRoot();
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

    public growRoot(): void {
        let found = false
        let currentBranch = this.root;

        while(!found){
            this.leaves.map((leaf) => {
                if(this.checkMaxDistance(this.root.getPosition().dist(leaf.getPosition()))){
                    found = true
                }
            })
            if(!found) {
                this.branches.push(currentBranch.next())
            }
        }
    }

    public growBranches(): void {

        for (var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var record = this.maxDistance;

            for (var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var d = leaf.getPosition().dist(branch.getPosition().copy());
                if (d < this.minDistance) {
                    leaf.setReached();
                    closestBranch = null;
                    break;
                } 
                else if (d < record) {
                    closestBranch = branch;
                    record = d;
                }
            }

            if (closestBranch != null) {
                console.log('branch found')
                var newDirection = leaf.getPosition().sub(closestBranch.getPosition().copy());
                newDirection.normalize();
                closestBranch.getDirection().add(newDirection.copy()); 
                closestBranch.incrementCount();
            }
        }

        for (var i = this.leaves.length - 1; i >= 0; i--) {
            if (this.leaves[i].getReached()) {
                this.leaves.splice(i, 1);
            }
        }

        for (var i = this.branches.length - 1; i >= 0; i--) {
            var branch = this.branches[i];
            if (branch.getCount() > 0) {
                branch.getDirection().div(branch.getCount() + 1);
                this.branches.push(branch.next());
                branch.reset();
            }
        }

    }

}
