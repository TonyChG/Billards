/**
 * Created by antoine on 28/01/17.
 */

// BALL
class Ball {
    constructor(cfg) {

        this.pos = new Vect2D(cfg.px, cfg.py);
        this.vet = new Vect2D(cfg.vx, cfg.vy);

        this.rad   = cfg.rad;
        this.mass  = cfg.mass;
        this.color = cfg.color;

        this.mouseOn  = false;
        this.selected = false;

    }

    get x ()    { return this.pos.x }
    get y ()    { return this.pos.y }
    set x (x)   { this.pos.x = x }
    set y (y)   { this.pos.y = y }
    get vx ()   { return this.vet.x }
    get vy ()   { return this.vet.y }
    set vx (vx) { this.vet.x = vx }
    set vy (vy) { this.vet.y = vy }

    draw (ctx) {
        if (this.mouseOn) drawCircle(ctx, this.x, this.y, this.rad+1, "white");
        let circleColor = this.selected ? COLORS.orange : this.color;
        drawCircle(ctx, this.x, this.y, this.rad, circleColor);
        if (cfg.DEBUG) {
            ctx.fillStyle = "white";
            ctx.font = "9px Arial";
            ctx.fillText(this.vet.toString(), this.x - 30, this.y + this.rad + 15);
        }
    }

    mouseIsOn (mx, my) {
        return mx >= this.x - this.rad && mx <= this.x + this.rad
            && my >= this.y - this.rad && my <= this.y + this.rad;
    }

    wallCollision (width, height) {
        if (this.x - this.rad < cfg.RADIUS) {
            this.x = this.rad*2;
            this.vet.invertX();
        } else if (this.x + this.rad > width-cfg.RADIUS) {
            this.x = width - this.rad*2;
            this.vet.invertX();
        }
        if (this.y - this.rad < cfg.RADIUS) {
            this.y = this.rad*2;
            this.vet.invertY();
        } else if (this.y + this.rad > height-cfg.RADIUS) {
            this.y = height - this.rad*2;
            this.vet.invertY();
        }
    }

    getDist(ball) {
        let dx = (this.x - ball.x) * (this.x - ball.x),
            dy = (this.y - ball.y) * (this.y - ball.y);
        return Math.sqrt(dx + dy);
    }

    computeNewVelocity (ball, angle, sin, cos) {
        let b1 = this, b2 = ball,
            nvt1 = b1.vet.length(),
            nvt2 = b2.vet.length(),
            dir1 = Math.atan2(b1.vet.y, b1.vet.x),
            dir2 = Math.atan2(b2.vet.y, b2.vet.x),
            vtx1 = nvt1 * Math.cos(dir1 - angle),
            vty1 = nvt1 * Math.sin(dir1 - angle),
            vtx2 = nvt2 * Math.cos(dir2 - angle),
            vty2 = nvt2 * Math.sin(dir2 - angle),
            fvx1 = ((b1.rad - b2.rad) * vtx1 + (2 * b2.rad) * vtx2) / (b1.rad + b2.rad),
            fvx2 = ((2 * b1.rad) * vtx1 + (b2.rad - b1.rad) * vtx2) / (b1.rad + b2.rad);

        return {
            nvtx1: cos * fvx1 + Math.cos(angle + Math.PI / 2) * vty1,
            nvty1: sin * fvx1 + Math.sin(angle + Math.PI / 2) * vty1,
            nvtx2: cos * fvx2 + Math.cos(angle + Math.PI / 2) * vty2,
            nvty2: sin * fvx2 + Math.sin(angle + Math.PI / 2) * vty2
        };
    }

    replaceBalls (ball, sin, cos) {
        let b1 = this, b2 = ball,
            cx = Math.floor((b1.x + b2.x)/2),
            cy = Math.floor((b1.y + b2.y)/2);
        b1.x = cx + b1.rad * cos;
        b1.y = cy + b1.rad * sin;
        b2.x = cx - b2.rad * cos;
        b2.y = cy - b2.rad * sin;
    }

    resolveCollision(ball) {
        let b1 = this, b2 = ball,
            dx = b1.x - b2.x,
            dy = b1.y - b2.y,
            angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),
            dist  = Math.sqrt(dx * dx + dy * dy);

        if (Math.abs(dx) + Math.abs(dy) != 0 && dist < b1.rad + b2.rad - 2) {

            if (dist != b1.rad + b2.rad) this.replaceBalls(ball, sin, cos);

            let newVel = this.computeNewVelocity(ball, angle, sin, cos);

            b1.vet.x = newVel.nvtx1;
            b1.vet.y = newVel.nvty1;
            b2.vet.x = newVel.nvtx2;
            b2.vet.y = newVel.nvty2;

            b1.vet.round(cfg.V_MIN);
            b2.vet.round(cfg.V_MIN);
        }
    }

    applyFriction () {
        if (cfg.FRICTION != 0) {
            if (this.vx != 0) this.vx = this.vx * cfg.FRICTION;
            if (this.vy != 0) this.vy = this.vy * cfg.FRICTION;
            if (Math.abs(this.vx) <= 0.1) this.vx = 0;
            if (Math.abs(this.vy) <= 0.1) this.vy = 0;
            this.vet.round(cfg.V_MIN);
        }
    }

    move () {
        this.pos.add(this.vet);
    }
}
