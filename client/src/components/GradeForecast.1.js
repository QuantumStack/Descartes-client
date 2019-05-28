import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import NavLink from './NavLink';
import Chart from './Chart';
import { primary_translucent, primary_color } from '../config';
import palette from 'google-palette';

class GradeForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: props.assignments.sort((a, b) => a.date - b.date),
      grade: null,
      sortParam: 'date',
      sortOrder: 1,
    };
    this.sortedAssigns = this.sortedAssigns.bind(this);
    this.scoredAssigns = this.scoredAssigns.bind(this);
    this.catScore = this.catScore.bind(this);
    this.catTotal = this.catTotal.bind(this);
    this.getPercent = this.getPercent.bind(this);
    this.getPts = this.getPts.bind(this);
    this.overallGrade = this.overallGrade.bind(this);
    this.chartOverall = this.chartOverall.bind(this);
    this.chartAssignments = this.chartAssignments.bind(this);
    this.chartCategories = this.chartCategories.bind(this);
    setTimeout(() => {
      this.setState(({ assignments }) => {
        assignments[1].score = 10;
        return { assignments };
      });
    }, 3000);
  }

  componentDidMount() {
    const grade = this.overallGrade();
    this.setState({ grade }, () => this.props.setGrade(grade));
  }

  sortedAssigns() {
    const { assignments, sortParam: param, sortOrder: order } = this.state;
    return assignments.sort(({ [param]: a }, { [param]: b }) =>
      (a < b ? -1 : (a > b ? 1 : 0)) * order);
  }

  scoredAssigns() {
    return this.state.assignments.filter(a => a.score != null);
  }

  catScore(name) {
    return this.scoredAssigns().filter(a => a.category === name)
      .reduce((total, a) => total + (a.override ? a.override / 100 * a.out_of : a.score));
  }

  catTotal(name) {
    return this.scoredAssigns().filter(a => a.category === name)
      .reduce((total, a) => total + a.out_of, 0);
  }

  getPercent(assign) {
    return assign.override || (assign.score / assign.out_of * 100)
  }

  getPts(assign) {
    const percent = this.getPercent(assign);
    const cat = this.props.categories[assign.category];
    const total = this.catTotal(assign.category);
    return percent * (assign.out_of / total) * cat.weight / 100;
  }

  overallGrade() {
    return this.state.assignments.reduce((total, a) =>
      a.score == null ? total : total + this.getPts(a), 0);
  }

  chartOverall() {
    const labels = [], data = [];
    const scored = this.scoredAssigns();
    scored.forEach((a, i) => {
      labels.push(a.name);
      data.push((i === 0 ? 0 : data[i - 1]) + this.getPts(a));
    });
    return (
      <Chart id={`${this.props.id}-overall`} type='line' data={{
        labels,
        datasets: [{
          label: 'Overall grade',
          backgroundColor: primary_translucent,
          borderColor: primary_color,
          borderWidth: 2,
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
              `${this.getPercent(scored[i])}% for this (${scored[i].category})`,
          },
        },
      }} />
    );
  }

  chartAssignments() {
    const labels = [], data = [];
    const scored = this.scoredAssigns();
    scored.forEach(a => {
      labels.push(a.name);
      data.push(this.getPercent(a));
    });
    return (
      <Chart id={`${this.props.id}-assignments`} type='bar' data={{
        labels,
        datasets: [{
          label: 'Assignment score',
          backgroundColor: primary_translucent,
          borderColor: primary_color,
          borderWidth: 1,
          hoverBackgroundColor: primary_color,
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
              `${this.getPts(scored[i])} points overall (${scored[i].category})`,
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
      <Chart id={`${this.props.id}-categories`} type='pie' data={{
        labels,
        datasets: [{
          label: 'Assignment score',
          backgroundColor: palette('sequential', data.length).map(color => `#${color}`),
          borderColor: primary_color,
          borderWidth: 1,
          data,
        }],
      }} />
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={`${match.path}`} component={this.chartOverall} />
        <Route exact path={`${match.path}/assignments`} component={this.chartAssignments} />
        <Route exact path={`${match.path}/categories`} component={this.chartCategories} />
        <ul className='uk-tab-bottom uk-flex-center' data-uk-tab='toggle: none'>
          <NavLink options={{ to: match.url }}>Overall</NavLink>
          <NavLink options={{ to: `${match.url}/assignments` }}>Assignments</NavLink>
          <NavLink options={{ to: `${match.url}/categories` }}>Categories</NavLink>
        </ul>
      </div>
    );
  }
}

export default withRouter(GradeForecast);
