import { Typography } from "@mui/material";

const Title = ({ children, color = "primary.main", align = "start", size = 32, textTransform= 'uppercase' }) => {
  const responsiveFontSize = typeof size === 'object' 
    ? { ...size }
    : {
        xs: `${Number(size) * 0.7}px`,
        sm: `${Number(size) * 0.85}px`,
        md: `${size}px`
      };
  return (
    <Typography
      variant="h1"
      align={align}
      sx={{
        color: color,
        fontWeight: "bold",
        textTransform: textTransform,
        letterSpacing: "1px",
        fontSize: responsiveFontSize
      }}
      
    >
      {children}
    </Typography>
  );
};

export default Title;
