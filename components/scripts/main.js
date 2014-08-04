// Browserify Requirements
var $ = require('jquery');

// DOM Loaded
$(function() {
	console.log("Hello World Rocket!");
	
	// Drag & Drop
	var element = document.getElementById('inspector');
	
	element.addEventListener('dragstart', handleDragStart, false);
	element.addEventListener('drag', handleDrag, false);
	
	element.addEventListener('touchstart', handleTouchStart, false);
	element.addEventListener('touchmove', handleTouchMove, false);
	
	//element.addEventListener('dragend', handleDragEnd, false);
	
	
	//dropzone.addEventListener('dragenter', handleDropEvent, false);
	//dropzone.addEventListener('dragleave', handleDropEvent, false);
	document.documentElement.addEventListener('dragover', handleDragOver, false); // Works like the 'drag' event on draggable object
	//dropzone.addEventListener('drop', handleDrop, false);
	
	function handleTouchStart(e) {
		console.log("touched...");
		$('#inspector').addClass('loose');
		console.log("PageX Touch: " + e.touches[0].pageX);
	}
	
	function handleTouchMove(e) {
		console.log("touche moving...");
		/*jshint validthis:true */
		$('#' + this.id).css({
			'top': e.touches[0].pageY,
			'left': e.touches[0].pageX
		});
	}
	
	function handleDragStart(e) {
		var id = this.id;
		$('#inspector').addClass('loose');
		console.log("Drag start with id: " + id);
		console.log("ClientX: " + e.clientX);
	}
	
	function handleDrag(e) {
		$('#' + this.id).css({
			'top': e.clientY,
			'left': e.clientX
		});
	}
	
	function handleDragEnd(e) {
		console.log("Drag end");
	}
	
	function handleDrop(e) {
		if(e.preventDefault) e.preventDefault(); // Firefox sometimes displays the image in a new windows when dropped
		console.log("Drag dropped");
	}
	
	// Neccessary for the drop event to occur!
	function handleDragOver(e) {
		
		//console.log("sup");
		if(e.preventDefault) e.preventDefault();
		return false;
	}
});