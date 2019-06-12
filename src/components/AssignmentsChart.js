import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import Chart from './Chart';
import { gradeRound } from '../util/grades';
import { primaryTranslucent, primaryColor } from '../config';

class AssignmentsChart extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  render() {
    const labels = [];
    const data = [];
    const { id, scoredAssignments, categories } = this.props;
    scoredAssignments.forEach(({ name, fakeScore, percent }) => {
      labels.push(name + (fakeScore == null ? '' : '*'));
      data.push(percent);
    });
    return (
      <Chart
        id={`${id}-assignments`}
        type="bar"
        data={{
          labels,
          datasets: [{
            label: 'Assignment percent',
            backgroundColor: primaryTranslucent,
            borderColor: primaryColor,
            borderWidth: 1,
            hoverBackgroundColor: primaryColor,
            data,
          }],
        }}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                suggestedMax: 100,
                callback: value => `${value}%`,
              },
            }],
          },
          tooltips: {
            callbacks: {
              afterBody: ([{ index: i }]) => {
                const { points, category: catId } = scoredAssignments[i];
                const { name: catName } = categories[catId];
                return `${pluralize('points', gradeRound(points), true)} overall (${catName})`;
              },
              label: ({ yLabel }) => `Assignment percent: ${gradeRound(yLabel)}%`,
              afterFooter: ([{ index: i }]) => {
                const { fakeScore } = scoredAssignments[i];
                return fakeScore != null ? 'Testing this score' : '';
              },
            },
          },
        }}
      />
    );
  }
}

export default AssignmentsChart;
