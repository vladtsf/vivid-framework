(function($, w, d, undefined) {
	
    var Vivid = $.Vivid;
	
    var 
	Cookie = Vivid.Cookie,
	Template = Vivid.Template;
	
    var Test = function($context, id, config) {
	this.init($context, config, Test.defaults);
    };
	
    Test.prototype = Vivid.Control({
	listen: function() {
	    var elements = this.elements;
			
	    with(this.config) {
		// [...]
	    }
			
	    return this;
	}
				
    });
	
    Test.defaults = {
	selectors: {
	},
		
	classes: {
	},
		
	effects: {
	},
		
	services: {
	},
	
	html: {
	}
    };
	
    $.fn.test = function(config) {
	this.each(function(i, e) {
	    var $e = $(e);
			
	    if(!$e.data('vivid.test')) {
		$e.data('vivid.test', new Test($e, config));
	    }
	});
		
	return this;
    };
	
})(jQuery, window, document);