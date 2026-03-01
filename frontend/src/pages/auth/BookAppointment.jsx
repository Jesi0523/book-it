import {Grid, Box} from '@mui/material'
// ************** componentes propios :3 **************
// |  layout
import NavBar from '@/layouts/NavBar'
// |  common
import Title from '@/components/common/Title'
import Calendar from '@/components/common/Calendar'
import MainButton from '@/components/common/MainButton'
import Text from '@/components/common/Text'
// | formulario
import Combobox from '@/components/formulario/Combobox'
import TextInput from '@/components/formulario/TextInput'
import GenderSelect from '@/components/formulario/GenderSelect'
// ************** media dummy **************
// |  Imagenes
import photo from '@/assets/dummy/don.jpg'
import photo2 from '@/assets/dummy/dd.jpg'
import photo3 from '@/assets/dummy/a.jpg'
// |  Datos
const servicesDummy =[ 'Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4', 'Servicio 5'];
const employsDummy = [{name: 'Oliver Hansen', pfp: photo},{name:'Van Henry', pfp: photo2 },{name:'April Tucker', pfp: photo3}];
const hoursDummy =[ '09:00-10:00am', '10:30-11:30am', '12:00-13:00pm', '13:00-14:00pm', '15:00-16:00pm'];
// ****************************

function BookAppointment()
{
    return(
        <>
            <NavBar/>
            <Box sx={{p:7}}>
                <Box sx={{px: 3}}>
                    <Title color='text.primary' align="{xs: 'center', md: 'start'}">Agenda tu cita</Title>
                </Box>

                {/* Agendar cita */}
                <Grid container spacing={0} sx={{height: '100%', p:2}}>
                    <Grid size={{xs: 12, md: 4}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Calendar/>
                    </Grid>

                    <Grid size={{xs: 12, md: 8}} sx={{p:5, display: 'flex', flexDirection: 'column', gap: {xs:1, md:5}}}>
                        <Grid container sx={{display: 'flex'}}>
                            <Grid size={{xs: 12, md: 8}}>
                                <Combobox name='Selecciona un servicio' array={servicesDummy}/>
                            </Grid>
                            <Grid size={{xs: 12, md: 4}}>
                                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'primary.main', justifyContent: 'center'}}>
                                    <Text children= 'Costo' color= 'primary.main' />
                                    <Box sx={{background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)', py:1, px:2, borderRadius: '25%' }}>
                                        $$$$
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Combobox name='Empleado' array={employsDummy} hasImage={true}/>
                        <Combobox name='Horarios disponibles' array={hoursDummy}/>
                    </Grid>
                </Grid>

                {/* Datos del cliente */}
                <Box sx={{px:5, py:1}}>
                    <Title children= 'Datos del cliente' size='16' textTransform='capitalize'></Title>
                    <Box sx={{p: 3, my:3, background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)', borderRadius: '15px',display: 'flex', flexDirection: 'column', gap:5 }}>
                        <Grid container spacing={5}>
                            <Grid size={{xs: 12, md: 6}}>
                                <TextInput label='Nombre Completo' placeholder='Ingresa tu nombre' background='linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)' border='#2c2e5b7d'/>
                            </Grid>
                            <Grid size={{xs: 6, md: 2}}>
                                <TextInput label='Edad' placeholder='Ej:18 años' type='number' background='linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)' border='#2c2e5b7d'/>
                            </Grid>
                            {/* TODO: Cambiar por otro display */}
                            <Grid size={{xs: 6, md: 4}}>
                                <TextInput label='Número telefónico' type='number' placeholder='Ejemplo' background='linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)' border='#2c2e5b7d'/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Grid size={2}><GenderSelect background='linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)' border='#2c2e5b7d'/></Grid>
                            <Grid size={6}>
                                <TextInput label='Correo electrónico' type='email' placeholder='Ejemplo' background='linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)' border='#2c2e5b7d'/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* Confirmación y muestra de datos */}
                <Box sx={{px:5}}>
                    <Title children= 'Se agendará una cita con la siguiente fecha:' size='16' textTransform='capitalize' align='center'/>
                    <Box sx={{p: 3, my:3, background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)', borderRadius: '15px',display: 'flex', flexDirection: 'column', gap:1 }}>
                        <Text children= 'Febrero 11, 2026 9:00am a 10:00am.' size='18' align='center'/>
                        <Text children= 'Empleado 1' size='16' align='center'/>
                    </Box>
                    <hr />
                    <Box sx={{p:2, display: 'flex', flexDirection: 'column', gap: 1}}>
                        <Title children= 'Total a pagar: $$$$' size='20' textTransform='capitalize' align='center'/>
                        <Text children= '*El pago de la cita se realiza en persona.' size='16' align='center' color= 'text.secondary'/>
                    </Box>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', p: 2}}>
                    <MainButton>Agendar</MainButton>
                </Box>
            </Box>
        </>
    )

}

export default BookAppointment;