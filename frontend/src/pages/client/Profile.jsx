// React
import React, { useState } from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Utils
import { toastSuccess } from '@/utils/notify';

// ************** componentes propios :3 **************
// |  common
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';
import BaseDialog from '@/components/common/BaseDialog';
// |  formulario
import TextInput from '@/components/form/TextInput';
import DateInput from '@/components/form/DateInput';
import GenderSelect from '@/components/form/GenderSelect';
import PasswordInput from '@/components/form/PasswordInput';
// |  iconos
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

function Profile() {
  // <--------------- ESTADOS --------------->
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  // <--------------- FUNCIONES --------------->

  // Funcion boton guardar perfil
  const handleSaveProfile = () => {
    setIsSaveDialogOpen(true);
  };

  // Funcion dialogo
  const handleCloseDialog = (hasAccepted) => {
    setIsSaveDialogOpen(false);
    if (hasAccepted) {
      toastSuccess('Perfil actualizado correctamente.', 'profile-save-toast');
    }
  };

  // <--------------- RENDER --------------->
  return (
    <>
      <Box
        sx={{
          py: { xs: 2, md: 5 },
          px: { xs: 2, md: 5 },
          width: '95%',
          maxWidth: '1000px',
          mx: 'auto',
        }}
      >
        {/* Titulo */}
        <Box sx={{ px: 3 }}>
          <Title children='Editar perfil' color='text.primary' align='center' />
        </Box>

        {/* Formulario */}
        <Box
          sx={{
            mx: { xs: 0, md: 10 },
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Nombre */}
          <TextInput label='Nombre' placeholder='Ingrese su nombre' />

          <Grid container spacing={2}>
            {/* Fecha y correo */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 3, md: 2 },
              }}
            >
              {/* Fecha nacimiento */}
              <DateInput></DateInput>

              {/* Correo */}
              <TextInput
                label='Correo electrónico'
                type='email'
                placeholder='Ingrese su correo'
              />
            </Grid>

            {/* Sexo y telefono */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  gap: 2,
                  alignItems: 'flex-end',
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                }}
              >
                {/* Sexo */}
                <Grid sx={{ width: { xs: '35%', md: '100%' } }}>
                  <GenderSelect height={{ xs: '62px', md: '85px' }} />
                </Grid>

                {/* Numero telefonico */}
                <Grid sx={{ flexGrow: 1, width: { xs: '60%', md: '100%' } }}>
                  <TextInput
                    label='Número telefónico'
                    type='number'
                    placeholder='Ej: 8101010011'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Contenedor contrasenas */}
          <Grid container spacing={2}>
            {/* Coontrasena */}
            <Grid size={{ xs: 12, md: 6 }}>
              <PasswordInput></PasswordInput>
            </Grid>

            {/* Confirmar contrasena */}
            <Grid size={{ xs: 12, md: 6 }}>
              <PasswordInput label='Confirmar contraseña'></PasswordInput>
            </Grid>
          </Grid>
        </Box>

        {/* Boton guardar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            m: 2,
          }}
        >
          <MainButton onClick={handleSaveProfile} children={'Guardar'} />
        </Box>
      </Box>

      {/* Dialogo */}
      <BaseDialog
        id='save-client-data'
        open={isSaveDialogOpen}
        onClose={handleCloseDialog}
        title={'Advertencia'}
        icon={<AdvertismentIcon />}
        content={
          <>
            {' '}
            Está a punto de cambiar sus datos personales <br />{' '}
            <b>¿Desea continuar?</b>
          </>
        }
      />
    </>
  );
}
export default Profile;
