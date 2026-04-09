import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// ************** componentes propios :3 **************
// |  layout
import ClientLayout from '@/layouts/ClientLayout';
// |  common
import Title from '@/components/common/Title';
import Collapsable from '@/components/common/Collapsable';
// |  formulario
import Combobox from '@/components/formulario/Combobox';
// |  collapsable
import AppointmentHeader from '@/components/collapsable/Header/AppointmentHeader';
import AppointmentBody from '@/components/collapsable/Body/AppointmentBody';

// |  iconos para los estatus
import ClockIcon from '@mui/icons-material/QueryBuilder';
import CloseIcon from '@mui/icons-material/CloseRounded';
import CheckIcon from '@mui/icons-material/CheckRounded';

// NOTA: Aquí se actualizaran los estatus de una cita, o se sacan de la BD, no m acuerdo xd
const statusAppointment = [
  { name: 'Pendiente', icon: <ClockIcon /> },
  { name: 'Completada', icon: <CheckIcon /> },
  { name: 'Cancelada', icon: <CloseIcon /> },
];

// ************** media dummy **************
// |  Imagenes
import photo from '@/assets/dummy/perfil-1.jpg';
import photo2 from '@/assets/dummy/perfil-2.jpg';
import photo3 from '@/assets/dummy/perfil-3.jpg';
// |  Datos
const orderByDummy = [
  'Ordenar por antiguedad',
  'Ordenar alfabeticamente',
  // 'Ordenar por',
];
const employsDummy = [
  { name: 'Oliver Hansen', pfp: photo },
  { name: 'Van Henry', pfp: photo2 },
  { name: 'April Tucker', pfp: photo3 },
];
const clientDummy = [
  {
    name: 'John Doe',
    age: '25',
    gender: 'Masculino',
    mail: 'jonD@gmail.com',
    phoneNumber: '81 3161 9950',
  },
  {
    name: 'Richard Roe',
    age: '62',
    gender: 'Masculino',
    mail: 'rr@gmail.com',
    phoneNumber: '81 3161 9951',
  },
  {
    name: 'Jane Doe',
    age: '25',
    gender: 'Femenino',
    mail: 'janeD@gmail.com',
    phoneNumber: '81 3161 9952',
  },
];
const appointmentsInfo = [
  {
    service: 'Servicio 1',
    date: 'Febrero 11, 2026 9:00am a 10:00am.',
    price: '$4000',
    status: statusAppointment[2],
    employ: employsDummy[1],
    client: clientDummy[0],
  },
  {
    service: 'Servicio 2',
    date: 'Marzo 1, 2026 13:00am a 14:00am.',
    price: '$500',
    status: statusAppointment[1],
    employ: employsDummy[2],
    client: clientDummy[1],
  },
];
// ****************************

function MySchedule() 
{
  return (
    <ClientLayout>
      <Box
        sx={{
          py: { xs: 2, md: 5 },
          px: { xs: 1, md: 20 },
          width: '95%',
          maxWidth: '1250px',
          mx: 'auto',
        }}
      >
        <Grid container sx={{display: 'flex', alignItems: 'center' }} rowSpacing={{ xs: 2, md: 0 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Title
              children='Mis citas'
              color='text.primary'
              align={{ xs: 'center', md: 'start' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Combobox
              name='Ordenar por:'
              array={orderByDummy}
              size='14px'
              defaultValue={orderByDummy[0]}
            />
          </Grid>
        </Grid>
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#cbd4ff6e'}} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
          {appointmentsInfo.map((appointment, index) => {
            return (
              <Collapsable
                key={index}
                headerContent={
                  <AppointmentHeader
                    title={appointment.service}
                    date={appointment.date}
                    price={appointment.price}
                  />
                }
              >
                <AppointmentBody appointment={appointment} />
              </Collapsable>
            );
          })}
        </Box>
      </Box>
    </ClientLayout>
  );
}

export default MySchedule;
