import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

import { Box } from 'grommet';

const Login = ({ onUserLogin, user }) => {
  const doLogin = () => {
    const uiConfig = {
      signInSuccessUrl: CONFIG.redirectURL,
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      tosUrl: 'TODO',
      privacyPolicyUrl: () => {
        window.location.assign('TODO');
      }
    };
    const auth = firebase.auth();
    auth.onAuthStateChanged(u => {
      onUserLogin(u);
    });

    const ui = new firebaseui.auth.AuthUI(auth);
    if (!ui.isPendingRedirect() || user === null) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  };

  useEffect(doLogin);

  return (
    <Box>
      <div id="firebaseui-auth-container" />
    </Box>
  );
};

Login.propTypes = {
  onUserLogin: PropTypes.func.isRequired
};

export default Login;
