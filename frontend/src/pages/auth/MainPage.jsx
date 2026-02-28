import{Grid, Typography, Box} from '@mui/material'
import NavBar from '@/layouts/NavBar'
import mainPhoto from '@/assets/dummy/main-1.png'
import MainButton from '@/components/common/MainButton'
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LocationIcon from '@mui/icons-material/LocationOnRounded';
import TextWIcon from '@/components/common/TextWIcon';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';
import CardServices from '@/components/main/CardServices';
import photoExample1 from '@/assets/dummy/main-2.png';
import photoExample2 from '@/assets/dummy/main-3.png';
import photoExample3 from '@/assets/dummy/main-4.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//NOTA: Datos de ejemplo, eliminar después
const serviciesInfoDummy = 
[
    { 
        id: 1, 
        image: photoExample1, 
        name: "Servicio 1", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna." 
    },
    { 
        id: 2, 
        image: photoExample2,
        name: "Servicio 2", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna." 
    },
    { 
        id: 3, 
        image: photoExample3, 
        name: "Servicio 3", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna." 
    },
    
    { 
        id: 4, 
        image: mainPhoto, 
        name: "Servicio 4", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis, risus at pellentesque efficitur, quam nisl tristique enim, et malesuada ex sapien et urna." 
    }
];

const imageDummy = 
[
    { id: '1', image: photoExample1}, {id: '2',image: photoExample2}, { id: '3',image: photoExample3}
];

// ***********************************

function MainPage()
{
    return(
        <>
            <NavBar></NavBar>
            {/* Slider principal de las imagenes -> está en modo automatico */}
            <Box sx={{position: 'relative'}}>
                <Box sx=
                {{
                    position: 'absolute', zIndex: 50, top:0, left: 0, height: '98.5%', width: '100%', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)', 
                    pointerEvents: 'none'
                }}/>

                <Box sx={{position: 'absolute', zIndex: 100, top: '70%', width:'100%', textAlign: 'center'}}>
                    <Typography variant='h4'>Empresa</Typography>
                    <Typography variant='body1' sx={{color: 'primary.main'}}>slogan</Typography>
                    <Typography variant='body2' sx={{color: 'text.main'}}>descripción breve</Typography>
                </Box>

                <Swiper
                    modules={[Autoplay, EffectFade]}
                    spaceBetween={0} 
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    speed={1500}
                    effect="fade"
                    loop={true}
                >
                    {imageDummy.map((item) => 
                    (
                        <SwiperSlide key={item.id}>
                            <img src={item.image} alt={`Slide ${item.id}`} style={{ height: '400px', width: '100%', objectFit: 'cover' }}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Info central */}
            <Grid container spacing={{xs: 5, md:10}} sx={{ p: {xs: 5 ,md:15 }}}>
                <Grid size={{xs: 12, md: 4}} sx={{display: 'flex', justifyContent: 'center'}} >
                    <Box component='img' src={mainPhoto} sx={{height: { xs:'180px', md:'220px'}, padding: '2%'}}/>
                </Grid>
                <Grid size={{xs: 12, md:8}} sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{textAlign: 'justify', fontSize: 15}}> Somos una empresa que se dedica a ofrecer servicios de administración. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Grid>
            </Grid> 

            {/* Swiper de los servicios */}
            <Box sx=
            {{ 
                width: '100%', 
                px: { xs: 2, md: 6 },
    
                '.swiper-button-next, .swiper-button-prev': 
                {
                    color: 'text.secondary', transition: '0.2s ease-in-out',
                    '&:hover': 
                    {
                        color: 'text.primary',
                        transform: 'scale(1.1)'
                    }
                }
            }}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={0} 
                    navigation={true}
                    breakpoints=
                    {{
                        0: {slidesPerView: 1},
                        600: {slidesPerView: 2},
                        900: {slidesPerView: 3}
                    }}
                >
                    {serviciesInfoDummy.map((item) => 
                    (
                        <SwiperSlide key={item.id}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                <CardServices image={item.image} name={item.name} description={item.description}/>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Botón para agendar */}
            <Box sx={{display:'flex',justifyContent: 'center', m:5 }}>
                <MainButton>Agenda tu cita <CalendarIcon/></MainButton>    
            </Box>            

            {/* ****** footer *****  */}
            <Box sx={{background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)', p: 3}}>
                <Typography variant="h4" sx={{fontSize:18, p:1}} >Contáctanos</Typography>
                <Grid container sx={{justifyContent: 'center'}}>
                    <Grid size={{xs:12, md:6}}>
                        <TextWIcon icon={<LocationIcon sx={{color: 'secondary.main', p:0.3}}/>} text="Dirección de la empresa" ></TextWIcon>
                        <TextWIcon icon={<PhoneIcon sx={{color: 'secondary.main', p:0.3}}/>} text="Teléfono de la empresa" ></TextWIcon>
                        <TextWIcon icon={<EmailIcon sx={{color: 'secondary.main', p:0.3}}/>} text="Correo electrónico" ></TextWIcon>

                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <TextWIcon icon={<CalendarIcon sx={{color: 'secondary.main', p:0.3}}/>} text="Horario de atención" ></TextWIcon>
                        <Typography sx={{textAlign: 'justify', fontSize: 12, color: 'text.secondary', px: 4}}>Lunes a Viernes : 10:00 am a 4:00 pm <br></br> Sábado: 10:00 am a 2:00 pm</Typography>
                    </Grid>
                </Grid>    

            </Box>
        </>
    )
}

export default MainPage;