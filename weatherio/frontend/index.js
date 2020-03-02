const cityField = document.getElementById("city-name");
const outputField = document.getElementById("output");

async function startWeatherRequest() {
    let city = cityField.getAttribute("value");
    console.log("request " + city);
    await requestWeather(city);
}

async function requestWeather(cityName) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `api/city/${cityName}`);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = () => {
        if (this.readyState === this.HEADERS_RECEIVED) {
            outputField.innerText = xmlHttp.responseText;
        }
    };
}
