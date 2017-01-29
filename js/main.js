/**
 * Created by antoine on 28/01/17.
 */

window.onload = function() {
    let app, canvas;

    (function(){
        let newCanvas = document.createElement("canvas");
        newCanvas.id = "app";
        document.body.appendChild(newCanvas);
    })();

    canvas = document.getElementById("app");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    app = new App(canvas);
    app.init();
    app.update();
};