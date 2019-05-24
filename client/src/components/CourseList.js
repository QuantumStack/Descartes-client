import React from 'react';
import CourseBox from './CourseBox';

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expired: true,
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
    const { expired, search, sort } = this.state;
    return this.props.courses.filter(course => 
      course.name.toLowerCase().includes(search.toLowerCase())
      && (expired || !course.expired)
    ).sort((a, b) => {
      if (a.name > b.name) return sort;
      if (a.name < b.name) return -sort;
      return 0;
    });
  }

  render() {
    const { children, title, role } = this.props;
    const { expired, search, sort } = this.state;
    
    const filteredCourses = this.getCourses();

    return (
      <div className='uk-section uk-section-xsmall'>
        <div className='uk-grid-small uk-flex-middle' data-uk-grid>
          <div>
            <h4>{title}</h4>
          </div>
          <div>
            {children}
          </div>
          <div className='uk-width-expand@s'></div>
          <div>
            <label><input className='uk-checkbox' name='expired' type='checkbox' checked={expired} onChange={this.handleFilterChange} /> Show expired</label>
          </div>
          <div>
            <a className='uk-icon-link' data-uk-icon={sort === 1 ? 'download' : 'upload'} data-uk-tooltip='Reverse sort' onClick={this.toggleSort}></a>
          </div>
          <div>
            <div className='uk-inline'>
              <span className='uk-form-icon' data-uk-icon='icon: search; ratio: 0.7' />
              <input className='uk-input uk-form-small' name='search' type='text' placeholder='Filter...' value={search} onChange={this.handleFilterChange} />
            </div>
          </div>
        </div>
        {filteredCourses.length > 0 ? (
          <div className='uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l' data-uk-grid data-uk-scrollspy='target: div; cls: uk-animation-slide-top-small; delay: 50'>
            {filteredCourses.map(course => (
              <div key={course.id}>
                <CourseBox role={role} {...course} />
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

export default ClassList;
