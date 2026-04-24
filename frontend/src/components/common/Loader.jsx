import React from 'react';

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: (theme) => theme.customGradients.mainBackground,
      }}
    >
      <CircularProgress color='primary' />
    </Box>
  );
};

export default Loader;
