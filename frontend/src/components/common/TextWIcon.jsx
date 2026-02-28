
import{Typography, Box} from '@mui/material'

const TextWIcon = ({icon, text}) =>
{
    return(
        <Box sx={{display: 'flex', alignItems: 'center', p:0.5}}>
            {icon}
            <Typography sx={{fontSize: 14, color: 'text.main'}}>{text}</Typography>
        </Box>
    )
}

export default TextWIcon;