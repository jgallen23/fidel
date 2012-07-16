View.prototype._render = function(data) {
  jade.render(this.el[0], this.templateName, data);
};
