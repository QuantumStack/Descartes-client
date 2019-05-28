import React from 'react';
import { Link } from 'react-router-dom';

class DashboardHeader extends React.Component {
  render() {
    const { children, small } = this.props;
    return (
      <div className={`uk-grid-small uk-flex-middle uk-margin${small ? '-small' : ''}-bottom`} data-uk-grid>
        <div>
          <Link to='/dashboard' className='uk-icon-link uk-animation-slide-right-small' data-uk-icon='arrow-left' data-uk-tooltip='Back to dashboard' />
        </div>
        {children}
      </div>
    );
  }
}

export default DashboardHeader;
