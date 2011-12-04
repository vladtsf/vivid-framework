Vivid.Template = (function() {
    
    /**
     * Variable search RegExp
     */
    var variable = (/\:([\w])*\:/g);

    /**
     * Quotes replacing template
     */
    var quotes = (/:/g);
    
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
			    varName = match.replace(quotes, '');

		    return '" + (' + varName + '!== undefined ? '+ varName +' : "") + "';
	    }

	    /**
	     * Compiles template markup to executable js code
	     * 
	     * @return Template
	     */
	    this.compile = function() {
		    code = ('"' + markup.replace(/"/g, '\\"').replace(variable, parse) + '"');
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

    return Template;
})();

