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
          <div className='uk-container uk-text-center'>
            <span><a data-uk-toggle='target: #legal-modal'>Legal</a> | <a href="https://github.com/QuantumStack/Descartes">GitHub</a> | Copyright &copy; 2019</span>
            <br />
            <span>Made with <span data-uk-icon='heart' /> by <a href="https://quantumstack.xyz">QuantumStack</a></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Foot;
