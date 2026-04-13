import TextField from '@mui/material/TextField';

const TextInput = ({
  label = "Lorem ipsum",
  type = "text",
  placeholder = "lorem ipsum",
  height = "auto",
  background = "#0c0c18",
  border = 'secondary.main',
  borderHover = 'secondary.light',
  sx,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ notched: false }}
      {...props}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            height: height,
            color: "white",
            fontFamily: "'Montserrat', sans-serif",
            background: background,

            "& fieldset": {
              borderColor: border,
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: borderHover,
            },
            "&.Mui-focused fieldset": {
              borderColor: border,
              borderWidth: "2px",
            },

            "& input::placeholder, & textarea::placeholder": {
              color: "rgba(255, 255, 255, 0.4)",
              opacity: 1,
            },

            "&.MuiInputBase-multiline": {
              padding: "28px 24px 16px 24px",
              alignItems: "flex-start",
            },
            "& .MuiInputBase-inputMultiline": {
              padding: 0,
            }
          },

          "& .MuiInputLabel-root": {
            color: "primary.main",
            fontSize: "18px",
            fontWeight: "600",
            transform: "translate(24px, 10px) scale(0.75) !important", 
            transformOrigin: "top left",
            "&.Mui-focused": {
              color: "primary.main",
            },
          },

          "& .MuiInputBase-input": {
            fontSize: "16px",
            padding: "28px 24px 10px 24px",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    />
  );
};

export default TextInput;