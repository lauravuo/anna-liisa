import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import { Grommet } from 'grommet';

import configureStore, { history } from './store';

import Login from './components/login';
import NavBar from './components/nav-bar';
import NoMatch from './components/no-match';
import Error from './containers/error';
import Home from './containers/home';
import Page from './containers/page';
import theme from './theme';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Grommet theme={theme}>
        {theme !== null ? (
          <Login />
        ) : (
          <div>
            <Error />
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/page" component={Page} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        )}
      </Grommet>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
