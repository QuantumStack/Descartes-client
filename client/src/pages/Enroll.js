import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';
import { ax, authHeader, ENROLL_URL } from '../util/api';
import { error } from '../util/alert';

class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.match.params.code || '',
      isLoading: false,
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.doEnroll = this.doEnroll.bind(this);
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }

  doEnroll(event) {
    event.preventDefault();
    const { code } = this.state;
    this.setState({ isLoading: true });
    ax.post(ENROLL_URL, { data: { code }, headers: authHeader() })
    .then(({ data: id }) => this.props.history.push(`/student/${id}`))
    .catch(({ response: res = {} }) => {
      error(res.statusText).then(() => this.setState({ isLoading: false }));
    })
  }

  render() {
    const { code, isLoading } = this.state;
    return (
      <div>
        <Helmet>
          <title>Enroll in a course | Descartes</title>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width='uk-width-5-6 uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l uk-width-1-5@xl'>
          <form onSubmit={this.doEnroll} data-uk-scrollspy='target: div, button; cls: uk-animation-slide-bottom-small; delay: 100'>
            <h4 className='uk-margin-remove-bottom uk-text-center'>Enroll in a course</h4>
            <p className='uk-text-meta uk-margin-small uk-text-justify'>Join a course on Descartes with the unique code provided by your instructor.</p>
            <div className='uk-inline uk-margin-small-top'>
              <span className='uk-form-icon' data-uk-icon='icon: link' data-uk-scrollspy='cls: uk-animation-scale-up; delay: 100'></span>
              <input className='uk-input uk-form-width-large' type='text' name='code' placeholder='Paste course code' value={code} onChange={this.handleCodeChange} />
            </div>
            <button className='uk-button uk-button-primary uk-margin-small-top uk-width-expand' onClick={this.doVerify}>
              {isLoading ? (
                <div data-uk-spinner='ratio: 0.5'></div>
              ) : (
                <div>
                  <span>Join Course</span>
                  <span data-uk-scrollspy='cls: uk-animation-slide-left-small; delay: 300' data-uk-icon='icon: arrow-right'></span>
                </div>
              )}
            </button>
          </form>
        </CenterBox>
      </div>
    );
  }
}

export default withRouter(Enroll);
