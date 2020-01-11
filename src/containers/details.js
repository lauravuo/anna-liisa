import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DetailsComponent from '../components/details';
import { addBook } from '../store/actions';

const Details = ({
  match: {
    params: { index }
  },
  model,
  challengeName,
  doAddBook
}) => {
  const header = model ? `${model[index].nbr}: ${model[index].name}` : '';
  return (
    <DetailsComponent
      rootName={challengeName}
      header={header}
      onAddBook={doAddBook}
    />
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired,
  model: PropTypes.arrayOf(PropTypes.object),
  challengeName: PropTypes.string.isRequired,
  doAddBook: PropTypes.func.isRequired
};

Details.defaultProps = {
  model: null
};

const mapStateWithProps = ({
  user,
  challenges: {
    current: { data }
  }
}) => ({
  challengeName: data ? data.name : '',
  model: data ? data.model.entries : null,
  user
});

const mapDispatchWithProps = dispatch => ({
  doAddBook: data => dispatch(addBook(data))
});

export default connect(mapStateWithProps, mapDispatchWithProps)(Details);
