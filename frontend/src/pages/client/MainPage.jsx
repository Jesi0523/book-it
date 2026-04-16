import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// ************** componentes propios :3 **************
// |  common
import MainButton from '@/components/common/MainButton';
import TextWIcon from '@/components/common/TextWIcon';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
// |  main
import CardServices from '@/components/main/CardServices';
// ************** media dummy **************
// |  Imagenes
import mainPhoto from '@/assets/dummy/main-1.webp';
import photoExample1 from '@/assets/dummy/main-2.webp';
import photoExample2 from '@/assets/dummy/main-3.webp';
import photoExample3 from '@/assets/dummy/main-4.webp';

// ************** iconos **************
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LocationIcon from '@mui/icons-material/LocationOnRounded';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';

//NOTA: Datos de ejemplo, eliminar después
const serviciesInfoDummy = [
  {
    id: 1,
    image: photoExample1,
    name: 'Servicio 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna.',
  },
  {
    id: 2,
    image: photoExample2,
    name: 'Servicio 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna.',
  },
  {
    id: 3,
    image: photoExample3,
    name: 'Servicio 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna.',
  },

  {
    id: 4,
    image: mainPhoto,
    name: 'Servicio 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna.',
  },
];
const imageDummy = [
  { id: '1', image: photoExample1 },
  { id: '2', image: photoExample2 },
  { id: '3', image: photoExample3 },
];

// ***********************************

function MainPage() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Slider principal de las imagenes -> está en modo automatico 🦭 */}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 50,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            zIndex: 100,
            top: '70%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title children='Empresa' align='center' color='text.primary' />
          <Text
            children='Slogan'
            align='center'
            color='primary.main'
            size='20'
          />
        </Box>

        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1500}
          effect='fade'
          loop={true}
        >
          {imageDummy.map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                component='img'
                src={item.image}
                alt={`Slide ${item.id}`}
                sx={{
                  height: '400px',
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Info central */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #0c0c18 0%, #060511 100%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 0, md: 2 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 5, md: 4, lg: 10 }}
          sx={{
            p: { xs: 5, md: 6, lg: 10 },
            maxWidth: '1300px',
            width: '100%',
          }}
        >
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              src={mainPhoto}
              sx={{
                width: '100%',
                maxWidth: { xs: '250px', md: '100%' },
                height: 'auto',
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text
              align='justify'
              color='text.primary'
              size='16'
              children="Somos una empresa que se dedica a ofrecer servicios de administración. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Swiper de los servicios */}
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(180deg, #0c0c18 0%, #060511 100%)',
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 6, md: 6 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1300px',
            px: { xs: 6, md: 8, lg: 12 },
            position: 'relative', 
            '.swiper': {
              position: 'static', 
            },
            '.swiper-button-next, .swiper-button-prev': {
              color: 'text.secondary',
              transition: '0.2s ease-in-out',
              '&:hover': { color: 'text.primary', transform: 'scale(1.1)' },
            },
            '.swiper-button-prev': {
              left: { xs: '5px', md: '10px', lg: '20px' }, 
            },
            '.swiper-button-next': {
              right: { xs: '5px', md: '10px', lg: '20px' }, 
            },
          }}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            navigation={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
          >
            {serviciesInfoDummy.map((item) => (
              <SwiperSlide key={item.id}>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CardServices
                    image={item.image}
                    name={item.name}
                    description={item.description}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>

      {/* Botón para agendar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 5,
          background: 'linear-gradient(180deg, #0c0c18 0%, #060511 100%)',
          width: '100%',
        }}
      >
        {isLanding ? (
          // Landing Page
          <>
            <MainButton to='/login'>
              Agenda tu cita <CalendarIcon />
            </MainButton>
          </>
        ) : (
          // Main Page
          <>
            <MainButton to='/book-appointment'>
              Agenda tu cita <CalendarIcon />
            </MainButton>
          </>
        )}
      </Box>

      {/* ****** footer *****  */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)',
          p: 3,
          mt: 'auto',
          width: '100%',
        }}
      >
        <Box sx={{ ml: 1, mb: 1.2 }}>
          <Title children='Contáctanos' color='text.primary' size='18' />
        </Box>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextWIcon
              icon={<LocationIcon sx={{ color: 'secondary.main', p: 0.3 }} />}
              text='Dirección de la empresa'
            />
            <TextWIcon
              icon={<PhoneIcon sx={{ color: 'secondary.main', p: 0.3 }} />}
              text='Teléfono de la empresa'
            />
            <TextWIcon
              icon={<EmailIcon sx={{ color: 'secondary.main', p: 0.3 }} />}
              text='Correo electrónico'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextWIcon
              icon={<CalendarIcon sx={{ color: 'secondary.main', p: 0.3 }} />}
              text='Horario de atención'
            />
            <Box sx={{ px: 4 }}>
              <Text
                align='justify'
                color='text.secondary'
                size='14'
                children='Lunes a Viernes : 10:00 am a 4:00 pm'
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
