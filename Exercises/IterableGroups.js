class Group {
    constructor() {
        this.members = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.members.push(value);
        }
    }

    delete(value) {
        return this.members = this.members.filter(v => v !== value);
    }

    has(value) {
        return this.members.includes(value);
    }

    static from(collection) {
        let group = new Group();

        for (let value of collection) {
            group.add(value);
        }
        return group;
    }

    //This makes the class an iterable class.
    //but you need to create an iterator interface to do it
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.position = 0;
    }

    next() {
        if (this.position >= this.group.members.length) {
            return { done: true };
        }
        else {
            let result = {
                value: this.group.members[this.position],
                done: false
            };

            this.position++;
            return result;
        }
    }
}

//used to enable an object to become an iterable object
for(let value of Group.from(["a", "b", "c", "d"])){
    console.log(value);
}



