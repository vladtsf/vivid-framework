$.fn.log = function() {
	Vivid.Console.log(this);

	return this;
};

$.fn.dir = function() {
	Vivid.Console.dir(this);

	return this;
};