import React from 'react';

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = ({ height = '100vh' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress color='primary' />
    </Box>
  );
};

export default Loader;
