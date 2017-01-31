/**
 * Created by antoine on 28/01/17.
 */

window.onload = function() {
    let app, canvas;

    canvas = document.getElementById("app");

    canvas.width  = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.55;

    app = new App(canvas);
    app.init();
    app.update();
};