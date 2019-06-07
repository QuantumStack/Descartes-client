import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';

function Purchased() {
  return (
    <div>
      <Helmet>
        <title>Success | Descartes</title>
      </Helmet>
      <CenterBox width="uk-width-2-3 uk-width-1-3@s uk-width-1-4@m uk-width-1-5@l uk-width-1-6@xl">
        <div className="uk-text-center" data-uk-scrollspy="target: h4, p, a; cls: uk-animation-scale-down; delay: 100">
          <h4 className="uk-margin-small uk-text-success">
            <span className="uk-icon" data-uk-icon="icon: check; ratio: 2" />
            <span className="uk-text-middle uk-margin-small-left">Success!</span>
          </h4>
          <p className="uk-margin-remove-top uk-text-meta">Your course has been created. It might take a few moments for our systems to process your purchase.</p>
          <Link to="/dashboard" className="uk-button uk-button-text">
            <span>Dashboard</span>
            <span data-uk-icon="icon: arrow-right" />
          </Link>
        </div>
      </CenterBox>
    </div>
  );
}

export default Purchased;
