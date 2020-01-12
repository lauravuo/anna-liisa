import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Layer, Text, TextInput } from 'grommet';
import { Add as AddIcon } from 'grommet-icons';
import styled from 'styled-components';

import User from '../user';

const Add = styled(AddIcon)`
  cursor: pointer;
`;

const Details = ({ header, rootName, onAddBook, index, books }) => {
  const [isAddShown, showAdd] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  return (
    <Box>
      <Link to="/">{rootName}</Link>
      <Box direction="row">
        <Heading level="2">{header}</Heading>
      </Box>
      {books.map(book => (
        <Box direction="row" key={book.created} align="center" gap="medium">
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
            {book.author}: {book.name}
          </Text>
          <Text>
            {new Date(book.created.seconds * 1000).toLocaleDateString()}
          </Text>
        </Box>
      ))}
      <Add onClick={() => showAdd(!isAddShown)} />
      {isAddShown && (
        <Layer
          onEsc={() => showAdd(false)}
          onClickOutside={() => showAdd(false)}
        >
          <Box margin="medium" gap="medium">
            <Box>
              <Heading level="3">Add book</Heading>
              <Text>{header}</Text>
            </Box>
            <Box direction="row" align="center" gap="small">
              <Text>Name:</Text>
              <TextInput
                maxLength="256"
                onChange={event => setName(event.target.value)}
              />
            </Box>
            <Box direction="row" align="center" gap="small">
              <Text>Writer:</Text>
              <TextInput
                maxLength="256"
                onChange={event => setAuthor(event.target.value)}
              />
            </Box>
            <Box direction="row" gap="xsmall" justify="end">
              <Button label="close" onClick={() => showAdd(false)} />
              <Button
                primary
                label="add"
                disabled={!name || !author}
                onClick={() => {
                  showAdd(false);
                  onAddBook({ name, author, index });
                }}
              />
            </Box>
          </Box>
        </Layer>
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
