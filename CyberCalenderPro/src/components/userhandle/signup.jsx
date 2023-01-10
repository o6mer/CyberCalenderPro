import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import axios from "axios";


export default function Signup() {
    const [userName,setUserName] = useState();
    const [password,setPassword] = useState();
    const [phone,setPhone] = useState();
    const [email,setEmail] = useState();

    const theme = createTheme();
    function HandleSub(e) {
        e.preventDefault()
        axios.post("http://localhost:2000/signup", {userName: userName, Password: password, Email:email, PhoneNumber: phone}).then((res)=> {
            console.log(res.data)
        })
    }

    return  (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography     >
                    <Box
                        component="form"
                        onSubmit={HandleSub}
                        className={"modal-content animate"}
                        noValidate
                        sx={{ mt: 1, border: "none" }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e)=>setUserName(e.target.value)}
                            label="Name"
                            type="text"
                            id="name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Email"
                            label="Email Address"
                            onChange={(e)=>setEmail(e.target.value)}
                            name="Email"
                            type={"email"}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Password"
                            onChange={(e)=>setPhone(e.target.value)}
                            label="Phone Number"
                            type="tel"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="./login" variant="body2">
                                    {" Have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>)
}