import React from 'react';
import PropTypes from 'prop-types';
import LoadingLarge from '../components/LoadingLarge';
import UserContainer from './UserContainer';

class Instructor extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <LoadingLarge key="student-course" isLoading={isLoading}>
          <div className="uk-container">
            <UserContainer>
              <div>Coming soon</div>
            </UserContainer>
          </div>
        </LoadingLarge>
      </div>
    );
  }
}

// TODO: connect to redux
export default Instructor;
