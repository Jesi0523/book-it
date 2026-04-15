import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import toast from 'react-hot-toast';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import TextInput from '@/components/form/TextInput';

// Iconos
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Opciones para la duracion de un servicio hasta 6 horas max
const opcionesDuracion = Array.from(
  { length: 12 },
  (_, i) => `${(i + 1) * 30} minutos`,
);

const ServiceForm = ({ service, onCancel, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    tiempo: '30 minutos',
    imagen: null,
    archivoFisico: null,
  });

  const [isSaving, setIsSaving] = useState(false);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = () => {
    if (isSaving) return;
    setIsSaving(true);

    onSave({ ...service, ...formData });

    const isNew = service.id === 'nuevo';

    const isMobile = window.innerWidth <= 900;

    toast.success(
      isNew
        ? 'Servicio agregado correctamente.'
        : 'Servicio actualizado correctamente.',
      {
        id: 'service-save-toast',
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
      },
    );

    setIsSaving(false);
  };

  const opcionesSeguras = [...opcionesDuracion];
  if (formData.tiempo && !opcionesSeguras.includes(formData.tiempo)) {
    opcionesSeguras.unshift(formData.tiempo);
  }

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
                background:
                  'linear-gradient(180deg, #8791eb 0%, #9291d8 50%, #69abca 100%)',
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
                backgroundColor: '#ffb74d',
                color: '#000',
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
              sx: { '& .MuiSvgIcon-root': { color: '#ffb74d' } },
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: '#1b1c37',
                    color: 'white',
                    '& .MuiMenuItem-root:hover': {
                      backgroundColor: 'rgba(255, 183, 77, 0.2)',
                    },
                    '& .Mui-selected': {
                      backgroundColor: 'rgba(255, 183, 77, 0.4) !important',
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
            backgroundColor: isSaving ? '#a9a9a9' : '#ffb74d',
            color: isSaving ? '#666' : '#000',
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
