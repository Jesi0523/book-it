import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

// ************** componentes propios :3 **************
// |  navigation
import NavOptions from '@/components/navigation/options/NavOptions';

// ************** imagenes **************
import logo from '@/assets/principal/Logo1.webp';

// ************** iconos **************
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

function NavBar() 
{
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget);};
  const handleCloseNavMenu = () => { setAnchorElNav(null);};
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar position="fixed" 
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
                            gap: "4px",
                            py: 0.5 
                        },
                        '.MuiTypography-root, svg': 
                        {
                            fontSize: "0.6rem",
                            fontFamily: "'Montserrat', sans-serif"
                        }
                    }}
                >
                    <MenuItem component="a" href="/main" sx={{ color: currentPath === '/main' ? 'secondary.blueShade' : 'inherit' }}>
                        <HomeIcon/>
                        <Typography>Inicio</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/book-appointment" sx={{ color: currentPath === '/book-appointment' ? 'secondary.blueShade' : 'inherit' }}>
                        <EditCalendarIcon/>
                        <Typography>Agendar cita</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/my-schedule" sx={{ color: currentPath === '/my-schedule' ? 'secondary.blueShade' : 'inherit' }}>
                        <CalendarIcon/>
                        <Typography>Mis citas</Typography>
                    </MenuItem>
                    <MenuItem component="a" href="/profile" sx={{ color: currentPath === '/profile' ? 'secondary.blueShade' : 'inherit' }}>
                        <UserIcon/>
                        <Typography>Ver perfil</Typography>
                    </MenuItem>
                </Menu>
            </Box>

            {/* LAPTOPS, MONITORES GRANDES, TELES xd */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "end"}}>
                <NavOptions icon={<HomeIcon/>} link='/main' text="Inicio" isActive={currentPath === '/main'} />
                <NavOptions icon={<EditCalendarIcon/>} link='/book-appointment' text="Agendar cita" isActive={currentPath === '/book-appointment'} />
                <NavOptions icon={<CalendarIcon/>} link='/my-schedule' text="Mis citas" isActive={currentPath === '/my-schedule'} />
                <NavOptions icon={<UserIcon/>} link='/profile' text="Ver perfil" isActive={currentPath === '/profile'} />
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '150px', maxWidth: '300px', px: 2}}>
                <Typography sx={{fontFamily: "'Montserrat', sans-serif", fontSize: '0.8rem', color: 'primary.main', textAlign: 'right'}}>Nombre(s)</Typography>
                <Typography sx={{fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', color: 'text.primary', textAlign: 'right'}}>Correo</Typography>
            </Box>
            
            {/* TODO: Desplegar modal de confirmación */}
            <Box sx={{ flexGrow: 0}}>
                <NavOptions icon={<LogoutIcon/>} text="Cerrar Sesión" link='/'></NavOptions>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
