# Vivid Framework
Vivid is a small tools set very useful for jQuery plugins developers.

## Modules

### Collection
This is a object-container. You can store any data with Collection class.

#### example

	var Collection = $.Vivid.Collection;
	var col = new Collection();
	col
	    .set('foo', 'bar')
	    .set('bar', 'baz');
	alert(col.get('foo')); // bar
	alert(col.get('bar')); // baz

### Console
Console is a safe wrapper for modern browser's console object. It doesn't throws exceptions when you try to call they methods in old browsers (like ie6).
As benefit you can call all methods without saving context.

#### example
	$.Vivid.Console.log('foo');

### Cookie
Cookie class inspired from MDN web-site and assemblied to one class.

#### example
	var Cookie = $.Vivid.Cookie;
	Cookie.set('foo', 'bar');
	alert(Cookie.get('foo')); //bar
	Cookie.remove('foo');
	alert(Cookie.get('foo')); //null

### Template
You can use it for simple templating.

#### example
	var Template = $.Vivid.Template;
	var a = (new Template('<a href=":href:" title=":title:">:text:</a>')).compile();
	var $a = $(a.eval({
	    href: 'http://example.com',
	    title: 'example',
	    text: 'go to example site...'
	}));
	console.log($a); // <a href="http://example.com" title="example">go to example site...</a>

### Control
Control is a helper for plugins. It's contains methods for working with events, locking and other.

# Building
Development and minified versions located in the `bin` folder. If you want to rebuild sources, use `build.sh` (`build.bat` for Windows) script.
Building config located at `build/overall.tpl.js`.

Builder written on node.js dependends from some packages. To fetch it run the following code: `cd build/builder; npm install .`
