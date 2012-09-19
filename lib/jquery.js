$.declare = function(name, obj) {

  $.fn[name] = function() {
    var args = Array.prototype.slice.call(arguments);
    var options = args.shift();

    return this.each(function() {
      var $this = $(this);

      var data = $this.data(name);

      if (!data) {
        var View = Fidel.declare(obj);
        data = new View($this, options);
        $this.data(name, data); 
      }
      if (typeof options === 'string') {
        data[options].apply(data, args);
      }
    });
  };

  $.fn[name].defaults = obj.defaults || {};

};

$.Fidel = Fidel;
