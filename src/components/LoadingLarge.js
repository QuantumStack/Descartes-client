import React from 'react';
import PropTypes from 'prop-types';
import BasicNavbar from './BasicNavbar';

class LoadingLarge extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    isLoading: true,
    children: <div />,
  }

  render() {
    const { isLoading, children } = this.props;
    return isLoading ? (
      <div className="uk-section uk-section-medium uk-text-center">
        <div className="uk-position-top" data-uk-scrollspy="cls: uk-animation-fade; delay: 1000">
          <BasicNavbar />
        </div>
        <div className="uk-margin-large-top uk-margin-bottom" data-uk-spinner="ratio: 1.5" />
      </div>
    ) : children;
  }
}

export default LoadingLarge;
