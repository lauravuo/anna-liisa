import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { buttonPress } from '../store/actions';

const Home = () => <div />;

Home.propTypes = {
  user: PropTypes.object
};

Home.defaultProps = {
  user: null
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  doButtonPress: () => dispatch(buttonPress())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
