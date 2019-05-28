import React from 'react';
import BasicNavbar from './BasicNavbar';

class LoadingLarge extends React.Component {
  render() {
    return (
      <div className='uk-section uk-section-medium uk-text-center'>
        <div className='uk-position-top' data-uk-scrollspy='cls: uk-animation-fade; delay: 1000'>
          <BasicNavbar />
        </div>
        <div className='uk-margin-medium-top' data-uk-spinner />
      </div>
    );
  }
}

export default LoadingLarge;
