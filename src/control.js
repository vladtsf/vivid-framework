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
			    this.config = $.extend(true, {}, defaults, config);
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
			.parseConfig(defaults, config);
			    
		    if(this.config && this.config.selectors) {
			this.genCache();
		    }
			
		    this
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
	     * Takes element from with following priority
	     * * this.elements[element]
	     * * element
	     * * $(element, this.$context)
	     *
	     * @param {string|jQuery|selector} [element=this.$context] element name/selector
	     * @param {boolean} [live=false] return selector or queried element
	     */
	    getElement: function(element, live) {
		if(element) {
		    if(typeof element == 'string' && this.elements[element]) {
			return this.elements[element];
		    } else if (element instanceof NodeList | element instanceof Node) {
			return $(element);
		    } else if(element instanceof $ | live) {
			return element;
		    } else {
			return $(element, this.$context);
		    }
		}
		
		return this.$context;
	    },

	    /**
	     * Main events binding helper
	     * 
	     * @param {string} type event type
	     * @param {string|jQuery} [element=this.$context] element's name (as in Control.config.selectors) or jQuery object/selector
	     * @param {function} handler event handler (will be proxied to control's context)
	     * @param {object} [lockable=true] turns on/off event locking
	     * @return Control
	     */
	    on: function(type, element, handler, lockable) {
		    var $e;

		    if(type) {
			
			if(typeof element == 'function') {
			    $e = this.$context;
			    handler = element;
			    lockable = handler;
			} else {
			    $e = this.getElement(element, true);
			}
			
			if(typeof handler != 'function') {
			    return this;
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
	    },
	    
	    /**
	     * Adds drag functionality to the element
	     * 
	     * @param {string|jQuery|selector} [holder=this.$context] drag holder
	     * @param {string|jQuery|selector} [target=this.$context] element wich will be dragged
	     */
	    makeDraggable: function(holder, target) {
		var 
		    $target = this.getElement(target);
		
		var draggable = new Helper.Draggable($target);
		
		this
		    .on('mousedown', holder, draggable.mouseDownHandler)
		    .on('mouseup', d, draggable.mouseUpHandler)
		    .on('mousemove', d, draggable.mouseMoveHandler);
		    
		return this;
	    }
    };
    
    return Control;
})();