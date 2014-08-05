var Support = function() {
	
	// Touch
	this.touch = function() {
		return !!('ontouchstart' in window || 'onmsgesturechange' in window);
	};
	
	// HTML5: Drag & Drop
	this.draganddrop = function() {
		if(navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if(re.exec(ua) !== null) {
				var rv = parseFloat(RegExp.$1);
				if(rv >= 6.0) return true;
			}
			return false;
		}
		if('draggable' in document.createElement('span')) return true;
		return false;
	};
	
	// HTML5: Web Socket
	this.websocket = function() {
		return typeof(WebSocket) === "function";
	};
	
	// Vendor Prefixes
	this.prefix = {
				
		transform: function() {
			
			var ghost = document.createElement("div"),
				prefixes = [
					"transform", 
					"msTransform", 
					"MozTransform", 
					"WebkitTransform", 
					"OTransform"
				];
			
			for (var i = 0; i < prefixes.length; ++i) {
				if (typeof ghost.style[prefixes[i]] != 'undefined')
					return prefixes[i];
				}
			return null;
		}
	};
};