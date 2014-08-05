var DragDrop = function() {
	
	var el = null,
		rect = null,
		prefix = null,
		prevX = 0,
		prevY = 0,
		offsetX = null,
		offsetY = null,
		transX = 0,
		transY = 0;
	
	this._init = function(vendor) {
		
		// Get vendor prefix for transform on drag
		prefix = vendor;
		
		// Listen for all 'draggable' elements
		el = document.getElementById('inspector');

		el.addEventListener('dragstart', drag_start, false);
		//el.addEventListener('drag', drag, false);
		el.addEventListener('dragend', drag_end, false);

		document.addEventListener('touchstart', touch_start, false);
		el.addEventListener('touchmove', touch_move, false);
		el.addEventListener('touchend', touch_end, false);
		el.addEventListener('touchcancel', touch_cancel, false);
		
		//document.addEventListener('touchstart', function() {
			// This event is needed for Chrome 36.0.19585.131 on Galaxy Tab 3
		//}, false);

		//dropzone.addEventListener('dragenter', handleDropEvent, false);
		//dropzone.addEventListener('dragleave', handleDropEvent, false);
		document.documentElement.addEventListener('dragover', drag_over, false); // Works like the 'drag' event on draggable object
		document.addEventListener('drop', drop, false);
	};
	
	function drag_start(e) {
		// Use 'text' for IE 11 to work properly
		e.dataTransfer.setData('text', this.innerHTML);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
		
		config(false, e);
	}

	function drag(e) {
		console.log("dragging...");
	}

	function drag_end(e) {
		done();
	}
	
	function drag_over(e) {
		if(e.preventDefault) e.preventDefault();
		
		update(e.clientX, e.clientY);
		
		return false;
	}
	
	function drop(e) {
		// Prevent Firefox from redirecting on drop
		if(e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
		
		// e.dataTransfer.getData('text/html');
		
		console.log("dropping...");
	}
	
	// Touch Environment
	function touch_start(e) {
		if(e.preventDefault) e.preventDefault();
		
		// Only allow 'draggable' elements
		if(!e.target.hasAttribute('draggable')) return;

		config(true, e);
		
		return false;
	}

	function touch_move(e) {
		if(e.preventDefault) e.preventDefault();

		update(e.touches[0].clientX, e.touches[0].clientY);
		
		return false;
	}
	
	function touch_end(e) {
		done();
	}
	
	function touch_cancel(e) {
		console.log("cancelled...");
	}
	
	function config(touch, e) {
		el = document.getElementById(e.target.id);
		
		rect = el.getBoundingClientRect();
		el.classList.add('drag');
		
		if(!touch) {
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
		} else {
			offsetX = e.touches[0].clientX - rect.left;
			offsetY = e.touches[0].clientY - rect.top;
		}

		//e.dataTransfer.setDragImage(null, 0, 0);
	}
	
	function update(x, y) {
		// Calculate current drag distance
		transX = x - offsetX - rect.left;
		transY = y - offsetY - rect.top;
		
		// Assign new 3d position to dragged element
		el.style[prefix] = 'translate3d(' + (prevX + transX) + 'px,' + (prevY + transY) + 'px,0)';
	}
	
	function done() {
		// Update new position of dropped element
		prevX += transX;
		prevY += transY;
	}
};