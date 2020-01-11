import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Button, Tab, Tabs } from 'grommet';

import { buttonPress, createChallenge, selectIndex } from '../store/actions';
import Challenge from '../components/challenge';

const Home = ({
  doCreateChallenge,
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
    <Box direction="row" gap="medium">
      <Button label="Create challenge" onClick={doCreateChallenge} />
      <Button label="Join challenge" />
    </Box>
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
  doCreateChallenge: () => dispatch(createChallenge()),
  doSelectIndex: index => dispatch(selectIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
