var View = function(el, obj, options) {
  $.extend(this, obj);
  this.el = el;
  this.els = {};
  obj.defaults = obj.defaults || {};
  this.options = $.extend({}, obj.defaults, options);
  if (this.preInit) {
    this.preInit();
  }
  this.delegateEvents();
  this.delegateActions();
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
    this.els[elemName] = this.find(selector);
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

View.prototype.delegateActions = function() {
  var actions = this.el.find('[data-action]');
  var self = this;
  actions.each(function() {
    var el = $(this);
    var action = el.attr('data-action');
    self.el.on('click', '[data-action='+action+']', function(e) {
      self[action](e, el);
    });
  });
};

View.prototype.processSubViews = function() {
  if (!this.views)
    return;
  for (var key in this.views) {
    var viewObj = this.views[key];
    this.views[key] = new View($(viewObj.target), viewObj.view, viewObj.options);

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

View.prototype.render = function(data) {
  this.renderSubViews(data);
  if (this._render)
    this._render(data);
  this.getElements();
};

View.prototype.renderSubViews = function(data) {
  if (this.views) {
    for (var key in this.views) {
      this.views[key].render(data);
    }
  }
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

