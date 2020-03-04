function init(){
	// get canvas
		main_canvas = document.getElementById('main_canvas');

	// change size of the canvas to fill screen
		main_canvas.width = window.innerWidth;
		main_canvas.height = window.innerHeight;

	// message the width / height
		console.log(main_canvas.width);
		console.log(main_canvas.height);

	// load assets
		// files to load
			manifest = [
		{src: "bike.jpg", id: "bike"}
			];
		// start loadqueue
			loader = new createjs.LoadQueue(false);
			loader.addEventListener("complete", handleComplete);
			loader.loadManifest(manifest, true, "assets/");

	// create stage to manipulate canvas indirectly
		stage = new createjs.Stage(main_canvas);
		stage.snapToPixelEnabled = true;

	// start dank loop
		loop();
}

function handleComplete(){
	// loading finished message
		console.log('finished loading');

	// create elements
		bike = new createjs.Bitmap(loader.getResult("bike"));

	// move dank elements
		createjs.Tween.get(bike, { loop: true })
			.to({ x: - 600, y: 300}, 0)
			.to({ x: main_canvas.width }, 2000)
			.to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2));

	// add dank elements to the stage
		stage.addChild(bike);

	circle = new Array();
	for (var i = 0; i < 25; i++) {
		// create him
			circle[i] = new createjs.Shape();
			circle[i].graphics.beginFill('#ffffff').drawCircle(0, 0, 3);
			circle[i].x = Math.random() * 150 * i + 1;
			circle[i].y = Math.random() * 400;
		// tween this little guy
			createjs.Tween.get(circle[i], { loop: true })
				.to({ alpha: 0}, Math.random() * 300 + 200)
				.to({ alpha: 1}, Math.random() * 300 + 200);
		// add him to stage
			stage.addChild(circle[i]);
	}
}

function loop(){ // refresh the screen
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
}
