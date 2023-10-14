import React from "react";
import Card from "react-bootstrap/Card";

/**
 * Display the current weather
 * @param {number} temperature - current temperature in celsius degree
 * @param {string} icon - weather icon
 * @param {string} description - weather description
 * @param {string} time - weather last update time in "MM-dd hh:mm" format
 */
const Current = ({ temperature, icon, description, time }) => (
  <React.Fragment>
    <Card.Subtitle className="inline-block margin-left-14-percent">
      <div className="inline-block">
        <h1>{temperature} C°</h1>
        <h1>Ashkelon</h1>
        <h3>{description}</h3>
      </div>
      <img src={icon} alt={description} className="align-right"></img>
    </Card.Subtitle>
    <Card.Text>
      <small className="text-muted">Updated {time}</small>
    </Card.Text>
  </React.Fragment>
);

export default Current;
