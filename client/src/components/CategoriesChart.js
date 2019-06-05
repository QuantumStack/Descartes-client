import React from 'react';
import PropTypes from 'prop-types';
import palette from 'google-palette';
import Chart from './Chart';
import { primaryColor } from '../config';

class CategoriesChart extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  render() {
    const labels = [];
    const data = [];
    const { id, categories } = this.props;
    Object.values(categories).forEach(({ name, weight }) => {
      labels.push(name);
      data.push(weight);
    });
    return (
      <Chart
        id={`${id}-categories`}
        type="pie"
        data={{
          labels,
          datasets: [{
            label: 'Assignment score',
            backgroundColor: palette('sequential', data.length).map(color => `#${color}`),
            borderColor: primaryColor,
            borderWidth: 1,
            data,
          }],
        }}
      />
    );
  }
}

export default CategoriesChart;
