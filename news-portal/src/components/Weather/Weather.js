import React, { PureComponent } from "react";
import Card from "react-bootstrap/Card";
import CurrentWeather from "./Current";
import DayCard from "./DayCard";
import {
  unixTimeStamptoDateTime,
  unixTimeStamptoDate,
  unixTimeStamptoDayOfWeek,
  dateToTimeStamp,
} from "../../utils/timeUtils";
import { setWeatherIcon } from "../../utils/imageUtils";
import { weatherCode } from "../../utils/parseUtils";
import poweredByTommorow from "../../assets/images/weather/attribution/Powered_by_Tomorrow-Black.svg";

/**
 * The Weather component widget displays the current weather conditions.
 * Clicking on it will display a 5-day (weekly) based forecast.
 * This tile should update every 4 hours.
 */
class Weather extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isWeekly: false };
  }

  /**
   * Toogle between day and week display
   */
  toogleDayWeek = () => this.setState({ isWeekly: !this.state.isWeekly });

  render() {
    //console.log("[Weather.js] render");  // for debug

    const { isWeekly } = this.state;
    const { currently, daily } = this.props.response;

    return (
      <Card
        className="col-md-8 cursor-pointer"
        border="dark"
        onClick={this.toogleDayWeek}
      >
        <Card.Body>
          <Card.Title>
            <b>Weather</b>
          </Card.Title>
          {!this.props.response ? (
            <Card.Text>Loading...</Card.Text>
          ) : !isWeekly ? (
            // current weather
            <CurrentWeather
              temperature={Math.round(currently?.values?.temperature)}
              icon={setWeatherIcon(currently?.values?.weatherCode)}
              description={weatherCode[currently?.values?.weatherCode]}
              time={unixTimeStamptoDateTime(dateToTimeStamp(currently?.time))}
            />
          ) : (
            // weekly weather
            daily.map((dayData, index) => (
              <DayCard
                key={index}
                day={unixTimeStamptoDayOfWeek(dateToTimeStamp(dayData?.time))}
                date={unixTimeStamptoDate(dateToTimeStamp(dayData?.time))}
                icon={setWeatherIcon(dayData?.values?.weatherCodeMax)}
                temperatureMin={Math.round(dayData?.values?.temperatureMin)}
                temperatureMax={Math.round(dayData?.values?.temperatureMax)}
                description={weatherCode[dayData?.values?.weatherCodeMax]}
              />
            ))
          )}

          {this.props.response && (
            <img
              src={poweredByTommorow}
              alt="Powered by Tomorrow.io"
              className="medium align-right-bottom"
            ></img>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Weather;
