import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Iconos
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

// Logos
import logo from '@/assets/principal/Logo1.webp';

// Opciones
const menuItems = [
  { text: 'Calendario de citas', icon: <CalendarMonthIcon />, path: '/appointmentCalendar' },
  { text: 'Gestión de empleados', icon: <PeopleIcon />, path: '/employees' },
  { text: 'Gestión de servicios', icon: <BuildIcon />, path: '/services' },
  { text: 'Información de la empresa', icon: <InfoIcon />, path: '/companyInfo' },
  { text: 'Suspensión de servicios', icon: <ReportProblemIcon />, path: '/suspensions' },
  { text: 'Reportes', icon: <BarChartIcon />, path: '/reports' },
];

const Sidebar = ({ isExpanded = true }) => {
  const location = useLocation();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '260px', 
      background: 'linear-gradient(180deg, #1b1c37 0%, #121229 100%)',
      color: 'white',
      overflowX: 'hidden' 
    }}>
      {/* Logo */}
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          height: '64px',
          px: 2
        }}
      >
        <img 
          src={logo} 
          alt="Logo" 
          style={{ 
            height: '40px', 
            width: '40px', 
            minWidth: '40px', 
            maxWidth: '40px',
            objectFit: 'contain' 
          }} 
        />
      </Box>

      {/* Opciones */}
      <List sx={{ flexGrow: 1, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                height: 'auto', 
                py: 1.5, 
                justifyContent: 'flex-start', 
                px: 2.5,
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid #ffb74d' : '4px solid transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3, 
                  justifyContent: 'center',
                  color: location.pathname === item.path ? '#ffb74d' : 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: isExpanded ? 1 : 0, 
                  whiteSpace: 'normal', 
                  width: '170px', 
                  minWidth: '170px',
                  maxWidth: '170px',
                  flexShrink: 0, 
                  transition: 'opacity 0.2s ease', 
                  margin: 0,
                  '& .MuiTypography-root': { 
                    fontSize: '0.9rem', 
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: 1.2 
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Cerrar sesion */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          component={RouterLink}
          to="/"
          sx={{
            height: '48px', 
            width: isExpanded ? '100%' : '48px',
            px: isExpanded ? 2.5 : 0,
            justifyContent: 'flex-start', 
            borderRadius: isExpanded ? '24px' : '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            transition: 'all 0.3s ease', 
            overflow: 'hidden' 
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: isExpanded ? 0 : '48px', 
            mr: isExpanded ? 3 : 0, 
            justifyContent: 'center', 
            color: 'white',
            transition: 'all 0.3s ease' 
          }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar sesión" 
            sx={{ 
              opacity: isExpanded ? 1 : 0, 
              whiteSpace: 'normal', 
              width: '170px', 
              minWidth: '170px',
              maxWidth: '170px',
              flexShrink: 0,
              margin: 0,
              transition: 'opacity 0.2s ease',
              '& .MuiTypography-root': { fontSize: '0.9rem', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.2 } 
            }} 
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;