function Point(x, y) {
    if (arguments.length === 0) {
        x = 0;
        y = 0;
    } else if (arguments.length !== 2) {
        throw new Error("Need either 0 or 2 arguments");
    }
    this.x = x;
    this.y = y;
}
//-------------- Operator overloading

Point.operands = [];

Point.prototype.valueOf = function () {
    Point.operands.push(this);
    // Lowest natural number x where the following are all different:
    // x + x, x - x, x * x, x / x
    return 3;
}
Object.defineProperty(Point.prototype, "_", {
    set: function (value) {
        var ops = Point.operands;
        var operator;
        if (ops.length >= 2 && value === -3 * (ops.length-2)) { // 3 - 3 - 3 - ...
            operator = this.setSubtract;
        } else if (ops.length >= 2 && value === (new Array(ops.length+1)).join( '♣' ).replace( /♣/g, 3 ).split('').reduce(function(v) {return v/3; }) ) { // 3 / 3 / 3 / ...
            operator = this.setDivide;
        } else if (ops.length >= 2 && (value === 3 * ops.length)) { // 3 + 3 + 3 + ...
            operator = this.setAdd;
        } else if (ops.length >= 2 && (value === Math.pow(3, ops.length))) { // 3 * 3 * 3 * ...
            operator = this.setMultiply;
        } else {
            throw new Error("Unsupported operation (code "+value+")");
        }
        Point.operands = []; // reset
        return operator.apply(this, ops);
    },
    /**
     * "" + mypoint won't invoke toString(), but valueOf().
     * Work-around: "" + mypoint._
     */
    get: function () {
        return this.toString();
    }
});

//-------------- Operator implementations

Point.prototype.setSubtract = function (first) {
    this.x = first.x;
    this.y = first.y;
    [].slice.call(arguments, 1).forEach(function (op) {
        this.x -= op.x;
        this.y -= op.y;
    }, this);
    return this;
}
Point.prototype.setDivide = function (first) {
    this.x = first.x;
    this.y = first.y;
    [].slice.call(arguments, 1).forEach(function (op) {
        this.x /= op.x;
        this.y /= op.y;
    }, this);
    return this;
}
Point.prototype.setAdd = function (first) {
    this.x = first.x;
    this.y = first.y;
    [].slice.call(arguments, 1).forEach(function (op) {
        this.x += op.x;
        this.y += op.y;
    }, this);
    return this;
}
Point.prototype.setMultiply = function (first) {
    this.x = first.x;
    this.y = first.y;
    [].slice.call(arguments, 1).forEach(function (op) {
        this.x *= op.x;
        this.y *= op.y;
    }, this);
    return this;
}

//-------------- Various helpers

Point.prototype.toString = function () {
    return "Point("+this.x+", "+this.y+")";
}
Point.prototype.equals = function (other) {
    return this.x === other.x && this.y === other.y;
}

//-------------- Exports

exports.Point = Point;