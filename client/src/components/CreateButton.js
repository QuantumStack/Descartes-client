import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CreateButton extends React.PureComponent {
  static propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    size: 'small',
    className: '',
  }

  render() {
    const { size, className } = this.props;
    return (
      <Link to="/create" className={`uk-button uk-button-secondary uk-button-${size} ${className}`}>
        <span data-uk-icon="icon: file-edit; ratio: 0.7" className="uk-margin-small-right" data-uk-scrollspy="cls: uk-animation-scale-up; delay: 100" />
        <span>Create</span>
      </Link>
    );
  }
}

export default CreateButton;
