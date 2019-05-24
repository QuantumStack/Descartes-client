import React from 'react';
import MarkdownEditor from './MarkdownEditor';
import PricingPlan from './PricingPlan';
import { ax, authHeader, CREATE_URL } from '../util/api';
import { plans } from '../config';
import { injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { error } from '../util/alert';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: this.props.start || 0,
      title: '',
      description: '',
      plan: 'std',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
      confirm: false,
      isLoading: false,
    };
    this.prevPhase = this.prevPhase.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.phase < 2) this.setState(({ phase }) => ({ phase: phase += 1 }));

    const { title, description, plan, name, address, city, state, zip, country, confirm } = this.state;
    const price = plans.find(p => p.id === plan).price;
    if (title && name && address && city && state && zip && confirm) {
      this.setState({ isLoading: true });
      this.props.stripe.createToken({
        name,
        address_line1: address,
        address_city: city,
        address_state: state,
        address_zip: zip,
        address_country: country,
      })
      .then(res => {
        if (res.error) error(res.error.message).then(() => this.setState({ isLoading: false }));
        else {
          ax.post(CREATE_URL, { data: {
            title,
            description,
            plan,
            stripe: {
              token_id: res.token.id,
              created_at: res.token.created,
              type: res.token.type,
            },
          }, headers: authHeader() })
          .then(({ data: id }) => this.props.history.push(`/instructor/${id}`))
          .catch(({ response: res = {} }) => {
            error(res.statusText).then(() => this.setState({ isLoading: false }));
          })
        }
      });
    }
  }

  render() {
    const { phase, title, description, plan, name, address, city, state, zip, country, confirm, isLoading } = this.state;

    const phases = [
      [
        <span>Select a plan to purchase</span>,
        <div>
          <p className='uk-margin-remove'>Get started with secure scoring for class activities/labs, interactive participation polls, office hours management, and grade insights for your students. Each course lasts for <strong>6 months</strong>.</p>
          <div className='uk-inline uk-margin-small-top uk-width-expand'>
            <span className='uk-form-icon' data-uk-icon='icon: bookmark'></span>
            <input className='uk-input' type='text' name='title' placeholder='Name' value={title} onChange={this.handleInputChange} required />
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
        <span>Enter your payment details</span>,
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
      [
        <label>
          <span className='uk-margin-small-right'>Confirm payment of <strong>${plans.find(p => p.id === plan).price}</strong></span>
          <input className='uk-checkbox' type='checkbox' name='confirm' checked={confirm} onChange={this.handleInputChange} required />
        </label>,
        <div data-uk-scrollspy='cls: uk-animation-slide-right-small'>
          <p className='uk-margin-remove-top uk-margin-small-bottom'>Enter your details below. We use <a href='https://stripe.com'>Stripe</a> to securely process payments. Rest assured, we will never view or store this confidential information.</p>
          <div className='uk-inline uk-margin-small-bottom uk-width-expand'>
            <span className='uk-form-icon' data-uk-icon='icon: happy'></span>
            <input className='uk-input' type='text' name='name' placeholder='Full Name' value={name} onChange={this.handleInputChange} required />
          </div>
          <div className='uk-inline uk-margin-small-bottom uk-width-expand'>
            <span className='uk-form-icon' data-uk-icon='icon: mail'></span>
            <input className='uk-input' type='text' name='address' placeholder='Address' value={address} onChange={this.handleInputChange} required />
          </div>
          <div className='uk-grid-small uk-child-width-expand@s uk-margin-small-bottom' data-uk-grid>
            <div>
              <div className='uk-inline uk-width-expand'>
                <span className='uk-form-icon' data-uk-icon='icon: location'></span>
                <input className='uk-input' type='text' name='city' placeholder='City' value={city} onChange={this.handleInputChange} required />
              </div>
            </div>
            <div>
              <div className='uk-inline uk-width-expand'>
                <span className='uk-form-icon' data-uk-icon='icon: world'></span>
                <input className='uk-input' type='text' name='state' placeholder='State/province' value={state} onChange={this.handleInputChange} required />
              </div>
            </div>
          </div>
          <div className='uk-grid-small uk-child-width-expand@s uk-margin-remove-top uk-margin-small-bottom' data-uk-grid>
            <div>
              <div className='uk-inline uk-width-expand'>
                <span className='uk-form-icon' data-uk-icon='icon: hashtag'></span>
                <input className='uk-input uk-form-width-large' type='text' name='zip' placeholder='ZIP code' value={zip} onChange={this.handleInputChange} required />
              </div>
            </div>
            <div>
              <select className='uk-select uk-width-expand' name='country' value={country} onChange={this.handleInputChange}>
                <option value='AU'>Australia</option>
                <option value='AT'>Austria</option>
                <option value='BE'>Belgium</option>
                <option value='BR'>Brazil</option>
                <option value='CA'>Canada</option>
                <option value='CN'>China</option>
                <option value='DK'>Denmark</option>
                <option value='FI'>Finland</option>
                <option value='FR'>France</option>
                <option value='DE'>Germany</option>
                <option value='HK'>Hong Kong</option>
                <option value='IE'>Ireland</option>
                <option value='IT'>Italy</option>
                <option value='JP'>Japan</option>
                <option value='LU'>Luxembourg</option>
                <option value='MX'>Mexico</option>
                <option value='NL'>Netherlands</option>
                <option value='NZ'>New Zealand</option>
                <option value='NO'>Norway</option>
                <option value='PT'>Portugal</option>
                <option value='SG'>Singapore</option>
                <option value='ES'>Spain</option>
                <option value='SE'>Sweden</option>
                <option value='CH'>Switzerland</option>
                <option value='GB'>United Kingdom</option>
                <option value='US'>United States</option>
              </select>
            </div>
          </div>
          <div className='uk-margin-small-bottom'>
            <CardElement />
          </div>
        </div>
      ],
    ];

    return (
      <div>
        <h4 className='uk-margin-small-bottom'>Create a course</h4>
        <form onSubmit={this.handleSubmit}>
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
                  <div data-uk-spinner='ratio: 0.5'></div>
                ) : (
                  <div>
                    <span>{phase === phases.length - 1 ? 'Finish' : 'Next'}</span>
                    <span data-uk-scrollspy='cls: uk-animation-slide-left-small; delay: 300' data-uk-icon={phase ===  phases.length - 1 ? 'check' : 'arrow-right'} />
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