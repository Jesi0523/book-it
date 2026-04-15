import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Iconos
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

// Componentes propios
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import BaseDialog from '@/components/common/BaseDialog'

const ServiceBody = ({ service, onEdit, onDeleteConfirm }) => {
  const linearDegraded = 'linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)'; 
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => { setOpenDeleteDialog(true);};
  const handleCloseDeleteDialog = (hasAccepted) => 
  {
      setOpenDeleteDialog(false);
      if(hasAccepted) onDeleteConfirm();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      
      <Grid container spacing={3}>
        {/* Imagen */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(180deg, #87CEEB 0%, #a8e6cf 50%, #90EE90 100%)', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.1)'
            }}
          >
            {service.imagen ? (
              <img src={service.imagen} alt={service.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <InsertPhotoIcon sx={{ fontSize: 60, color: 'white', opacity: 0.8 }} />
            )}
          </Box>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            
            {/* Descripcion */}
            <Box sx={{ background: linearDegraded, borderRadius: '12px', p: 2, flexGrow: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
              <Text children="Descripción" color="white" size="14px" sx={{ mb: 1, display: 'block' }} />
              <Text children={service.descripcion} color="primary.main" size="14px" />
            </Box>

            {/* Tiempo */}
            <Box sx={{ background: linearDegraded, borderRadius: '12px', p: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
              <Text children="Tiempo de Consulta" color="white" size="14px" align="center" sx={{ mb: 1, display: 'block' }} />
              <Text children={service.tiempo} color="primary.main" size="14px" align="center" />
            </Box>

          </Box>
        </Grid>
      </Grid>

      {/* Botones */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 4 }, mt: 1, flexWrap: 'wrap' }}>
        <MainButton 
          size={{ xs: '14px', md: '16px' }} 
          onClick={() => onEdit(service)} 
          sx={{ backgroundColor: '#ffb74d', display: 'flex', gap: 1, alignItems: 'center' }}
        >
          <EditIcon fontSize="small" /> Editar información
        </MainButton>

        <MainButton 
          size={{ xs: '14px', md: '16px' }} 
          sx={{ backgroundColor: '#ffb74d', display: 'flex', gap: 1, alignItems: 'center' }}
          onClick={handleOpenDeleteDialog} 
        >
          <CloseIcon fontSize="medium" sx={{ fontWeight: 'bold' }} /> Eliminar servicio

        </MainButton>
      </Box>
      <BaseDialog
        id="delete-service"
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title={"Advertencia"}
        icon={<AdvertismentIcon/>}
        content={
        <> 
          Está a punto de borrar el servicio: 
          <br/><b>{service.nombre}<br /></b>
          ¿Desea continuar?
        </>}
      />
    </Box>
  );
};

export default ServiceBody;