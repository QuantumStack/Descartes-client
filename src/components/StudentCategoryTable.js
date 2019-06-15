import React from 'react';
import PropTypes from 'prop-types';
import StudentCategoryRow from './StudentCategoryRow';

class StudentCategoryTable extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  render() {
    const { categories } = this.props;
    const categoriesArr = Object.values(categories);
    return (
      <div className="uk-overflow-auto uk-margin-small-top">
        <table className="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th className="uk-table-expand">Name</th>
              <th>Score</th>
              <th>Max</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {categoriesArr.map(category => <StudentCategoryRow key={category.id} {...category} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentCategoryTable;
