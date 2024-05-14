import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Paper, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            name,
        };

        axios.post("http://localhost:8080/users", newUser)
            .then(({ data }) => {
                setSuccessMessage("Registration successful!");
                setOpenSuccess(true);
                setEmail("")
                setPassword("")
                setName("")
                dispatch(addUser(data.user))
            })
            .catch(err => {
                console.log("Registration error:", err);
                setErrorMessage(err.response.data);
                setOpenError(true);
            })

    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper style={{ padding: '30px', textAlign: 'center' }} elevation={3}>
                    <Typography variant="h4" gutterBottom>Регистрация</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            fullWidth
                            type='email'
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password "
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
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            required
                            fullWidth
                            type='name '
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
                            Register
                        </Button>
                    </form>
                    <Link to="/login">Already have an account?</Link>
                </Paper>
            </Grid>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default RegisterPage;
