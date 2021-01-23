// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);  // getTodos executes after rendering the HTML
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// Functions
function addTodo(event) {
    event.preventDefault();
    // todo main div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // new todo attached
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to localStorage
    saveLocalTodos(todoInput.value);
    // completed button
    const completedButton = addButton('fas fa-check', 'complete-btn');
    todoDiv.appendChild(completedButton);
    // garbage button
    const garbageButton = addButton('fas fa-trash', 'garbage-btn');
    todoDiv.appendChild(garbageButton);
    // get all and attach it to our todo-list div in page
    todoList.appendChild(todoDiv);
    // clear input
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    // console.dir(item);
    // detect which button the user clicks !!
    if(item.classList[0] === 'garbage-btn') {
        // We're pressing the garbage btn !!! 
        const todo = item.parentElement;
        // 'fall' effect added by a class
        todo.classList.add('fall');
        // remove todo from localStorage
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            // the element is removed once the transition is over!
            todo.remove();
        });
    }
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        // completed class will be activated or desactivated when clicking
        todo.classList.toggle('completed');
    }
}

// Add todos to Local Storage
function saveLocalTodos(todo) {
    let todos = checkLocalStorage('todos');
    todos.push(todo); // add new todo to our array
    // store our array back into localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos = checkLocalStorage('todos');
    // identify the index of the deleted item
    const todoIndex = todo.children[0].innerText;
    // use splice to remove the item from our array
    todos.splice(todos.indexOf(todoIndex), 1);  // 1 to indicate just one element
    // store our array back into localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Check current status of localStorage by key name
function checkLocalStorage(key) {
    // check if there's something in the local storage already
    if(localStorage.getItem(key) === null) {
        return [];  // initialize our array
    } else {
        // collect our JSON with JSON.parse !
        return JSON.parse(localStorage.getItem(key));
    }
}

function getTodos() {
    let todos = checkLocalStorage('todos');
    todos.forEach(function(todo) {
        // todo main div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // new todo attached
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;  // important! todo comes from localStorage !
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // completed button
        const completedButton = addButton('fas fa-check', 'complete-btn');
        todoDiv.appendChild(completedButton);
        // garbage button
        const garbageButton = addButton('fas fa-trash', 'garbage-btn');
        todoDiv.appendChild(garbageButton);
        // get all and attach it to our todo-list div in page
        todoList.appendChild(todoDiv);
        // clear input
        todoInput.value = '';
    });
}

// function to automate buttons creation
function addButton(bootstrapClass, cssClass) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="${bootstrapClass}"></i>`
    button.classList.add(`${cssClass}`);
    return button;
}