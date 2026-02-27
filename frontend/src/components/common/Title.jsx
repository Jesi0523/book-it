import { Typography } from "@mui/material";

const Title = ({ children, color = "primary.main", align = "start", size = 32 }) => {
  return (
    <Typography
      variant="h1"
      align={align}
      sx={{
        color: color,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: {
          xs: `${size * 0.7}px`,
          sm: `${size * 1}px`
        }
      }}
      
    >
      {children}
    </Typography>
  );
};

export default Title;
