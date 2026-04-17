import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

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
  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSaveDialog = (hasAccepted) => {
    setOpenSaveDialog(false);
    if (hasAccepted) {
      toast.success('Perfil actualizado correctamente.', {
        id: 'company-save-toast',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#1b1c37',
          color: '#fff',
          border: '1px solid #4caf50',
        },
        iconTheme: {
          primary: '#4caf50',
          secondary: '#fff',
        },
      });
    }
  };

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

    </>
  );
}
export default Profile;
