const express = require("express");
const res = require("express/lib/response");
const https = require("https")
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {


    const query = req.body.cityName;
    const appkey = "9de243494c0b295cca9337e1e96b00e2";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appkey + "&units=" + unit;

    https.get(url, function (response) {


        response.on("data", function (data) {
            const wheatherData = JSON.parse(data)

            const temp = wheatherData.main.temp;
            const temp_min = wheatherData.main.temp_min;
            const temp_max = wheatherData.main.temp_max;
            const pressure = wheatherData.main.pressure;
            const humidity = wheatherData.main.humidity;



            res.write("<h1>temparature:" + temp + "degree celcious </h1><br>")
            res.write("minimum temperature" + temp_min + "degree celcious<br>")
            res.write("maximum temparature" + temp_max + "degree celcious<br>")
            res.write("pressure:" + pressure + "<br>")
            res.write("humidity:" + humidity + "<br>")

            res.send()
        })

    })


})


app.listen(3000, function () {

    console.log("server started")


})