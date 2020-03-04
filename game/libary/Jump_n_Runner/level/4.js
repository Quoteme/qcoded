game.world.setBounds(0, 0, canvas_x + 300, canvas_y + 300);
define_player_location = true;
player_start_x		= 0;
player_start_y		= game.world.height - tile_size * 5.7;
jetpack_fuel = 100;
use_windmill = false;
use_title = false;
default_bottom = false;

//create level
border_lr 		= 5;
border_left		= 0;
border_top		= game.world.height - tile_size * 2.7;

//starting platfom
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		ledge = platforms.create( border_left + (tile_size * border_lr) * i,  border_top + tile_size * 0.9 * j, 'ground');
		ledge.body.immovable = true;
	}
	for (var j = 2 - i; j >= 0; j--) {
		ledge = platforms.create( border_left + tile_size * 0.9 + (tile_size * border_lr) * i  + tile_size * 0.9 * j, border_top, 'ground');
		ledge.body.immovable = true;
	}
}

//fuel
fuel = fuel.create(border_left + tile_size * border_lr + tile_size, border_top - tile_size * 0.69, 'fuel');
fuel.body.immovable = true;

//deco platfom
sign = decoration.create(border_left + tile_size * border_lr * 3 - tile_size * 4.5, game.world.height - tile_size * 4.14, 'signr');
sign.body.immovable = true;

//deco ground support
for (var i = 0; i < 5; i++) {
	ground = platforms.create(0 - (tile_size * 4) * i, tile_size * (9 + i), 'bottom');
	ground.body.immovable = true;
}

//deco forest
for (var i = 0; i < 8; i++) {
	tree = decoration.create( tile_size * (Math.random() * 4) * i, tile_size * 6, 'tree_spruce');
	tree.body.immovable = true;

	tree = decoration.create( tile_size * (Math.random() * 4) * i, tile_size * 6, 'tree');
	tree.body.immovable = true;

	ledge = platforms.create( (tile_size * (Math.random() * 4)) * i, tile_size * (9 - Math.random() * 0.3) , 'ground');
	ledge.body.immovable = true;
}

//deco waterfall
for (var i = 0; i < 3; i++) {
	c_waterfall( tile_size * 2 + (tile_size * 5) * i - tile_size * i, tile_size * (14 - 0.2), 'both');
}

c_windmill(tile_size * 10, tile_size * 8);

//flag platfom
for (var i = 0; i < 3; i++) {
	carrier = decoration.create( tile_size * 12, tile_size * 8 - tile_size * i, 'carrier');
	carrier.body.immovable = true;
}
c_ground(tile_size * 12, tile_size * 5.1, false);

level_complete = flag_red.create(tile_size * 12 + tile_size / 3, tile_size * 4, 'flag_red');
level_complete.body.immovable = true;
