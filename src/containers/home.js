import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Tab, Tabs } from 'grommet';

import { createChallenge, selectIndex, joinChallenge } from '../store/actions';
import Challenge from '../components/challenge';
import Toolbar from '../components/toolbar';
import Search from './search';

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
              <Search />
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
  books: challenges.current.books,
  loading: challenges.loading
});

const mapDispatchToProps = dispatch => ({
  doCreateChallenge: value => dispatch(createChallenge(value)),
  doJoinChallenge: value => dispatch(joinChallenge(value)),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
