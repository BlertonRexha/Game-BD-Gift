var rrafshi = document.createElement("canvas");
rrafshi.width = 1200;
rrafshi.height = 650;
document.body.appendChild(rrafshi);

var ctx = rrafshi.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
}
bgImage.src = "images/birth2.png";


var bdManReady = false;
var bdMan = {};
bdMan.x = rrafshi.width / 2;
bdMan.y = rrafshi.height / 2;
var bdManSpeed = 2;
var bdManImage = new Image();
bdManImage.onload = function() {
    bdManReady = true;
}
bdManImage.src = "images/happy.png";


var tortaReady = false;
var torta = {};
var tortaCought = 0;
var tortaImage = new Image();
tortaImage.onload = function() {
    tortaReady = true;
}
tortaImage.src = "images/burgeri.png";


var keysDown = {};

var keydown_old = 0;

addEventListener("keydown", function(e) {
    if (keydown_old !== e.keydown) {
        delete keysDown[keydown_old]
        keysDown[e.keyCode] = true;
        keydown_old = e.keyCode
    }
}, false);


// addEventListener("keyup", function(e) {
//     delete keysDown[e.keyCode];
// }, false);

var update = function() {
    // up
    if (38 in keysDown) {
        bdMan.y -= bdManSpeed;
        if (bdMan.y <= 0) {
            bdMan.y = 0;
        }
    }
    // down
    if (40 in keysDown) {
        bdMan.y += bdManSpeed;
        if (bdMan.y >= 650) {
            bdMan.y = 635;
        }
    }
    //  left
    if (37 in keysDown) {
        bdMan.x -= bdManSpeed;
        if (bdMan.x <= 0) {
            bdMan.x = 0
        }
    }
    // right
    if (39 in keysDown) {
        bdMan.x += bdManSpeed;
        if (bdMan.x >= 1200) {
            bdMan.x = 1180
        }
    }
    if (
        bdMan.x <= (torta.x + 50) &&
        torta.x <= (bdMan.x + 50) &&
        bdMan.y <= (torta.y + 50) &&
        torta.y <= (bdMan.y + 50)

    ) {
        tortaCought = tortaCought + 1; 
        reset();
    }
}

var reset = function() {
    torta.x = 32 + (Math.random() * (rrafshi.width - 200));
    torta.y = 32 + (Math.random() * (rrafshi.height - 100));
}

var render = function() {

    if (bgReady) { ctx.drawImage(bgImage, 0, 0); }
    if (bdManReady) { ctx.drawImage(bdManImage, bdMan.x, bdMan.y); }
    if (tortaReady) { ctx.drawImage(tortaImage, torta.x, torta.y); }
    update();
    ctx.fillStyle = "rgb(2,250,250)";
    ctx.font = "16px Helvatica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(" - Bd Man hengri  " + tortaCought + " torta per ditlindje ", 5, 30);
    ctx.fillText(" - Urime Ditlindjen i bofsh edhe 100 tjera ", 5, 60);
    ctx.fillText(" - Me ane te shigjetave mund te shkosh tek torta per ta ngrene ", 5, 5);
    if (tortaCought >= 50) {
    	ctx.fillText(" - Sdo me dit me u ngi ¯\\\_(ツ)_/¯", 5, 620);
    }
    
    ctx.fillText("by B.R. ", 1100, 5);

}
reset();
setInterval(render, 1);