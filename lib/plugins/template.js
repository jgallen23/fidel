(function($) {
  var templateCache = {};
  $.fn.template = function tmpl(template, data) {
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
    this.html(data ? fn( data ) : fn);
  };
})(window.jQuery || window.Zepto);

Fidel.prototype.render = function(data) {
  var template = this.template || $('[data-template='+this.templateName+']').html();
  var target = (this.templateTarget) ? this.find(this.templateTarget) : this.el;
  target.template(template, data);
  this.getElements();
  if (this.views) {
    for (var viewName in this.views) {
      this[viewName].render(data);
    }
  }
};

