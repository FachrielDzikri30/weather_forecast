// get data function
const getWeatherForecast = async (cityName) => {
    try {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": 'weatherapi-com.p.rapidapi.com',
                "X-RapidAPI-key": 'ff0e4f9204mshfeff98692141e8cp11cd8cjsneb4aa586829a'
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
        } catch (error) {
        console.log(error);
        return;
    }
}

// city description function
const displayCityName = (weatherData) => {
    const cityNameDiv = document.getElementById("city-description");
    const cityName= weatherData.location.name;
    const countryName = weatherData.location.country;
    const cityNameDisplay = `<h2>Showing the weather of ${cityName}, ${countryName}</h2>`;
    cityNameDiv.innerHTML = cityNameDisplay;
}

// new function for search button
const searchWeather = async () => {
    // get data from getWeatherForecast function
    const cityName = document.getElementById("city-name").value;
    if(!cityName){
        return null;
    }
    const weatherData = await getWeatherForecast(cityName);
    if(!weatherData.error){
        displayCityName(weatherData);
        displayCurrentWeather(weatherData);
        displayWeatherForecast(weatherData);
    }
}

// current weather function
const displayCurrentWeather = (weatherData) => {
    const currentWeatherDiv = document.getElementById("current-weather");
    const currentWeather = {
        condition: weatherData.current.condition.text,
        conditionImage: weatherData.current.condition.icon,
        temperature: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        time: weatherData.current.last_updated
    }
    const currentWeatherDisplay = `
    <div class = "weather-container">
        <h2>Current Weather</h2>
        <p style = "text">"${currentWeather.condition}"</p>
        <img src = "https:${currentWeather.conditionImage}" class = "weather-image">
        <p>Temperature: ${currentWeather.temperature}℃</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Last Updated: ${currentWeather.time}</p>
    </div>
    `;
    currentWeatherDiv.innerHTML = currentWeatherDisplay
}

// weather forecast function
const displayWeatherForecast = (weatherData) => {
    const weatherForecastDiv = document.getElementById("weather-forecast");
    const forecasts = weatherData.forecast.forecastday;
    let listOfForrecastData = "";
    for (let i = 0; i < forecasts.length; i++) {
        const forecastsData = {
            date: forecasts[i].date,
            condition: forecasts[i].day.condition.text,
            conditionImage: forecasts[i].day.condition.icon,
            avg_temp: forecasts[i].day.avgtemp_c,
            max_temp: forecasts[i].day.maxtemp_c,
            min_temp: forecasts[i].day.mintemp_c,
            avg_humidity: forecasts[i].day.avghumidity
        }
        const weatherForecastDisplay = `
        <div class="weather-container">
            <h2>Weather of ${forecastsData.date}</h2>
            <p style="text">"${forecastsData.condition}"</p>
            <img src="https:${forecastsData.conditionImage}" class="weather-image">
            <p>Average temperature: ${forecastsData.avg_temp}℃</p>
            <p>Maximum: ${forecastsData.max_temp}℃</p>
            <p>Minimum: ${forecastsData.min_temp}℃</p>
            <p>Average humidity: ${forecastsData.avg_humidity}%</p>
        </div>
        `;
        listOfForrecastData += weatherForecastDisplay;
    }
    weatherForecastDiv.innerHTML = listOfForrecastData;
}