(function($, Vivid, undefined) {
  $(document).ready(function() {
      
    module('$.Vivid.Collection');
    
    test('Basic tests', function() {
      
	var col = new Vivid.Collection();
	
	col
	    .set('1', 'foo')
	    .set('2', 'bar')
	    .set('3', 'baz');
	    
	equal(col.get('1'), 'foo', 'Get property value');
	equal(col.remove('1').get('1'), null, 'Remove property');
	equal(col.has('2'), true, 'Check existance of existing property');
	equal(col.has('1'), false, 'Check existance of removed property');
	equal(col.has('-1'), false, 'Check existance of undefined property');
	equal(col.count(), 2, 'Count length');
	equal(col.clear().count(), 0, 'Clear');
      
    });
    
    module('$.Vivid.Console');
    
    test('All console methods test', function() {
      
	var
	    c = Vivid.Console,
	    obj = {foo: 'bar'},
	    err = new Error('foo'),
	    str = 'foo';
	
	c.log(obj);
	c.assert(str);
	c.clear();
	c.count();
	c.dir(obj);
	c.dirxml(obj);
	c.exception(err);
	c.group(str);
	c.groupCollapsed(str);
	c.groupEnd(str);
	c.profile(str);
	c.profileEnd(str);
	c.table(obj);
	c.time(str);
	c.timeEnd(str);
	c.trace();
      
    });
    
    // Cookies tests can be performed only with turned on cookies. Isn't it?
    
    module('$.Vivid.Cookie');

    test('Basic tests', function() {
	if(document.cookie) {

	    var Cookie = Vivid.Cookie;

	    Cookie
		.set('a', 'foo')
		.set('b', 'bar')
		.set('c', 'baz');

	    equal(Cookie.get('a'), 'foo', 'Get cookie value');
	    equal(Cookie.remove('a').get('1'), null, 'Remove cookie');
	    equal(Cookie.has('b'), true, 'Check existance of existing cookie');
	    equal(Cookie.has('a'), false, 'Check existance of removed cookie');
	    equal(Cookie.has('d'), false, 'Check existance of undefined cookie');

	}
    });
    
    module('$.Vivid.Template');
    
    test('Basic tests', function() {

	var obj = {
	    a: 'foo',
	    b: 'bar',
	    c: 'baz'
	};
	
	var Template = Vivid.Template;
      
	equal((new Template('test')).compile().eval(obj), 'test', 'Without any variables');
	equal((new Template('test :a:')).compile().eval(obj), 'test foo', 'One variable');
	equal((new Template('test :a: :b::c:')).compile().eval(obj), 'test foo barbaz', 'Many variables');
	equal((new Template('test :a: :b::c:')).compile().eval(obj), 'test foo barbaz', 'Many variables');
	equal((new Template('test ::b:')).compile().eval(obj), 'test :b:', 'Screening');
	equal((new Template('test :e:')).compile().eval(obj), 'test ', 'Undefined variable');
	
    });
    
    asyncTest("Asynchronous templating", function() {
	var obj = {
	    a: 'foo',
	    b: 'bar',
	    c: 'baz'
	};
	
	var Template = Vivid.Template;
	
	(new Template('test :a: :b::c:'))
	    .compile()
	    .eval(obj, function(result) {
		equal(result, 'test foo barbaz', 'Undefined variable');
		start();
	    });
	    
    });
    
    
  });
})(jQuery, $.Vivid);
