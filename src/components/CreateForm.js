import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import PricingPlan from './PricingPlan';
import { plans } from '../config';
import { combinationsReplacement } from 'simple-statistics';

class CreateForm extends React.PureComponent {
  static propTypes = {
    phase: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    coupon: PropTypes.string.isRequired,
    couponLoading: PropTypes.bool.isRequired,
    couponHydrated: PropTypes.bool.isRequired,
    couponVerified: PropTypes.bool.isRequired,
    couponPrice: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updatePhase: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    verifyCoupon: PropTypes.func.isRequired,
    doCreate: PropTypes.func.isRequired,
    stripe: PropTypes.shape({
      redirectToCheckout: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.prevPhase = this.prevPhase.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  prevPhase() {
    const { updatePhase } = this.props;
    updatePhase(-1);
  }

  handleDescriptionChange(value) {
    const { handleChange } = this.props;
    handleChange({ target: { name: 'description', value } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      phase, name, description, plan, updatePhase, doCreate, stripe,
    } = this.props;

    if (phase === 1) {
      if (name) doCreate(name, description, plan, stripe);
    } else updatePhase();
  }

  render() {
    const {
      phase,
      name,
      description,
      plan,
      coupon,
      couponLoading,
      couponHydrated,
      couponVerified,
      couponPrice,
      isLoading,
      handleChange,
      verifyCoupon,
    } = this.props;

    const phases = [
      [
        <span>Select a plan to purchase</span>,
        <div>
          <p className="uk-margin-remove">
            <span>Get started with secure scoring for class activities/labs, interactive participation polls, office hours management, and grade insights for your students. Each course lasts for </span>
            <strong>6 months</strong>
            <span>.</span>
          </p>
          <div className="uk-inline uk-margin-small-top uk-width-expand">
            <span className="uk-form-icon" data-uk-icon="icon: bookmark" />
            <input className="uk-input" type="text" name="name" placeholder="Name" value={name} onChange={handleChange} required />
          </div>
          <div className="uk-margin-small">
            <label className="uk-form-label" htmlFor="form-stacked-text">Description</label>
            <div className="uk-form-controls uk-width-expand">
              <SimpleMDE
                value={description}
                onChange={this.handleDescriptionChange}
                options={{ status: false, spellChecker: false }}
              />
            </div>
          </div>
        </div>,
      ],
      [
        <span>
          <span>Checkout with </span>
          <a href="https://stripe.com" data-uk-tooltip="We use Stripe to securely and privately process payments">
            <strong>Stripe</strong>
          </a>
        </span>,
        <div data-uk-scrollspy="cls: uk-animation-slide-right-small">
          <p className="uk-margin-remove-top">
            <span>Select a plan based on </span>
            <strong>enrollment</strong>
            <span> in your course. Be careful, you won&apos;t be able to change this in the future. Our prices include tax/VAT.</span>
          </p>
          <div className="uk-grid-small uk-flex-center uk-margin-bottom" data-uk-grid>
            {plans.map((p, i) => (
              <div key={p.id}>
                <PricingPlan small pops={i === 0} {...p}>
                  <div>
                    <label>
                      <div className="uk-flex uk-flex-middle uk-flex-center">
                        <div><input className="uk-radio" type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={handleChange} /></div>
                        <div className="uk-button uk-button-text uk-margin-small-left">Select this plan</div>
                      </div>
                    </label>
                  </div>
                </PricingPlan>
              </div>
            ))}
          </div>
          <div className="uk-grid-small uk-margin" data-uk-grid>
            <div className="uk-width-expand">
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-expand">
                  <span className="uk-form-icon" data-uk-icon="tag" />
                  <input className="uk-input uk-form-small" type="text" placeholder="Have a coupon code?" name="coupon" value={coupon} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div>
              <button className="uk-button uk-button-default uk-button-small" type="button" onClick={verifyCoupon}>Apply</button>
            </div>
            <div className="uk-width-1-3@s uk-width-2-5@l">
              {couponLoading ? (
                <div key="loading" data-uk-spinner="ratio: 0.5" />
              ) : (
                <div>
                  {couponHydrated && (couponVerified ? (
                    <span className="uk-text-success">
                      <span>Verified! New price: </span>
                      <strong>
                        <span>$</span>
                        {couponPrice}
                      </strong>
                    </span>
                  ) : (
                    <span className="uk-text-danger">Unable to verify coupon.</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
      ],
    ];

    return (
      <div>
        <h4 className="uk-margin-small-bottom">Create a course</h4>
        <form onSubmit={this.handleSubmit} data-uk-scrollspy="target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100">
          {phases[phase][1]}
          <div className="uk-flex uk-flex-middle">
            {phase !== 0 && (
              <div>
                <a className="uk-icon-link uk-margin-small-right uk-padding-remove" data-uk-icon="arrow-left" data-uk-tooltip="Back" onClick={this.prevPhase} />
              </div>
            )}
            <div>
              <button className="uk-button uk-button-primary uk-button-small" type="submit">
                {isLoading ? (
                  <div key="loading" data-uk-spinner="ratio: 0.5" />
                ) : (
                  <div key="create-next">
                    <span>Next</span>
                    <span data-uk-scrollspy="cls: uk-animation-slide-left-small; delay: 200" data-uk-icon="arrow-right" />
                  </div>
                )}
              </button>
            </div>
            <div>
              <span className="uk-text-meta uk-margin-small-left">{phases[phase][0]}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default injectStripe(CreateForm);
