import Leaf from "./leaf";
import Branch from "./branch";

export default class Tree {

    private leaves: Leaf[]
    private numberOfLeaves: number;
    private branches: Branch[];
    private root: Branch[];
    private maxDistance: number;
    private minDistance: number
    private image: p5.Image;
    private startVector: p5.Vector;

    constructor(
        leafAmount: number, 
        maxDistance: number,
        minDistance: number,
        image: p5.Image
    ) {
        this.createEmptyBranchesArray();
        this.numberOfLeaves = leafAmount;
        this.maxDistance = maxDistance;
        this.minDistance = minDistance;
        this.setLeafsToEmptyArray();
        this.generateLeafs();
    }

    public setStartVector(vector: p5.Vector): void {
        console.log('Calling get start vector!!!', vector);
        this.startVector = vector;
        this.createTreeRoot();
        this.growRoot();
    }   

    private createEmptyBranchesArray(): void {
        this.branches = [];
    }

    private createTreeRoot(): void {
        this.root = [];
        console.log('This is ', this.startVector);
        if(this.startVector){
            this.root.push(new Branch(this.startVector.copy(), null, createVector(0, -1)));
            this.root.push( new Branch(this.startVector.copy(), null, createVector(0, 1)))
            this.root.push(new Branch(this.startVector.copy(), null, createVector(1, 0)))
            this.root.push(new Branch(this.startVector.copy(), null, createVector(-1, 0)))
        }

        this.root.forEach((root: Branch) => {
            this.branches.push(root);
        })
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
        this.root.forEach((root) => {
            let found = false
            let currentBranch = root;
            while(!found){
                console.log('Leaves are ', this.leaves);
                this.leaves.map((leaf) => {
                    if(this.checkMaxDistance(root.getPosition().dist(leaf.getPosition()))){
                        found = true
                    }
                })
                if(!found) {
                    this.branches.push(currentBranch.next())
                }
            }
        })
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
