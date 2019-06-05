import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import KeyShortcuts from './KeyShortcuts';
import NavLink from './NavLink';
import OverallGradeChart from './OverallGradeChart';
import AssignmentsChart from './AssignmentsChart';
import CategoriesChart from './CategoriesChart';
import AssignmentDropdown from './AssignmentDropdown';
import { gradeRound } from '../util/grades';

class GradeForecast extends React.PureComponent {
  static propTypes = {
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
    resetAllFakes: PropTypes.func.isRequired,
    history: RouterPropTypes.history.isRequired,
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
    const { resetAllFakes, history, match } = this.props;
    return [
      {
        combos: 'o',
        callback: () => history.push(`${match.url}`),
        description: 'Overall course grade chart',
      },
      {
        combos: 'a',
        callback: () => history.push(`${match.url}/assignments`),
        description: 'Score breakdown by assignment',
      },
      {
        combos: 'c',
        callback: () => history.push(`${match.url}/categories`),
        description: 'Categories and their weights',
      },
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
      match, assignments, categories, setFakeScore, resetFakeScore,
    } = this.props;
    // TODO: display assignment flags and stats (mean, med, etc.)
    return (
      <div>
        <KeyShortcuts key="grade-forecaster-shortcuts" shortcuts={this.makeShortcuts()} />

        <Route exact path={match.path} render={this.chartOverall} />
        <Route exact path={`${match.path}/assignments`} render={this.chartAssignments} />
        <Route exact path={`${match.path}/categories`} render={this.chartCategories} />
        <ul className="uk-tab-bottom uk-flex-center" data-uk-tab="toggle: none">
          <NavLink options={{ to: match.url }}>Overall</NavLink>
          <NavLink options={{ to: `${match.url}/assignments` }}>Assignments</NavLink>
          <NavLink options={{ to: `${match.url}/categories` }}>Categories</NavLink>
        </ul>

        <p>
          <span className="uk-text-success uk-margin-small-right" data-uk-icon="icon: star; ratio: 0.75" />
          <small className="uk-text-middle">
            <strong className="uk-margin-small-right">Pro Tip</strong>
            <span> Click the icons next to each assignment for details and to test a different score.</span>
          </small>
        </p>

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
                  <td id={`details-${assign.id}-boundary`}>
                    <span>{assign.name}</span>
                    <a className="uk-margin-small-left">
                      {assign.override != null && <span className="uk-text-danger uk-margin-xsmall-right" data-uk-icon="icon: lifesaver; ratio: 0.9" />}
                      {assign.fakeScore != null && <span className="uk-text-link uk-margin-xsmall-right" data-uk-icon="icon: pencil; ratio: 0.9" />}
                      <span className="uk-text-emphasis" data-uk-icon={`icon: ${assign.description ? 'info' : 'chevron-down'}; ratio: 0.9`} />
                    </a>
                    <AssignmentDropdown {...assign} setFakeScore={setFakeScore} resetFakeScore={resetFakeScore} />
                  </td>
                  <td>
                    {assign.fakeScore != null && <strong className="uk-text-link">{assign.fakeScore}</strong>}
                    {assign.fakeScore == null && assign.score != null && assign.score}
                    {assign.fakeScore == null && assign.score == null && '-'}
                  </td>
                  <td>{assign.outOf}</td>
                  <td>
                    {assign.fakeScore != null && (
                      <strong className="uk-text-link">
                        {gradeRound(assign.percent)}
                        <span>%</span>
                      </strong>
                    )}
                    {assign.fakeScore == null && assign.percent != null && `${gradeRound(assign.percent)}%`}
                    {assign.percent == null && '-'}
                  </td>
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
