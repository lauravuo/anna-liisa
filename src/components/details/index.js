import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Layer, Text, TextInput } from 'grommet';
import { Add as AddIcon, Edit as ModifyIcon } from 'grommet-icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import User from '../user';
import EditDialog from '../edit-dialog';

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
  const { t, i18n } = useTranslation();
  const editItem = editIndex >= 0 && books[editIndex];
  return (
    <Box gap="large">
      <Link to="/">{rootName}</Link>
      <Box direction="row">
        <Heading level="2">{header}</Heading>
      </Box>
      {books.map((book, bookIndex) => (
        <ParentBox direction="column" key={book.created} gap="small">
          <Text>
            {book.author}: {book.name}
          </Text>
          <Box direction="row" justify="between" align="center" margin="small">
            <Box direction="row" align="center">
              <User
                size="xxxsmall"
                user={{
                  photoURL: book.userThumbnail,
                  displayName: book.userThumbnail
                }}
              />
              <Text size="small">{book.userName}</Text>
            </Box>
            <Text size="small">
              {new Date(book.created.seconds * 1000).toLocaleDateString()}
            </Text>
          </Box>
          {book.userCurrent && (
            <ButtonContainer>
              <Modify onClick={() => showEdit(bookIndex)} />
            </ButtonContainer>
          )}
        </ParentBox>
      ))}
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
          onSave={book =>
            onAddBook({ name: book.name, author: book.author, index: book.id })
          }
          title={header}
          saveLabel={t('add')}
          header={t('Add book')}
        />
      )}
      {editIndex >= 0 && (
        <EditDialog
          idObj={editItem.created}
          onClose={() => showEdit(-1)}
          onSave={book =>
            onEditBook({
              name: book.name,
              author: book.author,
              created: book.id
            })
          }
          onDelete={book => onDeleteBook(book.id)}
          title={header}
          saveLabel={t('save')}
          defaultAuthor={editItem.author}
          defaultName={editItem.name}
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
  index: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Details;
