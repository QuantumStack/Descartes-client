import React from 'react';
import PropTypes from 'prop-types';

class GradeComparison extends React.PureComponent {
  static propTypes = {
    target: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }

  render() {
    const { value, target } = this.props;
    let color = 'primary';
    let icon = 'arrow-left';
    let text = 'About the same';
    if (value - target > 1) {
      color = 'success';
      icon = 'arrow-up';
      text = 'You did better';
    } else if (value - target < -1) {
      color = 'danger';
      icon = 'arrow-down';
      text = 'You did worse';
    }

    return (
      <span className={`uk-margin-small-left uk-text-${color}`}>
        <span className="uk-margin-xsmall-right" data-uk-icon={icon} />
        {text}
      </span>
    );
  }
}

export default GradeComparison;
