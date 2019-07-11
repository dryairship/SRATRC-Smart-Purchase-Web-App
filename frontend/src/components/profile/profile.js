import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Face from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedTextField from '../common/outlined-textfield';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    fontSize: '10em',
    color: theme.palette.primary.main,
    width: 'auto',
    height: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hiddenAlert: {
    display: 'none',
  },
  visibleAlert: {
    display: 'block',
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  
  const [alertState, setAlertState] = React.useState({
    status: false,
    message: '',
    type: 'normal'
  });
  
  const [user, setUser] = React.useState({
    username: localStorage.getItem('username'),
    name: localStorage.getItem('name'),
    phone: localStorage.getItem('phone'),
    department: localStorage.getItem('department'),
    editable: false,
  });
  
  const saveInStorage = () => {
    localStorage.setItem('name', document.getElementById('profile-name').value);
    localStorage.setItem('phone', document.getElementById('profile-phone').value);
  }
  
  const toggleEditable = event => {
    setAlertState({
      status: false,
      type: 'error',
      message: '',
    });
    if(!user.editable){
      setUser({
        ...user,
        editable: true,
      });
      document.getElementById('profile-action-button').innerText="Save";
    }else{
      var newUser = {
        name: document.getElementById('profile-name').value,
        phone: document.getElementById('profile-phone').value,
      }
      fetch('/user', {
        method: 'PATCH',
        body: JSON.stringify(newUser),
        headers:{ 'Content-Type': 'application/json' }
      })
      .then(res => {
        if(res.ok){
          res.json().then(response => {
            setAlertState({
              status: true,
              message: response,
              type: 'normal'
            });
            setUser({
              ...user,
              editable: false,
            })
            saveInStorage();
            document.getElementById('profile-action-button').innerText="Edit";
          }).catch(error => {
            setAlertState({
              status: true,
              message: error,
              type: 'error'
            });
          });
        }else{
          res.json().then(response => {
            setAlertState({
              status: true,
              message: response,
              type: 'error'
            });
          }).catch(error => {
            setAlertState({
              status: true,
              message: error,
              type: 'error'
            });
          });
        }
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Face fontSize='inherit' />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form className={classes.form} noValidate >
          <Box 
            id="profile-alert-box"
            bgcolor={alertState.type=='normal' ? "primary.main" : "error.main"}
            color={alertState.type=='normal' ? "primary.contrastText" : "error.contrastText"}
            p={2}
            m={1}
            className={alertState.status ? classes.visibleAlert : classes.hiddenAlert}
          >
            {alertState.message}
          </Box>
          <OutlinedTextField label="Username" id="profile-username" value={user.username} disabled={true}/>
          <OutlinedTextField label="Department" id="profile-department" value={user.department} disabled={true}/>
          <OutlinedTextField label="Name" id="profile-name" value={user.name} disabled={!user.editable}/>
          <OutlinedTextField label="Phone" id="profile-phone" value={user.phone} disabled={!user.editable} />
          <Button
            onClick={toggleEditable}
            variant="contained"
            color="primary"
            className={classes.submit}
            id="profile-action-button"
          >
            Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}
