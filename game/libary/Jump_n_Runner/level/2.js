game.world.setBounds(0, 0, canvas_x + 200, canvas_y); // set world boundarys
		for (var i = 0; i < 6; i++) {
			ledge = platforms.create(tile_size * 4, game.world.height - tile_size * i * 0.9, 'ground');
			ledge.body.immovable = true;
		}
		for (var i = 0; i < 2; i++) {
			ledge = platforms.create(tile_size * 4 - tile_size / 2, game.world.height - tile_size * i - tile_size * 3 - 8 * i, 'ladder');
			ledge.body.immovable = true;
		}
		ledge = platforms.create(tile_size * 4.7, game.world.height - tile_size * 5, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(180, game.world.height - tile_size * 1.7, 'ground_2');
		ledge.body.immovable = true;
		ledge = platforms.create(190, game.world.height - tile_size * 2.5, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(190, game.world.height - tile_size * 2.8, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(530, game.world.height - tile_size * 1.3, 'ground_2');
		ledge.body.immovable = true;
		for (var i = 0; i < 6; i++) {
			if (i%2 == 0){
				ledge = platforms.create(270 - 15*i, 432 + 34 * i, 'ground');
				ledge.body.immovable = true;
			}
		}
		for (var i = 0; i < 8; i++) {
			ledge = decoration.create( 240, 530 + 30 * i, 'carrier');
			ledge.body.immovable = true;
		}
		ledge = platforms.create(105, 360, 'ground_2');
		ledge.body.immovable = true;
		for (var i = 0; i < 13; i++) {
			carrier = decoration.create(115, 390 + 30 * i, 'carrier');
			carrier.body.immovable = true;
		}
		house = decoration.create(105, 360 - tile_size * 3, 'house');
		house.body.immovable = true;
		door = decoration.create(125, 360 - tile_size, 'door');
		door.body.immovable = true;
		windmill = decoration.create(105, 360 - tile_size * 3, 'windmill');
		windmill.body.immovable = false;
		for (var i = 0; i < 5; i++) {
			ledge = decoration.create(165 + 30 * i, 360, 'bridge');
			ledge.body.immovable = true;
		}
		waterfall = decoration.create(379, 360, 'waterfall');
		waterfall.body.immovable = true;
		waterfall = decoration.create(390, 372, 'waterfall');
		waterfall.body.immovable = true;
		waterfall = decoration.create(400, 350, 'waterfall');
		waterfall.body.immovable = true;
		grass = decoration.create(500, game.world.height - tile_size * 1.5, 'grass');
		grass.body.immovable = true;
		ledge = platforms.create(315, 360, 'ground_2');
		ledge.body.immovable = true;
		tree = decoration.create(320, 360 - tile_size * 3, 'tree');
		tree.body.immovable = true;
		ledge = platforms.create(355, 340, 'ground_2');
		ledge.body.immovable = true;
		grass = decoration.create(395, 373 - tile_size * 1.5, 'grass');
		grass.body.immovable = true;
		ledge = platforms.create(410, 355, 'ground');
		ledge.body.immovable = true;
		for (var i = 0; i < 14; i++) {
			ledge = decoration.create(410 + 30 * i, 355, 'bridge');
			ledge.body.immovable = true;
		}
		ledge = platforms.create(410 + 30 * 5, 355, 'ground_broken');
		ledge.body.immovable = false;
		ledge = platforms.create(710, 355, 'ground_2');
		ledge.body.immovable = true;
		for (var i = 0; i < 14; i++) {
			ledge = decoration.create(710 + tile_size / 2, 355 + tile_size + 30 * i, 'carrier');
			ledge.body.immovable = true;
		}
		ledge = platforms.create(830, 355, 'ground_2');
		ledge.body.immovable = true;
		ledge = platforms.create(640, tile_size * 5, 'ground_2');//deco platform
		ledge.body.immovable = true;
		ledge = platforms.create(600, tile_size * 5 - 20, 'ground_2');
		ledge.body.immovable = true;
		waterfall = decoration.create(620, tile_size * 5 , 'waterfall');
		waterfall.body.immovable = true;
		tree = decoration.create(650, tile_size * 2, 'tree');
		tree.body.immovable = true;
		grass = decoration.create(845, 380 - tile_size * 1.2, 'grass');
		grass.body.immovable = true;
		tree = decoration.create(855, game.world.height - tile_size * 4, 'tree');
		tree.body.immovable = true;
		tree = decoration.create(810, game.world.height - tile_size * 4, 'tree');
		tree.body.immovable = true;
		for (j = 0; j < 5; j++) {
			for (i = 0; i < 9; i++) {
				ledge = platforms.create(845 + i%2 * 10 + 15 * i + 25 * j, 380 + 20 * i - 25 * j, 'ground_2');
				ledge.body.immovable = true;
			}
		}
		house = decoration.create(945, 280 - tile_size * 3, 'house');
		house.body.immovable = true;
		door = decoration.create(975, 280 - tile_size, 'door');
		door.body.immovable = true;
		level_complete = flag_red.create(965, 280 - 36, 'flag_red');
		level_complete.body.immovable = true;
		share_text	= game.add.text(100, 100, 'share levels by copying the URL.', {fill: '#000', font: '30px Arial'}).angle = -7;

		//level building vars
		use_windmill = true;
		define_player_location = false;//default player location
