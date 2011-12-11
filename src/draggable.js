Vivid.Helper.Draggable = (function() {
    
    var mousePushed = false;
    
    function setPosition($target, top, left) {
	
    }
    
    /**
     * Adds drag functionality to the element
     * 
     * @param {jQuery} [$target=parent.$context] element wich will be dragged
     */
    var Draggable = function($target) {
	this.mouseDownHandler = function() {
	    mousePushed = true;
	    this.$context.trigger('vivid:dragstart');
	    
	    return false;
	}
	
	this.mouseUpHandler = function() {
	    mousePushed = false;
	    this.$context.trigger('vivid:dragstop');
	}
	
	this.mouseMoveHandler = function() {
	    if(mousePushed) {
		console.log('asdsad')
	    }
	}
	
	$target.css({
	    position: 'absolute'
	});
	
	return this;
    };
    
    return Draggable;
})();