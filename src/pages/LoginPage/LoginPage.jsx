import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Paper, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/userSlice'

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errMessage, setErrMessage] = useState("");


    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email,
            password
        }

        axios.post("http://localhost:8080/login", user)
            .then(res => {
                setEmail("")
                setPassword("")
                setOpenSuccess(true)
                dispatch(addUser(res.data.user))
            })
            .catch(err => {
                setErrMessage(err.response.data)
                setOpenError(true)
            })
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={4} md={4}>
                <Paper style={{ padding: '30px', textAlign: 'center', width: "100%" }} elevation={3}>
                    <Typography variant="h4" gutterBottom>Authorization</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="emial"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
                            Login
                        </Button>
                    </form>
                    <Link to="/register">Don't have an account yet?</Link>
                </Paper>
            </Grid>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    "You're login!"
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default RegistrationPage;
