import React, { useState } from 'react';
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060511' }}>
      
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'block', md: 'none' },
          background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo en la barra superior en celulares */}
          <img src={logo} alt="Logo" style={{ height: '30px' }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: isDesktopExpanded ? drawerWidthExpanded : drawerWidthCollapsed }, 
          flexShrink: { md: 0 },
          transition: 'width 0.3s ease' 
        }}
      >
        {/* Sidebar celular */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidthExpanded, borderRight: 'none' },
          }}
        >
          <Sidebar isExpanded={true} />
        </Drawer>

        {/* Sidebar desktop */}
        <Drawer
          variant="permanent"
          onMouseEnter={() => setIsDesktopExpanded(true)}
          onMouseLeave={() => setIsDesktopExpanded(false)}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: isDesktopExpanded ? drawerWidthExpanded : drawerWidthCollapsed, 
              overflowX: 'hidden',
              transition: 'width 0.3s ease',
              borderRight: '1px solid rgba(255,255,255,0.05)'
            },
          }}
          open
        >
          <Sidebar isExpanded={isDesktopExpanded} />
        </Drawer>
      </Box>

      {/* Paginas */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { xs: '100%', md: `calc(100% - ${drawerWidthCollapsed}px)` },
          mt: { xs: '64px', md: 0 } 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;