import React from 'react';
import PropTypes from 'prop-types';
import AssignmentDropdown from './AssignmentDropdown';
import { gradeRound } from '../util/grades';

class StudentAssignmentRow extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    unpublished: PropTypes.bool,
    fakeScore: PropTypes.number,
    score: PropTypes.number,
    override: PropTypes.number,
    percent: PropTypes.number,
    outOf: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    getCategoryName: PropTypes.func.isRequired,
  }

  static defaultProps = {
    description: null,
    unpublished: false,
    fakeScore: null,
    score: null,
    override: null,
    percent: null,
  }

  render() {
    const {
      id,
      name,
      description,
      unpublished,
      override,
      fakeScore,
      score,
      outOf,
      percent,
      category,
      getCategoryName,
    } = this.props;
    return (
      <tr>
        <td id={`details-${id}-boundary`}>
          <span>{name}</span>
          <a className="uk-margin-small-left">
            {unpublished && <span className="uk-text-primary uk-margin-xsmall-right" data-uk-icon="icon: lock; ratio: 0.9" />}
            {override != null && <span className="uk-text-danger uk-margin-xsmall-right" data-uk-icon="icon: lifesaver; ratio: 0.9" />}
            {fakeScore != null && <span className="uk-text-link uk-margin-xsmall-right" data-uk-icon="icon: pencil; ratio: 0.9" />}
            <span className="uk-text-emphasis" data-uk-icon={`icon: ${description ? 'info' : 'chevron-down'}; ratio: 0.9`} />
          </a>
          <AssignmentDropdown {...this.props} />
        </td>
        <td>
          {fakeScore != null && <strong className="uk-text-link">{fakeScore}</strong>}
          {fakeScore == null && score != null && score}
          {fakeScore == null && score == null && '-'}
        </td>
        <td>{outOf}</td>
        <td>
          {fakeScore != null && (
            <strong className="uk-text-link">
              {gradeRound(percent)}
              <span>%</span>
            </strong>
          )}
          {fakeScore == null && percent != null && `${gradeRound(percent)}%`}
          {percent == null && '-'}
        </td>
        <td>{getCategoryName(category)}</td>
      </tr>
    );
  }
}

export default StudentAssignmentRow;
