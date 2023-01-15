import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function CardClass(props){
const {name} = props
    const {capacity} = props

return (
    <>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {capacity}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    </>
)
}