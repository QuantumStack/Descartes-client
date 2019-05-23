import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Typist from 'react-typist';
import BasicNavbar from '../components/BasicNavbar';
import PricingPlan from './../components/PricingPlan';
import Foot from '../components/Foot';
import 'react-typist/dist/Typist.css';
import blackboard from '../assets/blackboard.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Descartes: Revolutionize your course</title>
        </Helmet>
        <div className='uk-section-default uk-section-large uk-light uk-background-cover' style={{ backgroundImage: `url(${blackboard})` }}>
          <div className='uk-position-top'>
            <BasicNavbar showLinks />
          </div>
          <div className='uk-section'>
            <div className='uk-container uk-text-center uk-margin-top'>
              <Typist avgTypingDelay={45}>
                <h2 className='uk-margin-remove-bottom'>Revolutionize your course.</h2>
                <span className='uk-text-lead'>Tools to make activities and office hours easier.</span>
              </Typist>
              <p className='uk-margin-top uk-animation-slide-bottom-small'>
                <Link to='/signup?type=student' className='uk-button uk-button-default uk-button-small'>I'm a student</Link>
                <Link to='/signup?type=instructor' className='uk-button uk-button-default uk-button-small uk-margin-small-left'>I'm an instructor</Link>
              </p>
            </div>
          </div>
        </div>
        <div className='uk-section' id='about'>
          <div className='uk-container'>
            <div className='uk-child-width-1-4@m' data-uk-grid data-uk-scrollspy=
            'target: .uk-icon; cls: uk-animation-slide-top-small; delay: 100'>
              <div>
                  <span className='uk-icon' data-uk-icon='icon: bolt; ratio: 2' />
                  <h4 className='uk-margin-small'>Activities</h4>
                  <p className='uk-margin-remove-top'>Simple <strong>check-in</strong> for class activites such as labs. Flag repeated attempts and section mismatches.</p>
              </div>
              <div>
                  <span className='uk-icon' data-uk-icon='icon: users; ratio: 2' />
                  <h4 className='uk-margin-small'>Queue</h4>
                  <p className='uk-margin-remove-top'>Office hours can get congested. Descartes organizes student questions for <strong>collaborative</strong> learning.</p>
              </div>
              <div>
                  <span className='uk-icon' data-uk-icon='icon: comment; ratio: 2' />
                  <h4 className='uk-margin-small'>Polls</h4>
                  <p className='uk-margin-remove-top'><strong>Engage</strong> with students and take attendance with polls and quizzes, with location verification.</p>
              </div>
              <div>
                  <span className='uk-icon' data-uk-icon='icon: happy; ratio: 2' />
                  <h4 className='uk-margin-small'>Centralized</h4>
                  <p className='uk-margin-remove-top'>Descartes securely stores grades in <strong>one place</strong>, with tools for students to get back on track.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='uk-section uk-section-muted'>
          <div className='uk-container uk-container-small'>
            <div className='uk-grid-small uk-flex-middle' data-uk-grid data-uk-scrollspy=
            'target: div; cls: uk-animation-fade; delay: 100'>
              <div className='uk-width-expand@m uk-text-justify uk-margin-right'>
                <h3>Reasonable prices.<br />
                Two great options.</h3>
                <p>All of Descartes' tools are bundled into a single low price for your course. Smaller classes should select the Lite plan, while the Standard plan is great for courses with more than 50 students.</p>
                <p>Each plan lasts for 6 months or a semester, and students pay nothing. Most of our revenue is used for server costs, maintenance, and development efforts. We donate a percentage of any profits to charity.</p>
              </div>
              <div>
                <PricingPlan pops name='Standard' price='25' features={[
                  <span><strong>Unlimited</strong> students</span>,
                  <span>In-class activities and labs</span>,
                  <span><strong>Unlimited</strong> instructors/TAs</span>,
                  <span>Robust office hours queue</span>,
                  <span><strong>Unlimited</strong> participation polls</span>,
                  <span>Lasts for 6 months</span>
                ]} />
              </div>
              <div>
                <PricingPlan name='Lite' price='15' features={[
                  <span>Up to <strong>50</strong> students</span>,
                  <span>In-class activites and labs</span>,
                  <span>Up to <strong>10</strong> instructors/TAs</span>,
                  <span>Robust office hours queue</span>,
                  <span><strong>25</strong> participation polls</span>,
                  <span>Lasts for 6 months</span>
                ]} />
              </div>
            </div>
          </div>
        </div>
        <Foot />
      </div>
    );
  }
}

export default Home;
