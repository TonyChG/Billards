/**
 * Created by antoine on 28/01/17.
 */

const COLORS = {
    orange  : "#D4B46A",
    yellow  : "#807015",
    purple  : "#291657",
    blue    : "#172556"
};

// return a random integer
let randint = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

// return a random coordinate
let randintMax = function(max) {
    return randint(0, max);
};

// return a random color
let rand_color = function() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

let drawCircle = function(render, x, y, rad, color) {
    render.beginPath();
    render.fillStyle = color;
    render.arc(x, y, rad, 0, 2 * Math.PI);
    render.fill();
};

let drawLine = function(render, x1, y1, x2, y2, color) {
    render.beginPath();
    render.strokeStyle = color;
    render.moveTo(x1, y1);
    render.lineTo(x2, y2);
    render.closePath();
    render.stroke()
};