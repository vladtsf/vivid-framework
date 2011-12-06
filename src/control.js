Vivid.Control = (function() {
    
    /**
     * Vivid Control Class-decorator
     * 
     */
    var Control = function(mix) {
	    if(this instanceof Control) {
		    var extended = $.extend(this, mix);
		    extended.parent = Control.prototype;
		    return extended;
	    }
	    return new Control(mix);
    };

    Control.prototype = {
		
		/**
		 * Defers the initialization of control before the moment when specified event will fired
		 * 
		 * @param {string} on initialization event
		 * @param {jQuery} $context event context
		 */
		deferInit: function(on, $context) {
			if($context instanceof $) {
				$context.on(on, $.proxy(this.init, this));
			}
			
			return this;
		},
		
	    /**
	     * Generates jQuery objects cache from Control.config.selectors
	     * 
	     * @return Control
	     */
	    genCache: function() {
		    var
			    search = this;
		    this.elements = new Object();

		    $.each(this.config.selectors, function(key, selector) {
			    if(key[0] == '$') {
				    search.elements[key] = $(selector, search.$context);
			    }
		    });

		    return this;
	    },

	    /**
	     * Prepares the control's config
	     * @param {object} defaults default options set
	     * @param {object} config options for overwriting
	     * @return Control
	     */
	    parseConfig: function(defaults, config) {
		    if(config) {
			    this.config = $.extend(true, defaults, config);
		    } else {
			    this.config = defaults;
		    }
		    return this;
	    },

	    /**
	     * Initialize the control
	     * 
	     * @param {object} $context root element
	     * @param {object} config options for overwriting
	     * @param {object} defaults defaults default options set
	     * @return Control
	     */
	    init: function($context, config, defaults) {
		    this.$context = $context;

		    if(!this.listen) {
			this.listen = $.noop;
		    }

		    this
			    .parseConfig(defaults, config)
			    .genCache()
			    .listen();

		    this.locked = false;

		    return this;
	    },

	    /**
	     * Locks the control
	     * 
	     * @param {function} callback after lock callback
	     * @return Control
	     */
	    lock: function(callback) {
		    this.locked = true;

		    if(typeof(callback) == 'function') {
			    callback.apply(this);
		    }

		    return this;
	    },

	    /**
	     * Locks the control
	     * 
	     * @param {function} callback after unlock callback
	     * @return Control
	     */
	    unlock: function(callback) {
		    this.locked = false;

		    if(typeof(callback) == 'function') {
			    callback.apply(this);
		    }

		    return this;
	    },

	    /**
	     * Main events binding helper
	     * 
	     * @param {string} type event type
	     * @param {string|jQuery} element element's name (as in Control.config.selectors) or jQuery object/selector
	     * @param {function} handler event handler (will be proxied to control's context)
	     * @param {object} lockable turns on/off event locking
	     * @return Control
	     */
	    on: function(type, element, handler, lockable) {
		    var $e;

		    if(element && type && handler) {
			    if(element instanceof $) {
				    $e = element;
			    } else if(this.elements[element]) {
				    $e = this.elements[element];
			    } else {
				    $e = element;
			    }

			    if(lockable === false) {
				    if(typeof($e) == 'string') {
					    this.$context.on(type, $e, $.proxy(handler, this));
				    } else {
					    $e.on(type, $.proxy(handler, this));
				    }
			    } else {
				    var wrap = $.proxy(function() {
					    if(!this.locked) {
						    return handler.apply(this, arguments);
					    }

					    return false;
				    }, this);

				    if(typeof($e) == 'string') {
					    this.$context.on(type, $e, wrap);
				    } else {
					    $e.on(type, wrap);
				    }
			    }
		    }

		    return this;
	    }
    };
    
    return Control;
})();