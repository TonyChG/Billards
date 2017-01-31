"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by antoine on 28/01/17.
 */

var BallSet = function () {
    function BallSet(width, height, render) {
        _classCallCheck(this, BallSet);

        this.width = width;
        this.height = height;
        this.render = render;
        this.list = [];
    }

    _createClass(BallSet, [{
        key: "poolGame",
        value: function poolGame() {
            for (var i = 0, len = 10; i < len; i++) {
                this.list.push(new Ball({
                    px: this.width / 2 - 5 * cfg.RADIUS + cfg.RADIUS + cfg.RADIUS * i * 2,
                    py: cfg.RADIUS * 3,
                    vx: 0, vy: 0,
                    mass: cfg.MASS, rad: cfg.RADIUS, color: COLORS.purple
                }));
            }
            this.list.push(new Ball({
                px: this.width / 2 - 5 * cfg.RADIUS + cfg.RADIUS + cfg.RADIUS * 7,
                py: this.height - cfg.RADIUS * 3,
                vx: 0, vy: 0,
                mass: cfg.MASS, rad: cfg.RADIUS, color: "white"
            }));
        }
    }, {
        key: "init",
        value: function init() {
            this.poolGame();
            return this;
        }
    }, {
        key: "drawBalls",
        value: function drawBalls() {
            for (var i = 0, len = this.length; i < len; i++) {
                this.list[i].draw(this.render);
            }
        }
    }, {
        key: "getSelectedBall",
        value: function getSelectedBall() {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this.list[i].selected) return this.list[i];
            }
            return false;
        }
    }, {
        key: "mouseNotOnAnyBall",
        value: function mouseNotOnAnyBall() {
            for (var i = 0, len = this.length; i < len; i++) {
                if (this.list[i].mouseOn) return false;
            }
            return true;
        }
    }, {
        key: "isOnBall",
        value: function isOnBall(x, y) {
            var check = false;
            for (var n = 0, len = this.length; n < len; n++) {
                var ball = this.list[n];
                if (x > ball.x - ball.rad && x < ball.x + ball.rad && y > ball.y - ball.rad && y < ball.y + ball.rad) {
                    check = true;
                }
            }
            return check;
        }
    }, {
        key: "isInScreen",
        value: function isInScreen(x, y) {
            return x > cfg.RADIUS && x < this.width - cfg.RADIUS && y > cfg.RADIUS && y < this.height - cfg.RADIUS;
        }
    }, {
        key: "unSelectBalls",
        value: function unSelectBalls() {
            for (var i = 0, len = this.length; i < len; i++) {
                this.list[i].selected = false;
            }
        }
    }, {
        key: "computeCollision",
        value: function computeCollision() {
            for (var i = 0, len = this.length; i < len; i++) {
                var b1 = this.list[i];
                b1.move();
                b1.wallCollision(this.width, this.height);
                for (var j = i + 1, _len = this.length; j < _len; j++) {
                    var b2 = this.list[j];
                    if (b1 != b2) b1.resolveCollision(b2);
                }
                b1.applyFriction();
            }
        }
    }, {
        key: "updateMouseOn",
        value: function updateMouseOn() {
            var check = false;

            for (var i = 0, len = this.length; i < len; i++) {
                if (this.list[i].mouseOn) {
                    this.list[i].selected = true;
                    check = true;
                }
            }
            return check;
        }
    }, {
        key: "length",
        get: function get() {
            return this.list.length;
        }
    }]);

    return BallSet;
}();
//# sourceMappingURL=ballSet.js.map