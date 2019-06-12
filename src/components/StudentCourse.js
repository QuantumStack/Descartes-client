import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import pluralize from 'pluralize';
import DashboardHeader from './DashboardHeader';
import Modal from './Modal';
import GradeForecast from './GradeForecast';
import { gradeRound } from '../util/grades';

class StudentCourse extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    head: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    contact: PropTypes.string.isRequired,
    instructors: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })).isRequired,
    grade: PropTypes.number.isRequired,
    hasFake: PropTypes.bool.isRequired,
    // TODO: are these props subject to change?
    oh: PropTypes.bool.isRequired,
    numActivities: PropTypes.number.isRequired,
    numPolls: PropTypes.number.isRequired,
  }

  static defaultProps = {
    description: null,
  }

  render() {
    const {
      navbar,
      id,
      name,
      description,
      head,
      contact,
      instructors,
      oh,
      numActivities,
      numPolls,
      grade,
      hasFake,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{name} | Descartes</title>
        </Helmet>
        {navbar}
        {description && (
          <Modal name={`student-${id}-description`}>
            <Markdown source={description} />
          </Modal>
        )}
        <div className="uk-section uk-section-xsmall">
          <div className="uk-container uk-container-small">
            <DashboardHeader small>
              <div className="uk-width-expand">
                <h4>{name}</h4>
              </div>
              <div className="uk-visible@s">
                {head.name}
              </div>
              <div data-uk-scrollspy="target: .uk-icon-button; cls: uk-animation-scale-up; delay: 100">
                <a className="uk-icon-button" data-uk-icon="users" data-uk-tooltip="All instructors" />
                <div data-uk-drop="mode: click; pos: bottom-center; animation: uk-animation-slide-top-small uk-animation-fast">
                  <div className="uk-card uk-card-body uk-card-default uk-card-small">
                    <h5 className="uk-margin-small-bottom">Instructors</h5>
                    <ul className="uk-list">
                      {instructors.map(instructor => (
                        <li key={instructor.email}>
                          <div className="uk-grid-small" data-uk-grid>
                            <div className="uk-width-expand">
                              {instructor.name}
                            </div>
                            <div>
                              {instructor.role === 'admin' && <small className="uk-text-muted uk-margin-small-left">Admin</small>}
                            </div>
                            {instructor.showEmail && (
                              <div>
                                <a className="uk-text-link uk-icon-link" data-uk-icon="mail" />
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a className="uk-icon-button uk-margin-small-left" data-uk-icon="print" data-uk-tooltip="Print grade report" onClick={() => window.print()} />
                <a href={`mailto:${contact}`} className="uk-icon-button uk-margin-small-left" data-uk-icon="mail" data-uk-tooltip="Course contact" />
              </div>
            </DashboardHeader>
            <div className="uk-grid-small uk-margin-remove-top uk-margin-bottom" data-uk-grid data-uk-scrollspy="target: .uk-icon; cls: uk-animation-scale-up; delay: 100">
              {description && (
                <a data-uk-toggle={`target: #student-${id}-description-modal`}>
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="file-text" />
                  <span>Course description</span>
                </a>
              )}
              {oh && (
                <div>
                  <Link to={`/queue/${id}`}>
                    <span className="uk-icon uk-margin-small-right" data-uk-icon="comments" />
                    <span>Queue</span>
                  </Link>
                </div>
              )}
              <div className="uk-width-expand uk-visible@s" />
              <div>
                <strong>{numActivities}</strong>
                &nbsp;
                {pluralize('activity', numActivities)}
                <span>, </span>
                <strong>{numPolls}</strong>
                &nbsp;
                {pluralize('poll', numPolls)}
              </div>
              <div>
                <a className="uk-text-primary">
                  Current grade:
                  &nbsp;
                  {grade && (
                    <strong data-uk-scrollspy="cls: uk-animation-fade; delay: 500">
                      {hasFake && <span className="uk-text-link">*</span>}
                      {gradeRound(grade)}
                      <span>%</span>
                    </strong>
                  )}
                </a>
                <div data-uk-drop="mode: click; pos: bottom-center; animation: uk-animation-slide-top-small uk-animation-fast">
                  <div className="uk-card uk-card-body uk-card-default uk-card-small uk-text-justify">
                    <h5 className="uk-margin-small-bottom">
                      <span className="uk-margin-small-right" data-uk-icon="info" />
                      <span>Disclaimer</span>
                    </h5>
                    <p className="uk-margin-small">
                      {hasFake ? (
                        <span>
                          <span>You are only </span>
                          <strong>testing</strong>
                          <span> this score. It has no bearing on your real course grade.</span>
                        </span>
                      ) : (
                        <span>
                          <span>This is only your </span>
                          <strong>projected</strong>
                          <span> course grade, based on scores that may be incomplete or subject-to-change.</span>
                        </span>
                      )}
                    </p>
                    <p className="uk-margin-small-top">
                      <a href={`mailto:${contact}`}>Ask the instructor</a>
                      <span> for more specific and definitive information.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GradeForecast id={`course-${id}`} {...this.props} />
        </div>
        <br />
      </div>
    );
  }
}

export default StudentCourse;
