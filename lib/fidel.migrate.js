(function (w, $) {
	$.declare = function (name, obj) {
		return w.fidel.define(name, obj);
	};
})(window, jQuery);