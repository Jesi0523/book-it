import {Box, Grid, Avatar} from '@mui/material'
import NavBar from '@/layouts/NavBar'
import Title from '@/components/common/Title'
import Text from '@/components/common/Text'
import Combobox from '@/components/formulario/Combobox';
import Collapsable from '@/components/common/Collapsable'
import MainButton from '@/components/common/MainButton';

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
                        <Grid container sx={{border: '2px solid #fff', width: '100%'}}>
                            <Grid size={{md:9}}>
                                <Title children={'Servicio 1'} size={'24'} color={'text.primary'}/>
                                <Text children={'Febrero 11, 2026 9:00am a 10:00am.'}/>
                            </Grid>
                            <Grid size={{md:3}}>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text children={'Costo: $$$$'} />
                                </Box>
                            </Grid>
                        </Grid>
                    }
                >
                    <Grid container sx={{border: '2px solid #fff'}}>
                        <Grid size={6}>
                            <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: 3}}>
                                <Avatar></Avatar>
                                <Text children='Empleado 1'></Text>
                            </Box>
                        </Grid>
                        <Grid size={6}>
                             <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: 3}}>
                                <ClockIcon/>
                                <Text children='Estado:'/>
                                <Text children='Pendiente'/>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box>
                        <Title children={'Datos del Cliente'} size={'16'} />
                        <Grid container>
                            <Grid size={10}>
                                <Box>
                                    <Text children='Nombre'/>
                                </Box>
                            </Grid>
                            <Grid size={2}>
                                <Box>
                                    <Text children='Edad'/>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid size={5}>
                                <Box>
                                    <Text children='Sexo'/>
                                </Box>
                            </Grid>
                            <Grid size={7}>
                                <Box>
                                    <Text children='Correo electrónico'/>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid size={6}>
                                <Box>
                                    <Text children='Número telefónico'/>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <MainButton children={'Cancelar cita'}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapsable>
                <Collapsable></Collapsable>
                <Collapsable></Collapsable>
            </Box>
        </Box>
        </>
    )
}

export default ClientSchedule;