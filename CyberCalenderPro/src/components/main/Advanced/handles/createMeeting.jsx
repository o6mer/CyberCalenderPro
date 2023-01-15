import axios from "axios";

export default async function AddMeeting(theDate,Thetime_range,ThegroupSize, class_name,userPhone){

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
    window.location.reload();

}