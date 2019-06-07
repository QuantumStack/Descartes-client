import React from 'react';
import PropTypes from 'prop-types';
import StudentAssignmentRow from './StudentAssignmentRow';

class StudentAssignmentsTable extends React.PureComponent {
  static propTypes = {
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    allowTestingScores: PropTypes.bool.isRequired,
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
  }

  getCategoryName(id) {}

  render() {
    const {
      assignments, categories, allowTestingScores, setFakeScore, resetFakeScore,
    } = this.props;
    return (
      <div className="uk-overflow-auto uk-margin-small-top">
        <table className="uk-table uk-table-small uk-table-hover uk-table-divider">
          <thead>
            <tr>
              <th className="uk-table-expand">Name</th>
              <th>Score</th>
              <th>Max</th>
              <th>Percent</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assign => (
              <StudentAssignmentRow
                {...assign}
                categories={categories}
                allowTesting={allowTestingScores}
                setFakeScore={setFakeScore}
                resetFakeScore={resetFakeScore}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentAssignmentsTable;
