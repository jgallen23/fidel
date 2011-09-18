var TodoView = Fidel.ViewController.extend({
  templateSelector: "#item-template",
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
    var todo = new Todo({ name: name });
    this.todos.splice(0, 0, todo);
    var tmp = str.template(this.template, { todo: todo });
    this.todosContainer.prepend(tmp);
    this.save();
  },
  save: function() {
    todoStore.save(this.todos);
  },
  renderAll: function() {
    var html = [];
    for (var i = 0, c = this.todos.length; i < c; i++) {
      var todo = this.todos[i];
      var tmp = str.template(this.template, { todo: todo });
      html.push(tmp);
    }
    this.todosContainer.html(html.join(''));
  },
  complete: function(e) {
    var todoId = e.target.getAttribute('id').split("_")[1];
    console.log("complete", e, todoId);
  }
});
