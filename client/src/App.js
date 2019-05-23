import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute, UnprivateRoute } from './util/auth';
import Home from './pages/Home';
import Legal from './pages/Legal';
import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ScrollToTop from './components/ScrollToTop';
import Foot from './components/Foot';

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Route exact path='/' component={Home} />
          <Route path='/legal' component={Legal} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/dashboard/account' component={Home} />
          <UnprivateRoute path='/verify/:id' component={Verify} />
          <UnprivateRoute path='/login' component={LogIn} />
          <UnprivateRoute path='/signup' component={SignUp} />
          <Foot />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
