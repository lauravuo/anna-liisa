import React from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, Text } from 'grommet';
import { useTranslation } from 'react-i18next';

import User from '../user';

const Challenge = ({ challenge, onClickIndex, books }) => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <DataTable
        columns={[
          {
            property: 'nbr',
            header: <Text>{t('Number')}</Text>,
            primary: true
          },
          {
            property: 'name',
            header: <Text>{t('Name')}</Text>
          } /*,
          {
            property: 'readers',
            header: <Text>{t('Readers')}</Text>,
            render: datum => {
              const booksForIndex = books[datum.nbr];
              const users = booksForIndex
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
              return (
                <Box direction="row" align="center">
                  {users.map(book => (
                    <User
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
              );
            }
          }*/
        ]}
        data={challenge}
        onClickRow={event => onClickIndex(event.index + 1)}
      />
    </Box>
  );
};

Challenge.propTypes = {
  challenge: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickIndex: PropTypes.func.isRequired
};

export default Challenge;
