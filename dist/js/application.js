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
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.render = cvs.getContext("2d");
        this.balls = new BallSet(this.width, this.height, this.render).init();
        this.interval = 1000 / cfg.FPS;
        this.then = Date.now();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            this.cvs.addEventListener("mousemove", function (e) {
                return _this.handleMouseMove(e.clientX, e.clientY);
            });
            this.cvs.addEventListener("mousedown", function (e) {
                return _this.handleMouseDown(e.clientX, e.clientY);
            });
        }
    }, {
        key: "handleMouseMove",
        value: function handleMouseMove(mx, my) {
            for (var n = 0, len = this.balls.length; n < len; n++) {
                this.balls.list[n].mouseOn = !!this.balls.list[n].mouseIsOn(mx, my);
            }
        }
    }, {
        key: "handleMouseDown",
        value: function handleMouseDown(mx, my) {
            for (var i = 0, len = this.balls.list.length; i < len; i++) {
                var ball = this.balls.list[i];
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
    }, {
        key: "update",
        value: function update() {
            var now = Date.now(),
                delta = now - this.then;

            requestAnimationFrame(this.update.bind(this));

            if (delta > this.interval) {

                this.then = now - delta % this.interval;

                this.render.fillStyle = "black";
                this.render.fillRect(0, 0, this.width, this.height);

                this.balls.drawBalls();
                this.balls.computeCollision();
            }
        }
    }]);

    return App;
}();
//# sourceMappingURL=application.js.map