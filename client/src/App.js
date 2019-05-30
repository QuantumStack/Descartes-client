import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, UnprivateRoute } from './util/auth';
import Home from './pages/Home';
import Legal from './pages/Legal';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Create from './pages/Create';
import Enroll from './pages/Enroll';
import Instructor from './pages/Instructor';
import Student from './pages/Student';
import Verify from './pages/Verify';
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
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute exact path="/enroll" component={Enroll} />
        <PrivateRoute path="/enroll/:code" component={Enroll} />
        <UnprivateRoute path="/verify/:id" component={Verify} />
        <UnprivateRoute path="/login" component={LogIn} />
        <UnprivateRoute path="/signup" component={SignUp} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Foot />
    </ScrollToTop>
  );
}

export default App;
