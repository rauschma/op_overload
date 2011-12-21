// Run this module via jasmine-node (installable by npm)
// https://github.com/mhevery/jasmine-node

var Point = require("./point.js").Point;

describe("add", function() {
    it("adds points", function() {
        var p = new Point();

        p._ = new Point(1, 2) + new Point(3, 4) + new Point(5, 6);
        expect(p.equals(new Point(9, 12))).toBe(true);

        // Strings work, too
        p._ = new Point("a", "b") + new Point("c", "d") + new Point("e", "f");
        expect(p.equals(new Point("ace", "bdf"))).toBe(true);
    });
});

describe("multiply", function() {
    it("multiplies points", function() {
        var p = new Point();

        p._ = new Point(1, 2) * new Point(3, 4) * new Point(5, 6);
        expect(p.equals(new Point(15, 48))).toBe(true);
    });
});

describe("subtract", function() {
    it("subtracts points", function() {
        var p = new Point();

        p._ = new Point(9, 8) - new Point(3, 4) - new Point(4, 1);
        expect(p.equals(new Point(2, 3))).toBe(true);
    });
});

describe("divide", function() {
    it("divides points", function() {
        var p = new Point();

        p._ = new Point(18, 40) / new Point(3, 4) / new Point(2, 5);
        expect(p.equals(new Point(3, 2))).toBe(true);
    });
});
