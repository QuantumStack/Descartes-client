import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

class CourseBox extends React.PureComponent {
  static propTypes = {
    role: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructors: PropTypes.number.isRequired,
    head: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['admin', 'instructor']).isRequired,
    }).isRequired,
    students: PropTypes.number.isRequired,
    grade: PropTypes.number,
    activities: PropTypes.number.isRequired,
    polls: PropTypes.number.isRequired,
    oh: PropTypes.bool,
    expired: PropTypes.bool,
  }

  static defaultProps = {
    role: 'student',
    grade: null,
    oh: false,
    expired: false,
  }

  render() {
    const {
      role, id, name, instructors, students, head, grade, activities, polls, oh, expired,
    } = this.props;
    return (
      <div className={`uk-card uk-card-${expired ? 'secondary' : 'default'} uk-card-small uk-card-hover uk-card-body`}>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <h5 className="uk-margin-remove-bottom"><strong>{name}</strong></h5>
          </div>
          {(grade || role !== 'student') && (
            <div>
              <span className="uk-badge uk-align-right uk-text-center uk-margin-remove">{students || `${grade}%`}</span>
            </div>
          )}
        </div>
        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
          {head ? head.name : (role.charAt(0).toUpperCase() + role.slice(1))}
        </p>
        <p className="uk-margin-small">
          {role !== 'student' && (
            <span>
              <strong>{instructors - 1}</strong>
              <span> other </span>
              {pluralize('instructor', instructors - 1)}
              <br />
            </span>
          )}
          <strong>{activities}</strong>
          &nbsp;
          {pluralize('activity', activities)}
          <span>, </span>
          <strong>{polls}</strong>
          &nbsp;
          {pluralize('poll', polls)}
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
