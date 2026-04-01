import React from 'react';
import Box from '@mui/material/Box';

// Layout
import AdminLayout from '@/layouts/AdminLayout';

// Iconos
import CalendarIcon from '@mui/icons-material/CalendarMonth';

// Componentes propios
import CalendarBoard from '@/components/appointment/CalendarBoard'; 
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';

const AppointmentCalendar = () => {
  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' }, 
            gap: 2,
            mb: 4,
            width: '100%',
            flexGrow: 1 
          }}
        >
          <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}> 
              <Title children="Calendario de citas" size={{ xs: '1.5rem', md: '2.5rem' }} textTransform="uppercase" color='text.primary' align={{ xs: 'center', md: 'left' }} />
          </Box>
          
          <MainButton size={{ xs: '14px', md: '16px' }} href="/adminBookAppointment">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon fontSize="small" />
              Agendar cita
            </Box>
          </MainButton>
        </Box>

        <CalendarBoard />

      </Box>
    </AdminLayout>
  );
};

export default AppointmentCalendar;