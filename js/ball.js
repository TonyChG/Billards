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
        ctx.fillStyle = "white";
        ctx.font = "9px Arial";
        ctx.fillText(this.vet.toString(), this.x-30, this.y+this.rad+15);
    }

    mouseIsOn (mx, my) {
        return mx >= this.x - this.rad && mx <= this.x + this.rad
            && my >= this.y - this.rad && my <= this.y + this.rad;
    }

    wallCollision (width, height) {
        if (this.x - this.rad < cfg.RADIUS) {
            this.x = this.rad*2;
            this.vet.invertX();
        } else if (this.x + this.rad > width-cfg.RADIUS*2) {
            this.x = width - this.rad*3;
            this.vet.invertX();
        }
        if (this.y - this.rad < cfg.RADIUS) {
            this.y = this.rad*2;
            this.vet.invertY();
        } else if (this.y + this.rad > height-cfg.RADIUS*2) {
            this.y = height - this.rad*3;
            this.vet.invertY();
        }
    }

    getVelocity() {
        console.log("Velocity!");
    }

    getDist(ball) {
        let dx = (this.x - ball.x) * (this.x - ball.x),
            dy = (this.y - ball.y) * (this.y - ball.y);
        return Math.sqrt(dx + dy);
    }

    resolveCollision(ball) {
        let b1 = this, b2 = ball,
            dx = b1.x - b2.x,
            dy = b1.y - b2.y,
            dist  = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx);

        if (Math.abs(dx) + Math.abs(dy) != 0 && dist < b1.rad + b2.rad - 2) {
            let nvt1 = b1.vet.length(),
                nvt2 = b2.vet.length(),
                dir1 = Math.atan2(b1.vet.y, b1.vet.x),
                dir2 = Math.atan2(b2.vet.y, b2.vet.x),
                vtx1 = nvt1 * Math.cos(dir1 - angle),
                vty1 = nvt1 * Math.sin(dir1 - angle),
                vtx2 = nvt2 * Math.cos(dir2 - angle),
                vty2 = nvt2 * Math.sin(dir2 - angle),
                fvx1 = ((b1.rad - b2.rad) * vtx1 + (2 * b2.rad) * vtx2) / (b1.rad + b2.rad),
                fvx2 = ((2 * b1.rad) * vtx1 + (b2.rad - b1.rad) * vtx2) / (b1.rad + b2.rad);

            b1.vet.x = Math.cos(angle) * fvx1 + Math.cos(angle + Math.PI / 2) * vty1;
            b1.vet.y = Math.sin(angle) * fvx1 + Math.sin(angle + Math.PI / 2) * vty1;
            b2.vet.x = Math.cos(angle) * fvx2 + Math.cos(angle + Math.PI / 2) * vty2;
            b2.vet.y = Math.sin(angle) * fvx2 + Math.sin(angle + Math.PI / 2) * vty2;

            b1.vet.round(cfg.V_MIN);
            b2.vet.round(cfg.V_MIN);

            // b1.move();
            // b2.move();

            // b1.color = rand_color();
            // b2.color = rand_color();

        } else if (dist == this.rad + ball.rad) {
            this.move();
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
