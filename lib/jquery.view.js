!function($) {
  $.fn.view = function(obj, options) {
    if (this.length != 1) {
      throw new Error('Selector must match 1 element');
    }
    return this.each(function() {
      var el = $(this);
      el.data('view', new View(el, obj, options));
    });
  };
}(window.jQuery || window.Zepto);
