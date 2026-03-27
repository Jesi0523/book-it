import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Man from '@mui/icons-material/Man';
import Woman from '@mui/icons-material/Woman';

const GenderSelect = ({ 
  label = "Sexo", 
  background = '#0c0c18', 
  border = '1.5px solid #6C63FF',
  height = { xs: '60px', md: '80px' } 
}) => {
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{
      border: border,
      borderRadius: '30px',
      padding: '4px 12px',
      position: 'relative',
      height: height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: background,
      boxSizing: 'border-box'
    }}>
      <Typography sx={{
        color: 'primary.main',
        fontWeight: 'bold',
        fontSize: { xs: '12px', md: '14px' },
        position: 'absolute',
        top: { xs: 4, md: 8 }, 
        left: { xs: 16, md: 20 },
      }}>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, md: 1.5 }, mt: { xs: 2, md: 1.5 } }}>
        <IconButton 
          onClick={() => setSelected('M')}
          sx={{ 
            color: selected === 'M' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: selected === 'M' ? 'rgba(255, 157, 64, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: { xs: '4px', md: '6px' }, 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <Man sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
        </IconButton>
        
        <IconButton 
          onClick={() => setSelected('F')}
          sx={{ 
            color: selected === 'F' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: selected === 'F' ? 'rgba(255, 157, 64, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: { xs: '4px', md: '6px' },
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <Woman sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GenderSelect;