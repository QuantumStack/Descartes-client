import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from './CreateButton';
import JoinButton from './JoinButton';

class Intro extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
  }

  render() {
    const { navbar } = this.props;
    return (
      <div className="uk-section-secondary uk-light">
        <div className="uk-position-top">
          <div className="uk-container">
            {navbar}
          </div>
        </div>
        <div className="uk-section uk-flex uk-flex-middle uk-text-center" data-uk-height-viewport="expand: true">
          <div className="uk-container" data-uk-scrollspy="target: h4, h2, p; cls: uk-animation-slide-bottom-small; delay: 100">
            <h2 className="uk-margin-small-bottom">Welcome to Descartes!</h2>
            <h4 className="uk-text-muted uk-margin-small-top">
              <span>Get started by creating a course as an </span>
              <br className="uk-visible@s" />
              <span>instructor or joining one as a student.</span>
            </h4>
            <p>
              <CreateButton size="medium" className="uk-margin-right" />
              <JoinButton size="medium" />
            </p>
            <p>
              <span>Need help? Visit our </span>
              <a>support page</a>
              <span>.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
