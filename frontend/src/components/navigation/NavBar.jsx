import * as React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

// ************** componentes propios :3 **************
// |  navigation
import NavOptions from '@/components/navigation/options/NavOptions';
import BaseDialog from '@/components/common/BaseDialog';

// ************** imagenes **************
import logo from '@/assets/logo/Logo1.webp';

// ************** iconos **************
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isLanding = currentPath === '/';

  const [openSessionDialog, setOpenSessionDialog] = React.useState(false);
  const handleOpenSessionDialog = () => { setOpenSessionDialog(true);};
  const handleCloseSessionDialog = (hasAccepted) => 
  {
    setOpenSessionDialog(false);
    if(hasAccepted){navigate('/login');}; 
  };

  return (
    <AppBar
      position='fixed'
      sx={{ background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)' }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {isLanding ? (
            // Landing Page
            <>
              <Link href='/'>
                <img
                  src={logo}
                  alt='Logo'
                  style={{ margin: '5px', width: '35px', cursor: 'pointer' }}
                />
              </Link>
            </>
          ) : (
            // Main Page
            <>
              <Link href='/main'>
                <img
                  src={logo}
                  alt='Logo'
                  style={{ margin: '5px', width: '35px', cursor: 'pointer' }}
                />
              </Link>
            </>
          )}

          {/* ****** Display de las opciones *****  */}
          {/* C E L U L A R, T A B L E T S, E T C  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '.MuiMenu-paper': {
                  background:
                    'linear-gradient(180deg, #1b1c37 100%, #272951 0%)',
                },
                '.MuiMenuItem-root': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  py: 0.5,
                },
                '.MuiTypography-root, svg': {
                  fontSize: '0.6rem',
                  fontFamily: "'Montserrat', sans-serif",
                },
              }}
            >
              {isLanding
                ? [
                    <MenuItem key='login' component='a' href='/login'>
                      <HowToRegIcon />
                      <Typography>Inicia sesión</Typography>
                    </MenuItem>,
                    <MenuItem key='signup' component='a' href='/signup'>
                      <PersonAddIcon />
                      <Typography>Regístrate</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key='main'
                      component='a'
                      href='/main'
                      sx={{
                        color:
                          currentPath === '/main'
                            ? 'secondary.blueShade'
                            : 'inherit',
                      }}
                    >
                      <HomeIcon /> <Typography>Inicio</Typography>
                    </MenuItem>,
                    <MenuItem
                      key='book'
                      component='a'
                      href='/book-appointment'
                      sx={{
                        color:
                          currentPath === '/book-appointment'
                            ? 'secondary.blueShade'
                            : 'inherit',
                      }}
                    >
                      <EditCalendarIcon /> <Typography>Agendar cita</Typography>
                    </MenuItem>,
                    <MenuItem
                      key='schedule'
                      component='a'
                      href='/my-schedule'
                      sx={{
                        color:
                          currentPath === '/my-schedule'
                            ? 'secondary.blueShade'
                            : 'inherit',
                      }}
                    >
                      <CalendarIcon /> <Typography>Mis citas</Typography>
                    </MenuItem>,
                    <MenuItem
                      key='profile'
                      component='a'
                      href='/profile'
                      sx={{
                        color:
                          currentPath === '/profile'
                            ? 'secondary.blueShade'
                            : 'inherit',
                      }}
                    >
                      <UserIcon /> <Typography>Ver perfil</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>

          {/* LAPTOPS, MONITORES GRANDES, TELES xd */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
            }}
          >
            {isLanding ? (
              // Landing Page
              <>
                <NavOptions
                  icon={<HowToRegIcon />}
                  link='/login'
                  text='Inicia sesión'
                />
                <NavOptions
                  icon={<PersonAddIcon />}
                  link='/signup'
                  text='Regístrate'
                />
              </>
            ) : (
              // Main Page
              <>
                <NavOptions
                  icon={<HomeIcon />}
                  link='/main'
                  text='Inicio'
                  isActive={currentPath === '/main'}
                />
                <NavOptions
                  icon={<EditCalendarIcon />}
                  link='/book-appointment'
                  text='Agendar cita'
                  isActive={currentPath === '/book-appointment'}
                />
                <NavOptions
                  icon={<CalendarIcon />}
                  link='/my-schedule'
                  text='Mis citas'
                  isActive={currentPath === '/my-schedule'}
                />
                <NavOptions
                  icon={<UserIcon />}
                  link='/profile'
                  text='Ver perfil'
                  isActive={currentPath === '/profile'}
                />
              </>
            )}
          </Box>

          {/* Nombre y cerrar sesion */}
          {!isLanding && (
            <>
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  width: '150px',
                  maxWidth: '300px',
                  px: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.8rem',
                    color: 'primary.main',
                    textAlign: 'right',
                  }}
                >
                  Nombre(s)
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.6rem',
                    color: 'text.primary',
                    textAlign: 'right',
                  }}
                >
                  Correo
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={handleOpenSessionDialog}
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '0.6rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 'normal',
                    color: 'secondary.main',
                    transition: '0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#ffffff00',
                        color: 'secondary.blueShade'
                    }
                  }} 
                >
                  <LogoutIcon /> Cerrar sesión
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
      <BaseDialog
        id="close-admin-session"
        open={openSessionDialog}
        onClose={handleCloseSessionDialog}
        title={"Advertencia"}
        icon={<AdvertismentIcon/>}
        content={<> Está a punto de cerrar sesión<br/> <b>¿desea continuar?</b></>}
      />
    </AppBar>
  );
}
export default NavBar;
