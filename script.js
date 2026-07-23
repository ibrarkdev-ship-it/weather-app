let enterCity = document.getElementById("enter-city");
let btnSearch = document.getElementById("btn-search");
let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let weatherCondition = document.getElementById("weather-condition");
let weatherIcon = document.getElementById("weather-icon");
let loading = document.getElementById("loading");
btnSearch.addEventListener("click", function () {
    let text = enterCity.value;
    console.log(text);

    if (text == "") {
        alert("Please Fill Input!");
        return;
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=84257f32f5ed54208314faee05292135`
    console.log(apiUrl);
    loading.textContent = "loading....";
    //JavaScript mein request bhejne ke liye use hota hai:
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.weather[0].icon);
            console.log(data);
            console.log(data.name);
            console.log(data.main.temp - 273.15);
            console.log(data.weather[0]);
            if (data.cod !== 200) {
                loading.textContent = "";
                cityName.textContent = "";
                weatherCondition.textContent = "";
                temperature.textContent = ""
                alert("City not found !")
                return;
            }
            cityName.textContent = data.name;
            weatherCondition.textContent = data.weather[0].description;
            temperature.textContent = Math.round(data.main.temp - 273.15) + "°C";
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            loading.textContent = "";
        })
})
//"Jab bhi user keyboard ki koi key dabaye, ye function chala do.
//JavaScript khud hume ek object deti hai jiska naam humne event rakha hai.
//Is object mein key ki information hoti hai
enterCity.addEventListener("keydown", function (event) {
    console.log(event.key);
    //"Kya user ne Enter key dabayi hai?"
    if (event.key == "Enter") {
        //avaScript button ko automatically click kar do."
        //Matlab agar user Enter dabaye to JavaScript khud button press kar degi.
        btnSearch.click();
    }
});
