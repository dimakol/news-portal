import React, { Component } from 'react';
import Chart from 'chart.js';

/**
 * LineChart component created with chart.js library.
 */
class LineChart extends Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
    
    /**
     * Updating the data of the chart
     */
    componentDidUpdate() {
      this.myChart.data.labels = this.props.labels;
      this.myChart.data.datasets[0].data = this.props.data;
      this.myChart.update();
    }
    
    /**
     * Adding the line chart for the first time
     */
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        options: {
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'minute'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: Math.min(...this.props.data) - 0.15,
                  max: Math.max(...this.props.data) + 0.15
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.labels,
          datasets: [{
            label: this.props.label,
            data: this.props.data,
            fill: 'origin',
            backgroundColor: '#d5eee2', // light green
            pointRadius: 2,
            borderColor: '#0f9d58', // green
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.chartRef} />;
    }
  }

  export default LineChart;