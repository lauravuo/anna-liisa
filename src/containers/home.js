import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../components/button';
import { buttonPress } from '../store/actions';

const Home = ({ buttonIsPressed, doButtonPress }) => (
  <Button pressed={buttonIsPressed} onPress={doButtonPress} />
);

Home.propTypes = {
  buttonIsPressed: PropTypes.bool.isRequired,
  doButtonPress: PropTypes.func.isRequired
};

const mapStateToProps = ({ button: { pressed } }) => ({
  buttonIsPressed: pressed
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
