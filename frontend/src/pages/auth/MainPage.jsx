import{Grid, Typography, Box} from '@mui/material'
import NavBar from '@/layouts/NavBar'
import mainPhoto from '@/assets/dummy/main-1.png'
import MainButton from '@/components/common/MainButton'
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LocationIcon from '@mui/icons-material/LocationOnRounded';
import TextWIcon from '@/components/common/TextWIcon';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';

function MainPage()
{
    return(
        <>
            <NavBar></NavBar>
            <Grid container spacing={10} sx={{justifyContent: 'center', p: 15}}>
                <Grid size={{xs: 12, md: 4}}>
                    <img src={mainPhoto} style={{height: '220px', padding: '2%'}}></img>
                </Grid>
                <Grid size={{xs: 12, md:8}}>
                    <Typography sx={{textAlign: 'justify'}}> Somos una empresa que se dedica a ofrecer servicios de administración. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Grid>
            </Grid> 

            <Box sx={{display:'flex',justifyContent: 'center', m:5 }}>
                <MainButton>Agenda tu cita <CalendarIcon/></MainButton>    
            </Box>
            
            <Box sx={{background: 'linear-gradient(180deg, #121229 100%, #1b1c37 0%)', p: 3}}>
                <Typography variant="h4" sx={{fontSize:18, p:1}} >Contáctanos</Typography>
                <Grid container sx={{justifyContent: 'center'}}>
                    <Grid size={{xs:12, md:6}}>
                        <TextWIcon icon={<LocationIcon sx={{color: 'secondary.main'}}/>} text="Dirección de la empresa" ></TextWIcon>
                        <TextWIcon icon={<PhoneIcon sx={{color: 'secondary.main'}}/>} text="Teléfono de la empresa" ></TextWIcon>
                        <TextWIcon icon={<EmailIcon sx={{color: 'secondary.main'}}/>} text="Correo electrónico" ></TextWIcon>

                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                        <TextWIcon icon={<CalendarIcon sx={{color: 'secondary.main'}}/>} text="Horario de atención" ></TextWIcon>
                        <Typography sx={{textAlign: 'justify', fontSize: 12, color: 'text.secondary'}}>Lunes a Viernes : 10:00 am a 4:00 pm <br></br> Sábado: 10:00 am a 2:00 pm</Typography>
                    </Grid>
                </Grid>    

            </Box>
        </>
    )
}

export default MainPage;