'use strict';
// Browserify Requirements
var $ = require('jquery');
require('jquery-ui');
//var FTScroller = require('ftscroller');

// DOM Loaded
$(function() {
	
	
	var container = document.getElementById('panels'),
		scroller = new FTScroller(container, {
			scrollingY: false,
			snapping: true,
			paginatedSnap: true,
			scrollbars: false,
			bouncing: false
		});
	
	/*$('#config').resizable({
		ghost: true,
		handles: "e, w"
	});
	Docs:
	http://api.jqueryui.com/resizable/
	http://viralpatel.net/blogs/jquery-resizable-draggable-resize-drag-tutorial-example/
	*/
	
	//$('#inspector').draggable();
});