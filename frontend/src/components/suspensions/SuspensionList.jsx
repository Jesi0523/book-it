import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// Componentes propios
import Text from '@/components/common/Text';

// Iconos
import CloseIcon from '@mui/icons-material/Close';

const SuspensionList = ({ 
  mesFiltro, setMesFiltro, 
  listaSuspensiones, handleEliminarSuspension, 
  selectMenuProps, selectEstilos 
}) => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <Box sx={{ border: '1px solid #787ff6', borderRadius: '16px', p: { xs: 2, md: 4 } }}>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        gap: 2, 
        mb: 3 
      }}>
        <Text children="Lista de horarios suspendidos:" color="#ffb74d" size={22} />
        
        <Select
          value={mesFiltro}
          onChange={(e) => setMesFiltro(e.target.value)}
          MenuProps={selectMenuProps}
          sx={{ 
            ...selectEstilos, 
            minWidth: '150px',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          {meses.map(mes => (
            <MenuItem key={mes} value={mes}>{mes}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {listaSuspensiones.length === 0 ? (
          <Text children="No hay suspensiones registradas en este mes." color="rgba(255,255,255,0.5)" align="center" />
        ) : (
          listaSuspensiones.map((susp) => (
            <Box key={susp.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                flexGrow: 1, backgroundColor: '#1b1c37', borderRadius: '50px',
                px: { xs: 2, md: 3 }, py: 1.5, display: 'flex', alignItems: 'center'
              }}>
                <Text children={susp.texto} color="white" size={18} />
              </Box>
              <IconButton
                onClick={() => handleEliminarSuspension(susp.id)}
                sx={{
                  backgroundColor: '#ffb74d', color: '#000',
                  width: { xs: '40px', md: '45px' },
                  height: { xs: '40px', md: '45px' }, 
                  flexShrink: 0,
                  '&:hover': { backgroundColor: '#e0a040' }
                }}
              >
                <CloseIcon sx={{ fontWeight: 'bold' }} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SuspensionList;