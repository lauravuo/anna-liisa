import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Details = () => <div>Details</div>;

Details.propTypes = {
  user: PropTypes.object
};

Details.defaultProps = {
  user: null
};

const mapStateWithProps = ({ user }) => ({
  user
});

export default connect(mapStateWithProps)(Details);
