function drawError () {
	var container = document.getElementById('ajax');
	container.innerHTML = 'Error: AJAX failed<br><br>The PHP file might be corrupted/malfunctional / The server melted.';
}
	// handles the response, adds the html
function drawOutput(responseText, refresh) {
	var container = document.getElementById('ajax');
	if (refresh == true)
		container.innerHTML = responseText;
	else
		container.innerHTML = container.innerHTML + responseText;

	if (use_tilt){
		document.getElementById('tilt_message').innerHTML = 'You see the mobile page. You might need to reload the game up to 3 times, because it still has some bugs.';
	} else {
		document.getElementById('tilt_message').innerHTML = 'You see the default desktop page.';
	}
}
function getRequest(url, params, success, error) {
	var req = false;
	try{
		// most browsers
		req = new XMLHttpRequest();
	} catch (e){
		// IE
		try{
			req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			// try an older version
			try{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				return false;
			}
		}
	}
	if (!req) return false;
	if (typeof success != 'function') success = function () {};
	if (typeof error!= 'function') error = function () {};
	req.onreadystatechange = function(){
		if(req.readyState == 4) {
			return req.status === 200 ?
			success(req.responseText) : error(req.status);
		}
	}
	req.open("GET", url+"?"+params, true);
	req.send(null);
	return req;
}
