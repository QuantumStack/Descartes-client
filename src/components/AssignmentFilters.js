import React from 'react';
import PropTypes from 'prop-types';

class AssignmentFilters extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    sort: PropTypes.oneOf(['name', 'score', 'max', 'percent']).isRequired,
    order: PropTypes.oneOf([1, -1]).isRequired,
    search: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    toggleSortOrder: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      categories, sort, order, search, display, toggleSortOrder, handleFilterChange,
    } = this.props;
    return (
      <div className="uk-grid-small uk-flex-middle" data-uk-grid>
        <div>
          Sort by:
        </div>
        <div>
          <div uk-form-custom="target: > * > span:first-child">
            <select className="uk-form-small" name="sort" value={sort} onChange={handleFilterChange}>
              <option value="name">Name</option>
              <option value="outOf">Max</option>
              <option value="percent">Percent</option>
            </select>
            <a className="uk-text-emphasis">
              <span />
              <span data-uk-icon="icon: chevron-down" />
            </a>
          </div>
        </div>
        <div>
          <a className="uk-icon-link" data-uk-icon={order === 1 ? 'download' : 'upload'} data-uk-tooltip="Reverse sort" onClick={toggleSortOrder} />
        </div>
        <div>
          <div className="uk-grid-small" data-uk-grid>
            <div className="uk-width-expand">
              <div className="uk-inline">
                <span className="uk-form-icon" data-uk-icon="icon: search; ratio: 0.7" />
                <input className="uk-input uk-form-small" name="search" type="text" placeholder="Filter..." value={search} onChange={handleFilterChange} />
              </div>
            </div>
            <div>
              <div uk-form-custom="target: > * > span:first-child">
                <select className="uk-form-small" name="display" value={display} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {Object.values(categories).map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <button className="uk-button uk-button-default uk-button-small" type="button" tabIndex="-1">
                  <span />
                  <span data-uk-icon="icon: chevron-down" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentFilters;
