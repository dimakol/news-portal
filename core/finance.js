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

const RESPONSE_KEYS = {
  META_DATA: "Meta Data",
  TIME_SERIES: "Time Series (5min)",
  INFORMATION: "Information",
};
const META_DATA = {
  INFORMATION: "1. Information",
  SYMBOL: "2. Symbol",
  LAST_REFRESHED: "3. Last Refreshed",
  INTERVAL: "4. Interval",
  OUTPUT_SIZE: "5. Output Size",
  TIME_ZONE: "6. Time Zone",
};
const TIME_SERIES_DATA = {
  OPEN: "1. open",
  HIGH: "2. high",
  LOW: "3. low",
  CLOSE: "4. close",
  VOLUME: "5. volume",
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
    // API call rate limit is valid
    if (!response.data[RESPONSE_KEYS.INFORMATION]) {
      const timeSeries = response.data[RESPONSE_KEYS.TIME_SERIES];
      if (timeSeries) {
        // filter keys by same date as last refreshed
        const timeSeriesAxisX = Object.keys(timeSeries).filter(
          (datetime) =>
            datetime.split(" ")[0] ===
            response.data[RESPONSE_KEYS.META_DATA][
              META_DATA.LAST_REFRESHED
            ].split(" ")[0]
        );
        // map by close values sliced by same date as last refreshed
        const timeSeriesAxisY = Object.values(timeSeries)
          .slice(0, timeSeriesAxisX.length)
          .map((timeSeriesValue) => timeSeriesValue[TIME_SERIES_DATA.CLOSE]);
        const customResponse = {
          symbol: response.data[RESPONSE_KEYS.META_DATA][META_DATA.SYMBOL],
          lastUpdated:
            response.data[RESPONSE_KEYS.META_DATA][META_DATA.LAST_REFRESHED],
          // using reduce() method to make object for the chart of keys(x axis): values(y axis)
          data: timeSeriesAxisX.reduce((acc, element, index) => {
            return {
              ...acc,
              [element]: timeSeriesAxisY[index],
            };
          }, {}),
        };
        // emitting a new message. It will be consumed by the client
        socket.emit("Finance", customResponse);
      } else {
        // property not exists
        throw RESPONSE_KEYS.TIME_SERIES;
      }
    } else {
      // API call rate limit
      throw response.data[RESPONSE_KEYS.INFORMATION];
    }
  } catch (error) {
    console.error(`Finance Error: ${error}`);
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
