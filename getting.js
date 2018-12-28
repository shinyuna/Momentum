const form = document.querySelector('.js_form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js_greetings'),
    todoForm = document.querySelector('.js_todo'),
    clockContainer = document.querySelector('.js_clock');

const userLs = "currentUser",
    showing = "showing";

function saveName(text) {
    localStorage.setItem(userLs, text);
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(showing);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(showing);
    greeting.classList.add(showing);
    todoForm.classList.add(showing);
    clockContainer.classList.add(showing);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(userLs);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();