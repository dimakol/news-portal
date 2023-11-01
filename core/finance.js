//finance.js

const axios = require("axios");
const { FINANCE_API_KEY } = require("../config");

const FINANCE_API_URL = "https://www.alphavantage.co/query";

const TIME_SERIES_OPTIONS = {
  INTRADAY: "TIME_SERIES_INTRADAY",
  DAILY: "TIME_SERIES_DAILY",
  DAILY_ADJUSTED: "TIME_SERIES_DAILY_ADJUSTED",
  WEEKLY: "TIME_SERIES_WEEKLY",
  WEEKLY_ADJUSTED: "TIME_SERIES_WEEKLY_ADJUSTED",
  MONTHLY: "TIME_SERIES_MONTHLY",
  MONTHLY_ADJUSTED: "TIME_SERIES_MONTHLY_ADJUSTED",
};
// Tesla equity
const EQUITY_NAME = "TSLA";
// Time interval between two consecutive data points in the time series
const TIME_INTERVAL_OPTIONS = {
  MINUTE: "1min",
  FIVE_MINUTES: "5min",
  QUARTER_HOUR: "15min",
  HALF_HOUR: "30min",
  HOUR: "60min",
};

const queryParams = {
  function: TIME_SERIES_OPTIONS.INTRADAY,
  symbol: EQUITY_NAME,
  interval: TIME_INTERVAL_OPTIONS.FIVE_MINUTES,
  apikey: FINANCE_API_KEY,
};

var interval;
// update per 5 minutes
const updateTime = 5 * 60 * 1000;

// function that gets the JSON result for intraday time series of the equity specified from Alpha Vantage API and emit it to client
const getFinanceFromApiAndEmit = async (socket) => {
  try {
    // getting the data from Alpha Vantage API
    const response = await axios.get(FINANCE_API_URL, {
      params: queryParams,
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

  interval = setInterval(
    () => this.getFinanceFromApiAndEmit(socket),
    updateTime
  );
};

module.exports.getFinanceFromApiAndEmit = getFinanceFromApiAndEmit;
module.exports.handleUpdate = handleUpdate;
