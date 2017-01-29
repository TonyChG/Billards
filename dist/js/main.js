"use strict";

/**
 * Created by antoine on 28/01/17.
 */

window.onload = function () {
    var app = void 0,
        canvas = void 0;

    (function () {
        var newCanvas = document.createElement("canvas");
        newCanvas.id = "app";
        document.body.appendChild(newCanvas);
    })();

    canvas = document.getElementById("app");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    app = new App(canvas);
    app.init();
    app.update();
};
//# sourceMappingURL=main.js.map