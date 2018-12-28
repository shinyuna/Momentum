const body = document.querySelector('body');
const imgNum = 5;

function paintImage(imgNum) {
    const image = new Image();
    image.src = `images/${imgNum + 1}.jpg`;
    image.classList.add('bg_img');
    body.prepend(image);
}

function genRandom() {
    const num = Math.floor(Math.random() * imgNum);
    return num;
}

function init() {
    const randomNum = genRandom();
    paintImage(randomNum);
}

init();