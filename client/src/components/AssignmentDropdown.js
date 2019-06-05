import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { dropdown } from 'uikit';

class AssignmentDropdown extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    fakeScore: PropTypes.number,
    percent: PropTypes.number,
    exactDate: PropTypes.string.isRequired,
    relativeDate: PropTypes.string.isRequired,
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    description: null,
    fakeScore: null,
    percent: null,
  }

  constructor(props) {
    super(props);
    this.handleScoreTestChange = this.handleScoreTestChange.bind(this);
    this.handleScoreTestReset = this.handleScoreTestReset.bind(this);
  }

  handleScoreTestChange(event) {
    const { id, setFakeScore } = this.props;
    const { target: { value } } = event;
    setFakeScore(id, value);
  }

  handleScoreTestReset() {
    const { id, resetFakeScore } = this.props;
    resetFakeScore(id);
    dropdown(`#details-${id}-dropdown`).hide();
  }

  render() {
    const {
      id, description, override, fakeScore, percent, exactDate, relativeDate,
    } = this.props;
    return (
      <div id={`details-${id}-dropdown`} data-uk-dropdown={`mode: click; boundary: #details-${id}-boundary; boundary-align: true; pos: bottom-justify; animation: uk-animation-slide-top-small uk-animation-fast`}>
        {description && <Markdown source={description} />}
        {percent === 100 && (
          <p>
            <span className="uk-text-success uk-margin-small-right" data-uk-icon="happy" />
            <span>Congratulations, you received full points on this assignment. Keep it up!</span>
          </p>
        )}
        {override != null && (
          <p>
            <span className="uk-text-danger uk-margin-small-right" data-uk-icon="lifesaver" />
            <span>Your percent score for this assignment has been manually overriden by an instructor.</span>
          </p>
        )}
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <div className="uk-inline uk-width-expand">
              <input className="uk-input uk-form-small" placeholder="Test different score..." type="number" value={fakeScore || ''} onChange={this.handleScoreTestChange} />
            </div>
          </div>
          <div>
            <button type="button" className="uk-button uk-button-link uk-button-small" data-uk-tooltip="Undo testing score" onClick={this.handleScoreTestReset}>
              <span data-uk-icon="icon: history; ratio: 0.75" />
            </button>
          </div>
        </div>
        <small>
          <span>Assignment due: </span>
          <span data-uk-tooltip={`title: ${exactDate}`}>{relativeDate}</span>
          <span> | ID: </span>
          {id}
        </small>
      </div>
    );
  }
}

export default AssignmentDropdown;
