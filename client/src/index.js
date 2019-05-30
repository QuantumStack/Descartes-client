import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configureStore';

UIkit.use(Icons);

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
