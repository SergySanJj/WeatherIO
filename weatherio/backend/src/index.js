const publicFiles = "./weatherio/frontend";
const host = '127.0.0.1';
const port = process.env.PORT || 8080;
const apiKey = require("./keys/apiKeys").key;
const apiOwner = "http://openweathermap.org";

const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const favicon = require('serve-favicon');

app.use(express.static(`${publicFiles}/`));
app.use(favicon(path.join(publicFiles, "favicon.ico")));

app.get("/", function (req, res) {
    res.sendFile(path.join(publicFiles, "index.html"));
});

app.get("/api/city/*", function (req, res) {
    const city = req.params[0];
    const weatherRequest =
        `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    http.get(weatherRequest, (resp) => {
        resp.on('data', (chunk) => {
            res.send(chunk);
        })
    });
});


console.log("Greetings from our weatherio app server");
console.log(`We are using ${apiOwner} API`);

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});


