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
    this.myChart.data.labels = this.props.labels;
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.update();
  }

  /**
   * Adding the line chart for the first time
   */
  componentDidMount() {
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
        labels: this.props.labels,
        datasets: [
          {
            label: this.props.label,
            data: this.props.data,
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
    // const minValueDecimal = minValue - Math.floor(minValue);
    // let minYAxes;
    // if (
    //   (minValueDecimal >= 0.25 && minValueDecimal <= 0.49) ||
    //   (minValueDecimal >= 0.75 && minValueDecimal <= 0.99)
    // )
    //   minYAxes = Math.round(minValue * 2) / 2 - 0.5;
    // else minYAxes = Math.round(minValue * 2) / 2;
    // return minYAxes;

    const base = 5;
    return base * Math.floor(minValue / base);
  }

  /** Return the maximum using some formula to show on the chart for y axes,
   * ceil the max value of the chart to a multiple of `base`
   */
  findMaxforyAxes() {
    const maxValue = Math.max(...this.props.data);
    // const maxValueDecimal = maxValue - Math.floor(maxValue);
    // let maxYAxes;
    // if (
    //   (maxValueDecimal > 0 && maxValueDecimal <= 0.24) ||
    //   (maxValueDecimal > 0.5 && maxValueDecimal <= 0.74)
    // )
    //   maxYAxes = Math.round(maxValue * 2) / 2 + 0.5;
    // else maxYAxes = Math.round(maxValue * 2) / 2;
    // return maxYAxes;

    const base = 5;
    return base * Math.ceil(maxValue / base);
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChart;
