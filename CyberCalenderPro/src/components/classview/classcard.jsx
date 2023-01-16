import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "./maxresdefault.jpg"
import AcUnitIcon from '@mui/icons-material/AcUnit'
import VideocamIcon from '@mui/icons-material/Videocam';
import ComputerIcon from '@mui/icons-material/Computer';
import {useNavigate} from "react-router-dom";


export default function CardClass(props){
    const navigate = useNavigate();

    function NavToClass(name){
        navigate(`/SingleClass/${name}`)
    }
const {name} = props
    const {capacity} = props
    const {values} = props
return (
    <>
        <Card sx={{ maxWidth: 345,margin:"20px" }} elevation={24} onClick={()=>NavToClass(name)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={Image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Capacity: {capacity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">

                            {values.checklist.ac ?<AcUnitIcon/>:<p></p>}
                            {values.checklist.zoom ?<VideocamIcon/>:<p></p>}
                            {values.checklist.pcs ?<ComputerIcon/>:<p></p>}
                        </Typography>
                    </CardContent>
                </CardActionArea>
        </Card>

    </>
)
}