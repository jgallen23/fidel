var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
// The base Class implementation (does nothing)
Fidel.Class = function(){};

// Create a new Class that inherits from this class
Fidel.Class.extend = function(prop) {
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

  var extendObj = function(a, b) {
    for (var key in a) {
      if (b[key]) a[key] = b[key];
    }
  };
  
  // The dummy class constructor
  function Class(opt) {
    // All construction is actually done in the init method
    if (!initializing) {
      if (this.defaults) {
        for (var key in this.defaults) {
          if (typeof opt !== 'object' || !opt[key]) this[key] = this.defaults[key];
        }
      }
      if (typeof opt === 'object') {
        for (var okey in opt) {
          this[okey] = opt[okey];
        }
      }
      if (!this.guid) this.guid = Fidel.guid();
      if (this._initialize) this._initialize.apply(this, arguments);
      if (this.init) this.init.apply(this, arguments);
    }
  }
  
  // Populate our constructed prototype object
  Class.prototype = prototype;
  Class.prototype.extendObject = extendObj;
  Class.prototype.proxy = function(func) {
    var thisObject = this;
    return(function(){ 
      if (!func) return;
      return func.apply(thisObject, arguments); 
    });
  };
  
  // Enforce the constructor to be what we expect
  Class.constructor = Class;

  // And make this class extendable
  Class.extend = arguments.callee;
  
  return Class;
};
