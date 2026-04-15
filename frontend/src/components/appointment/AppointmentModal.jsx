import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import toast from 'react-hot-toast';

// Iconos
import CloseIcon from '@mui/icons-material/Close';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';
import BaseDialog from '@/components/common/BaseDialog';

const AppointmentModal = ({ open, onClose, appointment }) => {
  const [estadoCita, setEstadoCita] = useState('Pendiente');
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleOpenCancel = () => setOpenCancelDialog(true);
  const handleCloseCancel = (hasAccepted) => {
    setOpenCancelDialog(false);

    if (hasAccepted) {
      toast.success('La cita ha sido cancelada.', {
        id: 'cancel-appointment-toast',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#1b1c37',
          color: '#fff',
          border: '1px solid #757575',
        },
        iconTheme: {
          primary: '#757575',
          secondary: '#fff',
        },
      });

      onClose();
    }
  };

  useEffect(() => {
    if (appointment) {
      setEstadoCita(
        appointment.status?.name || appointment.status || 'Pendiente',
      );
    }
  }, [appointment]);

  if (!appointment) return null;

  const colorTarjeta = '#1b1c37';
  const colorNaranja = '#ffb74d';

  const opcionesEstado = ['Pendiente', 'Completada', 'Cancelada', 'No asistió'];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#060511',
          backgroundImage: 'none',
          borderRadius: '16px',
          p: { xs: 3, md: 4 },
          position: 'relative',
          border: '1px solid #787ff6',
        },
      }}
    >
      {/* Titulo y boton de cerrar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 2,
        }}
      >
        <Title
          children={appointment.title || 'SERVICIO 1'}
          color='white'
          size={{ xs: '24px', md: '32px' }}
        />
        <IconButton
          onClick={onClose}
          sx={{
            backgroundColor: colorNaranja,
            color: '#000',
            '&:hover': { backgroundColor: '#ffa726' },
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <CloseIcon sx={{ fontSize: '24px', strokeWidth: 2 }} />
        </IconButton>
      </Box>

      {/* Fecha y estado de la cita */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${colorNaranja}`,
            pb: 0.5,
            width: 'fit-content',
          }}
        >
          <Text
            children={appointment.dateStr || 'Febrero 11, 2026 9:00 a 10:00.'}
            color={colorNaranja}
            size='16px'
          />
        </Box>

        <Select
          value={estadoCita}
          onChange={(e) => setEstadoCita(e.target.value)}
          IconComponent={() => (
            <ArrowDropDownIcon
              sx={{ color: colorNaranja, mr: 1, pointerEvents: 'none' }}
            />
          )}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <QueryBuilderIcon sx={{ color: 'white', fontSize: '20px' }} />
              <Text children='Estado:' color='white' size='16px' />
              <Text children={selected} color={colorNaranja} size='16px' />
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#00011e',
                color: 'white',
                borderRadius: '12px',
                mt: 1,
                border: '1px solid rgba(255,255,255,0.1)',
                '& .MuiMenuItem-root': {
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '15px',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '& .MuiMenuItem-root.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
                  color: colorNaranja,
                  fontWeight: 'bold',
                },
              },
            },
          }}
          sx={{
            backgroundColor: colorTarjeta,
            borderRadius: '50px',
            width: 'fit-content',
            '& .MuiSelect-select': {
              py: 1,
              pl: 2,
              pr: '1px !important',
              display: 'flex',
              alignItems: 'center',
            },
            '& fieldset': { border: 'none' },
          }}
        >
          {opcionesEstado.map((opcion) => (
            <MenuItem key={opcion} value={opcion}>
              {opcion}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Empleado y precio */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={appointment.employ?.foto}
            sx={{ width: 40, height: 40 }}
          />
          <Text
            children={appointment.employ?.name || 'Empleado 1'}
            color='white'
            size='18px'
          />
        </Box>
        <Box>
          <SimpleInfoDisplay
            title='Costo: '
            text={appointment.price || '$$$$'}
            align='center'
            width='fit-content'
            textWeight='bold'
            titleWeight='normal'
            titleSize='18px'
            textSize='20px'
            titleColor='white'
            textColor='white'
            background={colorTarjeta}
            border='none'
          />
        </Box>
      </Box>

      {/* Datos del cliente */}
      <Box sx={{ mt: 1 }}>
        <Text
          children='Datos del cliente'
          color={colorNaranja}
          size='20'
          fontWeight='bold'
        />

        <Box
          sx={{
            p: 0,
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Grid container spacing={{ xs: 2, md: 5 }}>
            <Grid size={{ xs: 12, md: 9 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Text
                  children='Nombre Completo'
                  color='primary.main'
                  size='14'
                />
                <SimpleInfoDisplay
                  title={
                    appointment.clientData?.name ||
                    appointment.client ||
                    'John Doe'
                  }
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Text children='Edad' color='primary.main' size='14' />
                <SimpleInfoDisplay
                  title={appointment.clientData?.age || '25'}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 2, md: 5 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Text children='Sexo' color='primary.main' size='14' />
                <SimpleInfoDisplay
                  title={appointment.clientData?.gender || 'Masculino'}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Text
                  children='Correo electrónico'
                  color='primary.main'
                  size='14'
                />
                <SimpleInfoDisplay
                  title={appointment.clientData?.mail || 'jonD@gmail.com'}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={{ xs: 2, md: 5 }}
            sx={{ display: 'flex', alignItems: 'flex-end' }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Text
                  children='Número telefónico'
                  color='primary.main'
                  size='14'
                />
                <SimpleInfoDisplay
                  title={appointment.clientData?.phoneNumber || '81 3161 9950'}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                }}
              >
                <MainButton
                  onClick={handleOpenCancel}
                  size={{ xs: '14px', md: '16px' }}
                  sx={{
                    mt: 1,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    backgroundColor: colorNaranja,
                    color: '#000',
                  }}
                >
                  <CloseIcon /> Cancelar cita
                </MainButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <BaseDialog
        open={openCancelDialog}
        onClose={handleCloseCancel}
        title={'Advertencia'}
        icon={<AdvertismentIcon />}
        content={
          <>
            {' '}
            Está a punto de cancelar una cita <br />
            <b>¿Desea continuar?</b>
          </>
        }
      />
    </Dialog>
  );
};

export default AppointmentModal;
