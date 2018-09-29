var rrafshi = document.createElement("canvas");
rrafshi.width = 1200;
rrafshi.height = 650;
document.body.appendChild(rrafshi);

var ctx = rrafshi.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
bgReady = true;
}
bgImage.src = "images/birth2.png";


var idealiReady = false;
var ideali = {};
ideali.x = rrafshi.width/2;
ideali.y = rrafshi.height/2;
var idealiSpeed = 2;
var idealiImage = new Image();
idealiImage.onload = function(){
idealiReady = true;
}
idealiImage.src = "images/happy.png";


var tortaReady = false;
var torta = {};
var tortaCought = 0;
var tortaImage = new Image();
tortaImage.onload = function(){
tortaReady = true;
}
tortaImage.src = "images/burgeri.png";


var keysDown = {};

addEventListener("keydown", function (e){
    keysDown[e.keyCode] = true;
}, false);


addEventListener("keyup", function (e){
delete keysDown[e.keyCode];
}, false);

var update = function(){
    if(38 in keysDown){
    	ideali.y -= idealiSpeed;   	
    }
    if(40 in keysDown){
    	ideali.y += idealiSpeed;
    }
    if(37 in keysDown){
    	ideali.x -= idealiSpeed;
    }		
    if(39 in keysDown){
    	ideali.x += idealiSpeed;
    }
	if (
		ideali.x <= (torta.x + 32)
		&& torta.x <= (ideali.x + 32)
		&& ideali.y <= (torta.y + 32)
		&& torta.y <= (ideali.y + 32)

		){
		tortaCought = tortaCought + 1;// tortaCought++
		reset();
	}
}

var reset = function(){
	
    torta.x = 32 + (Math.random()*(rrafshi.width - 200));
    torta.y = 32 + (Math.random()*(rrafshi.height - 100));
}

var render = function(){

	if(bgReady) { ctx.drawImage(bgImage, 0, 0);}
	if(idealiReady) { ctx.drawImage(idealiImage, ideali.x , ideali.y);}
	if(tortaReady) { ctx.drawImage(tortaImage, torta.x, torta.y);}
	update();
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "16px Helvatica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Ideali hengri  " + tortaCought + " torta per ditlindje ", 32 ,32 );
	ctx.fillText("Urime Ditlindjen i bofsh edhe 100 tjera ", 32 ,60 );
	ctx.fillText(" Me ane te shigjetave mund te shkosh tek torta per ta ngrene ", 5 ,5 );
	ctx.fillText("by B.R. ", 1100 ,5 );

}
reset();
setInterval(render, 1);