import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Text, TextInput } from 'grommet';
import { useTranslation } from 'react-i18next';

const Dialog = ({ header, fieldName, okLabel, onOk, onDismiss }) => {
  const [value, setValue] = useState('');
  const { t, i18n } = useTranslation();
  return (
    <Layer onEsc={onDismiss} onClickOutside={onDismiss}>
      <Box margin="medium" gap="medium">
        <Box>
          <Heading level="3">{header}</Heading>
        </Box>
        <Box direction="row" align="center" gap="small">
          <Text>{fieldName}</Text>
          <TextInput
            maxLength="256"
            onChange={event => setValue(event.target.value)}
          />
        </Box>
        <Box direction="row" gap="xsmall" justify="end">
          <Button label={t('close')} onClick={onDismiss} />
          <Button
            primary
            label={okLabel}
            disabled={!value}
            onClick={() => {
              onDismiss();
              onOk(value);
            }}
          />
        </Box>
      </Box>
    </Layer>
  );
};

Dialog.propTypes = {
  okLabel: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired
};

export default Dialog;
