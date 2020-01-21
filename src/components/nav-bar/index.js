import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box } from 'grommet';

import User from '../user';

const NavBar = ({ user }) => (
  <Box direction="row" fill="horizontal" justify="between">
    <Link to="/">
      <h1>anna-liisa</h1>
    </Link>
    <Box gap="small">
      <User user={user} />
    </Box>
  </Box>
);

NavBar.propTypes = {
  user: PropTypes.object.isRequired
};

export default NavBar;
