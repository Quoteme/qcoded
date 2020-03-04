function c_windmill(left, top){
	use_windmill = true;

	house = decoration.create(left, top - tile_size * 2, 'house');
	house.body.immovable = true;
	door = decoration.create(left + 20, top - 4, 'door');
	door.body.immovable = true;
	windmill = decoration.create(left, top - tile_size * 2, 'windmill');
	windmill.body.immovable = false;
}

function c_waterfall(left, top, border){
	if ( border == 'left' || border == 'both'){
	ledge = platforms.create(left - tile_size, top, 'ground');
	ledge.body.immovable = true;}
	waterfall = decoration.create( left, top, 'waterfall');
	waterfall.body.immovable = true;
	if (border == 'right' || border == 'both'){
	ledge = platforms.create( left + waterfall.width, top, 'ground');
	ledge.body.immovable = true;}
}

function c_ground(left, top, broken){
	if (!broken || broken == null){
		ledge = platforms.create(left, top, 'ground');
		ledge.body.immovable = true;
	}else{
		ledge = platforms.create(left, top, 'ground_broken');
		ledge.body.immovable = false;
	}
}

function c_carrier(left, top){
	ledge = decoration.create(left, top, 'carrier');
	ledge.body.immovable = true;
}

function c_fuel(left, top, amount){
	fuel = fuel.create(left, top, 'fuel');
	fuel.body.immovable = true;
	jetpack_fuel = amount;
}

function c_invert(left, top, emit){
	inv_part.x = left + tile_size / 2;
	inv_part.y = top + tile_size / 2;
	inv_part.start(false, 400, 20);

	invertation_device = inverter.create(left + tile_size * 0.25, top + tile_size * 0.25, 'inv_dev');
	invertation_device.body.immovable = true;

	allow_inversion = true;
}

console.log('\nloaded fast_create.js module');
