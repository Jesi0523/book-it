
import{Box} from '@mui/material'
import Text from '@/components/common/Text';

const TextWIcon = ({icon, text}) =>
{
    return(
        <Box sx={{display: 'flex', alignItems: 'center', p:0.5}}>
            {icon}
            <Text children={text} align='center' color= 'text.main' size='14'/>
        </Box>
    )
}

export default TextWIcon;