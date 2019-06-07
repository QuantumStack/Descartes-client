import React from 'react';
import PropTypes from 'prop-types';

class FeatureItem extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { icon, title, children } = this.props;
    return (
      <div>
        <span className="uk-icon uk-text-link" data-uk-icon={`icon: ${icon}; ratio: 2`} />
        <h4 className="uk-margin-small">{title}</h4>
        <p className="uk-margin-remove-top">{children}</p>
      </div>
    );
  }
}

export default FeatureItem;
