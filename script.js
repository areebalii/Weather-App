const inputEl = document.querySelector("input");
const buttonEl = document.querySelector(".btn");
const weatherImg = document.querySelector(".weather-icon");
const weatherEl = document.querySelector(".weather");

let apiKey = "2a9c0c4595598686eb848464a6746a93";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

buttonEl.addEventListener("click", () => {
    updateWeather(inputEl.value);
});

async function updateWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        let data = await response.json();

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            weatherEl.style.display = "none";
        } else {
            console.log(data);
            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
            document.querySelector(".wind-speed").innerHTML = `${data.wind.speed} KM/H`;

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherImg.src = "assets/clouds.png";
                    break;
                case "Clear":
                    weatherImg.src = "assets/clear.png";
                    break;
                case "Rain":
                    weatherImg.src = "assets/rain.png";
                    break;
                case "Drizzle":
                    weatherImg.src = "assets/drizzle.png";
                    break;
                case "Mist":
                    weatherImg.src = "assets/mist.png";
                    break;
                case "Snow":
                    weatherImg.src = "assets/snow.png";
                    break;
                case "Wind":
                    weatherImg.src = "assets/wind.png";
                    break;
                default:
                    weatherImg.src = "assets/default.png"; // Add a default image for unexpected weather types
            }

            weatherEl.style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        weatherEl.style.display = "none";
    }
}
