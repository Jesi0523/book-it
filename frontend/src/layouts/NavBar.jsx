import * as React from 'react';
import {AppBar, Link} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// ************** imagenes **************
import logo from '@/assets/Logo1.png';

// ************** iconos **************
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';


// const pages = [{icon: CalendarIcon, text: 'Mis citas'}, {icon: UserIcon, text: 'Ver perfil'}];
const icons = [CalendarIcon, 'Ver perfil', 'Cerrar sesión'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() 
{
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget);};
  const handleOpenUserMenu = (event) => { setAnchorElUser(event.currentTarget);};

  const handleCloseNavMenu = () => { setAnchorElNav(null);};

  const handleCloseUserMenu = () => { setAnchorElUser(null);};

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Link href="/main">
                <img src={logo} alt="Logo"  style= {{margin:"5px", width:"35px", cursor: "pointer", border: "2px solid #fff"}}/>
            </Link>

            {/* ****** Display de las opciones *****  */}
             {/* C E L U L A R, T A B L E T S, E T C  */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, border: "2px solid #fff" }}>
                <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin=
                    {{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin=
                    {{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: 'center' }}><CalendarIcon></CalendarIcon> Mis citas</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: 'center' }}><UserIcon></UserIcon> Ver perfil</Typography>
                    </MenuItem>
                </Menu>
            </Box>

            {/* LAPTOPS, MONITORES GRANDES, TELES xd */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "end",  border: "2px solid #fff" }}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                ><CalendarIcon></CalendarIcon> Mis citas</Button>

                 <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                ><UserIcon></UserIcon> Ver perfil</Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column',  border: "2px solid #fff" }}>
                <Typography>Nombre</Typography>
                <Typography>Correo</Typography>
            </Box>

            
            {/* TODO: Desplegar modal de confirmación */}
            <Box sx={{ flexGrow: 0, border: "2px solid #fff" }}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                ><LogoutIcon sx={{ p: 0 }}/> Cerrar sesión</Button>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
