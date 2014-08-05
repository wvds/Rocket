// Browserify Requirements
var $ = require('jquery');

// DOM Loaded
$(function() {
	
	// TODO: Depending on support, do stuff
	var dragdrop = new DragDrop(),
		support = new Support();
	
	dragdrop._init(support.prefix.transform());

});