import React from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

class CourseBox extends React.Component {
  render() {
    const { role = 'student', id, name, instructors, students, head, grade, activities, polls, oh, expired } = this.props;
    return (
      <div className={`uk-card uk-card-${expired ? 'secondary' : 'default'} uk-card-small uk-card-hover uk-card-body`}>
        <div className='uk-grid-small' data-uk-grid>
          <div className='uk-width-expand'>
            <h5 className='uk-margin-remove-bottom'><strong>{name}</strong></h5>
          </div>
          {(grade || role !== 'student') && (
            <div>
              <span className='uk-badge uk-align-right uk-text-center uk-margin-remove'>{students || `${grade}%`}</span>
            </div>
          )}
        </div>
        <p className='uk-text-meta uk-margin-remove-top uk-margin-small-bottom'>
          {head || (role.charAt(0).toUpperCase() + role.slice(1))}
        </p>
        <p className='uk-margin-small'>
          {role !== 'student' && (
            <span>
              <strong>{instructors - 1}</strong> other {pluralize('instructor', instructors - 1)}
              <br />
            </span>
          )}
          <strong>{activities}</strong> {pluralize('activity', activities)}, <strong>{polls}</strong> {pluralize('poll', polls)}
        </p>
        <Link to={`/dashboard/${role === 'student' ? role : 'instructor'}/${id}`} className='uk-button uk-button-primary uk-button-small'>
          <span>Details</span>
          <span data-uk-icon='icon: arrow-right' />
        </Link>
        {oh && (
          <Link to={`/queue/${id}`} className='uk-button uk-button-text uk-margin-left'>
            <span>Queue</span>
            <span className='uk-margin-small-left' data-uk-icon='icon: comments; ratio: 0.7' />
          </Link>
        )}
      </div>
    );
  }
}

export default CourseBox;