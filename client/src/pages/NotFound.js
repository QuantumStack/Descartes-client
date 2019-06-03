import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';

function NotFound() {
  return (
    <div>
      <Helmet>
        <title>Not found | Descartes</title>
      </Helmet>
      <CenterBox width="uk-width-2-3 uk-width-1-3@s uk-width-1-4@m uk-width-1-5@l uk-width-1-6@xl">
        <div className="uk-text-center">
          <h4 className="uk-margin-small uk-text-danger">
            <span className="uk-icon" data-uk-icon="icon: ban; ratio: 1.75" />
            <span className="uk-text-middle uk-margin-small-left">Not found</span>
          </h4>
          <p className="uk-margin-remove-top uk-margin-small-bottom uk-text-meta">This page doesn&apos;t exist.</p>
          <Link to="/" className="uk-button uk-button-text">
            <span>Homepage</span>
            <span data-uk-icon="icon: arrow-right" />
          </Link>
        </div>
      </CenterBox>
    </div>
  );
}

export default NotFound;
