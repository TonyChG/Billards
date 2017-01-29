"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vect2D = function () {
    function Vect2D(x, y) {
        _classCallCheck(this, Vect2D);

        this.x = x;
        this.y = y;
        return this;
    }

    // Add Vect To Vect


    _createClass(Vect2D, [{
        key: "addX",
        value: function addX(vect) {
            this.x += vect.x;
            return this;
        }
    }, {
        key: "addY",
        value: function addY(vect) {
            this.y += vect.y;
            return this;
        }
    }, {
        key: "add",
        value: function add(vect) {
            this.addX(vect);
            this.addY(vect);
            return this;
        }

        // Add Integer To Vect

    }, {
        key: "addIntX",
        value: function addIntX(nb) {
            this.x += nb;
            return this;
        }
    }, {
        key: "addIntY",
        value: function addIntY(nb) {
            this.y += nb;
            return this;
        }
    }, {
        key: "addInt",
        value: function addInt(nb) {
            this.addIntX(nb);
            this.addIntY(nb);
            return this;
        }

        // Sub Vect To Vect

    }, {
        key: "subX",
        value: function subX(vect) {
            this.x -= vect.x;
            return this;
        }
    }, {
        key: "subY",
        value: function subY(vect) {
            this.y -= vect.y;
            return this;
        }
    }, {
        key: "sub",
        value: function sub(vect) {
            this.subX(vect);
            this.subY(vect);
            return this;
        }

        // Sub Integer To Vect

    }, {
        key: "subIntX",
        value: function subIntX(nb) {
            this.x -= nb;
            return this;
        }
    }, {
        key: "subIntY",
        value: function subIntY(nb) {
            this.y -= nb;
            return this;
        }
    }, {
        key: "subInt",
        value: function subInt(nb) {
            this.subIntX(nb);
            this.subIntY(nb);
            return this;
        }

        // Invert Vect

    }, {
        key: "invertX",
        value: function invertX() {
            this.x *= -1;
            return this;
        }
    }, {
        key: "invertY",
        value: function invertY() {
            this.y *= -1;
            return this;
        }
    }, {
        key: "invert",
        value: function invert() {
            this.invertX();
            this.invertY();
            return this;
        }

        // Round at number

    }, {
        key: "round",
        value: function round(number) {
            this.x = Math.round(this.x * number) / number;
            this.y = Math.round(this.y * number) / number;
            return this;
        }

        // Mult by

    }, {
        key: "mult",
        value: function mult(vect) {
            this.x *= vect.x;
            this.y *= vect.y;
            return this;
        }
    }, {
        key: "multBy",
        value: function multBy(number) {
            this.x *= number;
            this.y *= number;
            return this;
        }

        // Calc

    }, {
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "x: " + this.x + "\ty: " + this.y;
        }
    }]);

    return Vect2D;
}();
//# sourceMappingURL=vector.js.map