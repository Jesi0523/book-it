// <------------- IMPORTS ------------->
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// Iconos
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Componentes propios
import CalendarCombobox from '@/components/formulario/CalendarCombobox';
import CalendarDateInput from '@/components/formulario/CalendarDateInput';

// Fotos prueba
import avatar1 from '@/assets/dummy/perfil-1.jpg';
import avatar2 from '@/assets/dummy/perfil-2.jpg';
import avatar3 from '@/assets/dummy/perfil-3.jpg';

// <------------- DUMMY ------------->

// Empleados
const dummyEmployees = [
  { id: 1, name: 'Roberto Rodríguez', foto: avatar2 },
  { id: 2, name: 'Marcela S.', foto: avatar1 },
  { id: 3, name: 'Ricardo Martínez', foto: avatar2 },
  { id: 4, name: 'Laura Cavazos', foto: avatar3 },
  { id: 5, name: 'Pedro Sánchez', foto: avatar2 },
];

// Citas
const dummyAppointments = [
  {
    id: 101,
    empId: 1,
    start: '07:30',
    duracionEnBloques: 2,
    title: 'Servicio 1',
    client: 'Cliente',
    timeStr: '07:30 - 08:30am',
  },
  {
    id: 104,
    empId: 1,
    start: '10:00',
    duracionEnBloques: 3,
    title: 'Servicio 2',
    client: 'Ana Gomez',
    timeStr: '10:00 - 11:30am',
  },
  {
    id: 102,
    empId: 4,
    start: '08:00',
    duracionEnBloques: 2,
    title: 'Servicio 10',
    client: 'Cliente',
    timeStr: '08:00 - 09:00am',
  },
  {
    id: 103,
    empId: 2,
    start: '09:00',
    duracionEnBloques: 1,
    title: 'Servicio 3',
    client: 'Juan P.',
    timeStr: '09:00 - 09:30am',
  },
];

const horariosSemanalesDB = {
  0: { abierto: false, horaInicio: 0, horaFin: 0 }, // Domingo (Cerrado)
  1: { abierto: true,  horaInicio: 7, horaFin: 20 }, // Lunes
  2: { abierto: true,  horaInicio: 7, horaFin: 20 }, // Martes
  3: { abierto: true,  horaInicio: 7, horaFin: 20 }, // Miercoles
  4: { abierto: true,  horaInicio: 7, horaFin: 20 }, // Jueves
  5: { abierto: true,  horaInicio: 7, horaFin: 17.5 }, // Viernes
  6: { abierto: true,  horaInicio: 7, horaFin: 14 }, // Sabado
};

