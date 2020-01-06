import React from 'react';
import PropTypes from 'prop-types';

import { Box, DataTable, Text } from 'grommet';

const Challenge = ({ challenge }) => (
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
          header: <Text>Name</Text>,
          primary: true
        }
      ]}
      data={challenge}
    />
  </Box>
);

Challenge.propTypes = {
  challenge: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Challenge;
