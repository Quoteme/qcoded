levelprompt = 0;
game.world.setBounds(0, 0, canvas_x, canvas_y); // set world boundarys
level_complete = flag_red.create(game.world.width / 2 - tile_size / 2, game.world.height - tile_size * 2 - 4, 'flag_red');
level_complete.body.immovable = true;
tree_pos = [ 100, 120, 160, 250];
for (var i = 0; i < tree_pos.length; i++) {
	tree = decoration.create(tree_pos[i], game.world.height - tile_size * 4, 'tree');
	tree.body.immovable = true;
}
tree = decoration.create(600, game.world.height - tile_size * 4.7, 'tree');
tree.body.immovable = true;

move_text = game.add.text(120, game.world.height- tile_size * 3.3, 'Move using the\narrow keys', {fill: '#000', font: '12px Arial'}).angle = -6;
flag_red_text = game.add.text(game.world.width / 2 - 70, game.world.height- tile_size * 4, 'Get to the red flag!', {fill: '#000', font: '14px Arial'}).angle = -2;

update_log = game.add.text(game.world.width / 4 * 3, game.world.height * 0.35, 'v. 0.3\n\n- Currently 5 levels\n- Inverter added\n- Own nevels soon', {fill: '#000', font: '14px Arial'});

ledge = platforms.create(600 - tile_size / 4, game.world.height - tile_size * 1.7, 'ground_2');
ledge.body.immovable = true;
title = decoration.create(game.world.width / 2,100, 'title');
title.anchor.setTo(0.5, 0);
title.body.immovable = true;
define_player_location = false; //default player location
use_title = true;
