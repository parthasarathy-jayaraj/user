import React, {lazy, Suspense} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {history} from './services/history';

// import LoginPage from './modules/login';
// import RegisterPage from './modules/register';
// import DashBoardPage from './modules/dashboard';

const LoginPage = lazy(() => import(/* webpackChunkName: "login.bundle" */ './modules/login'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "register.bundle" */ './modules/register'));
const DashBoardPage = lazy(() => import(/* webpackChunkName: "dashboard.bundle" */ './modules/dashboard'));

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import BookShelfLoader from './components/core/Loaders/book-shelf-loader';

import './app.scss';

class App extends React.Component {
  /**
   * renders the base app component
   * Important!: can be changed as functional component little later.
   */
  render() {
    const {notify} = this.props;
    return (
      <div className='root-container'>
        <div>
          <div>
            <div className='alert-message-wrapper'>
              {notify.type == 'error' && (
                <Alert severity={notify.type} action={<Button color='inherit' size='small'></Button>}>
                  {notify.message}
                </Alert>
              )}
            </div>

            <Suspense
              fallback={
                <div>
                  <BookShelfLoader />
                </div>
              }
            >
              <Router history={history}>
                <Switch>
                  {/* <PrivateRoute exact path='/' component={DashBoardPage} /> */}
                  <Route exact path='/'>
                    <Redirect to='/login' />
                  </Route>
                  <Route path='/login' component={LoginPage} />
                  <Route path='/register' component={RegisterPage} />
                  <Route path='/dashboard' component={DashBoardPage} />
                </Switch>
              </Router>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const notify = state;
  return notify;
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
