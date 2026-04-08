import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';

// Layout
import AdminLayout from '@/layouts/AdminLayout';

// Componentes propios
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import AppointmentsReport from '@/components/reports/AppointmentsReport';
import IncomeReport from '@/components/reports/IncomeReport';
import ServicesReport from '@/components/reports/ServicesReport';
import ProductivityReport from '@/components/reports/ProductivityReport';

// Arregla bug de la libreria recharts
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('width(-1) and height(-1)')
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

const Reports = () => {
  const mesesNombres = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const mesActualIndex = dayjs().month();
  const anioActualNum = dayjs().year();

  const aniosList = Array.from({ length: 10 }, (_, i) =>
    (anioActualNum - 1 + i).toString(),
  );

  //   Estados
  const [activeTab, setActiveTab] = useState(0);
  const [mesFiltro, setMesFiltro] = useState(mesesNombres[mesActualIndex]);
  const [anioFiltro, setAnioFiltro] = useState(anioActualNum.toString());

  const tabs = [
    'Citas por período',
    'Ingresos por período',
    'Servicios más solicitados',
    'Productividad',
  ];

  // Estilos
  const selectMenuProps = {
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
  };

  const selectEstilos = {
    backgroundColor: '#1b1c37',
    color: 'white',
    borderRadius: '50px',
    height: '40px',
    px: 1,
    '& fieldset': { border: 'none' },
    '& .MuiSvgIcon-root': { color: '#ffb74d' },
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          p: { xs: 2, md: 5 },
          width: '100%',
          maxWidth: '1000px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Title
          children='REPORTES'
          size={{ xs: '2rem', md: '3rem' }}
          color='white'
          align='left'
        />

        {/* Navegacion de reportes */}
        <Box
          sx={{
            display: 'flex',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: '0px' },
          }}
        >
          {tabs.map((tab, index) => (
            <Box
              key={index}
              onClick={() => setActiveTab(index)}
              sx={{
                py: 2,
                px: { xs: 2, md: 3 },
                cursor: 'pointer',
                borderBottom:
                  activeTab === index
                    ? '3px solid #ffb74d'
                    : '3px solid transparent',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <Text
                children={tab}
                color={activeTab === index ? 'white' : 'rgba(255,255,255,0.5)'}
                size={16}
                fontWeight={activeTab === index ? 'bold' : 'normal'}
              />
            </Box>
          ))}
        </Box>

        {/* Mes y año */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'center' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text children='Selecciona un mes' color='#ffb74d' size={20} />
            <Select
              value={mesFiltro}
              onChange={(e) => setMesFiltro(e.target.value)}
              MenuProps={selectMenuProps}
              sx={{ ...selectEstilos, minWidth: '140px' }}
            >
              {mesesNombres.map((mes) => (
                <MenuItem key={mes} value={mes}>
                  {mes}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text children='Selecciona un año' color='#ffb74d' size={20} />
            <Select
              value={anioFiltro}
              onChange={(e) => setAnioFiltro(e.target.value)}
              MenuProps={selectMenuProps}
              sx={{ ...selectEstilos, minWidth: '110px' }}
            >
              {aniosList.map((anio) => (
                <MenuItem key={anio} value={anio}>
                  {anio}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Reportes */}
        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <AppointmentsReport mes={mesFiltro} anio={anioFiltro} />
          )}
          {activeTab === 1 && (
            <IncomeReport mes={mesFiltro} anio={anioFiltro} />
          )}
          {activeTab === 2 && (
            <ServicesReport mes={mesFiltro} anio={anioFiltro} />
          )}
          {activeTab === 3 && (
            <ProductivityReport mes={mesFiltro} anio={anioFiltro} />
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Reports;
