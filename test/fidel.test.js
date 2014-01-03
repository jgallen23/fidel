suite('Fidel', function() {

  var View;
  var view;
  var el = $('#fixture');


  setup(function() {
    //viewObj from fixture.js
    View = fidel.define('test',viewObj);
    view = new View({
      el: el,
      debug: true,
      test: 123
    });
  });

  teardown(function() {
    el.off();
    $('body').off('FidelPreInit');
    $('body').off('FidelPostInit');
  });

  suite('#init', function() {
    test('view saved into modules', function(){
      assert.notEqual(typeof fidel.modules.test, 'undefined');
    });

    test('init is called', function() {
      assert.ok(view.initWasCalled);
    });

    test('el set to this.el', function() {
      assert.equal(el, view.el);
    });

    test('viewObj functions set as methods', function() {
      assert.equal(typeof view.method, 'function');
      assert.equal(typeof view.fakeMethod, 'undefined');
    });

    test('options get extended', function() {
      assert.equal(view.debug, true);
      assert.equal(view.enabled, true);
      assert.equal(view.test, 123);
    });

    test('doesn\'t mess with original viewObj', function() {
      assert.equal(viewObj.defaults.debug, false);
    });

    test('each instance gets a unique id', function() {
      assert.ok(view.id);
      var view2 = new View({ el: el });
      assert.notEqual(view.id, view2.id);
    });

    test('instanceof', function() {
      //assert.equal(view instanceof Fidel, true);
      assert.equal(view instanceof View, true);
    });
  });

  suite('#find', function() {
    test('only find elements scoped to parent element', function() {
      var button = view.find('button');
      assert.equal(button.length, 2);
    });
  });

  suite('#elements', function() {

    test('query elements and set them in els property', function() {

      assert.ok(view.name);
      assert.equal(view.name.length, 1);
      assert.equal(view.name.text(), 'Bob');

      assert.equal(view.submitButton[0].tagName, 'BUTTON');
    });
  });

  suite('#data-elements', function() {

    test('data-elements inside controller will automatically get selected and added to object', function() {

      assert.ok(view.lastName);
      assert.equal(view.lastName.length, 1);
      assert.equal(view.lastName.text(), 'Smith');
      assert.equal(view.lastName[0].tagName, 'SPAN');
      
    });

  });

  suite('#events', function() {

    test('auto bind events with selectors', function() {

      assert.equal(typeof view.buttonClickedEvent, 'undefined');
      view.submitButton.click();

      assert.ok(view.buttonClickedEvent);
      assert.equal(view.buttonClickCount, 1);
      assert.equal(view.nameClickCount, 0);
      assert.equal(view.viewClickCount, 1);
    });

    test('if no selector, bind to this.el', function() {

      assert.equal(typeof view.viewClickedEvent, 'undefined');
      view.el.click();
      assert.ok(view.viewClickedEvent);
      assert.equal(view.buttonClickCount, 0);
      assert.equal(view.nameClickCount, 0);
      assert.equal(view.viewClickCount, 1);
    });

    test('auto bind events with element names', function() {

      assert.equal(typeof view.nameClickEvent, 'undefined');
      view.name.click();

      assert.ok(view.nameClickEvent);
      assert.equal(view.buttonClickCount, 0);
      assert.equal(view.nameClickCount, 1);
      assert.equal(view.viewClickCount, 1);

    });

    test('auto bind events with data-element names', function() {

      assert.equal(view.lastNameClickCount, 0);
      view.lastName.click();

      assert.equal(view.lastNameClickCount, 1);
    });

  });

  suite('#actions', function() {

    test('auto bind all data-action to the corresponding method name', function() {

      assert.equal(typeof view.actionClickEvent, 'undefined');
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

    test('namespace events', function() {
      var check = false;

      var view2 = new View({ el: el });
      view.on('testOnEvent', function() {
      });

      view2.on('testOnEvent', function() {
        check = true;
      });

      view.emit('testOnEvent', null, true);

      assert.equal(check, false);
      
    });

    test('call every time triggered', function() {
      var count = 0;
      view.on('testOnEvent', function() {
        count++;
      });
      view.el.trigger('testOnEvent');
      view.el.trigger('testOnEvent');
      assert.equal(count, 2);
    });

  });

  suite('#one', function() {
    test('bind and then remove', function() {
      var count = 0;
      view.one('testOnEvent', function() {
        count++;
      });
      view.el.trigger('testOnEvent');
      view.el.trigger('testOnEvent');
      assert.equal(count, 1);
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

    test('third param limits to current instance', function() {
      var check = 0;

      var view2 = new View({ el: el });
      view.on('testOnEvent', function() {
        check++;
      });

      view2.on('testOnEvent', function() {
        check++;
      });

      view.emit('testOnEvent', null, true);
      view2.emit('testOnEvent', null, true);
      assert.equal(check, 2);
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

  suite('#destroy', function() {

    test('destroy event', function() {
      var check = false;
      view.on('destroy', function() {
        check = true;
      });
      view.destroy();
      assert.equal(check, true);
    });

    test('unbind events', function() {
      view.on('testOnEvent', $.noop);
      view.destroy();
      var events = $._data(el[0],'events');
      assert.ok(events === undefined || events === null);
    });
    
  });
  
  suite('Pre/Post events', function() {
    test('pre-event fires', function(done) {
      Fidel.onPreInit(function() {
        assert.equal(this.initWasCalled, undefined);
        done();
      });
      var Tmp = Fidel.declare({
        init: function() {
          this.initWasCalled = true;
        }
      });
      var v = new Tmp({ el: el });
    });

    test('post-event fires', function(done) {
      Fidel.onPostInit(function() {
        assert.equal(this.el, el);
        assert.equal(this.initWasCalled, true);
        done();
      });
      var Tmp = Fidel.declare({
        init: function() {
          this.initWasCalled = true;
        }
      });
      var v = new Tmp({ el: el });
    });
  });

  suite('Multiple instances', function() {
    test('multiple instances don\'t conflict', function() {

      var view2 = new View({
        el: el,
        debug: false,
        test: 456
      });

      assert.equal(view.debug, true);
      assert.equal(view.enabled, true);
      assert.equal(view.test, 123);

      assert.equal(view2.debug, false);
      assert.equal(view2.enabled, true);
      assert.equal(view2.test, 456);
      
    });
    
  });
  
  
});
