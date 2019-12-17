import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
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

export default function Logout(props) {
  const classes = useStyles();

  const [errorState, setErrorState] = React.useState({
    status: false,
    message: '',
  });

  const logout = event => {
    fetch('/user/logout', {
      method: 'POST'
    })
    .then(res => {
      if(res.ok){
        console.log("LOGGED OUT");
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('department');
        localStorage.removeItem('phone');
        window.location.href='/';
      }else{
         console.log(res);
      }
    })
    .catch(error => console.log(error));
  }

  React.useEffect(() => {
    logout();
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logging out...
        </Typography>
      </div>
    </Container>
  );
}
