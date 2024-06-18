import React, { useState } from 'react';
import {
  TextField, Button, Grid, Paper, Typography, IconButton, InputAdornment, Snackbar, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/userSlice';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // state to toggle between login and registration
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      const user = { email, password };

      axios.post("http://localhost:8080/login", user)
        .then(res => {
          setEmail('');
          setPassword('');
          setOpenSuccess(true);
          setSuccessMessage("Вы вошли в аккаунт!");
          dispatch(addUser(res.data.user));
        })
        .catch(err => {
          setErrorMessage(err.response.data);
          setOpenError(true);
        });
    } else {
      const newUser = { email, password, name };

      axios.post("http://localhost:8080/users", newUser)
        .then(({ data }) => {
          setSuccessMessage("Вы прошли регистрацию!");
          setOpenSuccess(true);
          setEmail('');
          setPassword('');
          setName('');
          dispatch(addUser(data.user));
        })
        .catch(err => {
          setErrorMessage(err.response.data);
          setOpenError(true);
        });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper style={{ padding: '30px', textAlign: 'center' }} elevation={3}>
          <Typography variant="h4" gutterBottom>{isLogin ? 'Авторизация' : 'Регистрация'}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Почта"
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
              label="Пароль"
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
            {!isLogin && (
              <TextField
                id="name"
                label="Имя"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                required
                fullWidth
                margin="normal"
              />
            )}
            <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
              {isLogin ? 'Авторизация' : 'Регистрация'}
            </Button>
          </form>
          <Button onClick={toggleForm}>
            {isLogin ? "Всё ещё нет аккаунта? Регистрация" : "Уже есть аккаунт? Авторизация"}
          </Button>
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

export default AuthPage;
