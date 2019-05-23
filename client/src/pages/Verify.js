import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ax, VERIFY_URL } from '../util/api';
import CenterBox from '../components/CenterBox';
import { modal } from 'uikit';

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: false,
    };
    this.doVerify = this.doVerify.bind(this);
  }

  doVerify() {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    ax.post(VERIFY_URL, { id })
    .then(() => this.setState({ isSuccess: true }))
    .catch(({ response: res }) => {
      modal.alert(`Uh-oh, something went wrong: ${res.statusText}`).then(() => this.setState({ isLoading: false }));
    })
  }

  render() {
    const { isLoading, isSuccess } = this.state;
    return (
      <div>
        <Helmet>
          <title>Verify your account | Descartes</title>
        </Helmet>
        <CenterBox width='1-5'>
          {isSuccess ? (
            <div className='uk-text-center' data-uk-scrollspy='target: h4, p, a; cls: uk-animation-scale-down; delay: 100'>
              <h4 className='uk-margin-small uk-text-success'>
                <span className='uk-icon' data-uk-icon='icon: check; ratio: 2' />
                <span className='uk-text-middle uk-margin-small-left'>Verified!</span>
              </h4>
              <p className='uk-margin-remove-top uk-text-meta'>You may now close this tab</p>
            </div>
          ) : (
            <div className=''>
              <h4 className='uk-margin-remove-bottom uk-text-center'>Verify your account</h4>
              <p className='uk-text-meta uk-margin-small uk-text-justify'>Thanks for creating an account with us. To ensure the security and privacy of your data, we need to make sure it's you. Click the giant button below to confirm.</p>
              <button className='uk-button uk-button-primary uk-button-large uk-margin-small-top uk-width-expand uk-animation-slide-bottom-small' onClick={this.doVerify}>
                {isLoading ? (
                  <div data-uk-spinner='ratio: 0.5'></div>
                ) : (
                  <span>Click me!</span>
                )}
              </button>
            </div>
          )}
        </CenterBox>
      </div>
    );
  }
}

export default withRouter(Verify);