// Horarios de cada dia
const generarHorariosDelDia = (fecha) => {
  const dia = fecha.getDay(); // Retorna un numero del 0 al 6
  const configDia = horariosSemanalesDB[dia];

  // Si ese dia esta cerrado, se devuelven arreglos vacios
  if (!configDia.abierto) {
    return { slots: [], horaInicio: 0, horaFin: 0 };
  }

  const { horaInicio, horaFin } = configDia;
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

// <------ LOGICA ------>
const CalendarBoard = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [empleadoBuscado, setEmpleadoBuscado] = useState(null);
  const [ahora, setAhora] = useState(new Date());

  const scrollRef = useRef(null);

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 60000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [empleadoBuscado]);

  const cambiarDia = (dias) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setFechaActual(nuevaFecha);
  };

  const desplazarScroll = (direccion) => {
    if (scrollRef.current) {
      const cantidadScroll = 200;
      scrollRef.current.scrollBy({
        left: direccion === 'derecha' ? cantidadScroll : -cantidadScroll,
        behavior: 'smooth',
      });
    }
  };

  const getFormatedDateStr = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const opcionesMes = { month: 'long', year: 'numeric' };
  const opcionesDia = { weekday: 'long', day: 'numeric' };
  const mesAnioTexto = fechaActual.toLocaleDateString('es-ES', opcionesMes);
  const diaTexto = fechaActual.toLocaleDateString('es-ES', opcionesDia);

  const empleadosAMostrar = empleadoBuscado
    ? [empleadoBuscado]
    : dummyEmployees;
  const {
    slots: horariosDelDia,
    horaInicio,
    horaFin,
  } = generarHorariosDelDia(fechaActual);

  const colorBorde = '#2a2b4a';
  const colorFondoAppt = 'linear-gradient(180deg, #6c74cc 0%, #4f58a3 100%)';

  const isToday = fechaActual.toDateString() === ahora.toDateString();
  const currentHourFloat = ahora.getHours() + ahora.getMinutes() / 60;
  const isTimeWithinBounds =
    currentHourFloat >= horaInicio && currentHourFloat <= horaFin;
  const topOffset = (currentHourFloat - horaInicio) * 160;

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '300px' },
          }}
        >
          <Typography
            sx={{
              color: '#ffb74d',
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
            array={dummyEmployees}
            hasImage={true}
            value={empleadoBuscado?.name || ''}
            onChange={(e) => {
              if (!e.target.value) {
                setEmpleadoBuscado(null);
              } else {
                const emp = dummyEmployees.find(
                  (emp) => emp.name === e.target.value,
                );
                setEmpleadoBuscado(emp || null);
              }
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '250px' },
          }}
        >
          <Typography
            sx={{
              color: '#ffb74d',
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
          background: '#121229',
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${colorBorde}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            background: '#202141',
            borderBottom: `1px solid ${colorBorde}`,
          }}
        >
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
            <IconButton onClick={() => cambiarDia(-1)} sx={{ color: 'white' }}>
              <ArrowBackIosNewIcon fontSize='small' />
            </IconButton>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '1rem', md: '1.5rem' },
                textTransform: 'capitalize',
              }}
            >
              {diaTexto}
            </Typography>
            <IconButton onClick={() => cambiarDia(1)} sx={{ color: 'white' }}>
              <ArrowForwardIosIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        {horariosDelDia.length === 0 ? (
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
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: `120px repeat(${empleadosAMostrar.length}, minmax(200px, 1fr))`,
              minWidth: '100%',
            }}
          >
            {/* Fila de empleados */}
            <Box
              sx={{
                borderRight: `1px solid ${colorBorde}`,
                borderBottom: `1px solid ${colorBorde}`,
                position: 'sticky',
                left: 0,
                top: 0,
                zIndex: 10,
                background: '#1b1c37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: '100px',
                outline: '1px solid #1b1c37',
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

            {/* Nombre de los empleados */}
            {empleadosAMostrar.map((emp) => (
              <Box
                key={emp.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRight: `1px solid ${colorBorde}`,
                  borderBottom: `1px solid ${colorBorde}`,
                  height: '100px',
                  background: '#1b1c37',
                }}
              >
                <Avatar src={emp.foto} sx={{ width: 40, height: 40, mb: 1 }} />
                <Typography
                  sx={{
                    color: '#ffb74d',
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

            {/* Columna de horarios */}
            {horariosDelDia.map((horario) => {
              const horaInicioCeldita = horario.split('-')[0];
              return (
                <React.Fragment key={horario}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: `1px solid ${colorBorde}`,
                      borderBottom: `1px solid ${colorBorde}`,
                      position: 'sticky',
                      left: 0,
                      zIndex: 5,
                      background: '#1b1c37',
                      outline: '1px solid #1b1c37',
                      boxShadow: '3px 0 8px rgba(0,0,0,0.15)',
                      height: '80px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#ffb74d',
                        fontSize: '0.8rem',
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {horario}
                    </Typography>
                  </Box>

                  {empleadosAMostrar.map((emp) => {
                    const cita = dummyAppointments.find(
                      (a) =>
                        a.empId === emp.id && a.start === horaInicioCeldita,
                    );
                    return (
                      <Box
                        key={`${emp.id}-${horario}`}
                        sx={{
                          borderRight: `1px solid ${colorBorde}`,
                          borderBottom: `1px solid ${colorBorde}`,
                          position: 'relative',
                          height: '80px',
                          background: 'transparent',
                        }}
                      >
                        {cita && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: `${cita.duracionEnBloques * 80}px`,
                              background: colorFondoAppt,
                              zIndex: 1,
                              p: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              overflow: 'hidden',
                            }}
                          >
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
                  backgroundColor: '#ffb74d',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#ffb74d',
                    position: 'absolute',
                    top: '-4px',
                    left: '-5px',
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CalendarBoard;
