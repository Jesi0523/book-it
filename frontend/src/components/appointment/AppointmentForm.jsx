import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// ************** componentes propios :3 **************
// |  common
import Title from '@/components/common/Title';
import Calendar from '@/components/common/Calendar';
import MainButton from '@/components/common/MainButton';
import Text from '@/components/common/Text';
import InfoDialog from '@/components/common/InfoDialog';
// | formulario
import Combobox from '@/components/form/Combobox';
import TextInput from '@/components/form/TextInput';
import GenderSelect from '@/components/form/GenderSelect';

// ************** media dummy **************
// |  Imagenes
import photo from '@/assets/dummy/perfil-1.jpg';
import photo2 from '@/assets/dummy/perfil-2.jpg';
import photo3 from '@/assets/dummy/perfil-3.jpg';
// |  Datos
const servicesDummy = [
  'Servicio super hyper mega largo para pruebas :)',
  'Servicio 1',
  'Servicio 2',
  'Servicio 3',
  'Servicio 4',
  'Servicio 5',
];
const employsDummy = [
  { name: 'Oliver Hansen', pfp: photo },
  { name: 'Van Henry', pfp: photo2 },
  {
    name: 'Teodora Vicenta de la Purísima Concepción de la Inmaculada Trinidad Villavicencio',
    pfp: photo3,
  },
];
const hoursDummy = [
  '09:00-10:00',
  '10:30-11:30',
  '12:00-13:00',
  '13:00-14:00',
  '15:00-16:00',
];
// ****************************

function AppointmentForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSchedule = () => {
    setOpenSuccess(true);
  };

  const handleCloseDialog = () => {
    setOpenSuccess(false);

    if (location.pathname === '/admin/book-appointment') {
      navigate('/admin/appointment-calendar');
    } else {
      navigate('/my-appointments');
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 2, md: 5 },
        px: { xs: 1, md: 0 },
        width: '95%',
        maxWidth: '1050px',
        mx: 'auto',
      }}
    >
      <Box sx={{ px: 3 }}>
        <Title children='Agenda tu cita' color='text.primary' align='center' />
      </Box>

      {/* Agendar cita */}
      <Grid container sx={{ height: '100%', p: 2 }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Calendar />
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            p: { xs: 0.5, md: 5 },
            py: { xs: 2, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: 3,
              alignItems: 'flex-end',
            }}
          >
            {/* Seleccionar servicio */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minWidth: 0,
              }}
            >
              <Text
                children='Selecciona un servicio'
                color='primary.main'
                size='20'
              />
              <Box
                sx={{
                  width: '100%',
                  '& .MuiFormControl-root': { m: 0, width: '100%' },
                }}
              >
                <Combobox
                  array={servicesDummy}
                  placeholder='Elige un servicio'
                />
              </Box>
            </Box>

            {/* Costo */}
            <Box
              sx={{
                width: '100px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'right' }}>
                <Text children='Costo' color='primary.main' size='20' />
              </Box>
              <Box
                sx={{
                  background: (theme) =>
                    theme.customGradients.collapsableHeader,
                  height: '56px',
                  width: '100%',
                  borderRadius: '8px',
                  border: (theme) => theme.palette.customBorders.form,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                $$$$
              </Box>
            </Box>
          </Box>

          {/* Empleado */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
            }}
          >
            <Text children='Empleados' color='primary.main' size='20' />
            <Box
              sx={{
                width: '100%',
                '& .MuiFormControl-root': { m: 0, width: '100%' },
              }}
            >
              <Combobox
                array={employsDummy}
                hasImage={true}
                placeholder='Elige un empleado'
              />
            </Box>
          </Box>

          {/* Horarios */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
            }}
          >
            <Text
              children='Horarios disponibles'
              color='primary.main'
              size='20'
            />
            <Box
              sx={{
                width: '100%',
                '& .MuiFormControl-root': { m: 0, width: '100%' },
              }}
            >
              <Combobox array={hoursDummy} placeholder='Elige un horario' />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Datos del cliente */}
      <Box sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
        <Title
          children='Datos del cliente'
          size='18'
          textTransform='capitalize'
        ></Title>
        <Box
          sx={{
            p: { xs: 1.5, md: 4 },
            my: 3,
            background: (theme) => theme.customGradients.collapsableHeader,
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 }, // Separación entre la Fila 1 y la Fila 2
          }}
        >
          {/* --- FILA 1: Nombre, Edad, Teléfono --- */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextInput
                label='Nombre Completo'
                placeholder='Ingrese su nombre'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>

            <Grid size={{ xs: 4, md: 2 }}>
              <TextInput
                label='Edad'
                placeholder='Ej: 18'
                type='number'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
                sx={{
                  // Rescate para la Edad: Mantenemos el padding arriba/abajo,
                  // pero reducimos drásticamente los lados (a 5px) para que quepa "Ej: 18"
                  '& .MuiInputBase-input': {
                    padding: '28px 5px 10px 5px !important',
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 8, md: 5 }}>
              <TextInput
                label='Número telefónico'
                type='number'
                placeholder='Ej: 8101010011'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>
          </Grid>

          {/* --- FILA 2: Sexo, Correo (CENTRADA) --- */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Esto centra perfectamente toda la fila
            }}
          >
            <Grid size={{ xs: 12, md: 3 }}>
              <GenderSelect
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label='Correo electrónico'
                type='email'
                placeholder='Ingrese su correo'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Confirmación y muestra de datos */}
      <Box sx={{ px: 5 }}>
        <Title
          children='Se agendará una cita con la siguiente fecha:'
          size='16'
          textTransform='capitalize'
          align='center'
        />
        <Box
          sx={{
            p: { xs: 1, md: 3 },
            my: 3,
            background: (theme) => theme.customGradients.collapsableHeader,
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Text children='Febrero 11, 2026' size='18' align='center' />
          <Text children='Horario: 9:00 a 10:00' size='18' align='center' />
          <Text children='Empleado 1' size='16' align='center' />
        </Box>
        <Box
          component='hr'
          sx={{
            border: 'none',
            height: '1px',
            backgroundColor: 'divider',
          }}
        />
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Title
            children='Total a pagar: $$$$'
            size='20'
            textTransform='capitalize'
            align='center'
          />
          <Text
            children='*El pago de la cita se realiza en persona.'
            size='16'
            align='center'
            color='text.secondary'
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <MainButton onClick={handleSchedule}>Agendar</MainButton>
      </Box>

      <InfoDialog
        open={openSuccess}
        onClose={handleCloseDialog}
        title='¡Cita Agendada!'
        content='Tu cita se ha registrado correctamente.'
      />
    </Box>
  );
}

export default AppointmentForm;
