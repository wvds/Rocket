var DragDrop = function() {
	
	var el = null,
        id = null,
		rect = null,
		prefix = null,
        prevState = null,
        dropzone = null,
		offsetX = null,
		offsetY = null,
        isEmpty = false,
        dock = null,
        gui = {};

	
	this._init = function (vendor) {
		
		// Get vendor prefix for transform on drag
		prefix = vendor;
		
		// Listen for all 'draggable' elements
		//el = document.getElementById('panel-style');

        var setElem = document.getElementById('panel-style');
        
        dropzone = document.getElementById('dock-left');
        dropzone.addEventListener('dragover', drag_over_dropzone, false);
        dropzone.addEventListener('dragenter', drag_enter, false);
        dropzone.addEventListener('dragleave', drag_leave, false);
        
		setElem.addEventListener('dragstart', drag_start, false);
		setElem.addEventListener('dragend', drag_end, false);
		setElem.addEventListener('touchmove', touch_move, false);
		setElem.addEventListener('touchend', touch_end, false);
		setElem.addEventListener('touchcancel', touch_cancel, false);
        
        document.addEventListener('touchstart', touch_start, false);
		document.documentElement.addEventListener('dragover', drag_over, false); 
		document.addEventListener('drop', drop, false);
	};
	
	function drag_start(e) {
		// Use 'text' for IE 11 to work properly
		e.dataTransfer.setData('text', this.innerHTML);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
        
		on_drag_start(false, e);
	}

    function drag_over(e) {
		if(e.preventDefault) e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();
        
		on_drag(e.clientX, e.clientY);
		el.style.pointerEvents = 'none';
        
		return false;
	}
    
    function drag_over_dropzone(e) {

    }
    
	function drag_end(e) {
        console.log("dragend..");
	}
    
    function drag_enter(e) {
        
        if(prevState === null) {
            prevState = dock.dataset.state;
        }

        // Expand dock if empty
        if(dock.dataset.state === 'collapsed') {
           dock.dataset.state = 'expanded';
        }
    }
    
    function drag_leave(e) {
        // Collapse dock if empty
        if(isEmpty || prevState === 'collapsed') {
            dock.dataset.state = 'collapsed';
        }
    }
	
	function drop(e) {
		// Prevent Firefox from redirecting on drop
		if(e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
        
        /* 
        // Use the 'done' function here instead of on the dragend event,
        // because the event.target in this 'drop' function is the dragged
        // dropzone (instead of the dragged element itself), 
        // which we need to identify a valid dropzone.
        */

        on_drop(false, e);

		// e.dataTransfer.getData('text/html');
	}
	
	// Touch Environment
	function touch_start(e) {
		//if(e.preventDefault) e.preventDefault();
		
		// Only allow 'draggable' elements
		if(e.target.getAttribute('draggable') !== 'true') return;

		on_drag_start(true, e);
		
		return false;
	}

	function touch_move(e) {
		if(e.preventDefault) e.preventDefault();

        // Only allow 'draggable' elements
        if(e.target.getAttribute('draggable') !== 'true') return;
        
		on_drag(e.touches[0].clientX, e.touches[0].clientY);
		
		return false;
	}
	
	function touch_end(e) {
        
        // Only allow 'draggable' elements
        if(e.target.getAttribute('draggable') !== 'true') return;
        
        on_drop(true, e);
	}
	
	function touch_cancel(e) {
		console.log("cancelled...");
	}
	
    // Private functions
	function on_drag_start(touch, e) {
        id = e.target.id;
        el = document.getElementById(id);
        
        // Add panel to gui object
        if(!gui.hasOwnProperty(id)) {
            gui[id] = {};
        }
        
		rect = el.getBoundingClientRect();
        dock = e.target.parentNode;
        isEmpty = true;
        
        // Use datasets for 'docked' or 'loose' state
        document.querySelector('.panel-top').className.replace('panel-top', '');
        
        // Used to position element
		el.dataset.state = 'loose';
		
        // Used to manipulate the z-index
        el.classList.add('panel-top');
        
        // Check every panel in the dock
        for(var panel in dock.childNodes) {

            // Only the first inheritence of children
            if(dock.childNodes[panel].nodeType === 1) {
                
                // If one of the panels is not loose, set flag
                if(dock.childNodes[panel].dataset.state === 'docked') {
                    isEmpty = false;
                    break;
                }
            }
        }

        // Calculate offset once per drag
		if(!touch) {
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
		} else {
			offsetX = e.touches[0].clientX - rect.left;
			offsetY = e.touches[0].clientY - rect.top;
		}
        
        // Reset position for when element gets 'docked'
        el.style.left = gui[id].posX + 'px';
        el.style.top = gui[id].posY + 'px';

		//e.dataTransfer.setDragImage(null, 0, 0);
	}
	
	function on_drag(x, y) {
        el.style.left = (x - offsetX) + 'px';
        el.style.top = (y - offsetY) + 'px';
	}
	
	function on_drop(touch, e) {
        // Reset pointer events for new interaction
        el.style.pointerEvents = 'auto';
        
        // Reset state, used for 'collapsed' state on '.dock' when not empty
        prevState = null;
        
        // Event target not accessible on touch screen
        if(!touch) {
            if(e.target.getAttribute('dropzone') === 'move') {
                gui[id].state = (el.dataset.state = 'docked');
            }
        }
        
        // Save information into the 'gui' object
        gui[id].state = el.dataset.state;
    
        // Redefine rectangle to get new position
        rect = el.getBoundingClientRect();
        
        // Update position
        gui[id].posX = rect.left;
        gui[id].posY = rect.top;
	}
};