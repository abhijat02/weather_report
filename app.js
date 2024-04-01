const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const appKey = "897953a89705de3f5c575ea13776cdf3"
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit+"";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature of "+query+" is " + temp + " degree celcius</h1>");
            res.write("<p>The weather description is " + des + "</p>");
            res.write("<img src = "+imageUrl+" >");
            res.send();
        })

    });
})



app.listen(3000, function(){
    console.log("The server 3000 has started");
});