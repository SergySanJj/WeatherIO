document.onkeypress = (e) => {
    if (e.code === "Enter") {
        startWeatherRequest()
    }
};

class WeatherVisualisation {
    constructor() {
        this.info = document.getElementById("info-vis");

        this.city = document.getElementById("city-vis");
        this.country = document.getElementById("country-vis");
        this.temperature = document.getElementById("temperature-vis");
        this.temperatureFeel = document.getElementById("temperature-feel-vis");
        this.humidity = document.getElementById("humidity-vis");
        this.pressure = document.getElementById("pressure-vis");
        this.wind = document.getElementById("wind-vis");
        this.clouds = document.getElementById("clouds-vis");
    }

    setInfo(s) {
        this.info.innerText = s;
    }

    setCountry(s) {
        this.country.innerText = s;
    }

    setCity(s) {
        this.city.innerText = s;
    }

    setTemperature(s) {
        this.temperature.innerText = s + " °F";
    }

    setTemperatureFeel(s) {
        this.temperatureFeel.innerText = " feels like " + s + " °F";
    }

    setHumidity(s) {
        this.humidity.innerText = "Humidity: " + s;
    }

    setPressure(s) {
        this.pressure.innerText = "Pressure " + s + " bar";
    }

    setWind(s) {
        this.wind.innerText = "Wind speed " + s + "m/s";
    }

    setClouds(s) {
        this.clouds.innerText = s;
    }
}

class WeatherModel {
    constructor(weatherString) {
        try {
            this.ob = JSON.parse(weatherString);
            // console.log(this.ob);
        } catch (e) { // pass
        }
    }

    displayAt(weatherVisualisation) {
        if (this.ob === undefined)
            return;
        if (this.ob.cod === "404") {
            weatherVisualisation.setInfo("Please enter valid city");
            return;
        }

        weatherVisualisation.setInfo("");
        weatherVisualisation.setCity(this.ob.name);
        weatherVisualisation.setCountry(this.ob.sys.country);
        weatherVisualisation.setTemperature(this.ob.main.temp);
        weatherVisualisation.setTemperatureFeel(this.ob.main.feels_like);
        weatherVisualisation.setHumidity(this.ob.main.humidity);
        weatherVisualisation.setPressure(this.ob.main.pressure);
        weatherVisualisation.setWind(this.ob.wind.speed);

        weatherVisualisation.setClouds(this.ob.weather["0"].description);
    }
}

const cityField = document.getElementById("city-name");

const weatherVis = new WeatherVisualisation();

function startWeatherRequest() {
    let city = cityField.value;
    // console.log("request " + city);
    if (city === null || city === "")
        return;
    requestWeather(city);
}

function requestWeather(cityName) {
    try {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", `api/city/${cityName}`);
        xmlHttp.send(null);
        xmlHttp.onreadystatechange = (e) => {
            weatherHandler(xmlHttp.responseText);
        };
    } catch (e) {
        // pass
    }
}

function weatherHandler(weather) {
    let model = new WeatherModel(weather);
    model.displayAt(weatherVis);
}
