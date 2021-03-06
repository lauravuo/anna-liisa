import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Text } from 'grommet';
import {
  Add as AddIcon,
  Edit as ModifyIcon,
  Validate,
  LinkPrevious
} from 'grommet-icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserComponent from './user';
import EditDialog from './edit-dialog';

const User = styled(UserComponent)``;

const ParentBox = styled(Box)`
  position: relative;
`;

const ButtonContainer = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
`;

const Modify = styled(ModifyIcon)`
  cursor: pointer;
`;

const Comment = styled(Text)`
  font-style: italic;
`;

const Details = ({
  header,
  rootName,
  onAddBook,
  onEditBook,
  onDeleteBook,
  index,
  books
}) => {
  const [isAddShown, showAdd] = useState(false);
  const [editIndex, showEdit] = useState(-1);
  const { t } = useTranslation();
  const editItem = editIndex >= 0 && books[editIndex];
  return (
    <Box gap="large">
      <Box margin="small">
        <Link to="/" title={rootName}>
          <LinkPrevious />
        </Link>
      </Box>
      <Box direction="row">
        <Heading level="2">{header}</Heading>
      </Box>
      {books.map((book, bookIndex) => {
        const created = new Date(book.created.seconds * 1000);
        return (
          <ParentBox direction="column" key={book.created.seconds} gap="small">
            <Box direction="row" align="start" gap="xsmall">
              {book.recommend && (
                <div>
                  <Validate color="brand" />
                </div>
              )}
              <Text>
                {book.author}: {book.name}
              </Text>
            </Box>
            <Box direction="column" margin="small">
              <Box direction="row" align="start" gap="small">
                <User
                  size="xxxsmall"
                  user={{
                    photoURL: book.userThumbnail,
                    displayName: book.userThumbnail
                  }}
                />

                <Box gap="small">
                  {book.comment && (
                    <Comment size="small">{book.comment}</Comment>
                  )}
                  <Text size="xsmall">
                    {book.userName}, {created.toLocaleDateString()}{' '}
                    {created.toLocaleTimeString()}
                  </Text>
                </Box>
              </Box>
            </Box>
            {book.userCurrent && (
              <ButtonContainer>
                <Modify onClick={() => showEdit(bookIndex)} />
              </ButtonContainer>
            )}
          </ParentBox>
        );
      })}
      <Box margin="large">
        <Button
          icon={<AddIcon />}
          label={t('Add book')}
          onClick={() => showAdd(!isAddShown)}
        />
      </Box>
      {isAddShown && (
        <EditDialog
          idStr={index}
          onClose={() => showAdd(false)}
          onSave={({ id, ...book }) => onAddBook({ index: id, ...book })}
          title={header}
          saveLabel={t('add')}
          header={t('Add book')}
        />
      )}
      {editIndex >= 0 && (
        <EditDialog
          idObj={editItem.created}
          onClose={() => showEdit(-1)}
          onSave={({ id, ...book }) =>
            onEditBook({
              created: id,
              ...book
            })
          }
          onDelete={book => onDeleteBook(book.id)}
          title={header}
          saveLabel={t('save')}
          defaultAuthor={editItem.author}
          defaultName={editItem.name}
          defaultComment={editItem.comment}
          defaultRecommend={editItem.recommend}
          header={t('Edit book')}
        />
      )}
    </Box>
  );
};

Details.propTypes = {
  rootName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onAddBook: PropTypes.func.isRequired,
  onEditBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Details;
