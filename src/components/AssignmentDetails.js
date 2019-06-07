import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { Boxplot } from 'react-boxplot';
import { dropdown, modal } from 'uikit';
import GradeComparison from './GradeComparison';

class AssignmentDetails extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    unpublished: PropTypes.bool,
    fakeScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    override: PropTypes.number,
    percent: PropTypes.number,
    stats: PropTypes.shape({
      mean: PropTypes.number.isRequired,
      q1: PropTypes.number.isRequired,
      med: PropTypes.number.isRequired,
      q3: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
    exactDate: PropTypes.string.isRequired,
    relativeDate: PropTypes.string.isRequired,
    allowTesting: PropTypes.bool.isRequired,
    setFakeScore: PropTypes.func.isRequired,
    resetFakeScore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    unpublished: false,
    description: null,
    fakeScore: null,
    override: null,
    percent: null,
    stats: null,
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

    const assignDrop = dropdown(`#details-${id}-dropdown`);
    if (assignDrop) assignDrop.hide();
    setTimeout(() => {
      const assignModal = modal(`#details-${id}-modal`);
      if (assignModal) assignModal.hide();
    }, 500);
  }

  render() {
    const {
      id,
      unpublished,
      description,
      override,
      fakeScore,
      percent,
      stats,
      exactDate,
      relativeDate,
      allowTesting,
    } = this.props;
    return (
      <div>
        {description && <Markdown source={description} />}
        {unpublished && (
          <p>
            <span className="uk-text-primary uk-margin-small-right" data-uk-icon="lock" />
            <span>This assignment is unpublished, so students can&apos;t see it.</span>
          </p>
        )}
        {percent === 100 && (
          <p>
            <span className="uk-text-success uk-margin-small-right" data-uk-icon="happy" />
            <span>Congratulations, you received full points on this assignment. Keep it up!</span>
          </p>
        )}
        {override != null && (
          <p>
            <span className="uk-text-warning uk-margin-small-right" data-uk-icon="lifesaver" />
            <span>Your percent score for this assignment has been manually overriden by an instructor.</span>
          </p>
        )}
        {stats && (
          <div data-uk-grid>
            <div>
              <Boxplot
                width={25}
                height={225}
                orientation="vertical"
                min={Math.min(0, stats.min)}
                max={Math.max(100, stats.max)}
                stats={{
                  whiskerLow: stats.min,
                  whiskerHigh: stats.max,
                  quartile1: stats.q1,
                  quartile2: stats.med,
                  quartile3: stats.q3,
                  outliers: [],
                }}
              />
            </div>
            <div className="uk-width-expand">
              <h5 className="uk-margin-small-bottom">Performance stats</h5>
              <dl className="uk-margin-small-top">
                <dt>Average</dt>
                <dd>
                  {stats.mean}
                  <span>%</span>
                  {percent != null && <GradeComparison target={stats.mean} value={percent} />}
                </dd>
                <dt>Median</dt>
                <dd>
                  {stats.med}
                  <span>%</span>
                  {percent != null && <GradeComparison target={stats.med} value={percent} />}
                </dd>
                <dt>Minimum</dt>
                <dd>
                  {stats.min}
                  <span>%</span>
                </dd>
                <dt>Maximum</dt>
                <dd>
                  {stats.max}
                  <span>%</span>
                </dd>
              </dl>
            </div>
          </div>
        )}
        {allowTesting && (
          <div className="uk-grid-small uk-margin-small-bottom" data-uk-grid>
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
        )}
        <small>
          <span>Due: </span>
          <span data-uk-tooltip={`title: ${exactDate}`}>{relativeDate}</span>
          <span className="uk-margin-small-left uk-margin-small-right uk-text-muted">|</span>
          <span>ID: </span>
          {id}
        </small>
      </div>
    );
  }
}

export default AssignmentDetails;
