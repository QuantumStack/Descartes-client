import React from 'react';
import PropTypes from 'prop-types';

class VerifyDialog extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    doVerify: PropTypes.func.isRequired,
  };

  render() {
    const { isSuccess, isLoading, doVerify } = this.props;
    return isSuccess ? (
      <div className="uk-text-center" data-uk-scrollspy="target: h4, p, a; cls: uk-animation-scale-down; delay: 100">
        <h4 className="uk-margin-small uk-text-success">
          <span className="uk-icon" data-uk-icon="icon: check; ratio: 2" />
          <span className="uk-text-middle uk-margin-small-left">Verified!</span>
        </h4>
        <p className="uk-margin-remove-top uk-text-meta">You may now close this tab</p>
      </div>
    ) : (
      <div>
        <h4 className="uk-margin-remove-bottom uk-text-center">Verify your account</h4>
        <p className="uk-text-meta uk-margin-small uk-text-justify">Thanks for creating an account with us. To ensure the security and privacy of your data, we need to make sure it&apos;s you. Click the giant button below to confirm.</p>
        <button type="button" className="uk-button uk-button-primary uk-button-large uk-margin-small-top uk-width-expand uk-animation-slide-bottom-small" onClick={doVerify}>
          {isLoading ? (
            <div data-uk-spinner="ratio: 0.5" />
          ) : (
            <span key="verify-click">Click me!</span>
          )}
        </button>
      </div>
    );
  }
}

export default VerifyDialog;
