import React from 'react';
import BasicNavbar from '../components/BasicNavbar';
import desk from '../assets/desk.jpg';

class CenterBox extends React.Component {
  render() {
    const { children, width = '1-3' } = this.props;
    return (
      <div className='uk-section uk-section-muted uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover' style={{ backgroundImage: `url(${desk})` }}>
        <div className='uk-position-top'>
          <BasicNavbar />
        </div>
        <div className={`uk-card uk-card-default uk-card-body uk-width-${width}@s`}>
          {children}
        </div>
      </div>
    );
  }
}

export default CenterBox;
