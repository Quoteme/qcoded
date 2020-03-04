if (getUrlVars()['p1'] == undefined){
	getRequest(
		'php/settings.php',
		"",
		drawOutput,
		drawError
	);
}else{
	loadScript('game.js', 'killthedevil()');
	function killthedevil(){};
}
