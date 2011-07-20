!function(f) {
  var cache = {}; //check for "c_" cache for unit testing
  //publish("/some/topic", ["a","b","c"]);
  f.publish = function(topic, args){

    var subs = cache[topic], len = subs ? subs.length : 0;

    //can change loop or reverse array if the order matters
    while(len--){
      subs[len].apply(this, args || []);
    }
  };
  //subscribe("/some/topic", function(a, b, c){ /* handle data */ });
  f.subscribe = function(topic, callback){
    if(!cache[topic]){
            cache[topic] = [];
    }
    cache[topic].push(callback);
    return [topic, callback]; // Array
  };
  //var handle = subscribe("/some/topic", function(){});
  //unsubscribe(handle);
  f.unsubscribe = function(handle){
    console.log(handle);
    var subs = cache[handle[0]],
              callback = handle[1],
              len = subs ? subs.length : 0;

    while(len--){
      if(subs[len] === callback){
      subs.splice(len, 1);
      }
    }
  };


  f.Class.prototype.bind = function(name, callback) {
    return f.subscribe(this.guid+"."+name, this.proxy(callback));
  };
  f.Class.prototype.trigger = function(name, data) {
    f.publish(this.guid+"."+name, data);
    f.publish(name, data);
  };
  f.Class.prototype.unbind = function(handle) {
    f.unsubscribe(handle);
  };

}(Fidel || this);
