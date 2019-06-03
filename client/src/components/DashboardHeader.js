import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class DashboardHeader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    smallMargin: PropTypes.bool,
  }

  static defaultProps = {
    smallMargin: false,
  }

  render() {
    const { children, smallMargin } = this.props;
    return (
      <div className={`uk-grid-small uk-flex-middle uk-margin${smallMargin ? '-small' : ''}-bottom`} data-uk-grid>
        <div>
          <Link to="/dashboard" className="uk-icon-link uk-animation-slide-right-small" data-uk-icon="arrow-left" data-uk-tooltip="Back to dashboard" />
        </div>
        {children}
      </div>
    );
  }
}

export default DashboardHeader;
