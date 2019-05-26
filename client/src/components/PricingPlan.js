import React from 'react';

class PricingPlan extends React.Component {
  render() {
    const { children, pops, small, flat, name, price, features } = this.props;
    return (
      <div className={`uk-card uk-card-hover ${pops ? 'uk-card-primary' : ''} ${small ? 'uk-card-small': ''} uk-card-body uk-text-center uk-width-expand`}>
        <h4 className='uk-margin-small-bottom'>{name}</h4>
        <h2 className='uk-margin-remove-top'>${price}{!flat && <small className='uk-text-muted'>/course</small>}</h2>
        <hr className={small ? 'uk-margin-small' : ''} />
        <ul className={`uk-list ${small ? '' : 'uk-list-large'}`}>
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <hr className={small ? 'uk-margin-small' : ''} />
        {children}
      </div>
    );
  }
}

export default PricingPlan;
