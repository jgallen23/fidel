var View = function(el, obj, options) {
  $.extend(this, obj);
  this.el = el;
  this.els = {};
  obj.defaults = obj.defaults || {};
  this.options = $.extend({}, obj.defaults, options);
  this.getElements();
  this.delegateEvents();
  this.delegateActions();
  if (this.init) {
    this.init();
  }
  $('body').trigger('FidelInit', this);
};
View.prototype.eventSplitter = /^(\w+)\s*(.*)$/;
View.prototype.find = function(selector) {
  return this.el.find(selector);
};
View.prototype.proxy = function(func) {
  return $.proxy(func, this);
};

View.prototype.getElements = function() {
  if (!this.elements)
    return;

  for (var selector in this.elements) {
    var elemName = this.elements[selector];
    this.els[elemName] = this.find(selector);
  }
};

View.prototype.delegateEvents = function() {
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

View.prototype.delegateActions = function() {
  var self = this;
  self.el.on('click', '[data-action]', function(e) {
    var el = $(this);
    var action = el.attr('data-action');
    if (self[action]) {
      self[action](e, el);
    }
  });
};

View.prototype.on = function(eventName, cb) {
  this.el.on(eventName, cb);
};

View.prototype.emit = function(eventName, data) {
  this.el.trigger(eventName, data);
};
View.prototype.hide = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].hide();
    }
  }
  this.el.hide();
};
View.prototype.show = function() {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].show();
    }
  }
  this.el.show();
};

//for plugins
View.onInit = function(fn) {
  $('body').on('FidelInit', function(e, obj) {
    fn.call(obj);
  });
};

