function changeFunc() {
	selectBox = document.getElementById("selectBox");
	selectedValue = selectBox.options[selectBox.selectedIndex].value;
	document.getElementById('preview').src = 'assets/planes/' + selectedValue + '.png';
}
