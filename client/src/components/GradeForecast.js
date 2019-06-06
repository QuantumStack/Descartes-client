import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import { drop } from 'uikit';
import KeyShortcuts from './KeyShortcuts';
import NavLink from './NavLink';
import OverallGradeChart from './OverallGradeChart';
import AssignmentsChart from './AssignmentsChart';
import CategoriesChart from './CategoriesChart';
import AssignmentDropdown from './AssignmentDropdown';
import { gradeRound } from '../util/grades';
import ResponsiveFilters from './ResponsiveFilters';
import AssignmentFilters from './AssignmentFilters';

class GradeForecast extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    hasFake: PropTypes.bool.isRequired,
    options: {
      allowTestingScores: PropTypes.bool,
      allowTestingAssignments: PropTypes.bool,
    },
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
    resetAllFakes: PropTypes.func.isRequired,
    history: RouterPropTypes.history.isRequired,
    match: RouterPropTypes.match.isRequired,
  }

  static defaultProps = {
    options: {
      allowTestingScores: true,
      allowTestingAssignments: true,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      sort: 'name',
      order: 1,
      search: '',
      display: '',
    };
    this.getAssignments = this.getAssignments.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.makeShortcuts = this.makeShortcuts.bind(this);
    this.chartOverall = this.chartOverall.bind(this);
    this.chartAssignments = this.chartAssignments.bind(this);
    this.chartCategories = this.chartCategories.bind(this);
  }

  getAssignments() {
    const { assignments } = this.props;
    setTimeout(() => {
      const filterDrop = drop('#assignments-filter-drop');
      if (filterDrop) filterDrop.hide();
    }, 500);
    const {
      sort, order, search, display,
    } = this.state;
    return assignments
      .filter((assign) => {
        const filterMatch = assign.name.toLowerCase().includes(search.toLowerCase());
        let catMatch = true;
        if (display) catMatch = assign.category === display;
        return filterMatch && catMatch;
      })
      .sort(({ [sort]: a }, { [sort]: b }) => {
        let val = 0;
        if (a < b) val = -1;
        if (a > b) val = 1;
        return val * order;
      });
  }

  handleFilterChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  toggleSortOrder() {
    this.setState(({ order }) => ({ order: -order }));
  }

  makeShortcuts() {
    const {
      resetAllFakes, history, match,
    } = this.props;
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
      match,
      categories,
      hasFake,
      options: { allowTestingScores },
      setFakeScore,
      resetFakeScore,
      resetAllFakes,
    } = this.props;
    const displayAssignments = this.getAssignments();
    return (
      <div className="uk-margin-bottom">
        <KeyShortcuts name="grade-forecaster" shortcuts={this.makeShortcuts()} />

        <div className="uk-container uk-container-small uk-margin-bottom">
          <Route exact path={match.path} render={this.chartOverall} />
          <Route exact path={`${match.path}/assignments`} render={this.chartAssignments} />
          <Route exact path={`${match.path}/categories`} render={this.chartCategories} />
        </div>
        <div className="uk-container">
          <ul className="uk-tab-bottom uk-flex-center" data-uk-tab="toggle: none">
            <NavLink options={{ to: match.url }}>Overall</NavLink>
            <NavLink options={{ to: `${match.url}/assignments` }}>Assignments</NavLink>
            <NavLink options={{ to: `${match.url}/categories` }}>Categories</NavLink>
          </ul>

          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            {hasFake && (
              <div>
                <button type="button" className="uk-button uk-button-link" onClick={resetAllFakes}>Reset All</button>
              </div>
            )}
            <div className="uk-width-expand">
              <p>
                <span className="uk-text-success uk-margin-small-right" data-uk-icon="icon: star; ratio: 0.75" />
                <small className="uk-text-middle">
                  <strong className="uk-margin-small-right">Pro Tip</strong>
                  <span>Click the icons next to each assignment for details or to test a score.</span>
                </small>
              </p>
            </div>
            <div>
              <ResponsiveFilters id="assignments" breakpoint="l">
                <AssignmentFilters categories={categories} {...this.state} toggleSortOrder={this.toggleSortOrder} handleFilterChange={this.handleFilterChange} />
              </ResponsiveFilters>
            </div>
          </div>

          {displayAssignments.length > 0 ? (
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
                  {displayAssignments.map(assign => (
                    <tr key={assign.id}>
                      <td id={`details-${assign.id}-boundary`}>
                        <span>{assign.name}</span>
                        <a className="uk-margin-small-left">
                          {assign.unpublished && <span className="uk-text-primary uk-margin-xsmall-right" data-uk-icon="icon: lock; ratio: 0.9" />}
                          {assign.override != null && <span className="uk-text-danger uk-margin-xsmall-right" data-uk-icon="icon: lifesaver; ratio: 0.9" />}
                          {assign.fakeScore != null && <span className="uk-text-link uk-margin-xsmall-right" data-uk-icon="icon: pencil; ratio: 0.9" />}
                          <span className="uk-text-emphasis" data-uk-icon={`icon: ${assign.description ? 'info' : 'chevron-down'}; ratio: 0.9`} />
                        </a>
                        <AssignmentDropdown {...assign} setFakeScore={setFakeScore} resetFakeScore={resetFakeScore} allowTesting={allowTestingScores} />
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
          ) : (
            <div className="uk-text-danger uk-text-center uk-margin-top">
              <span>No data for this course. </span>
              <strong>Coming soon: </strong>
              <span>create your own test assignments.</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(GradeForecast);
