import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PricingPlan from '../components/PricingPlan';
import { plans } from '../config';
import Banner from '../components/Banner';
import Features from '../components/Features';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Descartes: Revolutionize your course</title>
      </Helmet>
      <Banner />
      <Features />
      <div className="uk-section uk-section-muted">
        <div className="uk-container uk-container-small">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid data-uk-scrollspy="target: div; cls: uk-animation-fade; delay: 100">
            <div className="uk-width-expand@m uk-text-justify uk-margin-right">
              <h3>
                Reasonable prices.
                <br />
                Two great options.
              </h3>
              <p>All of Descartes&apos; tools are bundled into a single low price for your course. Smaller classes should select the Lite plan, while the Standard plan is great for courses with more than 50 students.</p>
              <p>Each plan lasts for 6 months or a semester, and students pay nothing. Most of our revenue is used for server costs, maintenance, and development efforts. We donate a percentage of any profits to charity.</p>
            </div>
            {plans.map((plan, i) => (
              <div key={plan.id}>
                <PricingPlan pops={i === 0} {...plan}>
                  <Link to="/signup?type=instructor" className="uk-button uk-button-text">
                    <span>Sign up now</span>
                    <span data-uk-icon="icon: arrow-right" />
                  </Link>
                </PricingPlan>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
