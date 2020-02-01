//sports.js

const axios = require("axios");
const apiKeys = require("../apiKeys");

var interval;
// update per 10 seconds
const updateTime = 10 * 1000;

// function that gets the JSON result for sports from football-data API and emit it to client
const getSportsApiAndEmit = async socket => {
    try {
        // getting the data from football-data API
        const response = await axios.get("https://api.football-data.org/v2/matches", {
            params: {
                status: 'LIVE'
            },
            headers: {
                'X-Auth-Token': apiKeys.sportsKey
            }
        });
        // emitting a new message. It will be consumed by the client
        socket.emit("Sports", response.data);
    } 
    catch (error) {
        console.error(`Sports Error: ${error}`);
    }
};

// make the call and emit every x interval
const handleUpdate = socket => {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => this.getSportsApiAndEmit(socket), updateTime);
}

module.exports.getSportsApiAndEmit = getSportsApiAndEmit;
module.exports.handleUpdate = handleUpdate;