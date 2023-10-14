import React from "react";
import Card from "react-bootstrap/Card";

/**
 * Display day card of weekly weather
 * @param {string} day - weather day of the week
 * @param {string} date - weather date in "MM dd" format
 * @param {string} icon - weather icon
 * @param {number} temperatureMin - minimum weather temperature in celsius degree
 * @param {number} temperatureMax - maximum weather temperature in celsius degree
 * @param {string} description - weather description
 */
const DayCard = ({
  day,
  date,
  icon,
  temperatureMin,
  temperatureMax,
  description,
}) => (
  <Card.Text className="inline-block border-1px-gray padding-11 margin-top-20">
    {day}
    <br></br>
    {date}
    <br></br>
    <img src={icon} alt={description} className="small"></img>
    <br></br>
    {temperatureMin} - {temperatureMax} C°
  </Card.Text>
);

export default DayCard;
