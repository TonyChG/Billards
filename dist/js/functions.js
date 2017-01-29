"use strict";

/**
 * Created by antoine on 28/01/17.
 */

var COLORS = {
    red: "#EA282E",
    orange: "#EF6946",
    yellow: "#FDCF1A",
    green: "#9afd16",
    blue: "#01A7EE"
};

// return a random integer
var randint = function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// return a random coordinate
var randintMax = function randintMax(max) {
    return randint(0, max);
};

// return a random color
var rand_color = function rand_color() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
//# sourceMappingURL=functions.js.map