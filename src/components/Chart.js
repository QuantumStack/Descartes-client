import React from 'react';
import PropTypes from 'prop-types';
import ChartJS from 'chart.js';
import { fontFamily } from '../config';

class Chart extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
    options: PropTypes.objectOf(PropTypes.object),
  }

  static defaultProps = {
    options: {},
  }

  chartRef = React.createRef();

  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }

  componentDidMount() {
    this.makeChart();
  }

  componentDidUpdate() {
    this.makeChart();
  }

  makeChart() {
    const canvasRef = this.chartRef.current.getContext('2d');
    const { type, data, options } = this.props;
    return new ChartJS(canvasRef, {
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

  render() {
    const { id, data } = this.props;
    return (
      <canvas key={`${id}-${JSON.stringify(data)}`} id={id} ref={this.chartRef} />
    );
  }
}

export default Chart;
