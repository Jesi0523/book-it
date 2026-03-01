import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Man, Woman } from "@mui/icons-material";

const GenderSelect = ({ label = "Sexo", background = '#0c0c18', border = '1.5px solid #6C63FF'}) => 
{
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{
      border: border,
      borderRadius: '30px',
      padding: '4px 12px',
      position: 'relative',
      height: '80px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: background,
      boxSizing: 'border-box'
    }}>
      <Typography sx={{
        color: 'primary.main',
        fontWeight: 'bold',
        fontSize: '12px',
        position: 'absolute',
        top: 8,
        left: 20,
      }}>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 1.5 }}>
        <IconButton 
          onClick={() => setSelected('M')}
          sx={{ 
            // Color del icono
            color: selected === 'M' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: selected === 'M' ? 'rgba(255, 157, 64, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '6px',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <Man fontSize="medium" />
        </IconButton>
        
        <IconButton 
          onClick={() => setSelected('F')}
          sx={{ 
            color: selected === 'F' ? 'primary.main' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: selected === 'F' ? 'rgba(255, 157, 64, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '6px',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <Woman fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GenderSelect;