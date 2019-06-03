import React from 'react';
import CourseBox from './CourseBox';
import CourseFilters from './CourseFilters';
import { drop } from 'uikit';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expired: false,
      search: '',
      sort: 1
    };
    this.toggleSort = this.toggleSort.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  toggleSort() {
    this.setState(({ sort }) => ({ sort:  -sort }));
  }

  handleFilterChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getCourses() {
    const filterDrop = drop(`#${this.props.id}-filter-drop`);
    if (filterDrop) filterDrop.hide();
    const { expired, search, sort } = this.state;
    return this.props.courses.filter(course => 
      course.name.toLowerCase().includes(search.toLowerCase())
      && (expired || !course.expired)
    ).sort((a, b) => a.localeCompare(b) * sort);
  }

  render() {
    const { children, title, id } = this.props;
    
    const filteredCourses = this.getCourses();
    const filters = (
      <CourseFilters {...this.state} toggleSort={this.toggleSort} handleFilterChange={this.handleFilterChange} />
    );

    return (
      <div className='uk-section uk-section-xsmall'>
        <div className='uk-grid-small uk-flex-middle' data-uk-grid>
          <div>
            <h4>{title}</h4>
          </div>
          <div>
            {children}
          </div>
          <div className='uk-hidden@m'>
            <div className='uk-inline'>
              <button className='uk-icon-button' data-uk-icon='cog'></button>
              <div id={`${id}-filter-drop`} data-uk-drop='mode: click; pos: bottom-right'>
                <div className='uk-card uk-card-body uk-card-default uk-card-small'>
                  <h6 className='uk-margin-small-bottom uk-text-center uk-text-uppercase'>Filter courses</h6>
                  {filters}
                </div>
              </div>
            </div>
          </div>
          <div className='uk-width-expand@m uk-visible@m'></div>
          <div className='uk-visible@m'>
            {filters}
          </div>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className='uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l' data-uk-grid data-uk-scrollspy='target: > div; cls: uk-animation-slide-top-small; delay: 100'>
            {filteredCourses.map(course => (
              <div key={course.id}>
                <CourseBox {...course} />
              </div>
            ))}
          </div>
        ) : (
            <div className='uk-text-danger uk-text-center uk-margin-top'>No courses here. Add one using the button above.</div>
        )}
      </div>
    );
  }
}

export default CourseList;
