module('Class', {
  setup: function() {
    this.Class = Fidel.Class.extend({
      defaults: {
        a: 1,
        b: 2
      },
      init: function() {
        ok(true);
      },
      method: function() {
        return true;
      },
      testSuper: function() {
        ok(true);
      }
    });
  }
});

test('create class', function() {
  expect(3);
  var c = new this.Class();
  ok(c instanceof Fidel.Class);
  ok(c instanceof this.Class);
});

test('methods', function() {
  expect(3);
  var c = new this.Class();
  ok(c.method);
  ok(c.method());
});

test('inheritance', function() {
  expect(3);
  var Inh = this.Class.extend({
    init: function() {
      this._super();
    }
  });
  var i = new Inh();
  ok(i instanceof Fidel.Class);
  ok(i instanceof this.Class);
});

test('super', function() {
  expect(3); //init, testSuper, original testSuper
  var Inh = this.Class.extend({
    testSuper: function() {
      this._super();
      ok(true);
    }
  });
  var i = new Inh();
  i.testSuper();
});

test('defaults', function() {
  var c = new this.Class({ b: 3 });
  equals(c.a, 1);
  equals(c.b, 3);
});

//test proxy

module('Events', {
  setup: function() {
    Class = Fidel.Class.extend({ });
    this.c = new Class();
  }
});

test('pubsub', function() {
  expect(1);
  var handle = Fidel.subscribe('test', function(data) {
    equals(data, 'data');
  });
  Fidel.publish('test', ['data']);
  Fidel.unsubscribe(handle);
  Fidel.publish('test', ['data']);
});

test('events', function() {
  expect(1);
  this.c.on('testEvent', function(data) {
    equals(data, 1);
  });
  this.c.emit('testEvent', [1]);
});

test('global events', function() {
  expect(1);
  Fidel.subscribe('globalEvent', function(data) {
    equals(data, 1);
  });
  this.c.emit('globalEvent', [1]);
});

test('multiple events', function() {
  expect(3);
  var handler = this.c.on('testEvent', function(data) {
    equals(data, 1);
  });
  this.c.on('testEvent', function(data) {
    equals(data, 1);
  });
  this.c.emit('testEvent', [1]);
  this.c.removeListener(handler);
  this.c.emit('testEvent', [1]);
});

module('ViewController', {
  setup: function() {
    this.Widget = Fidel.ViewController.extend({
      defaults: {
        test: 1
      },
      subscribe: {
        'global': 'pubGlobal' 
      },
      events: {
        'click a': 'hrefClicked'
      },
      init: function() {
      },
      action: function(element, e) {
        equals(element[0].nodeName, "BUTTON");
        equals(e.type, "click");
      },
      action2: function(element, e) {
        equals(element[0].nodeName, "BUTTON");
        equals(e.type, "click");
      },
      hrefClicked: function(e) {
        equals(e.target.nodeName, "A");
      },
      pubGlobal: function(data) {
        ok(data);
      }
    });
    this.w = new this.Widget({ el: $('#widget'), data: '123' });
  },
  teardown: function() {
    if (this.w.el)
      this.w.destroy();
  }
});

test('has element', function() {
  ok(this.w.el);
});

test('has defaults', function() {
  equals(this.w.test, 1);
});

test('has attribute passed in', function() {
  equals(this.w.data, '123');
});

test('find', function() {
  equals(this.w.find('button').length, 2);
});

test('browser events', function() {
  expect(1);
  QUnit.triggerEvent(this.w.find('a')[0], "click", Event);
});

test('data-element', function() {
  ok(this.w.node);
});

test('mutitiple data elements', function() {
  console.log(this.w.node2);
  equals(this.w.node2.length, 3);
});

test('data-action', function() {
  expect(2);
  QUnit.triggerEvent(this.w.find('button')[0], "click", Event);
});

test('inject data-action', function() {
  expect(2);
  this.w.el.append($('<button class="inject" data-action="action2">inject button</button>'));
  QUnit.triggerEvent(this.w.find('button.inject')[0], "click", Event);
});

test('button outside of widget', function() {
  expect(0);
  QUnit.triggerEvent($('button')[2], "click", Event);
});

test('subscriptions',function() {
  expect(1);
  Fidel.publish('global', [1]);
});

test('destroy', function() {
  expect(0);
  this.w.destroy();
  QUnit.triggerEvent($('button')[0], "click", Event);
  Fidel.publish('global', [1]);
});

//render
//elements

module('Misc');
test('no conflict', function() {
  var f = Fidel.noConflict();
  equal(Fidel, undefined);
});
