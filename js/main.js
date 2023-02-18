console.log("Hello World!");
const inputForm = document.querySelector(".input_form");
const inputField = inputForm.querySelector("#city_input");
const searchButton = inputForm.querySelector("#search_button");

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
                return data;
            }).catch((err) => {
                console.log(err);
            }) 
        });
}
function searchWeather(){
    let inputValue = document.querySelector("#city_input").value;
    fetchWeather(inputValue);
    console.log(inputValue);
}
searchButton.addEventListener('click', searchWeather);
