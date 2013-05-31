suite('jQuery', function() {

  setup(function() {
    $.declare('fidelPlugin', viewObj);
  });

  teardown(function() {
    $('#fixture').off();
  });

  test('$.declare will be a function', function() {
    assert.equal(typeof $.declare, 'function');
  });

  test('$.Fidel == Fidel class', function() {
    assert.equal(typeof $.Fidel, 'function');
  });

  test('$.declare() will create plugin', function() {
    assert.equal(typeof $.fn.fidelPlugin, 'function');
    assert.equal(typeof $('#fixture').fidelPlugin, 'function');
  });

  test('$.fn.plugin.defaults will map to View.defaults', function() {
    assert.equal($.fn.fidelPlugin.defaults, viewObj.defaults);
  });

  test('$().data(pluginName) will return instance', function() {
    var el = $('#fixture');
    el.fidelPlugin();
    assert.ok(el.data('fidelPlugin'));
    assert.equal(el.data('fidelPlugin') instanceof $.Fidel, true);
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

    assert.equal(typeof instance.methodWasCalled, 'undefined');

    var ret = el.fidelPlugin('method');

    assert.equal(ret, el);
    assert.ok(instance.methodWasCalled);

  });

  test('$().plugin("method") will return value if return is not undefined', function() {

    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');

    var val = el.fidelPlugin('methodWithReturn');

    assert.equal(val, 1);

  });

  test('$().plugin("method") will return value if empty array', function() {

    var el = $('#fixture');
    el.fidelPlugin();

    var val = el.fidelPlugin('methodWithEmptyArrayReturn');

    assert.deepEqual(val, []);
  });

  test('$().plugin("method") will return value even if return is false', function() {

    var el = $('#fixture');
    el.fidelPlugin();

    var val = el.fidelPlugin('methodReturnsFalse');

    assert.equal(typeof val, 'boolean');
    assert.equal(val, false);
  });


  test('$().plugin("method", arg1, arg2) will pass through to method', function() {

    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');

    assert.equal(typeof instance.methodWithArgsWasCalled, 'undefined');

    el.fidelPlugin('methodWithArgs', 123);

    assert.ok(instance.methodWithArgsWasCalled);
    assert.equal(instance.methodArg, 123);
    assert.equal(instance.methodThis, instance);
  });

  test('$().on("eventName") will get called on view.emit("eventName")', function(done) {

    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');

    el.on('testEvent', function() {
      done();
    });

    instance.emit('testEvent');
  });


  test('$().trigger("eventName") will get call on view.on("eventName")', function(done) {

    var el = $('#fixture');
    el.fidelPlugin();
    var instance = el.data('fidelPlugin');

    instance.on('testEvent2', function() {
      done();
    });

    el.trigger('testEvent2');
  });


});
