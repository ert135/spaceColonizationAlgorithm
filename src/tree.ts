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
        this.createTreeRoot(rootVector);
        this.numberOfLeaves = leafAmount;
        this.maxDistance = maxDistance;
        this.minDistance = minDistance;
        this.setLeafsToEmptyArray();
        this.generateLeafs();
        this.growRoot();
    }

    private createEmptyBranchesArray(): void {
        this.branches = [];
    }

    private createTreeRoot(rootPositionVector: p5.Vector): void {
        this.root = new Branch(rootPositionVector.copy(), rootPositionVector.copy().x, rootPositionVector.copy().y, createVector(0, -1));
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
        this.leaves.forEach((leaf: Leaf) => {
            leaf.draw();
        })
    }

    private drawBranches(): void {
        this.branches.forEach((branch) => {
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
                var d = leaf.getPosition().dist(branch.getPosition());
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
                var newDirection = leaf.getPosition().sub(closestBranch.getPosition().copy());
                newDirection.normalize();
                closestBranch.getDirection().add(newDirection.copy()); 
                closestBranch.incrementCount();
            }
        }

        this.leaves = this.leaves.filter((leaf) => {
            return !leaf.getReached();
        })

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
