/**
 * Created by antoine on 31.01.17.
 */

class Hole {
    constructor(x, y, color, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
    }
}

class HoleSet {
    constructor(width, height, render) {
        this.width = width;
        this.height = height;
        this.render = render;
        this.radius = cfg.RADIUS+3;
        this.list = [];
    }

    init () {
        this.list.push(new Hole(this.radius-10, this.radius-10, "black", this.radius));
        this.list.push(new Hole(this.width-10, this.radius-10, "black", this.radius));
        this.list.push(new Hole(this.width/2, this.radius-10, "black", this.radius));
        this.list.push(new Hole(this.radius-10, this.height-this.radius+10, "black", this.radius));
        this.list.push(new Hole(this.width-10, this.height-this.radius+10, "black", this.radius));
        this.list.push(new Hole(this.width/2, this.height-this.radius+10, "black", this.radius));
        return this;
    }

    drawHoles () {
        for (let n = 0, len = this.list.length; n < len; n++) {
            let hole = this.list[n];
            drawCircle(this.render, hole.x, hole.y, hole.rad, hole.color);
        }
    }

    ballisInHole (ball) {

    }
}