import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import CurrentWeather from './Current';
import DayCard from './DayCard';
import { unixTimeStamptoDateTime, unixTimeStamptoDate, unixTimeStamptoDayOfWeek } from '../../utils/timeUtils';
import {setWeatherIcon} from '../../utils/imageUtils';

/**
 * The Weather component widget displays the current weather conditions. 
 * Clicking on it will display a 7-day (weekly) based forecast. 
 * This tile should update every 4 hours.
 */
class Weather extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isWeekly: false };
      }
    
    // Toogle between day and week display
    toogleDayWeek = () => this.setState({ isWeekly: !this.state.isWeekly });
    
    render() {
        //console.log("[Weather.js] render");  // Dima debug

        const { isWeekly } = this.state;
        
        return(
            <Card className="col-md-8" border="dark" onClick={this.toogleDayWeek}>
                <Card.Body>
                    <Card.Title><b>Weather</b></Card.Title>
                    {!this.props.response ? <Card.Text>Loading...</Card.Text> :
                        !isWeekly ? 
                            // current weather
                            <CurrentWeather temperature={Math.round(this.props.response.currently.temperature)} 
                                            icon={setWeatherIcon(this.props.response.currently.icon)} 
                                            iconName={this.props.response.currently.icon} 
                                            summary={this.props.response.currently.summary}
                                            time={unixTimeStamptoDateTime(this.props.response.currently.time)}/> :
                            // weekly weather
                            this.props.response.daily.data.map((dayData, index) => 
                                <DayCard key={index}
                                         day={unixTimeStamptoDayOfWeek(dayData.time)}
                                         date={unixTimeStamptoDate(dayData.time)}
                                         icon={setWeatherIcon(dayData.icon)}
                                         iconName={dayData.icon}
                                         temperatureMin={Math.round(dayData.temperatureMin)}
                                         temperatureMax={Math.round(dayData.temperatureMax)}
                                         summary={dayData.summary} />)       
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Weather;