import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Tab, Tabs } from 'grommet';

import { createChallenge, selectIndex, joinChallenge } from '../store/actions';
import Challenge from '../components/challenge';
import Toolbar from '../components/toolbar';
import Search from './search';
import MyBooks from './my-books';

const Home = ({
  doCreateChallenge,
  doJoinChallenge,
  challenges: { current },
  doSelectIndex,
  books,
  loading,
  userId
}) => {
  const { t } = useTranslation();
  return (
    <Box gap="large" fill="horizontal" align="center">
      {current.data && (
        <Tabs>
          <Tab title={t('Challenge')}>
            <Box>
              <Search />
              <Challenge
                id={current.id}
                challenge={current.data.model.entries}
                onClickIndex={doSelectIndex}
                books={books}
              />
            </Box>
          </Tab>
          <Tab title={t('My Books')}>
            <MyBooks
              users={current.data.users}
              match={{ params: { userId } }}
            />
          </Tab>
        </Tabs>
      )}
      {!current.data && !loading && (
        <Toolbar
          onCreateChallenge={doCreateChallenge}
          onJoinChallenge={doJoinChallenge}
        />
      )}
    </Box>
  );
};

Home.propTypes = {
  challenges: PropTypes.object.isRequired,
  doCreateChallenge: PropTypes.func.isRequired,
  doJoinChallenge: PropTypes.func.isRequired,
  doSelectIndex: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = ({ challenges, user }) => ({
  challenges,
  books: challenges.current.books,
  loading: challenges.loading,
  userId: user.uid
});

const mapDispatchToProps = dispatch => ({
  doCreateChallenge: value => dispatch(createChallenge(value)),
  doJoinChallenge: value => dispatch(joinChallenge(value)),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
