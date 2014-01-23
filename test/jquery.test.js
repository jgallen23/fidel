suite('jQuery', function() {
  var View;
  var view;
  var instance;
  var el = $('#fixture');

  setup(function() {
    //viewObj from fixture.js
    View = fidel.define('fidelPlugin',viewObj);
    view = new View({
      el: el,
      debug: true,
      test: 123
    });
    el = $('#fixture');
    el.fidelPlugin();
    instance = el.data('fidel-fidelPlugin');
  });

  teardown(function() {
    el.off();
  });

  test('the plugin name will exist in the jQueryNamespace', function() {
    assert.equal(typeof $.fn.fidelPlugin, 'function');
    assert.equal(typeof $('#fixture').fidelPlugin, 'function');
  });

  test('$.fn.plugin.defaults will map to View.defaults', function() {
    assert.equal($.fn.fidelPlugin.defaults, viewObj.defaults);
  });

  test('$().data(pluginName) will return instance', function() {
    assert.ok(el.data('fidel-fidelPlugin'));
    assert.equal(el.data('fidel-fidelPlugin') instanceof $.Fidel, true);
  });

  test('$().plugin() will call init', function() {
    assert.ok(instance.initWasCalled);
  });

  test('$().plugin("method") will call method name', function() {
    assert.equal(typeof instance.methodWasCalled, 'undefined');

    var ret = el.fidelPlugin('method');

    assert.equal(ret, el);
    assert.ok(instance.methodWasCalled);
  });

  test('$().plugin("method") will return value if return is not undefined', function() {
    var val = el.fidelPlugin('methodWithReturn');
    assert.equal(val, 1);
  });

  test('$().plugin("method") will return value if empty array', function() {
    var val = el.fidelPlugin('methodWithEmptyArrayReturn');

    assert.deepEqual(val, []);
  });

  test('$().plugin("method") will return value even if return is false', function() {
    var val = el.fidelPlugin('methodReturnsFalse');

    assert.equal(typeof val, 'boolean');
    assert.equal(val, false);
  });


  test('$().plugin("method", arg1, arg2) will pass through to method', function() {
    assert.equal(typeof instance.methodWithArgsWasCalled, 'undefined');

    el.fidelPlugin('methodWithArgs', 123);

    assert.ok(instance.methodWithArgsWasCalled);
    assert.equal(instance.methodArg, 123);
    assert.equal(instance.methodThis, instance);
  });

  test('$().on("eventName") will get called on view.emit("eventName")', function(done) {
    el.on('testEvent', function() {
      done();
    });

    instance.emit('testEvent');
  });


  test('$().trigger("eventName") will get call on view.on("eventName")', function(done) {
    instance.on('testEvent2', function() {
      done();
    });

    el.trigger('testEvent2');
  });
});