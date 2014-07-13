/*global fidel, teardown, viewObj */
suite('Migrate', function() {
	var View, view;
	var el = $('#fixture');

	setup(function() {
		View = $.declare('fidelPlugin',viewObj);
	});

	teardown(function() {
		el.off();
	});

	test('It should add the declare function to the jQuery namespace', function () {
		assert.equal(typeof $.declare, 'function');
	});
	test('It should declare the module in a V3 way', function () {
		assert.notEqual(typeof fidel.modules.test, 'undefined');
	});
	test('It should return the view properly', function () {
		view = new View({
			el: el,
			debug: true,
			test: 123
		});

		assert.equal(view instanceof Fidel, true);
		assert.equal(view instanceof View, true);
	});
});