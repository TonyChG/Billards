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

    poolGame () {
        for (let i = 0, len = 10; i < len; i++) {
            this.list.push(new Ball({
                px: (this.width/2-5*cfg.RADIUS + cfg.RADIUS + (cfg.RADIUS * i * 2)),
                py: (cfg.RADIUS*3),
                vx: 0, vy: 0,
                mass: cfg.MASS, rad: cfg.RADIUS, color: COLORS.purple
            }));
        }
        this.list.push(new Ball({
            px: (this.width/2-5*cfg.RADIUS + cfg.RADIUS + (cfg.RADIUS* 7)),
            py: (this.height - cfg.RADIUS * 3),
            vx: 0, vy: 0,
            mass: cfg.MASS, rad: cfg.RADIUS, color: "white"
        }));
    }

    init () {
        this.poolGame();
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