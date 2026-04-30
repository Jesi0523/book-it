// React
import React, { useState, useEffect } from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Utils
import { toastSuccess, toastError } from '@/utils/notify';

// API
import { getPerfil } from '@/api/usuarios.api';

// ************** componentes propios :3 **************
// |  common
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';
import BaseDialog from '@/components/common/BaseDialog';
import Loader from '@/components/common/Loader';
import ErrorScreen from '@/components/common/ErrorScreen';
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
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    fechaNacimiento: '',
    sexo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  // <--------------- DERIVADOS --------------->

  // GET perfil
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setServerError(false);

      const response = await getPerfil();

      if (response.ok) {
        let sexoMapeado = '';
        if (response.sexo) {
          sexoMapeado = response.sexo.toLowerCase() === 'masculino' ? 'M' : 'F';
        }

        const fetchedData = {
          nombre: response.nombre || '',
          correo: response.correo || '',
          fechaNacimiento: response.fechaNacimiento
            ? response.fechaNacimiento.split('T')[0]
            : '',
          sexo: sexoMapeado,
          telefono: response.telefono || '',
          password: '',
          confirmPassword: '',
        };

        setFormData(fetchedData);
        setOriginalData(fetchedData);
      }
    } catch (error) {
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // <--------------- EFFECTS --------------->
  useEffect(() => {
    fetchProfileData();
  }, []);

  // <--------------- FUNCIONES --------------->
  // Manejo de cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Funcion para activar el modo editar
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Funcion para cancelar cambios
  const handleCancelEdit = () => {
    if (originalData) {
      setFormData(originalData); 
    }
    setIsEditing(false);
  };

  // Funcion boton guardar perfil
  const handleSaveProfile = () => {
    setIsSaveDialogOpen(true);
  };

  // Funcion dialogo
  const handleCloseDialog = (hasAccepted) => {
    setIsSaveDialogOpen(false);
    if (hasAccepted) {
      toastSuccess('Perfil actualizado correctamente.', 'profile-save-toast');
      setIsEditing(false);
    }
  };

  // <--------------- RENDER --------------->
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader height='auto' />
      </Box>
    );
  }


  if (serverError) {
    return (
      <ErrorScreen
        onRetry={fetchProfileData}
        offsetMobile='64px'
        offsetDesktop='64px'
      />
    );
  }

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
          <TextInput
            label='Nombre'
            name='nombre'
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder='Ingrese su nombre'
            disabled={!isEditing}
          />

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
              <DateInput
                name='fechaNacimiento'
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              {/* Correo */}
              <TextInput
                label='Correo electrónico'
                name='correo'
                type='email'
                value={formData.correo}
                onChange={handleInputChange}
                placeholder='Ingrese su correo'
                disabled={!isEditing}
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
                  <GenderSelect
                    height={{ xs: '62px', md: '85px' }}
                    name='sexo'
                    value={formData.sexo}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, sexo: value }))
                    }
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Numero telefonico */}
                <Grid sx={{ flexGrow: 1, width: { xs: '60%', md: '100%' } }}>
                  <TextInput
                    label='Número telefónico'
                    name='telefono'
                    type='number'
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder='Ej: 8101010011'
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Contenedor contrasenas */}
          {isEditing && (
            <Grid container spacing={2}>
              {/* Coontrasena */}
              <Grid size={{ xs: 12, md: 6 }}>
                <PasswordInput
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Nueva contraseña'
                  disabled={!isEditing}
                />
              </Grid>

              {/* Confirmar contrasena */}
              <Grid size={{ xs: 12, md: 6 }}>
                <PasswordInput
                  label='Confirmar contraseña'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='Confirme contraseña'
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Botones de acción */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            gap: 3,
            m: 2,
            mt: 4,
          }}
        >
          {!isEditing ? (
            <MainButton onClick={handleEditClick}>Editar datos</MainButton>
          ) : (
            <>
              <MainButton
                onClick={handleCancelEdit}
                sx={{
                  backgroundColor: 'transparent',
                  color: 'primary.light',
                  border: '2px solid',
                  borderColor: 'primary.light',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                }}
              >
                Cancelar
              </MainButton>
              <MainButton onClick={handleSaveProfile}>Guardar</MainButton>
            </>
          )}
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
