var version = '0.1';

function init(){
	main_canvas = document.getElementById('main_canvas');
	stage = new createjs.Stage(main_canvas);
	main_canvas.addEventListener("mousemove", mouselocation, false)
	
	resize();
	splash();
	loop();
}

// global variables
var fallspeed = 0;


function resize(){ // resize the canvas
	main_canvas.width = window.innerWidth;
	main_canvas.height = window.innerHeight;
}

function mouselocation(event){
	cx = event.pageX;
	cy = event.pageY;
	//if (cx > 10 && cx < 10 + 50 && cy > 10 && cy < 50 + 10)
	//	alert("moin")
}

function splash(){ 																		// draw little "boot splash"
	circle_width = 50;
	splash.x = main_canvas.width / 5;
	splash.y = main_canvas.height / 5;

	circle = new Array();

	circle[0] = new createjs.Shape();
	circle[0].graphics.beginFill("#000").drawCircle(splash.x, splash.y, circle_width);
	circle[0].x = main_canvas.width / 8;
	circle[0].y = main_canvas.height / 4;
	stage.addChild(circle[0]);
	circle[1] = new createjs.Shape();
	circle[1].graphics.beginFill("#0f6").drawCircle(splash.x, splash.y, circle_width);
	circle[1].x = main_canvas.width / 2;
	circle[1].y = main_canvas.height / 4;
	stage.addChild(circle[1]);

	createjs.Tween.get(circle[0], { loop: false, override:true })
		.to({ x: main_canvas.width / 3, y: main_canvas.height / 7}, 1000, createjs.Ease.getPowInOut(10))
		.to({ alpha: 0}, 500)

	createjs.Tween.get(circle[1], { loop: false, override:true })
		.to({ x: main_canvas.width / 3, y: main_canvas.height / 7}, 1000, createjs.Ease.getPowInOut(10))
		.to({ alpha: 0 }, 500)
		.call(menu)
}

function menu(){ // start the game
	// draw title
		var text = new createjs.Text('Follow the cursor', "bold 96px Courier New", "#000");
		text.x = main_canvas.width / 2;
		text.y = main_canvas.height / 3;
		text.textBaseline = "bottom";
		text.textAlign = "center";
		stage.addChild(text);
	// create buttons
		rect = new createjs.Shape();
		rect.y = 50; 																	// size of the first button
		rect.x = 300;
		rect.ypos =  main_canvas.height / 2 - rect.y;									// position ot the first button
		rect.xpos = main_canvas.width / 2 - rect.x * 1.5;
		rect.graphics.beginFill("#000").rect( rect.xpos, rect.ypos, rect.x, rect.y);
		createjs.Tween.get(rect, { loop: true, override:true })
			.to({ alpha: 0.8 }, 1500)
			.to({ alpha: 1 }, 1500)
		stage.addChild(rect);
	// draw text on button
		var button_text = new createjs.Text('Start', "40px Courier New", "#0f6");
		button_text.x = rect.xpos + rect.x * 1.50;
		button_text.y = rect.ypos + rect.y + 5;
		button_text.textAlign = "center";
	
	rect.addEventListener("click", handleClick)
	button_text.addEventListener("click", handleClick);
 	function handleClick(event) {
 	    start( 16 )
 	}
	
	stage.addChild(button_text);
}

function clear(){
	bg = new createjs.Shape();
	bg.graphics.beginFill("#fff").rect( 0, 0, main_canvas.width, main_canvas.height);
	stage.addChild(bg);
}

var isEven = function(someNumber){
	return (someNumber%2 == 0) ? true : false;
};

function start( box_size ){
	clear();
	box = new Array();
	size_adder = 10;
	for (var i = 1; i >= 0; i--) {
		if ( isEven( i ))
			spawn(i, box_size + size_adder * i, '#000');
		else
			spawn(i, box_size + size_adder * i, '#0f6');
	};
}

function spawn(number, size, color){
	// drawing of the box
	console.log('added number: ' + number )
	box[number] = new createjs.Shape();
	box[number].graphics.beginFill( color ).drawCircle(0, 0, size);
	box[number].size = size;
	box[number].x = main_canvas.width / 2;
	box[number].y = main_canvas.height / 2;
	stage.addChild(box[number]);

	// variables
	

	//main loop
	createjs.Ticker.addEventListener("tick", handleTick); // execute every tick
 	function handleTick(event) {
		physics(number, size);
	}
}

function physics(number, size){
	// local variables for calculating physics
	var speed = 5;
	var mousepower = 0.75;
	knockback = -0.5;

	// use if (cy > box[number].y - box[number].size && cy < box[number].y + box[number].size * 2)
	// to find out if the mouse.y is hovering over the box[number].y

		createjs.Tween.get(box[number], { loop: false, override:true })
			.to({ x: cx, y: cy}, 100 * number, createjs.Ease.getPowInOut(0))
}

function loop(){ // refresh the screen
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
}