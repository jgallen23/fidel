(function(w, $) {
  var _id = 0;
  var $body = $('body');

  var Fidel = function(obj) {
    this.obj = $.extend(true,{},obj);
  };

  Fidel.prototype.__init = function(options) {
    $.extend(this, this.obj);
    this.id = _id++;
    this.namespace = '.fidel' + this.id;
    $.extend(true, this, this.defaults, options);
    $body.trigger('FidelPreInit', this);
    this.setElement(this.el || $('<div/>'));
    this.__initPlugins();

    if (this.init) {
      this.init();
    }
    $body.trigger('FidelPostInit', this);
  };
  Fidel.prototype.__initPlugins = function () {
    var functions = Object.keys(Object.getPrototypeOf(this));

    for (var i = 0, len = functions.length; i < len; i++) {
      var func = functions[i];

      if (func.indexOf('__init_') > -1){
        this[func].call(this);
      }
    }
  };

  Fidel.prototype.eventSplitter = /^(\w+)\s*(.*)$/;

  Fidel.prototype.setElement = function(el) {
    this.el = el;
    this.getElements();
    this.delegateEvents();
    this.delegateActions();
  };

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
      this[elemName] = this.find(selector);
    }
  };

  Fidel.prototype.dataElements = function() {
    var self = this;
    this.find('[data-element]').each(function(index, item) {
      var el = $(item);
      var name = el.data('element');
      self[name] = el;
    });
  };

  Fidel.prototype.delegateEvents = function() {
    if (!this.events)
      return;
    for (var key in this.events) {
      var methodName = this.events[key];
      var match = key.match(this.eventSplitter);
      var eventName = match[1], selector = match[2];

      var method = this.proxy(this[methodName]);

      if (selector === '') {
        this.el.on(eventName + this.namespace, method);
      } else {
        if (this[selector] && typeof this[selector] != 'function') {
          this[selector].on(eventName + this.namespace, method);
        } else {
          this.el.on(eventName + this.namespace, selector, method);
        }
      }
    }
  };

  Fidel.prototype.delegateActions = function() {
    var self = this;
    self.el.on('click'+this.namespace, '[data-action]', function(e) {
      var el = $(this);
      var action = el.attr('data-action');
      if (self[action]) {
        self[action](e, el);
      }
    });
  };

  Fidel.prototype.on = function(eventName, cb) {
    this.el.on(eventName+this.namespace, cb);
  };

  Fidel.prototype.one = function(eventName, cb) {
    this.el.one(eventName+this.namespace, cb);
  };

  Fidel.prototype.emit = function(eventName, data, namespaced) {
    var ns = (namespaced) ? this.namespace : '';
    this.el.trigger(eventName+ns, data);
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
    this.el.unbind(this.namespace);
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

  var getInitMethod = function (pluginName) {
    return '__init_' + pluginName;
  };

  // Public API
  w.fidel = w.fidel || {};
  w.fidel = {
    define : function define(name, obj){
      var FidelModule = function(options) {
        var extendArgs = [true, {}, w.fidel.modules[name].defaults],
            pluginObj, additionalOpts = {};

        if (obj.plugins && obj.plugins.length){
          for (var i = 0, length = obj.plugins.length; i < length; i++) {
            var pluginName = obj.plugins[i];

            if (w.fidel.plugins[pluginName]) {
              pluginObj = w.fidel.plugins[pluginName];

              if (pluginObj.dicts.defaults){
                extendArgs.push(pluginObj.dicts.defaults);
              }

              additionalOpts = $.extend(true, {}, additionalOpts, pluginObj.dicts);
            }

            delete additionalOpts.defaults;
          }
        }

        this.obj.defaults = $.extend.apply(this, extendArgs);
        $.extend(true, this, additionalOpts);

        this.__init(options);
      };
      FidelModule.prototype = new Fidel(obj);

      if (obj.plugins && obj.plugins.length){
        w.fidel.extendProto(FidelModule.prototype, obj.plugins);
      }

      w.fidel.modules[name] = FidelModule;

      if (obj.defaults){
        w.fidel.modules[name].defaults = $.extend(true,{},obj.defaults);
      }

      $body.trigger('FidelDefined', [name, obj]);

      return FidelModule;
    },
    extendProto: function (proto, plugins) {
      var pluginName, pluginObj;

      for (var i = 0, len = plugins.length; i < len; i++) {
        pluginName = plugins[i];

        if (w.fidel.plugins[pluginName]){
          pluginObj = w.fidel.plugins[pluginName];
          proto = $.extend(true, proto, pluginObj.methods);
        }
        else {
          throw new Error(pluginName + 'hasn\'t been defined as a Fidel plugin!');
        }
      }
    },
    plugin : function definePlugin(name, obj){
      var keys = Object.keys(obj),
          methods = {},
          key,
          dicts = {};

      for (var i = 0, len = keys.length; i < len; i++) {
        key = keys[i];

        if (typeof obj[key] === 'function'){
          if (key !== 'init') {
            methods[key] = obj[key];
          }
          else {
            methods[getInitMethod(name)] = obj[key];
          }
        }
        else {
          dicts[key] = obj[key];
        }
      }

      w.fidel.plugins[name] = {
        methods: methods,
        dicts: dicts
      };
    },
    modules : {},
    plugins : {}
  };

  fidel.plugin('dataEl', {
    defaults: {
    },
    init: function () {
      this.getDataElements();
    },
    getDataElements: function() {
      var self = this;

      this.find('[data-element]').each(function(i, item) {
        var el = $(item);
        var name = el.data('element');

        self[name] = el;
      });
    }
  });

  w.Fidel = Fidel;
})(window, window.jQuery || window.Zepto);