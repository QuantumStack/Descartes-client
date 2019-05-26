import React from 'react';
import MarkdownEditor from './MarkdownEditor';
import PricingPlan from './PricingPlan';
import { ax, authHeader, CREATE_URL } from '../util/api';
import { plans } from '../config';
import { injectStripe } from 'react-stripe-elements';
import { error } from '../util/alert';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: this.props.start || 0,
      name: '',
      description: '',
      plan: 'std',
    };
    this.prevPhase = this.prevPhase.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doCheckout = this.doCheckout.bind(this);
  }

  prevPhase()  {
    this.setState(({ phase }) => ({ phase: phase -= 1 }));
  }

  handleInputChange(event) {
    const target = event.target || { value: event, name: 'description' };
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { phase, name, description, plan } = this.state;
    
    if (phase < 1) this.setState(({ phase }) => ({ phase: phase += 1 }));

    if (phase > 0 && name) {
      this.setState({ isLoading: true });
      const price = plans.find(p => p.id === plan).price;
      ax.post(CREATE_URL, {
        data: {
          name,
          description,
          plan,
          price,
        }, headers: authHeader()
      })
      .then(({ data }) => {this.doCheckout(data.id)})
      .catch(err => 
        error(err.message || err.res.statusText).then(() =>
          this.setState({ isLoading: false })));
    }
  }

  doCheckout(id) {
    this.props.stripe.redirectToCheckout({ sessionId: prompt() }) // TODO: don't prompt for id
    .then(res => {
      if (res.error) error(res.error.message).then(() =>
        this.setState({ isLoading: false }));
    });
  }

  render() {
    const { phase, name, description, plan, isLoading } = this.state;

    const phases = [
      [
        <span>Select a plan to purchase</span>,
        <div>
          <p className='uk-margin-remove'>Get started with secure scoring for class activities/labs, interactive participation polls, office hours management, and grade insights for your students. Each course lasts for <strong>6 months</strong>.</p>
          <div className='uk-inline uk-margin-small-top uk-width-expand'>
            <span className='uk-form-icon' data-uk-icon='icon: bookmark'></span>
            <input className='uk-input' type='text' name='name' placeholder='Name' value={name} onChange={this.handleInputChange} required />
          </div>
          <div className='uk-margin-small'>
            <label className='uk-form-label' htmlFor='form-stacked-text'>Description</label>
            <div className='uk-form-controls uk-width-expand'>
              <MarkdownEditor textAreaProps={{ placeholder: 'Information about the course for students' }} value={description} onChange={this.handleInputChange} />
            </div>
          </div>
        </div>,
      ],
      [
        <span>Checkout with <a href='https://stripe.com' data-uk-tooltip='We use Stripe to securely and privately process payments'><strong>Stripe</strong></a></span>,
        <div data-uk-scrollspy='cls: uk-animation-slide-right-small'>
          <p className='uk-margin-remove-top'>Select a plan based on <strong>enrollment</strong> in your course. Be careful, you won't be able to change this in the future. Our prices include tax/VAT.</p>
          <div className='uk-grid-small uk-flex-center uk-margin-bottom' data-uk-grid>
            {plans.map((p, i) => (
              <div key={p.id}>
                <PricingPlan small pops={i === 0} {...p}>
                  <div>
                    <label>
                      <div className='uk-flex uk-flex-middle uk-flex-center'>
                        <div><input className='uk-radio' type='radio' name='plan' value={p.id} checked={plan === p.id} onChange={this.handleInputChange} /></div>
                        <div className='uk-button uk-button-text uk-margin-small-left'>Select this plan</div>
                      </div>
                    </label>
                  </div>
                </PricingPlan>
              </div>
            ))}
          </div>
        </div>,
      ],
    ];

    return (
      <div>
        <h4 className='uk-margin-small-bottom'>Create a course</h4>
        <form onSubmit={this.handleSubmit} data-uk-scrollspy='target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100'>
          {phases[phase][1]}
          <div className='uk-flex uk-flex-middle'>
            {phase !== 0 && (
              <div>
                <a className='uk-icon-link uk-margin-small-right uk-padding-remove' data-uk-icon='arrow-left' data-uk-tooltip='Back' onClick={this.prevPhase} />
              </div>
            )}
            <div>
              <button className='uk-button uk-button-primary uk-button-small' type='submit'>
                {isLoading ? (
                  <div key='loading' data-uk-spinner='ratio: 0.5'></div>
                ) : (
                  <div key='create-next'>
                    <span>Next</span>
                    <span data-uk-scrollspy='cls: uk-animation-slide-left-small; delay: 200' data-uk-icon='arrow-right' />
                  </div>
                )}
              </button>
            </div>
            <div>
              <span className='uk-text-meta uk-margin-small-left'>{phases[phase][0]}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default injectStripe(CreateForm);
