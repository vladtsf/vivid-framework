Vivid.Collection = (function() {
    
    
    /**
     * Simple collection class
     * 
     * @name $.Vivid.Collection
     */
    var Collection = function() {
	    if(this instanceof Collection) {
		/**
		 * Variables hash-container
		 * @private
		 * @property
		 */
		var vars = new Object();
		
		/**
		 * Returns the variable's value
		 * 
		 * @param {string} key variable's key
		 */
		this.get = function(key) {
		    return this.has(key) ? vars[key] : null;
		};

		/**
		 * Sets the variable's value
		 * 
		 * @param {string} key variable's key
		 * @param {object} value  variable's value
		 * @return Collection
		 */
		this.set = function(key, value) {
		    if(value !== undefined) {
			    vars[key] = value;
		    }

		    return this;
		};

		/**
		 * Checks variable's existence
		 * 
		 * @param {string} key variable's key
		 * @return bool
		 */
		this.has = function(key) {
		    return vars[key] !== null | vars[key] !== undefined ? true : false;
		};

		/**
		 * Removes variable
		 * 
		 * @param {string} key variable's key
		 * @return Collection
		 */
		this.remove = function(key) {
		    if(this.has(key)) {
			delete vars[key];
		    }

		    return this;
		};

		/**
		 * Removes all collection values
		 * 
		 * @return Collection
		 */
		this.clear = function() {
		    vars = new Object();

		    return this;
		};
		
		/**
		 * Returns collection length
		 */
		this.count = function() {
		    var count = 0;
		    
		    $.each(vars, function() {
			count++;
		    });
		    
		    return count;
		};
		
		
		return this;
	    }

	    return new Collection()
    };
    
    return Collection;
})(Vivid);
