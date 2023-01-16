import {useParams} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

export default function SingleClass(){
    const {name} = useParams()
    const [classData,setClassData] = useState()
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true)
        axios.post("http://localhost:2000/getclassdata", {className: name}).then((classDate)=>{
            console.log(classDate.data.data)
            setClassData(classDate.data.data)
            setIsLoading(false)
        })
    },[])
    return (<>
        {isLoading? <p>loading</p>:
            <p>{classData?._id }</p>}

        </>)
}