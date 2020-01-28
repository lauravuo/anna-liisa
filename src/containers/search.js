import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Select as SelectComponent, Box, Text } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

import { selectIndex } from '../store/actions';

const Select = styled(SelectComponent)``;

const Container = styled(Box)`
  position: sticky;
  top: 0;
  right: 0;
  height: 0.5rem;
`;

const Search = ({ books, model, doSelectIndex }) => {
  const [options, setOptions] = useState([]);
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Select
        plain
        emptySearchMessage={t('search placeholder')}
        focusIndicator={false}
        valueKey="nbr"
        labelKey="name"
        icon={<SearchIcon />}
        options={options}
        onSearch={str => {
          const term = str.trim().toLowerCase();
          if (str.length < 3) {
            return setOptions([]);
          }
          const challengeIndexes = model
            .filter(item => item.name.toLowerCase().includes(term))
            .map(item => item.nbr);
          const bookIndexes = books
            .filter(
              item =>
                item.name.toLowerCase().includes(term) ||
                item.author.toLowerCase().includes(term)
            )
            .map(item => item.index);
          const indexSet = new Set([...challengeIndexes, ...bookIndexes]);
          return setOptions(
            model
              .filter(item => indexSet.has(item.nbr))
              .slice(0, 20)
              .sort((a, b) => a - b)
          );
        }}
        onChange={item => {
          return doSelectIndex(item.value.nbr);
        }}
      />
    </Container>
  );
};

Search.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({ challenges, model }) => ({
  model,
  books: Object.keys(challenges.current.books).reduce(
    (result, item) => [...result, ...challenges.current.books[item]],
    []
  )
});

const mapDispatchToProps = dispatch => ({
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
