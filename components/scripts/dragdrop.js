var DragDrop = function() {
	
    // Private Variables
	var el = null,
		rect = null,
		prefix = null,
        prevState = null,
        dropzone = null,
		offsetX = null,
		offsetY = null,
        isEmpty = false,
        touch = false,
        gui = {};

	// Public Methods
	this._init = function (vendor) {
        
		// Get vendor prefix for transform on drag
		prefix = vendor;
		
        document.documentElement.addEventListener('dragover', drag, false); 
		document.addEventListener('drop', drop, false);
        
        // Listen for all 'draggable' and 'droppable' elements
        var panels = document.querySelectorAll('[draggable]'),
            docks = document.querySelectorAll('[dropzone]');
        
        for(var i = 0; i < panels.length; i++) {
            // Get id from parent node in HTML document
            var draggable = document.getElementById(panels[i].parentNode.id);

            // Once the parent id is found, go back down to child element
            // with 'draghandle' class
            draggable = draggable.getElementsByClassName('draghandle');
            
            // Because 'getElementByClassName' returns a list of object,
            // only get the first one by using [0]
            draggable[0].addEventListener('dragstart', dragStart, false);
            draggable[0].addEventListener('touchstart', dragStart, false);        
            draggable[0].addEventListener('touchmove', drag, false);
            draggable[0].addEventListener('touchend', drop, false);
        }
        
        for(var j = 0; j < docks.length; j++) {
            var droppable = document.getElementById(docks[j].id);
            droppable.addEventListener('dragenter', dragEnter, false);
            droppable.addEventListener('dragleave', dragLeave, false);
        }
        
	}; // END PUBLIC _init
	
    // Private Methods
    function dragStart(e) {
        
        console.log(e.target.parentNode.id);
        
        if(typeof e.touches !== 'undefined') touch = true;
        
        el = document.getElementById(e.target.parentNode.id);
        
        rect = el.getBoundingClientRect();
        
        // Add panel to gui object, if not exists, to prevent overwriting props
        if(!gui.hasOwnProperty(el.id)) gui[el.id] = { 'posX': rect.left, 'posY': rect.top };
		
        //isEmpty = true;
        
        // Calculate offset once per drag
        if(!touch) {
            // Use 'text' for IE 11 to work properly
            e.dataTransfer.setData('text', this.innerHTML);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.dropEffect = 'move';
            
            offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
        } else {
            offsetX = e.targetTouches[0].clientX - rect.left;
			offsetY = e.targetTouches[0].clientY - rect.top;
        }

        // Set all panels with 'top' to 'idle' mode (so they reside in the background)
        var topNode = document.getElementById(document.querySelectorAll('[data-priority="top"]')[0].id);
        topNode.dataset.priority = 'idle';
        
        // Trigger IE reflow after changing 'data-*' attribute value
        topNode.className = topNode.className;
        
        // Put active panel on top of all other panels on screen
        el.dataset.priority = 'top';
        
        // Trigger IE reflow
        el.className = el.className;

        // Set current position based on 'rect' and update the gui object accordingly
        el.style.left = (gui[el.id].posX = rect.left) + 'px';
        el.style.top = (gui[el.id].posY = rect.top) + 'px';
        
        // Append panel to the body
        if(el.dataset.state === 'docked') {
            el.dataset.state = 'loose';
            document.getElementsByTagName('body')[0].appendChild(el);
        }

		//e.dataTransfer.setDragImage(null, 0, 0);
        
        return false;
	} // END PRIVATE dragStart
    
    function drag(e) {
        if(e.preventDefault) e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();
        
        var x = null,
            y = null;
        
        if(!touch) {
            el.style.pointerEvents = 'none';
            x = e.clientX;
            y = e.clientY;
        } else {
            
            dragEnter(e);
            
            x = e.targetTouches[0].clientX;
            y = e.targetTouches[0].clientY;
        }
        
        el.style.left = (x - offsetX) + 'px';
        el.style.top = (y - offsetY) + 'px';
        
        return false;
	} // END PRIVATE drag
    
    function dragEnter(e) {

        var target = null,
            touches = null;
        
        // Check for touch interaction
        if(!touch) {
            // Touch disabled
            target = e.target;
        } else {
            // Touch enabled
            touches = e.targetTouches[0];
            target = document.elementFromPoint(touches.clientX, touches.clientY);
            el.style.pointerEvents = 'none';
        }
        
        if(target.hasAttribute('dropzone')) {
            
            // Get current dropzone
            dropzone = document.getElementById(target.id);
            
            // Add dropzone to gui object, if not exists, to prevent overwriting props
            if(!gui.hasOwnProperty(dropzone.id)) gui[dropzone.id] = {};

            gui[dropzone.id].empty = true;
            
            if(prevState === null) {
                prevState = dropzone.dataset.state;
            }

            // Expand dock if empty
            if(dropzone.dataset.state === 'collapsed') {
                updateGUI('expanded');
            }

            // Check every panel in the dock
            for(var panel in dropzone.childNodes) {

                var childNode = dropzone.childNodes[panel];
                
                // Only direct descendants (node children) with a 'panel' class
                if(childNode.nodeType === 1 && childNode.classList.contains('panel')) {
                    gui[dropzone.id].empty = false;
                    break;
                }
            }
            
        } else if(touches) {
            dragLeave();
        }
    } // END PRIVATE dragEnter
    
    function dragLeave() {
        
        if(dropzone !== null) {
            if(gui[dropzone.id].empty || prevState === 'collapsed') {
                updateGUI('collapsed');
            }
        }
        
        // Left the area, reset dropzone
        dropzone = null;
        
    } // END dragLeave
	
	function drop(e) {
        
        // Prevent Firefox from redirecting on drop.
        // Short-circuit notation
		e.preventDefault && e.preventDefault();
		e.stopPropagation && e.stopPropagation();
        
        // Reset pointer events for new interaction
        el.style.pointerEvents = 'auto';
        
        // Update state of dragged panel
        if(dropzone !== null) {
            gui[el.id].state = (el.dataset.state = 'docked');
            dropzone.appendChild(el);
        }
        
        // Save information into the 'gui' object
        gui[el.id].state = el.dataset.state;
    
        // Redefine rectangle to get new position
        rect = el.getBoundingClientRect();
        
        // Update position
        gui[el.id].posX = rect.left;
        gui[el.id].posY = rect.top;
        
        // Reset state, used for 'collapsed' state on '.dock' when not empty
        prevState = null;
        dropzone = null;
        
	} // END PRIVATE drop
    
    function updateGUI(newState) {
        dropzone.dataset.state = newState;

        // Trigger IE 8+ to 'redraw' on screen after changing 'data-*'
        dropzone.className = dropzone.className;
        
        gui[dropzone.id].state = newState;
    }
};

// TODO:
// - CHANGE UPDATEGUI FUNCTION TO HANDLE OTHER THINGS THAN ONLY THE DOCK, but also panels
// - REMOVE VENDOR PREFIX IF NOT NEEDED ANYMORE
// - APPLY 3D TRANSFORMS, BECAUSE ELEMENT IS NO LONGER PART OF THE PARENT DOCK WHEN LOOSE
//      --> USE DOCS: http://stackoverflow.com/questions/15194313/webkit-css-transform3d-position-fixed-issue
// IE 11 ISSUE: PANEL SHOULD GO TO TOP ON MOUSEDOWN EVENT
// SAFARI: NOTHING WORKS!
/*

Ctrl-Alt-C Collapse code region at current cursor position
Ctrl-Alt-X Expand code region at current cursor position
Alt-1 Collapse all code regions in current editor
Shift-Alt-1 Expand all code regions in current editor

*/