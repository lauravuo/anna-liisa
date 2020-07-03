import React from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, Text } from 'grommet';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled(Box)`
  margin-top: 1rem;
`;

const Table = styled(DataTable)`
  th,
  td {
    vertical-align: top;
  }
`;

const BookList = ({ books }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Table
        alignSelf="start"
        primaryKey="id"
        columns={[
          {
            property: 'index',
            header: <Text>{t('Number')}</Text>
          },
          {
            property: 'created',
            header: <Text>{t('Date')}</Text>,
            render: datum => {
              const created = new Date(datum.created.seconds * 1000);
              return <Text>{created.toLocaleDateString()}</Text>;
            }
          },
          {
            property: 'author',
            header: <Text>{t('Book')}</Text>,
            render: datum => {
              return (
                <Box>
                  <Text>
                    {datum.author}: {datum.name}
                  </Text>
                </Box>
              );
            }
          }
        ]}
        data={books}
      />
    </Container>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BookList;
