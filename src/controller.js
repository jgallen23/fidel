(function(f) {
  var eventSplitter = /^(\w+)\s*(.*)$/;

  var ViewController = f.Class.extend({
    _initialize: function(options) {

      for (var key in options) {
        this[key] = options[key];
      }
      if (!this.el) throw "el is required";
      
      this._subscribeHandles = {};
      this._processedActions = {};
      if (this.events) this.delegateEvents();
      if (this.elements) this.refreshElements();
      if (this.templateSelector) this.loadTemplate();
      if (!this.actionEvent) this.actionEvent = "click";
      if (this.subscribe) this.bindSubscriptions();
      this.delegateActions();
      this.getDataElements();
    },
    delegateEvents: function() {
      for (var key in this.events) {
        var methodName = this.events[key];
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];

        var method = this.proxy(this[methodName]);

        if (selector === '') {
          this.el.bind(eventName, method);
        } else {
          this.el.delegate(selector, eventName, method);
        }
      }
    },
    delegateActions: function() {
      var elements = this.find("[data-action]");
      for (var i = 0, c = elements.length; i < c; i++) {
        var elem = $(elements[i]);
        var methodName = elem.attr("data-action");
        var method = this.proxy(this[methodName]);
        var eventName = this.actionEvent, selector = '[data-action="'+methodName+'"]';
        if (!this._processedActions[methodName]) {
          this.el.delegate(selector, eventName, method);
          this._processedActions[methodName] = true;
        }
      }
    },
    refreshElements: function() {
      for (var key in this.elements) {
        this[key] = this.find(this.elements[key]);
      }
    },
    getDataElements: function() {
      var self = this;
      var elements = this.find("[data-element]");
      for (var i = 0, c = elements.length; i < c; i++) {
        var elem = $(elements[i]);
        self[elem.attr("data-element")] = elem;
      }
    },
    bindSubscriptions: function() {
      for (var key in this.subscribe) {
        this._subscribeHandles[key] = Fidel.subscribe(key, this.proxy(this[this.subscribe[key]]));
      }
    },
    loadTemplate: function() {
      this.template = $(this.templateSelector).html();
    },
    find: function(selector) {
      return $(selector, this.el[0]);
    },
    render: function(data, selector) {
      var str = window.str || $;
      if (str) {
        var tmp = str.template(this.template, data);
        selector = (selector)?$(selector):this.el;
        selector.html(tmp);
      }
    },
    destroy: function() {
      for (var key in this._subscribeHandles) {
        Fidel.unsubscribe(this._subscribeHandles[key]);
      }
      for (var action in this._processedActions) {
        this.el.unbind(action);
      }
      this.el = null;
    }
  });
  f.ViewController = ViewController;
})(Fidel || this);
