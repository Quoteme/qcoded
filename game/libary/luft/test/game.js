canvas_x = window.innerWidth;
canvas_y = window.innerHeight;

var game = new Phaser.Game(canvas_x, canvas_y, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

function preload() {
	game.load.image('tech', 'assets/tech.png');
	game.load.image('plane1', 'assets/plane1.png');
	game.load.image('plane2', 'assets/plane2.png');
	game.load.image('plane3', 'assets/plane3.png');
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	tintbg();
	function tintbg (){
		tech = new Array();
		tech2 = new Array();
		for (var i = 1; i <= 2; i++) {
			tech[i] = game.add.sprite(game.world.centerX - canvas_x / 2, game.world.centerY, 'tech');
			tech[i].anchor.set(0.5);
			tech[i].scale.setTo(canvas_x / tech[i].width, canvas_x / tech[i].width);
			tech2[i] = game.add.sprite(game.world.centerX + canvas_x / 2, game.world.centerY, 'tech');
			tech2[i].anchor.set(0.5);
			tech2[i].scale.setTo(canvas_x / tech2[i].width, canvas_x / tech2[i].width);
		}
		for (var i = 1; i < tech.length; i++) {
			tech[i].y = 0 - tech[1].height / 2 * (i - 1);
		}
		for (var i = 1; i < tech2.length; i++) {
			tech2[i].y = 0 - tech2[1].height / 2 * (i - 1);
		}

		game.time.events.loop(Phaser.Timer.SECOND / 10, changeTint, this);
		function changeTint(){
			tech[1].tint = Math.random() * 0xffffff;
			for (var i = 2; i < tech.length; i++) {
				tech[i].tint = tech[1].tint;
			}
			tech2[1].tint = tech[1].tint;
			tech2[2].tint = tech[1].tint;
		}
	}

	create_player(3, 150);

	function create_player(life, speed){
		player = game.add.sprite(-100,-100, 'plane1');
		player.scale.setTo(canvas_x / 300, canvas_x / 300)
		player.x = canvas_x / 2;
		player.y = canvas_y - canvas_y / 4;
		player.anchor.set(0.5);
		player.speed = speed;

		game.physics.enable(player, Phaser.Physics.ARCADE);

		player.body.maxAngular = 300;
		player.body.angularDrag = 150;

		player.body.collideWorldBounds = true;

		game.world.setBounds(-canvas_x / 2, 0, canvas_x * 2, canvas_y);
		game.camera.follow(player);
	}

	cursors = game.input.keyboard.createCursorKeys();
}

function update() {

	for (var i = 1; i < tech.length; i++) {
		move_bg(i);
		move_bg2(i);
	}

	function move_bg(number){
		tech[number].y += 1;
		if (tech[number].y > tech[number].height)
			tech[number].y = 0 - tech[number].height/2;
	}
	function move_bg2(number){
		tech2[number].y += 1;
		if (tech2[number].y > tech2[number].height)
			tech2[number].y = 0 - tech2[number].height/2;
	}

	player.body.angularAcceleration = 0;
	player.body.velocity.y = 0;
	player.body.velocity.x = 0;

	if (cursors.up.isDown)
		game.physics.arcade.velocityFromAngle(player.angle - 90, player.speed, player.body.velocity);

	if (cursors.down.isDown)
		game.physics.arcade.velocityFromAngle(player.angle + 90, player.speed, player.body.velocity);

	if (cursors.left.isDown)
		player.body.angularAcceleration -= player.speed;

	if (cursors.right.isDown)
		player.body.angularAcceleration += player.speed;

	game.physics.arcade.velocityFromAngle(player.angle - 90, player.speed, player.body.velocity);
}
