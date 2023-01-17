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
import {FormControl, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import axios from "axios";
import {AccountCircle} from "@mui/icons-material";
import * as MuiIcons from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxWidth: '460px',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-between",
    gap: "10px"
    
    
};

const singleStyle = {

}


export default function MyModal(prop) {
    const {user} = useContext(UserContext);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const handleClose = () => prop.setState(false);

    async function UpdateSpecs(){
        axios.post("http://localhost:2000/changespecs",
            {id:user.userId,userName:userName,Password:password,Email:email,phoneNumber:phoneNumber}).then((res)=>{
            console.log("response",res.data.message)
        })
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={prop.state}
                onClose={handleClose}
                closeAfterTransition

            >
                <Fade in={prop.state}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Profile Specs:
                        </Typography>
                        <FormControl sx={{singleStyle}} variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                User Name:
                            </InputLabel>
                            <Input value={userName} onChange={e=>setUserName(e.target.value)}
                                   id="input-with-icon-adornment"
                                   startAdornment={
                                       <InputAdornment position="start">
                                           <AccountCircle />
                                       </InputAdornment>
                                   }
                            />
                        </FormControl>
                        <FormControl sx={{singleStyle}}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Email:
                            </InputLabel>
                            <Input
                                value={email} variant="filled"  onChange={e=>setEmail(e.target.value)}
                                   id="input-with-icon-adornment"
                                   startAdornment={
                                       <InputAdornment position="start">
                                           <AccountCircle />
                                       </InputAdornment>
                                   }
                            />
                        </FormControl>
                        <FormControl sx={{singleStyle}}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Phone Number:
                            </InputLabel>
                            <Input
                                value={phoneNumber}  onChange={e=>setPhoneNumber(e.target.value)}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{singleStyle}}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                            Password:
                        </InputLabel>
                            <Input sx={{singleStyle}}
                                value={password} variant="password"  onChange={e=>setPassword(e.target.value)}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />


                        </FormControl>
                            <Button onClick={UpdateSpecs}>Submit</Button>
                    </Box>
                </Fade>

            </Modal>
        </div>
    );
}
