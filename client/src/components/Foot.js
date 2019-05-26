import React from 'react';
import Modal from '../components/Modal';
import LegalInfo from './../components/LegalInfo';

class Foot extends React.Component {
  render() {
    return (
      <div>
        <Modal name='legal' isLarge>
          <LegalInfo />
        </Modal>
        <div className='uk-section uk-section-secondary uk-section-small'>
          <div className='uk-container'>
            <div className='uk-grid-small uk-flex-middle' data-uk-grid>
              <div>
                Copyright &copy; 2019
              </div>
              <div data-uk-scrollspy='target: span, a; cls: uk-animation-scale-down; delay: 100'>
                Built with <span data-uk-icon='heart' /> in <span>Pittsburgh</span> by <a href="https://quantumstack.xyz">QuantumStack</a>
              </div>
              <div className='uk-width-expand uk-visible@s'>
              </div>
              <div>
                <a className='uk-button uk-button-text'>
                  <span data-uk-icon='question' />
                  &nbsp;
                  Support
                </a>
              </div>
              <div>
                <a className='uk-button uk-button-text' data-uk-toggle='target: #legal-modal'>
                  <span data-uk-icon='file-text' />
                  &nbsp;
                  Legal
                </a>
              </div>
              <div>
                <a className='uk-button uk-button-text' href='https://github.com/QuantumStack/Descartes'>
                  <span data-uk-icon='github' />
                  &nbsp;
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Foot;
