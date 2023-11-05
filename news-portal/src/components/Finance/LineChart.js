import React, { Component } from "react";
import Chart from "chart.js";

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
    const { labels, data } = this.props;
    this.myChart.data.labels = labels;
    this.myChart.data.datasets[0].data = data;
    this.myChart.update();
  }

  /**
   * Adding the line chart for the first time
   */
  componentDidMount() {
    const { label, labels, data } = this.props;
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "minute",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: this.findMinforyAxes(),
                max: this.findMaxforyAxes(),
              },
            },
          ],
        },
      },
      data: {
        labels: labels, // x Axis - the time interval
        datasets: [
          {
            label: label,
            data: data, // Points on the chart
            fill: "origin",
            backgroundColor: "#d5eee2", // light green
            pointRadius: 2,
            borderColor: "#0f9d58", // green
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
    });
  }

  /** Return the minimum using some formula to show on the chart for y axes,
   * floor the minimum value of the chart to a multiple of `base`
   */
  findMinforyAxes() {
    const minValue = Math.min(...this.props.data);
    const base = 5;
    return base * Math.floor(minValue / base);
  }

  /** Return the maximum using some formula to show on the chart for y axes,
   * ceil the max value of the chart to a multiple of `base`
   */
  findMaxforyAxes() {
    const maxValue = Math.max(...this.props.data);
    const base = 5;
    return base * Math.ceil(maxValue / base);
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChart;
