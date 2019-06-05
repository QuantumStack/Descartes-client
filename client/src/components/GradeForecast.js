import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import { modal } from 'uikit';
import KeyShortcuts from './KeyShortcuts';
import NavLink from './NavLink';
import OverallGradeChart from './OverallGradeChart';
import AssignmentsChart from './AssignmentsChart';
import CategoriesChart from './CategoriesChart';
import { gradeRound } from '../util/grades';

class GradeForecast extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    resetAllFakes: PropTypes.func.isRequired,
    match: RouterPropTypes.match.isRequired,
  }

  constructor(props) {
    super(props);
    this.makeShortcuts = this.makeShortcuts.bind(this);
    this.chartOverall = this.chartOverall.bind(this);
    this.chartAssignments = this.chartAssignments.bind(this);
    this.chartCategories = this.chartCategories.bind(this);
  }

  makeShortcuts() {
    const { resetAllFakes } = this.props;
    return [
      {
        combos: 'r',
        callback: resetAllFakes,
        description: 'Reset grades you\'re testing',
      },
    ];
  }

  chartOverall() {
    return <OverallGradeChart {...this.props} />;
  }

  chartAssignments() {
    return <AssignmentsChart {...this.props} />;
  }

  chartCategories() {
    return <CategoriesChart {...this.props} />;
  }

  render() {
    const {
      match, id, assignments, categories,
    } = this.props;
    return (
      <div>
        <KeyShortcuts key="all-courses-shortcuts" shortcuts={this.makeShortcuts()} />

        <Route exact path={match.path} render={this.chartOverall} />
        <Route exact path={`${match.path}/assignments`} render={this.chartAssignments} />
        <Route exact path={`${match.path}/categories`} render={this.chartCategories} />
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
              {assignments.map(assign => (
                <tr key={assign.id}>
                  <td>{assign.name}</td>
                  {assign.score == null ? <td>-</td> : (
                    <td data-uk-toggle={`target: .assignment-${id}-${assign.id}`}>
                      <span className={`assignment-${id}-${assign.id}`}>
                        {assign.score}
                      </span>
                      <span className={`assignment-${id}-${assign.id}`} hidden>
                        <input className="uk-input" type="text" value={assign.score} />
                      </span>
                    </td>
                  )}
                  <td>{assign.outOf}</td>
                  <td>{assign.score == null ? '-' : `${gradeRound(assign.percent)}%`}</td>
                  <td>{categories[assign.category].name}</td>
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
