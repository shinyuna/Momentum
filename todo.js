const todoInput = todoForm.querySelector('input'),
    title = todoForm.querySelector('h2'),
    todoList = document.querySelector('.js_todo_list');

const todoLocal = 'toDos';

let toDos = [];

// todo 삭제
function deleteToDo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

// localStorage에 저장
function saveToDos() {
    localStorage.setItem(todoLocal, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(deleteBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

// 입력 후 엔터
function handleSubmit(e) {
    e.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(todoLocal);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit)
}

init();