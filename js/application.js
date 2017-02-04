/**
 * Created by antoine on 28/01/17.
 */

class App {

    constructor(cvs) {
        this.cvs    = cvs;
        this.height = cvs.height;
        this.width  = cvs.width;
        this.render = cvs.getContext("2d");
        this.balls  = new BallSet(this.width, this.height, this.render).init();
        this.holes  = new HoleSet(this.width, this.height, this.render).init();
        this.interval = 1000 / cfg.FPS;
        this.then = Date.now();
    }

    init () {
        this.cvs.addEventListener("mousemove", e => this.getMousePos(e));
        this.cvs.addEventListener("mousedown", e => this.handleMouseDown(e));
    }

    getMousePos(evt) {
        let rect = this.cvs.getBoundingClientRect();
        this.mx = evt.clientX - rect.left;
        this.my = evt.clientY - rect.top;
        this.handleMouseMove();
    }

    handleMouseMove () {
        for (let n = 0, len = this.balls.length; n < len; n++) {
            this.balls.list[n].mouseOn = !!this.balls.list[n].mouseIsOn(this.mx, this.my);
        }
    }

    handleMouseDown (evt) {
        let rect = this.cvs.getBoundingClientRect();
        let cx = evt.clientX - rect.left;
        let cy = evt.clientY - rect.top;

        for (let i = 0, len = this.balls.list.length; i < len; i++) {
            let ball = this.balls.list[i];
            if (this.balls.getSelectedBall() && ball.selected) {
                if (this.balls.mouseNotOnAnyBall()) {
                    ball.vx += (ball.x - cx) / 10;
                    ball.vy += (ball.y - cy) / 10;
                }
            }
        }
        this.balls.unSelectBalls();
        this.balls.updateMouseOn();
    }

    getPosOfFirstObj () {
        if (this.mx != undefined && this.my !== undefined) {
            let ball = this.balls.getSelectedBall(),
                angle = Math.atan2(ball.x - this.mx, ball.y - this.my) - Math.PI / 2,
                sin = Math.sin(-angle), cos = Math.cos(angle),
                x = ball.x + ((cfg.RADIUS + 10) * cos), y = ball.y + ((cfg.RADIUS + 10) * sin);

            drawCircle(this.render, x, y, 3, "red");
            while (!this.balls.isOnBall(x, y) && this.balls.isInScreen(x, y)) {
                x += cos;
                y += sin;
            }
            drawLine(this.render, ball.x, ball.y, x, y, "white");
        }
    }

    drawPath () {
        let ball = this.balls.getSelectedBall();
        if (ball) drawLine(this.render, ball.x, ball.y, this.mx, this.my, "white");
        this.getPosOfFirstObj();
    }

    update () {
        let now = Date.now(),
            delta = now - this.then;

        requestAnimationFrame(this.update.bind(this));

        if (delta > this.interval) {

            this.then = now - (delta % this.interval);

            this.render.fillStyle = "#347c46";
            this.render.fillRect(0, 0, this.width, this.height);

            this.balls.drawBalls();
            this.holes.drawHoles();
            this.balls.computeCollision(this.holes);

            this.drawPath();

        }
    }
}