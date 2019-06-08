import React from 'react';
import PropTypes from 'prop-types';
import BasicNavbar from './BasicNavbar';

class LoadingLarge extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    showNavbar: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    isLoading: true,
    showNavbar: true,
    children: <div />,
  }

  render() {
    const { isLoading, showNavbar, children } = this.props;
    return isLoading ? (
      <div className="uk-section-default">
        {showNavbar && (
          <div className="uk-position-top" data-uk-scrollspy="cls: uk-animation-fade; delay: 1000">
            <div className="uk-container">
              <BasicNavbar />
            </div>
          </div>
        )}
        <div className="uk-section uk-flex uk-flex-middle uk-flex-center" data-uk-height-viewport>
          <div className="uk-margin-bottom" data-uk-spinner="ratio: 1.5" />
        </div>
      </div>
    ) : children;
  }
}

export default LoadingLarge;
