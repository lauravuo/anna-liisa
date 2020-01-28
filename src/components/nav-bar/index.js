import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Box } from 'grommet';

import User from '../user';
import Icon from '../../../assets/annaliisa.png';

const Img = styled.img`
  width: 6rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const NavBar = ({ user }) => (
  <Box direction="row" fill="horizontal" justify="between">
    <Link to="/">
      <Box direction="row">
        <Img src={Icon} alt="Logo" />
      </Box>
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
