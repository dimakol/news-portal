import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import LineChart from './LineChart';

/**
 * The Finance component widget displays a stock market line chart. 
 * This tile should update every 5 minutes.
 */
class Finance extends PureComponent {
    constructor(props) {
        super(props);
        this.label = '';    // Symbol
        this.labels = [];   // x Axis - the time interval
        this.data = [];     // Points on the chart - close values
        this.lastUpdatedDateTime = '';
    }

    render() {
        //console.log("[Finance.js] render");  // Dima debug
        
        if (this.props.response) {
            this.label = this.props.response['Meta Data']['2. Symbol'];
            this.lastUpdatedDateTime = this.props.response['Meta Data']['3. Last Refreshed'];
            let timeSeries = this.props.response['Time Series (5min)'];
            // filter labels by same date
            this.labels = Object.keys(timeSeries).filter(datetime => datetime.split(' ')[0] === this.lastUpdatedDateTime.split(' ')[0]);
            // take the close values sliced by same date
            this.data = Object.values(timeSeries).slice(0, this.labels.length).map(d => d["4. close"]);
        }

        return(
            <Card className="col-md-4" border="dark">
                <Card.Body>
                    <Card.Title><b>Finance</b></Card.Title>
                    {!this.props.response ? <Card.Text>Loading...</Card.Text> :
                        <div>
                            <LineChart
                                label={this.label}
                                labels={this.labels}
                                data={this.data}
                            />
                            <Card.Text>                            
                                <small className="text-muted">Updated {this.lastUpdatedDateTime}</small>
                            </Card.Text>
                        </div>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Finance;