"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by antoine on 31.01.17.
 */

var Hole = function Hole(x, y, color, rad) {
    _classCallCheck(this, Hole);

    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color;
};

var HoleSet = function () {
    function HoleSet(width, height, render) {
        _classCallCheck(this, HoleSet);

        this.width = width;
        this.height = height;
        this.render = render;
        this.radius = cfg.RADIUS + 3;
        this.list = [];
    }

    _createClass(HoleSet, [{
        key: "init",
        value: function init() {
            this.list.push(new Hole(this.radius - 10, this.radius - 10, "black", this.radius));
            this.list.push(new Hole(this.width - 10, this.radius - 10, "black", this.radius));
            this.list.push(new Hole(this.width / 2, this.radius - 10, "black", this.radius));
            this.list.push(new Hole(this.radius - 10, this.height - this.radius + 10, "black", this.radius));
            this.list.push(new Hole(this.width - 10, this.height - this.radius + 10, "black", this.radius));
            this.list.push(new Hole(this.width / 2, this.height - this.radius + 10, "black", this.radius));
            return this;
        }
    }, {
        key: "drawHoles",
        value: function drawHoles() {
            for (var n = 0, len = this.list.length; n < len; n++) {
                var hole = this.list[n];
                drawCircle(this.render, hole.x, hole.y, hole.rad, hole.color);
            }
        }
    }, {
        key: "ballisInHole",
        value: function ballisInHole(ball) {
            var check = false;

            for (var n = 0, len = this.list.length; n < len; n++) {
                var hole = this.list[n],
                    dx = ball.x - hole.x,
                    dy = ball.y - hole.y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ball.rad + hole.rad) check = true;
            }
            return check;
        }
    }]);

    return HoleSet;
}();
//# sourceMappingURL=holes.js.map