/**
 * Created by antoine on 28/01/17.
 */

class BallSet {

    constructor(width, height, render) {

        this.width  = width;
        this.height = height;
        this.render = render;
        this.list   = [];

    }

    get length () { return this.list.length }

    poolGame (x, y) {
        let diam = cfg.RADIUS*2;
        let colors = ["#FF3F23", "#FDE42A"];

        this.list.push(new Ball({
            px: this.width/5, py: this.height/2,
            vx: 0, vy: 0,
            mass: cfg.MASS, rad: cfg.RADIUS, color: "white"
        }));
        let n = 0;
        let color;
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < j+1; i++) {
                color = j == 2 && i == 1 ? "black" : colors[n%2];
                this.list.push(new Ball({
                    px: x+(j*(diam-3)), py: y+(diam*i-cfg.RADIUS*j),
                    vx: 0, vy: 0,
                    mass: cfg.MASS, rad: cfg.RADIUS, color: color
                }));
                n++;
            }
        }
    }

    debug () {
        this.list.push(new Ball({
            px: this.width/3, py: this.height/2,
            vx: 10, vy: 0,
            mass: cfg.MASS, rad: cfg.RADIUS, color: "white"
        }));
        this.list.push(new Ball({
            px: this.width-this.width/3, py: this.height/2+10,
            vx: -10, vy: 0,
            mass: cfg.MASS, rad: cfg.RADIUS, color: "white"
        }));
    }

    init () {
        this.poolGame(this.width-this.width/4, this.height/2);
        // this.debug();
        return this;
    }

    drawBalls () {
        for (let i = 0, len = this.length; i < len; i++) {
            this.list[i].draw(this.render);
        }
    }

    getSelectedBall () {
        for (let i = 0, len = this.length; i < len; i++) {
            if (this.list[i].selected) return this.list[i];
        }
        return false;
    }

    mouseNotOnAnyBall () {
        for (let i = 0, len = this.length; i < len; i++) {
            if (this.list[i].mouseOn) return false;
        }
        return true;
    }

    isOnBall (x, y) {
        let check = false;
        for (let n = 0, len = this.length; n < len; n++) {
            let ball = this.list[n];
            if (x > ball.x - ball.rad && x < ball.x + ball.rad &&
                y > ball.y - ball.rad && y < ball.y + ball.rad) {
                check = true;
            }
        }
        return check;
    }

    isInScreen (x, y) {
        return x > cfg.RADIUS && x < this.width-cfg.RADIUS
            && y > cfg.RADIUS && y < this.height-cfg.RADIUS;
    }

    unSelectBalls () {
        for (let i = 0, len = this.length; i < len; i++) {
            this.list[i].selected = false;
        }
    }

    computeCollision () {
        for (let i = 0, len = this.length; i < len; i++) {
            let b1 = this.list[i];
            b1.move();
            b1.wallCollision(this.width, this.height);
            for (let j = i + 1, len = this.length; j < len; j++) {
                let b2 = this.list[j];
                if (b1 != b2) b1.resolveCollision(b2);
            }
            b1.applyFriction();
        }
    }

    updateMouseOn () {
        let check = false;

        for (let i = 0, len = this.length; i < len; i++) {
            if (this.list[i].mouseOn) {
                this.list[i].selected = true;
                check = true;
            }
        }
        return check;
    }
}