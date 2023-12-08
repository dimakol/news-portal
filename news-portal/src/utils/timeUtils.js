import { daysArr, monthsArr, padTo2Digits } from "./parseUtils";

/**
 * Convert a Unix timestamp to date time in "MM-dd hh:mm" format.
 * @param {number} unixTimeStamp
 * @param {boolean} showSeconds - default = false, if this parameter is true then the seconds will also be shown.
 * @param {boolean} showDate - default = true, if this parameter is false then the MM-dd(month and day) will not be shown.
 */
export const unixTimeStamptoDateTime = (
  unixTimeStamp,
  showSeconds = false,
  showDate = true
) => {
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  // Month
  const month = monthsArr[date.getMonth()];
  // Day
  const day = date.getDate();
  // Hours
  const hours = padTo2Digits(date.getHours());
  // Minutes
  const minutes = padTo2Digits(date.getMinutes());
  // Seconds
  const seconds = padTo2Digits(date.getSeconds());

  // The returned time
  let formatedTime;
  if (showDate) {
    if (showSeconds) {
      // Return time in MM-dd hh:mm:ss format
      formatedTime = `${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // Doesn't show the seconds
    else {
      // Return time in MM-dd hh:mm format
      formatedTime = `${month}-${day} ${hours}:${minutes}`;
    }
  }
  // Doesn't show the date
  else {
    if (showSeconds) {
      // Return time in hh:mm:ss format
      formatedTime = `${hours}:${minutes}:${seconds}`;
    }
    // Doesn't show the seconds
    else {
      // Return time in hh:mm format
      formatedTime = `${hours}:${minutes}`;
    }
  }

  return formatedTime;
};

/**
 * Convert a Unix timestamp to date in "MM dd" format.
 * @param {number} unixTimeStamp
 */
export const unixTimeStamptoDate = (unixTimeStamp) => {
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  // Month
  const month = monthsArr[date.getMonth()];
  // Day
  const day = date.getDate();
  return `${month} ${day}`;
};

/**
 * Convert a Unix timestamp to day of week.
 * @param {number} unixTimeStamp
 */
export const unixTimeStamptoDayOfWeek = (unixTimeStamp) => {
  // Convert timestamp to milliseconds
  const date = new Date(unixTimeStamp * 1000);
  return daysArr[date.getDay()];
};

/**
 * Convert Date to Unix timestamp
 * @param {string} strDate - date
 * @returns {number} time stamp
 */
export const dateToTimeStamp = (strDate) => {
  return Date.parse(strDate) / 1000;
};

/**
 * Format date object to yyyy-mm-ddThh:mm:ssZ format
 * @param {Date} date
 * @returns yyyy-mm-ddThh:mm:ssZ format
 */
export const formatDate = (date) => {
  return `${[
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-")}T${[
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ].join(":")}Z`;
};

/**
 * Replace T with empty whitespace and replace Z with no character
 * @param {string} ISODate - ISO 8601 format - "yyyy-mm-ddThh:mm:ssZ"
 * @returns "yyyy-mm-dd hh:mm:ss" format
 */
export const formatISODate = (ISODate) => {
  return ISODate.replace("T", " ").replace("Z", "");
};

/**
 * Return the current time "hh:mm:ss" format.
 */
export const currentTime = () => {
  const today = new Date();
  // Hours
  const hours = padTo2Digits(today.getHours());
  // Minutes
  const minutes = padTo2Digits(today.getMinutes());
  // Seconds
  const seconds = padTo2Digits(today.getSeconds());
  // Time in required format
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
};

/**
 * Convert time to seconds only.
 * @param {string} time - "HH:MM:SS" as well as "MM:SS" or "SS"
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
 * Calculate time differences in hours between two dates
 * @param {Date} dateTime2
 * @param {Date} dateTime1
 * @returns the time difference in hours
 */
const diffHours = (dateTime2, dateTime1) => {
  let diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.round(diff);
};

/**
 * Add hours to date
 * @param {Date} date
 * @param {number} hours
 * @returns updated date with the hours that added/removed
 */
const addHours = (date, hours) => {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return date;
};

/**
 * Calculates and return the live time of the match in minutes.
 * @param {string} startDateTimeUTC - The start date time of the match in UTC format: YYYY-MM-DDTHH:MM:SSZ
 * @param {string} lastUpdatedDateTime - The last updated date time from server in format: YYYY-MM-DDTHH:MM:SSZ
 * @param {boolean} afterHalfTime - true if the match at second half and false if the match at first half
 */
export const liveMatchTime = (
  startDateTimeUTC,
  lastUpdatedDateTime,
  afterHalfTime
) => {
  const [matchStartDate, matchStartTime] = formatISODate(
    formatDate(new Date(startDateTimeUTC))
  ).split(" ");

  // difference in hours between current date from computer and the last updated date from server
  const diffHoursLastUpdate = diffHours(
    new Date(),
    new Date(lastUpdatedDateTime)
  );
  // add the difference in hours to last updated date from server to get the last updated date in local time zone
  const lastUpdatedDateTimeLocal = addHours(
    new Date(lastUpdatedDateTime),
    diffHoursLastUpdate
  );
  const [matchCurrentDate, matchCurrentTime] = formatISODate(
    formatDate(new Date(lastUpdatedDateTimeLocal))
  ).split(" ");

  // minutes
  let liveTime;
  // string to show
  let strTime;
  // The start date and the last update date are the same
  if (matchStartDate === matchCurrentDate) {
    liveTime =
      hmsToSecondsOnly(matchCurrentTime) - hmsToSecondsOnly(matchStartTime);
    // Convert to minutes
    liveTime = Math.floor(liveTime / 60);
    strTime = `${liveTime}'`;
    // Second Half
    if (afterHalfTime) {
      // Not returning the live time after half time
      // because we don't have enought data from the API about how much time takes the injury time
      strTime = `2nd HALF`;
    }
    // First Half
    else {
      if (liveTime > 45) {
        // Not returning the live time before half time
        strTime = `1st HALF`;
      }
    }
  }

  return strTime;
};
