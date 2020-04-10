//weather.js

const axios = require("axios");
const { weatherKey } = require('../config');

// weather API Config: Location
const AshqelonLatLong = "31.6748,34.5750";

var interval;
// update per 4 hours
const updateTime = 4 * 60 * 60 * 1000;

// function that gets the JSON result for weather from Dark Sky API and emit it to client
const getWeatherApiAndEmit = async socket => {
    try {
        // getting the data from Dark Sky API
        const response = await axios.get(`https://api.darksky.net/forecast/${weatherKey}/${AshqelonLatLong}`, {
            params: {
                units: 'si',
                exclude: 'minutely,hourly,alerts,flags'
            }
        });
        // emitting a new message. It will be consumed by the client
        socket.emit("Weather", response.data);
    } 
    catch (error) {
        console.error(`Weather Error: ${error.code}`);
    }
};

// make the API call and emit every x interval
const handleUpdate = socket => {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => this.getWeatherApiAndEmit(socket), updateTime);
}

module.exports.getWeatherApiAndEmit = getWeatherApiAndEmit;
module.exports.handleUpdate = handleUpdate;
