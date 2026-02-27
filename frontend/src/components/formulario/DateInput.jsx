import { TextField } from "@mui/material";

const DateInput = ({ label = "Fecha de nacimiento" }) => {
  return (
    <TextField
      label={label}
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ notched: false }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '35px',
          color: 'white',
          height: '85px',
          '& fieldset': { borderColor: 'secondary.main', borderWidth: '1.5px' },
          
          '& input': {
            backgroundColor: '#16162a',
            borderRadius: '12px',
            margin: '24px 15px 5px 15px',
            padding: '8px 0',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontFamily: 'monospace',
            color: 'rgba(255, 255, 255, 0.8)',
          }
        },
        '& .MuiInputLabel-root': {
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