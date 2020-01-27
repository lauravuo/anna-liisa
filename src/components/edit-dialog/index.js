import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Text, TextInput } from 'grommet';
import { useTranslation } from 'react-i18next';

const EditDialog = ({
  onClose,
  onSave,
  onDelete,
  saveLabel,
  idStr,
  idObj,
  header,
  title,
  defaultAuthor,
  defaultName
}) => {
  const [name, setName] = useState(defaultName);
  const [author, setAuthor] = useState(defaultAuthor);
  const { t, i18n } = useTranslation();
  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Box margin="medium" gap="medium">
        <Box>
          <Heading level="3">{header}</Heading>
          <Text>{title}</Text>
        </Box>
        <Box direction="row" align="center" gap="small">
          <Text>{`${t('Name')}:`}</Text>
          <TextInput
            value={name}
            maxLength="256"
            onChange={event => setName(event.target.value)}
          />
        </Box>
        <Box direction="row" align="center" gap="small">
          <Text>{`${t('Author')}:`}</Text>
          <TextInput
            value={author}
            maxLength="256"
            onChange={event => setAuthor(event.target.value)}
          />
        </Box>
        <Box direction="row" gap="xsmall" justify="end">
          {onDelete && (
            <Button
              label={t('delete')}
              onClick={() => {
                console.log('DELETE');
                onClose();
                onDelete({ id: idStr || idObj });
              }}
            />
          )}
          <Button label={t('close')} onClick={onClose} />
          <Button
            primary
            label={saveLabel}
            disabled={!name || !author}
            onClick={() => {
              onClose();
              onSave({ name, author, id: idStr || idObj });
            }}
          />
        </Box>
      </Box>
    </Layer>
  );
};

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  saveLabel: PropTypes.string.isRequired,
  idStr: PropTypes.string,
  idObj: PropTypes.object,
  title: PropTypes.string.isRequired,
  defaultAuthor: PropTypes.string.isRequired,
  defaultName: PropTypes.string.isRequired
};

EditDialog.defaultProps = {
  onDelete: null,
  idStr: null,
  idObj: null
};

export default EditDialog;
