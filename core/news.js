//news.js

const axios = require("axios");
const { NEWS_API_KEY } = require("../config");

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

// The 2-letter ISO 3166-1 code of the country you want to get headlines for
const COUNTRY = "us";
// The number of results to return per page (request). 20 is the default, 100 is the maximum
const PAGE_SIZE = 1;

const queryParams = {
  country: COUNTRY,
  pageSize: PAGE_SIZE,
  apiKey: NEWS_API_KEY,
};

var interval;
// update per 10 minutes
const updateTime = 10 * 60 * 1000;

// function that gets the JSON result for news from News API and emit it to client
const getNewsFromApiAndEmit = async (socket) => {
  try {
    // getting the data from News API
    const response = await axios.get(NEWS_API_URL, {
      params: queryParams,
    });
    // the request was successful and has articles
    if (response.data.status === "ok" && response.data.articles.length) {
      // emitting a new message. It will be consumed by the client
      socket.emit("News", response.data.articles[0]);
    }
  } catch (error) {
    console.error(`News Error: ${error.message}`);
  }
};

// make the API call and emit every x interval
const handleUpdate = (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => this.getNewsFromApiAndEmit(socket), updateTime);
};

module.exports.getNewsFromApiAndEmit = getNewsFromApiAndEmit;
module.exports.handleUpdate = handleUpdate;
