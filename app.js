//backend JS

const request = require('request');
const express = require('express');
const path = require('path');
const app = express();
const {promisify} = require('util');  //{} means that we only import that specific module

let promisifyRequest = promisify(request);

const publicDirectory = path.join(__dirname, "./public")
const mapBoxKey = "pk.eyJ1IjoiY2hpYXJhbWFwZWxsaSIsImEiOiJjanc5YnhhdnYwZW9qNDhteGJhcjM5cTE2In0.CgcDiMELtua_mYMUsrtmzw"
app.use(express.static(publicDirectory));


app.get('/weather', async(req, res) => {
    let location = req.query.location;
    const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapBoxKey}`

// ------------------------------FIRST REQUEST------------------------------------------------

    let coordinates = await promisifyRequest({url: mapBoxURL, json: true})
    let data = coordinates.body;
    let latitude = data.features[0].geometry.coordinates[1]
    let longitude = data.features[0].geometry.coordinates[0]

    const url = `https://api.darksky.net/forecast/896bcaa236615fec514a59e9e6384015/${latitude},${longitude}`

// ------------------------------SECOND REQUEST------------------------------------------------

    const weatherData = await promisifyRequest({url: url, json : true});  //we send another request to the url
    let weatherObj = weatherData.body;

    res.send(weatherObj);
}); 

app.listen(3000, () => {
    console.log('listening on port 3000')
})