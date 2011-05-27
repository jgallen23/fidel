/*!
  * Fidel - A javascript controller 
  * https://github.com/jgallen23/fidel
  * copyright JGA 2011
  * MIT License
  */

var str = (function() {
	var templateCache = {};
	var formatRegEx = /\{([^}]+)\}/g;

	return {
		format: function(s, args) {
			return s.replace(formatRegEx, function(_, match){ return args[match]; }); 
		}, 
		template: function tmpl(template, data) {
			var fn = !/\W/.test(template) ?
			  templateCache[template] = templateCache[template] ||
				tmpl(template) :
			  new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				template
				  .replace(/[\r\t\n]/g, "")
				  .split("{!").join("\t")
				  .replace(/((^|!})[^\t]*)'/g, "$1\r")
				  .replace(/\t=(.*?)!}/g, "',$1,'")
				  .split("\t").join("');")
				  .split("!}").join("p.push('")
				  .split("\r").join("\\'")
			  + "');}return p.join('');");
			return data ? fn( data ) : fn;
		}
	};
})();
if (typeof module !== "undefined") {
	module.exports = str;
}

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init ) {
        if (this.initialize) this.initialize.apply(this, arguments);
        this.init.apply(this, arguments);
      }
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };

  if (typeof exports != 'undefined' && exports != null) {
    exports.Class = Class;
  }

})();

(function(obj) {
  var eventSplitter = /^(\w+)\s*(.*)$/;
      

  var Fidel = Class.extend({
    initialize: function(options) {

      for (var key in options) {
        this[key] = options[key];
      }
      
      if (this.events) this.delegateEvents();
      if (this.elements) this.refreshElements();
      if (this.templateSelector) this.loadTemplate();
    },
    proxy: function(func){
      var self = this;
      return(function(){ 
        return func.apply(self, arguments); 
      });
    },
    delegateEvents: function() {
      for (var key in this.events) {
        var methodName = this.events[key];
        var method = this.proxy(this[methodName]);

        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];

        if (selector === '') {
          this.el.bind(eventName, method);
        } else {
          this.el.delegate(selector, eventName, method);
        }
      }
    },
    refreshElements: function() {
      for (var key in this.elements) {
        this[key] = this.find(this.elements[key]);
      }
    },
    loadTemplate: function() {
      this.template = $(this.templateSelector).html();
    },
    find: function(selector) {
      return $(selector, this.el[0]);
    },
    render: function(data, selector) {
      if (str) {
        var tmp = str.template(this.template, data);
        selector = $(selector) || this.el;
        selector.html(tmp);
      }
    },
    trigger: function(name, val) {
      bean.fire(this, name, val);
    },
    bind: function(name, handler) {
      bean.add(this, name, handler);
    }
  });
  obj.Fidel = Fidel;
})(window);
