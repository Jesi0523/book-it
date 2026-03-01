import {Box, Grid, Avatar} from '@mui/material'
import NavBar from '@/layouts/NavBar'
import Title from '@/components/common/Title'
import Text from '@/components/common/Text'
import Combobox from '@/components/formulario/Combobox';
import Collapsable from '@/components/common/Collapsable'
import MainButton from '@/components/common/MainButton';

import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';

import ClockIcon from '@mui/icons-material/QueryBuilder';

const orderByDummy =[ 'Ordenar por antiguedad', 'Ordenar alfabeticamente', 'Ordenar por'];
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

function ClientSchedule()
{
    const linearDegraded= 'linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)';
    const linearDegradedBody= 'linear-gradient(180deg, #000114c2 0%, #0e0f30 100%)';
    const colorBorder='2px solid #2c2e5bba';
    return(
        <>
        <NavBar/>
        <Box sx={{p:{xs: 2, md:7}}}>
            <Grid container sx={{px: 3}}>
                <Grid size={{xs:12, md:7 }}>
                    <Title children='Mis citas' color='text.primary' align="{xs: 'center', md: 'start'}"/>
                </Grid>
                <Grid size={{xs:12, md:5}}>
                    <Combobox name='Ordenar por:' array={orderByDummy} size='14px'/>
                </Grid>
            </Grid>

            <Box>
                <Collapsable
                    headerContent=
                    {
                        <Grid container sx={{width: '100%', p:1}}>
                            <Grid size={{md:9}}>
                                <Title children={'Servicio 1'} size={'20'} color={'text.primary'}/>
                                <Text children={'Febrero 11, 2026 9:00am a 10:00am.'} size={'16'} color={'primary.main'}/>
                            </Grid>
                            <Grid size={{md:3}} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <SimpleInfoDisplay title='Costo: $$$$' align='center' width='fit-content' weightFont='700' 
                                    titleSize='20' titleColor='text.primary' 
                                    background='linear-gradient(180deg, #4e5082 0%, #3b3d75d3 100%)'/>
                            </Grid>
                        </Grid>
                    }
                >
                    <Grid container sx={{display: 'flex', alignItems: 'center'}}>
                        <Grid size={9}>
                            <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: 3}}>
                                <Avatar></Avatar>
                                <Text children='Empleado 1'></Text>
                            </Box>
                        </Grid>
                        <Grid size={3}>
                            <SimpleInfoDisplay title='Estado: ' text='Pendiente' width='fit-content' hasIcon={true} icon={<ClockIcon/>} />
                        </Grid>
                    </Grid>

                    <Box sx={{p: 3}}>
                        <Title children={'Datos del Cliente'} size={'16'} />
                        <Box sx={{background: linearDegraded, p:1, m:1, borderRadius: '10px'}}>
                            <Grid container>
                                <Grid size={10}><SimpleInfoDisplay title='Nombre'/></Grid>
                                <Grid size={2}><SimpleInfoDisplay title='Edad'/></Grid>
                            </Grid>

                            <Grid container>
                                <Grid size={5}> <SimpleInfoDisplay title='Sexo'/></Grid>
                                <Grid size={7} ><SimpleInfoDisplay title='Correo electrónico'/></Grid>
                            </Grid>
                            <Grid container>
                                <Grid size={6}> <SimpleInfoDisplay title='Número telefónico'/></Grid>
                                <Grid size={6}>
                                    <Box>
                                        <MainButton children={'Cancelar cita'}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Collapsable>
            </Box>
        </Box>
        </>
    )
}

export default ClientSchedule;