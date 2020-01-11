import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Button, Tab, Tabs } from 'grommet';

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
  model,
  doSelectIndex
}) => (
  <Box gap="large" fill="horizontal" align="center">
    {current.id && (
      <Tabs>
        {all.map(challenge => (
          <Tab key={challenge} title={challenge}>
            {current.data && (
              <Challenge
                challenge={current.data.model.entries}
                onClickIndex={doSelectIndex}
              />
            )}
          </Tab>
        ))}
      </Tabs>
    )}
    <Toolbar
      onCreateChallenge={doCreateChallenge}
      onJoinChallenge={doJoinChallenge}
    />
  </Box>
);

Home.propTypes = {
  challenges: PropTypes.object.isRequired,
  model: PropTypes.arrayOf(PropTypes.object).isRequired,
  doCreateChallenge: PropTypes.func.isRequired,
  doJoinChallenge: PropTypes.func.isRequired,
  doSelectIndex: PropTypes.func.isRequired
};

const mapStateToProps = ({ challenges, model }) => ({
  challenges,
  model: model || []
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress()),
  doCreateChallenge: value => dispatch(createChallenge(value)),
  doJoinChallenge: value => dispatch(joinChallenge(value)),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
