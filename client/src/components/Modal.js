import React from 'react';

class Modal extends React.Component {
  render() {
    const { children, name, isLarge } = this.props;
    return (
      <div>
        <div id={`${name}-modal`} className={isLarge ? 'uk-modal-full' : ''} data-uk-modal>
          <div className='uk-modal-dialog uk-modal-body'>
            <button className={`uk-modal-close-default ${isLarge ? 'uk-close-large' : ''}`} type='button' data-uk-close></button>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
