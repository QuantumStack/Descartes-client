import React from 'react';
import chartjs from 'chart.js';
import { fontFamily } from '../config';

class Chart extends React.Component {
  chartRef = React.createRef();

  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }

  makeChart() {
    const canvasRef = this.chartRef.current.getContext('2d');
    const { type, data, options = {} } = this.props;
    new chartjs(canvasRef, {
      type,
      data,
      options: {
        legend: {
          position: 'bottom',
          labels: {
            fontFamily,
          }
        },
        tooltips: {
          titleFontFamily: fontFamily,
          bodyFontFamily: fontFamily,
          footerFontFamily: fontFamily,
        },
        ...options,
      },
    });
  }

  componentDidMount() {
    this.makeChart();
  }
  
  componentDidUpdate() {
    this.makeChart();
  }

  render() {
    return (
      <canvas id={this.props.id} ref={this.chartRef} />
    );
  }
}

export default Chart;
