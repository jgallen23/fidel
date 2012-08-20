Fidel.onPreInit(function() {
  this.processSubViews();
});

Fidel.prototype.processSubViews = function() {
  if (!this.views) {
    return;
  }

  for(var name in this.views) {
    var view = this.views[name];
    var viewName = view.view || name;
    var target = this.find(view.target);
    target[viewName](view.options);
    this[name] = target.data(viewName);
    if (view.events) {
      for (var eventName in view.events) {
        target.on(eventName, this.proxy(this[view.events[eventName]]));
      }
    }
  }
};

Fidel.prototype.addSubView = function(target, view, options) {
  target = (typeof target == 'string') ? this.find(target) : target;
  target[view](options);
  var view = target.data(view);
  if (!this.views) {
    this.views = [];
  }
  this.views.push(view);
  return view;
};
