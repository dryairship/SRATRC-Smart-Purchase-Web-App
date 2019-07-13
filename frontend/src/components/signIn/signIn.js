import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hiddenError: {
    display: 'none',
  },
  visibleError: {
    display: 'block',
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  
  const [errorState, setErrorState] = React.useState({
    status: false,
    message: '',
  });

  const submitForm = event => {
    event.preventDefault();
    var loginData = {
      user: document.getElementById("login-username").value,
      password: document.getElementById("login-password").value,
    }
    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => {
      if(res.ok){
        setErrorState({
          status: false,
          message: '',
        });
        res.json().then(userData => {
          props.onLogin(userData.username);
          localStorage.setItem('username', userData.username);
          localStorage.setItem('name', userData.name);
          localStorage.setItem('department', userData.department);
          localStorage.setItem('phone', userData.phone);
        });
      }else{
        res.json().then(errorMessage => {
          setErrorState({
            status: true,
            message: errorMessage,
          });
        }).catch(error => {
          setErrorState({
            status: true,
            message: error,
          });
        });
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitForm} >
          <Box 
            id="login-error-box"
            bgcolor="error.main"
            color="error.contrastText"
            p={2}
            m={1}
            className={errorState.status ? classes.visibleError : classes.hiddenError}
          >
            {errorState.message}
          </Box>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login-username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="login-password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
