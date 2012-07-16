var assert = chai.assert;
suite('jQuery', function() {

  setup(function() {
    $.strap('strapPlugin', viewObj);
  });

  test('$.strap will be a function', function() {
    assert.isFunction($.strap);
  });

  test('$.strap() will create plugin', function() {
    assert.isFunction($.fn.strapPlugin);
    assert.isFunction($('#fixture').strapPlugin);
  });

  test('$.fn.plugin.defaults will map to View.defaults', function() {
    assert.equal($.fn.strapPlugin.defaults, viewObj.defaults);
  });

  test('$().data(pluginName) will return instance', function() {
    var el = $('#fixture');
    el.strapPlugin();
    assert.ok(el.data('strapPlugin'));
    assert.instanceOf(el.data('strapPlugin'), $.strap.View);
  });

  test('$().plugin() will call init', function() {
    var el = $('#fixture');
    el.strapPlugin();
    var instance = el.data('strapPlugin');
    assert.ok(instance.initWasCalled);
  });

  test('$().plugin("method") will call method name', function() {

    var el = $('#fixture');
    el.strapPlugin();
    var instance = el.data('strapPlugin');

    assert.isUndefined(instance.methodWasCalled);

    el.strapPlugin('method');

    assert.ok(instance.methodWasCalled);

  });
 

});
