import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import DashboardHeader from './DashboardHeader';
import Modal from './Modal';
import GradeForecast from './GradeForecast';
import pluralize from 'pluralize';
import converter from '../util/markdown';

class StudentCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: null,
    };
    this.setGrade = this.setGrade.bind(this);
  }

  setGrade(grade) {
    this.setState({ grade });
  }

  render() {
    const { user, name, description, head, contact, instructors, oh, activities, polls, assignments, categories } = this.props;
    const { grade } = this.state;
    const id = this.props.match.params.id;

    return (
      <div>
        <UserNavbar name={user.name} />
        <div className='uk-section uk-section-xsmall'>
          <div className='uk-container uk-container-small'>
            <DashboardHeader small>
              <div className='uk-width-expand'>
                <h4>{name}</h4>
              </div>
              <div className='uk-visible@s'>
                {head}
              </div>
              <div data-uk-scrollspy='target: .uk-icon-button; cls: uk-animation-scale-up; delay: 100'>
                <a className='uk-icon-button' data-uk-icon='users' data-uk-tooltip='All instructors' />
                <div data-uk-drop='mode: click; pos: bottom-center'>
                  <div className='uk-card uk-card-body uk-card-default uk-card-small'>
                    <h5 className='uk-margin-small-bottom'>Instructors</h5>
                    <ul className='uk-list'>
                      {instructors.map(({ name, role }, i) => (
                        <li key={i}>
                          {name}
                          {role === 'admin' && <small className='uk-text-muted uk-margin-small-left'>Admin</small>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a className='uk-icon-button uk-margin-small-left' data-uk-icon='print' data-uk-tooltip='Print grade report' />
                <a href={`mailto:${contact}`} className='uk-icon-button uk-margin-small-left' data-uk-icon='mail' data-uk-tooltip='Course contact' />
              </div>
            </DashboardHeader>
            <div className='uk-grid-small uk-margin-remove-top uk-margin-bottom' data-uk-grid data-uk-scrollspy='target: .uk-icon; cls: uk-animation-scale-up; delay: 100'>
              {description && (
                <div>
                  <a data-uk-toggle={`target: #student-${id}-description-modal`}>
                    <span className='uk-icon uk-margin-small-right' data-uk-icon='file-text' />
                    <span>Course description</span>
                  </a>
                  <Modal name={`student-${id}-description`}>
                    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }} />
                  </Modal>
                </div>
              )}
              {oh && (
                <div>
                  <Link to={`/queue/${id}`}>
                    <span className='uk-icon uk-margin-small-right' data-uk-icon='comments' />
                    <span>Queue</span>
                  </Link>
                </div>
              )}
              <div className='uk-width-expand uk-visible@s'></div>
              <div>
                <strong>{activities}</strong> {pluralize('activity', activities)}, <strong>{polls}</strong> {pluralize('poll', polls)}
              </div>
              <div>
                <a className='uk-text-primary'>
                  Current grade:
                  &nbsp;
                  {grade && <strong data-uk-scrollspy='cls: uk-animation-fade; delay: 500'>{grade}%</strong>}
                </a>
                <div data-uk-drop='mode: click; pos: bottom-center'>
                  <div className='uk-card uk-card-body uk-card-default uk-card-small uk-text-justify'>
                    <h5 className='uk-margin-small-bottom'>
                      <span className='uk-margin-small-right' data-uk-icon='info' /> Disclaimer
                    </h5>
                    <p className='uk-margin-small'>This is only your <i>projected</i> course grade, based on scores that may be incomplete or subject-to-change.</p>
                    <p className='uk-margin-small-top'><a href={`mailto:${contact}`}>Ask your instructor</a> for more specific and definitive information.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <GradeForecast id={`course-${id}`} assignments={assignments} categories={categories} setGrade={this.setGrade} />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(StudentCourse);
