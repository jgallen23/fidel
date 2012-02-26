/*!
  * Fidel - A javascript view controller
  * v2.0.0
  * https://github.com/jgallen23/fidel
  * copyright JGA 2012
  * MIT License
  */

var View = function(el, obj) {
  $.extend(this, obj);
  this.el = el;
  this.delegateEvents();
  this.getElements();
  this.processSubViews();
  if (this.init) {
    this.init();
  }
};
View.prototype.eventSplitter = /^(\w+)\s*(.*)$/;
View.prototype.find = function(selector) {
  return this.el.find(selector);
};
View.prototype.proxy = function(func) {
  var thisObject = this;
  return(function(){ 
    if (!func) return;
    return func.apply(thisObject, arguments); 
  });
};

View.prototype.getElements = function() {
  if (!this.elements)
    return;

  for (var selector in this.elements) {
    var elemName = this.elements[selector];
    this[elemName] = this.find(selector);
  }
};

View.prototype.delegateEvents = function() {
  if (!this.events)
    return;
  for (var key in this.events) {
    var methodName = this.events[key];
    var match = key.match(this.eventSplitter);
    var eventName = match[1], selector = match[2];

    var method = this.proxy(this[methodName]);

    if (selector === '') {
      this.el.bind(eventName, method);
    } else {
      this.el.delegate(selector, eventName, method);
    }
  }
};

View.prototype.processSubViews = function() {
  if (!this.views)
    return;
  for (var key in this.views) {
    var viewObj = this.views[key];
    this.views[key] = $(viewObj.target).view(viewObj.view);

    if (viewObj.events) {
      for (var eventName in viewObj.events) {
        var methodName = viewObj.events[eventName];
        var method = this.proxy(this[methodName]);
        this.views[key].on(eventName, method);
      }
    }
  }
};

View.prototype.processSubscriptions = function() {
  if (!this.subs)
    return; 
};

View.prototype.render = function() {
  var tmp = $('[data-template='+this.templateName+']');
  if (this.views) {
    for (var key in this.views) {
      this.views[key].render();
    }
  }
  this.el.html(tmp);
  this.getElements();
};

View.prototype.on = function(eventName, cb) {
  this.el.on(eventName, cb);
};

View.prototype.emit = function(eventName, data) {
  this.el.trigger(eventName, data);
};
View.prototype.hide = function() {
  this.el.hide();
};
View.prototype.show = function() {
  this.el.show();
};


!function($) {
  $.fn.view = function(obj) {
    if (this.length != 1) {
      throw new Error('Selector must match 1 element');
    }
    return new View(this, obj);
  };
}(window.jQuery || window.Zepto);
