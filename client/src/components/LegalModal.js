import React, { Component } from 'react';

class LegalModal extends Component {
  render() {
    return (
      <div id='legal-modal' className='uk-modal-full' data-uk-modal>
        <div className='uk-modal-dialog'>
          <button className='uk-modal-close-full uk-close-large' type='button' data-uk-close></button>
          <div data-uk-height-viewport>
            <div className='uk-container uk-container-small uk-padding'>
              <article className='uk-article'>
                <h3>Terms of Use</h3>
                <p>...</p>
                <h3>Privacy Policy</h3>
                <p>...</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LegalModal;