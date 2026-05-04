// <------------- IMPORTS ------------->
// React
import React, { useState, useEffect, useRef } from 'react';

// API
import { getCitasAdmin } from '@/api/citas.api';

// MUI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// Iconos
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Componentes propios
import CalendarCombobox from '@/components/form/CalendarCombobox';
import CalendarDateInput from '@/components/form/CalendarDateInput';
import AppointmentModal from '@/components/appointment/AppointmentModal';
import Loader from '@/components/common/Loader';

// Utils
import { toastError } from '@/utils/notify';

// <------------- HELPERS ------------->

const diasSemanas = [
  'domingo',
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
];

// Convierte HH:MM a número flotante (08:30 a 8.5)
const parseHora = (horaStr) => {
  const [h, m] = horaStr.split(':').map(Number);
  return h + m / 60;
};

// Horarios dinámicos
const generarHorariosDelDia = (fecha, horarioGlobal) => {
  if (!horarioGlobal || horarioGlobal.length === 0) {
    return { slots: [], horaInicio: 0, horaFin: 0 };
  }

  const nombreDia = diasSemanas[fecha.getDay()];
  const configDia = horarioGlobal.find((h) => h.dia === nombreDia);

  if (!configDia) {
    return { slots: [], horaInicio: 0, horaFin: 0 };
  }

  const horaInicio = parseHora(configDia.horaInicio);
  const horaFin = parseHora(configDia.horaFin);
  const slots = [];

  for (let t = horaInicio; t < horaFin; t += 0.5) {
    const formatearHora = (num) => {
      const h = Math.floor(num);
      const m = num % 1 === 0 ? '00' : '30';
      return `${h < 10 ? '0' + h : h}:${m}`;
    };
    slots.push(`${formatearHora(t)}-${formatearHora(t + 0.5)}`);
  }

  return { slots, horaInicio, horaFin };
};

// ------------------------------------

