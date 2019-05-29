import React from 'react';
import PropTypes from 'prop-types';
import BasicNavbar from './BasicNavbar';
import desk from '../assets/desk.jpg';

class CenterBox extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    navOptions: PropTypes.shape({
      showLeft: PropTypes.bool,
      showRight: PropTypes.bool,
    }),
    width: PropTypes.string.isRequired,
  }

  static defaultProps = {
    navOptions: {},
  }

  render() {
    const { children, navOptions, width } = this.props;
    return (
      <div className="uk-section uk-section-muted uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover" style={{ backgroundImage: `url(${desk})` }}>
        <div className="uk-position-top">
          <BasicNavbar {...navOptions} />
        </div>
        <div className={`uk-card uk-card-default uk-card-body ${width}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default CenterBox;
