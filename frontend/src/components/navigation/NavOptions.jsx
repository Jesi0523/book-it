import Button from '@mui/material/Button';

const NavOptions = ({icon, text, textSize = "0.6rem", textDirection = "column", link}) => 
{
    return(
        <Button
            href= {link} 
            sx={{ 
                display: 'flex',
                flexDirection: textDirection,
                fontSize: textSize,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'normal',
                color: 'secondary.main',
                transition: '0.2s ease-in-out',
                '&:hover': 
                {
                    backgroundColor: '#ffffff00',
                    color: 'secondary.blueShade'
                }
            }} 
        >
            {icon}{text}
        </Button>
    )
}

export default NavOptions;