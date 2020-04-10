import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Grid from './components/Grid';
//import { currentTime } from './utils/timeUtils';  // for debug
import './App.css';

/**
 * The main application component.
 * In this component the socket.io connection is established with the node.js server.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // the news data that we are receiving from the server.
      newsResponse: false,
      // the weather data that we are receiving from the server.
      weatherResponse: false,
      // the finance data that we are receiving from the server.
      financeResponse: false,
      // the sports data that we are receiving from the server.
      sportsResponse: false
    };
  }

  /**
   * Listening for the events from the server-side,
   * when some event received storing the data inside our component state. 
   */
  componentDidMount() {
    // making socket request to the server endpoint.
    const socket = socketIOClient('/');
    // on news event
    socket.on("News", data => {
      //console.log("[App.js] News Update: ", currentTime());  // for debug
      this.setState({ newsResponse: data })
    });
    // on weather event
    socket.on("Weather", data => {
      //console.log("[App.js] Weather Update: ", currentTime());   // for debug
      this.setState({ weatherResponse: data })
    });
    // on finance event
    socket.on("Finance", data => {
      //console.log("[App.js] Finance Update: ", currentTime());   // for debug
      this.setState({ financeResponse: data })
    });
    // on sports event
    socket.on("Sports", data => {
      //console.log("[App.js] Sports Update: ", currentTime());  // for debug
      this.setState({ sportsResponse: data })
    });
  }

  render() {
    const { weatherResponse, newsResponse, financeResponse, sportsResponse } = this.state;
    return (
      <div>
        <h4 className="padding-10 center-text red underline">News Portal</h4>
        <Grid newsInfo={newsResponse} 
              weatherInfo={weatherResponse} 
              financeInfo={financeResponse}
              sportsInfo={sportsResponse} />
      </div>
    );
  }
}

export default App;
