import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { useTranslation } from 'react-i18next';

import Dialog from '../dialog';

const Toolbar = ({ onCreateChallenge, onJoinChallenge }) => {
  const [isCreateShown, showCreate] = useState(false);
  const [isJoinShown, showJoin] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <Box direction="row" gap="medium">
      <Button label="Create challenge" onClick={() => showCreate(true)} />
      <Button label="Join challenge" onClick={() => showJoin(true)} />
      {isCreateShown && (
        <Dialog
          header={t('Create challenge')}
          okLabel={t('create')}
          fieldName={t('Name')}
          onDismiss={() => showCreate(false)}
          onOk={onCreateChallenge}
        />
      )}
      {isJoinShown && (
        <Dialog
          header={t('Join challenge')}
          okLabel={t('join')}
          fieldName={t('Code')}
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
