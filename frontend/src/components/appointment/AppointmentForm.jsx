// React
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

// Constantes
import { ROUTES } from '@/constants/routes';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// Utils
import { toastError } from '@/utils/notify';

// APIs (NUEVO)
import { getServicios } from '@/api/servicios.api';
import { getEmpleadosPublicos } from '@/api/empleados.api';
import { getDisponibilidad } from '@/api/citas.api';

// ************** componentes propios :3 **************
// |  common
import Title from '@/components/common/Title';
import Calendar from '@/components/common/Calendar';
import MainButton from '@/components/common/MainButton';
import Text from '@/components/common/Text';
import InfoDialog from '@/components/common/InfoDialog';
import Loader from '@/components/common/Loader';
import ErrorScreen from '@/components/common/ErrorScreen';
// | formulario
import Combobox from '@/components/form/Combobox';
import TextInput from '@/components/form/TextInput';
import GenderSelect from '@/components/form/GenderSelect';

function AppointmentForm() {
  // <--------------- CONTEXTO --------------->
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // <--------------- ESTADOS --------------->
  const [fecha, setFecha] = useState(dayjs());
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');

  const [listaServicios, setListaServicios] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaHorarios, setListaHorarios] = useState([]);

  const [rawServicios, setRawServicios] = useState([]);
  const [rawEmpleados, setRawEmpleados] = useState([]);

  const [costoMostrar, setCostoMostrar] = useState('$0.00');
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  // <--------------- DERIVADO --------------->
  // Carga los servicios al iniciar
  const fetchInitialServices = async () => {
    setIsPageLoading(true);
    setServerError(false);
    try {
      const res = await getServicios();
      if (res.ok) {
        setRawServicios(res.servicios);
        setListaServicios(res.servicios.map((s) => s.nombre));

        if (res.servicios.length === 0) {
          toastError(
            'No existen servicios registrados en el sistema.',
            'empty-services',
          );
        }
      }
    } catch (error) {
      setServerError(true);
    } finally {
      setIsPageLoading(false);
    }
  };

  // Se valida si ya se seleccionaron todos los combobox para la confirmacion
  const isReadyToConfirm =
    fecha &&
    servicioSeleccionado &&
    empleadoSeleccionado &&
    horarioSeleccionado;

  // Se calcula la hora fin
  let horarioTexto = '';
  if (isReadyToConfirm) {
    const servicioObj = rawServicios.find(
      (s) => s.nombre === servicioSeleccionado,
    );
    if (servicioObj && servicioObj.duracion) {
      const [hora, min] = horarioSeleccionado.split(':');
      const endTime = dayjs()
        .hour(hora)
        .minute(min)
        .add(servicioObj.duracion, 'minute')
        .format('HH:mm');
      horarioTexto = `${horarioSeleccionado} a ${endTime}`;
    } else {
      horarioTexto = horarioSeleccionado;
    }
  }

  // <--------------- EFFECTS --------------->
  useEffect(() => {
    fetchInitialServices();
  }, []);

  // Carga los empleados al elegir un servicio
  useEffect(() => {
    const fetchEmpleados = async () => {
      if (!servicioSeleccionado) {
        setListaEmpleados([]);
        setEmpleadoSeleccionado('');
        setCostoMostrar('$0.00');
        return;
      }

      try {
        const servicioEncontrado = rawServicios.find(
          (s) => s.nombre === servicioSeleccionado,
        );
        const servicioId = extraerId(servicioEncontrado);

        setEmpleadoSeleccionado('');
        setHorarioSeleccionado('');

        if (servicioEncontrado) {
          setCostoMostrar(`$${servicioEncontrado.precio || 0}`);
        }

        if (!servicioId) return;

        const res = await getEmpleadosPublicos(servicioId);

        if (res.ok) {
          setRawEmpleados(res.empleados);

          const empleadosFormato = res.empleados.map((emp) => ({
            name: emp.nombre,
            pfp: emp.foto?.url || null,
          }));
          setListaEmpleados(empleadosFormato);

          if (res.empleados.length === 0) {
            toastError(
              'No hay empleados que realicen este servicio.',
              'empty-employees',
            );
          }
        }
      } catch (error) {
        toastError('Error al cargar empleados disponibles.');
      }
    };
    fetchEmpleados();
  }, [servicioSeleccionado, rawServicios]);

  // Carga la disponibilidad de horarios
  useEffect(() => {
    const fetchDisponibilidad = async () => {
      if (!fecha || !servicioSeleccionado || !empleadoSeleccionado) {
        setListaHorarios([]);
        setHorarioSeleccionado('');
        return;
      }

      try {
        const fechaFormat = dayjs(fecha).format('YYYY/MM/DD');

        const servicioEncontrado = rawServicios.find(
          (s) => s.nombre === servicioSeleccionado,
        );
        const empleadoEncontrado = rawEmpleados.find(
          (e) => e.nombre === empleadoSeleccionado,
        );

        const servicioId = extraerId(servicioEncontrado);
        const empleadoId = extraerId(empleadoEncontrado);

        setHorarioSeleccionado('');

        if (!servicioId || !empleadoId) return;

        const res = await getDisponibilidad(
          fechaFormat,
          empleadoId,
          servicioId,
        );

        if (res.ok) {
          setListaHorarios(res.horarios);

          if (res.horarios.length === 0) {
            toastError(
              'No hay horarios disponibles para esta fecha y empleado.',
              'empty-schedules',
            );
          }
        }
      } catch (error) {
        toastError('Error al cargar los horarios disponibles.');
      }
    };
    fetchDisponibilidad();
  }, [
    fecha,
    servicioSeleccionado,
    empleadoSeleccionado,
    rawServicios,
    rawEmpleados,
  ]);

  // <--------------- FUNCIONES --------------->

  // Extraer ID
  const extraerId = (obj) => {
    if (!obj) return null;
    return obj._id?.$oid || obj._id || obj.id || null;
  };

  // Funcion boton agendar
  const handleSchedule = () => {
    setIsSuccessDialogOpen(true);
  };

  // Funcion dialogo
  const handleCloseDialog = () => {
    setIsSuccessDialogOpen(false);
  };

  const handleNavigation = () => {
    if (location.pathname === ROUTES.ADMIN.BOOK) {
      navigate(ROUTES.ADMIN.CALENDAR);
    } else {
      navigate(ROUTES.CLIENT.APPOINTMENTS);
    }
  };

  // <--------------- RENDER --------------->

  if (isPageLoading) {
    if (location.pathname === ROUTES.ADMIN.BOOK) {
      return <Loader height='100%' />;
    } else {
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
  }

  if (serverError) {
    if (location.pathname === ROUTES.ADMIN.BOOK) {
      return (
        <ErrorScreen
          onRetry={fetchInitialServices}
          offsetMobile='64px'
          offsetDesktop='80px'
        />
      );
    } else {
      return (
        <ErrorScreen
          onRetry={fetchInitialServices}
          offsetMobile='64px'
          offsetDesktop='64px'
        />
      );
    }
  }

  return (
    <Box
      sx={{
        py: { xs: 2, md: 5 },
        px: { xs: 1, md: 0 },
        width: '95%',
        maxWidth: '1050px',
        mx: 'auto',
      }}
    >
      {/* Titulo */}
      <Box sx={{ px: 3 }}>
        <Title children='Agenda tu cita' color='text.primary' align='center' />
      </Box>

      {/* Seccion superior */}
      <Grid container sx={{ height: '100%', p: 2 }}>
        {/* Calendario */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Calendar value={fecha} onChange={(newDate) => setFecha(newDate)} />
        </Grid>

        {/* Datos servicios */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            p: { xs: 0.5, md: 5 },
            py: { xs: 2, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: 3,
              alignItems: 'flex-end',
            }}
          >
            {/* Seleccionar servicio */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minWidth: 0,
              }}
            >
              <Text
                children='Selecciona un servicio'
                color='primary.main'
                size='20'
              />
              <Box
                sx={{
                  width: '100%',
                  '& .MuiFormControl-root': { m: 0, width: '100%' },
                }}
              >
                <Combobox
                  array={listaServicios}
                  placeholder='Elige un servicio'
                  disabled={listaServicios.length === 0}
                  value={servicioSeleccionado}
                  onValueChange={(val) => setServicioSeleccionado(val)}
                />
              </Box>
            </Box>

            {/* Costo */}
            <Box
              sx={{
                width: '100px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'right' }}>
                <Text children='Costo' color='primary.main' size='20' />
              </Box>
              <Box
                sx={{
                  background: (theme) =>
                    theme.customGradients.collapsableHeader,
                  height: '56px',
                  width: '100%',
                  borderRadius: '8px',
                  border: (theme) => theme.palette.customBorders.form,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {costoMostrar}
              </Box>
            </Box>
          </Box>

          {/* Empleado */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
            }}
          >
            <Text children='Empleados' color='primary.main' size='20' />
            <Box
              sx={{
                width: '100%',
                '& .MuiFormControl-root': { m: 0, width: '100%' },
              }}
            >
              <Combobox
                array={listaEmpleados}
                hasImage={true}
                placeholder='Elige un empleado'
                disabled={!servicioSeleccionado || listaEmpleados.length === 0}
                value={empleadoSeleccionado}
                onValueChange={(val) => setEmpleadoSeleccionado(val)}
              />
            </Box>
          </Box>

          {/* Horarios */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
            }}
          >
            <Text
              children='Horarios disponibles'
              color='primary.main'
              size='20'
            />
            <Box
              sx={{
                width: '100%',
                '& .MuiFormControl-root': { m: 0, width: '100%' },
              }}
            >
              <Combobox
                array={listaHorarios}
                placeholder='Elige un horario'
                disabled={
                  !empleadoSeleccionado || !fecha || listaHorarios.length === 0
                }
                value={horarioSeleccionado}
                onValueChange={(val) => setHorarioSeleccionado(val)}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Datos del cliente */}
      <Box sx={{ px: { xs: 3, md: 5 }, py: 1 }}>
        <Title
          children='Datos del cliente'
          size='18'
          textTransform='capitalize'
        ></Title>
        <Box
          sx={{
            p: { xs: 1.5, md: 4 },
            my: 3,
            background: (theme) => theme.customGradients.collapsableHeader,
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* --- Fila de nombre, edad, telefono --- */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Nombre */}
            <Grid size={{ xs: 12, md: 5 }}>
              <TextInput
                label='Nombre Completo'
                placeholder='Ingrese su nombre'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>

            {/* Edad */}
            <Grid size={{ xs: 4, md: 2 }}>
              <TextInput
                label='Edad'
                placeholder='Ej: 18'
                type='number'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '28px 5px 10px 5px !important',
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>

            {/* Telefono */}
            <Grid size={{ xs: 8, md: 5 }}>
              <TextInput
                label='Número telefónico'
                type='number'
                placeholder='Ej: 8101010011'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>
          </Grid>

          {/* --- Fila de sexo y correo --- */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Sexo */}
            <Grid size={{ xs: 12, md: 3 }}>
              <GenderSelect
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>

            {/* Correo */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                label='Correo electrónico'
                type='email'
                placeholder='Ingrese su correo'
                background={(theme) => theme.customGradients.collapsableHeader}
                border={(theme) => theme.palette.customBorders.form}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Confirmacion */}
      <Box sx={{ px: 5 }}>
        {isReadyToConfirm ? (
          <>
            <Title
              children='Se agendará una cita con los siguientes detalles:'
              size='16'
              textTransform='capitalize'
              align='center'
            />
            {/* Detalles de la cita */}
            <Box
              sx={{
                p: { xs: 1, md: 3 },
                my: 3,
                background: (theme) => theme.customGradients.collapsableHeader,
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {/* Fecha */}
              <Text
                children={`Fecha: ${dayjs(fecha).format('DD/MM/YYYY')}`}
                size='18'
                align='center'
              />
              {/* Servicio */}
              <Text
                children={`Servicio seleccionado: ${servicioSeleccionado}`}
                size='18'
                align='center'
              />
              {/* Empleado */}
              <Text
                children={`Empleado que lo atenderá: ${empleadoSeleccionado}`}
                size='18'
                align='center'
              />
              {/* Horario */}
              <Text
                children={`Horario: ${horarioTexto}`}
                size='18'
                align='center'
              />
            </Box>

            {/* Linea separadora */}
            <Box
              component='hr'
              sx={{
                border: 'none',
                height: '1px',
                backgroundColor: 'divider',
              }}
            />

            {/* Precio */}
            <Box
              sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Title
                children={`Total a pagar: ${costoMostrar}`}
                size='20'
                textTransform='capitalize'
                align='center'
              />
              <Text
                children='*El pago de la cita se realiza en persona.'
                size='16'
                align='center'
                color='text.secondary'
              />
            </Box>
          </>
        ) : (
          /* Mensaje general cuando falten datos */
          <Box sx={{ py: 4 }}>
            <Text
              children='Selecciona un servicio, fecha, empleado y horario para ver el resumen de tu cita.'
              size='16'
              align='center'
              color='text.secondary'
            />
          </Box>
        )}
      </Box>

      {/* Boton agendar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <MainButton onClick={handleSchedule}>Agendar</MainButton>
      </Box>

      {/* Dialogo inmediato */}
      <InfoDialog
        open={isSuccessDialogOpen}
        onClose={handleCloseDialog}
        onTransitionExited={handleNavigation}
        title='¡Cita Agendada!'
        content='Tu cita se ha registrado correctamente.'
      />
    </Box>
  );
}

export default AppointmentForm;
