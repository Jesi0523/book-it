import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// ************** componentes propios :3 **************
// |  layout
import ClientLayout from '@/layouts/ClientLayout';
// |  common
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';
import BaseDialog from '@/components/common/BaseDialog';
import InfoDialog from '@/components/common/InfoDialog';
// |  formulario
import TextInput from '@/components/form/TextInput';
import DateInput from '@/components/form/DateInput';
import GenderSelect from '@/components/form/GenderSelect';
import PasswordInput from '@/components/form/PasswordInput';
// |  iconos
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

function Profile() {
  const navigate = useNavigate();

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openInfoDialog, setOpenInfoDialog] = React.useState(false);

  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSaveDialog = (hasAccepted) => {
    setOpenSaveDialog(false);
    if (hasAccepted) {
      setOpenInfoDialog(true);
    }
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
    navigate('/login');
    //NOTA: lo moví a log in porque un profe había mencionado que luego de hacer modificaciones
    // sacaramos al usuario para que volviera a iniciar sesión por seguridad :3
  };

  return (
    <ClientLayout>
      <Box
        sx={{
          py: { xs: 2, md: 5 },
          px: { xs: 2, md: 5 },
          width: '95%',
          maxWidth: '1000px',
          mx: 'auto',
        }}
      >
        <Box sx={{ px: 3 }}>
          <Title children='Editar perfil' color='text.primary' align='center' />
        </Box>

        <Box
          sx={{
            mx: { xs: 0, md: 10 },
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextInput label='Nombre' placeholder='Ingrese su nombre' />

          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 3, md: 2 },
              }}
            >
              <DateInput></DateInput>
              <TextInput
                label='Correo electrónico'
                type='email'
                placeholder='Ingrese su correo'
              />
            </Grid>

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
                <Grid sx={{ width: { xs: '35%', md: '100%' } }}>
                  <GenderSelect height={{ xs: '62px', md: '85px' }} />
                </Grid>

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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <PasswordInput></PasswordInput>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PasswordInput label='Confirmar contraseña'></PasswordInput>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            m: 2,
          }}
        >
          <MainButton onClick={handleOpenSaveDialog} children={'Guardar'} />
        </Box>
      </Box>

      <BaseDialog
        id='save-client-data'
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
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

      <InfoDialog
        open={openInfoDialog}
        onClose={handleCloseInfoDialog}
        title="Perfil Actualizado"
        content="Tus datos se guardaron correctamente. Por seguridad, es necesario que inicies sesión de nuevo con tus credenciales actualizadas."
      />
      
    </ClientLayout>
  );
}
export default Profile;
