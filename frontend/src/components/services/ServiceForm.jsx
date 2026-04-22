import React, { useState, useEffect } from 'react';

// Utils
import { toastSuccess } from '@/utils/notify';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

// Iconos
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import TextInput from '@/components/form/TextInput';

// <----------- CONSTANTE ----------->
// Opciones para la duracion de un servicio hasta 6 horas max
const opcionesDuracion = Array.from(
  { length: 12 },
  (_, i) => `${(i + 1) * 30} minutos`,
);

const ServiceForm = ({ service, onCancel, onSave, isEditing }) => {
  // <--------------- ESTADOS --------------->
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    tiempo: '30 minutos',
    imagen: null,
    archivoFisico: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  // <--------------- EFFECTS --------------->
  useEffect(() => {
    if (service && service.id !== 'nuevo') {
      setFormData({
        nombre: service.nombre || '',
        precio: service.precio || '',
        descripcion: service.descripcion || '',
        tiempo: service.tiempo || '30 minutos',
        imagen: service.imagen || null,
        archivoFisico: null,
      });
    } else {
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        tiempo: '30 minutos',
        imagen: null,
        archivoFisico: null,
      });
    }
  }, [service]);

  // <--------------- DERIVADO --------------->
  const opcionesSeguras = [...opcionesDuracion];
  if (formData.tiempo && !opcionesSeguras.includes(formData.tiempo)) {
    opcionesSeguras.unshift(formData.tiempo);
  }

  // <--------------- FUNCIONES --------------->

  // Llena los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Llena la foto
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imagen: photoUrl,
        archivoFisico: file,
      }));
    }
  };

  // Boton guardar
  const handleSubmit = () => {
    if (isSaving) return;
    setIsSaving(true);

    onSave({ ...service, ...formData });

    const isNew = service.id === 'nuevo';

    toastSuccess(
      isNew
        ? 'Servicio agregado correctamente.'
        : 'Servicio actualizado correctamente.',
      'service-save-toast',
    );

    setIsSaving(false);
  };

  // <--------------- RENDER --------------->
  return (
    <Box
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}
    >
      <Grid container spacing={4}>
        {/* Imagen y boton cargar foto */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {/* Foto */}
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
              {formData.imagen ? (
                <img
                  src={formData.imagen}
                  alt='Preview'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <InsertPhotoIcon
                  sx={{ fontSize: 80, color: 'white', opacity: 0.8 }}
                />
              )}
            </Box>

            {/* Cargar foto */}
            <MainButton
              component='label'
              fullWidth
              size={{ xs: '14px', md: '16px' }}
              sx={{
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '50px',
              }}
            >
              <UploadFileIcon fontSize='small' /> Subir foto
              <input
                type='file'
                accept='image/*'
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </MainButton>
          </Box>
        </Grid>

        {/* Nombre y descripcion */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              height: '100%',
            }}
          >
            {/* Nombre */}
            <TextInput
              label='Nombre'
              name='nombre'
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder='Ejemplo'
            />

            {/* Descripcion */}
            <TextInput
              label='Descripción'
              name='descripcion'
              value={formData.descripcion}
              onChange={handleInputChange}
              multiline
              placeholder='Ejemplo'
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  borderRadius: '24px',
                },
              }}
            />
          </Box>
        </Grid>

        {/* Precio */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            label='Precio'
            name='precio'
            value={formData.precio}
            onChange={handleInputChange}
            placeholder='$$$$$$'
          />
        </Grid>

        {/* Duracion del servicio */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextInput
            select
            label='Duración del servicio'
            name='tiempo'
            value={formData.tiempo}
            onChange={handleInputChange}
            SelectProps={{
              sx: { '& .MuiSvgIcon-root': { color: 'primary.light' } },
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: (theme) =>
                      theme.palette.background.serviceChip,
                    color: 'white',
                    '& .MuiMenuItem-root:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.background.menuHover,
                    },
                    '& .Mui-selected': {
                      backgroundColor: (theme) =>
                        `${theme.palette.background.menuSelected} !important`,
                    },
                  },
                },
              },
            }}
          >
            {opcionesSeguras.map((opcion) => (
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </TextInput>
        </Grid>
      </Grid>

      {/* Boton guardar */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <MainButton
          size={{ xs: '16px', md: '18px' }}
          onClick={handleSubmit}
          disabled={isSaving}
          sx={{
            backgroundColor: isSaving
              ? 'action.disabledBackground'
              : 'primary.light',
            color: isSaving ? 'action.disabled' : 'primary.contrastText',
            px: 8,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Guardar
        </MainButton>
      </Box>
    </Box>
  );
};

export default ServiceForm;
