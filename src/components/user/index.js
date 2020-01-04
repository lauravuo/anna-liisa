import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Image } from 'grommet';
import styled from 'styled-components';

export const RoundBox = styled(Box)`
  overflow: hidden;
  object-fit: cover;
  border-radius: ${props => props.theme.global.edgeSize.xxsmall};
`;

const User = ({ user }) => (
  <Box direction="row" align="end" gap="small" margin="small">
    <Box>
      <Text size="xsmall">Signed in as</Text>
      <Text size="xsmall">{user.displayName}</Text>
    </Box>
    <RoundBox height="xxsmall" width="xxsmall">
      <Image fit="contain" src={user.photoURL} />
    </RoundBox>
  </Box>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default User;
