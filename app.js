// Selectors
const input = document.getElementById("form__input");
const addTodoBtn = document.getElementById("form__button");
const todosContainer = document.getElementById("todosContainer");

// EventListeners
addTodoBtn.addEventListener("click", newTodo);

// Functions
function newTodo() {
    event.preventDefault();
    // Get the input value
    const inputValue = input.value;

    // Create HTML items
    const newTodo = document.createElement("article");
    newTodo.classList.add("todosContainer__item");
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = inputValue;
    todoTitle.classList.add("todosContainer__item__title");
    const divBtn = document.createElement("div");
    divBtn.classList.add("buttons")
    divBtn.innerHTML = `<i class="fas fa-check"></i><i class="fas fa-trash"></i>`

    newTodo.appendChild(todoTitle);
    newTodo.appendChild(divBtn);
    todosContainer.appendChild(newTodo);
};