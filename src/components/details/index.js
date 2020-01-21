import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Layer, Text, TextInput } from 'grommet';
import { Add as AddIcon, Edit as ModifyIcon } from 'grommet-icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import User from '../user';
import EditDialog from '../edit-dialog';

const Add = styled(AddIcon)`
  cursor: pointer;
`;

const Modify = styled(ModifyIcon)`
  cursor: pointer;
`;

const Details = ({ header, rootName, onAddBook, index, books }) => {
  const [isAddShown, showAdd] = useState(false);
  const [editIndex, showEdit] = useState(-1);
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <Link to="/">{rootName}</Link>
      <Box direction="row">
        <Heading level="2">{header}</Heading>
      </Box>
      {books.map((book, bookIndex) => (
        <Box direction="column" key={book.created} align="center" gap="medium">
          <Text>
            {book.author}: {book.name}
          </Text>
          <Box direction="row" align="center">
            <User
              user={{
                photoURL: book.userThumbnail,
                displayName: book.userThumbnail
              }}
            />
            <Text>{book.userName}</Text>
          </Box>
          <Text>
            {new Date(book.created.seconds * 1000).toLocaleDateString()}
          </Text>
          {book.userCurrent && (
            <Box>
              <Modify onClick={() => showEdit(bookIndex)} />
            </Box>
          )}
        </Box>
      ))}
      <Add onClick={() => showAdd(!isAddShown)} />
      {isAddShown && (
        <EditDialog
          id={index}
          onClose={() => showAdd(false)}
          onSave={book =>
            onAddBook({ name: book.name, author: book.author, index: book.id })
          }
          title={header}
          saveLabel={t('add')}
        />
      )}
      {editIndex >= 0 && (
        <EditDialog
          id={index}
          onClose={() => showEdit(-1)}
          onSave={() => {}}
          onDelete={() => {}}
          title={header}
          saveLabel={t('save')}
          defaultAuthor={books[editIndex].author}
          defaultName={books[editIndex].name}
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
