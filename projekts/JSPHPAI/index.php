<!DOCTYPE HTML>
<html>
<head>
	<title>JS-PHP AI</title>
		<meta charset="utf-8">

		<!-- JavaScript -->
		<script type="text/javascript" src="js/sessvars.js"></script>
			<!-- load js basic functions -->
				<script charset="utf-8">

				//  --- URLVarsJS implementation ---  //
					// change css
					function getUrlVars() {
						var vars = {};
						var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
							vars[key] = value
						});
						return vars;

						//currently used url-vars
						/*
						?style	=	light | dark = default
						*/
					}

				//  --- Styling ---  //

					function change_style() {
						var style_select = document.getElementById("style_select");
						var style = style_select.options[style_select.selectedIndex].value;
						load_theme(style);
						console.log('loaded style');
					}

					function load_theme(theme) {
						if( theme == 'dark'){
							link = document.createElement( "link" );
							link.href = 'css/dark.css';
							link.type = "text/css";
							link.rel = "stylesheet";
							link.media = "screen,print";
							document.getElementsByTagName( "head" )[0].appendChild( link );
						}else{
							link = document.createElement( "link" );
							link.href = 'css/light.css';
							link.type = "text/css";
							link.rel = "stylesheet";
							link.media = "screen,print";
							document.getElementsByTagName( "head" )[0].appendChild( link );
						}
						sessvars.theme = theme;
					}

					function show_hide_element(elem){
						element = document.getElementById(elem);

						if (element.style.display == 'inline')
							element.style.display = 'none';
						else
							element.style.display = 'inline'
					}


				//  --- AJAX ---  //
					// handles drawing an error message
					function drawError () {
						var container = document.getElementById('chat');
						container.innerHTML = 'Error: AJAX failed<br><br>The PHP file might be corrupted/malfunctional / The server melted.';
					}
					// handles the response, adds the html
					function drawOutput(responseText, refresh) {
						var container = document.getElementById('chat');
						if (refresh == true)
							container.innerHTML = responseText;
						else
							container.innerHTML = container.innerHTML + responseText;
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

					//  --- before chat ---  //
						function store_vars_user(first, second){
							name = document.getElementById(first).value;
							gender = document.getElementById(second).value;
						}

						function store_vars_ai(first, second){
							ainame = document.getElementById(first).value;
							aigender = document.getElementById(second).value;
						}

						function init_ui(){
							show_hide_element('input');
							drawOutput('--- UI --- <br> <span id="chat-group">loaded and printing to screen</span>', true);
						}

					//  --- Chat ---  //

						function start_chat(){
							drawOutput('Boot Up Chat, pretty busy');
							init_ui();
							drawOutput('<br>--- Ajax Test ---<br>(This may take a few seconds)<div id="chat-group">', false);
							getRequest(
								'php/test.php',
								"test=true&name="+name+"&gender="+gender+"&ainame="+ainame+"&aigender="+aigender,
								drawOutput,
								drawError
							);
						}

				</script>

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="css/main.css">
			<?php
				if( $_GET['style'] == 'dark')
					echo '<link rel="stylesheet" type="text/css" href="css/dark.css">';
				else
					echo '<link rel="stylesheet" type="text/css" href="css/light.css">';
			?>
			<script charset="utf-8">
				load_theme(sessvars.theme);
			</script>

	</head>
	<body>
		<div id='title'>
			JS-PHP AI
		</div>

		<div id='input_info'>
			Name: <input id='name' type="text" name="name" value="enter your name" class='perso_info'>
			<br>
			Gender: <select id='gender' name='gender'><option value='male'>male</option><option value='female'>female</option></select>
			<br><br>
			<input type="button" name="log-in" value="Next" onclick='store_vars_user("name", "gender"); this.parentNode.parentNode.removeChild(parentNode); document.getElementById("aiinput_info").style.display = "block";'>
		</div>
		<div id='aiinput_info'>
			AIName: <input id='ainame' type="text" name="ainame" value="enter ai's name" class='perso_info'>
			<br>
			AIGender: <select id='aigender' name='aigender'><option value='female'>female</option><option value='male'>male</option></select>
			<br><br>
			<input type="button" name="log-in" value="Log In" onclick='store_vars_ai("ainame", "aigender"); this.parentNode.parentNode.removeChild(parentNode); start_chat();'>
		</div>

		<div id='chat-room'>
			<div id='chat'></div>
			<textarea type="text" name="input" value="" id='input'></textarea>
		</div><!-- This is where the magic happens -->

		<div id='options'>
			<span id='settings'>
				<input type="button" name="reset" value="reset" onclick='sessvars.$.clearMem(); location.href = location.href'>
				<select id='style_select' onchange="change_style();">
					<option value='light'>light</option>
					<option value='dark'>dark</option>
				</select>
			</span>
			<span aria-hidden="true" data-icon="&#9881;" id='settings_img' onclick='show_hide_element("settings");'></span>
		</div>
	</body>
</html>
