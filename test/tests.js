(function($, Vivid, undefined) {
  $(document).ready(function() {
      
    module('Collection');
    
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
	equal(col.clear().count(), 0, 'Clear')
      
    });
    
    module('Console');
    
    test('All console methods test', function() {
      
	var
	    c = Vivid.Console,
	    obj = {foo: 'bar' },
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
    
    module('Cookie');
    
    test('Basic tests', function() {
      
//      expect(5);
      
    });
    
    module('Template');
    
    test('Basic tests', function() {
      
//      expect(5);
      
    });
    
    
  });
})(jQuery, $.Vivid);
