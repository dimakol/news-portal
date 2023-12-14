//weather.js

const axios = require("axios");
const { WEATHER_API_KEY } = require("../config");

const WEATHER_API_URL = "https://api.tomorrow.io/v4/weather";
// current weather data, daily forecasts for the next 5 days
const ENDPOINTS = [
  `${WEATHER_API_URL}/realtime`,
  `${WEATHER_API_URL}/forecast`,
];

const CITY_NAME = "ashkelon";
// possible units of measurement
const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

const queryParams = {
  location: CITY_NAME,
  apikey: WEATHER_API_KEY,
  units: UNITS.METRIC,
};

var interval;
// update per 4 hours
const updateTime = 4 * 60 * 60 * 1000;

// function that gets the JSON result for current weather, 5 day forecast from Tomorrow API and emit it to client
const getWeatherFromApiAndEmit = async (socket) => {
  // making concurrent API requests
  Promise.all(
    ENDPOINTS.map((endpoint) =>
      axios.get(endpoint, {
        params: queryParams,
      })
    )
  )
    .then(([{ data: weatherResponse }, { data: forecastResponse }]) => {
      const customResponse = {
        currently: weatherResponse.data,
        daily: forecastResponse.timelines?.daily,
      };
      // emitting a new message. It will be consumed by the client
      socket.emit("Weather", customResponse);
    })
    .catch((error) => console.error(`Weather Error: ${error}`));
};

// make the API call and emit every x interval
const handleUpdate = (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(
    () => this.getWeatherFromApiAndEmit(socket),
    updateTime
  );
};

module.exports.getWeatherFromApiAndEmit = getWeatherFromApiAndEmit;
module.exports.handleUpdate = handleUpdate;
