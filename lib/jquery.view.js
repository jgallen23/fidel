!function($) {
  $.fn.view = function(obj) {
    if (this.length != 1) {
      throw new Error('Selector must match 1 element');
    }
    return new View(this, obj);
  };
}(jQuery);
