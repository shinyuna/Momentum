const weather = document.querySelector('.js_weather');
const API_KEY = "3f31e6e5d7441d857e20be5af6bec0f0";
const coords = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (res) {
        return res.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const tmp = Math.floor(temperature);
        const place = json.name;
        weather.innerText = `${tmp} @ ${place}`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(coords, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handelGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handelGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(coords);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();