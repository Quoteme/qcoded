game.world.setBounds(0, 0, canvas_x, canvas_y);
define_player_location = true;
player_start_x		= tile_size;
player_start_y		= tile_size * 2;
use_windmill = false;
use_title = false;
default_bottom = false;

for (var j = 0; j < 4; j++) {
	for (var i = 0; i <= 5 - j * 1.5; i++) {
		c_ground( i * tile_size - 3 * i, tile_size * (4 + j) - j * 3, false);
	}
}

c_invert(tile_size * 3, tile_size * 3);

for (var i = 0; i < game.world.height / tile_size; i++) {
	c_carrier( 0.5 * tile_size, 5.5 * tile_size + tile_size * i);
	c_carrier( 4 * tile_size, 4.5 * tile_size + tile_size * i);
}

ball_text = game.add.text(tile_size * 1.5, tile_size * 1.5, 'These spheres allow you to change your velocity.\nUse down while falling, and you should go up again.', {fill: '#000', font: '12px Arial'}).angle = 2;

for (var j = 0; j < game.world.height / tile_size; j++) {
	for (var i = 0; i < 7 - j; i++) {
		c_ground(game.world.width - i * tile_size + j * 0.3 * tile_size + 3 * i, tile_size * 5 + tile_size * j - 5 * j, false);
	}
}
