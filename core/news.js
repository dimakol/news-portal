//news.js

const axios = require("axios");
const { newsKey } = require('../config');

var interval;
// update per 10 minutes
const updateTime = 10 * 60 * 1000;

// function that gets the JSON result for news from News API and emit it to client
const getNewsApiAndEmit = async socket => {
    try {
        // getting the data from News API
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country: 'us',
                pageSize: 1,
                apiKey: newsKey
            }
        });
        // emitting a new message. It will be consumed by the client
        socket.emit("News", response.data.articles[0]);
    } 
    catch (error) {
        console.error(`News Error: ${error.code}`);
    }
};

// make the API call and emit every x interval
const handleUpdate = socket => {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => this.getNewsApiAndEmit(socket), updateTime);
}

module.exports.getNewsApiAndEmit = getNewsApiAndEmit;
module.exports.handleUpdate = handleUpdate;