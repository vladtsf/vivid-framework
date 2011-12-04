(function($, w, d, undefined) {
	
var Vivid = $.Vivid = {

    // current library version
    version: '0.0.1'
    
};


/**
 * Safety console object wrapper
 * 
 * @example
 *	var Console = $.Vivid.Console;
 *	Console.log('foo'); // chrome, ff, opera, safari, ie > 7: foo; ie <= 7 ...
 */
Vivid.Console = (function() {
    if(console) {
	    return {
		    log: $.proxy(console.log, console),
		    assert: $.proxy(console.assert, console),
		    clear: $.proxy(console.clear, console),
		    count: $.proxy(console.count, console),
		    dir: $.proxy(console.dir, console),
		    dirxml: $.proxy(console.dirxml, console),
		    exception: $.proxy(console.exception, console),
		    group: $.proxy(console.group, console),
		    groupCollapsed: $.proxy(console.groupCollapsed, console),
		    groupEnd: $.proxy(console.groupEnd, console),
		    profile: $.proxy(console.profile, console),
		    profileEnd: $.proxy(console.profileEnd, console),
		    table: $.proxy(console.table, console),
		    time: $.proxy(console.time, console),
		    timeEnd: $.proxy(console.timeEnd, console),
		    trace: $.proxy(console.trace, console)
	    }
    }
    return {
	    log: $.noop,
	    assert: $.noop,
	    clear: $.noop,
	    count: $.noop,
	    dir: $.noop,
	    dirxml: $.noop,
	    exception: $.noop,
	    group: $.noop,
	    groupCollapsed: $.noop,
	    groupEnd: $.noop,
	    profile: $.noop,
	    profileEnd: $.noop,
	    table: $.noop,
	    time: $.noop,
	    timeEnd: $.noop,
	    trace: $.noop
    }
})();

/**
 * Simple collection class
 * 
 * @name $.Vivid.Collection
 */
Vivid.Collection = (function() {
    
    /**
     * Variables hash-container
     * @private
     * @property
     */
    var vars = new Object();
    
    /**
     * @constructor
     */
    var Collection = function() {
	    if(this instanceof Collection) {
		    return this;
	    }

	    return new Collection()
    };
    
    
    Collection.prototype = {
	/**
	 * Returns the variable's value
	 * 
	 * @param {string} key variable's key
	 */
	get : function(key) {
		return this.has(key) ? vars[key] : null;
	},

	/**
	 * Sets the variable's value
	 * 
	 * @param {string} key variable's key
	 * @param {object} value  variable's value
	 * @return Collection
	 */
	set : function(key, value) {
		if(value !== undefined) {
			vars[key] = value;
		}

		return this;
	},

	/**
	 * Checks variable's existence
	 * 
	 * @param {string} key variable's key
	 * @return bool
	 */
	has : function(key) {
		return vars[key] !== null | vars[key] !== undefined ? true : false;
	},

	/**
	 * Removes variable
	 * 
	 * @param {string} key variable's key
	 * @return Collection
	 */
	remove : function(key) {
		if(this.has(key)) {
			delete vars[key];
		}

		return this;
	},

	/**
	 * Removes all collection values
	 * 
	 * @return Collection
	 */
	clear : function() {
		vars = new Object();

		return this;
	}
    };
    
    return Collection;
})(Vivid);

/**
 * Inspired from MDN (https://developer.mozilla.org/en/DOM/document.cookie) and refactored
 */
var Cookie = { 

	/** 
	 * Gets cookie variable
	 * 
	 * @argument sKey (String): the name of the cookie; 
	 **/  
	get: function (sKey) {  
		if (!sKey || !this.has(sKey)) {
			return null;
		}  
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));  
	},

	/** 
	 * Sets cookie variable
	 * 
	 * @argument sKey (String): the name of the cookie; 
	 * @argument sValue (String): the value of the cookie; 
	 * @optional argument vEnd (Number, String, Date Object or null): the max-age in seconds (e.g., 31536e3 for a year) or the 
	 *  expires date in GMTString format or in Date Object format; if not specified it will expire at the end of session;  
	 * @optional argument sPath (String or null): e.g., "/", "/mydir"; if not specified, defaults to the current path of the current document location; 
	 * @optional argument sDomain (String or null): e.g., "example.com", ".example.com" (includes all subdomains) or "subdomain.example.com"; if not 
	 * specified, defaults to the host portion of the current document location; 
	 * @optional argument bSecure (Boolean or null): cookie will be transmitted only over secure protocol as https; 
	 * @return Sports.Cookie; 
	 **/  
	set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {  
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) {
			return;
		}  
		var sExpires = "";  
		if (vEnd) {  
			switch (typeof vEnd) {  
				case "number":
					sExpires = "; max-age=" + vEnd;
					break;  
				case "string":
					sExpires = "; expires=" + vEnd;
					break;  
				case "object":
					if (vEnd.hasOwnProperty("toGMTString")) {
						sExpires = "; expires=" + vEnd.toGMTString();
					}
					break;  
			}  
		}  
		document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");  
		return this;
	},  

	/** 
	 * Removes cookie variable
	 * 
	 * @argument sKey (String): the name of the cookie; 
	 **/  
	remove: function (sKey) {  
		if (!sKey || !this.has(sKey)) {
			return this;
		}  
		var oExpDate = new Date();  
		oExpDate.setDate(oExpDate.getDate() - 1);  
		document.cookie = escape(sKey) + "=; expires=" + oExpDate.toGMTString() + "; path=/";  
		return this;
	},

	/** 
	 * Checks existence of cookie vaiable
	 * 
	 * @argument sKey (String): the name of the cookie; 
	 **/  
	has: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	} 
};

