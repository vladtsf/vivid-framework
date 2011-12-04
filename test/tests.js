(function($, Vivid, undefined) {
  $(document).ready(function() {
      
    module('Collection');
    
    test('Basic tests', function() {
      
//      expect(5);
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
      
//      expect(5);
      
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
