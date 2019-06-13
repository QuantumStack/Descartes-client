import React from 'react';
import Modal from './Modal';
import LegalInfo from './LegalInfo';

function Foot() {
  return (
    <div>
      <Modal name="legal" isLarge>
        <LegalInfo />
      </Modal>
      <div className="uk-section uk-section-secondary uk-section-small">
        <div className="uk-container">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            <div>Copyright &copy; 2019</div>
            <div data-uk-scrollspy="target: span, a; cls: uk-animation-scale-down; delay: 100">
              <span>Built </span>
              <span>with </span>
              <span data-uk-icon="heart" />
              <span> by </span>
              <a href="https://quantumstack.xyz">QuantumStack</a>
            </div>
            <div className="uk-width-expand@s" />
            <div>
              <a className="uk-button uk-button-text">
                Credits
              </a>
            </div>
            <div>
              <button type="button" className="uk-button uk-button-text" data-uk-toggle="target: #legal-modal">
                Legal
              </button>
            </div>
            <div>
              <a className="uk-button uk-button-text" href="https://github.com/QuantumStack/Descartes">
                GitHub
              </a>
            </div>
            <div>
              <h4 className="uk-text-muted">Descartes</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foot;
