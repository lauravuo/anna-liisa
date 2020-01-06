import React from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, Text } from 'grommet';

const Challenge = ({ challenge, onClickIndex }) => (
  <Box>
    <DataTable
      columns={[
        {
          property: 'nbr',
          header: <Text>Number</Text>,
          primary: true
        },
        {
          property: 'name',
          header: <Text>Name</Text>
        }
      ]}
      data={challenge}
      onClickRow={event => onClickIndex(event.index)}
    />
  </Box>
);

Challenge.propTypes = {
  challenge: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickIndex: PropTypes.func.isRequired
};

export default Challenge;
