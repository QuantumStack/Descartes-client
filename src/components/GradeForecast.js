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
import ResponsiveFilters from './ResponsiveFilters';
import AssignmentFilters from './AssignmentFilters';
import StudentAssignmentsTable from './StudentAssignmentsTable';
import EmptyCourse from './EmptyCourse';
import FakeAssignmentForm from './FakeAssignmentForm';

class GradeForecast extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    scoredAssignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    hasFake: PropTypes.bool.isRequired,
    options: PropTypes.shape({
      allowTestingScores: PropTypes.bool,
      allowTestingAssignments: PropTypes.bool,
    }),
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
    createFakeAssignment: PropTypes.func.isRequired,
    removeFakeAssignment: PropTypes.func.isRequired,
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
      id,
      assignments,
      categories,
      hasFake,
      options: { allowTestingScores, allowTestingAssignments },
      setFakeScore,
      resetFakeScore,
      createFakeAssignment,
      removeFakeAssignment,
      resetAllFakes,
    } = this.props;
    const displayAssignments = this.getAssignments();
    return assignments.length > 0 || categories.length > 0 ? (
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

          <div className="uk-grid-small uk-flex-middle uk-hidden-print" data-uk-grid>
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
                  <span>
                    Click the icons next to each assignment for details or to test a score.
                  </span>
                </small>
              </p>
            </div>
            <div>
              <ResponsiveFilters id="assignments" breakpoint="l">
                <AssignmentFilters
                  categories={categories}
                  {...this.state}
                  toggleSortOrder={this.toggleSortOrder}
                  handleFilterChange={this.handleFilterChange}
                />
              </ResponsiveFilters>
            </div>
          </div>

          {displayAssignments.length > 0 ? (
            <StudentAssignmentsTable
              assignments={displayAssignments}
              categories={categories}
              allowTestingScores={allowTestingScores}
              setFakeScore={setFakeScore}
              resetFakeScore={resetFakeScore}
              removeFakeAssignment={removeFakeAssignment}
            />
          ) : (
            <div className="uk-text-danger uk-text-center uk-margin-top">
              <span>No data for this course. </span>
              <strong>Coming soon: </strong>
              <span>create your own test assignments.</span>
            </div>
          )}
          {allowTestingAssignments && (
            <div className="uk-margin-top">
              <a className="uk-text-link" data-uk-toggle={`target: #new-fake-assignment-${id}-form; animation: uk-animation-slide-top-small`}>
                <span className="uk-margin-small-right" data-uk-icon="plus-circle" />
                <span>Test a new assignment</span>
              </a>
              <FakeAssignmentForm id={id} categories={categories} create={createFakeAssignment} />
            </div>
          )}
        </div>
      </div>
    ) : (
      <EmptyCourse />
    );
  }
}

export default withRouter(GradeForecast);
