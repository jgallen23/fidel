var assert = chai.assert;
suite('jQuery', function() {

  setup(function() {
    $.fidel('fidelPlugin', viewObj);
  });

  test('$.fidel will be a function', function() {
    assert.isFunction($.fidel);
  });

  test('$.fidel() will create plugin', function() {
    assert.isFunction($.fn.fidelPlugin);
    assert.isFunction($('#fixture').fidelPlugin);
  });

  test('$.fn.plugin.defaults will map to View.defaults', function() {
    assert.equal($.fn.fidelPlugin.defaults, viewObj.defaults);
  });

  test('$().data(pluginName) will return instance', function() {
    var el = $('#fixture');
    el.fidelPlugin();
    assert.ok(el.data('fidelPlugin'));
    assert.instanceOf(el.data('fidelPlugin'), $.fidel.View);
  });

  test('$().plugin() will call init', function() {
    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');
    assert.ok(instance.initWasCalled);
  });

  test('$().plugin("method") will call method name', function() {

    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');

    assert.isUndefined(instance.methodWasCalled);

    el.fidelPlugin('method');

    assert.ok(instance.methodWasCalled);

  });
 

});
