/**
 * Created by antoine on 28/01/17.
 */

const COLORS = {
    red   : "#EA282E",
    orange: "#EF6946",
    yellow: "#FDCF1A",
    green : "#9afd16",
    blue  : "#01A7EE"
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
