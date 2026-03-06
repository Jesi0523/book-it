import { TextField } from "@mui/material";

const TextInput = ({
  label = "Lorem ipsum",
  type = "text",
  placeholder = "lorem ipsum",
  height = "auto",
  background = "#0c0c18",
  border= 'secondary.main',
  borderHover= 'secondary.light',
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
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          height: height,
          color: "white",
          fontFamily: "'Montserrat', sans-serif",
          background: background ,

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

          "& input::placeholder": {
            color: "rgba(255, 255, 255, 0.4)",
            opacity: 1,
          },
        },

        "& .MuiInputLabel-root": {
          color: "primary.main",
          fontSize: "18px",
          fontWeight: "600",
          transform: "translate(24px, 8px) scale(0.75)",
          transformOrigin: "top left",
          "&.Mui-focused": {
            color: "primary.main",
          },
        },

        "& .MuiInputBase-input": {
          fontSize: "16px",
          padding: "28px 24px 10px 24px",
        },
      }}
    />
  );
};

export default TextInput;
