var todoList = {
    todos : [],
    displayTodos: function() {
        console.log('My Todos:', this.todos);
    },
    addTodo: function(todoText) {
        this.todos.push({                       // pushing a object into todos Array
            todoText: todoText,
            completed: false,                   // set false by default for completed
        });
        this.displayTodos();
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
    },
};