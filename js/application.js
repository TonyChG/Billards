/**
 * Created by antoine on 28/01/17.
 */

class App {

    constructor(cvs) {
        this.cvs    = cvs;
        this.height = window.innerHeight;
        this.width  = window.innerWidth;
        this.render = cvs.getContext("2d");
        this.balls  = new BallSet(this.width, this.height, this.render).init();
        this.interval = 1000 / cfg.FPS;
        this.then = Date.now();
    }

    init () {
        this.cvs.addEventListener("mousemove", e => this.handleMouseMove(e.clientX, e.clientY));
        this.cvs.addEventListener("mousedown", e => this.handleMouseDown(e.clientX, e.clientY));
    }

    handleMouseMove (mx, my) {
        for (let n = 0, len = this.balls.length; n < len; n++) {
            this.balls.list[n].mouseOn = !!this.balls.list[n].mouseIsOn(mx, my);
        }
    }

    handleMouseDown (mx, my) {
        for (let i = 0, len = this.balls.list.length; i < len; i++) {
            let ball = this.balls.list[i];
            if (this.balls.isAnySelectBall() && ball.selected) {
                if (this.balls.mouseNotOnAnyBall()) {
                    ball.vx += (mx - ball.x) / 10;
                    ball.vy += (my - ball.y) / 10;
                }
            }
        }
        this.balls.unSelectBalls();
        this.balls.updateMouseOn();
    }

    update () {
        let now = Date.now(),
            delta = now - this.then;

        requestAnimationFrame(this.update.bind(this));

        if (delta > this.interval) {

            this.then = now - (delta % this.interval);

            this.render.fillStyle = "black";
            this.render.fillRect(0, 0, this.width, this.height);

            this.balls.drawBalls();
            this.balls.computeCollision();
        }
    }
}