import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Heading,
  Layer,
  Text,
  TextInput,
  TextArea
} from 'grommet';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Container = styled(Box)`
  min-height: 30rem;
`;

const Row = styled(Box)`
  position: relative;
`;

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
  defaultName,
  defaultComment,
  defaultRecommend
}) => {
  const [name, setName] = useState(defaultName || '');
  const [author, setAuthor] = useState(defaultAuthor || '');
  const [comment, setComment] = useState(defaultComment || '');
  const [recommend, setRecommend] = useState(defaultRecommend || false);
  const { t } = useTranslation();
  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Container margin="medium" gap="medium">
        <Box>
          <Heading level="3">{header}</Heading>
          <Text>{title}</Text>
        </Box>
        <Row direction="column" align="start" gap="small">
          <Text size="small">{`${t('Author')}:`}</Text>
          <TextInput
            value={author}
            maxLength="256"
            onChange={event => setAuthor(event.target.value)}
          />
        </Row>
        <Row direction="column" align="start" gap="small">
          <Text size="small">{`${t('Name')}:`}</Text>
          <TextInput
            value={name}
            maxLength="256"
            onChange={event => setName(event.target.value)}
          />
        </Row>
        <Row direction="column" align="start" gap="small">
          <Text size="small">{`${t('Comment')}:`}</Text>
          <TextArea
            resize={false}
            value={comment}
            maxLength="256"
            onChange={event => setComment(event.target.value)}
          />
        </Row>
        <Row>
          <CheckBox
            checked={recommend}
            label={t('Recommend')}
            onChange={event => setRecommend(event.target.checked)}
          />
        </Row>
        <Box
          margin="medium"
          direction="row"
          gap="xsmall"
          justify={onDelete ? 'between' : 'end'}
        >
          {onDelete && (
            <Button
              label={t('delete')}
              onClick={() => {
                onClose();
                onDelete({ id: idStr || idObj });
              }}
            />
          )}
          <Box direction="row" gap="xsmall" justify="end">
            <Button label={t('close')} onClick={onClose} />
            <Button
              primary
              label={saveLabel}
              disabled={!name || !author}
              onClick={() => {
                onClose();
                onSave({
                  name,
                  author,
                  comment: comment || '',
                  recommend: recommend || false,
                  id: idStr || idObj
                });
              }}
            />
          </Box>
        </Box>
      </Container>
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
  defaultAuthor: PropTypes.string,
  defaultName: PropTypes.string,
  defaultComment: PropTypes.string,
  defaultRecommend: PropTypes.bool,
  header: PropTypes.string.isRequired
};

EditDialog.defaultProps = {
  defaultAuthor: '',
  defaultName: '',
  defaultComment: '',
  defaultRecommend: false
};

EditDialog.defaultProps = {
  onDelete: null,
  idStr: null,
  idObj: null
};

export default EditDialog;
