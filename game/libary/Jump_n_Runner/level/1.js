//create map
		game.world.setBounds(0, 0, canvas_x, canvas_y); // set world boundarys
		var ledge = platforms.create(300, 500, 'ground');
		ledge.body.immovable = true;
		tree = decoration.create(500, game.world.height - tile_size * 4, 'tree');
		tree.body.immovable = true;
		tree = decoration.create(30, game.world.height - tile_size * 4, 'tree');
		tree.body.immovable = true;
		ledge = platforms.create(150, 450, 'ground_2');
		ledge.body.immovable = true;
		ledge = platforms.create(330, 420, 'ground_2');
		ledge.body.immovable = true;
		ledge = platforms.create(370, 390, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(500, 380, 'ground_broken');
		ledge.body.immovable = false;
		ledge = platforms.create(600, 350, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(630, 330, 'ground'); //	wall to climbe on
		ledge.body.immovable = true;
		//ledge = platforms.create(630 - tile_size / 2, 315, 'ladder');
		//ledge.body.immovable = true;
		ledge = platforms.create(630, 300, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(630 - tile_size / 2, 280, 'ladder');
		ledge.body.immovable = true;
		ledge = platforms.create(630, 270, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(630 - tile_size / 2, 245, 'ladder');
		ledge.body.immovable = true;
		ledge = platforms.create(630, 240, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(630 - tile_size / 2, 210, 'ladder');
		ledge.body.immovable = true;
		ledge = platforms.create(630, 210, 'ground');
		ledge.body.immovable = true;
		tree = decoration.create(620, 211 - tile_size * 3, 'tree');
		tree.body.immovable = true;
		ledge = platforms.create(660, 200, 'ground'); //	end of climbing wall
		ledge.body.immovable = true;
		waterfall = decoration.create(660, 230, 'waterfall');
		waterfall.body.immovable = true;
		for (var i = 0; i < 16; i++) {
			bridge = decoration.create(600 - 30 * i, 220, 'bridge');
			bridge.body.immovable = false;
		}
		ledge = platforms.create(600 - 30 * 16, 220, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(600 - 30 * 16 - 15, 195, 'ground');
		ledge.body.immovable = true;
		for (var i = 0; i < 10; i++) {
			if (i % 2 == 0){
				ledge = platforms.create(450 - 30 * i, 220, 'ground_broken');
				ledge.body.immovable = false;
			}
		}
		ledge = platforms.create(100, 170, 'ground_2');
		ledge.body.immovable = true;
		level_complete = flag_red.create(115, 135, 'flag_red');
		level_complete.body.immovable = true;
		retry_text = game.add.text(50, game.world.height / 2, 'reload the page\nto retry the level.', {fill: '#000', font: '20px Arial'}).angle = -3;
		define_player_location = false; //default player location
