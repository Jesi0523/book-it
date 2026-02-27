import * as React from 'react';
import {AppBar, Link, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem} from '@mui/material';

// ************** componentes propios :3 **************
// |  navigation
import NavOptions from '@/components/navigation/NavOptions';

// ************** imagenes **************
import logo from '@/assets/Logo1.png';

// ************** iconos **************
import MenuIcon from '@mui/icons-material/Menu';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

function NavBar() 
{
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget);};
  const handleCloseNavMenu = () => { setAnchorElNav(null);};

  return (
    <AppBar position="static" 
        sx={{ background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)'}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Link href="/main">
                <img src={logo} alt="Logo"  style= {{margin:"5px", width:"35px", cursor: "pointer"}}/>
            </Link>

            {/* ****** Display de las opciones *****  */}
             {/* C E L U L A R, T A B L E T S, E T C  */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                >
                    <MenuIcon sx={{color:'text.secondary'}}/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
                    keepMounted
                    transformOrigin={{vertical: 'top', horizontal: 'left'}}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ 
                        display: { xs: 'block', md: 'none' },
                        '.MuiMenu-paper': { background: 'linear-gradient(180deg, #1b1c37 100%, #272951 0%)'},
                        '.MuiMenuItem-root': 
                        { 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1,
                            py: 0.5 
                        },
                        '.MuiTypography-root, svg': 
                        {
                            fontSize: "0.6rem",
                            fontFamily: "'Montserrat', sans-serif"
                        }
                    }}
                >
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography><CalendarIcon/> Mis citas</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography><UserIcon/> Ver perfil</Typography>
                    </MenuItem>
                </Menu>
            </Box>

            {/* LAPTOPS, MONITORES GRANDES, TELES xd */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "end"}}>
                <NavOptions onClick={handleCloseNavMenu} icon={<CalendarIcon/>} text="Mis citas"></NavOptions>
                <NavOptions onClick={handleCloseNavMenu} icon={<UserIcon/>} text="Ver perfil"></NavOptions>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '150px', maxWidth: '300px', px: 2}}>
                <Typography sx={{fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', color: 'primary.main', textAlign: 'right'}}>Nombre(s)</Typography>
                <Typography sx={{fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', color: 'text.primary', textAlign: 'right'}}>Correo</Typography>
            </Box>
            
            {/* TODO: Desplegar modal de confirmación */}
            <Box sx={{ flexGrow: 0}}>
                <NavOptions icon={<LogoutIcon/>} text="Cerrar Sesión"></NavOptions>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
