var context = this;
var Fidel = {};
Fidel.guid = function(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  }).toUpperCase();      
};
Fidel.extend = function() {
  throw new Error("Fidel.extend is deprecated, please use Fidel.ViewController.extend");
};

var o = context.Fidel;
Fidel.noConflict = function() {
  context.Fidel = o;
  return this;
};
