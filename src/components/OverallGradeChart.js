import React from 'react';
import PropTypes from 'prop-types';
import Chart from './Chart';
import { gradeRound } from '../util/grades';
import { primaryTranslucent, primaryColor } from '../config';

class OverallGradeChart extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  render() {
    const labels = [];
    const data = [];
    const { id, scoredAssignments, categories } = this.props;
    scoredAssignments.forEach(({ name, fakeScore, points }, i) => {
      labels.push(name + (fakeScore == null ? '' : '*'));
      data.push((i === 0 ? 0 : data[i - 1]) + points);
    });
    return (
      <Chart
        id={`${id}-overall`}
        type="line"
        data={{
          labels,
          datasets: [{
            label: 'Overall grade',
            backgroundColor: primaryTranslucent,
            borderColor: primaryColor,
            borderWidth: 1,
            data,
          }],
        }}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                suggestedMax: 100,
              },
            }],
          },
          elements: {
            line: {
              tension: 0,
            },
          },
          tooltips: {
            callbacks: {
              beforeBody: ([{ index: i }]) => {
                const { percent, category: catId } = scoredAssignments[i];
                const { name: catName } = categories[catId];
                return `${gradeRound(percent)}% for this (${catName})`;
              },
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

export default OverallGradeChart;
