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

    const { symbol, lastUpdated, data } = this.props.response;
    return (
      <Card className="col-md-4" border="dark">
        <Card.Body>
          <Card.Title>
            <b>Finance</b>
            {this.props.response && (
              <img
                src={teslaMotors}
                alt={"Tesla-Motors"}
                className="small"
              ></img>
            )}
          </Card.Title>
          {!this.props.response ? (
            <Card.Text>Loading...</Card.Text>
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
