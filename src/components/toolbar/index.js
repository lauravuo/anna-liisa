import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

import Dialog from '../dialog';

const Toolbar = ({ onCreateChallenge, onJoinChallenge }) => {
  const [isCreateShown, showCreate] = useState(false);
  const [isJoinShown, showJoin] = useState(false);
  return (
    <Box direction="row" gap="medium">
      <Button label="Create challenge" onClick={() => showCreate(true)} />
      <Button label="Join challenge" onClick={() => showJoin(true)} />
      {isCreateShown && (
        <Dialog
          header="Create challenge"
          okLabel="create"
          fieldName="Name"
          onDismiss={() => showCreate(false)}
          onOk={onCreateChallenge}
        />
      )}
      {isJoinShown && (
        <Dialog
          header="Join challenge"
          okLabel="join"
          fieldName="Code"
          onDismiss={() => showJoin(false)}
          onOk={onJoinChallenge}
        />
      )}
    </Box>
  );
};

Toolbar.propTypes = {
  onCreateChallenge: PropTypes.func.isRequired,
  onJoinChallenge: PropTypes.func.isRequired
};

export default Toolbar;
