import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DetailsComponent from '../components/details';
import { addBook, editBook, deleteBook } from '../store/actions';

const Details = ({
  match: {
    params: { index }
  },
  model,
  challengeName,
  doAddBook,
  doEditBook,
  doDeleteBook,
  users,
  userId
}) => {
  const entry = model
    ? model.find(item => index.toString() === item.nbr)
    : null;
  const header = entry ? `${entry.nbr}: ${entry.name}` : '';
  const indexBooks = Object.keys(users)
    .reduce((result, item) => {
      const userData = users[item];
      const books = userData
        ? userData.books
            .filter(book => book.index === index)
            .map(book => ({
              userCurrent: userData.id === userId,
              userId: userData.id,
              userName: userData.name,
              userThumbnail: userData.thumbnail,
              ...book
            }))
        : [];
      return [...result, ...books];
    }, [])
    .sort((a, b) => (a.created < b.created ? -1 : 1));
  return (
    <DetailsComponent
      rootName={challengeName}
      header={header}
      onAddBook={doAddBook}
      onEditBook={doEditBook}
      onDeleteBook={doDeleteBook}
      index={index || '-1'}
      books={indexBooks}
    />
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired,
  model: PropTypes.arrayOf(PropTypes.object),
  challengeName: PropTypes.string.isRequired,
  doAddBook: PropTypes.func.isRequired,
  doDeleteBook: PropTypes.func.isRequired,
  doEditBook: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};

Details.defaultProps = {
  model: null
};

const mapStateWithProps = ({
  challenges: {
    current: { data }
  },
  user
}) => ({
  challengeName: data ? data.name : '',
  model: data ? data.model.entries : null,
  users: data ? data.users : {},
  userId: user.uid
});

const mapDispatchWithProps = dispatch => ({
  doAddBook: data => dispatch(addBook(data)),
  doEditBook: data => dispatch(editBook(data)),
  doDeleteBook: data => dispatch(deleteBook(data))
});

export default connect(mapStateWithProps, mapDispatchWithProps)(Details);
