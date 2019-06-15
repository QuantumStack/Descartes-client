import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';

class ScrollToTop extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: RouterPropTypes.location.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
