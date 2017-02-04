"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by antoine on 28/01/17.
 */

var App = function () {
    function App(cvs) {
        _classCallCheck(this, App);

        this.cvs = cvs;
        this.height = cvs.height;
        this.width = cvs.width;
        this.render = cvs.getContext("2d");
        this.balls = new BallSet(this.width, this.height, this.render).init();
        this.holes = new HoleSet(this.width, this.height, this.render).init();
        this.interval = 1000 / cfg.FPS;
        this.then = Date.now();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            this.cvs.addEventListener("mousemove", function (e) {
                return _this.getMousePos(e);
            });
            this.cvs.addEventListener("mousedown", function (e) {
                return _this.handleMouseDown(e);
            });
        }
    }, {
        key: "getMousePos",
        value: function getMousePos(evt) {
            var rect = this.cvs.getBoundingClientRect();
            this.mx = evt.clientX - rect.left;
            this.my = evt.clientY - rect.top;
            this.handleMouseMove();
        }
    }, {
        key: "handleMouseMove",
        value: function handleMouseMove() {
            for (var n = 0, len = this.balls.length; n < len; n++) {
                this.balls.list[n].mouseOn = !!this.balls.list[n].mouseIsOn(this.mx, this.my);
            }
        }
    }, {
        key: "handleMouseDown",
        value: function handleMouseDown(evt) {
            var rect = this.cvs.getBoundingClientRect();
            var cx = evt.clientX - rect.left;
            var cy = evt.clientY - rect.top;

            for (var i = 0, len = this.balls.list.length; i < len; i++) {
                var ball = this.balls.list[i];
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
    }, {
        key: "getPosOfFirstObj",
        value: function getPosOfFirstObj() {
            if (this.mx != undefined && this.my !== undefined) {
                var ball = this.balls.getSelectedBall(),
                    angle = Math.atan2(ball.x - this.mx, ball.y - this.my) - Math.PI / 2,
                    sin = Math.sin(-angle),
                    cos = Math.cos(angle),
                    x = ball.x + (cfg.RADIUS + 10) * cos,
                    y = ball.y + (cfg.RADIUS + 10) * sin;

                drawCircle(this.render, x, y, 3, "red");
                while (!this.balls.isOnBall(x, y) && this.balls.isInScreen(x, y)) {
                    x += cos;
                    y += sin;
                }
                drawLine(this.render, ball.x, ball.y, x, y, "white");
            }
        }
    }, {
        key: "drawPath",
        value: function drawPath() {
            var ball = this.balls.getSelectedBall();
            if (ball) drawLine(this.render, ball.x, ball.y, this.mx, this.my, "white");
            this.getPosOfFirstObj();
        }
    }, {
        key: "update",
        value: function update() {
            var now = Date.now(),
                delta = now - this.then;

            requestAnimationFrame(this.update.bind(this));

            if (delta > this.interval) {

                this.then = now - delta % this.interval;

                this.render.fillStyle = "#347c46";
                this.render.fillRect(0, 0, this.width, this.height);

                this.balls.drawBalls();
                this.holes.drawHoles();
                this.balls.computeCollision(this.holes);

                this.drawPath();
            }
        }
    }]);

    return App;
}();
//# sourceMappingURL=application.js.map