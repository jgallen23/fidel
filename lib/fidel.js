var _id = 0;
var Fidel = function(obj) {
  this.obj = obj;
};
Fidel.prototype.__init = function(el, options) {
  $.extend(this, this.obj);
  this.id = _id++;
  this.el = el;
  this.els = {};
  this.obj.defaults = this.obj.defaults || {};
  this.options = $.extend({}, this.obj.defaults, options);
  $('body').trigger('FidelPreInit', this);
  this.getElements();
  this.delegateEvents();
  this.delegateActions();
  if (this.init) {
    this.init();
  }
  $('body').trigger('FidelPostInit', this);
};
Fidel.prototype.eventSplitter = /^(\w+)\s*(.*)$/;
Fidel.prototype.find = function(selector) {
  return this.el.find(selector);
};
Fidel.prototype.proxy = function(func) {
  return $.proxy(func, this);
};

Fidel.prototype.getElements = function() {
  if (!this.elements)
    return;

  for (var selector in this.elements) {
    var elemName = this.elements[selector];
    this.els[elemName] = this.find(selector);
  }
};

Fidel.prototype.delegateEvents = function() {
  var self = this;
  if (!this.events)
    return;
  for (var key in this.events) {
    var methodName = this.events[key];
    var match = key.match(this.eventSplitter);
    var eventName = match[1], selector = match[2];

    var method = this.proxy(this[methodName]);

    if (selector === '') {
      this.el.on(eventName, method);
    } else {
      if (this.els[selector]) {
        this.els[selector].on(eventName, method);
      } else {
        this.el.on(eventName, selector, method);
      }
    }
  }
};

Fidel.prototype.delegateActions = function() {
  var self = this;
  self.el.on('click', '[data-action]', function(e) {
    var el = $(this);
    var action = el.attr('data-action');
    if (self[action]) {
      self[action](e, el);
    }
  });
};

Fidel.prototype.on = function(eventName, cb) {
  this.el.on(eventName+'.fidel'+this.id, cb);
};

Fidel.prototype.emit = function(eventName, data) {
  this.el.trigger(eventName+'.fidel'+this.id, data);
};
Fidel.prototype.hide = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].hide();
    }
  }
  this.el.hide();
};
Fidel.prototype.show = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].show();
    }
  }
  this.el.show();
};

Fidel.prototype.destroy = function() {
  this.el.empty();
  this.emit('destroy');
  this.el.unbind('.fidel'+this.id);
};

Fidel.declare = function(obj) {
  var FidelModule = function(el, options) {
    this.__init(el, options);
  };
  FidelModule.prototype = new Fidel(obj);
  return FidelModule;
};

//for plugins
Fidel.onPreInit = function(fn) {
  $('body').on('FidelPreInit', function(e, obj) {
    fn.call(obj);
  });
};
Fidel.onPostInit = function(fn) {
  $('body').on('FidelPostInit', function(e, obj) {
    fn.call(obj);
  });
};