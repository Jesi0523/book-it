import { Button } from "@mui/material";

const MainButton = ({ children, onClick, type = "button", fullWidth = false, size = 18, ...props }) => {
  const responsiveFontSize = typeof size === 'object' 
  ? { ...size } 
  : {  
      xs: `${Number(size) * 0.7}px`,
      sm: `${Number(size) * 0.85}px`,
      md: `${size}px`
    };
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
      sx={{
        borderRadius: '50px',
        backgroundColor: 'primary.main',
        color: '#000',
        width: 'fit-content',
        margin: 'auto', 
        padding: '10px 32px', 
        
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
        fontSize: responsiveFontSize,
        textTransform: 'none',
        
        '&:hover': {
          backgroundColor: 'primary.light'
        },
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </Button>
  );
};

export default MainButton;