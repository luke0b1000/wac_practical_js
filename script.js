var todoList = {
    todos : [],
    addTodo: function(todoText) {
        this.todos.push({                       // pushing a object into todos Array
            todoText: todoText,
            completed: false,                   // set false by default for completed
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
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
    },
};

var handlers = {                // handlers are use for html -> this (handlers object) -> todoList control
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput'); // Retrieve the element of addTodoTextInput
        todoList.addTodo(addTodoTextInput.value);                           // addTodoTextInput.value is the value of what is type in
        addTodoTextInput.value = '';                                        // Because this is retrieving the element, we can manipulate the element and clear it out
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');   // <input id="changeTodoPositionInput" type="number">
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');           // <input id="changeTodoTextInput" type="text">
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value)
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(){
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);                         // since this is a number
        deleteTodoPositionInput.value = '';
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {     // called by handlers.toggleAll()
        todoList.toggleAll();
        view.displayTodos();
    },
};

var view = {                                        
    displayTodos: function() {                      // view.displayTodos();  Added at the end of every handler
        var todoUl = document.querySelector('ul');  // Get me the element <ul> and everything in its child
        todoUl.innerHTML = '';                      // reset the <ul> before putting the list in 
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');          // Create <li> element
            var todo = todoList.todos[i];                       // created each individual todo for less typing later on
            var todoTextWithCompletion = '';

            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = i;                                  // <li id="0">...</li>  <li id="1">...</li>
            todoLi.textContent = todoTextWithCompletion;    // Setting the textContent of <li>todoText</li>
            todoLi.appendChild(this.createDeleteButton());  // Puts <li>textContent     <button className="deleteButton">Delete</button>      </li>
            todoUl.appendChild(todoLi);                     // <ul> <li id="0">textContent      <button className="deleteButton">Delete</button>    </li></ul>
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');    // Create Delete Button
        deleteButton.textContent = 'Delete';                    // Give a visible name of the Button
        deleteButton.className = 'deleteButton';                // <button className="deleteButton">
        return deleteButton;                                    // <button className="deleteButton">Delete</button>
    },
};