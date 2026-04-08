import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// Componentes
import Sidebar from '@/components/navigation/Sidebar';

// Logo
import logo from '@/assets/principal/Logo1.webp';

// Anchos del sidebar en PC
const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 70;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Overlay en PC
  useEffect(() => {
    if (isDesktopExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDesktopExpanded]);

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060511' }}
    >
      {/* Overlay */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          zIndex: 1199,
          opacity: isDesktopExpanded ? 1 : 0,
          visibility: isDesktopExpanded ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      />

      <AppBar
        position='fixed'
        sx={{
          display: { xs: 'block', md: 'none' },
          background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo en la barra superior en celulares */}
          <img src={logo} alt='Logo' style={{ height: '30px' }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component='nav'
        sx={{
          width: { md: drawerWidthCollapsed },
          flexShrink: { md: 0 },
        }}
      >
        {/* Sidebar celular */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidthExpanded,
              borderRight: 'none',
            },
          }}
        >
          <Sidebar isExpanded={true} />
        </Drawer>

        {/* Sidebar desktop */}
        <Drawer
          variant='permanent'
          onMouseEnter={() => setIsDesktopExpanded(true)}
          onMouseLeave={() => setIsDesktopExpanded(false)}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isDesktopExpanded
                ? drawerWidthExpanded
                : drawerWidthCollapsed,
              overflowX: 'hidden',
              transition: 'width 0.3s ease',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            },
          }}
          open
        >
          <Sidebar isExpanded={isDesktopExpanded} />
        </Drawer>
      </Box>

      {/* Paginas */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: {xs:0, md:5},
          px: {xs:0, md:15},
          width: { xs: '100%', md: `calc(100% - ${drawerWidthCollapsed}px)` },
          mt: { xs: '64px', md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
