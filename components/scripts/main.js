// Browserify Requirements
var $ = require('jquery');

// DOM Loaded
$(function() {
	
	// TODO: Depending on support, do stuff
	var dragdrop = new DragDrop(),
		support = new Support();
	
	dragdrop._init(support.prefix.transform());

});


// Dock control
$(document).on('click', '.btn-dock', function(e) {
    if(e.preventDefault) e.preventDefault();

    var el = $(this).parent('.dock');

    el.attr('data-state', 
        el.attr('data-state') === 'expanded' ? 'collapsed' : 'expanded');

    return false;
});

// Panel control
$(document).on('click', '#btn-style-add', function(e) {
    if(e.preventDefault) e.preventDefault();
    
    
    
    return false;
});