import React, { Component } from 'react';

class PricingPlan extends Component {
  render() {
    const { pops, flat, name, price, features } = this.props;
    return (
      <div className={`uk-card uk-card-hover ${pops ? 'uk-card-primary' : ''} uk-card-body uk-text-center uk-width-expand`}>
        <h4 className='uk-margin-small-bottom'>{name}</h4>
        <h2 className='uk-margin-remove-top'>${price}{!flat && <small className='uk-text-muted'>/course</small>}</h2>
        <hr />
        <ul className='uk-list uk-list-large'>
          {features.map(f => <li>{f}</li>)}
        </ul>
        <hr />
        <a className='uk-button uk-button-text'>
          <span>Sign up now</span>
          <span data-uk-icon='icon: arrow-right' />
        </a>
      </div>
    );
  }
}

export default PricingPlan;
