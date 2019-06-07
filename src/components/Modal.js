import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isLarge: PropTypes.bool,
    isCentered: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isLarge: false,
    isCentered: false,
  }

  render() {
    const {
      children, name, isLarge, isCentered,
    } = this.props;
    return (
      <div id={`${name}-modal`} className={`${isLarge ? 'uk-modal-full' : ''} + ${isCentered ? 'uk-flex-top' : ''}`} data-uk-modal>
        <div className={`uk-modal-dialog uk-modal-body ${isCentered ? 'uk-margin-auto-vertical' : ''}`}>
          <button className={`uk-modal-close-default ${isLarge ? 'uk-close-large' : ''}`} type="button" data-uk-close />
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
