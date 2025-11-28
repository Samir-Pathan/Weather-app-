
const apiKey = "enter your api key";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherResult.innerHTML = "<p>Loading...</p>";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                weatherResult.innerHTML = "<p>City not found!</p>";
                return;
            }
            const { name, main, weather, wind } = data;
            const icon = weather[0].icon;

            weatherResult.innerHTML = `
                <h3>${name}</h3>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
                <p>Temp: ${main.temp}°C</p>
                <p>Feels Like: ${main.feels_like}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind: ${wind.speed} m/s</p>
                <p>${weather[0].description}</p>
            `;
        })
        .catch(() => {
            weatherResult.innerHTML = "<p>Error fetching weather data!</p>";
        });
});
