import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Image } from 'grommet';
import styled from 'styled-components';

export const RoundBox = styled(Box)`
  overflow: hidden;
  object-fit: cover;
`;

const User = ({ user }) => (
  <Box direction="row" align="center" gap="xsmall" margin="small">
    <RoundBox height="xxsmall" width="xxsmall" round="xsmall">
      <Image title={user.displayName} fit="contain" src={user.photoURL} />
    </RoundBox>
  </Box>
);

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