const CalendarBoard = ({ dbEmpresaHorarios, dbEmpleados }) => {
  // <--------------- CONTEXTO --------------->
  const theme = useTheme();

  // <--------------- REF --------------->
  const scrollRef = useRef(null);

  // <--------------- ESTADOS --------------->
  const [fechaActual, setFechaActual] = useState(new Date());
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date()); // Hora actual
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de la cita
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Cita seleccionada para mostrar al modal

  const [dbCitas, setDbCitas] = useState([]);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  // <--------------- EFFECTS --------------->

  // Efecto para actualizar la hora actual cada minuto para la linea de la hora actual
  useEffect(() => {
    const intervalo = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Efecto que reinicia el scroll horizontal cuando se cambie el filtro de empleados
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [empleadoSeleccionado]);

  // Cargar las citas al cambiar la fecha
  useEffect(() => {
    const fetchCitas = async () => {
      setIsCalendarLoading(true);
      try {
        const fechaFormat = getFormatedDateStr(fechaActual);
        const res = await getCitasAdmin(fechaFormat);

        if (res.ok) {
          const citasFormateadas = res.citas.map((cita) => {
            const idEmpleado =
              cita.empleadoId?._id || cita.empleadoId?.id || cita.empleadoId;

            return {
              id: cita._id,
              empId: idEmpleado, 
              start: cita.horaInicio,
              duracionEnBloques: Math.ceil(
                cita.servicioAgendado.duracionSnapshot / 30,
              ),
              title: cita.servicioAgendado.nombreSnapshot,
              client: cita.datosCliente.nombre,
              timeStr: `${cita.horaInicio} - ${cita.horaFin}`,
              rawData: cita,
            };
          });

          setDbCitas(citasFormateadas);
        }
      } catch (error) {
        toastError('Error al cargar las citas del día.');
        setDbCitas([]);
      } finally {
        setIsCalendarLoading(false);
      }
    };

    fetchCitas();
  }, [fechaActual]);

  // <--------------- FUNCIONES --------------->

  // Funcion para abrir el modal de cita con datos de la cita
  const handleAbrirModal = (citaFormateada, empleado) => {
    setCitaSeleccionada({ ...citaFormateada.rawData, employee: empleado });
    setIsModalOpen(true);
  };

  // Funcion para cambiar dia en el calendario
  const cambiarDia = (dias) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setFechaActual(nuevaFecha);
  };

  // Funcion para el scroll horizontal del calendario
  const desplazarScroll = (direccion) => {
    if (scrollRef.current) {
      const cantidadScroll = 200;
      scrollRef.current.scrollBy({
        left: direccion === 'derecha' ? cantidadScroll : -cantidadScroll,
        behavior: 'smooth',
      });
    }
  };

  // Funcion para formatear una fecha a string
  const getFormatedDateStr = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  };

  // <--------------- DATOS DERIVADOS --------------->

  // Texto del mes y dia actual
  const opcionesMes = { month: 'long', year: 'numeric' };
  const opcionesDia = { weekday: 'long', day: 'numeric' };

  const mesAnioTexto = fechaActual.toLocaleDateString('es-ES', opcionesMes);
  const diaTexto = fechaActual.toLocaleDateString('es-ES', opcionesDia);

  // Lista de empleados
  const empleadosAMostrar = empleadoSeleccionado
    ? [empleadoSeleccionado]
    : dbEmpleados;

  // Genera los horarios del dia
  const {
    slots: horariosDelDia,
    horaInicio,
    horaFin,
  } = generarHorariosDelDia(fechaActual, dbEmpresaHorarios);

  // Calculos para la linea de la hora actual
  const isToday = fechaActual.toDateString() === currentTime.toDateString();
  const currentHourFloat =
    currentTime.getHours() + currentTime.getMinutes() / 60;

  const isTimeWithinBounds =
    currentHourFloat >= horaInicio && currentHourFloat <= horaFin;

  const topOffset = (currentHourFloat - horaInicio) * 160;

  // <--------------- RENDER --------------->

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {/* Seccion de filtros */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          alignItems: 'flex-end',
        }}
      >
        {/* Filtro empleado */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '300px' },
          }}
        >
          <Typography
            sx={{
              color: 'primary.light',
              mb: 1,
              fontSize: '1rem',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Filtrar por empleado
          </Typography>
          <CalendarCombobox
            name='Buscar empleado'
            placeholder='Buscar empleado...'
            array={dbEmpleados}
            hasImage={true}
            value={empleadoSeleccionado?.name || ''}
            onChange={(e) => {
              if (!e.target.value) {
                setEmpleadoSeleccionado(null);
              } else {
                const emp = dbEmpleados.find(
                  (emp) => emp.name === e.target.value,
                );
                setEmpleadoSeleccionado(emp || null);
              }
            }}
          />
        </Box>

        {/* Fecha seleccionada */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '250px' },
          }}
        >
          <Typography
            sx={{
              color: 'primary.light',
              mb: 1,
              fontSize: '1rem',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Fecha seleccionada
          </Typography>
          <CalendarDateInput
            value={getFormatedDateStr(fechaActual)}
            onChange={(e) => {
              if (e.target.value)
                setFechaActual(new Date(e.target.value + 'T00:00:00'));
            }}
          />
        </Box>
      </Box>

      {/* Contenedor del calendario */}
      <Box
        sx={{
          bgcolor: 'background.calendarGrid',
          borderRadius: '8px',
          overflow: 'hidden',
          border: (theme) =>
            `1px solid ${theme.palette.customBorders.inputDefault}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            background: (theme) => theme.customGradients.searchBar,
            borderBottom: (theme) =>
              `1px solid ${theme.palette.customBorders.inputDefault}`,
          }}
        >
          {/* Mes y anio */}
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '1rem', md: '1.5rem' },
              textTransform: 'capitalize',
            }}
          >
            {mesAnioTexto}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Flecha dia anterior */}
            <IconButton onClick={() => cambiarDia(-1)} sx={{ color: 'white' }}>
              <ArrowBackIosNewIcon fontSize='small' />
            </IconButton>

            {/* Dia texto */}
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '1rem', md: '1.5rem' },
                textTransform: 'capitalize',
              }}
            >
              {diaTexto}
            </Typography>

            {/* Flecha dia siguiente */}
            <IconButton onClick={() => cambiarDia(1)} sx={{ color: 'white' }}>
              <ArrowForwardIosIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        {horariosDelDia.length === 0 ? (
          // Dia de descanso
          <Typography
            sx={{
              color: 'text.secondary',
              p: 5,
              textAlign: 'center',
              fontSize: '1.2rem',
            }}
          >
            El establecimiento está cerrado en esa fecha.
          </Typography>
        ) : (
          <Box
            ref={scrollRef}
            sx={{
              overflowX: 'auto',
              width: '100%',
              bgcolor: 'background.calendarGrid',
              borderRadius: '8px',
              border: `1px solid` + theme.palette.customBorders.inputDefault,
            }}
          >
            <Box
              sx={{
                display: 'inline-grid',
                position: 'relative',
                minWidth: '100%',
                gridTemplateColumns: `120px repeat(${empleadosAMostrar.length}, minmax(200px, 1fr))`,
              }}
            >
              {/* Fila de empleados */}
              <Box
                sx={{
                  borderRight:
                    `1px solid` + theme.palette.customBorders.inputDefault,
                  borderBottom:
                    `1px solid` + theme.palette.customBorders.inputDefault,
                  position: 'sticky',
                  left: 0,
                  top: 0,
                  zIndex: 10,
                  bgcolor: 'background.serviceChip',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  height: '100px',
                  outline: (theme) =>
                    '1px solid ' + theme.palette.background.serviceChip,
                }}
              >
                {/* Botones para cambiar empleado */}
                <IconButton
                  onClick={() => desplazarScroll('izquierda')}
                  sx={{ color: 'white' }}
                >
                  <ArrowBackIosNewIcon fontSize='small' />
                </IconButton>

                <IconButton
                  onClick={() => desplazarScroll('derecha')}
                  sx={{ color: 'white' }}
                >
                  <ArrowForwardIosIcon fontSize='small' />
                </IconButton>
              </Box>

              {/* Empleados */}
              {empleadosAMostrar.map((emp) => (
                <Box
                  key={emp.id}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight:
                      `1px solid` + theme.palette.customBorders.inputDefault,
                    borderBottom:
                      `1px solid` + theme.palette.customBorders.inputDefault,
                    height: '100px',
                    bgcolor: 'background.serviceChip',
                  }}
                >
                  <Avatar
                    src={emp.foto}
                    sx={{ width: 40, height: 40, mb: 1 }}
                  />
                  <Typography
                    sx={{
                      color: 'primary.light',
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      fontFamily: "'Montserrat', sans-serif",
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                    }}
                  >
                    {emp.name}
                  </Typography>
                </Box>
              ))}

              {/* Filas de horarios */}
              {horariosDelDia.map((horario) => {
                const horaInicioCeldita = horario.split('-')[0];
                return (
                  <React.Fragment key={horario}>
                    {/* Columna de horas */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight:
                          `1px solid` +
                          theme.palette.customBorders.inputDefault,
                        borderBottom:
                          `1px solid` +
                          theme.palette.customBorders.inputDefault,
                        position: 'sticky',
                        left: 0,
                        zIndex: 5,
                        bgcolor: 'background.serviceChip',
                        outline: (theme) =>
                          '1px solid ' + theme.palette.background.serviceChip,
                        boxShadow: '3px 0 8px rgba(0,0,0,0.15)',
                        height: '80px',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'primary.light',
                          fontSize: '0.8rem',
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {horario}
                      </Typography>
                    </Box>

                    {/* Columna por empleado */}
                    {empleadosAMostrar.map((emp) => {
                      // Busca si el empleado tiene una cita en una hora
                      const cita = dbCitas.find(
                        (a) =>
                          a.empId === emp.id && a.start === horaInicioCeldita,
                      );
                      return (
                        <Box
                          key={`${emp.id}-${horario}`}
                          sx={{
                            borderRight:
                              `1px solid` +
                              theme.palette.customBorders.inputDefault,
                            borderBottom:
                              `1px solid` +
                              theme.palette.customBorders.inputDefault,
                            position: 'relative',
                            height: '80px',
                            background: 'transparent',
                          }}
                        >
                          {/* Bloque de cia si existe */}
                          {cita && (
                            <Box
                              onClick={() => handleAbrirModal(cita, emp)}
                              sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: `${cita.duracionEnBloques * 80}px`,
                                background: (theme) =>
                                  theme.customGradients.scheduleSelected,
                                zIndex: 1,
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                              }}
                            >
                              {/* Nombre del servicio */}
                              <Typography
                                sx={{
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '0.9rem',
                                  fontFamily: "'Montserrat', sans-serif",
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                }}
                              >
                                {cita.title}
                              </Typography>

                              {/* Nombre del cliente */}
                              <Typography
                                sx={{
                                  color: 'rgba(255,255,255,0.7)',
                                  fontSize: '0.7rem',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                }}
                              >
                                {cita.client}
                              </Typography>

                              {/* Horario */}
                              <Typography
                                sx={{
                                  color: 'rgba(255,255,255,0.7)',
                                  fontSize: '0.7rem',
                                  mt: 'auto',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                }}
                              >
                                {cita.timeStr}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </React.Fragment>
                );
              })}

              {/* Linea de la hora actual */}
              {isToday && isTimeWithinBounds && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: `${100 + topOffset}px`,
                    left: '120px',
                    right: 0,
                    height: '2px',
                    backgroundColor: 'primary.light',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      position: 'absolute',
                      top: '-4px',
                      left: '-5px',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Detalles de la cita */}
      <AppointmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={citaSeleccionada}
      />
    </Box>
  );
};

export default CalendarBoard;
