//finance.js

const axios = require("axios");
const { financeKey } = require("../config");

var interval;
// update per 5 minutes
const updateTime = 5 * 60 * 1000;

// function that gets the JSON result for intraday time series of the equity specified from Alpha Vantage API and emit it to client
const getFinanceApiAndEmit = async (socket) => {
  try {
    // getting the data from Alpha Vantage API
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: "TSLA",
        interval: "5min",
        apikey: financeKey,
      },
    });
    // API call frequency is 5 calls per minute and 500 calls per day.
    if (!response.data.hasOwnProperty("Note"))
      // emitting a new message. It will be consumed by the client
      socket.emit("Finance", response.data);
  } catch (error) {
    console.error(`Finance Error: ${error.code}`);
  }
};

// make the call and emit every x interval
const handleUpdate = (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => this.getFinanceApiAndEmit(socket), updateTime);
};

module.exports.getFinanceApiAndEmit = getFinanceApiAndEmit;
module.exports.handleUpdate = handleUpdate;
