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
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        // // Case 1: If everything's true, make everything false.
        // if (completedTodos === totalTodos) {
        //     this.todos.forEach(function(todo) {
        //         todo.completed = false;
        //     });
        // // Case 2: OTherwise, make everything true.
        // } else {
        //     this.todos.forEach(function(todo) {
        //         todo.completed = true;
        //     });
        // }

        this.todos.forEach(function(todo) {
            // Case 1: If everything's true, make everything false.
            if (completedTodos === totalTodos) {
                todo.completed = false;
            // Case 2: OTherwise, make everything true.
            } else {
                todo.completed = true;
            }
        });
        
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
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
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
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {     // target: button.deleteButton  --> parentNode: li#0    # represents id    Listen in on all ul clicks
            //  console.log(event);                             // So I can look at the events passed in
            var elementClicked = event.target;                  // Get the element that was clicked on.

            if (elementClicked.className === 'deleteButton') {             // Check if elementClicked.className is deleteButton  <button className="deleteButton">Delete</button>
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));    // parseInt is to convert the id from string to Number
            }
        });
    },
};

view.setUpEventListeners();