Vivid.Helper.Draggable = (function() {
    
    /**
     * Adds drag functionality to the element
     * 
     * @param {jQuery} [$target=parent.$context] element wich will be dragged
     */
    var Draggable = function($target) {
	var self = this;
	
	this.mousePushed = false,
	this.ePosition = void 0;
	this.tPosition = void 0;
	
	this.mouseDownHandler = function(e) {
	    self.mousePushed = true;
	    self.ePosition = {
		top: e.pageY,
		left: e.pageX
	    };
	    self.tPosition = $target.offset();
	    
	    this.$context.trigger('vivid:dragstart');
	    return false;
	};
	
	this.mouseUpHandler = function(e) {
	    self.mousePushed = false;
	    self.ePosition = void 0;
	    self.tPosition = void 0;
	    
	    this.$context.trigger('vivid:dragstop');
	};
	
	this.mouseMoveHandler = function(e) {
	    if(self.mousePushed) {
		var delta = {
		    top: e.pageY - self.ePosition.top,
		    left: e.pageX - self.ePosition.left
		}
		
		self.ePosition.top = e.pageY;
		self.ePosition.left = e.pageX;
		
		self.tPosition = {
		    top: self.tPosition.top + delta.top,
		    left: self.tPosition.left + delta.left
		};
		
		$target.offset(self.tPosition);
	    }
	};
	
	this.reset = function() {
	    $(d)
		.off('mousemove', self.mouseMoveHandler)
		.off('mousemove', self.mouseUpHandler);
		
	    self.mousePushed = false,
	    self.ePosition = void 0;
	    self.tPosition = void 0;
	    
	    $target.css('position', '');
	};
	
	$target.css('position', 'absolute');
	
	return this;
    };
    
    return Draggable;
})();