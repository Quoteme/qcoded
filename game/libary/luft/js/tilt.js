if(navigator.userAgent.match(/iPad/i)		||
	navigator.userAgent.match(/iPhone/i)	||
	navigator.userAgent.match(/Android/i)	||
	navigator.userAgent.match(/BlackBerry/i)||
	navigator.userAgent.match(/webOS/i)){

	console.log('mobile device detected! Loading tilt.js');

	use_tilt = true;

	if(window.DeviceOrientationEvent){
		window.addEventListener('deviceorientation', function(eventData) {
			// gamma is the left-to-right tilt in degrees, where right is positive
			tiltLR = eventData.gamma;

			// beta is the front-to-back tilt in degrees, where front is positive
			tiltFB = eventData.beta;

			// alpha is the compass direction the device is facing in degrees
			dir = eventData.alpha

		}, false);
	} else {
		console.log('no tilt available on your device...');
		use_tilt = false;
	}
} else {
	console.log('no mobile device. Loading default options.')
	use_tilt = false;
}
