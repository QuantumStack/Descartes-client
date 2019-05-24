import React from 'react';
import CourseBox from './CourseBox';
import { drop } from 'uikit';

class ClassList extends React.Component {
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
    const filterDrop = drop(`#${this.props.key}-filter-drop`);
    if (filterDrop) filterDrop.hide();
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
    const { children, title, key } = this.props;
    const { expired, search, sort } = this.state;
    
    const filteredCourses = this.getCourses();
    const filters = (
      <div className='uk-grid-small uk-flex-middle' data-uk-grid>
        <div key='expired'>
          <label>
            <input className='uk-checkbox' name='expired' type='checkbox' checked={expired} onChange={this.handleFilterChange} />
            &nbsp;
            Show expired
          </label>
        </div>
        <div key='sort'>
          <a className='uk-icon-link' data-uk-icon={sort === 1 ? 'download' : 'upload'} data-uk-tooltip='Reverse sort' onClick={this.toggleSort}></a>
        </div>
        <div key='search'>
          <div className='uk-inline'>
            <span className='uk-form-icon' data-uk-icon='icon: search; ratio: 0.7' />
            <input className='uk-input uk-form-small' name='search' type='text' placeholder='Filter...' value={search} onChange={this.handleFilterChange} />
          </div>
        </div>
      </div>
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
              <div id={`${key}-filter-drop`} data-uk-drop='mode: click; pos: bottom-right'>
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
          <div className='uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l' data-uk-grid data-uk-scrollspy='target: div; cls: uk-animation-slide-top-small; delay: 50'>
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

export default ClassList;