Vivid.Cookie = Cookie;
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

Vivid.Control = Control;
/**
 * Simple template engine
 * 
 * @name $.Vivid.Template
 * @param {string} markup template markup
 * @example
 *	var tpl = new Template('Hello, :entityname:!');
 *	tpl.compile();
 *	alert(tpl.eval({entityname: 'world'})); // Hello, world!
 */
var Template = function(markup) {
	if(this instanceof Template) {

		/**
		 * Evaluated code
		 * 
		 * @private
		 */
		var code = '';

		/**
		 * Replaces the variable to executable code fragement
		 * 
		 * @param {string} match current match
		 * @private
		 */
		var parse = function(match) {
			var
				varName = match.replace(Template.quotes, '');

			return '" + (' + varName + '!== undefined ? '+ varName +' : "") + "';
		}

		/**
		 * Compiles template markup to executable js code
		 * 
		 * @return Template
		 */
		this.compile = function() {
			code = ('"' + markup.replace(/"/g, '\\"').replace(Template.variable, parse) + '"');
			return this;
		};

		/**
		 * Substitutes values ​​of variables in the template
		 * 
		 * @param {object} variables template variables
		 * @param {function} callback the asynchronous call callback
		 */
		this.eval = function(variables, callback) {
			var
				result,
				vars = variables || new Object();

			if(typeof(callback) == 'function') {
				setTimeout(function() {
					with(vars) {
						result = eval(code);
					}

					callback.call(this, result);
				}, 0);

				return this;
			}	

			with(vars) {
				result = eval(code);
			}

			return result;
		};

		return this;
	}

	return new Template(markup);
};

/**
 * Variable search RegExp
 */
Template.variable = (/\:([\w])*\:/g);

/**
 * Quotes replacing template
 */
Template.quotes = (/:/g);


Vivid.Template = Template;

$.fn.log = function() {
	Vivid.Console.log(this);

	return this;
};

$.fn.dir = function() {
	Vivid.Console.dir(this);

	return this;
};
	
})(jQuery, window, document);