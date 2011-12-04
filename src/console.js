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
		    log: console.log ? $.proxy(console.log, console) : $.noop,
		    assert: console.assert ? $.proxy(console.assert, console) : $.noop,
		    clear: console.clear ? $.proxy(console.clear, console) : $.noop,
		    count: console.count ? $.proxy(console.count, console) : $.noop,
		    dir: console.dir ? $.proxy(console.dir, console) : $.noop,
		    dirxml: console.dirxml ? $.proxy(console.dirxml, console) : $.noop,
		    exception: console.exception ? $.proxy(console.exception, console) : $.noop,
		    group: console.group ? $.proxy(console.group, console) : $.noop,
		    groupCollapsed: console.groupCollapsed ? $.proxy(console.groupCollapsed, console) : $.noop,
		    groupEnd: console.groupEnd ? $.proxy(console.groupEnd, console) : $.noop,
		    profile: console.profile ? $.proxy(console.profile, console) : $.noop,
		    profileEnd: console.profileEnd ? $.proxy(console.profileEnd, console) : $.noop,
		    table: console.table ? $.proxy(console.table, console) : $.noop,
		    time: console.time ? $.proxy(console.time, console) : $.noop,
		    timeEnd: console.timeEnd ? $.proxy(console.timeEnd, console) : $.noop,
		    trace: console.trace ? $.proxy(console.trace, console) : $.noop
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
