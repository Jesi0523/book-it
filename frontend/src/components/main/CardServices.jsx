import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardServices = ({image, name, description}) =>
{
  return (
    <Card elevation={0} sx=
    {{  maxWidth: 275, display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        background: 'none',
     }}>
      <CardMedia
        sx={{ width: 140, height: 140,  borderRadius: '100%'}}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 12, textAlign: 'justify' }}>
            {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardServices;
