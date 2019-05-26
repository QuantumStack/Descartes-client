import React from 'react';

class CourseFilters extends React.Component {
  render() {
    const { expired, sort, search, toggleSort, handleFilterChange } = this.props;
    return (
      <div className='uk-grid-small uk-flex-middle' data-uk-grid>
        <div key='expired'>
          <label>
            <input className='uk-checkbox' name='expired' type='checkbox' checked={expired} onChange={handleFilterChange} />
            &nbsp;
            Show expired
          </label>
        </div>
        <div key='sort'>
          <a className='uk-icon-link' data-uk-icon={sort === 1 ? 'download' : 'upload'} data-uk-tooltip='Reverse sort' onClick={toggleSort}></a>
        </div>
        <div key='search'>
          <div className='uk-inline'>
            <span className='uk-form-icon' data-uk-icon='icon: search; ratio: 0.7' />
            <input className='uk-input uk-form-small' name='search' type='text' placeholder='Filter...' value={search} onChange={handleFilterChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default CourseFilters;
