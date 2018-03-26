var todoList = {
    todos : [],
    displayTodos: function() {
        if (this.todos.length === 0) {
            console.log('YOUr todo list is empty!');
        } else {
            console.log('My Todos:');
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].completed === true) {
                    console.log('(x)', this.todos[i].todoText);
                } else {
                    console.log('( )', this.todos[i].todoText);
                }
            }
        }
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
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos, so we can match it up against totalTodos
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }

        // Case 1: If everything's true, make everything false.
        if (completedTodos === totalTodos) {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        // Case 2: OTherwise, make everything true.
        } else {
            for (var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }

        this.displayTodos();
    },
};

var handlers = {                // handlers are use for html -> this (handlers object) -> todoList control
    displayTodos: function() {  // called by handlers.displayTodos()
        todoList.displayTodos();
    },
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput'); // Retrieve the element of addTodoTextInput
        todoList.addTodo(addTodoTextInput.value);                           // addTodoTextInput.value is the value of what is type in
        addTodoTextInput.value = '';                                        // Because this is retrieving the element, we can manipulate the element and clear it out
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');   // <input id="changeTodoPositionInput" type="number">
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');           // <input id="changeTodoTextInput" type="text">
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value)
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
    },
    deleteTodo: function(){
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);                         // since this is a number
        deleteTodoPositionInput.value = '';
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
    },
    toggleAll: function() {     // called by handlers.toggleAll()
        todoList.toggleAll();
    },
};

var view = {                                        
    displayTodos: function() {                      // view.displayTodos();
        var todoUl = document.querySelector('ul');  // Get me the element <ul> and everything in its child
        todoUl.innerHTML = '';                      // reset the <ul> before putting the list in 
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');          // Create <li> element
            todoLi.textContent = todoList.todos[i].todoText;    // Setting the textContent of <li>todoText</li>
            todoUl.appendChild(todoLi);
        }
    }
};