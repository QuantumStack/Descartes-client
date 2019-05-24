import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute, UnprivateRoute } from './util/auth';
import Home from './pages/Home';
import Legal from './pages/Legal';
import Dashboard from './pages/Dashboard';
import Enroll from './pages/Enroll';
import Verify from './pages/Verify';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Foot from './components/Foot';

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/legal' component={Legal} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/enroll' component={Enroll} />
            <PrivateRoute path='/enroll/:code' component={Enroll} />
            <UnprivateRoute path='/verify/:id' component={Verify} />
            <UnprivateRoute path='/login' component={LogIn} />
            <UnprivateRoute path='/signup' component={SignUp} />
            <Route path='*' component={NotFound} />
          </Switch>

          <Foot />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
