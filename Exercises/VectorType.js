class Vector {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    Plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    Minus(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    get length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}

console.log(new Vector(1, 2).Plus(new Vector(2, 3)));
console.log(new Vector(1, 2).Minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);
