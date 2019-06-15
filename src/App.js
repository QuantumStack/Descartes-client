import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import UnprivateRoute from './router/UnprivateRoute';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingLarge from './components/LoadingLarge';
import Foot from './components/Foot';

const Home = React.lazy(() => import('./pages/Home'));
const Legal = React.lazy(() => import('./pages/Legal'));
const Dashboard = React.lazy(() => import('./containers/Dashboard'));
const Account = React.lazy(() => import('./containers/Account'));
const Create = React.lazy(() => import('./containers/Create'));
const Purchased = React.lazy(() => import('./pages/Purchased'));
const Join = React.lazy(() => import('./containers/Join'));
const Instructor = React.lazy(() => import('./containers/Instructor'));
const Student = React.lazy(() => import('./containers/Student'));
const Verify = React.lazy(() => import('./containers/Verify'));
const LogIn = React.lazy(() => import('./containers/LogIn'));
const SignUp = React.lazy(() => import('./containers/SignUp'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => (
  <ScrollToTop>
    <ErrorBoundary>
      <Suspense fallback={<LoadingLarge key="suspense" showNavbar={false} />}>
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
      </Suspense>
    </ErrorBoundary>
  </ScrollToTop>
);

export default App;
