import TextField from '@mui/material/TextField';

const DateInput = ({ label = "Fecha de nacimiento" }) => {
  return (
    <TextField
      label={label}
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ notched: false }}
      sx={{
        fontSize: '14px',
        '& .MuiOutlinedInput-root': 
        {
          bgcolor: 'background.paper',
          borderRadius: '35px',
          color: 'white',
          height: '85px',
          '& fieldset': { borderColor: 'secondary.main', borderWidth: '1.5px' },
          '&:hover fieldset': { 
            borderColor: 'secondary.blueShade',
          },
          '& input': 
          {
            backgroundColor: 'background.inputInner',
            margin: '24px 15px 5px 15px',
            padding: '8px 0',
            textAlign: 'center',
            
            borderRadius: '10px',
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.9)',
          },

          '& input::-webkit-calendar-picker-indicator': 
          {
            filter: 'invert(1)', 
            cursor: 'pointer',
            opacity: 0.6,
            transition: '0.2s ease-in-out',
            '&:hover': { opacity: 0.8 }
          }
        },
        '& .MuiInputLabel-root': 
        {
          color: 'primary.main',
          fontWeight: 'bold',
          fontSize: '14px',
          transform: 'translate(24px, 12px) scale(0.9)',
          transformOrigin: 'top left',
        }
      }}
    />
  );
};

export default DateInput;