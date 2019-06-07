import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import UnprivateRoute from './router/UnprivateRoute';
import Home from './pages/Home';
import Legal from './pages/Legal';
import Dashboard from './containers/Dashboard';
import Account from './containers/Account';
import Create from './containers/Create';
import Purchased from './pages/Purchased';
import Join from './containers/Join';
import Instructor from './pages/Instructor';
import Student from './containers/Student';
import Verify from './containers/Verify';
import LogIn from './containers/LogIn';
import SignUp from './containers/SignUp';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Foot from './components/Foot';

function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/legal" component={Legal} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/dashboard/account" component={Account} />
        <PrivateRoute path="/dashboard/instructor/:id" component={Instructor} />
        <PrivateRoute path="/dashboard/student/:id" component={Student} />
        <PrivateRoute exact path="/create" component={Create} />
        <PrivateRoute path="/create/success" component={Purchased} />
        <PrivateRoute exact path="/join" component={Join} />
        <PrivateRoute path="/join/:code" component={Join} />
        <UnprivateRoute exact path="/verify" component={Verify} />
        <UnprivateRoute exact path="/login" component={LogIn} />
        <UnprivateRoute exact path="/signup" component={SignUp} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Foot />
    </ScrollToTop>
  );
}

export default App;
