import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import TextInput from '@/components/form/TextInput';

// Iconos
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CompanyDataSection = ({
  formData,
  handleInputChange,
  handleLogoChange,
}) => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}
    >
      <Grid container spacing={4}>
        {/* Logo y boton */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {/* Cuadro del logo */}
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                background: (theme) => theme.customGradients.imagePlaceholder,
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.1)',
              }}
            >
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt='Logo Empresa'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <InsertPhotoIcon
                  sx={{ fontSize: 80, color: 'white', opacity: 0.8 }}
                />
              )}
            </Box>

            {/* Boton subir logo */}
            <MainButton
              component='label'
              fullWidth
              size={{ xs: '14px', md: '16px' }}
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '50px',
              }}
            >
              <UploadFileIcon fontSize='small' /> Subir logo
              <input
                type='file'
                accept='image/*'
                onChange={handleLogoChange}
                style={{ display: 'none' }}
              />
            </MainButton>
          </Box>
        </Grid>

        {/* Seccion derecha */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
              gap: { xs: 4, md: 0 },
            }}
          >
            <TextInput
              label='Nombre'
              name='nombre'
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder='Ejemplo'
            />

            <TextInput
              label='Correo electrónico'
              name='correo'
              type='email'
              value={formData.correo}
              onChange={handleInputChange}
              placeholder='Ejemplo'
            />

            <TextInput
              label='Número telefónico'
              name='telefono'
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder='Ejemplo'
            />
          </Box>
        </Grid>

        {/* Seccion abajo */}
        <Grid size={12}>
          <TextInput
            label='Descripción'
            name='descripcion'
            value={formData.descripcion}
            onChange={handleInputChange}
            multiline
            rows={5}
            placeholder='Ejemplo'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                alignItems: 'flex-start',
              },
            }}
          />
        </Grid>

        <Grid size={12}>
          <TextInput
            label='Slogan'
            name='slogan'
            value={formData.slogan}
            onChange={handleInputChange}
            placeholder='Ejemplo'
          />
        </Grid>

        <Grid size={12}>
          <TextInput
            label='Dirección'
            name='direccion'
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder='Ejemplo'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDataSection;
