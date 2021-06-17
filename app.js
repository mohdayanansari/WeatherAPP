const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //asking from user --->>making it dynamic webpage application--->>
  var city = req.body.city;

  const query = city;
  const id = "0569f8ccf19c5365347d13e98f5b4c8c";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=" +
    units;
  //https get request from API
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      //parsing data from weather-api into json...
      const weatherData = JSON.parse(data);
      //fetching tha data we want...from the api
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //Showing live data on index.html{"/"}
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imageUrl + ">");
      res.write(
        "<h1>The temprature in " +
          city +
          " is " +
          temp +
          " Degree Celcius.</h1>"
      );
      //sending data to index.html page
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Your Server is Started at port 3000");
});
