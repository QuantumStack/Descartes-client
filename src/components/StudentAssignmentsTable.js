import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import StudentAssignmentRow from './StudentAssignmentRow';
import StudentCategoryTable from './StudentCategoryTable';

class StudentAssignmentsTable extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    allowTestingScores: PropTypes.bool.isRequired,
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
    removeFakeAssignment: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.getCategoryName = this.getCategoryName.bind(this);
  }

  getCategoryName(id) {
    const { categories } = this.props;
    return categories[id].name;
  }

  render() {
    const {
      id,
      assignments,
      categories,
      allowTestingScores,
      setFakeScore,
      resetFakeScore,
      removeFakeAssignment,
    } = this.props;
    return (
      <div>
        <Modal name={`categories-table-${id}`}>
          <h4 className="uk-text-center">Categories</h4>
          <StudentCategoryTable categories={categories} />
        </Modal>
        <div className="uk-overflow-auto uk-margin-small-top">
          <table className="uk-table uk-table-small uk-table-hover uk-table-divider">
            <thead>
              <tr>
                <th className="uk-table-expand">Name</th>
                <th>Score</th>
                <th>Max</th>
                <th>Percent</th>
                <th>
                  <a data-uk-tooltip="Click for details per category" data-uk-toggle={`target: #categories-table-${id}-modal`}>
                    Category
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(assign => (
                <StudentAssignmentRow
                  key={assign.id}
                  {...assign}
                  getCategoryName={this.getCategoryName}
                  allowTesting={allowTestingScores}
                  setFakeScore={setFakeScore}
                  resetFakeScore={resetFakeScore}
                  removeFakeAssignment={removeFakeAssignment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StudentAssignmentsTable;
