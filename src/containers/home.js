import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Tab, Tabs } from 'grommet';

import {
  buttonPress,
  createChallenge,
  selectIndex,
  joinChallenge
} from '../store/actions';
import Challenge from '../components/challenge';
import Toolbar from '../components/toolbar';

const Home = ({
  doCreateChallenge,
  doJoinChallenge,
  challenges: { all, current },
  doSelectIndex,
  books
}) => (
  <Box gap="large" fill="horizontal" align="center">
    {current.id ? (
      <Tabs>
        {all.map(challenge => (
          <Tab key={challenge} title={challenge}>
            {current.data && (
              <Challenge
                challenge={current.data.model.entries}
                onClickIndex={doSelectIndex}
                books={books}
              />
            )}
          </Tab>
        ))}
      </Tabs>
    ) : (
      <Toolbar
        onCreateChallenge={doCreateChallenge}
        onJoinChallenge={doJoinChallenge}
      />
    )}
  </Box>
);

Home.propTypes = {
  challenges: PropTypes.object.isRequired,
  doCreateChallenge: PropTypes.func.isRequired,
  doJoinChallenge: PropTypes.func.isRequired,
  doSelectIndex: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};

const mapStateToProps = ({ challenges }) => ({
  challenges,
  books: challenges.current.data
    ? Object.keys(challenges.current.data.users).reduce((result, item) => {
        const user = challenges.current.data.users[item];
        return {
          ...result,
          ...user.books.reduce(
            (booksResult, book) => ({
              ...booksResult,
              [book.index]: [
                ...(booksResult[book.index] || []),
                {
                  user: {
                    displayName: user.name,
                    photoURL: user.thumbnail
                  },
                  ...book
                }
              ]
            }),
            {}
          )
        };
      }, {})
    : {}
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress()),
  doCreateChallenge: value => dispatch(createChallenge(value)),
  doJoinChallenge: value => dispatch(joinChallenge(value)),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
