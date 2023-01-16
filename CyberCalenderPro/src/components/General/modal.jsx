import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext.jsx";
import {TextField} from "@mui/material";
import axios from "axios";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyModal() {
    const {user} = useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(user)
    async function UpdateSpecs(){
        axios.post("http://localhost:2000/changespecs",
            {id:user.userId,userName:userName,Password:password,Email:email,phoneNumber:phoneNumber}).then((res)=>{

            console.log(res.data.message)
        })
    }
    return (
        <div>
            <Button onClick={handleOpen}><AccountBoxIcon/></Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition

            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Profile Specs:
                        </Typography>
                            <TextField id="filled-basic" label={"user Name:"} value={userName} onChange={e=>setUserName(e.target.value)} variant="filled" />
                        <TextField id="filled-basic" label={"Email:"} value={email} variant="filled"  onChange={e=>setEmail(e.target.value)} />
                        <TextField id="filled-basic" label={"Phone Number:"} value={phoneNumber} variant="filled"  onChange={e=>setPhoneNumber(e.target.value)} />
                        <TextField id="filled-basic" type={"password"} label={"Password:"} value={password} variant="filled"  onChange={e=>setPassword(e.target.value)} />
                        <Button onClick={UpdateSpecs}>Submit</Button>
                    </Box>
                </Fade>

            </Modal>
        </div>
    );
}
