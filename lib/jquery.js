(function($) {
  window.fidel = window.fidel || {};

  window.fidel.$ = function(name, obj) {
    if (typeof window.fidel.modules[name] === "undefined"){
      throw "The module " + name + " hasn't been defined yet. You need to use fidel.define first!";
    }
    else {
      $.fn[name] = function() {
        var args = Array.prototype.slice.call(arguments);
        var options = args.shift();
        var methodValue;
        var els;

        els = this.each(function() {
          var $this = $(this);

          var data = $this.data(name);

          if (!data) {
            var View = window.fidel.modules[name];
            var opts = $.extend({}, options, { el: $this });
            data = new View(opts);
            $this.data(name, data);
          }
          if (typeof options === 'string') {
            methodValue = data[options].apply(data, args);
          }
        });

        return (typeof methodValue !== 'undefined') ? methodValue : els;
      };

      $.fn[name].defaults = obj.defaults || {};
    }
  };

  $.Fidel = window.Fidel;
})(jQuery);
