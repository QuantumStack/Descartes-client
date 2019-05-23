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

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Route exact path='/' component={Home} />
          <Route path='/legal' component={Legal} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <UnprivateRoute path='/verify/:id' component={Verify} />
          <UnprivateRoute path='/login' component={LogIn} />
          <UnprivateRoute path='/signup' component={SignUp} />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
