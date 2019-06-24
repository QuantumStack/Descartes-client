import React from 'react';
import PropTypes from 'prop-types';
import {
  withRouter, Link, Route, Redirect,
} from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import pluralize from 'pluralize';
import NavLink from './NavLink';
import DashboardHeader from './DashboardHeader';
import InstructorCourseSettings from './InstructorCourseSettings';

class InstructorCourse extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    match: RouterPropTypes.match.isRequired,
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    oh: PropTypes.bool.isRequired,
    numStudents: PropTypes.number.isRequired,
  }

  render() {
    const {
      navbar, match, id, name, oh, numStudents, role,
    } = this.props;
    return (
      <div>
        {navbar}
        <div className="uk-section uk-section-xsmall">
          <DashboardHeader smallMargin>
            <div className="uk-width-expand">
              <h4>{name}</h4>
            </div>
            <div>
              <strong>{numStudents}</strong>
              &nbsp;
              {pluralize('student', numStudents)}
            </div>
            {oh && (
              <div>
                <Link to={`/queue/${id}`}>
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="comments" />
                  <span>Queue</span>
                </Link>
              </div>
            )}
            <div>
              <div className="uk-background-secondary uk-light uk-padding-xsmall uk-panel">
                <p>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
              </div>
            </div>
          </DashboardHeader>
          <ul className="uk-flex-center" data-uk-tab="toggle: none">
            <NavLink options={{ to: `${match.url}/students` }}>Students</NavLink>
            <NavLink options={{ to: `${match.url}/assignments` }}>Assignments</NavLink>
            <NavLink options={{ to: `${match.url}/categories` }}>Categories</NavLink>
            <NavLink options={{ to: `${match.url}/settings` }}>Settings</NavLink>
          </ul>

          <Route exact path={match.path} render={() => <Redirect to={`${match.url}/students`} />} />
          <Route path={`${match.path}/settings`} render={() => <InstructorCourseSettings {...this.props} />} />
        </div>
      </div>
    );
  }
}

export default withRouter(InstructorCourse);
