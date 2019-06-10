import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
// TODO: fix typist css not working
import 'react-typist/dist/Typist.css';
import BasicNavbar from './BasicNavbar';
import blackboard from '../assets/blackboard.jpg';

const Banner = () => (
  <div className="uk-section-default uk-section-large uk-light uk-background-cover" data-uk-parallax="bgy: -200" style={{ backgroundImage: `url(${blackboard})` }}>
    <div className="uk-position-top">
      <BasicNavbar showLeft showRight />
    </div>
    <div className="uk-section">
      <div className="uk-container uk-text-center uk-margin-top">
        <h2 className="uk-margin-remove-bottom">
          <Typist avgTypingDelay={45} cursor={{ hideWhenDone: true, hideWhenDoneDelay: -1000 }}>
            Revolutionize your course.
          </Typist>
        </h2>
        <span className="uk-text-lead">
          <Typist avgTypingDelay={45} startDelay={1500}>
            Tools to make activities and office hours easier.
          </Typist>
        </span>
        <p className="uk-margin-top uk-animation-slide-bottom-small">
          <Link to="/signup?type=student" className="uk-button uk-button-default uk-button-small">I&apos;m a student</Link>
          <Link to="/signup?type=instructor" className="uk-button uk-button-default uk-button-small uk-margin-small-left">I&apos;m an instructor</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Banner;
