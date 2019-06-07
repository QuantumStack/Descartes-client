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
  }

  static defaultProps = {
    description: null,
    unpublished: false,
  }

  render() {
    const {
      id, name, description, unpublished, override, fakeScore, score, percent, categories,
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
          {assign.fakeScore != null && <strong className="uk-text-link">{assign.fakeScore}</strong>}
          {assign.fakeScore == null && assign.score != null && assign.score}
          {assign.fakeScore == null && assign.score == null && '-'}
        </td>
        <td>{assign.outOf}</td>
        <td>
          {assign.fakeScore != null && (
            <strong className="uk-text-link">
              {gradeRound(assign.percent)}
              <span>%</span>
            </strong>
          )}
          {assign.fakeScore == null && assign.percent != null && `${gradeRound(assign.percent)}%`}
          {assign.percent == null && '-'}
        </td>
        <td>{categories[assign.category].name}</td>
      </tr>
    )
  }
}

export default StudentAssignmentRow;
