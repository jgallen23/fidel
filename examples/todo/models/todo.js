var Todo = Fidel.Class.extend({
  defaults: {
    name: "empty todo...",
    done: false
  },
  init: function() {
  },
  toObj: function() {
    return {
      name: this.name,
      done: this.done
    };
  }
});

var todoStore = (function() {
  return {
    get: function() {
      var d = localStorage.getItem('fidel.todos');
      return (d)?JSON.parse(d):[];
    },
    save: function(todos) {
      localStorage.setItem('fidel.todos', JSON.stringify(todos));
    }
  };
})();
