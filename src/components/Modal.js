import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isLarge: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isLarge: false,
  }

  render() {
    const { children, name, isLarge } = this.props;
    return (
      <div>
        <div id={`${name}-modal`} className={isLarge ? 'uk-modal-full' : ''} data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            <button className={`uk-modal-close-default ${isLarge ? 'uk-close-large' : ''}`} type="button" data-uk-close />
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
