import TextField from '@mui/material/TextField';

const DateInput = ({
  label = 'Fecha de nacimiento',
  helperText,
  disabled,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type='date'
      fullWidth
      disabled={disabled}
      InputLabelProps={{ shrink: true }}
      InputProps={{ notched: false }}
      FormHelperTextProps={{
        sx: { color: 'error.main', fontSize: { xs: '12px', md: '14px' } },
      }}
      helperText={helperText}
      {...props}
      sx={{
        fontSize: '14px',
        opacity: disabled ? 0.7 : 1,
        '& .MuiOutlinedInput-root': {
          bgcolor: 'background.paper',
          borderRadius: '35px',
          color: 'white',
          height: '85px',
          '& fieldset': {
            borderColor: disabled
              ? 'rgba(255, 255, 255, 0.1)'
              : 'secondary.main',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: 'secondary.blueShade',
          },
          '& input': {
            backgroundColor: disabled ? 'transparent' : 'background.inputInner',
            margin: '24px 15px 5px 15px',
            padding: '8px 0',
            textAlign: 'center',

            borderRadius: '10px',
            fontSize: '1rem',
            color: disabled
              ? 'rgba(255, 255, 255, 0.4) !important'
              : 'rgba(255, 255, 255, 0.9)',
            WebkitTextFillColor: disabled
              ? 'rgba(255, 255, 255, 0.4) !important'
              : 'rgba(255, 255, 255, 0.9)',
          },

          '& input::-webkit-calendar-picker-indicator': {
            filter: 'invert(1)',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0 : 0.6,
            transition: '0.2s ease-in-out',
            '&:hover': { opacity: 0.8 },
          },
        },
        '& .MuiInputLabel-root': {
          color: disabled
            ? 'rgba(255, 255, 255, 0.5) !important'
            : 'primary.main',
          fontWeight: 'bold',
          fontSize: '14px',
          transform: 'translate(24px, 12px) scale(0.9)',
          transformOrigin: 'top left',
        },
      }}
    />
  );
};

export default DateInput;
