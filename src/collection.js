Vivid.Collection = (function(exports) {
    var vars = new Object();
    
    /**
     * Simple collection class
     * 
     * @name $.Vivid.Collection
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
