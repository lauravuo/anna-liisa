import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';
import styled from 'styled-components';

export const RoundBox = styled(Box)`
  overflow: hidden;
  object-fit: cover;
`;

const User = ({ user, title, size }) => (
  <Box direction="row" align="center" gap="xsmall" margin="small">
    <RoundBox height={size} width={size} round="xsmall">
      <Image
        title={title || user.displayName}
        fit="contain"
        src={user.photoURL}
      />
    </RoundBox>
  </Box>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string,
  size: PropTypes.string
};

User.defaultProps = {
  title: '',
  size: 'xxsmall'
};

export default User;
