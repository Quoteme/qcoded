<?php
echo '<div id="chat-group">';
	echo 'AJAX: Yes';
	echo '<br>';
	echo '$_GET: ';
	if ($_GET['test'] == 'true'){
		echo 'Yes';
	}else{
		echo '<span id="warning">';
		echo 'no';
		echo '<br>';
		echo 'expected value: true';
		echo '$_Get["test"] retured: ' . $_GET['test'];
		echo '</span>';
	}
	echo '<br>';
	echo 'Your name is: '	. $_GET['name'] .	'<br>';
	echo 'Your gender is: '	. $_GET['gender'] .	'<br>';
	echo 'AI name is: '		. $_GET['ainame'] .	'<br>';
	echo 'AI gender is: '	. $_GET['aigender'].'<br>';
echo '</div>';
echo '--- Finished ---';
echo '<div id="chat-group">';
	echo 'Booting AI-Brain now...';
	echo '<br><span id="warning">That\' all folks. Will work on it later...</span>';
echo '</div>'
?>
