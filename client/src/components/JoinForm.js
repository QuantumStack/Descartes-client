import React from 'react';
import PropTypes from 'prop-types';
import DashboardHeader from './DashboardHeader';

class JoinForm extends React.PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    showInput: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    doJoin: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { code, doJoin } = this.props;
    if (code) doJoin(code);
  }

  render() {
    const {
      code, showInput, isLoading, handleChange,
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit} data-uk-scrollspy="target: .uk-inline, button; cls: uk-animation-slide-bottom-small; delay: 100">
        <DashboardHeader smallMargin>
          <h4>A fresh challenge</h4>
        </DashboardHeader>
        <p className="uk-text-meta uk-margin-small uk-text-justify">Enroll in a course as a student using the unique code provided by your instructor.</p>
        <div className="uk-inline uk-margin-small-top" hidden={!showInput}>
          <span className="uk-form-icon" data-uk-icon="icon: link" data-uk-scrollspy="cls: uk-animation-scale-up; delay: 100" />
          <input className="uk-input uk-form-width-large" type="text" name="code" placeholder="Paste course code" value={code} onChange={handleChange} required />
        </div>
        <button className="uk-button uk-button-primary uk-margin-small-top uk-width-expand" type="submit">
          {isLoading ? (
            <div key="loading" data-uk-spinner="ratio: 0.5" />
          ) : (
            <div key="join-course">
              <span>Join Course</span>
              <span data-uk-scrollspy="cls: uk-animation-slide-left-small; delay: 300" data-uk-icon="icon: arrow-right" />
            </div>
          )}
        </button>
      </form>
    );
  }
}

export default JoinForm;
