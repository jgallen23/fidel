module('Class', {
  setup: function() {
    this.Class = Fidel.Class.extend({
      init: function() {
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
      subscribe: {
        'global': 'pubGlobal' 
      },
      events: {
        'click a': 'hrefClicked'
      },
      init: function() {
      },
      action: function(e) {
        equals(e.target.nodeName, "BUTTON");
      },
      action2: function(e) {
        equals(e.target.nodeName, "BUTTON");
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

test('data-action', function() {
  expect(1);
  QUnit.triggerEvent(this.w.find('button')[0], "click", Event);
});

test('inject data-action', function() {
  expect(1);
  this.w.el.append($('<button class="inject" data-action="action2">inject button</button>'));
  this.w.delegateActions();
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
//subs

module('Misc');
test('no conflict', function() {
  var f = Fidel.noConflict();
  equal(Fidel, undefined);
});
