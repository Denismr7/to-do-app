// Selectors
const input = document.getElementById("form__input");
const addTodoBtn = document.getElementById("form__button");
const todosContainer = document.getElementById("todosContainer");
let checkButton = document.querySelectorAll(".fa-check");
let deleteButton = document.querySelectorAll(".fa-trash");
const saveBtn = document.getElementById("form__save");
const successSaveBtn = document.getElementById("form__success");
let todosArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

// EventListeners
addTodoBtn.addEventListener("click", newTodo);
checkButton.forEach(button => button.addEventListener("click", completedTodo));
deleteButton.forEach(button => button.addEventListener("click", deleteTodo));
saveBtn.addEventListener("click", saveToLocal);
window.addEventListener("load", fromLocalToVm);

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

    // Update info, eventListeners and clear the form
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
    // Reset localStorage
    localStorage.clear();

    // Shows a message to the user
    successSaveBtn.textContent = "Changes saved successfully!"
    setTimeout(() => {
        successSaveBtn.textContent = "";
    }, 3000);

    // Prepare the array with the objects to be saved
    const titlesArray = document.querySelectorAll(".todosContainer__item__title");
    let tempArray = [];
    titlesArray.forEach(todo => {
        let object = {
            title: todo.textContent,
            isCompleted: todo.parentElement.classList.contains("completed")
        }
        tempArray.push(object);
    })
    todosArray = tempArray;

    // Save in localStorage
    localStorage.setItem("todos", JSON.stringify(todosArray));
    console.log(JSON.parse(localStorage.getItem("todos")));
}

function fromLocalToVm() {
    todosArray.forEach(todo => {
        const newTodo = document.createElement("article");
        newTodo.classList.add("todosContainer__item");
        todo.isCompleted ? newTodo.classList.add("completed") : "";
        const todoTitle = document.createElement("h3");
        todoTitle.innerText = todo.title;
        todoTitle.classList.add("todosContainer__item__title");
        const divBtn = document.createElement("div");
        divBtn.classList.add("buttons")
        divBtn.innerHTML = `<i class="fas fa-check"></i><i class="fas fa-trash"></i>`

        // Apend childs
        newTodo.appendChild(todoTitle);
        newTodo.appendChild(divBtn);
        todosContainer.appendChild(newTodo);

        // Update info and event listeners
        checkButton = document.querySelectorAll(".fa-check");
        deleteButton = document.querySelectorAll(".fa-trash");
        checkButton.forEach(button => button.addEventListener("click", completedTodo));
        deleteButton.forEach(button => button.addEventListener("click", deleteTodo));
    })
}