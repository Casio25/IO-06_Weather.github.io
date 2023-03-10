
const inputForm = document.querySelector(".input_form");
const inputField = inputForm.querySelector("#city_input");
const searchButton = inputForm.querySelector("#search_button");
const saveButton = inputForm.querySelector("#save_button")
let result = document.querySelector('.result');
let bg = document.querySelector(".bg");
let backendData = {};


// let weather = {
//     "apiKey": "6a2460f385d8fbe77660e390eb988c73"
// }
/*Making fetch function*/
function fetchWeather(city) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a2460f385d8fbe77660e390eb988c73`
    ).then((response) => {
        return response.json().then((data) => {
            backendData = {
                city: data.name,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                speed: data.wind.speed,
                degree: data.wind.deg,
            }
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        alert("Ви нічого не ввели");
                        break;
                    case 404:
                        alert("Вашого міста не існує, так само як і Житомира")
                }
            }
            result.innerHTML = "City: " + data.name + '</br>' +
                "Temperature: " + data.main.temp + '</br>' +
                "Pressure: " + data.main.pressure + '</br>' +
                "Humidity: " + data.main.humidity + '</br>' +
                "Speed: " + data.wind.speed + '</br>' +
                "Degree: " + data.wind.deg + '</br>' +
                '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png">' + '</br>';
            switch (data.weather[0].description) {
                case "clear sky":
                    bg.style.backgroundImage = "url('img/clear_sky.jpg')"
                    break;
                case "few clouds":
                    bg.style.backgroundImage = "url('img/few_clouds.jpg')"
                    break;
                case "scattered clouds":
                    bg.style.backgroundImage = "url('img/scattered_clouds.jpg')";
                    break;
                case "broken clouds":
                    bg.style.backgroundImage = "url('img/broken_clouds.jpg')";
                    break;
                case "shower rain":
                    console.log("shower rain");
                    break;
                case "rain":
                    console.log("rain");
                    break;
                case "thunderstorm":
                    console.log("thunderstorm");
                    break;
                case "snow":
                    console.log("snow");
                    break;
                case "mist":
                    console.log("mist");
                    break;
                case "overcast clouds":
                    bg.style.backgroundImage = "url('img/overcast_clouds.jfif')";
                    break;
                case "light rain":
                    bg.style.backgroundImage = "url('img/light_rain.jfif')";
                    break;
                case "light snow":
                    bg.style.backgroundImage = "url('img/light_snow.jpg')";
                    break;
            }
            return data;
        })
            .catch((err) => {
                console.log(err)
            })
    });

}
function searchWeather() {
    result.innerHTML = ""
    let inputValue = document.querySelector("#city_input").value;
    fetchWeather(inputValue);
    console.log(inputValue);
    result.style.display = "block";
    console.log(backendData);
    saveButton.addEventListener('click', sendWeather);
}
function sendWeather() {
    fetch("http://localhost:4000/data", {
        method: "POST",
        body: JSON.stringify(backendData)
    })
        .then(response => response.json())
    saveButton.removeEventListener('click', sendWeather);
    window.location.reload();

}
searchButton.addEventListener('click', searchWeather);
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        searchWeather();
    }
})


const data = await fetch("http://localhost:4000/data")
    .then(function (resp) {
        return resp.json()
    })
    .catch((error) => {
        return `${error}`;
    });
console.log(data);