var todoStore = (function() {
  return {
    get: function() {
      var d = localStorage.getItem('fidel.todos');
      var todos = {};
      if (d) {
        d = JSON.parse(d);
        for (var key in d) {
          todos[key] = new Todo(d[key]);
        }
      }
      return todos;
    },
    save: function(todos) {
      console.log(todos);
      localStorage.setItem('fidel.todos', JSON.stringify(todos));
    }
  };
})();

var Todo = Fidel.Class.extend({
  defaults: {
    name: "empty todo...",
    done: false,
    order: 0 
  },
  init: function() {
  },
  toggleDone: function() {
    this.done = !this.done;
  }
});

var TodoView = Fidel.ViewController.extend({
  templates: {
    item: "#item-template"
  },
  events: {
    'keypress input[type="text"]': 'addOnEnter',
    'click .check': 'complete'
  },
  init: function() {
    this.todos = todoStore.get();
    console.log(this.todos);
    this.renderAll();
  },
  addOnEnter: function(e) {
    if (e.keyCode == 13) 
      this.add();
  },
  add: function() {
    var name = this.input.val();
    this.input.val('');
    console.log(this.taskCount);
    var todo = new Todo({ name: name, order: this.taskCount });
    this.taskCount++;
    this.todos[todo.guid] = todo;
    this.save();

    var tmp = this.template(this.templates.item, { todo: todo });
    this.todosContainer.prepend(tmp);
  },
  save: function() {
    todoStore.save(this.todos);
  },
  sortTasks: function() {
    var sorted = [];
    for (var key in this.todos) {
      sorted.push(this.todos[key]);
    }
    sorted.sort(function(a, b) {
      return (b.order - a.order);
    });
    return sorted;
  },
  renderAll: function() {
    var html = [];
    var todos = this.sortTasks();
    this.taskCount = todos.length;
    for (var i = 0, c = todos.length; i < c; i++) {
      var todo = todos[i];
      var tmp = this.template(this.templates.item, { todo: todo });
      html.push(tmp);
    }
    this.todosContainer.html(html.join(''));
  },
  complete: function(e) {
    var complete = (e.target.value == "on");
    
    var el = $(e.target);
    el.parents('li').toggleClass('done');
    var todoId = el.parents('li').attr('data-todoid');
    this.todos[todoId].toggleDone();
    this.save();
  },
  destroy: function(el) {
    var parent = el.parents('li');
    var guid = parent.attr('data-todoid');
    delete this.todos[guid];
    parent.remove();
    this.save();
  }
});


//app
var todos = new TodoView({ el: $("#todoapp") });

