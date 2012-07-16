!function($) {
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
}(window.jQuery || window.Zepto);

View.prototype._render = function(data) {
  this.el.template(this.template, data);
};


View.prototype.render = function(data) {
  this.renderSubViews(data);
  if (this._render)
    this._render(data);
  this.getElements();
};

