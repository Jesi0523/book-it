import Typography from '@mui/material/Typography';

const Text = ({ children, color = "text.primary", align = "start", size = 18, fontWeight, sx, ...props }) => 
{
  const responsiveFontSize = typeof size === 'object' 
    ? { ...size } 
    : {  
        xs: `${Number(size) * 0.7}px`,
        sm: `${Number(size) * 0.85}px`,
        md: `${size}px`
      };

  return (
    <Typography
      variant="body1"
      align={align}
      sx={{
        color: color,
        letterSpacing: "1px",
        fontSize: responsiveFontSize,
        fontWeight: fontWeight,
        ...sx
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Text;