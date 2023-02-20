console.log("Hello World!");
const inputForm = document.querySelector(".input_form");
const inputField = inputForm.querySelector("#city_input");
const searchButton = inputForm.querySelector("#search_button");
let result = document.querySelector('.result');

let weather = {
    "apiKey": "6a2460f385d8fbe77660e390eb988c73"
}
/*Making fetch function*/
function fetchWeather(city) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a2460f385d8fbe77660e390eb988c73`
    ).then((response) => { 
            return response.json().then((data) => {
                console.log(data);
                result.innerHTML = "City: " + data.name + '</br>' +
                    "Temperature: " + data.main.temp + '</br>' +
                    "Pressure: " + data.main.pressure + '</br>' +
                    "Humidity: " + data.main.humidity + '</br>' +
                    "Speed: " + data.wind.speed + '</br>' +
                    "Degree: " + data.wind.deg + '</br>' +
                    "Icon: " + '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png">' + '</br>';
                    switch (data.weather[0].main){
                        case "Clouds":
                            console.log("it's  rain");
                            break;
                    }
                return data;
            }).catch((err) => {
                
            })
        });

}
function searchWeather(){
    let inputValue = document.querySelector("#city_input").value;
    fetchWeather(inputValue);
    console.log(inputValue);

}
searchButton.addEventListener('click', searchWeather);
