import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import TextInput from '@/components/formulario/TextInput';
import DateInput from '@/components/formulario/DateInput';

// Icono
import UploadFileIcon from '@mui/icons-material/UploadFile';

const EmployeeDataSection = ({ formData, handleInputChange, handleDateChange, handlePhotoChange }) => {

  return (
    <Grid container spacing={4}>
      
      {/* Foto y nombre */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Foto */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar
              src={formData.foto}
              sx={{
                width: { xs: 120, md: 160 },
                height: { xs: 120, md: 160 },
                border: `2px solid #787ff6`,
              }}
            />
            <MainButton 
              component="label" 
              size={{ xs: '12px', md: '14px' }} 
              sx={{ backgroundColor: '#ffb74d', color: '#000', display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer' }}
            >
              <UploadFileIcon fontSize="small" /> Subir foto
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </MainButton>
          </Box>

          {/* Nombre */}
          <TextInput
            label='Nombre'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Nombre completo'
          />
        </Box>
      </Grid>

      {/* Correo, fecha y telefono */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          justifyContent: 'space-between',
          gap: { xs: 4, md: 0 } 
        }}>
          
          {/* Correo */}
          <TextInput
            label='Correo electrónico'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            type='email'
            placeholder='ejemplo@gmail.com'
          />

          {/* Fecha */}
          <DateInput
            label='Fecha de nacimiento'
            name='birthdate'
            value={formData.birthdate}
            onChange={handleDateChange}
          />

          {/* Telefono */}
          <TextInput
            label='Número telefónico'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            placeholder='81 1111 1111'
          />
          
        </Box>
      </Grid>

      {/* Informacion */}
      <Grid size={12}>
        <Box sx={{ mt: 1 }}>
          <TextInput
            label='Información'
            name='info'
            value={formData.info}
            onChange={handleInputChange}
            multiline
            rows={5}
            placeholder='Escriba la información del empleado'
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '16px' }
            }}
          />
        </Box>
      </Grid>

    </Grid>
  );
};

export default EmployeeDataSection;