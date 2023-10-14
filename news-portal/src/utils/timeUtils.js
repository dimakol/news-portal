/**
 * Convert a Unix timestamp to date time in "MM-dd hh:mm" format.
 * @param {Number} unixTimeStamp
 * @param {Boolean} showSeconds - default = false, if this parameter is true then the seconds will also be shown.
 * @param {Boolean} showDate - default = true, if this parameter is false then the MM-dd(month and day) will not be shown.
 */
export const unixTimeStamptoDateTime = (
  unixTimeStamp,
  showSeconds = false,
  showDate = true
) => {
  // Months array
  const months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  // Month
  const month = months_arr[date.getMonth()];
  // Day
  const day = date.getDate();
  // Hours
  const hours = date.getHours();
  // Minutes
  const minutes = "0" + date.getMinutes();
  // Seconds
  const seconds = "0" + date.getSeconds();

  // The returned time
  let formatedTime;
  if (showDate) {
    if (showSeconds) {
      // Return time in MM-dd hh:mm:ss format
      formatedTime =
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2);
    }
    // Doesn't show the seconds
    else {
      // Return time in MM-dd hh:mm format
      formatedTime = month + "-" + day + " " + hours + ":" + minutes.substr(-2);
    }
  }
  // Doesn't show the date
  else {
    if (showSeconds) {
      // Return time in hh:mm:ss format
      formatedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    // Doesn't show the seconds
    else {
      // Return time in hh:mm format
      formatedTime = hours + ":" + minutes.substr(-2);
    }
  }

  return formatedTime;
};

/**
 * Convert a Unix timestamp to date in "MM dd" format.
 * @param {Number} unixTimeStamp
 */
export const unixTimeStamptoDate = (unixTimeStamp) => {
  // Months array
  const months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  // Month
  const month = months_arr[date.getMonth()];
  // Day
  const day = date.getDate();
  return month + " " + day;
};

/**
 * Convert a Unix timestamp to day of week.
 * @param {Number} unixTimeStamp
 */
export const unixTimeStamptoDayOfWeek = (unixTimeStamp) => {
  // Days of week array
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  return days[date.getDay()];
};

/**
 * Convert Date to Unix timestamp
 * @param {string} strDate - date
 * @returns {number} time stamp
 */
export const dateToTimeStamp = (strDate) => {
  const dt = Date.parse(strDate);
  return dt / 1000;
};

/**
 * Removes the unnecessary parts - the T and the Z.
 * @param {String} publishedAt - "yyyy-dd-mmThh:mm:ssZ"
 */
export const newsTimeFormat = (publishedAt) => {
  let formatedTime;
  // removes the Z
  formatedTime = publishedAt.slice(0, publishedAt.length - 1);
  // replacing the T with space
  formatedTime = formatedTime.replace("T", " ");
  // "yyyy-dd-mm hh:mm:ss"
  return formatedTime;
};

/**
 * Return the current time "hh:mm:ss" format.
 */
export const currentTime = () => {
  const today = new Date();
  // Hours
  const hours = "0" + today.getHours();
  // Minutes
  const minutes = "0" + today.getMinutes();
  // Seconds
  const seconds = "0" + today.getSeconds();
  // Time in required format
  const time =
    hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return time;
};

/**
 * Convert time to seconds only.
 * @param {String} time - "HH:MM:SS" as well as "MM:SS" or "SS"
 */
const hmsToSecondsOnly = (time) => {
  let splittedTime = time.split(":");
  let seconds = 0;
  let minutes = 1;

  while (splittedTime.length > 0) {
    seconds += minutes * parseInt(splittedTime.pop(), 10);
    minutes *= 60;
  }

  return seconds;
};

/**
 * Calculates and return the live time of the match in minutes.
 * @param {String} startDate - The start date of the match in format: YYYY-MM-DDTHH:MM:SSZ
 * @param {String} lastUpdatedDate - The last updated date of the match in format: YYYY-MM-DDTHH:MM:SSZ
 * @param {Boolean} afterHalfTime - true if the match at second half and false if the match at first half
 */
export const liveMatchTime = (startDate, lastUpdatedDate, afterHalfTime) => {
  const slicedStartDate = startDate.slice(0, startDate.length - 1);
  const slicedLastUpdatedDate = lastUpdatedDate.slice(
    0,
    lastUpdatedDate.length - 1
  );
  const splittedStartDate = slicedStartDate.split("T");
  const splittedLastUpdatedDate = slicedLastUpdatedDate.split("T");

  // minutes
  let liveTime;
  // string to show
  let strTime;
  // The start date and the last update date are the same
  if (splittedStartDate[0] === splittedLastUpdatedDate[0]) {
    liveTime =
      hmsToSecondsOnly(splittedLastUpdatedDate[1]) -
      hmsToSecondsOnly(splittedStartDate[1]);
    // Convert to minutes
    liveTime = Math.floor(liveTime / 60);
    strTime = liveTime + "'";
    // Second Half
    if (afterHalfTime) {
      // Not returning the live time after half time
      // because we don't have enought data from the API about how much time takes the injury time
      strTime = "2nd H";
    }
    // First Half
    else {
      if (liveTime > 45) {
        // Not returning the live time before half time
        strTime = "1st H";
      }
    }
  }

  return strTime;
};
