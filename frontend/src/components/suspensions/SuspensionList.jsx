import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// Componentes propios
import Text from '@/components/common/Text';
import BaseDialog from '@/components/common/BaseDialog';

// Iconos
import CloseIcon from '@mui/icons-material/Close';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

const SuspensionList = ({ 
  mesFiltro, setMesFiltro,
  anioFiltro, setAnioFiltro, 
  listaSuspensiones, handleEliminarSuspension, 
  selectMenuProps, selectEstilos 
}) => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const anios = [2024, 2025, 2026, 2027, 2028, 2029, 2030]; 
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [actualSuspenction, setActualSuspenction] = useState(listaSuspensiones[0] || '');
  const [suspenctionName, setSuspectionName] = React.useState("");
  const handleOpenDeleteDialog = (index, texto) => { setOpenDeleteDialog(true); setActualSuspenction(index); setSuspectionName(texto)};
  const handleCloseDeleteDialog = (hasAccepted) => 
  {
    setOpenDeleteDialog(false);
    if(hasAccepted){{handleEliminarSuspension(actualSuspenction)}}
  }; 
   

  return (
    <Box sx={{ border: '1px solid #787ff6', borderRadius: '16px', p: { xs: 2, md: 4 } }}>
      
      {/* Seccion superior */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', md: 'center' }, 
        gap: 2, 
        mb: 3 
      }}>
        <Text children="Lista de horarios suspendidos:" color="#ffb74d" size="22px" />
        
        {/* Opciones mes y año */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          width: { xs: '100%', md: 'auto' } 
        }}>
          {/* Mes */}
          <Select
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ 
              ...selectEstilos, 
              flex: 1,
              minWidth: { md: '140px' } 
            }}
          >
            {meses.map(mes => (
              <MenuItem key={mes} value={mes}>{mes}</MenuItem>
            ))}
          </Select>

          {/* Año */}
          <Select
            value={anioFiltro}
            onChange={(e) => setAnioFiltro(e.target.value)}
            MenuProps={selectMenuProps}
            sx={{ 
              ...selectEstilos, 
              flex: 1,
              minWidth: { md: '100px' } 
            }}
          >
            {anios.map(anio => (
              <MenuItem key={anio} value={anio}>{anio}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Lista de suspensiones */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {listaSuspensiones.length === 0 ? (
          <Text children="No hay suspensiones registradas en este periodo." color="rgba(255,255,255,0.5)" align="center" />
        ) : (
          listaSuspensiones.map((susp) => (
            <Box key={susp.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                flexGrow: 1, backgroundColor: '#1b1c37', borderRadius: '50px',
                px: { xs: 2, md: 3 }, py: 1.5, display: 'flex', alignItems: 'center'
              }}>
                <Text children={susp.texto} color="white" size="16px" />
              </Box>

              <IconButton
                onClick={() => handleOpenDeleteDialog(susp.id, susp.texto)}
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
      <BaseDialog
        id="delete-suspension"
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title={"Advertencia"}
        fontSizeContent={18}
        icon={<AdvertismentIcon/>}
        content={
        <> Está a punto de eliminar la suspensión del día: <br/> <b>{suspenctionName}</b> <br/>¿Desea continuar?</>}
      />
    </Box>
  );
};

export default SuspensionList;