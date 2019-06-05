import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import NavLink from './NavLink';
import Chart from './Chart';
import { primaryTranslucent, primaryColor } from '../config';
import Gradebook from '../util/gradebook';
import palette from 'google-palette';

class GradeForecast extends React.PureComponent {
  constructor(props) {
    super(props);
    const gradebook = new Gradebook(props.assignments, props.categories);
    this.state = {
      gradebook,
    };
    props.setGrade(gradebook.overall());
    this.chartOverall = this.chartOverall.bind(this);
    this.chartAssignments = this.chartAssignments.bind(this);
    this.chartCategories = this.chartCategories.bind(this);
    setTimeout(() => {
      this.state.gradebook.update(1, 10);
      this.forceUpdate();
    }, 3000);
  }

  chartOverall() {
    const { gradebook } = this.state;
    const labels = [], data = [];
    gradebook.scored.forEach(({ name }, i) => {
      labels.push(name);
      data.push((i === 0 ? 0 : data[i - 1]) + gradebook.getPts(i, 'scored'));
    });
    return (
      <Chart id={`${this.props.id}-overall`} type="line" data={{
        labels,
        datasets: [{
          label: 'Overall grade',
          backgroundColor: primaryTranslucent,
          borderColor: primaryColor,
          borderWidth: 1,
          data,
        }]
      }} options={{
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
            },
          }]
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        tooltips: {
          callbacks: {
            beforeBody: ([{ index: i }]) =>
            `${gradebook.getPercent(i, 'scored')}% for this (${gradebook.scored[i].category})`,
            afterFooter: ([{ index: i }]) => 
              gradebook.scored[i].updated ? 'You are testing this score' : '',
          },
        },
      }} />
    );
  }

  chartAssignments() {
    const labels = [], data = [];
    const { gradebook } = this.state;
    gradebook.scored.forEach(({ name }, i) => {
      labels.push(name);
      data.push(gradebook.getPercent(i, 'scored'));
    });
    console.log(data);
    return (
      <Chart id={`${this.props.id}-assignments`} type="bar" data={{
        labels,
        datasets: [{
          label: 'Assignment score',
          backgroundColor: primaryTranslucent,
          borderColor: primaryColor,
          borderWidth: 1,
          hoverBackgroundColor: primaryColor,
          data,
        }],
      }} options={{ 
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
              callback: value => `${value}%`
            },
          }],
        },
        tooltips: {
          callbacks: {
            afterBody: ([{ index: i }]) =>
              `${gradebook.getPts(i, 'scored')} points overall (${gradebook.scored[i].category})`,
            afterFooter: ([{ index: i }]) =>
              gradebook.scored[i].updated ? 'You are testing this score' : '',
          },
        },
      }} />
    )
  }

  chartCategories() {
    const labels = [], data = [];
    Object.entries(this.props.categories).forEach(([name, { weight }]) => {
      labels.push(name);
      data.push(weight);
    });
    return (
      <Chart id={`${this.props.id}-categories`} type="pie" data={{
        labels,
        datasets: [{
          label: 'Assignment score',
          backgroundColor: palette('sequential', data.length).map(color => `#${color}`),
          borderColor: primaryColor,
          borderWidth: 1,
          data,
        }],
      }} />
    );
  }

  render() {
    const { match, id } = this.props;
    const { gradebook } = this.state;
    return (
      <div>
        <Route exact path={match.path} render={this.chartOverall} />
        <Route exact path={`${match.path}/assignments`} component={this.chartAssignments} />
        <Route exact path={`${match.path}/categories`} component={this.chartCategories} />
        <ul className="uk-tab-bottom uk-flex-center" data-uk-tab="toggle: none">
          <NavLink options={{ to: match.url }}>Overall</NavLink>
          <NavLink options={{ to: `${match.url}/assignments` }}>Assignments</NavLink>
          <NavLink options={{ to: `${match.url}/categories` }}>Categories</NavLink>
        </ul>
        
        <div className="uk-overflow-auto uk-margin-small-top">
          <table className="uk-table uk-table-small uk-table-hover uk-table-divider">
            <thead>
              <tr>
                <th className="uk-table-expand">Name</th>
                <th>Score</th>
                <th>Max</th>
                <th>Percent</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {gradebook.assigns.map((a, i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td data-uk-toggle={`target: .assignment-${id}-${i}`}>
                    <span className={`assignment-${id}-${i}`}>
                      {a.score == null ? '-' : a.score}
                    </span>
                    <span className={`assignment-${id}-${i}`} hidden>
                      <input className="uk-input" type="text" value={a.score} />
                    </span>
                  </td>
                  <td>{a.out_of}</td>
                  <td>{a.score == null ? '-' : `${Gradebook.format(gradebook.getPercent(i))}%`}</td>
                  <td>{a.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(GradeForecast);
