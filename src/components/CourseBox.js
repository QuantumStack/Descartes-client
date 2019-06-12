import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

class CourseBox extends React.PureComponent {
  static propTypes = {
    role: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numInstructors: PropTypes.number.isRequired,
    head: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    numStudents: PropTypes.number.isRequired,
    grade: PropTypes.number,
    numActivities: PropTypes.number.isRequired,
    numPolls: PropTypes.number.isRequired,
    oh: PropTypes.bool,
    expired: PropTypes.bool,
  }

  static defaultProps = {
    head: undefined,
    role: 'student',
    grade: undefined,
    oh: false,
    expired: false,
  }

  render() {
    const {
      role,
      id,
      name,
      numInstructors,
      numStudents,
      head,
      grade,
      numActivities,
      numPolls,
      oh,
      expired,
    } = this.props;
    return (
      <div className={`uk-card uk-card-${expired ? 'secondary' : 'default'} uk-card-small uk-card-hover uk-card-body`}>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <h5 className="uk-margin-remove-bottom"><strong>{name}</strong></h5>
          </div>
          {(grade || role !== 'student') && (
            <div>
              <span className="uk-badge uk-align-right uk-text-center uk-margin-remove">{numStudents || `${grade}%`}</span>
            </div>
          )}
        </div>
        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
          {head ? head.name : (role.charAt(0).toUpperCase() + role.slice(1))}
        </p>
        <p className="uk-margin-small">
          {role !== 'student' && (
            <span>
              <strong>{numInstructors - 1}</strong>
              <span> other </span>
              {pluralize('instructor', numInstructors - 1)}
              <br />
            </span>
          )}
          <strong>{numActivities}</strong>
          &nbsp;
          {pluralize('activity', numActivities)}
          <span>, </span>
          <strong>{numPolls}</strong>
          &nbsp;
          {pluralize('poll', numPolls)}
        </p>
        <Link to={`/dashboard/${role === 'student' ? role : 'instructor'}/${id}`} className="uk-button uk-button-primary uk-button-small">
          <span>Details</span>
          <span data-uk-icon="icon: arrow-right" />
        </Link>
        {oh && (
          <Link to={`/queue/${id}`} className="uk-button uk-button-text uk-margin-left">
            <span>Queue</span>
            <span className="uk-margin-small-left" data-uk-icon="icon: comments; ratio: 0.7" />
          </Link>
        )}
      </div>
    );
  }
}

export default CourseBox;
