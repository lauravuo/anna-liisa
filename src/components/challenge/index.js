import React from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, Text } from 'grommet';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import User from '../user';

const Table = styled(DataTable)`
  th {
    vertical-align: top;
  }
`;

const Avatar = styled(User)`
  width: 30px;
  height: 30px;
`;

const Footer = styled(Box)`
  text-align: center;
  margin-top: 3rem;
`;

const Challenge = ({ id, challenge, onClickIndex, books }) => {
  const { t } = useTranslation();
  const getUsersForIndex = nbr => {
    const booksForIndex = books[nbr];
    return booksForIndex
      ? booksForIndex.reduce((result, item) => {
          const found = result.find(b => b.user.id === item.user.id);
          return found
            ? [
                ...result.filter(b => b.user.id !== item.user.id),
                {
                  ...found,
                  user: {
                    ...found.user,
                    count: (found.user.count || 1) + 1
                  }
                }
              ]
            : [...result, item];
        }, [])
      : [];
  };
  return (
    <Box>
      <Table
        alignSelf="start"
        columns={[
          {
            property: 'nbr',
            header: <Text>{t('Number')}</Text>,
            primary: true
          },
          {
            property: 'name',
            header: <Text>{t('Name')}</Text>,
            render: datum => {
              const users = getUsersForIndex(datum.nbr);
              return (
                <Box>
                  <Text>{datum.name}</Text>
                  <Box direction="row" align="center">
                    {users.map(book => (
                      <Avatar
                        size="xxxsmall"
                        title={
                          book.user.count
                            ? `${book.user.count} books`
                            : `${book.author}: ${book.name}`
                        }
                        key={book.user.id}
                        user={book.user}
                      />
                    ))}
                  </Box>
                </Box>
              );
            }
          }
        ]}
        data={challenge}
        onClickRow={event => onClickIndex(event.index + 1)}
      />
      <Footer fill="horizontal">
        <Text size="small">
          {t('Share this code to others for joining the challenge')}: {id}
        </Text>
      </Footer>
    </Box>
  );
};

Challenge.propTypes = {
  challenge: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickIndex: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired
};

export default Challenge;
