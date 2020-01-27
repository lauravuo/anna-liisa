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
  books,
  loading
}) => {
  return (
    <Box gap="large" fill="horizontal" align="center">
      {current.data && (
        <Tabs>
          {/* TODO: render challenge names */}
          {all.map(challenge => (
            <Tab key={challenge} title={current.data.name}>
              <Challenge
                id={challenge}
                challenge={current.data.model.entries}
                onClickIndex={doSelectIndex}
                books={books}
              />
            </Tab>
          ))}
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
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ challenges }) => ({
  challenges,
  books: challenges.current.data
    ? Object.keys(challenges.current.data.users)
        .reduce((result, item) => {
          const user = challenges.current.data.users[item];
          const userData = {
            id: user.id,
            displayName: user.name,
            photoURL: user.thumbnail
          };
          return [
            ...result,
            ...user.books.map(book => ({ user: userData, ...book }))
          ];
        }, [])
        .reduce((result, item) => {
          return {
            ...result,
            [item.index]: [...(result[item.index] || []), item]
          };
        }, {})
    : {},
  loading: challenges.loading
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress()),
  doCreateChallenge: value => dispatch(createChallenge(value)),
  doJoinChallenge: value => dispatch(joinChallenge(value)),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
