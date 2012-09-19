var assert = chai.assert;
suite('Fidel', function() {

  var View;
  var view;
  var el = $('#fixture');

  setup(function() {
    //viewObj from fixture.js
    View = Fidel.declare(viewObj);
    view = new View(el, {
      debug: true,
      test: 123
    });
  });

  suite('#init', function() {


    test('init is called', function() {
      assert.ok(view.initWasCalled);
    });

    test('el set to this.el', function() {
      assert.equal(el, view.el);
    });

    test('viewObj functions set as methods', function() {
      assert.ok(view.method);
      assert.isUndefined(view.fakeMethod);
    });

    test('options get extended', function() {
      assert.ok(view.options);
      assert.isTrue(view.options.debug);
      assert.isTrue(view.options.enabled);
      assert.equal(view.options.test, 123);
    });

    test('doesn\'t mess with original viewObj', function() {
      assert.isFalse(viewObj.defaults.debug);
    });

    test('each instance gets a unique id', function() {
      assert.ok(view.id);
      var view2 = new View(el);
      assert.notEqual(view.id, view2.id);
    });
  });

  suite('#find', function() {
    test('only find elements scoped to parent element', function() {
      var button = view.find('button');
      assert.equal(button.length, 2);
    });
  });

  suite('#els', function() {

    test('query elements and set them in els property', function() {

      assert.ok(view.els.name);
      assert.equal(view.els.name.length, 1);
      assert.equal(view.els.name.text(), 'Bob');

      assert.equal(view.els.submitButton[0].tagName, 'BUTTON');
    })
  });

  suite('#events', function() {

    test('auto bind events with selectors', function() {

      assert.isUndefined(view.buttonClickedEvent);
      view.els.submitButton.click();

      assert.ok(view.buttonClickedEvent);
      assert.equal(view.buttonClickCount, 1);
      assert.equal(view.nameClickCount, 0);
      assert.equal(view.viewClickCount, 1);
    });

    test('if no selector, bind to this.el', function() {

      assert.isUndefined(view.viewClickedEvent);
      view.el.click();
      assert.ok(view.viewClickedEvent);
      assert.equal(view.buttonClickCount, 0);
      assert.equal(view.nameClickCount, 0);
      assert.equal(view.viewClickCount, 1);
    });

    test('auto bind events with element names', function() {

      assert.isUndefined(view.nameClickEvent);
      view.els.name.click();

      assert.ok(view.nameClickEvent);
      assert.equal(view.buttonClickCount, 0);
      assert.equal(view.nameClickCount, 1);
      assert.equal(view.viewClickCount, 1);

    });

  });

  suite('#actions', function() {

    test('auto bind all data-action to the corresponding method name', function() {

      assert.isUndefined(view.actionClickEvent);
      var actions = view.find('[data-action]');
      actions.click();

      assert.ok(view.actionClickEvent);
      assert.equal(view.buttonClickCount, 0);
      assert.equal(view.nameClickCount, 0);
      assert.equal(view.actionClickCount, 1);
      assert.equal(view.viewClickCount, 1);


    });
    
  });

  suite('#on', function() {
    test('adds custom event on this.el', function(done) {
      view.on('testOnEvent', function() {
        done();
      });
      view.el.trigger('testOnEvent');
    });

    test('namespace events', function(done) {
      var check = false;

      var view2 = new View(el);
      view.on('testOnEvent', function() {
      });

      view2.on('testOnEvent', function() {
        check = true;
      });

      view.emit('testOnEvent');

      setTimeout(function() {
        assert.equal(check, false);
        done();
      }, 10);
      
    });

  });

  suite('#emit', function() {
    test('calls trigger on this.el', function(done) {

      view.on('testEmitEvent', function(e) {
        assert.ok(e);
        done();
      });
      view.emit('testEmitEvent');
    });

    test('combine emit and on on view', function(done) {

      view.on('testComboEvent', function(e) {
        assert.ok(e);
        done();
      });
      view.emit('testComboEvent');
    });

    test('data passed through', function(done) {
      view.on('testDataEvent', function(e, value) {
        assert.ok(e);
        assert.equal(value, 456);
        done();
      });
      view.emit('testDataEvent', 456);
    });

  });

  suite('#show', function() {
    test('set this.el to display block', function() {
      view.show();
      assert(view.el.css('display'), 'block');
    });
  });

  suite('#hide', function() {
    test('set this.el to display none', function() {
      view.hide();
      assert(view.el.css('display'), 'none');
    });
  });

  suite('#proxy', function() {
    test('context of this should be view', function() {
      view.proxy(function() {
        assert.equal(this, view);
      });
    });
  });

  
  suite('Pre/Post events', function() {
    test('pre-event fires', function(done) {
      Fidel.onPreInit(function() {
        assert.equal(this.initWasCalled, undefined);
        done();
      });
      var view = new Fidel(el, {
        init: function() {
          this.initWasCalled = true;
        }
      });
    });

    test('post-event fires', function(done) {
      Fidel.onPostInit(function() {
        assert.equal(this.initWasCalled, true);
        done();
      });
      var view = new Fidel(el, {
        init: function() {
          this.initWasCalled = true;
        }
      });
    });
  });

  suite('Multiple instances', function() {
    test('multiple instances don\'t conflict', function() {

      var view2 = new View(el, {
        debug: false,
        test: 456
      });

      assert.isTrue(view.options.debug);
      assert.isTrue(view.options.enabled);
      assert.equal(view.options.test, 123);

      assert.isFalse(view2.options.debug);
      assert.isTrue(view2.options.enabled);
      assert.equal(view2.options.test, 456);
      
    });
    
  });
  
  
});
