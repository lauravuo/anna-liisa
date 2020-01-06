import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Button, Tab, Tabs } from 'grommet';

import { buttonPress, createChallenge } from '../store/actions';
import Challenge from '../components/challenge';

const Home = ({ doCreateChallenge, challenges: { all, current }, model }) => (
  <Box gap="small" fill="horizontal" align="center">
    <Button label="Create challenge" onClick={doCreateChallenge} />
    <Button label="Join challenge" />
    {current && (
      <Tabs>
        {all.map(challenge => (
          <Tab key={challenge.id} title={challenge.name}>
            <Challenge challenge={model} />
          </Tab>
        ))}
      </Tabs>
    )}
  </Box>
);

Home.propTypes = {
  challenges: PropTypes.object.isRequired,
  model: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({ challenges, model }) => ({
  challenges,
  model: model || []
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress()),
  doCreateChallenge: () => dispatch(createChallenge())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
