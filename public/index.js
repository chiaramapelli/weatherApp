//frontend js

let form = document.getElementById('form');
let input = document.getElementById('locationInput')

async function getWeather() {
    event.preventDefault();
    let location = input.value;

    let weather = await fetch(`http://localhost:3000/weather?location=${location}`)
    let obj = await weather.json()
    console.log(obj);
   
}

form.onsubmit = getWeather;



//fetch sends a get request to the local host //weather (as set in app.get of app.js)
//we build the url using the url + weather + ? + the query (let location = req.query.location;) + = + word i want to search