import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BookList from '../components/book-list';

const MyBooks = ({
  match: {
    params: { userId }
  },
  users
}) => {
  const books = users[userId].books.sort((a, b) =>
    a.created.seconds < b.created.seconds ? -1 : 1
  );
  return <BookList books={books} />;
};

MyBooks.propTypes = {
  users: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ challenges }) => ({
  users: challenges.current.data.users
});

export default connect(mapStateToProps)(MyBooks);
