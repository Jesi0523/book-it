import { Typography } from "@mui/material";

const Text = ({ children, color = "text.primary", align = "start", size = 18, fontWeight }) => {
  return (
    <Typography
      variant="body1"
      align={align}
      sx={{
        color: color,
        letterSpacing: "1px",
        fontSize: {
          xs: `${size * 0.7}px`,
          sm: `${size * 0.85}px`
        },
        fontWeight: fontWeight
      }}
      
    >
      {children}
    </Typography>
  );
};

export default Text;
