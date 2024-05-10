import React, { PureComponent } from "react";
import Card from "react-bootstrap/Card";
import LineChart from "./LineChart";
import teslaMotors from "../../assets/images/finance/tesla-motors.svg";

/**
 * The Finance component widget displays a stock market line chart.
 * This tile should update every 5 minutes.
 */
class Finance extends PureComponent {
  render() {
    //console.log("[Finance.js] render");  // for debug

    const renderCardTitle = () => (
      <Card.Title>
        <b>Finance</b>
        {this.props.response && !this.props.response.errorMessage && (
          <img src={teslaMotors} alt={"Tesla-Motors"} className="small"></img>
        )}
      </Card.Title>
    );

    const { symbol, lastUpdated, data, errorMessage } = this.props.response;
    return (
      <Card className="col-md-4" border="dark">
        <Card.Body>
          {renderCardTitle()}
          {!this.props.response ? (
            <Card.Text>Loading...</Card.Text>
          ) : errorMessage ? (
            <Card.Text>{errorMessage}</Card.Text>
          ) : (
            <div>
              <LineChart
                label={symbol}
                labels={Object.keys(data)}
                data={Object.values(data)}
              />
              <Card.Text>
                <small className="text-muted">Updated {lastUpdated}</small>
              </Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Finance;
