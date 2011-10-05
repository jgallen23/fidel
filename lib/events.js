var cache = {}; //check for "c_" cache for unit testing
//publish("/some/topic", ["a","b","c"]);
Fidel.publish = function(topic, args){

  var subs = cache[topic], len = subs ? subs.length : 0;

  //can change loop or reverse array if the order matters
  while(len--){
    subs[len].apply(this, args || []);
  }
};
//subscribe("/some/topic", function(a, b, c){ /* handle data */ });
Fidel.subscribe = function(topic, callback){
  if(!cache[topic]){
          cache[topic] = [];
  }
  cache[topic].push(callback);
  return [topic, callback]; // Array
};
//var handle = subscribe("/some/topic", function(){});
//unsubscribe(handle);
Fidel.unsubscribe = function(handle){
  var subs = cache[handle[0]],
            callback = handle[1],
            len = subs ? subs.length : 0;

  while(len--){
    if(subs[len] === callback){
    subs.splice(len, 1);
    }
  }
};


Fidel.Class.prototype.on = Fidel.Class.prototype.bind = function(name, callback) {
  return Fidel.subscribe(this.guid+"."+name, this.proxy(callback));
};
Fidel.Class.prototype.emit = Fidel.Class.prototype.trigger = function(name, data) {
  Fidel.publish(this.guid+"."+name, data);
  Fidel.publish(name, data);
};
Fidel.Class.prototype.removeListener = Fidel.Class.prototype.unbind = function(handle) {
  Fidel.unsubscribe(handle);
};
