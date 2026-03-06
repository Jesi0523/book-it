import{Grid, Box} from '@mui/material'
// ************** componentes propios :3 **************
// |  layout
import NavBar from '@/layouts/NavBar'
// |  common
import Title from '@/components/common/Title'
import MainButton from '@/components/common/MainButton';
// |  formulario
import TextInput from '@/components/formulario/TextInput';
import DateInput from '@/components/formulario/DateInput';
import GenderSelect from '@/components/formulario/GenderSelect';
import PasswordInput from '@/components/formulario/PasswordInput';

function Profile()
{
    return(
        <>
            <NavBar/>
            <Box sx={{p:{xs: 2, md:7}}}>
                <Box sx={{px: 3}}>
                    <Title children='Editar perfil' color='text.primary' align='center'/>
                </Box>

                <Box sx={{mx: 10, p: 2, display:'flex', flexDirection:'column', gap: 2}}>
                    <TextInput label='Nombre' placeholder='Nombre completo'/>
                    <Grid container spacing={2}>
                        <Grid size={6} sx={{display:'flex', flexDirection:'column', gap: 2}}>
                            <DateInput></DateInput>
                            <TextInput label='Correo electrónico' type='email' placeholder='ejemplo@gmail.com'/>
                        </Grid>
                        <Grid size={6} sx={{display:'flex', flexDirection:'column', gap: 2}}>
                            <GenderSelect></GenderSelect>
                            <TextInput label='Número telefónico' type='number' placeholder='81 1111 1111'/>
                        </Grid>
                    </Grid>
                    <PasswordInput></PasswordInput>
                </Box>

                <Box sx={{display:'flex', justifyContent: 'center', alignContent: 'center', m:2}}>
                    <MainButton href="/main" children={'Guardar'}/>
                </Box>
            </Box>
        </>
    )
}
export default Profile;