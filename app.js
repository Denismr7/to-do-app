// Selectors
const input = document.getElementById("form__input");
const addTodoBtn = document.getElementById("form__button");
const todosContainer = document.getElementById("todosContainer");
let checkButton = document.querySelectorAll(".fa-check");
let deleteButton = document.querySelectorAll(".fa-trash");
const saveBtn = document.getElementById("form__save");
const successSaveBtn = document.getElementById("form__success");
const todosArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

// EventListeners
addTodoBtn.addEventListener("click", newTodo);
checkButton.forEach(button => button.addEventListener("click", completedTodo));
deleteButton.forEach(button => button.addEventListener("click", deleteTodo));
saveBtn.addEventListener("click", saveToLocal)

// Functions
function newTodo() {
    event.preventDefault();
    // Get the input value
    const inputValue = input.value;

    if (inputValue === "") {
        alert("The task is empty")
    } else {
    // Create HTML items
    const newTodo = document.createElement("article");
    newTodo.classList.add("todosContainer__item");
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = inputValue;
    todoTitle.classList.add("todosContainer__item__title");
    const divBtn = document.createElement("div");
    divBtn.classList.add("buttons")
    divBtn.innerHTML = `<i class="fas fa-check"></i><i class="fas fa-trash"></i>`

    // Apend childs
    newTodo.appendChild(todoTitle);
    newTodo.appendChild(divBtn);
    todosContainer.appendChild(newTodo);

    // Update info and clear the form
    checkButton = document.querySelectorAll(".fa-check");
    deleteButton = document.querySelectorAll(".fa-trash");
    checkButton.forEach(button => button.addEventListener("click", completedTodo));
    deleteButton.forEach(button => button.addEventListener("click", deleteTodo));
    input.value = "";
    }
};

function completedTodo() {
    const article = event.target.parentElement.parentElement;
    article.classList.add("completed");
}

function deleteTodo() {
    const article = event.target.parentElement.parentElement;
    article.classList.add("deleted");
    article.addEventListener("animationend", function() {
        article.remove();
    });
}

function saveToLocal() {
    // Shows a message to the user
    successSaveBtn.textContent = "Saved successfully!"
    setTimeout(() => {
        successSaveBtn.textContent = "";
    }, 3000);
}