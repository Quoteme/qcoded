// set up level world
			game.world.setBounds(0, 0, canvas_x, canvas_y + 100);
			define_player_location = true;
				player_start_x		= 650;
				player_start_y		= game.world.height - tile_size * 3;
			use_windmill = true;
			use_title = false;
		// create level
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 7 - i; j++) { // first mountain
					ledge = platforms.create(0 + 25 * i, game.world.height - tile_size - tile_size - 25 * j, 'ground');//deco platform
					ledge.body.immovable = true;
				}
			}
			for (var i = 0; i < 3; i++) { // create ladder for first mountain
				ledge = platforms.create(90 - tile_size / 2,  game.world.height - 2 * tile_size - tile_size * i - 3 * i, 'ladder');
				ledge.body.immovable = true;
			}
			// ground dekoration
			sign = decoration.create(600, game.world.height - tile_size * 2.5, 'sign');
			sign.body.immovable = true;
			for (var i = 0; i < 3; i++) { // create some hills
				ledge = platforms.create( 300 + 50 * i,  game.world.height - tile_size - 10 * i, 'ground_2');
				ledge.body.immovable = true;
			}
			for (var i = 0; i < 9; i++) { // create grass dekoration
				if (i%3){
					grass = decoration.create(200 + 55 * i, game.world.height - tile_size * 1.5, 'grass');
					grass.body.immovable = true;
				}
			}
			for (var i = 0; i < 16; i++) { // create bridge
				ledge = decoration.create( 200 + 30 * i,  game.world.height - tile_size * 8.5, 'bridge');
				ledge.body.immovable = true;
			}
			for (var i = 0; i < 6; i++) { // first platform
				if ( i < 2) {
					ledge = platforms.create( 130 + 5 * i,  game.world.height - tile_size * 8 + (tile_size * 0.6) * i, 'ground_2');
					ledge.body.immovable = true;
				}else{
					ledge = platforms.create( 200 - 5 * i,  game.world.height - tile_size * 10 + (tile_size * 0.6) * i + 10, 'ground');
					ledge.body.immovable = true;
				}
			}
			// decorations for first platform
				tree = decoration.create(130, game.world.height - tile_size * 11, 'tree_spruce');
				tree.body.immovable = true;
				waterfall = decoration.create(140, game.world.height - tile_size * 7, 'waterfall');
				waterfall.body.immovable = true;

			for (var i = 0; i < 4; i++) { // platform two
				ledge = platforms.create( 480 - i%2 * 30, game.world.height - tile_size * 8.5 + (tile_size * 0.3) * i - (i + 1)%2 * (tile_size * 0.6), 'ground_2');
				ledge.body.immovable = true;
			}
			//decorations of the seconde platform
				tree = decoration.create(480, game.world.height - tile_size * 12, 'tree');
				tree.body.immovable = true;
			for (var j = 0; j < 5; j++) {
				for (var i = 0; i < j + 4; i++) { // mountain
					ledge = platforms.create( 650 + 15 * i + 30 * j, game.world.height - tile_size * 9 + 20 * i, 'ground');
					ledge.body.immovable = true;
				}
			}
			//decorations for mountain
				for (var i = 0; i < 7; i++) { // iron carriers down
					carrier = decoration.create(705, game.world.height - tile_size - tile_size * i, 'carrier');
					carrier.body.immovable = true;
				}
				// iron carriers up
				for (var i = 0; i < 2; i++) {
					carrier = decoration.create(685, game.world.height - tile_size * 10.5 - tile_size * i, 'carrier');
					carrier.body.immovable = true;
				}
				// waterfall next to iron carriers
					waterfall = decoration.create(770, game.world.height - tile_size * 6, 'waterfall');
					waterfall.body.immovable = true;
				// create tree
					tree = decoration.create(750, 418 - tile_size * 3.5, 'tree');
					tree.body.immovable = true;
				// create windmill
					house = decoration.create(650 + tile_size * 2, 415 - tile_size * 3, 'house');
					house.body.immovable = true;
					door = decoration.create(670 + tile_size * 2, 415 - tile_size, 'door');
					door.body.immovable = true;
					windmill = decoration.create(650 + tile_size * 2, 415 - tile_size * 3, 'windmill');
					windmill.body.immovable = false;
				for (var i = 0; i < 2; i++) {// small hills on mountain
					ledge = platforms.create( 650 + tile_size / 3 + (tile_size + 70) * i, game.world.height - tile_size * 9.5, 'ground_2');
					ledge.body.immovable = true;
				}
				// iron carrier platform
				for (var i = 0; i < 3; i++) {
					ledge = platforms.create( 685 - 5 * i, game.world.height - tile_size * 11.8 - (tile_size-5) * i, 'ground');
					ledge.body.immovable = true;
				}
				for (var i = 0; i < 16; i++) { // create bridge
					ledge = decoration.create( 665 - 30 * i,  game.world.height - tile_size * 13, 'bridge');
					ledge.body.immovable = true;
				}
				for (var i = 1; i < 2; i += 0.5) {
					ledge = platforms.create( 665 - 30 * (7*i),  game.world.height - tile_size * 13, 'ground_broken');
					ledge.body.immovable = false;
				}
				for (var i = 0; i < 2; i++) { // create last island
					ledge = platforms.create( 155 - tile_size * i,  game.world.height - tile_size * 13 + (tile_size / 3) * i, 'ground_2');
					ledge.body.immovable = true;
				}
				// last island decoration
					ledge = platforms.create( 170,  game.world.height - tile_size * 12.1, 'ground');
					ledge.body.immovable = true;
					grass = decoration.create(190, game.world.height - tile_size * 13.5, 'grass');
					grass.body.immovable = true;
					fuel = fuel.create(170, game.world.height - tile_size * 13.69, 'fuel');
					fuel.body.immovable = true;
					fuel_text = game.add.text(150, game.world.height- tile_size * 14.7, 'Touch the fuel to load your jetpack\nHold up to use it.', {fill: '#000', font: '12px Arial'}).angle = -6;
					level_complete = flag_red.create(140, game.world.height - tile_size * 13.75, 'flag_red');
					level_complete.body.immovable = true;
