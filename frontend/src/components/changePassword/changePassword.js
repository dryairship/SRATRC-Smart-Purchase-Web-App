import React from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OutlinedTextField from '../common/outlined-textfield';
import DropdownSelect from '../common/dropdown-select';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  form:{
      marginTop: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(4),
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
  hiddenAlert: {
    display: 'none',
  },
  visibleAlert: {
    display: 'block',
  }
}));    


export default function ChangePassword() {
    const [alertState, setAlertState] = React.useState({
      status: false,
      message: '',
      type: 'normal'
    });
    const classes = useStyles();

    const updatePassword = event => {
      event.preventDefault(); 
      var updatePassword= {
        oldPassword: document.getElementById('old-password').value,
        password: document.getElementById('new-password').value
      };
      if(document.getElementById('new-password').value != document.getElementById('confirm-new-password').value){
        setAlertState({
          status: true,
          message: 'The passwords do not match',
          type: 'error'
        });
        return; 
      }
      fetch('/user/checkPassword', {
        method: 'POST',
        body: JSON.stringify(updatePassword),
        headers:{ 'Content-Type': 'application/json' }
      })
      .then(res => {
        if(res.ok){
          fetch('/user', {
            method: 'PATCH',
            body: JSON.stringify(updatePassword),
            headers:{ 'Content-Type': 'application/json' }
          })
          .then(res => {
            if(res.ok){
              res.json()
              .then(response => {
                setAlertState({
                  status: true,
                  message: response,
                  type: 'normal'
                });
              })
              .catch(error => {
                setAlertState({
                  status: true,
                  message: error,
                  type: 'error'
                });
              });
            }else{
              setAlertState({
                status: true,
                message: "Password not updated",
                type: 'error'
              });
            }
          })
          .catch(error =>{
            setAlertState({
              status: true,
              message: error,
              type: 'error'
            });
          });    
        }else{
          setAlertState({
            status: true,
            message: 'Incorrect Password',
            type: 'error'
          });
        }
      })
      .catch(error => {
        setAlertState({
            status: true,
            message: error,
            type: 'error'
        });
      });
    }

    return(
     <Container component="main" maxWidth="xs">   
      <CssBaseline />
      <div className={classes.paper} id="change-password-div">
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize='inherit'/>
            </Avatar>
        
        <div className="divider" />
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={updatePassword}>
           <Box 
            id="create-user-alert-box"
            bgcolor={alertState.type=='normal' ? "primary.main" : "error.main"}
            color={alertState.type=='normal' ? "primary.contrastText" : "error.contrastText"}
            p={2}
            m={1}
            className={alertState.status ? classes.visibleAlert : classes.hiddenAlert}
          >
            {alertState.message}
          </Box>
          <OutlinedTextField label="Old Password" id="old-password" password={true}/>
          <br/>
          <OutlinedTextField label="New Password" id="new-password" password={true}/>
          <br/>
          <OutlinedTextField label="Confirm New Password" id="confirm-new-password" password={true}/>
          <br/>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            id="update-password-action-button"  
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
    );
}