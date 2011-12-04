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
