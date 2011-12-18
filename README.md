Fake operator overloading for JavaScript
========================================

The type `Point` uses [fake operator overloading][1] and lets you do the following:

    var Point = require("./point.js").Point;
    var p = new Point();
    
    p._ = new Point(1, 2) + new Point(3, 4) + new Point(5, 6);
    console.log(p.toString()); // Point(9, 12)

Caveats:

- The overloaded operators only work when used together with an assignment, in the above manner.
- `"" + mypoint` won't invoke `toString()`, but `valueOf()`. Work-around: `"" + mypoint._`

[1]: http://www.2ality.com/2011/12/fake-operator-overloading.html
