//sports.js

const axios = require("axios");
const { SPORTS_API_KEY } = require("../config");

const SPORTS_API_URL = "https://api.football-data.org/v2/matches";
const LIVE_STATUS = "LIVE";

var interval;
// update per 10 seconds
const updateTime = 10 * 1000;

// function that gets the JSON result for sports from football-data API and emit it to client
const getSportsFromApiAndEmit = async (socket) => {
  try {
    // getting the data from football-data API
    const response = await axios.get(SPORTS_API_URL, {
      params: {
        status: LIVE_STATUS,
      },
      headers: {
        "X-Auth-Token": SPORTS_API_KEY,
      },
    });
    // emitting a new message. It will be consumed by the client
    socket.emit("Sports", response.data);
  } catch (error) {
    console.error(`Sports Error: ${error}`);
  }
};

// make the call and emit every x interval
const handleUpdate = (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(
    () => this.getSportsFromApiAndEmit(socket),
    updateTime
  );
};

module.exports.getSportsFromApiAndEmit = getSportsFromApiAndEmit;
module.exports.handleUpdate = handleUpdate;
