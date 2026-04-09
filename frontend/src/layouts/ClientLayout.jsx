import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '@/components/navigation/NavBar';

const ClientLayout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <NavBar />

      <Toolbar />
      
      <Box 
        component="main" 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ClientLayout;