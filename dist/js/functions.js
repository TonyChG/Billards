"use strict";

/**
 * Created by antoine on 28/01/17.
 */

var COLORS = {
    orange: "#D4B46A",
    yellow: "#807015",
    purple: "#291657",
    blue: "#172556"
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

var drawCircle = function drawCircle(render, x, y, rad, color) {
    render.beginPath();
    render.fillStyle = color;
    render.arc(x, y, rad, 0, 2 * Math.PI);
    render.fill();
};

var drawLine = function drawLine(render, x1, y1, x2, y2, color) {
    render.beginPath();
    render.strokeStyle = color;
    render.moveTo(x1, y1);
    render.lineTo(x2, y2);
    render.closePath();
    render.stroke();
};
//# sourceMappingURL=functions.js.map