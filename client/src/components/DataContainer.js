import React from 'react';
import { withRouter } from 'react-router-dom';
import { ax, authHeader } from '../util/api';
import { deauthenticate } from '../util/auth';
import { error } from '../util/alert';
import merge from 'deepmerge';
import LoadingLarge from './LoadingLarge';

class DataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    ax.get(this.props.url, { headers: authHeader() })
    .then(({ data }) => this.setState({ data, isLoading: false }))
    .catch(({ response: res = {} }) => {
      if (res.status === 401) {
        deauthenticate();
        this.props.history.push('/login');
      } else error(res.statusText);
    });
  }

  updateData(newData, callback) {
    this.setState(({ data }) => ({ data: merge(data, newData) }), callback);
  }

  render() {
    const { data, isLoading } = this.state;
    const childrenWithData = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { ...(data || {}), updateData: this.updateData }));
    return isLoading ? (
      <LoadingLarge />
    ) : childrenWithData;
  }
}

export default withRouter(DataContainer);
