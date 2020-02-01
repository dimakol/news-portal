import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * Display the current weather
 * @param {*} props 
 */
const Current = ( props ) => {
        
    const temperature = props.temperature;
    const icon = props.icon;
    const iconName = props.iconName;
    const summary =  props.summary;
    const time = props.time;
    
    return (
        <div>
            <Card.Subtitle className="inline-block margin-left-14-percent">
                <div className="inline-block">
                    <h1>{temperature} C°</h1>
                    <h1>Ashqelon</h1>
                    <h3>{summary}</h3>
                </div>
                <img src={icon} 
                    alt={iconName} 
                    className="align-right medium">
                </img>

            </Card.Subtitle>
            <Card.Text>
                <small className="text-muted">Updated {time}</small>
            </Card.Text>
        </div>
    )
  }
  
  export default Current;