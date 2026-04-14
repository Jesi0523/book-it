import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// Componentes propios
import Text from '@/components/common/Text';
import BaseDialog from '@/components/common/BaseDialog'

// Iconos
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

const ServicesSection = ({ availableServices, selectedServices, onServiceToggle }) => {
  // Estados
  const [selectedValue, setSelectedValue] = useState(availableServices[0] || '');
  const [actualService, setActualService] = useState(availableServices[0] || '');

  // Funcion agregar servicio
  const handleAdd = () => {
    if (selectedValue && !selectedServices.includes(selectedValue)) {
      onServiceToggle(selectedValue);
    }
  };

  // Const para el modal de confirmación -> si elimina un servicio
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = (service) => { setOpenDeleteDialog(true); setActualService(service);};
  const handleCloseDeleteDialog = (hasAccepted) => 
  {
    setOpenDeleteDialog(false);
    if(hasAccepted){onServiceToggle(actualService);};
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

      {/* Seccion superior */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2
      }}>
        {/* Titulo */}
        <Box sx={{ minWidth: 'max-content' }}>
          <Text children="Servicios que realiza" color='#ffb74d' size="18px" />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          gap: 2
        }}>
          {/* Dropdown/Lista */}
          <Select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1b1c37',
                  color: 'white',
                  '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(255, 183, 77, 0.2)' },
                  '& .Mui-selected': { backgroundColor: 'rgba(255, 183, 77, 0.4) !important' }
                }
              }
            }}
            sx={{
              flexGrow: 1,
              backgroundColor: '#1b1c37',
              color: 'white',
              borderRadius: '50px',
              height: '45px',
              fontFamily: "'Montserrat', sans-serif",
              '& fieldset': { border: 'none' }, 
              '& .MuiSvgIcon-root': { color: '#ffb74d' },
              
              '& .MuiSelect-select': { 
                display: 'flex',
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: '20px',
                height: '100%'
              }
            }}
          >
            {availableServices.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>

          {/* Boton agregar servicio */}
          <IconButton
            onClick={handleAdd}
            disabled={selectedServices.includes(selectedValue)} 
            sx={{
              backgroundColor: '#ffb74d',
              color: '#000',
              width: '45px',
              height: '45px',
              flexShrink: 0,
              '&:hover': { backgroundColor: '#e0a040' },
              '&.Mui-disabled': { 
                backgroundColor: 'rgba(255, 183, 77, 0.4)', 
                color: 'rgba(0,0,0,0.4)' 
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Seccion de servicios seleccionados */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
        {selectedServices.map((service) => (
            
          // Contenedor servicio
          <Box key={service} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            
            {/* Servicio */}
            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: '#1b1c37',
                borderRadius: '50px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
              }}
            >
              <Text children={service} color="white" size="16px" />
            </Box>

            {/* Boton eliminar servicio */}
            <IconButton
              onClick={() => handleOpenDeleteDialog(service)}
              sx={{
                backgroundColor: '#ffb74d',
                color: '#000',
                width: '45px',
                height: '45px',
                flexShrink: 0,
                '&:hover': { backgroundColor: '#e0a040' }

              }}
            >
              <CloseIcon sx={{ fontWeight: 'bold' }}/>
            </IconButton>
          </Box>
        ))}
      </Box>
      {/* NOTA: quitar esto si les resulta molesto  */}
      <BaseDialog
        id="delete-service"
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title={"Advertencia"}
        icon={<AdvertismentIcon/>}
        content={
          <>
            Está a punto de eliminar el servicio:<br />
            <b>{actualService}</b><br />
            ¿Desea continuar?
        </>}
      />
    </Box>
  );
};

export default ServicesSection;