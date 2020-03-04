console.log('started game');

canvas_x = window.innerWidth;
canvas_y = window.innerHeight;

var game = new Phaser.Game(canvas_x, canvas_y, Phaser.AUTO, '', { preload: preload, create: create, update: update }, false, false);

function preload() {
	game.load.image('bgtile', 'assets/bg.png');
	game.load.image(getUrlVars()['p1'], 'assets/planes/' + getUrlVars()['p1'] + '.png');
	game.load.image('smoke', 'assets/smoke.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	player		= new Array();
	shadow		= new Array();
	height_txt	= new Array();
	speed_txt	= new Array();
	player_txt	= new Array();
	raidar_txt	= new Array();

	if (use_tilt){
		tilt_LR_txt = new Array();
		tilt_FB_txt = new Array();
		tilt_DIR_txt = new Array();
	}

	create_player(3, 200, 0, getUrlVars()['p1']);

	function create_player(life, speed, number, plane){
		game.world.setBounds(0, 0, canvas_x * 5, canvas_y * 5);
		bgtile = game.add.tileSprite(0, 0, game.world.bounds.width, game.world.bounds.width, 'bgtile');

		scale = 2;

		shadow[number] = game.add.sprite(0,0, plane);
		shadow[number].anchor.set(0.5);
		shadow[number].tint = 0x000000;
		shadow[number].alpha = 0.6;
		shadow[number].scale.setTo(scale - 0.5, scale - 0.5);

		player[number] = game.add.sprite(-100,-100, plane);
		player[number].scale.setTo(scale, scale)
		player[number].x = canvas_x / 2;
		player[number].y = canvas_y - canvas_y / 4;
		player[number].anchor.set(0.5);
		player[number].speed = speed;

		game.physics.enable(player[number], Phaser.Physics.ARCADE);

		player[number].body.maxAngular = 100;
		player[number].body.angularDrag = 150;

		player[number].body.collideWorldBounds = true;

		game.camera.follow(player[number]);

		player_txt[number] = game.add.text(250 * number, 0, 'Player: ' + (number + 1), {fill: '#000', font: '18px Impact'});
		player_txt[number].fixedToCamera = true;
		height_txt[number] = game.add.text(250 * number, 20, 'Height: 0km', {fill: '#000', font: '18px Impact'});
		height_txt[number].fixedToCamera = true;
		speed_txt[number] = game.add.text(250 * number, 40, 'Gear: 0', {fill: '#000', font: '18px Impact'});
		speed_txt[number].fixedToCamera = true;
		raidar_txt[number] = game.add.text(250 * number, 60, 'x: 0, y: 0', {fill: '#000', font: '18px Impact'});
		raidar_txt[number].fixedToCamera = true;

		if (use_tilt){
			tilt_LR_txt[number] = game.add.text(250 * number, 80, 'Tilt LR:' + tiltLR, {fill: '#000', font: '18px Impact'});
			tilt_LR_txt[number].fixedToCamera = true;
			tilt_FB_txt[number] = game.add.text(250 * number, 100, 'Tilt FB:' + 1, {fill: '#000', font: '18px Impact'});
			tilt_FB_txt[number].fixedToCamera = true;
			tilt_DIR_txt[number] = game.add.text(250 * number, 120, 'Tilt DIR:' + 1, {fill: '#000', font: '18px Impact'});
			tilt_DIR_txt[number].fixedToCamera = true;
		}

	}

	cursors = game.input.keyboard.createCursorKeys();
	cursors.W = game.input.keyboard.addKey(Phaser.Keyboard.W);

}

function update() {
	for (var i = 0; i < player.length; i++) {
		player[i].body.angularAcceleration = 0;
		player[i].body.velocity.y = 0;
		player[i].body.velocity.x = 0;
		player[i].speed_level = 2;
		shadow[i].x = player[i].x + 10;
		shadow[i].y = player[i].y + 10;
		shadow[i].angle = player[i].angle;

		if (cursors.up.isDown){
			player[i].speed_level = 3;
			game.add.tween(player[i].scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true);
			game.add.tween(shadow[i].scale).to( { x: 2.5, y: 2.5 }, 2000, Phaser.Easing.Linear.None, true);
		}
		else if (cursors.down.isDown){
			player[i].speed_level = 1;
			game.add.tween(player[i].scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true);
			game.add.tween(shadow[i].scale).to( { x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
		} else {
			if (!use_tilt){
				game.add.tween(player[i].scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(shadow[i].scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Linear.None, true);
			}
		}
		if (cursors.left.isDown)
			player[i].body.angularAcceleration -= player[i].speed;

		if (cursors.right.isDown)
			player[i].body.angularAcceleration += player[i].speed;

		if (cursors.W.isDown){
			destroy(player[i]);
			destroy(shadow[i]);
		}

		game.physics.arcade.velocityFromAngle(player[i].angle - 90, player[i].speed * player[i].scale.x, player[i].body.velocity);

		if (use_tilt){
			tilt_LR_txt[i].setText('Tilt LR:' + Math.round(tiltLR));
			tilt_FB_txt[i].setText('Tilt FB:' + Math.round(tiltFB));
			tilt_DIR_txt[i].setText('Tilt DIR:' + Math.round(dir));


			var minimal_distance_LR = 8;
			var minimal_distance_FB = 10;
			var usual_distance_FB	= 60;

			if (tiltLR > minimal_distance_LR)
				player[i].body.angularAcceleration += player[i].speed;
			else if(tiltLR < -minimal_distance_LR)
				player[i].body.angularAcceleration -= player[i].speed;
			else
				player[i].body.angularAcceleration += 0;

			//player[i].body.angularAcceleration = tiltLR * 5;

			if (tiltFB > usual_distance_FB + minimal_distance_FB){
				player[i].speed_level = 1;
				game.add.tween(player[i].scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(shadow[i].scale).to( { x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true);
			} else if(tiltFB <  usual_distance_FB - minimal_distance_FB){
				player[i].speed_level = 3;
				game.add.tween(player[i].scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(shadow[i].scale).to( { x: 2.5, y: 2.5 }, 2000, Phaser.Easing.Linear.None, true);
			} else {
				game.add.tween(player[i].scale).to( { x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
				game.add.tween(shadow[i].scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Linear.None, true);
			}
		}
		height_txt[i].setText("Height: " + Math.round(player[i].scale.x * 10) / 10 + "km");
		speed_txt[i].setText("Gear: " + player[i].speed_level);
		raidar_txt[i].setText("x: " + Math.round(player[i].x) + ", y: " + Math.round(player[i].y));
	}

}

function destroy(objekt){
	var emitter = game.add.emitter(objekt.x, objekt.y, 250);
	emitter.makeParticles('smoke');
	emitter.minParticleSpeed.setTo(-200, -200);
	emitter.maxParticleSpeed.setTo(200, 200);
	emitter.gravity = 0;
	emitter.setScale(scale, -scale, scale, -scale, 100, Phaser.Easing.Quintic.Out);
	emitter.start(true, Math.random() * 1500, null, 20);

	objekt.kill();
}
