import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LegalInfo from '../components/LegalInfo';

function Legal() {
  return (
    <div>
      <Helmet>
        <title>Legal | Descartes</title>
      </Helmet>
      <Link to="/" className="uk-modal-close-full uk-close-large" data-uk-icon="home" data-uk-tooltip="title: Go to Descartes homepage; pos: left" />
      <LegalInfo />
    </div>
  );
}

export default Legal;
