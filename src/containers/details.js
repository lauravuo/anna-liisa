import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Text } from 'grommet';

const Details = ({
  match: {
    params: { index }
  },
  model,
  challengeName
}) => {
  const header = model ? `${model[index].nbr} ${model[index].name}` : '';
  return (
    <Box>
      <Link to="/">{challengeName}</Link>
      <Box direction="row">
        <Text>{header}</Text>
      </Box>
    </Box>
  );
};

Details.propTypes = {
  user: PropTypes.object
};

Details.defaultProps = {
  user: null
};

const mapStateWithProps = ({
  user,
  challenges: {
    current: { data }
  }
}) => ({
  challengeName: data ? data.name : '',
  model: data ? data.model.entries : null,
  user
});

export default connect(mapStateWithProps)(Details);
