import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import { Grommet, Box } from 'grommet';
import firebase from 'firebase/app';

import './i18n';
import configureStore, { history } from './store';

import Login from './components/login';
import NavBar from './components/nav-bar';
import NoMatch from './components/no-match';
import Error from './containers/error';
import Home from './containers/home';
import Details from './containers/details';
import theme from './theme';
import { setUser } from './store/actions';
import MyBooks from './containers/my-books';

const store = configureStore();

firebase.initializeApp(CONFIG.firebaseConfig);

const LoginContainer = connect(
  ({ user }) => ({ user }),
  dispatch => ({
    onUserLogin: user => dispatch(setUser(user))
  })
)(Login);

const UI = ({ user }) => (
  <Grommet theme={theme}>
    {user ? (
      <Box fill="horizontal">
        <Error />
        <NavBar user={user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:challenge/:index" component={Details} />
          <Route path="/:userId" component={MyBooks} />
          <Route component={NoMatch} />
        </Switch>
      </Box>
    ) : (
      <LoginContainer />
    )}
  </Grommet>
);

UI.propTypes = {
  user: PropTypes.object
};

UI.defaultProps = {
  user: null
};

const UIContainer = connect(({ user }) => ({ user }))(UI);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <UIContainer />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
