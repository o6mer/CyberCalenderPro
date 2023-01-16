import axios from "axios";
import emailjs from '@emailjs/browser';
import {useContext} from "react";
import {UserContext} from "../../../../contexts/UserContext.jsx";
export default async function AddMeeting(theDate,Thetime_range,ThegroupSize, class_name,userPhone,user){

        emailjs.send('service_y2h9e9f', 'template_8vzak1o',
            {userName:user.userName,userMail:user.email,timeRange:Thetime_range,date:theDate,className:class_name}, 'oEBiM-k9oB7AAUIPw')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    const date = theDate
    const time_range = Thetime_range;
    const groupSize = ThegroupSize;
    const res = await axios.post("http://localhost:2000/addMeeting", {
        date: date,
        className: class_name,
        time_range: time_range,
        groupSize,
        phoneNumber: userPhone,
    })
    alert("thanx");


}