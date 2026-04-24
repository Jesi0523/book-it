// React
import { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

// Iconos
import Man from '@mui/icons-material/Man';
import Woman from '@mui/icons-material/Woman';

const GenderSelect = ({
  label = 'Sexo',
  background,
  border,
  height = { xs: '60px', md: '80px' },
  value,
  onChange,
  helperText,
}) => {
  // <--------------- RENDER --------------->
  return (
    <>
      <Box
        sx={{
          border:
            border || ((theme) => theme.palette.customBorders.genderSelect),
          borderRadius: '30px',
          padding: '4px 12px',
          position: 'relative',
          height: height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: background || 'background.paper',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: { xs: '12px', md: '14px' },
            position: 'absolute',
            top: { xs: 4, md: 8 },
            left: { xs: 16, md: 20 },
          }}
        >
          {label}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 0.5, md: 1.5 },
            mt: { xs: 2, md: 1.5 },
          }}
        >
          <IconButton
            onClick={() => onChange('M')}
            sx={{
              color:
                value === 'M' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
              backgroundColor:
                value === 'M'
                  ? 'rgba(255, 157, 64, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: { xs: '4px', md: '6px' },
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <Man sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
          </IconButton>

          <IconButton
            onClick={() => onChange('F')}
            sx={{
              color:
                value === 'F' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
              backgroundColor:
                value === 'F'
                  ? 'rgba(255, 157, 64, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: { xs: '4px', md: '6px' },
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <Woman sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
          </IconButton>
        </Box>
      </Box>

      {helperText && (
        <FormHelperText
          sx={{
            color: 'error.main',
            mx: 2,
            fontSize: { xs: '12px', md: '14px' },
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

export default GenderSelect;
