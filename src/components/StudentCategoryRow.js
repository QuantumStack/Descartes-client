import React from 'react';
import PropTypes from 'prop-types';

class StudentCategoryRow extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    activities: PropTypes.bool,
    polls: PropTypes.bool,
    weight: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    outOf: PropTypes.number.isRequired,
  }

  static defaultProps = {
    description: '',
    activities: false,
    polls: false,
  }

  render() {
    const {
      name, description, activities, polls, weight, score, outOf,
    } = this.props;
    return (
      <tr>
        <td>
          <span>{name}</span>
          {activities && <small> (activities on Descartes)</small>}
          {polls && <small> (polls on Descartes)</small>}
          <br />
          <span className="uk-text-muted">{description}</span>
        </td>
        <td>
          {score}
        </td>
        <td>
          {outOf}
        </td>
        <td>
          {weight}
          <span>%</span>
        </td>
      </tr>
    );
  }
}

export default StudentCategoryRow;
