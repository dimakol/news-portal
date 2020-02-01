import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * Display day card of weekly weather 
 * @param {*} props 
 */
const DayCard = ( props ) => {
        
    const day = props.day;
    const date = props.date;
    const icon = props.icon;
    const iconName = props.iconName;
    const temperatureMin = props.temperatureMin;
    const temperatureMax = props.temperatureMax;
    
    return (
        <Card.Text className="inline-block border-1px-gray padding-11 margin-top-20">
            {day}
            <br></br>
            {date}
            <br></br>
            <img src={icon} 
                alt={iconName} 
                className="small">
            </img>
            <br></br>
            {temperatureMin} - {temperatureMax} C°
        </Card.Text>
    )
  }
  
  export default DayCard;