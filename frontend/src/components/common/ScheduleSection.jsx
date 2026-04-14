import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Media queries para el responsive
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Componentes propios
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import BaseDialog from '@/components/common/BaseDialog'

// Iconos
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

// Dias de la semana
const diasSemana = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

// <----------- Funciones ----------->

const timeToMins = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const minsToTime = (mins) => {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const generarBloquesRango = (startMins, endMins) => {
  const bloques = [];
  const startAjustado = Math.floor(startMins / 30) * 30;
  const endAjustado = Math.ceil(endMins / 30) * 30;

  for (let m = startAjustado; m < endAjustado; m += 30) {
    bloques.push(`${minsToTime(m)}-${minsToTime(m + 30)}`);
  }
  return bloques;
};

const opcionesTiempo = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

const ScheduleSection = ({ scheduleMap, setScheduleMap }) => {
  // Responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Estados
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  // Const para el modal de confirmación -> si elimina el horario de un día
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleOpenDeleteDialog = () => { setOpenDeleteDialog(true); };
  const handleCloseDeleteDialog = (hasAccepted) => 
  {
    setOpenDeleteDialog(false);
    if(hasAccepted){handleLimpiarDia()};
  };



  // <-------- UseEffects -------->
  useEffect(() => {
    const bloquesDia = scheduleMap[selectedDay] || [];
    if (bloquesDia.length > 0) {
      let minMins = Infinity;
      let maxMins = -Infinity;
      bloquesDia.forEach((bloque) => {
        const [start, end] = bloque.split('-');
        const sMins = timeToMins(start);
        const eMins = timeToMins(end);
        if (sMins < minMins) minMins = sMins;
        if (eMins > maxMins) maxMins = eMins;
      });
      setStartTime(minsToTime(minMins));
      setEndTime(minsToTime(maxMins));
    } else {
      setStartTime('09:00');
      setEndTime('17:00');
    }
  }, [selectedDay, scheduleMap]);

  // Funciones
  const bloquesDinamicos = useMemo(() => {
    let minGlobal = Infinity;
    let maxGlobal = -Infinity;
    let tieneHoras = false;

    Object.values(scheduleMap).forEach((bloquesDelDia) => {
      if (bloquesDelDia && bloquesDelDia.length > 0) {
        tieneHoras = true;
        bloquesDelDia.forEach((bloque) => {
          const [start, end] = bloque.split('-');
          const sMins = timeToMins(start);
          const eMins = timeToMins(end);
          if (sMins < minGlobal) minGlobal = sMins;
          if (eMins > maxGlobal) maxGlobal = eMins;
        });
      }
    });

    if (!tieneHoras) return [];
    return generarBloquesRango(minGlobal, maxGlobal);
  }, [scheduleMap]);

  const handleAplicar = () => {
    const startMins = timeToMins(startTime);
    const endMins = timeToMins(endTime);
    if (startMins >= endMins) return;
    const nuevosBloques = generarBloquesRango(startMins, endMins);
    setScheduleMap((prev) => ({ ...prev, [selectedDay]: nuevosBloques }));
  };

  const handleLimpiarDia = () => {
    setScheduleMap((prev) => ({ ...prev, [selectedDay]: [] }));
  };

  const diasAMostrar = isMobile ? [selectedDay] : diasSemana;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Seccion superior */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 3,
          mb: 4,
          width: '100%',
        }}
      >
        {/* Titulo y dia */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          {/* Titulo */}
          <Text children='Horario laboral:' color='primary.main' size='18px' />

          {/* Dia */}
          <Select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            size='small'
            MenuProps={{
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
            }}
            sx={{
              minWidth: '130px',
              backgroundColor: '#1b1c37',
              color: 'white',
              borderRadius: '8px',
              '& fieldset': { border: 'none' },
              '& .MuiSvgIcon-root': { color: '#ffb74d' },
            }}
          >
            {diasSemana.map((dia) => (
              <MenuItem key={dia} value={dia}>
                {dia}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Horas y Botones */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          {/* Rango de horas */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            {/* Hora 1 */}
            <Select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              size='small'
              sx={{
                width: '92px',
                backgroundColor: '#1b1c37',
                borderRadius: '8px',
                color: 'white',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                  textAlign: 'center',
                },
                '& .MuiSvgIcon-root': { color: '#ffb74d' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1b1c37',
                    color: 'white',
                    maxHeight: 300,
                  },
                },
              }}
            >
              {opcionesTiempo.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>

            <Text children='hasta' color='white' size='16px' />

            {/* Hora 2 */}
            <Select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              size='small'
              sx={{
                width: '92px',
                backgroundColor: '#1b1c37',
                borderRadius: '8px',
                color: 'white',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                  textAlign: 'center',
                },
                '& .MuiSvgIcon-root': { color: '#ffb74d' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1b1c37',
                    color: 'white',
                    maxHeight: 300,
                  },
                },
              }}
            >
              {opcionesTiempo.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Boton aplicar y eliminar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Aplicar */}
            <MainButton
              size={{ xs: '14px', md: '14px' }}
              onClick={handleAplicar}
              sx={{
                backgroundColor: '#ffb74d',
                color: '#000',
                display: 'flex',
                gap: 1,
                m: 0,
              }}
            >
              <CheckIcon fontSize='small' /> Aplicar
            </MainButton>

            {/* Eliminar */}
            <Tooltip title='Limpiar horario del dia seleccionado'>
              <IconButton
                onClick={handleOpenDeleteDialog}
                sx={{
                  color: '#ffb74d',
                  border: '1px solid rgba(255, 183, 77, 0.5)',
                  borderRadius: '50%',
                  p: '9px',
                  flexShrink: 0,
                  '&:hover': { backgroundColor: 'rgba(255, 183, 77, 0.1)' },
                }}
              >
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Horario dinamico */}
      {bloquesDinamicos.length === 0 ? (
        <Box
          sx={{
            background: '#171836',
            borderRadius: '12px',
            border: `1px solid #060511`,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Text
            children='No hay horarios asignados aún. Selecciona un día y aplica un horario.'
            color='rgba(255,255,255,0.5)'
            size='14px'
            align='center'
          />
        </Box>
      ) : (
        <Box
          sx={{
            overflowX: 'auto',
            width: '100%',
            borderRadius: '12px',
            border: `1px solid #060511`,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `100px repeat(${diasAMostrar.length}, minmax(80px, 1fr))`,
              minWidth: isMobile ? '100%' : '700px',
            }}
          >
            {/* Fila de dias */}
            <Box
              sx={{
                background: '#171836',
                borderBottom: `1px solid #060511`,
                borderRight: `1px solid #060511`,
              }}
            />
            {diasAMostrar.map((dia) => (
              <Box
                key={dia}
                sx={{
                  background: '#171836',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: `1px solid #060511`,
                  borderRight: `1px solid #060511`,
                }}
              >
                <Text children={dia} color='primary.main' size='12px' />
              </Box>
            ))}

            {/* Filas de horas */}
            {bloquesDinamicos.map((bloque) => (
              <React.Fragment key={bloque}>
                {/* Columna de la hora */}
                <Box
                  sx={{
                    background: '#171836',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: `1px solid #060511`,
                    borderRight: `1px solid #060511`,
                  }}
                >
                  <Text
                    children={bloque}
                    color='primary.main'
                    size='12px'
                    align='center'
                  />
                </Box>

                {/* Celdas */}
                {diasAMostrar.map((dia) => {
                  const isSelected =
                    scheduleMap[dia] && scheduleMap[dia].includes(bloque);
                  return (
                    <Box
                      key={`${dia}-${bloque}`}
                      sx={{
                        background: isSelected
                          ? 'linear-gradient(180deg, #6c74cc 0%, #4f58a3 100%)'
                          : '#171836',
                        borderBottom: `1px solid #060511`,
                        borderRight: `1px solid #060511`,
                        transition: 'background 0.2s',
                      }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}

      {/* Modal de confirmación */}
       <BaseDialog
          id="delete-schedule"
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title={"Advertencia"}
          fontSizeContent={18}
          icon={<AdvertismentIcon/>}
          content={
            <>
              Está a punto de eliminar el horario del día:<br />
              <b>{selectedDay}</b><br />
              ¿Desea continuar?
          </>}
        />
    </Box>
  );
};

export default ScheduleSection;
