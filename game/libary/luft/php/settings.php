<?php

	$characters = array(
		'de',
		'fr',
		'jp',
		'na',
		'su',
		'us',
	);

	echo '<div id="main">';
		echo '<div id="header">';
			echo 'Luftkrieg';
		echo '</div>';
		echo 'Enter a nickname:';
		echo '<input type="text" name="nick" value="nick"><br><br>';
		echo 'Select a skin:';
		echo '<select id="selectBox" onchange="changeFunc();">';
			for ($i=0; $i < count($characters); $i++) {
				echo '<option value="' . $characters[$i] . '">' . $characters[$i] . '</option>';
			}
		echo '</select>';
		echo '<br><br>Preview:<div id="prev_box"><img src="assets/planes/de.png" id="preview"></div>';
		echo '<button id="play" onclick="location.href = location.href + &quot;?p1=&quot; + document.getElementById(&quot;selectBox&quot;).value">Play</button>';
		echo '<br><br><br><div id="tilt_message"></div>';
	echo '</div>';
?>
