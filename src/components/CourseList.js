import React from 'react';
import PropTypes from 'prop-types';
import { drop } from 'uikit';
import CourseBox from './CourseBox';
import CourseFilters from './CourseFilters';
import ResponsiveFilters from './ResponsiveFilters';

class CourseList extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    courses: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      expired: false,
      search: '',
      sort: 1,
    };
    this.toggleSort = this.toggleSort.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  getCourses() {
    const { id, courses } = this.props;
    setTimeout(() => {
      const filterDrop = drop(`#${id}-filter-drop`);
      if (filterDrop) filterDrop.hide();
    }, 500);
    const { expired, search, sort } = this.state;
    return courses
      .filter((course) => {
        const filterMatch = course.name.toLowerCase().includes(search.toLowerCase());
        const expiredMatch = expired || !course.expired;
        return filterMatch && expiredMatch;
      })
      .sort((a, b) => a.localeCompare(b) * sort);
  }

  handleFilterChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  toggleSort() {
    this.setState(({ sort }) => ({ sort: -sort }));
  }

  render() {
    const { children, title, id } = this.props;
    const filteredCourses = this.getCourses();

    return (
      <div className="uk-section uk-section-xsmall">
        <div className="uk-grid-small uk-flex-middle" data-uk-grid>
          <div>
            <h4>{title}</h4>
          </div>
          <div className="uk-width-expand">
            {children}
          </div>
          <ResponsiveFilters id={id} title="Filter Courses">
            <CourseFilters {...this.state} toggleSort={this.toggleSort} handleFilterChange={this.handleFilterChange} />
          </ResponsiveFilters>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" data-uk-grid data-uk-scrollspy="target: > div; cls: uk-animation-slide-top-small; delay: 100">
            {filteredCourses.map(course => (
              <div key={course.id}>
                <CourseBox {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="uk-text-danger uk-text-center uk-margin-top">No courses here. Add one using the button above.</div>
        )}
      </div>
    );
  }
}

export default CourseList;
