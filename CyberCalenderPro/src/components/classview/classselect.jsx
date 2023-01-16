import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext.jsx";
import Container from "@mui/material/Container";
import CardClass from "./classcard.jsx";

export default function ClassView(){
    const { classesData } = useContext(UserContext);
    console.log(classesData)

    return (<>
        <Container maxWidth="sm" sx={{display:"flex", justifyContent:"center",alignItems:"center", height:"100vh"}}>
            {classesData.map((singleClass,index)=>{
               return <CardClass key={index} name={singleClass.className} capacity={singleClass.capacity} values={singleClass} />
            })}
        </Container>
        </>
    )
}