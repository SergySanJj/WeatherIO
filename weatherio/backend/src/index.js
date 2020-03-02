const publicFiles = "../frontend";
const host = '127.0.0.1';
const port = 7000;
const apiKey = require("./keys/apiKeys").key;
const apiOwner = "http://openweathermap.org";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");

app.use(express.static(`${publicFiles}/`));

app.get("/", function (req, res) {
    res.sendFile(path.join(publicFiles, "index.html"));
});

app.get("/index.js", function (req, res) {
    res.sendFile(path.join(publicFiles, "index.js"));
});

app.get("/api/city/*", function (req, res) {
    const city = req.params[0];
    requestWeather(city).then((ans) => {
        res.send(ans);
    });
});

async function requestWeather(city) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://samples.openweathermap.org/data/2.5/weather?q=${city},uk&appid=${apiKey}`, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}




console.log("Greetings from our weatherio app server");
console.log(`We are using ${apiOwner} API`);

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});


