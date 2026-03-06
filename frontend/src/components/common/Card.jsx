import { Paper, Box } from '@mui/material';

const Card = ({ 
  children, 
  bg = '#0c0c18',
  brRadius = '12px', 
  showShadow = false, 
  shadowColor = '#787ff6',
  offset = 8
}) => {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%', 
        maxWidth: { xs: '95%', sm: '450px' }, 
        margin: 'auto' 
      }}
    >
      {showShadow && (
        <Box
          sx={{
            position: 'absolute',
            top: offset,
            left: -offset,
            width: '100%',
            height: '100%',
            backgroundColor: shadowColor,
            borderRadius: brRadius,
            zIndex: 1,
            opacity: 0.5,
          }}
        />
      )}

      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: { xs: 3, sm: 4 },
          width: '100%',
          background: bg,
          borderRadius: brRadius,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          border: '1px solid rgba(255, 255, 255, 0.05)', 
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default Card;